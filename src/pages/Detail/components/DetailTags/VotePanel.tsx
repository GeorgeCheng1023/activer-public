import React, { useState } from 'react';
import './index.scss';
import Popup, { PopupDisplayProps } from 'components/Popup';
import FormSearchTag from 'components/Form/FormSearchTag';
import { TagDataType } from 'types/ActivityDataType';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Props extends PopupDisplayProps {
  tags: TagDataType[]
}

const dummyUserTagVoted = [
  {
    Type: 'Area',
    Id: 90,
    Text: '教育',
  },
];

interface VoteTagProps extends TagDataType {
  userVoted: boolean
}

const isVoted = (inputTag: TagDataType) => {
  if (dummyUserTagVoted.find((votedTag) => votedTag.Id === inputTag.Id)) {
    return true;
  }
  return false;
};

function VotePanel({ display, setDisplay, tags }: Props) {
  const initialTags = tags.map((tag) => ({
    ...tag,
    userVoted: isVoted(tag),
  }));
  // eslint-disable-next-line
  const [votedTags, setVotedTags] = useState<VoteTagProps[]>(initialTags);
  console.log(initialTags);

  const handleVotedButtonClick = (e) => {
    e.preventDefault();
  };

  return (
    <Popup display={display} setDisplay={setDisplay}>
      <div className="vote-panel">
        <FormSearchTag placeHolder="搜尋標籤" disabled />
        <h3>目前標籤票數排行</h3>
        {votedTags.map((tag: VoteTagProps) => {
          const variant = tag.Type as TagType['variant'];
          return (
            <>
              <Tag
                id={`vote-tag-${tag.Id.toString()}`}
                key={`vote-tag-${tag.Id.toString()}`}
                text={tag.Text}
                variant={variant}
              />
              <p>
                票數:
                {tag.TagCount}
              </p>
              <Button
                key={`vote-btn-${tag.Id.toString()}`}
                iconAfter={tag.userVoted ? <AiOutlineMinus /> : <AiOutlinePlus />}
                color="white"
                variant={tag.userVoted ? 'outline' : undefined}
                onClick={handleVotedButtonClick}
              />
            </>
          );
        })}
      </div>
    </Popup>
  );
}

export default VotePanel;
