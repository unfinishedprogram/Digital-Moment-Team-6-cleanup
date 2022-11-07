import dynamic from 'next/dynamic'
import styles from '../../../styles/charts.module.scss';
import Donut from './charts/donut-chart';
import Line from './charts/line-chart'
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// General Data interface used in chart series.
interface IData {
    name: string;
    data: number[];
  }

// Interface for use with bar chart.
interface IBar {
  series: IData[];
  options: {
    plotOptions: {
      bar: {
        horizontal: boolean;
        dataLabels: {
          total: {
            enabled: boolean;
            offsetX: number;
            style: {
              fontSize: string;
            }
          }
        }
      },
    },
    stroke: {
      width: number;
      colors: string[];
    },
    title: {
      text: string;
    },
    xaxis: {
      categories: string[];
    },
    fill: {
      opacity: number;
    }
  }
}

export default function AdminData() {
  // Constants used in chart options.
  let bar: IBar = {
    series: [
      {
        name: 'Challenge Posts',
        data: [41, 67, 21, 54]
      },
      {
        name: 'Idea Posts',
        data: [24, 19, 34, 13]
      }
    ],
    options: {
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px'
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Posts per Region'
      },
      xaxis: {
        categories: ['Americas', 'Asia Pacific', 'Europe', 'Middle East/Africa']
      },
      fill: {
        opacity: 1
      }
    }
  }

  // Return react component containing a bar, line, and donut chart.
  return (
    <div className={styles.charts}>
      <div>
        <Chart 
          options={bar.options} 
          series={bar.series} 
          type="bar"
          height="500"
          width="340"
        />
      </div>
      <Line/>
      <Donut/>
    </div>
  );
}
