import styles from '../../../styles/charts.module.scss';
import Donut from './charts/donut-chart';
import Line from './charts/line-chart'
import Bar from './charts/bar-chart';
import React from 'react';

export default function AdminData() {
  // Return react component containing a bar, line, and donut chart.
  return (
    <div className={styles.chartStack}>
      <Bar/>
      <Line/>
      <Donut/>
    </div>
  );
}
