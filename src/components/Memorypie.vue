<template>
  <div class="piechart">
    <div id="memory" />
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  mounted () {
    var chartDom = document.getElementById('memory')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      series: [
        {
          color: ['#7152db', '#9385d6'],
          type: 'pie',
          radius: '80%',
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            // show: false,
            position: 'center',
            normal: {
              show: true,
              position: 'inside',
              formatter: '{d}%',
              fontSize: 10
            }
          },
          data: [
            { value: 50 },
            { value: 50 }
          ]
        }
      ]
    }
    option && myChart.setOption(option)
  }
}
</script>

<style scoped>
#memory {
    width: 80px;
    height: 75px;
}
</style>
