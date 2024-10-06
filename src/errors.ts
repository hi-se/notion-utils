import { Data } from "effect";

export class NotionError extends Data.TaggedClass("NotionError")<{ message: string }> {}
