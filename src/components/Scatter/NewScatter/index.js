import React, { useEffect, useState, useRef, } from 'react';
import * as echarts from 'echarts';
import ChartCom from '../../chart';
import { option } from './util';



const Scatter = () => {
    const Chart = useRef(); // echart对象
    const ChartDOM = useRef(); // 放置在哪
    useEffect(() => {
        initCharts();
    }, []);
    const initCharts = () => {
        Chart.current = echarts.init(ChartDOM.current);
        // echarts.registerTransform(ecStat.transform.clustering);
        Chart.current.setOption(option);
    };
    return (
        <div className="linet-com-container">
            <ChartCom chartdom={ChartDOM} chart={Chart} />
        </div>
    );
};









export default Scatter

