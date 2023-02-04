import React from 'react';
import './index.scss';
import Card from 'components/Card';
import { BaseWithTagActivityDataType } from 'types/ActivityDataType';
import Button from 'components/Button';
import { FaHotjar } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import dummyData from './dummyTrendActivity.json';
// component

function TrendActivity() {
  const screenWidth = useWindowWidth();

  // TODO: fetch data
  const trendActivities: BaseWithTagActivityDataType[] = dummyData;

  return (
    <section className="trend-activity">
      <div className="home__header">
        <h2 className="home__title">
          <FaHotjar />
          熱門活動
        </h2>
        <Button color="white" text={screenWidth > 768 ? '更多熱門活動' : '更多'} iconAfter={<BsArrowRight />} />
      </div>
      <div className="home__card-container">
        {trendActivities
          .map((data) => (
            <Card
              id={data.id.toString()}
              key={`trend-activity-${data.id.toString()}`}
              imgUrl={data.images ? data.images[0] : '/DefaultActivityPng.png'}
              title={data.title}
              altText={data.title}
              tags={useParseArrayTagDataToTag(data.tags)}
            />
          ))
          .splice(0, screenWidth > 1024 ? 5 : 4)}

      </div>
    </section>
  );
}

export default TrendActivity;
