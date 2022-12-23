import React from 'react';
import Tag, { TagType } from 'components/Tag';
import './index.scss';
import Button from 'components/Button';

import useWindowWidth from 'hooks/window/useWindowWidth';
import { BsArrowRight } from 'react-icons/bs';
import { FaHotjar } from 'react-icons/fa';
import dummyTagCount from './dummyTagCount.json';

function TrendTag() {
  const width = useWindowWidth();

  return (
    <div className="trend-tag">
      <div className="trend-tag__title">
        <h2>
          <FaHotjar />
          熱門標籤
        </h2>
        <Button
          color="white"
          text={width > 768 ? '更多標籤' : '更多'}
          iconAfter={<BsArrowRight />}
        />

      </div>
      <div className="trend-tag__container">

        {dummyTagCount.map(
          (tag) => (
            <>
              <div className="trend-tag__tag">
                <Tag
                  key={tag.Id.toString()}
                  id={tag.Id.toString()}
                  text={tag.Text}
                  variant={tag.Type as TagType['variant']}
                />
              </div>
              <div className="trend-tag__count">
                {tag.RelatedActivity}
                {' '}
                個相關活動
              </div>
            </>
          ),
        )}

      </div>
    </div>
  );
}

export default TrendTag;
