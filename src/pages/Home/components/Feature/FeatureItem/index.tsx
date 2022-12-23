import React from 'react';
import './index.scss';

interface FeatureItemType {
  title : string;
  titleIcon: React.ReactNode;
  img: string;
  detail: string;
}

function FeatureItem({
  title, titleIcon, img, detail,
}: FeatureItemType) {
  return (
    <div className="feature__item">
      <div className="feature__title">
        {titleIcon}
        <h3>{title}</h3>
      </div>
      <img className="feature__img" src={img} alt={title} />
      <p className="feature__detail">{detail}</p>
    </div>
  );
}

export default FeatureItem;
