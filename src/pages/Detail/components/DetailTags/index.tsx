import React, { useState } from 'react';
import { TagDataType, ActivityTagDataType } from 'types/ActivityDataType';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { BsPlus } from 'react-icons/bs';
import VotePanel from '../VotePanel';
import './index.scss';

type Props = {
  tags:ActivityTagDataType[] | null
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
        <div className="detail__tags">
          <div className="detail__tags__group">
            {
              tags.map((tag: TagDataType) => {
                const variant = tag.type as TagType['type'];
                return (
                  <Tag
                    id={`detail-tag-${tag.id!.toString()}`}
                    key={`detail-tag-${tag.id!.toString()}`}
                    text={tag.text}
                    type={variant}
                  />
                );
              }).slice(0, 5)
            }
          </div>
          <Button
            text="新增標籤"
            onClick={handleShowVotePanel}
            color="dark"
            iconAfter={<BsPlus />}
          />

        </div>
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
