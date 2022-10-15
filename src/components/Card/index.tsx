import React from 'react';
import Tag from '../Tag';
import './index.scss';

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

function Card({
  imgUrl, title, tags, animation, altText,
}: CardType) {
  return (
    <div className={`card card--${animation}`}>
      <img className="card__image" src={imgUrl} alt={altText} />
      <h3 className="card__title">{title}</h3>
      <div className="card__tag">
        {tags.map(createTag)}
      </div>
    </div>
  );
}

export default Card;
