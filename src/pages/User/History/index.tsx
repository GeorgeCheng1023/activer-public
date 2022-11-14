import React from 'react';

// components
import { CardColumn as Card } from 'components/Card';
import { TagType } from 'components/Tag';
import HistoryControl from './HistoryControl';
import ChartHistoryTag from './components/ChartHistoryTag';
import ChartArea from './components/ChartArea';

// style
import './index.scss';

// data
import dummyActivityHistory from './dummyActivityHistory.json';

function History() {
  return (
    <div className="history">
      <h2 className="history__h2">興趣分析</h2>
      <div className="history__analytics">
        <div className="history__tag-freq">
          <ChartHistoryTag />
        </div>
        <div className="history__area-freq">
          <ChartArea />
        </div>
      </div>
      <h2 className="history__h2">歷史活動</h2>
      <div className="history__activity">
        {dummyActivityHistory.map((history) => {
          const parseTags:TagType[] = history.Tags.map((tag) => {
            const variant = tag.Type as TagType['variant'];

            return ({
              id: tag.Id,
              text: tag.Text,
              variant,
            });
          });

          return (
            <Card
              key={history.Title}
              data={{
                imgUrl: history.Image[0].ImageUrl,
                title: history.Title,
                altText: history.Title,
                tags: parseTags,
                detail: `${history.Date.DateStart} - ${history.Date.DateEnd}`,
              }}
              control={<HistoryControl />}
            />
          );
        })}
      </div>
    </div>
  );
}

export default History;
