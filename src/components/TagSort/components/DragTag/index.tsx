import React from 'react';
import { useDrag } from 'react-dnd';
import Tag, { TagType } from 'components/Tag';

export const DragType = {
  TAG: 'tag',
};

type Props = {
  tag: TagType,
};

function DragTag({ tag }: Props) {
  const {
    id, color, text, icon,
  } = tag;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collected, dragRef] = useDrag({
    type: DragType.TAG,
    item: {
      color, text, id,
    },
  });
  return (
    <div ref={dragRef}>
      <Tag color={color as TagType['color']} text={text} id={id} icon={icon} />
    </div>
  );
}

export default DragTag;
