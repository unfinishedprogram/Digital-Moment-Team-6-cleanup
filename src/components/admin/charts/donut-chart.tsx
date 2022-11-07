import styles from '../../../../styles/charts.module.scss';
import dynamic from 'next/dynamic'
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Interface for use with Donut chart.
interface IDonut {
  options: {
    title: {
    text: string;
    style: {
        fontSize: string;
    }
    },
    name: string;
    labels: string[];
  };
  series: number[];
}

export default function Donut() {
  // Create all three charts.
  let donut: IDonut = {
    options: {
      title: {
        text: 'Amount of Tags per SDG',
        style: {
          fontSize: '14px'
        }
      },
      name: "# of Tags per SDG",
      labels: ['SDG 1', 'SDG 2', 'SDG 3', 'SDG 4', 'SDG 5']
    },
    series: [44, 55, 41, 17, 15]
  }

  return (
    <div className={styles.chart}>
      <Chart 
        options={donut.options} 
        series={donut.series} 
        type="donut" 
        width="340" 
      />
    </div>
  )
}