import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
        max: 30,
        min: 0,
        ticks: {
            stepSize: 10
        }
    }
},
  plugins: {
    legend: {
      display: false
    },
    // title: {
    //   display: false,
    //   text: 'Chart.js Line Chart',
    // },
  },
};

const labels = ['03-27', '03-40', '04-20', '04-50', '04-8', '04-20', '04-28'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      lineTension: 0.5,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Areachart() {
  return <Line options={options} data={data} className="" />;
}
