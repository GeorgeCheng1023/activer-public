import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel';
import { useAppSelector } from 'hooks/redux';
import Footer from 'components/Footer';
import Header from '../components/Header';
import { getLoadingState } from '../store/userAuth/index';
import Loading from './Loading';

function Root() {
  const isLoading = useAppSelector(getLoadingState);

  return (
    isLoading === 'loading'
      ? <Loading /> : (
        <>
          <SearchPanel />
          <Header />
          <Outlet />
          <Footer />
        </>
      )
  );
}

export default Root;
