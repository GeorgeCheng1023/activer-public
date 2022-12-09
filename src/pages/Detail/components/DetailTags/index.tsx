import React, { useState } from 'react';
import { TagDataType } from 'types/ActivityDataType';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { BsPlus } from 'react-icons/bs';
import VotePanel from '../VotePanel';

type Props = {
  tags: TagDataType[] | null
};

function DetailTags({ tags }: Props) {
  const [displayVotePanel, setDisplayVotePanel] = useState(false);

  const handleShowVotePanel:
  React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDisplayVotePanel(true);
  };

  if (tags) {
    return (
      <>
        {
          tags.map((tag: TagDataType) => {
            const variant = tag.Type as TagType['variant'];
            return (
              <Tag
                id={`detail-tag-${tag.Id!.toString()}`}
                key={`detail-tag-${tag.Id!.toString()}`}
                text={tag.Text}
                variant={variant}
              />
            );
          }).slice(0, 5)
        }
        <Button text="新增標籤" onClick={handleShowVotePanel} color="white" iconAfter={<BsPlus />} />
        <VotePanel
          display={displayVotePanel}
          onClose={() => setDisplayVotePanel(false)}
          tags={tags}
        />
      </>
    );
  }
  return null;
}

export default DetailTags;
