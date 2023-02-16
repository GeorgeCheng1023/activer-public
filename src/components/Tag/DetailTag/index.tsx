import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import { TrendTagResultDataType } from 'types/ActivityDataType';
import './index.scss';

function DetailTag({ id, text, activityAmount }: TrendTagResultDataType) {
  return (
    <div
      className="detail-tag"
      key={`detail-tag-${id}`}
    >
      <Link
        to={`/search?tags=${text}`}
        className="detail-tag__hashtag"
      >
        <Button
          color="primary"
          text="#"
          variant={{ round: true, outline: true }}
        />
      </Link>
      <div className="detail-tag__text">
        <Link to={`/search?tags=${text}`} className="detail-tag__text__title">
          {text}
        </Link>
        <p className="detail-tag__text__description">
          {activityAmount}
          {' '}
          相關活動
        </p>
      </div>
    </div>
  );
}

export default DetailTag;
