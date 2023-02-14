import Button from 'components/Button';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { useCookies } from 'react-cookie';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Form, useNavigate, useSubmit } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getUserIsLoggedIn } from 'store/userAuth';
import './index.scss';

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
  const isLoggedIn = useAppSelector(getUserIsLoggedIn);
  const navigate = useNavigate();
  const submit = useSubmit();

  const formData = new FormData();
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      formData.set('activityId', activityId);
      formData.set('branchId', branchId);
      formData.set('status', followed ? '未註冊' : '願望');
      formData.set('sessionToken', cookies.sessionToken);
      submit(formData, { method: 'post' });
      setFollowed(!followed);
    }
  };

  return (
    <>
      <Form
        className="detail__properties__follow-button"
        method="post"
      >
        <Button
          variant={{ round: true, colorReverse: !!followed }}
          color={followed ? 'danger' : 'white'}
          iconAfter={followed ? <BsHeartFill /> : <BsHeart />}
          type="button"
          onClick={handleClick}
        />
      </Form>

      <Tooltip
        anchorId={`follewedButton-${activityId}-${branchId}`}
        content={followed ? '自願望清單中移除' : `${isLoggedIn ? '加入願望清單' : '請先登入'}`}
      />
    </>
  );
}

export default FollowButton;
