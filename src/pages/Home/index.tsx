import React from 'react';
import { getTrendActivity } from 'api/activity';
import { WithTagsBaseActivityDataType } from 'types/ActivityDataType';
import {
  Hero, TrendActivity, TrendTag, Feature, NewActivity,
} from './components';
import './index.scss';

export interface homeLoaderDataType {
  trendActivityResData:WithTagsBaseActivityDataType[];
}

export async function loader() {
  const trendActivityRes = await getTrendActivity();
  return ({
    trendActivityResData: trendActivityRes.data,
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
