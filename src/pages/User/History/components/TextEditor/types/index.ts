import { BaseEditor, BaseText, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type FormatButtonProps = {
  format: Omit<BaseText, 'text'>,
  icon: React.ReactNode
};
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export interface BaseProps {
  className: string
  [key: string]: unknown
}

export type OrNull<T> = T | null;

export type LeafProps = {
  attribute: string
};

export type BlockQuoteElement = {
  type: 'block-quote'
  align?: string
  children: Descendant[]
};

export type BulletedListElement = {
  type: 'bulleted-list'
  align?: string
  children: Descendant[]
};

export type HeadingElement = {
  type: 'heading'
  align?: string
  children: Descendant[]
};

export type HeadingTwoElement = {
  type: 'heading-two'
  align?: string
  children: Descendant[]
};

export type ParagraphElement = {
  type: 'paragraph'
  align?: string
  children: Descendant[]
};

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | HeadingElement
  | HeadingTwoElement
  | ParagraphElement;

export type CustomText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  text: string
};

export type EmptyText = {
  text: string
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText | EmptyText
  }
}
