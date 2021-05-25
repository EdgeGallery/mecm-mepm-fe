<!--
  - Copyright 2021 Huawei Technologies Co., Ltd.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
  <el-card
    class="box-card"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span class="cardName">{{ name }}</span>
      <div
        v-if="desc"
        class="shortDesc"
      >
        {{ desc }}
      </div>
    </div>
    <div
      class="chartsDiv"
      :class="'charts-'+id"
      :id="'charts-'+id"
    />
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  components: {},
  props: {
    name: {
      type: String,
      default: 'name'
    },
    desc: {
      type: String,
      default: 'desc'
    },
    id: {
      type: String,
      default: 'id'
    },
    callTimes: {
      type: Array,
      default: function () { return [0, 0, 0, 0, 0, 0, 0] }
    }
  },
  data () {
    return {
      option: null,
      show: false
    }
  },
  methods: {
    mapChart () {
      let myChart = echarts.init(document.getElementById('charts-' + this.id))
      myChart.setOption(this.option, true)
    },
    getDay (n) {
      let today = new Date()
      let milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * n
      today.setTime(milliseconds)
      let mon = today.getMonth() + 1
      let day = today.getDate()
      return (mon < 10 ? ('0' + mon) : mon) + '/' + (day < 10 ? ('0' + day) : day)
    },
    setOptions () {
      let arr = []
      for (let i = -6; i <= 0; i++) {
        arr.push({
          value: this.getDay(i),
          textStyle: {
            fontSize: 12,
            color: '#999999'
          }
        })
      }
      let dateLabel = this.$i18n.t('SERVICE_PAGE.DATA')
      let timesLabel = this.$i18n.t('SERVICE_PAGE.TIMES')
      this.option = {
        xAxis: {
          type: 'category',
          data: arr,
          axisLine: {
            lineStyle: {
              type: 'dotted',
              width: 2,
              color: '#B8B8B8'
            }
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            color: '#999999',
            fontSize: 12,
            fontWeight: 'normal',
            fontFamily: 'FZLanTingHeiS-L-GB'
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          splitNumber: 5,
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              width: 2,
              color: '#B8B8B8'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999999',
            fontSize: 12,
            fontWeight: 'normal',
            fontFamily: 'FZLanTingHeiS-L-GB'
          }
        },
        series: [{
          data: this.callTimes,
          type: 'line',
          lineStyle: {
            color: '#531B96',
            width: 2,
            type: 'solid'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#E0DDFC' // 0% 处的颜色
              }, {
                offset: 1, color: '#FFFFFF' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          showSymbol: false,
          emphasis: {
            itemStyle: {
              color: '#FFFFFF',
              borderColor: '#B99FEB',
              borderWidth: 4,
              shadowBlur: 7,
              shadowColor: '#E4DEFC'
            }
          }
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#531B96',
              type: 'solid',
              width: 1
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          textStyle: {
            color: '#FFFFFF',
            fontStyle: 'normal',
            fontWeight: 400,
            fontFamily: 'FZLanTingHeiS-L-GB',
            fontSize: 10,
            lineHeight: 18
          },
          formatter: function (params) {
            let res
            res = '<div>' + dateLabel + params[0].name + '</div>'
            res += '<div>' + timesLabel + params[0].value + '</div>'
            return res
          }
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setOptions()
      this.mapChart()
    })
  },
  watch: {
    '$i18n.locale': function () {
      this.setOptions()
      this.mapChart()
    }
  }
}
</script>
<style lang='less' scoped>
.el-card /deep/ .el-card__body {
  margin: -30px 0 0 0;
}
.box-card{
  width: 100%;
  height: 90%;
  text-align: left;
  border: none;
  box-shadow: 0px 1px 21px 0px rgba(201, 181, 228, 0.4);
  border-radius: 4px;
}
.cardName{
  height: 15px;
  font-size: 14px;
  font-family: FZLanTingHeiS-L-GB;
  font-weight: bold;
  color: #280B4E;
  line-height: 19px;
}
.cardName::before{
  content:'';
  display:inline-block;
  width:6px;
  height:6px;
  margin-right:8px;
  background: #280B4E;
  position: relative;
}
.shortDesc{
  padding-top: 8px;
  padding-left: 14px;
  height: 16px;
  font-size: 14px;
  font-family: FZLanTingHeiS-L-GB;
  font-weight: 400;
  color: #A8A5AD;
  line-height: 19px;
}
.chartsDiv{
  height:250px;
}
.chartName{
  text-align:center;
  font-size:13px;
  position: relative;
  top:20px;
  font-weight: normal;
}
</style>
