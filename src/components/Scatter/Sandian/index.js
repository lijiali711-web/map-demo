import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import ChartCom from '../../chart';
import { option, newData, legendData } from './util';
import './index.css';

/**
 * @desc 漏斗图
 */

const Charts = props => {
    const { seriesData } = props;
    const Chart = useRef(); // echart对象
    const ChartDOM = useRef(); // 放置在哪
    const legendRef = useRef(null); // 使用ref来引用图例容器
    let legendData = [
        { name: '(0,50]', flagVal: true },
        { name: '(50,100]', flagVal: true },
        { name: '(100,150]', flagVal: true },
        { name: '(150,200]', flagVal: true },
        { name: '(200,+∞]', flagVal: true },
    ];

    useEffect(() => {
        initCharts();
    }, []);


    useEffect(() => {
        if (!Chart.current) return;
        Chart.current.setOption(option);
    }, []);
    legendData = legendData.map(it => {
        let num = newData.filter(itm => itm.name == it.name).length;

        return {
            ...it,
            num
        };
    });



    useEffect(() => {
        // newData.forEach(itm => {
        //     legendData.forEach((it, i) => {
        //         let matches = it.name.match(/\d+/g);
        //         let min = parseInt(matches[0]);
        //         let max = it.name == '(200,+∞]' ? Infinity : parseInt(matches[1]);
        //         let num = 1;
        //         if (itm.value[2] > min && itm.value[2] <= max) {
        //             it.name = it;
        //             it.flagVal = true;
        //             it.num = num + 1;
        //         }
        //     });

        // });
        console.log(legendData, 'legendDatalegendData');
        const customLegend = document.createElement('div');
        customLegend.className = 'custom-legend'; // 应用自定义样式
        let currentIndex = -1;
        legendData && legendData.forEach((item, itemIndex, arr) => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
            <span class='color-legend'  style='background-color:${Chart.current.getOption().color[itemIndex % 9]
                };'></span>
            <span class='legend-name'>${item.name}</span>
            <span class='legend-name'>${item.num}个</span>

            `;
            // todo 点击事件
            legendItem.addEventListener('click', (e) => {
                e.stopPropagation();
                item.flagVal = !item.flagVal;
                let flag = item.flagVal;
                // 切换系列显示状态
                Chart.current.dispatchAction(
                    {
                        type: 'legendToggleSelect',
                        name: item.name
                    }
                );
                legendItem.innerHTML = `
            <span class='color-legend'  style='background-color:${item.flagVal ? ['#036aec', '#9053f0', '#f17138', '#039f6a', '#e64555', '#03afe9', '#93c245', '#fcb450', '#ec70c2'][itemIndex % 9] : '#ccc'
                    };'></span>
            <span class='legend-name'>${item.name}</span>
            <span class='legend-name'>${item.num}个</span>
            `;
            });
            // todo mousemove事件
            legendItem.addEventListener('mouseover', () => {
                //todo  取消之前高亮的图形
                Chart.current.dispatchAction({
                    type: 'highlight',
                    seriesName: item.name,
                });

            });
            legendItem.addEventListener('mouseout', () => {
                currentIndex = itemIndex % (arr.length);
                Chart.current.dispatchAction({
                    type: 'downplay',
                    seriesName: item.name,
                });

            });
            customLegend.appendChild(legendItem);
        });
        // 将自定义图例添加到DOM中
        // todo 是否能找到 找到进行替换，没找到就添加
        const preLegendDom = legendRef.current.querySelector('.custom-legend');
        if (legendData.length == 0) legendRef.current.removeChild(preLegendDom);
        if (preLegendDom) {
            legendRef.current.replaceChild(customLegend, preLegendDom);
        } else {
            legendRef.current.appendChild(customLegend);
        }
    }, [legendData, newData]);



    const initCharts = () => {
        Chart.current = echarts.init(ChartDOM.current);
        option.color = ['#036aec', '#9053f0', '#f17138', '#039f6a', '#e64555', '#03afe9', '#93c245', '#fcb450', '#ec70c2'];
        Chart.current.setOption(option);
    };

    return (
        <div className="linet-com-container">
            <ChartCom chartdom={ChartDOM} chart={Chart} />
            <div ref={legendRef}></div>
        </div>
    );
};

export default Charts;