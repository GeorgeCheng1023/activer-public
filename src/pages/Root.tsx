import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel';
import { useAppSelector } from 'hooks/redux';
import Header from '../components/Header';

function Root() {
  const defaultTags = useAppSelector((state) => state.searchPanel.defaultTags);
  const recommendTags = useAppSelector((state) => state.searchPanel.recommendTags);

  return (
    <>
      <SearchPanel
        defaultTags={defaultTags}
        recommendTags={recommendTags}
      />
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
