import { Schema } from "@effect/schema";

import { BotUser, DateObject, PartialUser, PersonUser, RichTextItemRequest, SelectObject } from "./common-schema.js";
import { TimeZone } from "./constants-schema.js";
import { DateString, mutableStruct } from "./schema-utils.js";

export const Number = mutableStruct({
  type: Schema.Literal("number"),
  number: Schema.Number.pipe(Schema.NullOr),
});
export type Number = Schema.Schema.Type<typeof Number>;
export const number = Schema.decodeSync(Number);

export const Url = mutableStruct({
  type: Schema.Literal("url"),
  url: Schema.String.pipe(Schema.NullOr),
});
export type Url = Schema.Schema.Type<typeof Url>;
export const url = Schema.decodeSync(Url);

const SelectObjectForRequest = Schema.Union(
  SelectObject.pipe(Schema.partial, Schema.omit("id"), Schema.extend(SelectObject.pipe(Schema.pick("id")))),
  SelectObject.pipe(Schema.partial, Schema.omit("name"), Schema.extend(SelectObject.pipe(Schema.pick("name")))),
);

export const Select = mutableStruct({
  type: Schema.Literal("select"),
  select: SelectObjectForRequest.pipe(Schema.NullOr),
});
export type Select = Schema.Schema.Type<typeof Select>;
export const select = Schema.decodeSync(Select);

export const MultiSelect = mutableStruct({
  type: Schema.Literal("multi_select"),
  multi_select: SelectObjectForRequest.pipe(Schema.Array, Schema.mutable),
});
export type MultiSelect = Schema.Schema.Type<typeof MultiSelect>;
export const multi_select = Schema.decodeSync(MultiSelect);

export const Status = mutableStruct({
  type: Schema.Literal("status"),
  status: SelectObjectForRequest.pipe(Schema.NullOr),
});
export type Status = Schema.Schema.Type<typeof Status>;
export const status = Schema.decodeSync(Status);

export const Date = mutableStruct({
  type: Schema.Literal("date"),
  date: mutableStruct({
    start: DateString,
    end: DateString.pipe(Schema.NullishOr),
    time_zone: TimeZone.pipe(Schema.NullishOr),
  }).pipe(Schema.NullOr),
});
export type Date = Schema.Schema.Type<typeof Date>;
export const date = Schema.decodeSync(Date);

export const Email = mutableStruct({
  type: Schema.Literal("email"),
  email: Schema.String.pipe(Schema.NullOr),
});
export type Email = Schema.Schema.Type<typeof Email>;
export const email = Schema.decodeSync(Email);

export const PhoneNumber = mutableStruct({
  type: Schema.Literal("phone_number"),
  phone_number: Schema.String.pipe(Schema.NullOr),
});
export type PhoneNumber = Schema.Schema.Type<typeof PhoneNumber>;
export const phone_number = Schema.decodeSync(PhoneNumber);

export const Checkbox = mutableStruct({
  type: Schema.Literal("checkbox"),
  checkbox: Schema.Boolean,
});
export type Checkbox = Schema.Schema.Type<typeof Checkbox>;
export const checkbox = Schema.decodeSync(Checkbox);

export const Files = mutableStruct({
  type: Schema.Literal("files"),
  files: Schema.Union(
    mutableStruct({
      file: mutableStruct({ url: Schema.String, expiry_time: Schema.String }),
      name: Schema.String,
      type: Schema.Literal("file"),
    }),
    mutableStruct({
      external: mutableStruct({ url: Schema.String }),
      name: Schema.String,
      type: Schema.Literal("external"),
    }),
  ).pipe(Schema.Array, Schema.mutable),
});
export type Files = Schema.Schema.Type<typeof Files>;
export const files = Schema.decodeSync(Files);

export const CreatedBy = mutableStruct({
  type: Schema.Literal("created_by"),
  created_by: Schema.Union(PartialUser, PersonUser),
});

export const CreatedTime = mutableStruct({
  type: Schema.Literal("created_time"),
  created_time: Schema.Date,
});
export type CreatedTime = Schema.Schema.Type<typeof CreatedTime>;
export const created_time = Schema.decodeSync(CreatedTime);

