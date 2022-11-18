import React from 'react';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell, LabelList,
} from 'recharts';

// components
import { TagType } from 'components/Tag';

// style
import './index.scss';

export type dataType = {
  tag: TagType,
  count: number,
};

type Props = {
  data: dataType[]
};

function ChartHistoryTag({ data }: Props) {
  const parseData = data.map((d) => ({
    name: d.tag.text,
    count: d.count,
  }));
  const barColor = (variant : TagType['variant']) => {
    switch (variant) {
      case ('area'):
        return '#93C586';
        break;
      case ('location'):
        return '#699FF1';
        break;
      case ('other'):
        return '#F3B755';
        break;
      default:
        return '#93C586';
    }
  };
  return (
    <div className="chart__tag">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={parseData} height={400}>
          <XAxis dataKey="name" height={40} />
          <Tooltip />
          <Bar dataKey="count" fill="#000" barSize={25} label>
            {data.map((d) => (
              <Cell fill={barColor(d.tag.variant)} />
            ))}
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartHistoryTag;
