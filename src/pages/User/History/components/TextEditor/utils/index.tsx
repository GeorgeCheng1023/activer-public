import {
  Editor, Element as SlateElement, Transforms,
} from 'slate';
import {
  TEXT_ALIGN_TYPES, LIST_TYPES, ElementType,
} from '../types';

export const isBlockActive = (editor: Editor, format: string, blockType:string = 'type') => {
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

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n)
      && SlateElement.isElement(n)
      && LIST_TYPES.includes(n.type)
      && !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    const getFormatType = (isActiveType:boolean, isListType:boolean) : ElementType => {
      if (isListType) {
        return 'paragraph' as ElementType;
      } if (isActiveType) {
        return 'bulleted-list' as ElementType;
      }
      return format as ElementType;
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

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
