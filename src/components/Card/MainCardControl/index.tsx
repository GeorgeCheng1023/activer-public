import Button from 'components/Button';
import React from 'react';
import {
  AiOutlineEye, AiTwotoneHeart, AiOutlineLink,
} from 'react-icons/ai';
import './index.scss';

function MainCardControl() {
  return (
    <div className="card__control__main">
      <div className="card__control__watch">
        <AiOutlineEye />
        1233
      </div>
      <Button
        iconBefore={<AiTwotoneHeart />}
        text="收藏"
        className="card__control__follow"
      />
      <Button
        iconBefore={<AiOutlineLink />}
        text="報名"
        className="card__control__apply"
      />

    </div>
  );
}

export default MainCardControl;
