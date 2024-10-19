import { type Client, isFullPage } from "@notionhq/client";
import { match, P } from "ts-pattern";
import type {
  GetPagePropertyParameters,
  PageObjectResponse,
  PropertyItemObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints.js";
import { endOfDay, format, formatISO, isSameDay, startOfDay } from "date-fns";
import { Array, Effect, Match, pipe } from "effect";
import type { NotionError } from "./errors.js";
import { getPagePropertyValue, queryDatabase, search } from "./notion-api.js";

export function getPagePropertyValueAll(
  notion: Client,
  props: GetPagePropertyParameters,
): Effect.Effect<PropertyItemObjectResponse[], NotionError> {
  return Effect.gen(function* (_) {
    const propertyItem = yield* _(getPagePropertyValue(notion, props));
    if (propertyItem.object === "property_item") {
      return [propertyItem];
    }

    // Property is paginated.
    let nextCursor = propertyItem.next_cursor;
    const results = propertyItem.results;

    while (nextCursor !== null) {
      const propertyItem = yield* _(getPagePropertyValue(notion, { ...props, start_cursor: nextCursor }));
      if ("next_cursor" in propertyItem) {
        nextCursor = propertyItem.next_cursor;
        results.push(...propertyItem.results);
      }
    }
    return results;
  });
}

export function queryDatabaseAll(
  notionClient: Client,
  query: QueryDatabaseParameters,
): Effect.Effect<PageObjectResponse[], NotionError> {
  return pipe(
    queryDatabase(notionClient, query),
    Effect.flatMap((res) => {
      const data = res.results.filter(isFullPage);
      return res.next_cursor
        ? pipe(
            queryDatabaseAll(notionClient, { ...query, start_cursor: res.next_cursor }),
            Effect.map((nextData) => [...data, ...nextData]),
          )
        : Effect.succeed(data);
    }),
  );
}

export function getEditedPagesFromDataBaseByDate(
  notion: Client,
  databaseId: string,
  date: Date,
): Effect.Effect<PageObjectResponse[], NotionError> {
  return queryDatabaseAll(notion, {
    database_id: databaseId,
    filter: {
      and: [
        {
          timestamp: "last_edited_time",
          last_edited_time: {
            on_or_after: formatISO(startOfDay(date)),
          },
        },
        {
          timestamp: "last_edited_time",
          last_edited_time: {
            on_or_before: formatISO(endOfDay(date)),
          },
        },
      ],
    },
  });
}

export function getEditedPagesFromSearchByDate(
  notion: Client,
  date: Date,
): Effect.Effect<PageObjectResponse[], NotionError> {
  // TODO: paginate if needed
  return pipe(
    search(notion, {}),
    Effect.map((res) => res.filter((p) => "last_edited_time" in p && isSameDay(new Date(p.last_edited_time), date))),
  );
}

export function getEditedPagesByDate(
  notion: Client,
  databaseIds: string[],
  date: Date,
): Effect.Effect<PageObjectResponse[], NotionError> {
  return pipe(
    [
      getEditedPagesFromSearchByDate(notion, date),
      ...databaseIds.map((dbId) => getEditedPagesFromDataBaseByDate(notion, dbId, date)),
    ],
    Effect.allWith({ concurrency: "unbounded" }),
    Effect.map((res) => res.flat()),
    Effect.map((res) => Array.dedupeWith(res, (a, b) => a.id === b.id)),
  );
}

export function formatDateForNotionRequest(date: Date, includeTime?: boolean): string {
  const formatString = includeTime ? "yyyy-MM-dd'T'HH:mm:ss+09:00" : "yyyy-MM-dd";
  return format(date, formatString);
}

export function getUrlFromPageId(pageId: string, domain?: string) {
  return domain
    ? `https://www.notion.so/${domain}/${pageId.replaceAll("-", "")}`
    : `https://www.notion.so/${pageId.replaceAll("-", "")}`;
}

// NOTE: EffectのMatchでは表現が難しかったのでts-patternを使っている
export function getPageTitleFromRetrievedPage(retrievedPage: PageObjectResponse) {
  return match(retrievedPage.properties)
    .with({ Name: { type: "title", title: P.select() } }, (title) => title.map(({ plain_text }) => plain_text).join(""))
    .with({ title: { type: "title", title: P.select() } }, (title) =>
      title.map(({ plain_text }) => plain_text).join(""),
    )
    .otherwise(() => "No Title");
}
