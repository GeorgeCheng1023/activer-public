import React from 'react';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { useLoaderData } from 'react-router-dom';
import Button from 'components/Button';
import { BsArrowRight } from 'react-icons/bs';
import { FcPositiveDynamic } from 'react-icons/fc';
import './index.scss';
import ActivityDataType, { homeLoaderDataType } from 'types/ActivityDataType';
import MainCard from 'components/Card/MainCard';

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
        <Button
          color="white"
          text={screenWidth > 768 ? '更多熱門活動' : '更多'}
          iconAfter={<BsArrowRight />}
        />
      </div>

      <div className="home__card-container">
        {loaderData.newestActivityResData
          .map((activity: ActivityDataType) => (
            <MainCard activity={activity} />
          ))
          .splice(0, screenWidth > 1024 ? 5 : 4)}

      </div>
    </section>
  );
}

export default NewActivity;
