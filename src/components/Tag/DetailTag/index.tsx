import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { AiOutlineEye } from 'react-icons/ai';
import { getColor } from '..';
import './index.scss';

interface DetailTagType {
  id: string;
  text: string;
  activityAmount: number;
  tagTrend: number;
  type?: 'area' | 'location' | 'other' | string;
}

function DetailTag({
  id, text, activityAmount, tagTrend, type,
}:DetailTagType) {
  const navigate = useNavigate();

  return (
    <div
      className="detail-tag"
      key={`detail-tag-${id}`}
    >

      <Button
        className="detail-tag__hashtag"
        color={getColor(type)}
        text="#"
        variant={{ round: true, outline: true }}
        onClick={() => navigate({
          pathname: '/search',
          search: `?tags=${text}`,
        })}
      />
      <div className="detail-tag__text">
        <Link to={`/search?tags=${text}`} className="detail-tag__text__title">
          {text}
        </Link>
        <p className="detail-tag__text__description">
          {activityAmount}
          {' '}
          相關活動
        </p>
        <p className="detail-tag__text__description">
          <AiOutlineEye />
          {' '}
          {tagTrend}
        </p>
      </div>
    </div>
  );
}

export default DetailTag;
