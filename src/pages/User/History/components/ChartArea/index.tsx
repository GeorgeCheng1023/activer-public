import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';

const data = [
  {
    subject: '教育',
    A: 10,
    fullMark: 150,
  },
  {
    subject: '藝術人文',
    A: 98,
    fullMark: 150,
  },
  {
    subject: '社會科學',
    A: 86,
    fullMark: 150,
  },
  {
    subject: '商管與法律',
    A: 99,
    fullMark: 150,
  },
  {
    subject: '自然科學',
    A: 85,
    fullMark: 150,
  },
  {
    subject: '資訊科學',
    A: 65,
    fullMark: 150,
  },
  {
    subject: '工程',
    A: 65,
    fullMark: 150,
  }, {
    subject: '生物',
    A: 65,
    fullMark: 150,
  }, {
    subject: '醫療衛生',
    A: 65,
    fullMark: 150,
  }, {
    subject: '服務',
    A: 65,
    fullMark: 150,
  },
];

function ChartArea() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />

        <Radar dataKey="A" stroke="#F3B755" fill="#F3B755" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default ChartArea;
