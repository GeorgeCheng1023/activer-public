import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TagType } from 'components/Tag';
import './index.scss';
import update from 'immutability-helper';
import DragTag from './components/DragTag';

type Props = {
  canDrag?: boolean;
  onChange?: (tag: TagType[]) => void;
  defaultTags: Array<TagType>
};

function TagSort({ onChange, canDrag, defaultTags }: Props) {
  const [tags, setTags] = useState<Array<TagType>>(defaultTags);

  const handleMoveTag = useCallback((dragIndex: number, hoverIndex: number) => {
    setTags((prevTags: Array<TagType>) => update(prevTags, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevTags[dragIndex] as TagType],
      ],
    }));
    if (onChange) { onChange(tags); }
  }, []);

  const renderTag = useCallback((tag: TagType, index: number) => (
    <DragTag
      color={tag.color}
      text={tag.text}
      icon={tag.icon}
      index={index}
      id={tag.id}
      handleMoveTag={handleMoveTag}
    />
  ), []);

  if (canDrag) {
    return (
      <ol className="tag-sort">
        <DndProvider backend={HTML5Backend}>
          {tags.map((tag, i) => renderTag(tag, i))}
        </DndProvider>
      </ol>
    );
  }

  return (
    <ol className="tag-sort">
      {tags.map((tag, i) => renderTag(tag, i))}
    </ol>
  );
}

TagSort.defaultProps = {
  onChange: undefined,
  canDrag: true,
};

export default TagSort;
