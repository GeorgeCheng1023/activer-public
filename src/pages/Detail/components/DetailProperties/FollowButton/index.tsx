import React from 'react';
import Button from 'components/Button';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './index.scss';

interface Props {
  followed: boolean;
  activityId: string;
  branchId: string;
  setFollowed:React.Dispatch<React.SetStateAction<boolean>>
}
function FollowButton({
  followed, setFollowed, branchId, activityId,
}: Props) {
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = () => {
    setFollowed(!followed);
    // TODO: PUT ActivityId and BracnhID and Followed
    console.log(activityId, branchId, followed ? '願望' : undefined);
  };

  return (
    <>
      <div
        className="detail__properties__follow-button"
        id={`follewedButton-${activityId}-${branchId}`}
      >
        <Button
          variant={{ round: true, colorReverse: !!followed }}
          color={followed ? 'danger' : 'white'}
          iconAfter={followed ? <BsHeartFill /> : <BsHeart />}
          onClick={handleClick}
          size="lg"
        />
      </div>

      <Tooltip
        anchorId={`follewedButton-${activityId}-${branchId}`}
        content={followed ? '自願望清單中移除' : '加入願望清單'}
      />
    </>
  );
}

export default FollowButton;
