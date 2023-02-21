import React from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import './index.scss';
import { getSearchHistory, deleteSearchHistory } from 'api/activity';
import getCookie from 'utils/getCookies';
import { SearchHistoryResponseType } from 'types/Response';
import Pagination from 'components/Pagination';
import { throwError } from 'pages/Error';
import getUrlParams from 'utils/getUrlParams';
import SearchHistory from './components/SearchHistory';

export const loader: LoaderFunction = async ({ request }) => {
  const orderBy = getUrlParams(request.url, 'orderBy');
  if (!orderBy) {
    const res = await getSearchHistory(
      20,
      1,
      getCookie('sessionToken'),
    );
    return res.data;
  }
  if (orderBy !== 'ascending' && orderBy !== 'descending') {
    throw new Response('請輸入正確參數', { status: 400 });
  }
  const res = await getSearchHistory(
    20,
    1,
    getCookie('sessionToken'),
    orderBy,
  );
  return res.data;
};

export async function action({ request }: any) {
  if (request.method === 'DELETE') {
    const formData = await request.formData() as FormData;
    const ids = formData.get('ids') as string;
    const { isCheckList } = JSON.parse(ids);
    if (isCheckList.length === 0) {
      throwError('無效的刪除動作! 請選擇欲刪除的搜尋紀錄', 400);
    }
    await deleteSearchHistory(isCheckList, getCookie('sessionToken'));
  }
  return null;
}

function Preferences() {
  const loaderData = useLoaderData() as SearchHistoryResponseType;

  return (
    <div className="preferences">
      <h2>偏好設定</h2>

      {/* History */}
      <div className="preferences__history">
        {/* Title */}
        <h3>搜尋紀錄</h3>

        <SearchHistory history={loaderData.searchResultData} />
        <Pagination maxSegment={loaderData.maxSegment} />
      </div>

    </div>
  );
}

export default Preferences;
