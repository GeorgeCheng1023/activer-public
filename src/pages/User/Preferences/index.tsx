import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './index.scss';
import { getSearchHistory, deleteSearchHistory } from 'api/activity';
import getCookie from 'utils/getCookies';
import { SearchHistoryResponseType } from 'types/ActivityDataType';
import SearchHistory from './components/SearchHistory';

export async function loader() {
  const res = await getSearchHistory(
    20,
    1,
    getCookie('sessionToken'),
  );
  return res.data;
}

export async function action({ request }: any) {
  if (request.method === 'DELETE') {
    const formData = await request.formData() as FormData;
    const ids = formData.get('ids') as string;
    await deleteSearchHistory(JSON.parse(ids).isCheckList, getCookie('sessionToken'));
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
      </div>

    </div>
  );
}

export default Preferences;
