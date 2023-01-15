import React from 'react';

// components
import CardRow from 'components/Card/Row';
import { TagType } from 'components/Tag';
import HistoryControl from './components/HistoryControl';
// import ChartHistoryTag, { dataType } from './components/ChartHistoryTag';
// import ChartArea from './components/ChartArea';

// style
import './index.scss';

// data
import dummyActivityHistory from './dummyActivityHistory.json';
// import dummyUserTagHistory from './dummyUserTagHistory.json';

function History() {
  return (
    <div className="history">
      {/* <h2 className="history__h2">興趣分析</h2>
      <div className="history__analytics">
        <div className="history__tag-freq">
          <ChartHistoryTag data={
            dummyUserTagHistory.map((Tag):dataType => (
              {
                tag: {
                  id: Tag.Id,
                  text: Tag.Text,
                  variant: Tag.Type as TagType['variant'],
                },
                count: Tag.TagCount,
              }
            ))
          }
          />
        </div>
        <div className="history__area-freq">
          <ChartArea />
        </div>
      </div> */}
      <h2 className="history__h2">歷史活動</h2>
      <div className="history__activity">
        {dummyActivityHistory.map((history) => {
          const parseTags:TagType[] = history.Activity?.Tags.map((tag) => ({
            id: tag.Id,
            text: tag.Text,
            type: tag.Type as TagType['type'],
          }));

          return (
            <CardRow
              id={history.Activity.ActivityId}
              key={history.Activity.ActivityId}
              imgUrl={history.Activity?.Image[0].ImageUrl}
              title={history.Activity?.Title}
              altText={history.Activity?.Title}
              tags={parseTags}
              detail={`${history.Activity?.Date.DateStart} - ${history.Activity?.Date.DateEnd}`}
              control={<HistoryControl />}
            />
          );
        })}
      </div>
    </div>
  );
}

export default History;
