import React from 'react';

// component
import {
  Hero, TrendActivity, TrendTag, Feature, NewActivity,
} from './components';
import './index.scss';

function Home() {
  return (
    <div className="home">
      <Hero />
      <Feature />

      <NewActivity />
      <TrendActivity />

      <TrendTag />

    </div>
  );
}

export default Home;
