import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// const pieData = [props.data.groceries, props.data.gas, props.data.food]
          // '#ECD030','#30B5B2',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
// export 

export default function PieChart(props) {
  console.log(props.formData)
  const data = {
    // labels: ['Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [props.formData.groceries, props.formData.gas, props.formData.food],
        backgroundColor: [
          '#ff9d00','#27AE60','#62DCC7', 

        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',

        ], 
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut className="doughnut-chart" data={data} />;
}