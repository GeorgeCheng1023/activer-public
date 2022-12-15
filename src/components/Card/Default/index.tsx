// components/Card/Default
import React from 'react';
import Tag from 'components/Tag';
import { CardType } from 'types/components/Card';
import './index.scss';

function CardDefault({
  imgUrl, title, tags, altText, detail,
}: CardType) {
  return (
    <div className="card">
      <div className="card__image">
        <img src={imgUrl} alt={altText} />
      </div>
      <h3 className="card__title">{title}</h3>
      {detail
      && (
        <div className="card__detail">
          <p>{detail}</p>
        </div>
      )}
      <div className="card__tag">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            variant={tag.variant}
            text={tag.text}
            icon={tag.icon}
            id={tag.id}
          />
        )).slice(0, 5)}
      </div>
    </div>
  );
}

CardDefault.defaultProps = {
  detail: null,
};

export default CardDefault;
