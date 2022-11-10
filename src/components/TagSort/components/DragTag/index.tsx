import React, { useRef } from 'react';
import Tag, { TagType } from 'components/Tag';
import { useDrop, useDrag } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import './index.scss';

const DragType = {
  TAG: 'tag',
};

interface Props extends TagType {
  index: number;
  handleMoveTag: (dragIndex: number, hoverIndex: number) => void;
}
interface DragTagType {
  tag: TagType;
  index: number;
}

function DropColumn({
  variant, text, icon, index, id, handleMoveTag,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // set useDrop
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ handlerId }, drop] = useDrop<
  DragTagType, void, { handlerId: Identifier | null }
  >({
    accept: DragType.TAG,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(tag: DragTagType, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = tag.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        // eslint-disable-next-line no-useless-return
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      handleMoveTag(dragIndex, hoverIndex);

      // Note: we're mutating the monitor for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      tag.index = hoverIndex;
    },
  });

  // set useDrag
  const [{ isDragging }, drag] = useDrag({
    type: DragType.TAG,
    item: {
      id, index,
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li>
      <div
        className={`drag-tag ${isDragging ? 'drag-tag--isDragging' : ''}`}
        ref={ref}
        data-handler-id={handlerId}
      >
        <Tag
          variant={variant}
          text={text}
          id={id}
          icon={icon}
        />
      </div>
    </li>
  );
}

export default DropColumn;
