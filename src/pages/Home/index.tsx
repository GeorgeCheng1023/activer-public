import React from 'react';
import { getTrendActivity, getNewestActivity } from 'api/activity';
import { LoaderFunction } from 'react-router-dom';
import {
  Hero, TrendActivity, TrendTag, Feature, NewActivity,
} from './components';
import './index.scss';

export const loader: LoaderFunction = async () => {
  const trendActivityRes = await getTrendActivity(5, 1);
  const newestActivityRes = await getNewestActivity(5, 1);
  return ({
    trendActivityResData: trendActivityRes.data,
    newestActivityResData: newestActivityRes.data,
  });
};

function Home() {
  return (
    <main className="home">
      <Hero />

      <Feature />
      <NewActivity />
      <TrendActivity />

      <TrendTag />

    </main>
  );
}

export default Home;
