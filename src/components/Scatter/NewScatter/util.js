import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
echarts.registerTransform(ecStat.transform.clustering);//聚类
echarts.registerTransform(ecStat.transform.clustering);//直方图
const data = [
    {
        name: '海门',
        value: [36, 7, 20],
        divide: 20,
    },
    {
        name: '鄂尔多斯',
        value: [9, 16, 45],
        divide: 45,
    },
    {
        name: '招远',
        value: [40, 20, 52],
        divide: 52,
    },
    {
        name: '舟山',
        value: [10, 13, 520],
        divide: 520,
    },
    {
        name: '齐齐哈尔',
        value: [30, 17, 96],
        divide: 96,
    },
    {
        name: '盐城',
        value: [20, 27, 100],
        divide: 100,
    },
    {
        name: '赤峰',
        value: [24, 12, 255],
        divide: 255,

    },
    {
        name: '青岛111',
        value: [9, 23, 112],
        divide: 112,
    },
    {
        name: '青岛222',
        value: [9, 23, 172],
        divide: 172,
    },
    {
        name: '青岛333',
        value: [9, 23, 202],
        divide: 202,
    },

];

var colorList = [
    {
        color: '#37A2DA',
        scope: '(0,50]',
    },
    {
        color: '#e06343',
        scope: '(50,100]',
    },
    {
        color: '#37a354',
        scope: '(100,150]',
    },
    {
        color: '#b55dba',
        scope: '(150,∞]',
    },
];
var cluSterCount = colorList.length;
var dimensionClusterIndex = 2;

let pieces = [];
colorList.forEach((item, index) => {
    pieces.push({
        value: index,
        label: item.scope,
        color: item.color
    });

});
const getSelfColor = (data, colorList, legendList) => {




};
getSelfColor(data, colorList, pieces);



let option = {
    dataset: [
        {
            source: data.map(item => item.value)
        },
        {
            transform: {
                type: 'ecStat:clustering',
                // print: true,
                config: {
                    clusterCount: cluSterCount,//要生成的数据簇的个数。 注意，该数值必须大于 1。
                    outputType: 'single',//可选参数。指定输出格式
                    outputClusterIndexDimension: dimensionClusterIndex
                }
            }
        }
    ],

    tooltip: {
        position: 'top',
        formatter: (params) => {
            let str = '';
            str += `
                    <div>
                        <h5>
                            <span style="background:${params.color};width:10px;height:10px;display:inline-block;border-radius:50%"></span>
                            ${data[params.dataIndex].name}
                        </h5>
                        <div style="width:100%,padding:1px 2px ">
                            <div>
                                 <span>${option.xAxis.name}</span>:${params.data[0]}%
                            </div>
                            <div>
                                <span>${option.yAxis.name}</span>:${params.data[1]}%
                            </div>
                            <div>
                                <span>数量:</span> ${data[params.dataIndex].divide}
                            </div>
                        </div>
                </div>`;
            return str;
            // return params.seriesName;

        }
        // trigger: 'item',
        // trigger: 'axis',
        //   axisPointer: {
        //   type: 'cross'
        // }
    },
    visualMap: {
        type: 'piecewise',
        // top: 'middle',
        top: 0,
        min: 0,
        max: cluSterCount,
        left: -10,
        splitNumber: cluSterCount,
        dimension: dimensionClusterIndex,
        pieces: pieces
    },
    grid: {
        // left: 120
    },
    xAxis: {
        type: 'value',
        name: '联网率', //联网率 行名字展示
        // min: 0,
        //     max: 250,
        //     interval: 50,
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        axisLabel: {
            formatter: '{value} %'
        }
    },
    yAxis: {
        // min: 0,
        //     max: 250,
        //     interval: 50,
        type: 'value',
        name: 'MS', //MS 市场占有率 列名字展示
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        axisLabel: {
            formatter: '{value} %'
        }
    },
    series: {
        type: 'scatter',
        // type: 'effectScatter',//涟漪
        encode: { tooltip: [0, 1] },
        symbolSize: 15,
        itemStyle: {
            // borderColor: '#555'
        },
        datasetIndex: 1,
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            formatter: (params) => {
                return data[params.dataIndex].name;
            },
            position: 'right',
            show: true
        },
        itemStyle: {
            shadowBlur: 3,
            shadowColor: '#333'
        },
        // emphasis: {
        //     scale: true,
        // },
        zlevel: 1
    }
};
export { option };