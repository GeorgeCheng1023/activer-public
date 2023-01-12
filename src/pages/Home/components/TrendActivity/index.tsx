import React from 'react';
import './index.scss';

import { Card } from 'components/Card';
import { TagDataType } from 'types/ActivityDataType';
import { TagType } from 'components/Tag';
import Button from 'components/Button';
import { FaHotjar } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import useWindowWidth from 'hooks/window/useWindowWidth';
import dummyData from './dummyTrendActivity.json';
// component

function TrendActivity() {
  const screenWidth = useWindowWidth();

  // TODO: fetch data

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
        {dummyData

          .map((data) => (
            <Card
              id={data.Id.toString()}
              imgUrl={data.Image ? data.Image[0] : '/DefaultActivityPng.png'}
              title={data.Title}
              altText={data.Title}
              tags={data.Tags.map((tag: TagDataType) => ({
                id: tag.Id.toString(),
                text: tag.Text,
                variant: tag.Type as TagType['variant'],
              }))}
            />
          ))
          .splice(0, screenWidth > 1024 ? 5 : 4)}

      </div>
    </section>
  );
}

export default TrendActivity;
