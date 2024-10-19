import { format } from "date-fns";

export function createTitleProp(content: string) {
  return { title: [{ text: { content } }] };
}

export function createRichTextProp(content: string) {
  return {
    rich_text: [{ text: { content } }],
  };
}

export function createNumberProp(number: number) {
  return { number };
}

export function createSelectProp(name: string) {
  return { select: { name } };
}

export function createMultiSelectProp(names: string[]) {
  return { multi_select: names.map((name) => ({ name })) };
}

export function createUrlProp(url: string) {
  return { url };
}

export function createCheckboxProp(checked: boolean) {
  return { checkbox: checked };
}

export function createRelationProp(ids: string[]) {
  return { relation: ids.map((id) => ({ id })) };
}

export function createDateProp({ start, end, includeTime }: { start: Date; end?: Date; includeTime?: boolean }) {
  const formatString = includeTime ? "yyyy-MM-dd'T'HH:mm:ss+09:00" : "yyyy-MM-dd";
  return {
    date: {
      start: format(start, formatString),
      ...(end && { end: format(end, formatString) }),
    },
  };
}
