import { ParseResult, Schema } from "@effect/schema";

import { Function } from "effect";

import type {} from "@effect/schema/AST";
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as Retrievers from "./response-properties-retrievers.js";
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as ResProps from "./response-properties-schema.js";

export const TitleToStringOption = () =>
  Schema.transformOrFail(ResProps.Title, Schema.Option(Schema.String), {
    strict: true,
    decode: Function.compose(Retrievers.titleOption, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });

export const RelationToStringArray = () =>
  Schema.transformOrFail(ResProps.Relation, Schema.Array(Schema.String), {
    strict: true,
    decode: Function.compose(Retrievers.relation, ParseResult.succeed),
    encode: (input, _, ast) => ParseResult.fail(new ParseResult.Forbidden(ast, input, "Encoding not supported")),
  });
