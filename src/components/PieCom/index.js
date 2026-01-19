import React, { useRef, useEffect, useContext } from 'react';
import * as echarts from 'echarts';
import ChartCom from '../chart';
import { option } from './utils'
import { ThemeContext } from '../../themes'

/**
 * @desc 饼图
 */

const Charts = props => {
   const { dataList } = props;
   const Chart = useRef(); // echart对象
   const ChartDOM = useRef(); // 放置在哪
   const { theme } = useContext(ThemeContext);

   useEffect(() => {
      initCharts();
   }, []);

   useEffect(() => {
      if (!Chart.current) return;
      // option.series[0].data = dataList;
      Chart.current.setOption(option);
   }, [dataList]);

   const initCharts = () => {
      // 使用主题颜色初始化图表
      const chartOption = {
         ...option,
         color: [
            theme.primary,
            theme.primaryLight,
            theme.primaryDark,
            '#73c0de',
            '#73d13d',
            '#ffa940',
            '#f5222d'
         ]
      };
      
      Chart.current = echarts.init(ChartDOM.current);
      Chart.current.setOption(chartOption);
   };

   return (
      <div className="pie-com-container" style={{ height: '100%' }}>
         <ChartCom chartdom={ChartDOM} chart={Chart} />
      </div>
   );
};

export default Charts;