import { Schema } from "@effect/schema";

import { Color, ColorBase, TimeZone } from "./constants-schema.js";
import { mutableStruct } from "./schema-utils.js";

export const DateObject = mutableStruct({
  start: Schema.String,
  end: Schema.String.pipe(Schema.NullOr),
  time_zone: TimeZone.pipe(Schema.NullOr),
});

export const Annotation = mutableStruct({
  bold: Schema.Boolean,
  italic: Schema.Boolean,
  strikethrough: Schema.Boolean,
  underline: Schema.Boolean,
  code: Schema.Boolean,
  color: Color,
});

export const SelectObject = mutableStruct({
  id: Schema.String,
  name: Schema.String,
  color: ColorBase,
});

export const MultiSelect = mutableStruct({
  type: Schema.Literal("multi_select"),
  multi_select: SelectObject.pipe(Schema.Array, Schema.mutable),
  id: Schema.String,
});

export const Status = mutableStruct({
  type: Schema.Literal("status"),
  status: SelectObject.pipe(Schema.NullOr),
  id: Schema.String,
});

export const Email = mutableStruct({
  type: Schema.Literal("email"),
  email: Schema.String,
  id: Schema.String,
});

export const PartialUser = mutableStruct({
  object: Schema.Literal("user"),
  id: Schema.String,
});

export const PersonUser = mutableStruct({
  type: Schema.Literal("person"),
  object: Schema.Literal("user"),
  id: Schema.String,
  person: mutableStruct({ email: Schema.String }),
  name: Schema.String.pipe(Schema.NullOr),
  avatar_url: Schema.String.pipe(Schema.NullOr),
});

export const BotUser = mutableStruct({
  type: Schema.Literal("bot"),
  object: Schema.Literal("user"),
  id: Schema.String,
  bot: mutableStruct({
    owner: Schema.Union(
      mutableStruct({ type: Schema.Literal("user"), user: PersonUser }),
      mutableStruct({ type: Schema.Literal("workspace"), workspace: Schema.Literal(true) }),
    ),
    workspace_name: Schema.String.pipe(Schema.NullOr),
  }),
  name: Schema.String.pipe(Schema.NullOr),
  avatar_url: Schema.String.pipe(Schema.NullOr),
});

export const TextRichText = mutableStruct({
  type: Schema.Literal("text"),
  text: mutableStruct({
    content: Schema.String,
    link: mutableStruct({ url: Schema.String }).pipe(Schema.optional),
  }).pipe(Schema.mutable),
  annotations: Annotation.pipe(Schema.optional),
  plain_text: Schema.String.pipe(Schema.optional),
  href: Schema.String.pipe(Schema.optional),
});

export const UserMention = mutableStruct({
  type: Schema.Literal("user"),
  user: Schema.Union(PartialUser, PersonUser, BotUser),
});
export const DateMention = mutableStruct({ type: Schema.Literal("date"), date: DateObject });
export const PageMention = mutableStruct({ page: mutableStruct({ id: Schema.String }) });
export const DatabaseMention = mutableStruct({ database: mutableStruct({ id: Schema.String }) });
export const TemplateMention = mutableStruct({
  template_mention: Schema.Union(
    mutableStruct({
      type: Schema.Literal("template_mention_date"),
      template_mention_date: Schema.Literal("today", "now"),
    }),
    mutableStruct({ type: Schema.Literal("template_mention_user"), template_mention_user: Schema.Literal("me") }),
  ),
});

export const MentionRichTextItemRequest = mutableStruct({
  type: Schema.Literal("mention"),
  mention: Schema.Union(UserMention, DateMention, PageMention, DatabaseMention, TemplateMention),
  annotations: Annotation,
});

export const MentionRichText = mutableStruct({
  type: Schema.Literal("mention"),
  mention: Schema.Union(
    UserMention,
    DateMention,
    TemplateMention,
    // TODO: link preview
    PageMention,
    DatabaseMention,
  ),
  annotations: Annotation,
  plain_text: Schema.String,
  href: Schema.String.pipe(Schema.NullOr),
});

export const Equation = mutableStruct({
  type: Schema.Literal("equation"),
  equation: mutableStruct({ expression: Schema.String }),
  annotations: Annotation,
});
export const RichTextItemRequest = Schema.Union(TextRichText, MentionRichTextItemRequest, Equation).pipe(
  Schema.mutable,
);

export const TextRichTextItemResponse = mutableStruct({
  type: Schema.Literal("text"),
  text: mutableStruct({
    content: Schema.String,
    link: mutableStruct({ url: Schema.String }).pipe(Schema.NullOr),
  }),
  annotations: Annotation,
  plain_text: Schema.String,
  href: Schema.String.pipe(Schema.NullOr),
});

export const LinkPreviewMentionResponse = mutableStruct({
  type: Schema.Literal("link_preview"),
  link_preview: mutableStruct({ url: Schema.String }),
});
export const TemplateMentionDateTemplateMentionResponse = mutableStruct({
  type: Schema.Literal("template_mention_date"),
  template_mention_date: Schema.Literal("today", "now"),
});
export const TemplateMentionUserTemplateMentionResponse = mutableStruct({
  type: Schema.Literal("template_mention_user"),
  template_mention_user: Schema.Literal("me"),
});
export const TemplateMentionResponse = mutableStruct({
  type: Schema.Literal("template_mention"),
  template_mention: Schema.Union(
    TemplateMentionDateTemplateMentionResponse,
    TemplateMentionUserTemplateMentionResponse,
  ),
});
export const PageMentionResponse = mutableStruct({
  type: Schema.Literal("page"),
  page: mutableStruct({ id: Schema.String }),
});
export const DatabaseMentionResponse = mutableStruct({
  type: Schema.Literal("database"),
  database: mutableStruct({ id: Schema.String }),
});
export const MentionRichTextItemResponse = mutableStruct({
  type: Schema.Literal("mention"),
  mention: Schema.Union(
    UserMention,
    DateMention,
    TemplateMentionResponse,
    LinkPreviewMentionResponse,
    PageMentionResponse,
    DatabaseMentionResponse,
  ),
  annotations: Annotation,
  plain_text: Schema.String,
  href: Schema.String.pipe(Schema.NullOr),
});

export const EquationRichTextItemResponse = mutableStruct({
  type: Schema.Literal("equation"),
  equation: mutableStruct({ expression: Schema.String }),
  annotations: Annotation,
  plain_text: Schema.String,
  href: Schema.String.pipe(Schema.NullOr),
});
export const RichTextItemResponse = Schema.Union(
  TextRichTextItemResponse,
  MentionRichTextItemResponse,
  EquationRichTextItemResponse,
);
