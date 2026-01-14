const data = [
    { name: '海门', value: [11, 9, 10], },
    { name: '鄂尔多斯', value: [15, 12, 20], },
    { name: '招远', value: [21, 16, 30], },
    { name: '舟山', value: [25, 19, 40], },
    { name: '齐齐哈尔', value: [32, 14, 50], },
    { name: '盐城', value: [35, 24, 60], },
    { name: '赤峰', value: [39, 35, 70], },
    { name: '青岛', value: [45, 19, 80], },
    { name: '金昌', value: [49, 39, 190], },
    { name: '泉州', value: [46, 25, 280], },
    { name: '莱西', value: [65, 43, 80], },
    { name: '日照', value: [55, 32, 80], },
    { name: '胶南', value: [50, 32, 67], },
    { name: '南通', value: [66, 88, 123], },
    { name: '拉萨', value: [70, 67, 93], },
    { name: '云浮', value: [75, 48, 166], },
    { name: '梅州', value: [83, 30, 200], },
    { name: '文登', value: [89, 93, 300], },
    { name: '上海', value: [63, 65, 180], },
    { name: '攀枝花', value: [52, 61, 70], },
    { name: '威海', value: [72, 59, 132], },
    { name: '承德', value: [80, 56, 32], },
];
let legendData = [
    { name: '(0,50]', flagVal: true },
    { name: '(50,100]', flagVal: true },
    { name: '(100,150]', flagVal: true },
    { name: '(150,200]', flagVal: true },
    { name: '(200,+∞]', flagVal: true },
];
let colorList = ['#036aec', '#9053f0', '#f17138', '#039f6a', '#e64555', '#03afe9', '#93c245', '#fcb450', '#ec70c2'];
let newData = data.map((item, index) => {

    let obj = {
        type: 'effectScatter',//scatter
        // type: 'scatter',
        coordinateSystem: 'cartesian2d',
        data: [item],
        symbolSize: function (val) {
            // return val[2] / 10;
            return 8;
        },
        encode: {
            value: 2
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            formatter: '{b}',
            position: 'right',
            fontSize: 12,
            show: true,
            // show: false
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: '#333'
        },

        emphasis: {
            // scale: true, //可以设置放大倍数 boolean number
            scale: 1.5, //可以设置放大倍数
            label: {
                show: true,
                fontSize: 20,
            },
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
            },
        },
        // markArea: {
        //     data: markAreaData
        // },
        markArea: {//标记颜色值
            itemStyle: {
                // normal: {      //  看这里，加了这个属性
                //     color: 'red'
                // }
                // color: '#e4f4fe',
                // color: { //颜色渐变
                //     type: 'linear',
                //     x: 0,
                //     y: 0,
                //     x2: 1,
                //     y2: 1,
                //     colorStops: [{
                //         offset: 0, color: '#fff' // 0% 处的颜色
                //     }, {
                //         offset: 1, color: '#e4f4fe' // 100% 处的颜色
                //     }],
                //     global: false // 缺省为 false
                // }
            },
            silent: false,//不响应和不触发鼠标事件。

            data:
                [
                    [ //第一个对象是区域起点   第二个对象是区域终点
                        {
                            name: '高潜商圈',
                            // color: 'yellowgreen',
                            coord: [0, 0],
                            itemStyle: {
                                color: 'red',
                                fontSize: 15,
                                fontWeight: 600,
                            },
                        },
                        {
                            coord: [100, 20]
                        }
                    ],
                    [
                        {
                            name: '温饱商圈',
                            coord: [0, 20],
                            itemStyle: {
                                color: 'yellowgreen',
                            },
                        },
                        {
                            coord: [100, 40]
                        }
                    ],
                    [
                        {
                            name: '小康商圈',
                            coord: [0, 40],
                            itemStyle: {
                                color: 'yellow',
                            },
                        },
                        {
                            coord: [100, 50]
                        }
                    ],
                    [
                        {
                            name: '幸福',
                            coord: [0, 50],
                            itemStyle: {
                                color: 'pink',
                            },
                        },
                        {
                            coord: [100, 100]
                        }
                    ],
                    [
                        {
                            name: '幸福战团',
                            coord: [60, 51],
                            itemStyle: {
                                color: 'skyblue',
                            }
                        },
                        {
                            coord: [100, 100]
                        }
                    ],


                ]
        },
        // dimensions: ['date', 'open', 'close', 'highest', 'lowest'],
        zlevel: 1,
    };
    legendData.forEach((it, i) => {
        let matches = it.name.match(/\d+/g);
        let min = parseInt(matches[0]);
        let max = it.name == '(200,+∞]' ? Infinity : parseInt(matches[1]);
        if (item.value[2] > min && item.value[2] <= max) {
            obj.name = it.name;
            obj.color = colorList[i];
        }
    });
    return obj;
});
legendData = legendData.map(it => { //todo 目的是计算该分类下的数量
    let num = newData.filter(itm => itm.name == it.name).length;
    return {
        ...it,
        num
    };
});
let arrIndex = [];
newData.forEach((it, i) => arrIndex.push(i));
let option = {
    backgroundColor: 'transparent',
    title: {
        text: '商圈-联网&市占的象限分布',
        subtext: '      ——幸福战团定义：市占率>51%,联网率>60%',
        itemGap: 10,             // 主副标题纵向间隔，单位px，默认为10，
        textStyle: {
            fontSize: 30,
            fontWeight: 'bolder',
            color: '#333'                             // 主标题文字颜色
        },
        subtextStyle: {
            color: '#aaa',
            fontSize: 12,// 副标题文字颜色
            fontWeight: 'bolder',
        },
        // left: '10%',
        left: 'center',
        top: 0,
    },
    legend: {
        type: 'plain',
        orient: 'horizontal',//vertical
        data: legendData,
        top: 5,
        right: 10,
        show: false,
        // show: true
    },
    color: colorList,
    tooltip: {
        formatter: (params) => {
            console.log(params, 'params');
            let str = '';
            if (params.componentType == "markArea") {
                str += `
                <div>
                    <h5>
                        <span style="background:${params.color};width:10px;height:10px;display:inline-block;border-radius:50%"></span>
                        ${params.data.name}
                    </h5>
                    <div style="width:100%,padding:1px 2px ">
                        <div>
                            <span>${option.xAxis.name}</span>
                        </div>
                        <div>
                            <span>${option.yAxis.name}</span>
                        </div>

                    </div>

            </div>`;

            } else {
                str += `
                <div>
                    <h5>
                        <span style="background:${params.color};width:10px;height:10px;display:inline-block;border-radius:50%"></span>
                        ${params.data.name}
                    </h5>
                    <div style="width:100%,padding:1px 2px ">
                    <div>
                        <span>${option.xAxis.name}</span>:${params.data.value[0]}%
                    </div>
                    <div>
                        <span>${option.yAxis.name}</span>:${params.data.value[1]}%
                    </div>
                    <div>
                        <span>数量:</span> ${params.data.value[2]}套
                    </div>;
            </div>`;
            }
            return str;

        }
        // trigger: 'item',
        // trigger: 'axis',
        //   axisPointer: {
        //   type: 'cross'
        // }
    },

    xAxis: {
        type: 'value',
        name: '联网率', //联网率 行名字展示
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        nameTextStyle: {
            fontSize: 15,
            fontWeight: 600,
            color: '#000',
        },
        axisLabel: {
            formatter: '{value} %'
        },

        splitArea: {
            show: true,
            interval: 0,

            areaStyle: {
                // color: ['pink', 'skyblue',]
                // color: ['pink', 'skyblue',]
                // shadowColor: 'green',
                // shadowBlur: 10

            }
        }
    },
    // visualMap: {
    //     type: 'piecewise', //分段型 comntinue是连续型
    //     // type: 'continuous',
    //     pieces: [
    //         { min: 200, color: 'blue' }, // 不指定 max，表示 max 为无限大（Infinity）。
    //         { min: 150, max: 200, color: 'red' },
    //         { min: 100, max: 150, color: 'green' },
    //         { min: 20, max: 60, color: 'pink' },
    //         { min: 0, max: 50, label: '0 到 50（自定义label）', color: 'yellow' },
    //         { max: 5 }     // 不指定 min，表示 min 为无限大（-Infinity）。
    //     ],
    //     // dimension: 1,//有值就是series.data中value的索引，如果不设置默认为数组的最后一个值
    //     // target: {
    //     inRange: {
    //         color: ['red', 'green'],
    //         symbolSize: [50, 200]
    //     },
    //     // },
    //     // 表示 visualMap-piecewise 本身的视觉样式。
    //     controller: {
    //         inRange: {
    //             symbolSize: [30, 100]
    //         }
    //     },
    //     // formatter: function (value) {
    //     //     console.log(value);//标签的格式化工具。
    //     //     return 'aaaa' + value;                   // 范围标签显示内容。
    //     // }
    // },
    visualMap: {//根据值的大小，显示不同点的大小
        show: false,
        dimension: 2,
        min: 20,
        max: 300,
        seriesIndex: newData.map((it, i) => i),//seriesIndex的下标
        inRange: {
            symbolSize: [10, 30],//点的显示大小量
            // color: ['red', 'green'], //显示的颜色值
        }
    },


    yAxis: {
        type: 'value',
        name: 'MS', //MS 市场占有率 列名字展示
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        nameTextStyle: {
            fontSize: 15,
            fontWeight: 600,
            color: '#000',
        },
        axisLabel: {
            formatter: '{value} %'
        },
        splitArea: {
            show: true,
            areaStyle: {
                // interval: 0,
                // color: 'skyblue',
                // color: ['skyblue', 'pink'],
                // shadowColor: 'red',
                // shadowBlur: 10
            }
        }
    },
    series: newData
};
export { option, newData, legendData };