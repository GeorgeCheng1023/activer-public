import React from 'react';
import { Outlet, LoaderFunction } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import Footer from 'components/Footer';
import { RootLoaderType } from 'types/Loader';
import { getAllTags } from 'api/tag';
import Header from '../components/Header';
import { getLoadingState } from '../store/userAuth/index';
import Loading from './Loading';

export const rootLoader: LoaderFunction = async (): Promise<RootLoaderType> => {
  const allTagsRes = await getAllTags();
  return {
    allTags: allTagsRes.data,
  };
};

function Root() {
  const isLoading = useAppSelector(getLoadingState);

  return (
    isLoading === 'loading'
      ? <Loading /> : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )
  );
}

export default Root;
