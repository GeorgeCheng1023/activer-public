import React, { useState, useCallback, useEffect } from 'react';

import Tag, { TagType } from 'components/Tag';
import './index.scss';
import update from 'immutability-helper';
import DragTag from './components/DragTag';

interface TagSortType {
  disabled?: boolean;
  onChange?: (tag: TagType[]) => void;
  tags: Array<TagType>
}

function TagSort({ onChange, disabled, tags: tagsInput }: TagSortType) {
  const [tags, setTags] = useState<Array<TagType>>(tagsInput);

  useEffect(() => {
    if (onChange) { onChange(tags); }
  }, [tags]);
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
  }, []);

  const renderTag = useCallback((tag: TagType, index: number) => (
    <DragTag
      type={tag.type}
      text={tag.text}
      icon="move"
      index={index}
      id={tag.id}
      key={tag.id}
      handleMoveTag={handleMoveTag}
    />
  ), []);

  if (disabled) {
    return (
      <ol className="tag-sort">
        {tags.map((tag) => (
          <li key={tag.id}>
            <div
              className="drag-tag"
            >
              <Tag
                id={tag.id}
                type={tag.type}
                key={tag.id}
                text={tag.text}
                icon="move"
                disabled={disabled}
              />
            </div>
          </li>
        ))}
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
  disabled: false,
};

export default TagSort;
