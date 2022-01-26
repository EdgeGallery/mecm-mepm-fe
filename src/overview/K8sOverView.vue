<!--
  - Copyright 2022 Huawei Technologies Co., Ltd.
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
  <div class="content">
    <span class="info-title">
      {{ $t('overview.resourceDetails') }}
    </span>
    <el-popover
      placement="bottom"
      trigger="hover"
    >
      <span
        slot="reference"
        class="infoBtn"
        style="float: right;cursor: pointer;"
      >{{ $t('overview.moreDetails') }}<em class="el-icon-right" /></span>
      <div
        class="detail"
      >
        <p class="info-title">
          {{ $t('overview.moreResource') }}
        </p>
        <el-form>
          <el-form-item :label="$t('overview.network')">
            {{ item.detailInfo.resource.inter }}
          </el-form-item>
          <el-form-item :label="$t('overview.x86')">
            {{ item.detailInfo.resource.x86Resource }}
          </el-form-item>
          <el-form-item :label="$t('overview.GPU')">
            {{ item.detailInfo.resource.GPU }}
          </el-form-item>
          <el-form-item :label="$t('overview.AI')">
            {{ item.detailInfo.resource.AI }}
          </el-form-item>
        </el-form>
      </div>
    </el-popover>

    <div class="resources">
      <div class="k8s-content">
        <div class="chart-div">
          <div
            class="sumchart"
            id="cpuChart"
            ref="cpuChart"
          />
          <div class="desc">
            <span class="desc-font">CPU</span>
          </div>
        </div>
        <div class="chart-div">
          <div
            class="sumchart"
            id="memoryChart"
            ref="memoryChart"
          />
          <div class="desc">
            <span class="desc-font">MEM</span>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-top:4px;">
        <span
          class="occupiedBefore"
          style="margin-right:15px;"
        >{{ $t('overview.occupied') }}</span>
        <span class="UsableBefore">{{ $t('overview.usable') }}</span>
      </div>
      <p style="text-align:center;margin-top:4px;">
        {{ $t('overview.computeResources') }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    percentK8sValue: {
      required: true,
      type: Object
    },
    item: {
      required: true,
      type: Object
    }
  },
  methods: {
    initK8sChart () {
      const cpu = this.$echarts.init(this.$refs.cpuChart)
      const mem = this.$echarts.init(this.$refs.memoryChart)
      cpu.setOption(this.initCpuChart())
      mem.setOption(this.initMemChart())
    },
    initCpuChart () {
      let _used = this.percentK8sValue.cpudata.used
      let _unUsed = this.percentK8sValue.cpudata.total - this.percentK8sValue.cpudata.used
      return {
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
              position: 'center',
              normal: {
                show: true,
                position: 'inside',
                formatter: '{d}%',
                fontSize: 10
              }
            },
            data: [
              { value: _used },
              { value: _unUsed }
            ]
          }
        ]
      }
    },
    initMemChart () {
      let _used = this.percentK8sValue.memdata.used
      let _unUsed = this.percentK8sValue.memdata.total - this.percentK8sValue.memdata.used
      return {
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
              position: 'center',
              normal: {
                show: true,
                position: 'inside',
                formatter: '{d}%',
                fontSize: 10
              }
            },
            data: [
              { value: _used },
              { value: _unUsed }
            ]
          }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initK8sChart()
    })
  }
}
</script>
<style lang="less" scoped>
.content{
  .info-title{
    font-size: 18px;
    font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
    color: #5e40c8;
  }
  .info-title::before{
    content: '';
    display: inline-block;
    background-image: url('../assets/images/info-title.png');
    width: 12px;
    height: 12px;
  }
  .infoBtn{
    font-size: 14px;
    font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
    color: #5e40c8;
  }
  .resources{
    padding-left: 24px;
    p{
      color: #827792;
      font-size: 14px;
      font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
    }
    .k8s-content{
      display: flex;
      margin-top: 10px;
      .chart-div{
        width: 150px;
        height: 130px;
        text-align: center;
        margin: 0 auto;
        .sumchart{
          width: 100px;
          height: 100px;
        }
        .desc{
          width: 100px;
          height: 30px;
        }
      }
    }
    .occupiedBefore,.UsableBefore{
      color: #827792;
      font-size: 14px;
      font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
    }
    .occupiedBefore::before{
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #7152db;
      border-radius: 50%;
      margin-right: 5px;
    }
    .UsableBefore::before{
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #9686e1;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}

</style>
