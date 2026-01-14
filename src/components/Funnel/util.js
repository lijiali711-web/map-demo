const option = {
    title: {
      text: '二手',
      right:"50%",
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    legend: {
      data: ['Visit', 'Inquiry', 'Order'],
      bottom:10,
    },
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '20%',
        maxSize: '50%',
        sort: 'descending',
        gap: 1,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b} : {c}%',
          color:'#fff'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: [
          { value: 100, name: 'Visit' },
          { value: 70, name: 'Inquiry' },
          { value: 50, name: 'Order' },
         
        ]
      }
    ]
  };

export { option };