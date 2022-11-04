import React from 'react';
import { useDrop } from 'react-dnd';
import DragTag, { DragType } from './DragTag';

function DropColumn({ tasks, columnIndex, handleMoveTag }) {
  // eslint-disable-next-line react/no-array-index-key
  const cards = tasks.map((task: any, index) => <DragTag key={`${columnIndex}-${index}`} color={task.color} text={task.text} />);

  // set useDrop
  // eslint-disable-next-line eslint/no-empty-pattern
  const [{}, dropRef] = useDrop({
    accept: DragType.TAG,
    drop: (item: any) => {
      const from = item;
      const to = { columnIndex };
      handleMoveTag(from, to);
    },

  });

  return (
    <div className="drop-column" ref={dropRef}>
      {cards}
    </div>
  );
}

export default DropColumn;
