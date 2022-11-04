import React from 'react';
import { useDrop } from 'react-dnd';
import { TagType } from 'components/Tag';
import DragTag, { DragType } from '../DragTag';

type Props = {
  tags: Array<TagType>;
  handleMoveTag: (moveTag: any) => void;
};

function DropColumn({ tags, handleMoveTag }: Props) {
  const listTags = tags.map((tag) => (
    <DragTag tag={tag} key={tag.id} />));

  // set useDrop

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collectedProps, dropRef] = useDrop({
    accept: DragType.TAG,
    drop: (item: any) => {
      handleMoveTag(item);
    },

  });

  return (
    <div className="drop-column" ref={dropRef}>
      {listTags}
    </div>
  );
}

export default DropColumn;
