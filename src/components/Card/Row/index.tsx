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
    <div className="card-column">
      <img className="card-column__image" src={imgUrl} alt={altText} />
      <div className="card-column__content">
        <p className="card-column__content__title">{title}</p>
        <div className="card-column__content__tags">
          {tags.map((tag: TagType) => (
            <Tag
              key={tag.id}
              variant={tag.variant}
              text={tag.text}
              icon={tag.icon}
              id={tag.id}
            />
          ))}
        </div>
        <div className="card-column__content__detail">
          <p>{detail}</p>
        </div>
      </div>
      {control
      && (
        <div className="card-column__control">
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
