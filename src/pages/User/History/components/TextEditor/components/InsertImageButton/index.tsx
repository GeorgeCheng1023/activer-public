import React from 'react';
import { useSlateStatic } from 'slate-react';
import { BiImageAlt } from 'react-icons/bi';
import Button from '../Button';
import { insertImage } from '../../utils/withImages';

function InsertImageButton() {
  const editor = useSlateStatic();
  const handleMouseDown = (event: any) => {
    event.preventDefault();
    const url = window.prompt('Enter the URL of the image:');
    if (url) { insertImage(editor, url); }
  };

  return (
    <Button
      onMouseDown={handleMouseDown}
    >
      <BiImageAlt />
    </Button>
  );
}

export default InsertImageButton;
