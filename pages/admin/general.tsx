import dynamic from 'next/dynamic'
import styles from '../../styles/charts.module.scss';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import React from 'react'

interface IDonut {
  options: {
    name: string;
    labels: string[];
  };
  series: number[];
}

export default function adminGeneral() {

  let donut: IDonut = {
    options: {
      name: "# of Tags per SDG",
      labels: ['SDG 1', 'SDG 2', 'SDG 3', 'SDG 4', 'SDG 5']
    },
    series: [44, 55, 41, 17, 15]
  }

  return (
    <div className={styles.charts}>
      <Chart 
        options={donut.options} 
        series={donut.series} 
        type="donut" 
        width="380" 
      />
    </div>
  );
}
