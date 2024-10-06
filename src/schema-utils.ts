import { Schema } from "@effect/schema";

export const mutableStruct = <T extends Schema.Struct.Fields>(fields: T) => Schema.mutable(Schema.Struct(fields));
export const DateString = Schema.String.pipe(Schema.filter((s) => new Date(s).toString() !== "Invalid Date"));
