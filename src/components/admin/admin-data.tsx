import dynamic from 'next/dynamic'
import styles from '../../../styles/charts.module.scss';
import Donut from './charts/donut-chart';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// General Data interface used in chart series.
interface IData {
    name: string;
    data: number[];
  }

// Interface for use with line chart.
interface ILine {
  options: {
    title: {
      text: string;
      style: {
        fontSize: string;
      }}
    colors: string[];
  }
  series: IData[];
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
  const titleSize: string = '14px';
  const colorPalette: string[] = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0'];


  let line: ILine = {
    options: {
      title: { 
        text: 'Posts per Day',
        style: {
          fontSize: titleSize
        }
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
      <div>
        <Chart
          options={line.options}
          series={line.series}
          type="line"
          width="340"
        />
      </div>
      <Donut/>
    </div>
  );
}
