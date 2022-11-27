import React from 'react';
import Tag, { TagType } from '../Tag';
import './index.scss';

export type CardType = {
  imgUrl: string,
  title: string,
  altText: string,
  tags: Array<TagType>,
  animation?: string,
  detail?: string
};

function createTag(TagsContent: TagType) {
  return (
    <Tag
      key={TagsContent.id}
      variant={TagsContent.variant}
      text={TagsContent.text}
      icon={TagsContent.icon}
      id={TagsContent.id}
    />
  );
}

function Card({
  imgUrl, title, tags, animation, altText, detail,
}: CardType) {
  return (
    <div className={`card card--${animation}`}>
      <div className="card__image__container">
        <img className="card__image" src={imgUrl} alt={altText} />
      </div>
      <h3 className="card__title">{title}</h3>
      <div className="card__detail">
        {detail}
      </div>
      <div className="card__tag">
        {tags.map(createTag)}
      </div>
    </div>
  );
}

Card.defaultProps = {
  animation: 'basic',
  detail: null,
};

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
