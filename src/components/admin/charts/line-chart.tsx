import dynamic from 'next/dynamic'
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

export default function Line() {
  const colorPalette: string[] = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0'];


  let line: ILine = {
    options: {
      title: { 
        text: 'Posts per Day',
        style: {
          fontSize: '14px'
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
  };
  
  return (
    <div>
      <Chart
        options={line.options}
        series={line.series}
        type="line"
        width="340"
      />
    </div>
  );
}