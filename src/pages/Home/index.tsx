import React from 'react';

// component
import {
  Hero, TrendActivity, TrendTag, Feature,
} from './components';
import './index.scss';

function Home() {
  return (
    <div className="home">
      <Hero />
      <Feature />

      <TrendActivity />

      <TrendTag />

    </div>
  );
}

export default Home;
