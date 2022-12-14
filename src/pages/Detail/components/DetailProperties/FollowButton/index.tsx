import React from 'react';
import Button from 'components/Button';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface Props {
  followed: boolean;
  activityId: number;
  branchId: number;
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
    <div className="detail__properties__follow-button">
      <Button
        variant={{ round: true, colorReverse: !!followed }}
        color={followed ? 'danger' : 'white'}
        iconAfter={followed ? <BsHeartFill /> : <BsHeart />}
        onClick={handleClick}

      />
    </div>
  );
}

export default FollowButton;
