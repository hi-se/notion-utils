import type { Client } from "@notionhq/client";
import type {
  AppendBlockChildrenParameters,
  AppendBlockChildrenResponse,
  CreatePageParameters,
  CreatePageResponse,
  DatabaseObjectResponse,
  GetPagePropertyParameters,
  GetPagePropertyResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  SearchParameters,
  UpdatePageParameters,
  UpdatePageResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import { Effect, Match, pipe } from "effect";
import { NotionError } from "./errors.js";

export function search(
  notionClient: Client,
  params: SearchParameters,
): Effect.Effect<PageObjectResponse[], NotionError> {
  return Effect.tryPromise({
    try: () => notionClient.search(params),
    catch: (e) => new NotionError({ message: `Failed to search in Notion: ${e}` }),
  }).pipe(Effect.map((res) => res.results.filter(isFullPage)));
}

export function queryDatabase(
  notion: Client,
  query: QueryDatabaseParameters,
): Effect.Effect<QueryDatabaseResponse, NotionError> {
  return Effect.tryPromise({
    try: () => notion.databases.query(query),
    catch: (e) => new NotionError({ message: `Failed to query database in Notion: ${e}` }),
  });
}

export function createPage(notion: Client, args: CreatePageParameters): Effect.Effect<CreatePageResponse, NotionError> {
  return Effect.tryPromise({
    try: () => notion.pages.create(args),
    catch: (e) => new NotionError({ message: `Failed to create page in Notion: ${e}` }),
  });
}

export function updatePage(notion: Client, args: UpdatePageParameters): Effect.Effect<UpdatePageResponse, NotionError> {
  return Effect.tryPromise({
    try: () => notion.pages.update(args),
    catch: (e) => new NotionError({ message: `Failed to update page in Notion: ${e}` }),
  });
}

export function appendBlockChildren(
  notion: Client,
  params: AppendBlockChildrenParameters,
): Effect.Effect<AppendBlockChildrenResponse, NotionError> {
  return Effect.tryPromise({
    try: () => notion.blocks.children.append(params),
    catch: (e) => new NotionError({ message: `Failed to append block children in Notion: ${e}` }),
  });
}

export function getPagePropertyValue(
  notion: Client,
  props: GetPagePropertyParameters,
): Effect.Effect<GetPagePropertyResponse, NotionError> {
  return Effect.tryPromise({
    try: () => notion.pages.properties.retrieve(props),
    catch: (e) => new NotionError({ message: `Failed to get property value in Notion: ${e}` }),
  });
}

export function isFullPage(
  page: PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse,
): page is PageObjectResponse {
  return pipe(
    Match.value(page),
    Match.when({ object: "page", url: Match.string }, () => true),
    Match.orElse(() => false),
  );
}
