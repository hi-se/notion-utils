import { Schema } from "@effect/schema";
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as ResProps from "./response-properties-schema.js";
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as RPT from "./response-properties-transform.js";

export const UniqueIdString = () => Schema.compose(ResProps.UniqueId, RPT.UniqueIdToString());

export const TitleString = () => Schema.compose(ResProps.Title, RPT.TitleToString());

export const RelationStringArray = () => Schema.compose(ResProps.Relation, RPT.RelationToStringArray());

export const CreatedTimeDate = () => Schema.compose(ResProps.CreatedTime, RPT.CreatedTimeToDate());

export const LastEditedTimeDate = () => Schema.compose(ResProps.LastEditedTime, RPT.LastEditedTimeToDate());

export const SelectLiteral = <T>(literalsSchema: Schema.Schema<T, T>) =>
  Schema.compose(ResProps.Select, RPT.SelectToLiteral(literalsSchema));

export const MultiSelectLiterals = <T>(literalsSchema: Schema.Schema<T, T>) =>
  Schema.compose(ResProps.MultiSelect, RPT.MultiSelectToLiteralArray(literalsSchema));

export const StatusLiteral = <T>(literalsSchema: Schema.Schema<T, T>) =>
  Schema.compose(ResProps.Status, RPT.StatusToLiteral(literalsSchema));

export const PeopleStringArray = () => Schema.compose(ResProps.People, RPT.PeopleToStringArray());

export const DateDate = () => Schema.compose(ResProps.Date, RPT.DateToDate());

export const UrlString = () => Schema.compose(ResProps.Url, RPT.UrlToString());

export const CheckboxBoolean = () => Schema.compose(ResProps.Checkbox, RPT.CheckboxToBoolean());

