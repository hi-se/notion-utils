import { Match } from "effect";
import { Array, Option, Predicate, pipe } from "effect";

import type { TimeZone } from "./constants-schema.js";
import type * as ResProp from "./response-properties-schema.js";

export const titleOption = (title: ResProp.Title): Option.Option<string> => {
  return pipe(
    Option.fromNullable(title.title),
    Option.map((richTexts) => richTexts.map((rt) => rt.plain_text).join("")),
  );
};

export const title = (title: ResProp.Title): string | undefined => {
  return pipe(titleOption(title), Option.getOrUndefined);
};

export const relation = (relation: ResProp.Relation): string[] => {
  return pipe(
    relation.relation,
    Array.map((relation) => relation.id),
  );
};

export const numberRollupOption = (rollup: ResProp.Rollup): Option.Option<number> => {
  return pipe(
    Option.fromNullable(rollup.rollup),
    Option.flatMap((rollup) =>
      pipe(
        Match.value(rollup),
        Match.when({ type: "number" }, (rollup) => pipe(Option.fromNullable(rollup.number), Option.map(Number))),
        Match.orElse(() => Option.none()),
      ),
    ),
  );
};
export const numberRollup = (rollup: ResProp.Rollup): number | undefined => {
  return pipe(numberRollupOption(rollup), Option.getOrUndefined);
};

export const dateRollup = (rollup: ResProp.Rollup): Option.Option<Date> => {
  return pipe(
    Option.fromNullable(rollup.rollup),
    Option.flatMap((rollup) =>
      pipe(
        Match.value(rollup),
        Match.when({ type: "date" }, (date) =>
          pipe(
            Option.fromNullable(date.date),
            Option.map((date) => new Date(date.start)),
          ),
        ),
        Match.orElse(() => Option.none()),
      ),
    ),
  );
};

// TODO: arrayRollup

export const richText = (richText: ResProp.RichText): string => {
  return pipe(
    Match.value(richText.rich_text),
    Match.when(
      ([richText]) => richText?.type === "text",
      (richTexts) => richTexts.map((richText) => richText.plain_text).join(""),
    ),
    Match.orElse(() => ""),
  );
};

export const selectOption = (select: ResProp.Select): Option.Option<string> => {
  return pipe(
    Option.fromNullable(select.select),
    Option.map((select) => select.name),
  );
};
export const select = (select: ResProp.Select): string | undefined => {
  return pipe(selectOption(select), Option.getOrUndefined);
};

export const multiSelect = (multiSelect: ResProp.MultiSelect): string[] => {
  return pipe(
    multiSelect.multi_select,
    Array.map((select) => select.name),
  );
};

export const statusOption = (status: ResProp.Status): Option.Option<string> => {
  return pipe(
    Option.fromNullable(status.status),
    Option.map((status) => status.name),
  );
};
export const status = (status: ResProp.Status): string | undefined => {
  return pipe(statusOption(status), Option.getOrUndefined);
};

export const people = (people: ResProp.People): string[] => {
  return pipe(
    people.people,
    Array.map((person) =>
      pipe(
        Match.value(person),
        Match.when({ name: Match.string }, (person) => person.name),
        Match.orElse(() => undefined),
      ),
    ),
    Array.filter(Predicate.isNotUndefined),
  );
};

export const dateOption = (date: ResProp.Date): Option.Option<Date> => {
  return pipe(
    Option.fromNullable(date.date),
    Option.map((date) => new Date(date.start)),
  );
};
export const date = (date: ResProp.Date): Date | undefined => {
  return pipe(dateOption(date), Option.getOrUndefined);
};

export const dateWithRange = (date: ResProp.Date): { start: Date; end: Date } | undefined => {
  return pipe(
    Option.fromNullable(date.date),
    Option.map((date) =>
      pipe(
        Match.value(date),
        Match.when({ start: Match.string, end: Match.string }, (date) => ({
          start: new Date(date.start),
          end: new Date(date.end),
        })),
        Match.orElse(() => undefined),
      ),
    ),
    Option.getOrUndefined,
  );
};

export const dateWithRangeOption = (
  date: ResProp.Date,
): Option.Option<{ start: Date; end: Date; time_zone: Option.Option<TimeZone> }> => {
  return pipe(
    Option.fromNullable(date.date),
    Option.flatMap((date) =>
      pipe(
        Match.value(date),
        Match.when({ start: Match.string, end: Match.string }, (date) =>
          Option.some({
            start: new Date(date.start),
            end: new Date(date.end),
            time_zone: Option.fromNullable(date.time_zone),
          }),
        ),
        Match.orElse(() => Option.none()),
      ),
    ),
  );
};

export const urlOption = (url: ResProp.Url): Option.Option<string> => {
  return pipe(
    Option.fromNullable(url.url),
    Option.map((url) => url),
  );
};
export const url = (url: ResProp.Url): string | undefined => {
  return pipe(urlOption(url), Option.getOrUndefined);
};

export const uniqueIdOption = (uniqueId: ResProp.UniqueId): Option.Option<string> => {
  return pipe(
    Option.fromNullable(uniqueId.unique_id),
    Option.flatMap((uniqueId) =>
      pipe(
        Match.value(uniqueId),
        Match.when({ number: Match.number, prefix: Match.string }, ({ number, prefix }) =>
          Option.some(`${prefix}-${number}`),
        ),
        Match.when({ number: Match.number }, ({ number }) => Option.some(`${number}`)),
        Match.orElse(() => Option.none()),
      ),
    ),
  );
};
export const uniqueId = (uniqueId: ResProp.UniqueId): string | undefined => {
  return pipe(uniqueIdOption(uniqueId), Option.getOrUndefined);
};

export const checkbox = (checkbox: ResProp.Checkbox): boolean => {
  return checkbox.checkbox;
};

export const createdTime = (createdTime: ResProp.CreatedTime): Date => {
  return new Date(createdTime.created_time);
};

export const createdBy = (createdBy: ResProp.CreatedBy): string => {
  return createdBy.created_by.id;
};

export const lastEditedTime = (lastEditedTime: ResProp.LastEditedTime): Date => {
  return new Date(lastEditedTime.last_edited_time);
};

export const lastEditedBy = (lastEditedBy: ResProp.LastEditedBy): string => {
  return lastEditedBy.last_edited_by.id;
};
