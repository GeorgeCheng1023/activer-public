import React from 'react';
import { selectRecommendTags, addStorage } from 'store/searchPanel';
import Tag, { TagType } from 'components/Tag';

// hooks
import { useAppSelector, useAppDispatch } from 'hooks/redux';

function RecommendTag() {
  const dispatch = useAppDispatch();
  // to add recommend tag to storage
  const handleAddTag = (clickedTag: TagType) => {
    dispatch(addStorage(clickedTag));
  };

  //  to render the Recommend tag
  function renderTag(tag: TagType) {
    return (
      <Tag
        key={tag.id}
        variant={tag.variant}
        icon="plus"
        text={tag.text}
        id={tag.id}
        onClick={handleAddTag}
      />
    );
  }

  const tagsRecommend = useAppSelector(selectRecommendTags);
  return (
    <>
      <h2 className="search__h2">推薦標籤</h2>
      <div className="search--flex">
        {tagsRecommend.map(renderTag)}
      </div>
    </>
  );
}

export default RecommendTag;