export const LastEditedBy = mutableStruct({
  type: Schema.Literal("last_edited_by"),
  last_edited_by: Schema.Union(PartialUser, PersonUser),
});
export type LastEditedBy = Schema.Schema.Type<typeof LastEditedBy>;
export const last_edited_by = Schema.decodeSync(LastEditedBy);

export const LastEditedTime = mutableStruct({
  type: Schema.Literal("last_edited_time"),
  last_edited_time: Schema.Date,
});
export type LastEditedTime = Schema.Schema.Type<typeof LastEditedTime>;
export const last_edited_time = Schema.decodeSync(LastEditedTime);

export const StringFormula = mutableStruct({
  type: Schema.Literal("string"),
  string: Schema.String.pipe(Schema.NullOr),
});

export const DateFormula = mutableStruct({
  type: Schema.Literal("date"),
  date: DateObject.pipe(Schema.NullOr),
});

export const NumberFormula = mutableStruct({
  type: Schema.Literal("number"),
  number: Schema.Number.pipe(Schema.NullOr),
});

export const BooleanFormula = mutableStruct({
  type: Schema.Literal("boolean"),
  boolean: Schema.Boolean.pipe(Schema.NullOr),
});

export const Formula = mutableStruct({
  type: Schema.Literal("formula"),
  formula: Schema.Union(StringFormula, DateFormula, NumberFormula, BooleanFormula),
});
export type Formula = Schema.Schema.Type<typeof Formula>;
export const formula = Schema.decodeSync(Formula);

export const UniqueId = mutableStruct({
  type: Schema.Literal("unique_id"),
  unique_id: mutableStruct({
    prefix: Schema.String.pipe(Schema.NullOr),
    number: Schema.Number.pipe(Schema.NullOr),
  }),
});
export type UniqueId = Schema.Schema.Type<typeof UniqueId>;
export const unique_id = Schema.decodeSync(UniqueId);

export const Unverified = mutableStruct({
  state: Schema.Literal("unverified"),
  date: Schema.Null,
  verified_by: Schema.Null,
});
export type Unverified = Schema.Schema.Type<typeof Unverified>;

export const Verified = mutableStruct({
  state: Schema.Literal("verified", "expired"),
  date: DateObject.pipe(Schema.NullOr),
  verified_by: Schema.Union(PartialUser.pipe(Schema.omit("object")), PersonUser, BotUser).pipe(Schema.NullOr),
});
export type Verified = Schema.Schema.Type<typeof Verified>;

export const Verification = mutableStruct({
  type: Schema.Literal("verification"),
  verification: Schema.Union(Unverified, Verified),
});
export type Verification = Schema.Schema.Type<typeof Verification>;
export const verification = Schema.decodeSync(Verification);

export const Title = mutableStruct({
  type: Schema.Literal("title"),
  title: RichTextItemRequest.pipe(Schema.Array, Schema.mutable),
});
export type Title = Schema.Schema.Type<typeof Title>;
export const title = Schema.decodeSync(Title);

export const RichText = mutableStruct({
  type: Schema.Literal("rich_text"),
  rich_text: RichTextItemRequest.pipe(Schema.Array, Schema.mutable),
});
export type RichText = Schema.Schema.Type<typeof RichText>;
export const rich_text = Schema.decodeSync(RichText);

export const People = mutableStruct({
  type: Schema.Literal("people"),
  people: Schema.Union(PartialUser.pipe(Schema.omit("object")), PersonUser.pipe(Schema.omit("object"))).pipe(
    Schema.Array,
    Schema.mutable,
  ),
});
export type People = Schema.Schema.Type<typeof People>;
export const people = Schema.decodeSync(People);

export const Relation = mutableStruct({
  type: Schema.Literal("relation"),
  relation: mutableStruct({ id: Schema.String }).pipe(Schema.Array, Schema.mutable),
});
export type Relation = Schema.Schema.Type<typeof Relation>;
export const relation = Schema.decodeSync(Relation);

// readonly: formula, unique_id, verification, created_time, last_edited_time, created_by, last_edited_by
const Properties = Schema.Union(
  Checkbox,
  Date,
  Email,
  Files,
  MultiSelect,
  Number,
  People,
  PhoneNumber,
  Relation,
  RichText,
  Select,
  Status,
  Title,
  Url,
);
const properties = Schema.decodeSync(Properties);
export type Properties = ReturnType<typeof properties>;
