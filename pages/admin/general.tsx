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

interface ILineData {
  name: string;
  data: number[];
}

interface ILineTitle {
  text: string;
}

interface ILine {
  options: {
    title: ILineTitle;
    colors: string[];
  }
  series: ILineData[];
}

const colorPalette: string[] = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0'];

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

  let line: ILine = {
    options: {
      title: { 
        text: 'Posts per Day'
      },
      colors: colorPalette,
    },
    series: [
      {
        name: 'Amount of Challenge Posts',
        data: [10, 20, 15, 2, 6, 21]
      },
      {
        name: 'Amount of Idea Posts',
        data: [5, 3, 14, 7, 2, 10]
      }
    ]
  }

  return (
    <div className={styles.charts}>
      <div>
        <Chart
          options={line.options}
          series={line.series}
          type="line"
          width="500"
        />
      </div>
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
