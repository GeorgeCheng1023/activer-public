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
        type={tag.type}
        icon="minus"
        variant={{ reverse: true }}
        text={tag.text}
        id={tag.id}
        onClick={() => handleRemoveTag(tag)}
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
