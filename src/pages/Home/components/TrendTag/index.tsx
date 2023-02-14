import React from 'react';
import './index.scss';
import Button from 'components/Button';

import useWindowWidth from 'hooks/window/useWindowWidth';
import { BsArrowRight } from 'react-icons/bs';
import { FaHotjar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useLoaderData } from 'react-router-dom';
import { homeLoaderType } from 'types/Loader';
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
        <Button
          color="white"
          type="button"
          text={windowWidth > 768 ? '更多標籤' : '更多'}
          iconAfter={<BsArrowRight />}
        />

      </div>

      <div className="trend-tag__container">

        <div className="trend-tag__class__tags">
          {loaderData.trendTagResData.searchResultData.map((tag, index) => (
            <div
              className="trend-tag__item"
              key={`trend-tag-item-${tag.id}${index}`}
            >
              <Link
                to={`/search?tags=${tag.text}`}
                className="trend-tag__item__hashtag"
              >
                <Button
                  color="primary"
                  text="#"
                  variant={{ round: true, outline: true }}
                />
              </Link>
              <div className="trend-tag__item__text">
                <Link to={`/search?tags=${tag.text}`} className="trend-tag__item__text__title">
                  {tag.text}
                </Link>
                <p className="trend-tag__item__text__description">
                  {tag.activityAmount}
                  {' '}
                  相關活動
                </p>
              </div>
            </div>
          ))}

        </div>
        <motion.img
          src={Rocket}
          alt="rocket"
          className="trend-tag__rocket"
          initial={{
            x: 200, y: 200, rotate: -30, opacity: 0,
          }}
          whileInView={{ x: [200, 100, 0], y: [200, 100, 0], opacity: [0, 0, 1] }}
          viewport={{ once: false, amount: 0.5 }}
          // transition={{ delay: 0.5 }}
        />
      </div>

    </section>
  );
}

export default TrendTag;
