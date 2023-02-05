import Button from 'components/Button';
import React from 'react';
import { AiOutlineEye, AiTwotoneHeart } from 'react-icons/ai';
import './index.scss';

interface MainCardControlType {
  onClickFollow? :React.MouseEventHandler<HTMLButtonElement> | undefined
}

function MainCardControl({ onClickFollow }: MainCardControlType) {
  return (
    <div className="card__control__main">
      <div className="card__control__watch">
        <AiOutlineEye />
        1233
      </div>
      <Button
        iconBefore={<AiTwotoneHeart />}
        type="button"
        text="收藏"
        onClick={onClickFollow}
        color="white"
        className="card__control__follow"
      />

    </div>
  );
}

MainCardControl.defaultProps = {
  onClickFollow: undefined,
};

export default MainCardControl;
