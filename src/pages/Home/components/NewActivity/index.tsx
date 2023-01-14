import React from 'react';
import Button from 'components/Button';
import { BsArrowRight } from 'react-icons/bs';
import { TagDataType } from 'types/ActivityDataType';
import { TagType } from 'components/Tag';
import Card from 'components/Card/Default';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { FcPositiveDynamic } from 'react-icons/fc';
import dummyData from './dummyTrendActivity.json';
import './index.scss';

function NewActivity() {
  const screenWidth = useWindowWidth();

  // TODO: fetch data

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
        {dummyData

          .map((data) => (
            <Card
              id={data.Id.toString()}
              imgUrl={data.Image ? data.Image[0] : '/DefaultActivityPng.png'}
              title={data.Title}
              key={`new-activity-${data.Id.toString()}`}
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

export default NewActivity;
