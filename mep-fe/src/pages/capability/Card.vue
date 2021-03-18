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
    <div slot="header" class="clearfix">
      <span class="cardName">{{name}}</span>
      <div class="shortDesc">{{desc}}</div>
    </div>
    <div class="chartName">{{$t('CAPABILITIES_PAGE.CARD_DESC')}}</div>
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
      show: false,
    }
  },
  methods: {
    mapChart () {
      let myChart = echarts.init(document.getElementById('charts-' + this.id))
      myChart.setOption(this.option, true)
    },
    getDay(n){  
      let today = new Date();  
      let targetday_milliseconds=today.getTime() + 1000*60*60*24*n;          
      today.setTime(targetday_milliseconds);
      let mon = today.getMonth() + 1;
      let day = today.getDate();
      return (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day)
    },
    setOptions () {
      let arr = []
      for(let i = -6; i <=0; i++) {
        arr.push(this.getDay(i));
      }
      this.option = {
        xAxis: {
          type: 'category',
          data: arr,
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.callTimes,
          type: 'line'
        }],
        tooltip: {
            trigger: 'axis'
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setOptions()
      this.mapChart()
    })
  }
}
</script>
<style lang='less' scoped>
.box-card{
  width: 100%;
  height: 100%;
  text-align: left;
}
.cardName{
  font-weight: 600;
}
.shortDesc{
  padding-top: 5px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: normal;
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
