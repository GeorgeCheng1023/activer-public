import React from 'react';

// component
import { Hero, TrendActivity, TrendTag } from './components';
import './index.scss';

function Home() {
  return (
    <div className="home">
      <Hero />

      <TrendActivity />

      <TrendTag />

    </div>
  );
}

export default Home;
