import React, { useState } from 'react';
import FormSearchTag from 'components/Form/FormSearchTag';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ActivityTagDataType } from 'types/ActivityDataType';
import { ActionFunction, useRouteLoaderData } from 'react-router-dom';
import { DetailLoaderType } from 'types/Loader';
import Popup from './Popup';
import './index.scss';

export const action : ActionFunction = () => null;

function Vote() {
  const detailLoaderData = useRouteLoaderData('detail') as DetailLoaderType;
  const { id, tags } = detailLoaderData.activityData;
  const [votedTags, setVotedTags] = useState<ActivityTagDataType[] | null>(
    tags,
  );

  const handleVotedButtonClick = (clickedTag: ActivityTagDataType) => {
    if (votedTags) {
      const foundedTag = votedTags.find((v) => v.id === clickedTag.id);

      if (foundedTag) {
        // Change FoundTag count userVoted
        if (clickedTag.userVoted) {
          foundedTag.tagVotedCount -= 1;
        } else { foundedTag.tagVotedCount += 1; }
        foundedTag.userVoted = !foundedTag.userVoted;

        // Update
        const newVotedTags = votedTags.map((v) => {
          if (v.id === foundedTag.id) {
            return foundedTag;
          }
          return v;
        });
        setVotedTags(newVotedTags);
      } else {
        setVotedTags([...votedTags, { ...clickedTag, userVoted: true }]);
      }
    } else {
    // if not found, add new votedTag
      setVotedTags([{ ...clickedTag, userVoted: true }]);
    }
  };

  const handleSuggestionClick = (clickedTag: TagType) => {
    if (votedTags) {
      const foundTag = votedTags.find((tag) => tag.id.toString() === clickedTag.id);
      let newTags = votedTags;

      if (foundTag) {
        // TagCount increase and decrease
        if (foundTag.userVoted) {
          foundTag.tagVotedCount += 1;
        } else {
          foundTag.tagVotedCount -= 1;
        }
        // Update
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
          tagVotedCount: 1,
          userVoted: true,
        });
      }
      setVotedTags(newTags);
    } else {
      setVotedTags([{
        id: parseInt(clickedTag.id, 10),
        type: clickedTag.type as ActivityTagDataType['type'],
        text: clickedTag.text,
        tagVotedCount: 1,
        userVoted: true,
      }]);
    }
  };

  return (
    <Popup
      backLink={`/detail/${id}`}
    >
      <div className="vote">
        <FormSearchTag
          placeholder="搜尋標籤"
          onSuggestionClick={handleSuggestionClick}
        />
        <h3>目前標籤票數排行</h3>
        {votedTags && votedTags.map((tag: ActivityTagDataType) => {
          const variant = tag.type as TagType['type'];
          return (
            <div className="vote__item" key={`vote-pael-item-${tag.id.toString()}`}>
              <Tag
                id={`vote__tag-${tag.id.toString()}`}
                key={`vote__tag-${tag.id.toString()}`}
                text={tag.text}
                type={variant}
              />
              <p>
                票數:
                {tag.tagVotedCount}
              </p>
              <Button
                key={`vote__btn-${tag.id.toString()}`}
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

export default Vote;
