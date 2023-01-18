import React from 'react';
import Button from 'components/Button';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import { useCookies } from 'react-cookie';
import 'react-tooltip/dist/react-tooltip.css';
import './index.scss';
import { updateActivityStatus } from 'api/activity';

interface FollowButtonType {
  followed: boolean;
  activityId: string;
  branchId: string;
  setFollowed:React.Dispatch<React.SetStateAction<boolean>>
}
function FollowButton({
  followed, setFollowed, branchId, activityId,
}: FollowButtonType) {
  const [cookies] = useCookies<string>(['user']);

  const handleClick:React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setFollowed(!followed);
      await updateActivityStatus(
        activityId,
        branchId,
        followed ? '未註冊' : '願望',
        cookies.sessionToken,
      );
    } catch (e: any) {
      alert(e.message);
    }
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
