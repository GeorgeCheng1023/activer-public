import React, { useEffect } from 'react';
import SearchPanel from 'pages/Search/components/SearchPanel';
import { postSearchActivity } from 'api/activity';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { setKeyword, setResults } from 'store/searchPanel';
import { SearchLoaderType } from 'types/ActivityDataType';
import Loading from 'pages/Loading';
import getCookie from 'utils/getCookies';
import getUrlParams from 'utils/getUrlParams';
import { CustomError } from 'pages/Error';
import Result from './components/Result';
import './index.scss';

export const loader = async ({ request }: any) : Promise<SearchLoaderType> => {
  const url = request.url as string;
  const keywords = getUrlParams(url, 'keywords');
  let tags = getUrlParams(url, 'tags');
  const page = getUrlParams(url, 'page');
  if (typeof tags === 'string') {
    tags = [tags];
  }
  if (!keywords && !tags) {
    return (
      {
        data: null,
        keywords: null,
      }
    );
  }
  if (typeof keywords !== 'string') {
    throw new CustomError('請提供正確搜尋參數', 403);
  }
  const res = await postSearchActivity({
    keywords: keywords || undefined,
    tags: tags as string[] || undefined,
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
        : (
          <Result />
        )}
    </div>
  );
}
export default Search;
