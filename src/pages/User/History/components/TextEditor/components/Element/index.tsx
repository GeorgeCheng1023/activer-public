/* eslint-disable react/jsx-props-no-spreading  */
// disable upper rule for passin "attributes" value better
import React from 'react';
import { RenderElementProps } from 'slate-react';

function Element({ attributes, children, element }: RenderElementProps) {
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          className={element.align}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul
          className={element.align}
          {...attributes}
        >
          {children}
        </ul>
      );
    case 'heading':
      return (
        <h1
          className={element.align}
          {...attributes}
        >
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2
          className={element.align}
          {...attributes}
        >
          {children}
        </h2>
      );
    case 'numbered-list':
      return (
        <ol
          className={element.align}
          {...attributes}
        >
          {children}
        </ol>
      );
    default:
      return (
        <p
          className={element.align}
          {...attributes}
        >
          {children}
        </p>
      );
  }
}

export default Element;
