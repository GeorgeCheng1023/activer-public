import React from 'react';
import { useSlate } from 'slate-react';
import { FormatButtonProps } from '../../types';
import { isMarkActive, toggleMark } from '../../utils';
import Button from '../Button';

function MarkButton({ format, icon }: FormatButtonProps) {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
}

export default MarkButton;
