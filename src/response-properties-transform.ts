import { ParseResult, Schema } from "@effect/schema";

import { Function, pipe } from "effect";
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as Retrievers from "./response-properties-retrievers.js";
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as ResProps from "./response-properties-schema.js";

export const UniqueIdToOptionString = () =>
  Schema.transformOrFail(ResProps.UniqueId, Schema.Option(Schema.String), {
    strict: true,
    decode: Function.compose(Retrievers.uniqueIdOption, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const UniqueIdToString = () =>
  Schema.transformOrFail(ResProps.UniqueId, Schema.String, {
    strict: true,
    decode: (input, _, ast) =>
      pipe(
        input,
        Retrievers.uniqueIdOption,
        ParseResult.fromOption(() => new ParseResult.Forbidden(ast, input, "Expected a string but got undefined")),
      ),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const TitleToOptionString = () =>
  Schema.transformOrFail(ResProps.Title, Schema.Option(Schema.String), {
    strict: true,
    decode: Function.compose(Retrievers.titleOption, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const TitleToString = () =>
  Schema.transformOrFail(ResProps.Title, Schema.String, {
    strict: true,
    decode: (input, _, ast) =>
      pipe(
        input,
        Retrievers.titleOption,
        ParseResult.fromOption(() => new ParseResult.Forbidden(ast, input, "Expected a string but got undefined")),
      ),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const RelationToStringArray = () =>
  Schema.transformOrFail(ResProps.Relation, Schema.Array(Schema.String), {
    strict: true,
    decode: Function.compose(Retrievers.relation, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const CreatedTimeToDate = () =>
  Schema.transformOrFail(ResProps.CreatedTime, Schema.DateFromSelf, {
    strict: true,
    decode: Function.compose(Retrievers.createdTime, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const LastEditedTimeToDate = () =>
  Schema.transformOrFail(ResProps.LastEditedTime, Schema.DateFromSelf, {
    strict: true,
    decode: Function.compose(Retrievers.lastEditedTime, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const DateToOptionDate = () =>
  Schema.transformOrFail(ResProps.Date, Schema.Option(Schema.DateFromSelf), {
    strict: true,
    decode: Function.compose(Retrievers.dateOption, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const DateToDate = () =>
  Schema.transformOrFail(ResProps.Date, Schema.DateFromSelf, {
    strict: true,
    decode: (input, _, ast) =>
      pipe(
        input,
        Retrievers.dateOption,
        ParseResult.fromOption(() => new ParseResult.Forbidden(ast, input, "Expected a date but got undefined")),
      ),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const DateToOptionDateRange = () =>
  Schema.transformOrFail(
    ResProps.Date,
    Schema.Option(Schema.Struct({ start: Schema.DateFromSelf, end: Schema.DateFromSelf })),
    {
      strict: true,
      decode: Function.compose(Retrievers.dateWithRangeOption, ParseResult.succeed),
      encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
    },
  );

export const SelectToOptionLiteral = <T>(literalsSchema: Schema.Schema<T, T>) =>
  Schema.transformOrFail(ResProps.Select, Schema.Option(literalsSchema), {
    strict: false, // NOTE: 引数の型をうまく指定できなかったのでstrictをfalseにしている
    decode: Function.compose(Retrievers.selectOption, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const SelectToLiteral = <T>(literalsSchema: Schema.Schema<T, T>) =>
  Schema.transformOrFail(ResProps.Select, literalsSchema, {
    strict: false, // NOTE: 引数の型をうまく指定できなかったのでstrictをfalseにしている
    decode: (input, _, ast) =>
      pipe(
        input,
        Retrievers.selectOption,
        ParseResult.fromOption(() => new ParseResult.Forbidden(ast, input, "Expected literals but got undefined")),
      ),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const MultiSelectToLiteralArray = <T>(literalsSchema: Schema.Schema<T, T>) =>
  Schema.transformOrFail(ResProps.MultiSelect, Schema.Array(literalsSchema), {
    strict: false, // NOTE: 引数の型をうまく指定できなかったのでstrictをfalseにしている
    decode: Function.compose(Retrievers.multiSelect, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const StatusToOptionLiteral = <T>(literalsSchema: Schema.Schema<T, T>) =>
  Schema.transformOrFail(ResProps.Status, Schema.Option(literalsSchema), {
    strict: false, // NOTE: 引数の型をうまく指定できなかったのでstrictをfalseにしている
    decode: Function.compose(Retrievers.statusOption, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const StatusToLiteral = <T>(literalsSchema: Schema.Schema<T, T>) =>
  Schema.transformOrFail(ResProps.Status, literalsSchema, {
    strict: false, // NOTE: 引数の型をうまく指定できなかったのでstrictをfalseにしている
    decode: (input, _, ast) =>
      pipe(
        input,
        Retrievers.statusOption,
        ParseResult.fromOption(() => new ParseResult.Forbidden(ast, input, "Expected literals but got undefined")),
      ),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const PeopleToStringArray = () =>
  Schema.transformOrFail(ResProps.People, Schema.Array(Schema.String), {
    strict: true,
    decode: Function.compose(Retrievers.people, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const UrlToOptionString = () =>
  Schema.transformOrFail(ResProps.Url, Schema.Option(Schema.String), {
    strict: true,
    decode: Function.compose(Retrievers.urlOption, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const UrlToString = () =>
  Schema.transformOrFail(ResProps.Url, Schema.String, {
    strict: true,
    decode: (input, _, ast) =>
      pipe(
        input,
        Retrievers.urlOption,
        ParseResult.fromOption(() => new ParseResult.Forbidden(ast, input, "Expected a string but got undefined")),
      ),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const CheckboxToBoolean = () =>
  Schema.transformOrFail(ResProps.Checkbox, Schema.Boolean, {
    strict: true,
    decode: Function.compose(Retrievers.checkbox, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });
