import React from 'react';
import Tag, { TagType } from 'components/Tag';
import dummyTagCount from './dummyTagCount.json';
import './index.scss';

function TrendTag() {
  return (
    <div className="trend-tag">
      <h2>熱門標籤</h2>
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
