import React from 'react';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import { Link, useLoaderData } from 'react-router-dom';
import Button from 'components/Button';
import { BsArrowRight } from 'react-icons/bs';
import Card from 'components/Card';
import { FcPositiveDynamic } from 'react-icons/fc';
import './index.scss';
import ActivityDataType, { homeLoaderDataType } from 'types/ActivityDataType';
import MainCardControl from 'components/Card/MainCardControl';

function NewActivity() {
  const screenWidth = useWindowWidth();
  const loaderData = useLoaderData() as homeLoaderDataType;

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
        {loaderData.newestActivityResData
          .map((activity: ActivityDataType) => (
            <Link to={`/detail/${activity.id.toString()}`}>
              <Card
                id={activity.id.toString()}
                imgUrl={activity.images ? activity.images[0] : '/DefaultActivityPng.png'}
                title={activity.title}
                key={`new-activity-${activity.id.toString()}`}
                altText={activity.title}
                tags={activity.tags ? useParseArrayTagDataToTag(activity.tags) : undefined}
                control={(
                  <MainCardControl
                    trend={activity.trend}
                    id={`new-activity__item-${activity.id.toString()}`}
                  />
                )}
              />
            </Link>
          ))
          .splice(0, screenWidth > 1024 ? 5 : 4)}

      </div>
    </section>
  );
}

export default NewActivity;
