/* eslint-disable react/jsx-props-no-spreading  */
// disable upper rule for passin "attributes" value better

import React from 'react';
import {
  RenderElementProps,
  useSlateStatic,
  ReactEditor,
  useSelected,

  useFocused,
} from 'slate-react';
import { Transforms } from 'slate';
import { AiOutlineDelete } from 'react-icons/ai';
import Button from '../Button';
import { ImageElement } from '../../types';

interface RenderImageElementProps extends Omit<RenderElementProps, 'element'> {
  element: ImageElement
}

function Image({ attributes, children, element }: RenderImageElementProps) {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes} contentEditable={false}>
      {children}

      <img
        src={element.url}
        className={`
          text-editor__image${selected && focused ? '--active' : ''}
          `}
        alt="text-editor-img"
      />
      <Button
        active
        onClick={() => Transforms.removeNodes(editor, { at: path })}
        className={`
        text-editor__image__remove-button${selected && focused ? '--active' : ''}`}
      >
        <AiOutlineDelete />
      </Button>

    </div>
  );
}

export default Image;
