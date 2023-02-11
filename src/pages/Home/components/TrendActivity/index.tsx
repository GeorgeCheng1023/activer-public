import React from 'react';
import Button from 'components/Button';
import MainCard from 'components/Card/MainCard';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { BsArrowRight } from 'react-icons/bs';
import { FaHotjar } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { homeLoaderDataType } from 'types/ActivityDataType';
import './index.scss';

function TrendActivity() {
  const screenWidth = useWindowWidth();
  const loaderData = useLoaderData() as homeLoaderDataType;
  const navigate = useNavigate();
  return (
    <section className="trend-activity">
      <div className="home__header">
        <h2 className="home__title">

          <FaHotjar />
          熱門活動
        </h2>
        <Button
          color="white"
          text={screenWidth > 768 ? '更多熱門活動' : '更多'}
          iconAfter={<BsArrowRight />}
          onClick={() => navigate('/activity?type=trend')}
        />
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
