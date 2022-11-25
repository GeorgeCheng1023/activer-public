import {
  Editor, Element, Transforms,
} from 'slate';
import {
  TEXT_ALIGN_TYPES, LIST_TYPES,
} from '../types';

export const isBlockActive = (editor: Editor, format: string, blockType:string = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n: any) => (
        !Editor.isEditor(n)
        && Element.isElement(n)
        && n[blockType as keyof typeof n] === format
      ),
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
    match: (n: any) => !Editor.isEditor(n)
      && Element.isElement(n)
      && LIST_TYPES.includes(n.type)
      && !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  let newProperties: Partial<Element>;

  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    const getFormatType = (isActiveType:boolean, isListType:boolean) : Element['type'] => {
      if (isActiveType) {
        return 'paragraph';
      } if (isListType) {
        return 'list-item';
      }
      return format as Element['type'];
    };
    newProperties = {
      type: getFormatType(isActive, isList),
    };
  }
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block: Element = {
      type: format as Element['type'],
      children: [],
    };
    Transforms.wrapNodes(editor, block);
  }
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
