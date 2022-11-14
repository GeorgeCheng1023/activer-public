import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dummyUserTagHistory from '../../dmmyUserTagHistory.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: true,
      boxWidth: 1,
    },
  },
};

const labels = dummyUserTagHistory.map((history) => history.Text);

const barColor = (history: any) : string => {
  if (history.Type === 'area') return 'rgba(243, 183, 85, 0.8)';
  if (history.Type === 'location') return 'rgba(105, 159, 241, 0.8)';
  if (history.Type === 'other') return 'rgba(147, 197, 134, 0.8)';
  return 'rgba(255, 255, 255, 0.5)';
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: dummyUserTagHistory.map((history) => history.TagCount),
      backgroundColor: dummyUserTagHistory.map((history) => barColor(history)),
    },
  ],
};

function ChartHistoryTag() {
  return (
    <Bar options={options} data={data} />
  );
}

export default ChartHistoryTag;
