import { Schema } from "effect";

import { BotUser, DateObject, PartialUser, PersonUser, RichTextItemResponse, SelectObject } from "./common-schema.js";
import { RollupFunction, TimeZone } from "./constants-schema.js";
import { DateString } from "./schema-utils.js";

export const Number = Schema.Struct({
  type: Schema.Literal("number"),
  number: Schema.Number.pipe(Schema.NullOr),
  id: Schema.String,
});
export type Number = Schema.Schema.Type<typeof Number>;

export const Url = Schema.Struct({
  type: Schema.Literal("url"),
  url: Schema.String.pipe(Schema.NullOr),
  id: Schema.String,
});
export type Url = Schema.Schema.Type<typeof Url>;

export const Select = Schema.Struct({
  type: Schema.Literal("select"),
  id: Schema.String,
  select: SelectObject.pipe(Schema.NullOr),
});
export type Select = Schema.Schema.Type<typeof Select>;

export const MultiSelect = Schema.Struct({
  type: Schema.Literal("multi_select"),
  multi_select: SelectObject.pipe(Schema.Array, Schema.mutable),
  id: Schema.String,
});
export type MultiSelect = Schema.Schema.Type<typeof MultiSelect>;

export const Status = Schema.Struct({
  type: Schema.Literal("status"),
  status: SelectObject.pipe(Schema.NullOr),
  id: Schema.String,
});
export type Status = Schema.Schema.Type<typeof Status>;

export const Date = Schema.Struct({
  type: Schema.Literal("date"),
  date: Schema.Struct({
    start: DateString,
    end: DateString.pipe(Schema.NullOr),
    time_zone: TimeZone.pipe(Schema.NullOr),
  }).pipe(Schema.NullOr),
  id: Schema.String,
});
export type Date = Schema.Schema.Type<typeof Date>;

export const Email = Schema.Struct({
  type: Schema.Literal("email"),
  email: Schema.String.pipe(Schema.NullOr),
  id: Schema.String,
});
export type Email = Schema.Schema.Type<typeof Email>;

export const PhoneNumber = Schema.Struct({
  type: Schema.Literal("phone_number"),
  phone_number: Schema.String.pipe(Schema.NullOr),
  id: Schema.String,
});
export type PhoneNumber = Schema.Schema.Type<typeof PhoneNumber>;

export const Checkbox = Schema.Struct({
  type: Schema.Literal("checkbox"),
  checkbox: Schema.Boolean,
  id: Schema.String,
});
export type Checkbox = Schema.Schema.Type<typeof Checkbox>;

export const Files = Schema.Struct({
  type: Schema.Literal("files"),
  files: Schema.Union(
    Schema.Struct({
      file: Schema.Struct({ url: Schema.String, expiry_time: Schema.String }),
      name: Schema.String,
      type: Schema.Literal("file"),
    }),
    Schema.Struct({
      external: Schema.Struct({ url: Schema.String }),
      name: Schema.String,
      type: Schema.Literal("external"),
    }),
  ).pipe(Schema.Array, Schema.mutable),
  id: Schema.String,
});
export type Files = Schema.Schema.Type<typeof Files>;

export const CreatedBy = Schema.Struct({
  type: Schema.Literal("created_by"),
  created_by: Schema.Union(PartialUser, PersonUser),
  id: Schema.String,
});
export type CreatedBy = Schema.Schema.Type<typeof CreatedBy>;

export const CreatedTime = Schema.Struct({
  type: Schema.Literal("created_time"),
  created_time: DateString,
  id: Schema.String,
});
export type CreatedTime = Schema.Schema.Type<typeof CreatedTime>;

export const LastEditedBy = Schema.Struct({
  type: Schema.Literal("last_edited_by"),
  last_edited_by: Schema.Union(PartialUser, PersonUser),
  id: Schema.String,
});
export type LastEditedBy = Schema.Schema.Type<typeof LastEditedBy>;

export const LastEditedTime = Schema.Struct({
  type: Schema.Literal("last_edited_time"),
  last_edited_time: DateString,
  id: Schema.String,
});
export type LastEditedTime = Schema.Schema.Type<typeof LastEditedTime>;

export const StringFormula = Schema.Struct({
  type: Schema.Literal("string"),
  string: Schema.String.pipe(Schema.NullOr),
});

export const DateFormula = Schema.Struct({
  type: Schema.Literal("date"),
  date: DateObject.pipe(Schema.NullOr),
});

export const NumberFormula = Schema.Struct({
  type: Schema.Literal("number"),
  number: Schema.Number.pipe(Schema.NullOr),
});

export const BooleanFormula = Schema.Struct({
  type: Schema.Literal("boolean"),
  boolean: Schema.Boolean.pipe(Schema.NullOr),
});

