import React from 'react';
import { useSlate } from 'slate-react';
import type { FormatButtonProps } from '../../types';
import { TEXT_ALIGN_TYPES } from '../../types';
import { isBlockActive, toggleBlock } from '../../utils';
import Button from '../Button';

function BlockButton({ format, icon }: FormatButtonProps) {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
      )}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
}

export default BlockButton;
