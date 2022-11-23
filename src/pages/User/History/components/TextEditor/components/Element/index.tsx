import React from 'react';
import { RenderElementProps } from 'slate-react';
import {TEXT_ALIGN_TYPES} from '../../types'

function Element({ attributes, children, element }: RenderElementProps) {
  const style = {
    textAlign: element.align as  CSS.Properties;
  
  };

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          style={style}

        >
          {children}
        </blockquote>
      );
    case 'bulleted-list': number;
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}

export default Element;
