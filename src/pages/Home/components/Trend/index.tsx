import React from 'react';
import './index.scss';
// import { useParseTagDataArray } from 'hooks/tag';
import { useParseTagDataArray } from 'hooks/tag';
import dummyData from './dummyTrendActivity.json';

// component
import CardSlide from '../CardSlide';

function Trend() {
  return (
    <div className="trend">
      <h2 className="trend__title">熱門活動</h2>
      <CardSlide
        cards={
          dummyData.map((data) => {
            const parseTags = useParseTagDataArray(data.Tags);
            return ({
              id: data.Id.toString(),
              imgUrl: data.Image ? data.Image[0] : '/DefaultActivityPng.png',
              title: data.Title,
              altText: data.Title,
              tags: parseTags,
            });
          })
        }
      />
    </div>
  );
}

export default Trend;
