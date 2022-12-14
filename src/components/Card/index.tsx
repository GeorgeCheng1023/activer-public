import React from 'react';
import Tag, { TagType } from '../Tag';
import './index.scss';

export type CardType = {
  imgUrl: string,
  title: string,
  altText: string,
  tags: Array<TagType>,
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
  imgUrl, title, tags, altText, detail,
}: CardType) {
  return (
    <div className="card">
      <div className="card__image__container">
        <img className="card__image" src={imgUrl} alt={altText} />
      </div>
      <h3 className="card__title">{title}</h3>
      <div className="card__detail">
        <p>{detail}</p>
      </div>
      <div className="  card__tag">
        {tags.map(createTag)}
      </div>
    </div>
  );
}

Card.defaultProps = {
  detail: null,
};

interface CardColumnProps extends CardType {
  control?: JSX.Element;
}

export function CardColumn({
  imgUrl,
  altText,
  title,
  tags,
  detail,
  control,
}: CardColumnProps) {
  return (
    <div className="card-column">
      <img className="card-column__image" src={imgUrl} alt={altText} />
      <div className="card-column__content">
        <p className="card-column__title">{title}</p>
        <div className="card-column__tag">
          {tags.map(createTag)}
        </div>
        <div className="card-column__detail">
          <p>{detail}</p>
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
  detail: null,
};

export default Card;
