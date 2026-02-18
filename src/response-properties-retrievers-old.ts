import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import { P, match } from "ts-pattern";


export function retrieveTitleProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "title", title: P.select() }, (title) => title.map(({ plain_text }) => plain_text).join(""))
    .otherwise(() => undefined);
}

export function retrieveUniqueIdProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "unique_id", unique_id: P.select() }, (uniqueId) =>
      uniqueId.prefix ? `${uniqueId.prefix}-${uniqueId.number}` : `${uniqueId.number}`,
    )
    .otherwise(() => undefined);
}

export function retrieveRichTextProp(props: PageObjectResponse["properties"], key: string) {
return match(props[key])
    .with({ type: "rich_text", rich_text: P.select() }, (rich_text) => rich_text.map((t) => t.plain_text).join(""))
    .otherwise(() => undefined);
}

export function retrieveNumberProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "number", number: P.select() }, (number) => number ?? undefined)
    .otherwise(() => undefined);
}

export function retrieveEmailProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "email", email: P.select() }, (email) => email ?? undefined)
    .otherwise(() => undefined);
}

export function retrieveCheckboxProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "checkbox", checkbox: P.select() }, (checkbox) => checkbox)
    .otherwise(() => undefined);
}

export function retrieveSelectProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "select", select: P.select() }, (select) => select ?? undefined)
    .otherwise(() => undefined);
}

export function retrieveMultiSelectProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "multi_select", multi_select: P.select() }, (multi_select) => multi_select)
    .otherwise(() => undefined);
}

export function retrieveStatusProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "status", status: P.select() }, (status) => status)
    .otherwise(() => undefined);
}

export function retrieveUrlProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "url", url: P.select() }, (url) => url)
    .otherwise(() => undefined);
}

export function retrieveRelationProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "relation", relation: P.select() }, (relation) => relation)
    .otherwise(() => undefined);
}

export function retrieveDateProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "date", date: P.not(null) }, ({ date }) => new Date(date.start))
    .otherwise(() => undefined);
}

export function retrieveLastEditedTimeProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "last_edited_time", last_edited_time: P.select() }, (last_edited_time) => new Date(last_edited_time))
    .otherwise(() => undefined);
}

export function retrieveCreatedTimeProp(props: PageObjectResponse["properties"], key: string) {
  return match(props[key])
    .with({ type: "created_time", created_time: P.select() }, (created_time) => new Date(created_time))
    .otherwise(() => undefined);
}
