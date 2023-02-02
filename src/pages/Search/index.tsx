import React, { useEffect } from 'react';
import SearchPanel from 'pages/Search/components/SearchPanel';
import { postSearchActivity } from 'api/activity';

import { useLoaderData, useNavigation } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { setResults } from 'store/searchPanel';
import { SearchLoaderType } from 'types/ActivityDataType';
import Loading from 'pages/Loading';
import Pagination from './components/Pagination';
import Result from './components/Result';

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const keywords = url.searchParams.get('keywords');
  const tags = url.searchParams.getAll('tags');
  const page = url.searchParams.get('page');
  if (keywords) {
    const res = await postSearchActivity({
      keywords,
      tags,
      countPerSegment: 35,
      currentSegment: Number(page) || 1,
    });
    return { data: res.data, keywords };
  }
  return { data: null, keywords };
};

function Search() {
  const dispatch = useAppDispatch();
  const loaderData = useLoaderData() as SearchLoaderType;
  const navigation = useNavigation();

  const searching = navigation.location
    && new URLSearchParams(navigation.location.search).has(
      'keywords',
    );

  useEffect(() => {
    if (loaderData.data) {
      dispatch(
        setResults(loaderData.data.searchResultData),
      );
    }
  }, [loaderData]);

  return (
    <div className="search">
      <SearchPanel />
      {searching
        ? <Loading />
        : <Result />}
      <Pagination />
    </div>
  );
}
export default Search;
