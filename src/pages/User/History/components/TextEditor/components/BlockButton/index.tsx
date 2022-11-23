import React from 'react';
import { useSlate } from 'slate-react';
import type { FormatButtonProps } from '../../types';
import { TEXT_ALIGN_TYPES } from '../../types';
import { isBlockActive } from '../../utils';

function BlockButton({ format, icon }: FormatButtonProps) {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format.toString()) ? 'align' : 'type',
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
