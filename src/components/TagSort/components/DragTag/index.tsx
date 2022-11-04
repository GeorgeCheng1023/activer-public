import React from 'react';
import { useDrag } from 'react-dnd';
import Tag, { TagType } from 'components/Tag';

export const DragType = {
  TAG: 'tag',
};

function DragTag({ color, text, key }: TagType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collected, dragRef] = useDrag({
    type: DragType.TAG,
    item: {
      color, text, key,
    },
  });
  return (
    <div ref={dragRef}>
      <Tag color={color as TagType['color']} text={text} key={key} />
    </div>
  );
}

export default DragTag;
