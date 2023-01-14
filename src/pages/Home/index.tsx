import React from 'react';

// component
import {
  Hero, TrendActivity, TrendTag, Feature, NewActivity,
} from './components';
import './index.scss';

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
