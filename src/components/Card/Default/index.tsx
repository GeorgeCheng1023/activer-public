// components/Card/Default
import React from 'react';
import Tag, { TagType } from 'components/Tag';
import './index.scss';

export interface CardType {
  id: string;
  imgUrl: string,
  title: string,
  altText: string,
  tags: Array<TagType>,
  detail?: string
}

function CardDefault({
  id, imgUrl, title, tags, altText, detail,
}: CardType) {
  return (
    <div className="card">
      <div className="card__image">
        <img src={imgUrl} alt={altText} />
      </div>
      <div className="card__content">
        <p className="card__title">{title}</p>
        {detail
      && (
        <p
          className="card__detail"
        >
          {detail}
        </p>
      )}
        <div className="card__tag">
          {tags.splice(0, 3).map((tag) => (
            <Tag
              key={`${id}-${tag.id}`}
              type={tag.type}
              text={tag.text}
              icon={tag.icon}
              id={`${id}-${tag.id}`}
            />
          )).slice(0, 5)}
        </div>
      </div>
    </div>

  );
}

CardDefault.defaultProps = {
  detail: null,
};

export default CardDefault;
