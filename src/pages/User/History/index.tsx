import React from 'react';

// components
import Card from 'components/Card/Default';
import { useParseArrayTagDataToTag } from 'hooks/tag';
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
                  id: Tag.id,
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
      <h2 className="history__h2">活動歷程</h2>
      <div className="history__activity">
        {dummyActivityHistory.map((history) => {
          const parseTags:TagType[] = useParseArrayTagDataToTag(history.activity?.tags);

          return (
            <Card
              id={history.activity.id.toString()}
              key={history.activity.id}
              imgUrl={history.activity?.images[0]}
              title={history.activity?.title}
              altText={history.activity?.title}
              tags={parseTags}
              control={<HistoryControl />}
            />
          );
        })}
      </div>
    </div>
  );
}

export default History;
