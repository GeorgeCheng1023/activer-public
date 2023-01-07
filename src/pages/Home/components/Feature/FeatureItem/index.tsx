import React from 'react';
import './index.scss';

interface FeatureItemType {
  title : string;
  titleIcon: React.ReactNode;
  detail: string;
}

function FeatureItem({
  title, titleIcon, detail,
}: FeatureItemType) {
  return (
    <div className="feature__item">
      <div className="feature__item__title">
        <span className="feature__item__icon">{titleIcon}</span>
        <h3>{title}</h3>
      </div>

      <p className="feature__detail">{detail}</p>
    </div>
  );
}

export default FeatureItem;
