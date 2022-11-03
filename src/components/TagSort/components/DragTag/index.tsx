import React from 'react';
import { useDrag } from 'react-dnd';

function DragTag({ id, tag }: any) {
  const [] = useDrag(() => ({
    type: 'tag',
    item: { id },
    collect: (monitor:any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return ( 
    <div style={{   ? '30%' : '100%' }}>
      <Tag color={tag.color} text={tag.text} />
    </div>
  );
}

export default DragTag;
