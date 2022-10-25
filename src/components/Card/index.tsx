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

type CardColumnProps = {
  data: CardType;
  control?: JSX.Element;
};

export function CardColumn({ data, control }: CardColumnProps) {
  const {
    imgUrl, altText, title, tags, detail,
    animation,
  } = data;
  return (
    <div className={`card-column card--${animation}`}>
      <img className="card-column__image" src={imgUrl} alt={altText} />
      <div className="card-column__content">
        <h3 className="card-column__title">{title}</h3>
        <div className="card-column__tag">
          {tags.map(createTag)}
        </div>
        <div className="card-column__detail">
          {detail}
        </div>
      </div>
      <div className="card-column__control">
        {control}
      </div>
    </div>
  );
}

CardColumn.defaultProps = {
  control: null,
};

export default Card;
