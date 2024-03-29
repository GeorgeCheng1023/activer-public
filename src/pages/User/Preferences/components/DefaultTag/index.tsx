import React, { useState } from 'react';
import { FormSearchTag } from 'components/Form';
import Button from 'components/Button';
import Tag, { TagType } from 'components/Tag';
import dummyUserDefaultTags from '../../dummyUserDefaultTags.json';

const parseDefaultTags: TagType[] = dummyUserDefaultTags.DefaultTags.map((tag: any) => ({
  id: tag.TagId,
  text: tag.Text,
  variant: tag.Type,
}));
function DefaultTag() {
  const [defaultTags, setDefaultTags] = useState<TagType[]>(parseDefaultTags);
  const handleSaveSubmit:
  React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // TODO: set Default Tag
    console.log(defaultTags);
  };

  const handleCancel:
  React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // TODO: cancel change and get last default tag
    console.log('cancel');
  };

  const handleSuggestionClick = (tag: TagType) => {
    console.log(tag);

    setDefaultTags([...defaultTags, tag]);
  };

  const handleDefaultTagClick = (clickedTag: TagType) => {
    setDefaultTags(defaultTags.filter((tag) => tag.id !== clickedTag.id));
  };

  return (
    <>
      {/* Default Tag Storage */}
      <div className="preferences__default">
        {/* Title */}
        <h3>您的預設標籤</h3>
        {/* Storage */}
        <div className="preferences__default__storage">
          {defaultTags.map((tag: TagType) => (
            <Tag
              key={tag.id}
              id={tag.id.toString()}
              type={tag.type}
              text={tag.text}
              onClick={() => handleDefaultTagClick(tag)}
              icon="minus"
            />
          ))}
        </div>

        {/* Control */}
        <div className="preferences__default__control">

          <h4>新增標籤 :</h4>
          {/* Control - search bar */}
          <div className="preferences__default__control__search-bar">
            <FormSearchTag
              onSuggestionClick={handleSuggestionClick}
              placeholder="搜尋標籤"
            />
          </div>

          {/* Control - save and cancel button */}
          <div className="preferences__default__control__buttons">
            <Button
              type="submit"
              onClick={handleSaveSubmit}
              text="儲存"
            />
            <Button type="submit" onClick={handleCancel} text="取消" variant={{ outline: true }} />
          </div>

        </div>

      </div>
    </>
  );
}

export default DefaultTag;
