import React from 'react';
import './index.scss';
import { motion } from 'framer-motion';
import Button from 'components/Button';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { BsArrowRight } from 'react-icons/bs';
import { FaHotjar } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';
import { homeLoaderType } from 'types/Loader';
import DetailTag from 'components/Tag/DetailTag';
import Rocket from './Rocket.png';

function TrendTag() {
  const windowWidth = useWindowWidth();
  const loaderData = useLoaderData() as homeLoaderType;

  return (
    <section className="trend-tag">
      <div className="home__header">
        <h2 className="home__title">
          <FaHotjar />
          熱門標籤
        </h2>
        <Link to="/tag">
          <Button
            color="white"
            type="button"
            text={windowWidth > 768 ? '更多標籤' : '更多'}
            iconAfter={<BsArrowRight />}
          />
        </Link>

      </div>

      <div className="trend-tag__container">

        <div className="trend-tag__tags">
          {loaderData.trendTagResData.searchResultData.map((tag) => (
            <DetailTag
              key={`trend-tag-${tag.id}`}
              id={`trend-tag-${tag.id}`}
              text={tag.text}
              activityAmount={tag.activityAmount}
              tagTrend={tag.tagTrend}
              type={tag.type}
            />
          ))}

        </div>
        <motion.img
          src={Rocket}
          initial={{ rotate: 330 }}
          animate={{ y: [0, -20, 0] }}
          exit={{ y: 0 }}
          transition={{
            type: 'linear',
            duration: 3,
            repeat: Infinity,
          }}
          alt="rocket"
          className="trend-tag__rocket"

        />
      </div>

    </section>
  );
}

export default TrendTag;
