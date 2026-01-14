import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import ChartCom from '../chart';
import { option } from './utils'

/**
 * @desc 饼图
 */

const Charts = props => {
   const { dataList } = props;
   const Chart = useRef(); // echart对象
   const ChartDOM = useRef(); // 放置在哪

   useEffect(() => {
      initCharts();
   }, []);

   useEffect(() => {
      if (!Chart.current) return;
      // option.series[0].data = dataList;
      Chart.current.setOption(option);
   }, [dataList]);

   const initCharts = () => {
      Chart.current = echarts.init(ChartDOM.current);
      Chart.current.setOption(option);
   };

   return (
      <div className="pie-com-container" style={{ height: '100%' }}>
         <ChartCom chartdom={ChartDOM} chart={Chart} />
      </div>
   );
};

export default Charts;