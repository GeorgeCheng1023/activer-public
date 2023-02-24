import React from 'react';
import { selectRecommendTags, addStorage } from 'store/searchPanel';
import Tag, { TagType } from 'components/Tag';

// hooks
import { useAppSelector, useAppDispatch } from 'hooks/redux';

function RecommendTag() {
  const dispatch = useAppDispatch();
  // to add recommend tag to storage
  const handleAddTag = (tag: TagType) => {
    dispatch(addStorage(tag));
  };

  const tagsRecommend = useAppSelector(selectRecommendTags);
  return (
    <>
      <h2 className="search-panel__h2">推薦標籤</h2>
      <div className="search-panel__tags">
        {tagsRecommend.map((tag) => (
          <Tag
            key={tag.id}
            type={tag.type}
            icon="plus"
            variant={{ reverse: true }}
            text={tag.text}
            id={tag.id}
            onClick={() => handleAddTag(tag)}
          />
        ))}
      </div>
    </>
  );
}

export default RecommendTag;
