import React, { useState, useCallback, useEffect } from 'react';

import { TagType } from 'components/Tag';
import './index.scss';
import update from 'immutability-helper';
import DragTag from './components/DragTag';

type Props = {
  canDrag?: boolean;
  onChange?: (tag: TagType[]) => void;
  tags: Array<TagType>
};

function TagSort({ onChange, canDrag, tags: tagsInput }: Props) {
  const [tags, setTags] = useState<Array<TagType>>(tagsInput);

  useEffect(() => {
    setTags(tagsInput);
  }, [tagsInput]);

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
      variant={tag.variant}
      text={tag.text}
      icon="move"
      index={index}
      id={tag.id}
      key={tag.id}
      handleMoveTag={handleMoveTag}
    />
  ), []);

  if (canDrag) {
    return (
      <ol className="tag-sort">
        {tags.map((tag, i) => renderTag(tag, i))}
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
