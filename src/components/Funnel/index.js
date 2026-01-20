import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import ChartCom from '../chart';
import { option } from './util';
import './index.css';

/**
 * @desc 漏斗图
 */

const Charts = props => {
   const { seriesData } = props;
   const Chart = useRef(); // echart对象
   const ChartDOM = useRef(); // 放置在哪

   useEffect(() => {
      if (ChartDOM.current) {
         initCharts();
      }
   }, []);

   useEffect(() => {
      if (!Chart.current) return;
      //   let rotate = 0;
      //   if (seriesData.y.length > 5) rotate = 45;
      //   option.series[0].data = seriesData.y;
      //   option.xAxis.data = seriesData.x || [
      //      '1月',
      //      '2月',
      //      '3月',
      //      '4月',
      //      '5月',
      //      '6月',
      //      '7月',
      //      '8月',
      //      '9月',
      //      '10月',
      //      '11月',
      //      '12月',
      //   ];
      //   option.xAxis.axisLabel.rotate = rotate;
      Chart.current.setOption(option);
   }, [seriesData]);


   const initCharts = () => {
      Chart.current = echarts.init(ChartDOM.current);
      Chart.current.setOption(option);
   };

   return (
      <div className="linet-com-container">
         <ChartCom chartdom={ChartDOM} chart={Chart} />
      </div>
   );
};

export default Charts;