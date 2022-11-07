import dynamic from 'next/dynamic'
import styles from '../../styles/charts.module.scss';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import React from 'react'

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

interface ILine {
  options: {

  }
}

export default function adminGeneral() {

  let donut: IDonut = {
    options: {
      title: {
        text: 'Amount of Tags per SDG',
        style: {
          fontSize: '18px'
        }
      },
      name: "# of Tags per SDG",
      labels: ['SDG 1', 'SDG 2', 'SDG 3', 'SDG 4', 'SDG 5']
    },
    series: [44, 55, 41, 17, 15]
  }

  return (
    <div className={styles.charts}>
      <div>
        <Chart 
          options={donut.options} 
          series={donut.series} 
          type="donut" 
          width="380" 
        />
      </div>
    </div>
  );
}
