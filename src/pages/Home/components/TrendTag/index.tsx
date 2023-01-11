import React from 'react';
import './index.scss';
import Button from 'components/Button';

import useWindowWidth from 'hooks/window/useWindowWidth';
import { BsArrowRight } from 'react-icons/bs';
import { FaHotjar } from 'react-icons/fa';

function TrendTag() {
  const windowWidth = useWindowWidth();

  return (
    <div className="trend-tag">
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
          <h3 className="trend-tag__class__title">專業領域</h3>
          <div className="trend-tag__class__tags">
            {Array(3).fill(0).map(() => (
              <div className="trend-tag__item">
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
      </div>

    </div>
  );
}

export default TrendTag;
