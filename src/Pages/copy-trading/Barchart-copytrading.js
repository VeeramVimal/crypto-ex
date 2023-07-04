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
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
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
        //   display: true,
        //   text: 'Chart.js Bar Chart',
        // },
    },
};

const labels = ['03-27', '03-40', '04-20', '04-50', '04-8', '04-20', '04-28'];

export const data = {
    labels,
    datasets: [
        {

            data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
            backgroundColor: 'rgba(255, 99, 132)',
        },

    ],
};

export default function Barchartcopytrading() {
    return <Bar options={options} data={data}  />;
}
