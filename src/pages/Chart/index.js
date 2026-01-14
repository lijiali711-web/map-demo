import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
const Chart = () => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      const chart = echarts.init(chartRef.current);
      // 在这里配置Echarts图表的选项和数据
      const options = {
        title:{
            text : '生育率折线图', //主标题
            textStyle:{ //主标题样式
                color:"yellowgreen",
                fontWeight :'bolder'

            },
            subtext:'zheixiantu', //副标题
            subtextStyle:{ //副标题样式
                color:"yellowgreen",
                fontWeight :'bolder'

            },
            // textAlign:'center',//水平方向
        },
        grid:{ //坐标系
            containLabel:true, //是否显示刻度  
        },
        // 提示框组件 可以用到任何的地方
        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
        // Echarts图表的配置选项
        xAxis: {
            type: 'category', //坐标轴类型 category：类目，适合离散   value：数据，适合连续数据  time：用于连续时间  log：对数轴
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name:'日期'
          },
          yAxis: {
            type: 'value',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name:'数值'


          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            },
            {
                data: [110, 200, 424, 618, 35, 447, 26],
                type: 'line'
              },
          ]
      };
      chart.setOption(options);
  
      // 在组件卸载时销毁Echarts实例
      return () => {
        chart.dispose();
      };
    }, []);
  
    return <div ref={chartRef} style={{ width: '600px', height: '400px',margin:'0 auto' }} />;
  };
  
  export default Chart;