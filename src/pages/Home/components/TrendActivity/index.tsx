import React from 'react';
import './index.scss';

import { Card } from 'components/Card';
import { TagDataType } from 'types/ActivityDataType';
import { TagType } from 'components/Tag';
import Button from 'components/Button';
import { BsArrowRight } from 'react-icons/bs';
import useWindowWidth from 'hooks/window/useWindowWidth';
import dummyData from './dummyTrendActivity.json';
// component

function TrendActivity() {
  const screenWidth = useWindowWidth();

  return (
    <div className="trend-activity">
      <div className="trend-activity__header">
        <h2 className="trend__title">熱門活動</h2>
        <Button color="white" text={screenWidth > 768 ? '更多熱門活動' : '更多'} iconAfter={<BsArrowRight />} />
      </div>
      <div className="trend-activity__items">
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
    </div>
  );
}

export default TrendActivity;
