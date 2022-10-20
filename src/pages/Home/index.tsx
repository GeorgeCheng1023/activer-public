import React from 'react';

// component
import Hero from './components/Hero';
import Trend from './components/Trend';

function Home() {
  return (
    <div className="home">
      <Hero />
      <Trend />
    </div>
  );
}

export default Home;
