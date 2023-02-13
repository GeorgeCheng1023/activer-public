import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

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
  BsTypeH3,
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
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useCookies } from 'react-cookie';
import Loading from 'pages/Loading';
import { useParams } from 'react-router-dom';
import withShortcuts from './utils/withShortcuts';
import withImages from './utils/withImages';

import BlockButton from './components/BlockButton';
import MarkButton from './components/MarkButton';
import Leaf from './components/Leaf';
import Element from './components/Element';

import './index.scss';

import { handleKeyDown, handleDOMBeforeInput } from './handlers';
import { apiGetUserRecord, apiPostUserRecord } from '../../../../../api/user';

/*
const defaultValue: Descendant[] = [
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
*/

function TextEditor() {
  const [record, setRecord] = useState<Descendant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies] = useCookies<string>(['user']);
  const params = useParams();
  const activityId: number = parseInt(params.activityId || '', 10);
  const slateRef = React.useRef<HTMLDivElement | null>(null);

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

  const printPDF = () => {
    const domElement = document.getElementById('slate')!;
    html2canvas(domElement, {
      onclone: (document) => {
        // eslint-disable-next-line no-param-reassign
        document.getElementById('print')!.style.visibility = 'hidden';
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new JsPDF();
      pdf.setFontSize(6);
      const slateWidth = slateRef.current?.getBoundingClientRect().width;
      const formatSlateWidth = (slateWidth || 1200) / 20;
      const slateHeight = slateRef.current?.getBoundingClientRect().height;
      const formatslateHeight = (slateHeight || 1200) / 20;
      pdf.addImage(imgData, 'JPEG', 10, 10, formatSlateWidth, formatslateHeight);
      // pdf.output('dataurlnewwindow');
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  const sendRecord = async (content: Descendant[]) => {
    try {
      await apiPostUserRecord(activityId, JSON.stringify(content), cookies.sessionToken);
    } catch (err: any) {
      if (!err.response) {
        // eslint-disable-next-line no-console
        console.log('伺服器無回應');
      } else if (err.response?.status === 401) {
        // eslint-disable-next-line no-console
        console.log('驗證碼錯誤');
      } else {
        // eslint-disable-next-line no-console
        console.log('伺服器懶蛋');
      }
    }
  };

  useEffect(() => {
    const fetchRecord = async (id: number) => {
      try {
        const response = await apiGetUserRecord(id, cookies.sessionToken);
        if (response.data.content && response.data.content !== '') {
          setRecord(JSON.parse(response.data.content));
        } else {
          setRecord([
            {
              type: 'paragraph',
              children: [{ text: '寫入您的心得感想...' }],
            },
          ]);
        }
        setLoading(false);
      } catch (err: any) {
        if (!err.response) {
          // eslint-disable-next-line no-console
          console.log('伺服器無回應');
        } else if (err.response?.status === 401) {
          // eslint-disable-next-line no-console
          console.log('驗證碼錯誤');
        } else {
          // eslint-disable-next-line no-console
          console.log('伺服器懶蛋');
        }
        setLoading(false);
      }
    };

    fetchRecord(activityId);
  }, []);

  if (loading) return <Loading />;

  return (
    <Slate
      editor={editor}
      value={record}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== 'set_selection',
        );
        // eslint-disable-next-line no-console
        console.log(isAstChange);
        if (isAstChange) {
          // Save the value to Local Storage.
          // const content = JSON.stringify(value);
          // localStorage.setItem('slate-content', content);
          sendRecord(value);
        }
      }}
    >
      <div className="text-editor">
        <div className="text-editor__toolbar">
          <MarkButton format="bold" icon={<BsTypeBold />} />
          <MarkButton format="italic" icon={<BsTypeItalic />} />
          <MarkButton format="underline" icon={<BsTypeUnderline />} />
          <MarkButton format="code" icon={<BsCode />} />
          <BlockButton format="heading-one" icon={<BsTypeH1 />} />
          <BlockButton format="heading-two" icon={<BsTypeH2 />} />
          <BlockButton format="heading-three" icon={<BsTypeH3 />} />
          <BlockButton format="block-quote" icon={<MdFormatQuote />} />
          <BlockButton format="numbered-list" icon={<MdOutlineFormatListNumbered />} />
          <BlockButton format="bulleted-list" icon={<MdOutlineFormatListBulleted />} />
          <BlockButton format="left" icon={<MdOutlineFormatAlignLeft />} />
          <BlockButton format="center" icon={<MdOutlineFormatAlignCenter />} />
          <BlockButton format="right" icon={<MdOutlineFormatAlignRight />} />
          <BlockButton format="justify" icon={<MdOutlineFormatAlignJustify />} />
          <button id="print" type="button" onClick={printPDF}>PDF</button>
        </div>
        <div id="slate" ref={slateRef}>
          <Editable
            className="text-editor__textarea"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="寫入您的心得感想..."
            spellCheck
            autoFocus
            onDOMBeforeInput={() => handleDOMBeforeInput(editor)}
            onKeyDown={(e) => handleKeyDown(e, editor)}
          />
        </div>
      </div>
    </Slate>
  );
}

export default TextEditor;
