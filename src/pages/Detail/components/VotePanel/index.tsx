import React, { useState } from 'react';
import Popup, { PopupDisplayType } from 'components/Popup';
import FormSearchTag from 'components/Form/FormSearchTag';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import './index.scss';
import { ActivityTagDataType } from 'types/ActivityDataType';

interface Props extends PopupDisplayType {
  tags: ActivityTagDataType[]
}

function VotePanel({ display, onClose, tags }: Props) {
  const [votedTags, setVotedTags] = useState<ActivityTagDataType[]>(tags);

  const effectCallback = () => {
    setVotedTags(tags);
  };

  const handleVotedButtonClick = (currentTag: ActivityTagDataType) => {
    const foundedTag = tags.find((v) => v.id === currentTag.id);
    if (foundedTag) {
      // change TagCount
      if (currentTag.userVoted) {
        foundedTag.tagCount -= 1;
      } else { foundedTag.tagCount += 1; }

      // change user voted status
      foundedTag.userVoted = !foundedTag.userVoted;

      // conductVotedTag for accrpt tagCount and votedTags
      const newVotedTags = votedTags.map((v) => {
        if (v.id === foundedTag.id) {
          return foundedTag;
        }
        return v;
      });

      setVotedTags(newVotedTags);
      console.log(votedTags);

      return;
    }

    // if not found, add new votedTag
    setVotedTags([...votedTags, { ...currentTag, userVoted: true }]);
  };

  const handleSuggestionClick = (clickedTag: TagType) => {
    const foundTag = tags.find((tag) => tag.id.toString() === clickedTag.id);
    let newTags = tags;
    if (foundTag) {
      if (foundTag.userVoted) {
        foundTag.tagCount += 1;
      } else { foundTag.tagCount -= 1; }
      // conductVotedTag for accrpt tagCount and votedTags
      newTags = votedTags.map((v) => {
        if (v.id === foundTag.id) {
          return foundTag;
        }
        return v;
      });
    } else {
      newTags.push({
        id: parseInt(clickedTag.id, 10),
        type: clickedTag.type as ActivityTagDataType['type'],
        text: clickedTag.text,
        tagCount: 1,
        userVoted: true,
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
          const variant = tag.type as TagType['type'];
          return (
            <div className="vote-panel__item" key={`vote-pael-item-${tag.id.toString()}`}>
              <Tag
                id={`vote-tag-${tag.id.toString()}`}
                key={`vote-tag-${tag.id.toString()}`}
                text={tag.text}
                type={variant}
              />
              <p>
                票數:
                {tag.tagCount}
              </p>
              <Button
                key={`vote-btn-${tag.id.toString()}`}
                iconAfter={tag.userVoted ? <AiOutlineMinus /> : <AiOutlinePlus />}
                color="dark"
                variant={{ outline: !tag.userVoted }}
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
