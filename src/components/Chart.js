import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props) {
  const graphData = props.formData.expenses
  const values = graphData.map(item => parseInt(item.value))

  const data = {
    // labels: ['Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '$ spent',
        data: values,
        backgroundColor: [
          '#ff9d00','#27AE60','#62DCC7', '#ECD030','#30B5B2','#e761bf', '#e76161', '#616be7', '#7842e4'

        ],
        borderColor: [
          '#ff9d00','#27AE60','#62DCC7', '#ECD030','#30B5B2','#e761bf', '#e76161', '#616be7', '#7842e4'
        ], 
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut className="doughnut-chart" data={data} />;
}