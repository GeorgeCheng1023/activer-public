import Button from 'components/Button';
import React from 'react';
import { AiOutlineEye, AiTwotoneHeart } from 'react-icons/ai';
import { BranchDataType } from 'types/ActivityDataType';
import './index.scss';

interface MainCardControlType {
  id: string;
  onClickFollow? :React.MouseEventHandler<HTMLButtonElement> | undefined;
  trend: number;
  status?: BranchDataType['status'];
}

function MainCardControl({
  onClickFollow, trend, status, id,
}: MainCardControlType) {
  return (
    <div className="card__control__main">
      <div className="card__control__watch">
        <AiOutlineEye />
        {trend}
      </div>
      <Button
        iconBefore={<AiTwotoneHeart />}
        id={id}
        type="button"
        text={status !== '未註冊' ? '取消收藏' : '收藏'}
        onClick={onClickFollow}
        color="white"
        className={`card__control__follow${status !== '未註冊' ? '--active' : ''}`}
      />

    </div>
  );
}

MainCardControl.defaultProps = {
  onClickFollow: undefined,
  status: undefined,
};

export default MainCardControl;
