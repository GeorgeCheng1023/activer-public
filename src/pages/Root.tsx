import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel';
import Header from '../components/Header';

function Root() {
  return (
    <>
      <SearchPanel />
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
