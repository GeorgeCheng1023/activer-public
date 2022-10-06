import React from 'react';
import Tag from '../Tag';
import './index.scss';
import TagsContents from './TagsContent';

type TagsProp = {
  color: string,
  text: string,
  icon: string,
};

function createTag(TagsContent: TagsProp) {
  return (
    <Tag
      tagColor={TagsContent.color}
      tagText={TagsContent.text}
      tagIcon={TagsContent.icon}
    />
  );
}

function Card() {
  return (
    <div className="card">
      <div className="card__image" />
      <h3 className="card__title">網頁前端工作坊</h3>
      <div className="card__tag">
        {TagsContents.map(createTag)}
      </div>
    </div>
  );
}

export default Card;
