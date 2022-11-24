import {
  BaseText, Editor, Element as SlateElement, Transforms,
} from 'slate';
import {
  TEXT_ALIGN_TYPES, LIST_TYPES, CustomEditor, CustomText, ElementType, CustomElement,
} from '../types';

declare module 'slate' {
  export interface BaseElement {
    type: string;
  }
}

export const isBlockActive = (editor: CustomEditor, format: Omit<CustomText, 'text'>, blockType:string = 'type') => {
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

export const toggleBlock = (editor: CustomEditor, format: Omit<CustomText, 'text'>) => {
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
      align: isActive ? undefined : format.toString(),
    };
  } else {
    const getFormatType = (isActiveType:boolean, isListType:boolean) : ElementType => {
      if (isListType) {
        return 'paragraph' as ElementType;
      } if (isActiveType) {
        return 'bulleted-list' as ElementType;
      }
      return format.toString() as ElementType;
    };
    newProperties = {
      type: getFormatType(isActive, isList),
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  // if (!isActive && isList) {
  //   const block: CustomElement = { type: format, children: [] };
  //   Transforms.wrapNodes(editor, block);
  // }
};

export const isMarkActive = (editor: CustomEditor, format:Omit<BaseText, 'text'>) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof format] === true : false;
};

export const toggleMark = (editor: CustomEditor, format: Omit<BaseText, 'text'>) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format.toString());
  } else {
    Editor.addMark(editor, format.toString(), true);
  }
};
