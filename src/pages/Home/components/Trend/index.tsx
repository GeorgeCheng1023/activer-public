import React from 'react';
import './index.scss';

// component
import CardSlide from '../CardSlide';

function Trend() {
  return (
    <div className="trend">
      <h2 className="trend__title">熱門活動</h2>
      <CardSlide />
    </div>
  );
}

export default Trend;
