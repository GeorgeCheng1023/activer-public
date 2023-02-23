import React, { useState, useEffect } from 'react';
import Button from 'components/Button';
import MainCard from 'components/Card/MainCard';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { BsArrowRight } from 'react-icons/bs';
import { FaHotjar } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ActivityDataType from 'types/ActivityDataType';
import { homeLoaderType } from 'types/Loader';
import './index.scss';

function TrendActivity() {
  const screenWidth = useWindowWidth();
  const loaderData = useLoaderData() as homeLoaderType;
  const navigate = useNavigate();
  const [trendActivities, setTrendActivities] = useState<ActivityDataType[]>(
    loaderData.trendActivityResData.searchResultData,
  );

  useEffect(() => {
    if (screenWidth < 1024) {
      setTrendActivities(loaderData.trendActivityResData.searchResultData.slice(0, 3));
    } else {
      setTrendActivities(loaderData.trendActivityResData.searchResultData);
    }
  }, [screenWidth]);

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
        {trendActivities
          .map((activity) => (
            <MainCard
              activity={activity}
              key={`trend-activity-${activity.id}`}
            />
          ))
          .slice(0, screenWidth > 1024 ? 4 : 3)}
      </div>
    </section>
  );
}

export default TrendActivity;
