import React, { useEffect } from 'react';
import SearchPanel from 'pages/Search/components/SearchPanel';
import { postSearchActivity } from 'api/activity';
import { LoaderFunction, useLoaderData, useNavigation } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { setKeyword, setResults } from 'store/searchPanel';
import { SearchLoaderType } from 'types/Loader';
import Loading from 'pages/Loading';
import getCookie from 'utils/getCookies';
import getUrlParams from 'utils/getUrlParams';
import Result from './components/Result';
import './index.scss';

export const loader: LoaderFunction = async ({ request }) : Promise<SearchLoaderType> => {
  const url = request.url as string;
  const keywords = getUrlParams(url, 'keywords');
  let tags = getUrlParams(url, 'tags');
  const page = getUrlParams(url, 'page');

  // if only one tags set type to string[]
  if (typeof tags === 'string') {
    tags = [tags];
  }

  // prevent empty search
  if (!keywords && !tags) {
    return (
      {
        data: null,
        keywords: null,
        tags: null,
      }
    );
  }

  // if keywords is dulplicate, response error
  if (Array.isArray(keywords)) {
    throw new Response('請提供正確搜尋參數', { status: 400 });
  }

  // POST: search
  const res = await postSearchActivity({
    keywords: keywords || '',
    tags: tags as string[] || undefined,
    countPerSegment: 35,
    currentSegment: Number(page) || 1,
    accessToken: getCookie('sessionToken'),
  });

  return ({
    data: res.data,
    keywords,
    tags,
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

  // set result
  useEffect(() => {
    if (loaderData.data) {
      dispatch(
        setResults(loaderData.data.searchResultData),
      );
    }
  }, [loaderData]);
  // set keyword and tags
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
