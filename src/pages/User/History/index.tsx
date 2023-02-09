import React from 'react';

// components
import Card from 'components/Card';
import { parseArrayTagDataToTag } from 'utils/parseTag';
import { TagType } from 'components/Tag';
import { getNewestActivity } from 'api/activity';
import { useLoaderData } from 'react-router-dom';
import HistoryControl from './components/HistoryControl';
// import ChartHistoryTag, { dataType } from './components/ChartHistoryTag';
// import ChartArea from './components/ChartArea';

// style
import './index.scss';

// data
// import dummyActivityHistory from './dummyActivityHistory.json';
// import dummyUserTagHistory from './dummyUserTagHistory.json';
import { HistoryLoaderDataType } from '../../../types/ActivityDataType';

export async function loader() {
  const newestActivityRes = await getNewestActivity(5, 1);
  return ({
    newestActivityResData: newestActivityRes.data,
  });
}

function History() {
  const louderData = useLoaderData() as HistoryLoaderDataType;
  const activity = louderData.newestActivityResData;

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
        {activity.map((history) => {
          const parseTags: TagType[] = parseArrayTagDataToTag(history.tags || []);

          return (
            <Card
              id={history.id.toString()}
              key={history.id}
              imgUrl={history.images ? history.images[0] : ''}
              title={history.title}
              altText={history.title}
              tags={parseTags}
              control={<HistoryControl activityId={history.id} />}
            />
          );
        })}
      </div>
    </div>
  );
}

export default History;
