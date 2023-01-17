// components/Card/Row
import React from 'react';
import Tag, { TagType } from 'components/Tag';
import { CardType } from '../Default';
import './index.scss';

export interface CardRowType extends CardType {
  control?: JSX.Element;
}

function CardRow({
  imgUrl,
  altText,
  title,
  tags,
  detail,
  control,
}: CardRowType) {
  return (
    <div className="card-row">
      <img
        className="card-row__image"
        src={imgUrl}
        alt={altText}
      />
      <div className="card-row__content">
        <p className="card-row__content__title">
          {title}
        </p>
        <div className="card-row__content__tags">
          {tags.map((tag: TagType) => (
            <Tag
              key={tag.id}
              type={tag.type}
              text={tag.text}
              icon={tag.icon}
              id={tag.id}
            />
          ))}
        </div>
        <div className="card-row__content__detail">
          <p>{detail}</p>
        </div>
      </div>
      {control
      && (
        <div className="card-row__control">
          {control}
        </div>
      )}
    </div>
  );
}

CardRow.defaultProps = {
  control: null,
};

export default CardRow;
