import React from 'react';
import Tag from '../Tag';
import './index.scss';

type TagsProp = {
  color: string,
  text: string,
  icon: string,
};
type CardProps = {
  imgUrl: string,
  title: string,
  tags: Array<TagsProp>,
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

function Card({ imgUrl, title, tags }: CardProps) {
  return (
    <div className="card">
      <img className="card__image" src={imgUrl} alt="" />
      <h3 className="card__title">{title}</h3>
      <div className="card__tag">
        {tags.map(createTag)}
      </div>
    </div>
  );
}

export default Card;
