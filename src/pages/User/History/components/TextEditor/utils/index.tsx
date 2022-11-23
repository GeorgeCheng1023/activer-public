import {
  BaseEditor, BaseText, Editor, Element as SlateElement, Transforms,
} from 'slate';
import { TEXT_ALIGN_TYPES, LIST_TYPES } from '../types';

declare module 'slate' {
  export interface BaseElement {
    type: string;
  }
}

export const isBlockActive = (editor: BaseEditor, format: Omit<BaseText, 'text'>, blockType:string = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n)
        && SlateElement.isElement(n)
        && n[blockType as keyof typeof n] === format,
    }),
  );
  return !!match;
};

export const toggleBlock = (editor: Editor, format: Omit<BaseText, 'text'>) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format.toString()) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format.toString());

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n)
      && SlateElement.isElement(n)
      && LIST_TYPES.includes(n.type)
      && !TEXT_ALIGN_TYPES.includes(format.toString()),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format.toString())) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isMarkActive = (editor: BaseEditor, format:Omit<BaseText, 'text'>) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof format] === true : false;
};

export const toggleMark = (editor: BaseEditor, format: Omit<BaseText, 'text'>) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format.toString());
  } else {
    Editor.addMark(editor, format.toString(), true);
  }
};
