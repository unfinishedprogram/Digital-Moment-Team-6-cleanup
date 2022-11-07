import dynamic from 'next/dynamic'
import styles from '../../../styles/charts.module.scss';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import React from 'react';

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

interface IData {
  name: string;
  data: number[];
}

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

const titleSize: string = '14px';
const colorPalette: string[] = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0'];

export default function AdminData() {

  let donut: IDonut = {
    options: {
      title: {
        text: 'Amount of Tags per SDG',
        style: {
          fontSize: titleSize
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
      <div>
        <Chart 
          options={donut.options} 
          series={donut.series} 
          type="donut" 
          width="340" 
        />
      </div>
    </div>
  );
}
