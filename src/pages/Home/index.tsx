import React from 'react';
import { getTrendActivity, getNewestActivity } from 'api/activity';
import { getTrendTag } from 'api/tag';
import { LoaderFunction } from 'react-router-dom';
import getCookies from 'utils/getCookies';
import {
  Hero, TrendActivity, TrendTag, Feature, NewActivity,
} from './components';
import './index.scss';

export const loader: LoaderFunction = async () => {
  const trendActivityRes = await getTrendActivity(4, 1);
  const newestActivityRes = await getNewestActivity(4, 1);
  const trendTagRes = await getTrendTag(
    4,
    1,
    getCookies('sessionToken'),
  );
  return ({
    trendActivityResData: trendActivityRes.data,
    newestActivityResData: newestActivityRes.data,
    trendTagResData: trendTagRes.data,
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
