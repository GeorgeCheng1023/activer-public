import React, { useCallback, useMemo } from 'react';

import {
  Editable, withReact, Slate, RenderLeafProps, RenderElementProps,
} from 'slate-react';
import {
  createEditor, Descendant,
} from 'slate';
import { withHistory } from 'slate-history';
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsCode,
  BsTypeH1,
  BsTypeH2,
} from 'react-icons/bs';
import {
  MdFormatQuote,
  MdOutlineFormatListNumbered,
  MdOutlineFormatListBulleted,
  MdOutlineFormatAlignLeft,
  MdOutlineFormatAlignCenter,
  MdOutlineFormatAlignRight,
  MdOutlineFormatAlignJustify,
} from 'react-icons/md';

import withShortcuts from './utils/withShortcuts';
import withImages from './utils/withImages';

import BlockButton from './components/BlockButton';
import MarkButton from './components/MarkButton';
import InsertImageButton from './components/InsertImageButton';
import Leaf from './components/Leaf';
import Element from './components/Element';

import './index.scss';

import { handleKeyDown, handleDOMBeforeInput } from './handlers';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

function TextEditor() {
  const renderElement = useCallback(
    (props: RenderElementProps) => (

      <Element
        element={props.element}
        attributes={props.attributes}
      >
        {props.children}
      </Element>
    ),
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => (
      <Leaf
        text={props.text}
        leaf={props.leaf}
        attributes={props.attributes}
      >
        {props.children}
      </Leaf>
    ),
    [],
  );
  const editor = useMemo(
    () => withImages(
      withShortcuts(
        withHistory(
          withReact(createEditor()),
        ),
      ),
    ),
    [],
  );

  return (
    <Slate editor={editor} value={initialValue}>
      <div className="text-editor">
        <div className="text-editor__toolbar">
          <MarkButton format="bold" icon={<BsTypeBold />} />
          <MarkButton format="italic" icon={<BsTypeItalic />} />
          <MarkButton format="underline" icon={<BsTypeUnderline />} />
          <MarkButton format="code" icon={<BsCode />} />
          <BlockButton format="heading-one" icon={<BsTypeH1 />} />
          <BlockButton format="heading-two" icon={<BsTypeH2 />} />
          <BlockButton format="heading-three" icon={<BsTypeH2 />} />
          <BlockButton format="block-quote" icon={<MdFormatQuote />} />
          <BlockButton format="numbered-list" icon={<MdOutlineFormatListNumbered />} />
          <BlockButton format="bulleted-list" icon={<MdOutlineFormatListBulleted />} />
          <BlockButton format="left" icon={<MdOutlineFormatAlignLeft />} />
          <BlockButton format="center" icon={<MdOutlineFormatAlignCenter />} />
          <BlockButton format="right" icon={<MdOutlineFormatAlignRight />} />
          <BlockButton format="justify" icon={<MdOutlineFormatAlignJustify />} />
          <InsertImageButton />
        </div>
        <Editable
          className="text-editor__textarea"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onDOMBeforeInput={() => handleDOMBeforeInput(editor)}
          onKeyDown={(e) => handleKeyDown(e, editor)}
        />
      </div>

    </Slate>
  );
}

export default TextEditor;
