import React, { useEffect } from 'react';
import SearchPanel from 'pages/Search/components/SearchPanel';
import { postSearchActivity } from 'api/activity';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { setKeyword, setResults } from 'store/searchPanel';
import { SearchLoaderType } from 'types/ActivityDataType';
import Loading from 'pages/Loading';
import getCookie from 'utils/getCookies';
import Pagination from './components/Pagination';
import Result from './components/Result';
import './index.scss';

export const loader = async ({ request }: any) : Promise<SearchLoaderType> => {
  const url = new URL(request.url);
  const keywords = url.searchParams.get('keywords');
  const tags = url.searchParams.getAll('tags');
  const page = url.searchParams.get('page');
  const res = await postSearchActivity({
    keywords: keywords || undefined,
    tags: tags || undefined,
    countPerSegment: 35,
    currentSegment: Number(page) || 1,
    accessToken: getCookie('sessionToken'),
  });
  return ({
    data: res.data,
    keywords,
  });
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
  useEffect(() => {
    dispatch(setKeyword(loaderData.keywords || ''));
  }, []);

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
