import React, { useState } from 'react';
import { BranchDataType, SearchResultDataType } from 'types/ActivityDataType';
import Card from 'components/Card';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import useConvertDate from 'hooks/date/useConvertDate';
import { Link } from 'react-router-dom';
import MainCardControl from 'components/Card/MainCardControl';
import { postActivityStatus } from 'api/activity';
import { initialBranchesState } from 'pages/Detail/utils/initialData';
import { useCookies } from 'react-cookie';

interface ResultItemType {
  result:SearchResultDataType
}

function ResultItem({ result } : ResultItemType) {
  const {
    id, tags, title, images, branches, trend,
  } = result.activity;
  const [cookies] = useCookies<string>(['user']);

  const firstBranches = branches ? branches[0] : initialBranchesState;

  const {
    id: brancheId, dateStart, dateEnd, status: initStatus,
  } = firstBranches;
    // eslint-disable-next-line
  const [status, setStatus] = useState<BranchDataType['status']>(initStatus);
  const resultItemControlId = `result__item-control__${id.toString()}`;

  const cardDetail = dateEnd && dateStart
    ? `活動時間: \n${useConvertDate(dateStart[Object.keys(dateStart)[0]])} ~ ${useConvertDate(dateEnd[0])}`
    : null;

  const handleClickFollow:React.MouseEventHandler<HTMLButtonElement> = async () => {
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

  const handleClick
  :React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (target.id === resultItemControlId) {
      event.preventDefault();
    }
  };

  return (
    <Link
      className="result__item"
      to={`/detail/${id}`}
      onClick={handleClick}
    >
      <Card
        id={id.toString()}
        tags={tags ? useParseArrayTagDataToTag(tags) : []}
        title={title}
        imgUrl={images ? encodeURI(images[0]) : '/DefaultActivityPng.png'}
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

export default ResultItem;
