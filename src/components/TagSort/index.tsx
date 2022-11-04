import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TagType } from 'components/Tag';
import DropColumn from './components/DropColumn';

const defaultTags: Array<TagType> = [{
  color: 'primary',
  text: 'Test',
  id: 'c1',
},
{
  color: 'success',
  text: 'Free',
  id: 'c2',
},
];

function TagSort() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState<Array<TagType>>(defaultTags);

  const handleMoveTag = (moveTag: any) => {
    console.log(moveTag);
    const newTags = tags.filter((tag) => tag.id !== moveTag.key);
    setTags(newTags);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DropColumn tags={tags} handleMoveTag={handleMoveTag} />
    </DndProvider>
  );
}

export default TagSort;
