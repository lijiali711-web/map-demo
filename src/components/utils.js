const option = {
    grid: [
       {
          left: '1%',
          top: '12%',
          bottom: '5%',
          width: '95%',
          height: '85%',
          containLabel: true,
       },
    ],
    // toolbox: {
    //    show: true,
    //    feature: {
    //       mark: { show: true },
    //       dataView: { show: true, readOnly: false }, // 数据视图工具
    //       // 其他工具...
    //    },
    // },
    tooltip: {
       trigger: 'item',
       backgroundColor: 'rgba(0,0,0,.4)', //设置背景图片 rgba格式
       borderColor: 'rgba(0,0,0,0)',
       color: '#ffff',
       textStyle: {
          color: '#fff',
       },
    },
    xAxis: {
       type: 'category',
       data: [],
       axisLabel: {
          interval: 0, // 使x轴文字显示全
          color: 'rgba(255,255,255,0.8)',
       },
       axisTick: {
          show: false,
       },
       splitLine: {
          show: false,
          lineStyle: {
             // 分隔线
             type: 'dashed', // 线的类型
             color: '#1D374E', // 分隔线颜色
          },
       },
    },
    yAxis: {
       type: 'value',
       axisLabel: {
          color: '#97A4B8',
          show: true,
       },
       axisTick: {
          show: false,
       },
       splitLine: {
          show: false,
       },
    },
    series: [
       {
          smooth: true,
          data: [],
          type: 'line',
          // symbol: 'image://' + duchamp, // 设定为实心点
          symbol: 'circle',
          // symbolColor:'#fff',
          symbolSize: 7, // 原点的大小
          itemStyle: {
             color: function (params) {
                if (params && params.name == '11月') {
                   return '#00e3fd';
                } else {
                   return 'rgb(48, 149, 254)';
                }
             },
             // color: 'rgb(48, 149, 254)', // 改变折线点的颜色
             label: {
                show: true, // 在折线拐点上显示数据
                formatter: function (params) {
                   if (params.name === '11月') {
                      return '{a|' + params.data + '}';
                   } else {
                      return '{b|' + params.data + '}';
                   }
                },
                rich: {
                   a: {
                      color: '#00e3fd',
                   },
                   b: {
                      color: 'rgb(48, 149, 254)',
                   },
                },
             },
          },
          // 修改
          areaStyle: {
             color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                   {
                      offset: 0.3,
                      // color: '#01133d', // 0% 处的颜色
                      color: 'rgba(41, 179, 255,.8) ',
                   },
                   {
                      offset: 1,
                      // color: '#002579', // 100% 处的颜色
                      color: 'rgba(41, 179, 255,0) ',
                      // color: '#0067b2',
                   },
                ],
                global: false, // 缺省为 false
             },
             shadowColor: '#C2DEF9',
             origin: 'start',
          },
          lineStyle: {
             width: 3, // 设置线宽
             color: '#27B3FF',
          },
       },
    ],
 };
 
 export { option };