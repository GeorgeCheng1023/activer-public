import React from 'react';
import { getTrendActivity, getNewestActivity } from 'api/activity';
import {
  Hero, TrendActivity, TrendTag, Feature, NewActivity,
} from './components';
import './index.scss';

export async function loader() {
  const trendActivityRes = await getTrendActivity();
  const newestActivityRes = await getNewestActivity();
  return ({
    trendActivityResData: trendActivityRes.data,
    newestActivityResData: newestActivityRes.data,
  });
}

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
