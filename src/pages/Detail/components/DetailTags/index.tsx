import React, { useState } from 'react';
import { TagDataType } from 'types/ActivityDataType';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { BsPlus } from 'react-icons/bs';
import VotePanel from '../VotePanel';
import './index.scss';

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
      <div className="detail__tag">
        <div className="detail__tag__container">
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
        </div>
        <div className="detail__tag__add-tag">
          <Button text="新增標籤" onClick={handleShowVotePanel} color="white" iconAfter={<BsPlus />} />
        </div>
        <VotePanel
          display={displayVotePanel}
          setDisplay={setDisplayVotePanel}
          tags={tags}
        />
      </div>
    );
  }
  return null;
}

export default DetailTags;
