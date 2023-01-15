import React from 'react';
import {
  removeStorage,
  selectStorageTags,
} from 'store/searchPanel';
import Tag, { TagType } from 'components/Tag';

// hooks
import { useAppSelector, useAppDispatch } from 'hooks/redux';

function StorageTag() {
  const dispatch = useAppDispatch();
  const tagsStorage = useAppSelector(selectStorageTags);
  // to remove recommend tag from storage
  const handleRemoveTag = (clickedTag: TagType) => {
    dispatch(removeStorage(clickedTag));
  };

  //  to render the storage tag
  function renderTag(tag: TagType) {
    return (
      <Tag
        key={tag.id}
        variant={tag.variant}
        icon="minus"
        text={tag.text}
        id={tag.id}
        onClick={handleRemoveTag}
      />

    );
  }

  return (
    <>
      <h2 className="search-panel__h2">你的標籤庫</h2>
      <div className="search-panel__tags">
        {tagsStorage.map(renderTag)}
      </div>
    </>
  );
}

export default StorageTag;
