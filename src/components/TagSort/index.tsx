import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TagType } from 'components/Tag';
import update from 'immutability-helper';
import DropColumn from './components/DragTag';

const defaultTags: Array<TagType> = [{
  color: 'primary',
  text: 'Test',
  id: 'c1',
}, {
  color: 'secondary',
  text: 'Test',
  id: 'c1',
}, {
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

  const handleMoveTag = useCallback((dragIndex: number, hoverIndex: number) => {
    setTags((prevTags: Array<TagType>) => update(prevTags, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevTags[dragIndex] as TagType],
      ],
    }));
  }, []);

  const renderTag = useCallback((tag: TagType, index: number) => (
    <DropColumn
      color={tag.color}
      text={tag.text}
      icon={tag.icon}
      index={index}
      id={tag.id}
      handleMoveTag={handleMoveTag}
    />
  ), []);

  return (
    <DndProvider backend={HTML5Backend}>
      {tags.map((tag, i) => renderTag(tag, i))}
    </DndProvider>
  );
}

export default TagSort;
