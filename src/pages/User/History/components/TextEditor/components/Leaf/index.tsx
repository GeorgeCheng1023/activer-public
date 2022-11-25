/* eslint-disable react/jsx-props-no-spreading  */
// disable upper rule for passin "attributes" value better
import React from 'react';
import { RenderLeafProps } from 'slate-react';
import { CustomText } from '../../types';

function renderInnerText(leaf: CustomText, children: any) : React.ReactNode {
  if (leaf.bold) {
    return <strong>{children}</strong>;
  }
  if (leaf.italic) {
    return <i>{children}</i>;
  }
  if (leaf.code) {
    return <code>{children}</code>;
  }
  if (leaf.underline) {
    return <u>{children}</u>;
  }
  return <span>{children}</span>;
}

function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  return (
    <span {...attributes}>
      {renderInnerText(leaf, children)}
    </span>
  );
}

export default Leaf;
