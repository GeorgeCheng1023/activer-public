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
  BsFileEarmarkPdf,
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
import { useParams } from 'react-router-dom';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useCookies } from 'react-cookie';
import Loading from 'pages/Loading';
import { throwError } from 'pages/Error';

// components
import Button from './components/Button';
import BlockButton from './components/BlockButton';
import MarkButton from './components/MarkButton';
import Leaf from './components/Leaf';
import Element from './components/Element';

// utils
import withShortcuts from './utils/withShortcuts';
import withImages from './utils/withImages';

import './index.scss';

import { handleKeyDown, handleDOMBeforeInput } from './handlers';
import { apiGetUserRecord, apiPostUserRecord } from '../../../../../api/user';

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
    html2canvas(domElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new JsPDF();
      // Grab the ratio of length and width
      const slateWidth = slateRef.current?.getBoundingClientRect().width;
      const formatSlateWidth = (slateWidth || 1200) / 6;
      const slateHeight = slateRef.current?.getBoundingClientRect().height;
      const formatslateHeight = (slateHeight || 1200) / 6;
      pdf.addImage(imgData, 'JPEG', 10, 10, formatSlateWidth, formatslateHeight);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  const sendRecord = async (content: Descendant[]) => {
    const response = await apiPostUserRecord(
      activityId,
      JSON.stringify(content),
      cookies.sessionToken,
    );
    if (!response) throwError('伺服器無回應', 500);
  };

  useEffect(() => {
    const fetchRecord = async (id: number) => {
      const response = await apiGetUserRecord(id, cookies.sessionToken);
      if (response.data.content && response.data.content !== '') {
        setRecord(JSON.parse(response.data.content));
      } else {
        // default
        setRecord([
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ]);
      }
      setLoading(false);
      if (!response) throwError('伺服器無回應', 500);
    };

    fetchRecord(activityId);
  }, []);

  // todo: use loader
  if (loading) return <Loading />;

  return (
    <Slate
      editor={editor}
      value={record}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== 'set_selection',
        );
        // check the record is stored
        // eslint-disable-next-line no-console
        console.log(isAstChange);
        if (isAstChange) {
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
          <Button onClick={printPDF}><BsFileEarmarkPdf /></Button>
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
