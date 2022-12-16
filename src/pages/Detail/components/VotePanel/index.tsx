import React, { useState } from 'react';
import Popup, { PopupDisplayProps } from 'components/Popup';
import FormSearchTag from 'components/Form/FormSearchTag';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import './index.scss';
import { ActivityTagDataType } from 'types/ActivityDataType';

interface Props extends PopupDisplayProps {
  tags: ActivityTagDataType[]
}

function VotePanel({ display, onClose, tags }: Props) {
  const [votedTags, setVotedTags] = useState<ActivityTagDataType[]>(tags);

  const effectCallback = () => {
    setVotedTags(tags);
  };

  const handleVotedButtonClick = (currentTag: ActivityTagDataType) => {
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

  const handleSuggestionClick = (clickedTag: TagType) => {
    const foundTag = tags.find((tag) => tag.Id.toString() === clickedTag.id);
    let newTags = tags;
    if (foundTag) {
      if (foundTag.UserVoted) {
        foundTag.TagCount += 1;
      } else { foundTag.TagCount -= 1; }
      // conductVotedTag for accrpt tagCount and votedTags
      newTags = votedTags.map((v) => {
        if (v.Id === foundTag.Id) {
          return foundTag;
        }
        return v;
      });
    } else {
      newTags.push({
        Id: parseInt(clickedTag.id, 10),
        Type: clickedTag.variant as ActivityTagDataType['Type'],
        Text: clickedTag.text,
        TagCount: 1,
        UserVoted: true,
      });
    }
    setVotedTags(newTags);
  };

  return (
    <Popup
      display={display}
      onClose={onClose}
      effectCallback={effectCallback}
    >
      <div className="vote-panel">
        <FormSearchTag
          placeholder="搜尋標籤"
          onSuggestionClick={handleSuggestionClick}
        />
        <h3>目前標籤票數排行</h3>
        {votedTags.map((tag: ActivityTagDataType) => {
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
                variant={{ outline: !tag.UserVoted }}
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
