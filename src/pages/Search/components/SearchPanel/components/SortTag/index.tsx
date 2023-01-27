import React from 'react';

// hooks
import { useAppSelector, useAppDispatch } from 'hooks/redux';

// components
import TagSort from 'components/TagSort';
import { TagType } from 'components/Tag';
import { selectSortTags, setSortTag } from 'store/searchPanel';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

function SortTag() {
  const dispatch = useAppDispatch();
  const sortTags = useAppSelector(selectSortTags);

  // handle sort change and update tag sorting in searchValue
  const handleSortChange = (newTags : Array<TagType>) => {
    dispatch(setSortTag(newTags));
  };

  return (

    <>
      <h2 className="search-panel__h2">標籤排序</h2>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <TagSort
          tags={sortTags}
          onChange={handleSortChange}
        />
      </DndProvider>

    </>
  );
}

export default SortTag;
