import React from 'react';
import { useDrag } from 'react-dnd';
import Tag from 'components/Tag';

export const DragType = {
  TAG: 'tag',
};

type Props = {
  color: string,
  text: string,
  key: string,
};

function DragTag({ color, text, key }: Props) {
  // eslint-disable
  // @ts-ignore
  const [{}, dragRef] = useDrag({
    type: DragType.TAG,
    item: {
      color, text, key,
    },
  });
  return (
    <div ref={dragRef}>
      <Tag color={color as TagType['color']} text={text} />
    </div>
  );
}

export default DragTag;
