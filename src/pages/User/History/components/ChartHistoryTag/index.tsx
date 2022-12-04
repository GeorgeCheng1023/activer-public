import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell, LabelList,
} from 'recharts';

// components
import { TagType } from 'components/Tag';

// style
import './index.scss';

// hooks
import useWindowSize from 'hooks/window/useWindowSize';

export type dataType = {
  tag: TagType,
  count: number,
};

type Props = {
  data: dataType[]
};

type chartDataType = {
  name: string,
  count: number
};

const initialData = [
  {
    name: '',
    count: 0,
  },
];

function ChartHistoryTag({ data }: Props) {
  // underneath will not use height
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, height] = useWindowSize();

  const [parseData, setParseData] = useState<chartDataType[]>(initialData);
  useEffect(() => {
    let newData = data.map((d) => ({
      name: d.tag.text,
      count: d.count,
    }));

    if (width < 768) {
      newData = newData.slice(0, 5);
    }
    console.log(newData);
    setParseData(newData);
  }, [width]);

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
