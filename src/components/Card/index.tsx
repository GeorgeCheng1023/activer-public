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

export function CardColumn({
  imgUrl, title, tags, animation, altText, detail,
}: CardType) {
  return (
    <div className={`card-column card--${animation}`}>
      <img className="card-column__image" src={imgUrl} alt={altText} />
      <div className="card-column__content">
        <h3 className="card-column__title">{title}</h3>
        <div className="card-co lumn__tag">
          {tags.map(createTag)}
        </div>
        <div className="card-column__detail">
          {detail}
        </div>
      </div>
    </div>
  );
}

export default Card;
