import React, { useState } from 'react';
import './index.scss';
import Button from 'components/Button';

import useWindowWidth from 'hooks/window/useWindowWidth';
import { BsArrowRight } from 'react-icons/bs';
import { FaHotjar } from 'react-icons/fa';
import ManageNav from 'components/ManageNav';
import { motion } from 'framer-motion';
import Rocket from './Rocket.png';

function TrendTag() {
  const windowWidth = useWindowWidth();

  const [currentClassifyId, setCurrentClassifyId] = useState('location');

  return (
    <section className="trend-tag">
      <div className="home__header">
        <h2 className="home__title">
          <FaHotjar />
          熱門標籤
        </h2>
        <Button
          color="white"
          text={windowWidth > 768 ? '更多標籤' : '更多'}
          iconAfter={<BsArrowRight />}
        />

      </div>

      <div className="trend-tag__container">
        <div className="trend-tag__class">

          <ManageNav
            filters={[{
              id: 'area',
              label: '專業領域',
            },
            {
              id: 'location',
              label: '地點',
            },
            {
              id: 'other',
              label: '其他',
            },
            ]}
            onChangeFilter={setCurrentClassifyId}
            currentFilterId={currentClassifyId}
          />
          <div className="trend-tag__class__tags">
            {Array(3).fill(0).map((element, index) => (
              <div className="trend-tag__item" key={`trend-tag-item-${element}${index}`}>
                <div className="trend-tag__item__hashtag">
                  <Button
                    color="primary"
                    text="#"
                    variant={{ round: true, outline: true }}
                  />
                </div>
                <div className="trend-tag__item__text">
                  <p className="trend-tag__item__text__title">網頁設計</p>
                  <p className="trend-tag__item__text__description">1000+ 相關活動</p>
                </div>
              </div>
            ))}

          </div>
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
