import React from 'react';
// hooks
import useWindowWidth from 'hooks/window/useWindowWidth';
import { useParseArrayTagDataToTag } from 'hooks/tag';
// component
import Button from 'components/Button';
import { BsArrowRight } from 'react-icons/bs';
import Card from 'components/Card';
import { FcPositiveDynamic } from 'react-icons/fc';
import { BaseWithTagActivityDataType } from 'types/ActivityDataType';
// style
import './index.scss';
// dummy data
import dummyData from './dummyTrendActivity.json';

function NewActivity() {
  const screenWidth = useWindowWidth();

  // TODO: fetch data
  const newActivities: BaseWithTagActivityDataType[] = dummyData;

  return (
    <section className="new-activity">

      <div className="home__header">
        <h2>
          <FcPositiveDynamic />
          最新活動
        </h2>
        <Button color="white" text={screenWidth > 768 ? '更多熱門活動' : '更多'} iconAfter={<BsArrowRight />} />
      </div>

      <div className="home__card-container">
        {newActivities
          .map((activity: BaseWithTagActivityDataType) => (
            <Card
              id={activity.id.toString()}
              imgUrl={activity.images ? activity.images[0] : '/DefaultActivityPng.png'}
              title={activity.title}
              key={`new-activity-${activity.id.toString()}`}
              altText={activity.title}
              tags={useParseArrayTagDataToTag(activity.tags)}
            />
          ))
          .splice(0, screenWidth > 1024 ? 5 : 4)}

      </div>
    </section>
  );
}

export default NewActivity;
