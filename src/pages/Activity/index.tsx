import React from 'react';
import { getNewestActivity, getTrendActivity } from 'api/activity';
import Button from 'components/Button';
import MainCard from 'components/Card/MainCard';
import { useLoaderData } from 'react-router-dom';
import { ActivityResponseDataType } from 'types/ActivityDataType';
import useSetSearchParam from 'hooks/router/useSetSearchParam';
import useGetSearchParam from 'hooks/router/useGetSearchParam';
import getUrlSearchParams from 'utils/getUrlParams';
import { CustomError } from 'pages/Error';

export async function loader({ request }: any) {
  const type = getUrlSearchParams(request.url, 'type');
  const page = getUrlSearchParams(request.url, 'page', '1');
  if (typeof type !== 'string' || typeof page !== 'string') {
    throw new CustomError('請提供正確的網址!', 404);
  }
  let res;
  if (type === 'new') {
    res = await getNewestActivity(20, Number(page) || 1);
  } else if (type === 'trend') {
    res = await getTrendActivity(20, Number(page) || 1);
  } else {
    throw new CustomError('請提供正確的網址!', 404);
  }
  return res.data;
}

function Activity() {
  const loaderData = useLoaderData() as ActivityResponseDataType;
  const setSearchParams = useSetSearchParam();
  const type = useGetSearchParam('type', 'trend');

  return (
    <div className="activity">
      <div className="activity__head">
        <h1>所有活動</h1>
        <Button
          text="熱門活動"
          variant={{ outline: type === 'trend' }}
          onClick={() => setSearchParams('type', 'trend')}
        />

        <Button
          text="最新活動"
          variant={{ outline: type === 'new' }}
          onClick={() => setSearchParams('type', 'new')}
        />

      </div>
      <div className="activity__items">
        {
          loaderData.searchResultData.map((activity) => (
            <MainCard activity={activity} />
          ))
        }
      </div>
    </div>
  );
}

export default Activity;
