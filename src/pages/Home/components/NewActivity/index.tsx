import React from 'react';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { BsArrowRight } from 'react-icons/bs';
import { FcPositiveDynamic } from 'react-icons/fc';
import './index.scss';
import ActivityDataType from 'types/ActivityDataType';
import { homeLoaderType } from 'types/Loader';
import MainCard from 'components/Card/MainCard';

function NewActivity() {
  const screenWidth = useWindowWidth();
  const loaderData = useLoaderData() as homeLoaderType;
  const navigate = useNavigate();

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
          type="button"
          iconAfter={<BsArrowRight />}
          onClick={() => navigate('/activity?type=new&page=1')}
        />
      </div>

      <div className="home__card-container">
        {loaderData.newestActivityResData.searchResultData
          .map((activity: ActivityDataType) => (
            <MainCard activity={activity} key={`card-${activity.id}`} />
          ))
          .splice(0, screenWidth > 1024 ? 5 : 4)}

      </div>
    </section>
  );
}

export default NewActivity;