export const Formula = Schema.Struct({
  type: Schema.Literal("formula"),
  formula: Schema.Union(StringFormula, DateFormula, NumberFormula, BooleanFormula),
  id: Schema.String,
});
export type Formula = Schema.Schema.Type<typeof Formula>;

export const UniqueId = Schema.Struct({
  type: Schema.Literal("unique_id"),
  unique_id: Schema.Struct({
    prefix: Schema.String.pipe(Schema.NullOr),
    number: Schema.Number.pipe(Schema.NullOr),
  }),
  id: Schema.String,
});
export type UniqueId = Schema.Schema.Type<typeof UniqueId>;

export const Unverified = Schema.Struct({
  state: Schema.Literal("unverified"),
  date: Schema.Null,
  verified_by: Schema.Null,
});

export const Verified = Schema.Struct({
  state: Schema.Literal("verified", "expired"),
  date: DateObject.pipe(Schema.NullOr),
  verified_by: Schema.Union(PartialUser.pipe(Schema.omit("object")), PersonUser, BotUser).pipe(Schema.NullOr),
});

export const Verification = Schema.Struct({
  type: Schema.Literal("verification"),
  verification: Schema.Union(Unverified, Verified),
  id: Schema.String,
});
export type Verification = Schema.Schema.Type<typeof Verification>;

export const Title = Schema.Struct({
  type: Schema.Literal("title"),
  title: RichTextItemResponse.pipe(Schema.Array, Schema.mutable),
  id: Schema.String,
});
export type Title = Schema.Schema.Type<typeof Title>;

export const RichText = Schema.Struct({
  type: Schema.Literal("rich_text"),
  rich_text: RichTextItemResponse.pipe(Schema.Array, Schema.mutable),
  id: Schema.String,
});
export type RichText = Schema.Schema.Type<typeof RichText>;

export const People = Schema.Struct({
  type: Schema.Literal("people"),
  people: Schema.Union(PartialUser, PersonUser).pipe(Schema.Array, Schema.mutable),
  id: Schema.String,
});
export type People = Schema.Schema.Type<typeof People>;

export const Relation = Schema.Struct({
  type: Schema.Literal("relation"),
  relation: Schema.Struct({ id: Schema.String }).pipe(Schema.Array, Schema.mutable),
  id: Schema.String,
});
export type Relation = Schema.Schema.Type<typeof Relation>;

// TODO: rollup毎に型を分ける
export const Rollup = Schema.Struct({
  type: Schema.Literal("rollup"),
  rollup: Schema.Union(
    Number.pipe(Schema.omit("id")).pipe(Schema.extend(Schema.Struct({ function: RollupFunction }))),
    Date.pipe(Schema.omit("id")).pipe(Schema.extend(Schema.Struct({ function: RollupFunction }))),
    Schema.Struct({
      type: Schema.Literal("array"),
      array: Schema.Union(
        Number.pipe(Schema.omit("id")),
        Url.pipe(Schema.omit("id")),
        Select.pipe(Schema.omit("id")),
        MultiSelect.pipe(Schema.omit("id")),
        Status.pipe(Schema.omit("id")),
        Date.pipe(Schema.omit("id")),
        Email.pipe(Schema.omit("id")),
        PhoneNumber.pipe(Schema.omit("id")),
        Checkbox.pipe(Schema.omit("id")),
        Files.pipe(Schema.omit("id")),
        CreatedBy.pipe(Schema.omit("id")),
        CreatedTime.pipe(Schema.omit("id")),
        LastEditedBy.pipe(Schema.omit("id")),
        LastEditedTime.pipe(Schema.omit("id")),
        Formula.pipe(Schema.omit("id")),
        UniqueId.pipe(Schema.omit("id")),
        Verification.pipe(Schema.omit("id")),
        Title.pipe(Schema.omit("id")),
        RichText.pipe(Schema.omit("id")),
        People.pipe(Schema.omit("id")),
        Relation.pipe(Schema.omit("id")),
      ).pipe(Schema.Array, Schema.mutable),
      function: RollupFunction,
    }),
  ),
  id: Schema.String,
});
export type Rollup = Schema.Schema.Type<typeof Rollup>;

export const Properties = Schema.Record({
  key: Schema.String,
  value: Schema.Union(
    Number,
    Url,
    Select,
    MultiSelect,
    Date,
    Email,
    PhoneNumber,
    Checkbox,
    Files,
    CreatedBy,
    CreatedTime,
    LastEditedBy,
    LastEditedTime,
    Formula,
    UniqueId,
    Verification,
    People,
    Relation,
    RichText,
    Status,
    Title,
    Rollup,
  ),
});
export const properties = Schema.decodeSync(Properties);
