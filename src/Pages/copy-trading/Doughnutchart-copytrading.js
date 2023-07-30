import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: "bottom"
          }
        // title: {
        //   display: true,
        //   text: 'Chart.js Bar Chart',
        // },
    },
};

export const data = {
    labels: ['IDUSDT Perpetual', 'BELUSDT Perpetual', 'TOMOUSDT Perpetual',],
  datasets: [
    {
      label: '',
      data: [25, 15, 15],
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      
      ],
      borderWidth: 0,
    
    },
  ],
};

export default function Doughnutchartcopytrading() {
  return <Doughnut data={data} />;
}
