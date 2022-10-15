import React from 'react';

// component
import Header from '../../components/Header';
import Hero from './components/Hero';
import Trend from './components/Trend';

function Home() {
  return (
    <div className="home">
      <Header />
      <Hero />
      <Trend />
    </div>
  );
}

export default Home;
