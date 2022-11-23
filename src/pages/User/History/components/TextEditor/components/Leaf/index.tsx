import React from 'react';
import { RenderLeafProps } from 'slate-react';

function renderInnerText(text: string, children: any) : React.ReactNode {
  switch (text) {
    case 'bold':
      return <strong>{children}</strong>;
    case 'italic':
      return <em>{children}</em>;
    case 'underline':
      return <u>{children}</u>;
    case 'code':
      return <code>{children}</code>;
    default:
      return <p>{children}</p>;
  }
}

function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  return (
    <span data-slate-leaf={attributes['data-slate-leaf']}>
      {renderInnerText(leaf.text, children)}
    </span>
  );
}

export default Leaf;
