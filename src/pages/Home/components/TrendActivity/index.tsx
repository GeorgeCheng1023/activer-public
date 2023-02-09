import React from 'react';
import './index.scss';
import MainCard from 'components/Card/MainCard';
import Button from 'components/Button';
import { FaHotjar } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { homeLoaderDataType } from 'types/ActivityDataType';
import { useLoaderData } from 'react-router-dom';

function TrendActivity() {
  const screenWidth = useWindowWidth();
  const loaderData = useLoaderData() as homeLoaderDataType;

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
        {loaderData.trendActivityResData.searchResultData
          .map((activity) => (
            <MainCard activity={activity} />
          ))
          .splice(0, screenWidth > 1024 ? 5 : 4)}

      </div>
    </section>
  );
}

export default TrendActivity;
