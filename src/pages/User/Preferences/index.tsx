import React from 'react';
import TagSort from 'components/TagSort';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import dummySearchHistory from './dummySearchHistory.json';

function Preferences() {
  return (
    <>
      <h2>您的預設標籤庫</h2>

      <h2>搜尋紀錄</h2>
      <DndProvider backend={HTML5Backend}>
        {
          dummySearchHistory.map((history: any) => (
            <TagSort tags={history.DefaultTags} />
          ))
        }
      </DndProvider>
    </>
  );
}

export default Preferences;
