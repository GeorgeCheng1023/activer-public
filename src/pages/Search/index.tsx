import React, { useEffect } from 'react';
import SearchPanel from 'pages/Search/components/SearchPanel';
import { getSearchActivity } from 'api/activity';

import { useLoaderData, useNavigation } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { setResults } from 'store/searchPanel';
import { ShortActivityDataType, SearchLoaderDataType } from 'types/ActivityDataType';
import Loading from 'pages/Loading';
import Result from './components/Result';

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword');
  const res = await getSearchActivity(keyword || '', []);
  return { data: res.data, keyword };
};

function Search() {
  const dispatch = useAppDispatch();
  const loaderData = useLoaderData() as SearchLoaderDataType;
  const navigation = useNavigation();

  const searching = navigation.location
    && new URLSearchParams(navigation.location.search).has(
      'keyword',
    );

  useEffect(() => {
    dispatch(setResults(loaderData.data as ShortActivityDataType[]));
  }, [loaderData]);

  return (
    <div className="search">
      <SearchPanel />
      {searching
        ? <Loading />
        : <Result />}
    </div>
  );
}
export default Search;
