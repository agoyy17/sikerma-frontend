// DoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ['Memorandum of Understanding (MoU)', 'Memorandum of Agreement (MoA)', 'Implementation Arrangement (IA)'],
    datasets: [
      {
        label: 'Statistik Kerjasama',
        data: [68, 19.4, 12.5],
        backgroundColor: ['#7BC4C4', '#B4DFB6', '#F7588C'],
        hoverBackgroundColor: ['#6AB0B0', '#A2C9A2', '#D94672'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14,
          },
          usePointStyle: true,
        },
        onClick: () => null, // Nonaktifkan aksi klik
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: '600px', height: '400px', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Statistik Dokumen Kerjasama Internal</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
