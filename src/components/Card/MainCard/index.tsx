import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCardControl from 'components/Card/MainCardControl';
import Card from 'components/Card';
import ActivityDataType, { BranchDataType } from 'types/ActivityDataType';
import { useCookies } from 'react-cookie';
import { initialBranchesState } from 'pages/Detail/utils/initialData';
import { postActivityStatus } from 'api/activity';
import { parseArrayTagDataToTag } from 'utils/parseTag';
import { replaceDateMinus } from 'utils/convertDate';
import { getUserIsLoggedIn } from 'store/userAuth';
import { useAppSelector } from 'hooks/redux';

interface MainCardType {
  activity: ActivityDataType
}

function MainCard({ activity }: MainCardType) {
  const [cookies] = useCookies<string>(['user']);
  const isLoggedIn = useAppSelector(getUserIsLoggedIn);
  const navigate = useNavigate();

  // destructing activity
  const {
    id, tags, title, images, branches, trend,
  } = activity;
  const firstBranches = branches ? branches[0] : initialBranchesState;
  const {
    id: brancheId, dateStart, dateEnd, status: initStatus,
  } = firstBranches;
  const resultItemControlId = `result__item-control__${id.toString()}`;
  const cardDetail = dateEnd && dateStart
    ? `活動時間: \n${replaceDateMinus(dateStart[Object.keys(dateStart)[0]])} ~ ${replaceDateMinus(dateEnd[0])}`
    : null;
  const [status, setStatus] = useState<BranchDataType['status']>(initStatus);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    const target = event.target as HTMLDivElement;
    // Prevent Navigation when click Control
    if (target.id === resultItemControlId) {
      event.preventDefault();
    }
  };

  const handleClickFollow: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (!isLoggedIn) {
      // TODO: use popup?
      navigate('/login');
    }

    const getNewStatus = (): BranchDataType['status'] => {
      if (status === '已註冊') {
        return status;
      } if (status === '未註冊') {
        return '願望';
      } if (status === '願望') {
        return '未註冊';
      }
      return status;
    };

    const res = await postActivityStatus(
      id.toString(),
      brancheId.toString(),
      getNewStatus(),
      cookies.sessionToken,
    );
    setStatus(res.data.branches[0].status);
  };

  return (
    <Link
      className="result__item"
      to={`/detail/${id}`}
      onClick={handleClick}
    >
      <Card
        id={id.toString()}
        tags={tags ? parseArrayTagDataToTag(tags) : []}
        title={title}
        imgUrl={images ? images[0] : '/DefaultActivityPng.png'}
        altText={title}
        detail={cardDetail}
        control={(
          <MainCardControl
            id={resultItemControlId}
            trend={trend}
            onClickFollow={handleClickFollow}
            status={status}
          />
        )}
      />
    </Link>
  );
}

export default MainCard;
