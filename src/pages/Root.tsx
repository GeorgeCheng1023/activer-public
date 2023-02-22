import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import Footer from 'components/Footer';
import Header from '../components/Header';
import { getLoadingState } from '../store/loading/index';
import Loading from './Loading';

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
