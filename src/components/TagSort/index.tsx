import React, { useState, useCallback, useEffect } from 'react';

import Tag, { TagType } from 'components/Tag';
import './index.scss';
import update from 'immutability-helper';
import DragTag from './components/DragTag';

type Props = {
  disable?: boolean;
  onChange?: (tag: TagType[]) => void;
  tags: Array<TagType>
};

function TagSort({ onChange, disable, tags: tagsInput }: Props) {
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
      variant={tag.variant}
      text={tag.text}
      icon="move"
      index={index}
      id={tag.id}
      key={tag.id}
      handleMoveTag={handleMoveTag}
    />
  ), []);

  if (disable) {
    return (
      <ol className="tag-sort">
        {tags.map((tag) => (
          <li key={tag.id}>
            <div
              className="drag-tag"
            >
              <Tag
                id={tag.id}
                variant={tag.variant}
                key={tag.id}
                text={tag.text}
                icon="move"
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
  disable: false,
};

export default TagSort;
