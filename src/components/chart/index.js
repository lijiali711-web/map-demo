import React, { useEffect } from 'react';

/**
 * @desc 对挂载Echarts的DOM元素做尺寸变化监听，resize图表
 */

const ChartCom = props => {
   const { chartdom, children, chart, style, className } = props;

   useEffect(() => {
      if (!chartdom.current || !chart.current) return;
      const { current } = chartdom;
      // 创建一个ResizeObserver实例
      const resizeObserver = new ResizeObserver(entries => {
         entries.forEach(entry => {
            // 获取DOM元素的新尺寸
            // const newWidth = entry.contentRect.width;
            // const newHeight = entry.contentRect.height;
            // 处理DOM尺寸的变化
            // console.log('DOM尺寸变化:', newWidth, newHeight);
            chart.current && chart.current.resize();
         });
      });

      // 监听DOM元素的尺寸变化
      resizeObserver.observe(current);

      // 在组件卸载时停止监听
      return () => {
         resizeObserver.unobserve(current);
         resizeObserver.disconnect();
      };
   }, [chart.current, chartdom.current]);

   return (
      <div
         style={{ ...style, height: '100%' }}
         className={className}
         ref={chartdom}
      >
         {children}
      </div>
   );
};
export default ChartCom;
