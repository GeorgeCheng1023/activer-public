/* eslint-disable react/jsx-props-no-spreading  */
// disable upper rule for passin "attributes" value better
import React, { CSSProperties } from 'react';
import { RenderElementProps } from 'slate-react';
import { TextAlignType } from '../../types';

function Element({ attributes, children, element }: RenderElementProps) {
  const style: CSSProperties = { textAlign: element.align as TextAlignType };

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          style={{ ...style }}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul
          style={{ ...style }}
          {...attributes}
        >
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1
          style={{ ...style }}
          {...attributes}
        >
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2
          style={{ ...style }}
          {...attributes}
        >
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3
          style={{ ...style }}
          {...attributes}
        >
          {children}
        </h3>
      );
    case 'list-item':
      return (
        <li
          style={{ ...style }}
          {...attributes}
        >
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol
          style={{ ...style }}
          {...attributes}
        >
          {children}
        </ol>
      );
    default:
      return (
        <p
          style={{ ...style }}
          {...attributes}
        >
          {children}
        </p>
      );
  }
}

export default Element;
