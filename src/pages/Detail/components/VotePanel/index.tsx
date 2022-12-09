import React, { useState } from 'react';
import Popup, { PopupDisplayProps } from 'components/Popup';
// import FormSearchTag from 'components/Form/FormSearchTag';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import './index.scss';
import { TagDataType } from 'types/ActivityDataType';

interface Props extends PopupDisplayProps {
  tags: TagDataType[]
}

function VotePanel({ display, onClose, tags }: Props) {
  const [votedTags, setVotedTags] = useState<TagDataType[]>(tags);

  const effectCallback = () => {
    setVotedTags(tags);
  };

  const handleVotedButtonClick = (currentTag: TagDataType) => {
    const foundedTag = tags.find((v) => v.Id === currentTag.Id);
    if (foundedTag) {
      // change TagCount
      if (currentTag.UserVoted) {
        foundedTag.TagCount -= 1;
      } else { foundedTag.TagCount += 1; }

      // change user voted status
      foundedTag.UserVoted = !foundedTag.UserVoted;

      // conductVotedTag for accrpt tagCount and votedTags
      const newVotedTags = votedTags.map((v) => {
        if (v.Id === foundedTag.Id) {
          return foundedTag;
        }
        return v;
      });

      setVotedTags(newVotedTags);
      console.log(votedTags);

      return;
    }

    // if not found, add new votedTag
    setVotedTags([...votedTags, { ...currentTag, UserVoted: true }]);
  };

  return (
    <Popup
      display={display}
      onClose={onClose}
      effectCallback={effectCallback}
    >
      <div className="vote-panel">
        {/* <FormSearchTag placeHolder="搜尋標籤" disabled /> */}
        <h3>目前標籤票數排行</h3>
        {votedTags.map((tag: TagDataType) => {
          const variant = tag.Type as TagType['variant'];
          return (
            <div className="vote-panel__item" key={`vote-pael-item-${tag.Id.toString()}`}>
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
                iconAfter={tag.UserVoted ? <AiOutlineMinus /> : <AiOutlinePlus />}
                color="dark"
                variant={tag.UserVoted ? 'outline' : undefined}
                onClick={() => handleVotedButtonClick(tag)}
              />
            </div>
          );
        })}
      </div>
    </Popup>
  );
}

export default VotePanel;
