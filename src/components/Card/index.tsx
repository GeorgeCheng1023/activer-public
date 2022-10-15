import React from 'react';
import Tag from '../Tag';
import './index.scss';

function createTag(TagsContent: TagType) {
  return (
    <Tag
      color={TagsContent.color}
      text={TagsContent.text}
      icon={TagsContent.icon}
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
