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
  <div class="content">
    <div class="openstack-content">
      <div class="chart-div">
        <div
          class="chart"
          id="instance"
          ref="instance"
        />
        <div class="desc">
          <span class="desc-font">Instance</span>
        </div>
      </div>
      <div class="chart-div">
        <div
          class="chart"
          id="vcpu"
          ref="vcpu"
        />
        <div class="desc">
          <span class="desc-font">vCPU</span>
        </div>
      </div>
      <div class="chart-div">
        <div
          class="chart"
          id="ram"
          ref="ram"
        />
        <div class="desc">
          <span class="desc-font">Ram</span>
        </div>
      </div>
    </div>
    <div class="chart-type">
      <span
        class="occupiedBefore"
      >
        {{ $t('overview.occupied') }}
      </span>
      <span class="UsableBefore">
        {{ $t('overview.usable') }}
      </span>
    </div>
    <div class="apply-resource">
      <el-button
        round
        class="btn-apply"
        @click="applyResource"
      >
        {{ $t('resourceMgr.applyRes') }}
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    percentValue: {
      required: true,
      type: Object
    }
  },
  methods: {
    applyResource () {
      this.$router.push('/mepm/resource/manager')
    },
    initOpenStackChart () {
      const instance = this.$echarts.init(this.$refs.instance)
      const vcpu = this.$echarts.init(this.$refs.vcpu)
      const ram = this.$echarts.init(this.$refs.ram)
      instance.setOption(this.initInstanceChart())
      vcpu.setOption(this.initVCPUChart())
      ram.setOption(this.initRamChart())
    },
    initInstanceChart () {
      let _used = this.percentValue.instance.used
      let _unUsed = this.percentValue.instance.unUsed
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
    initVCPUChart () {
      let _used = this.percentValue.vCpu.used
      let _unUsed = this.percentValue.vCpu.unUsed
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
    initRamChart () {
      let _used = this.percentValue.ram.used
      let _unUsed = this.percentValue.ram.unUsed
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
      this.initOpenStackChart()
    })
  }
}
</script>
<style lang="less" scoped>
.content{
  .openstack-content{
    display: flex;
    .chart-div{
      width: 110px;
      height: 130px;
      text-align: center;
      margin: 0 auto;
      .chart{
        width: 100px;
        height: 100px;
      }
      .desc{
        width: 100px;
        height: 30px;
        .desc-font{
          color: #FFFFFF;
        }
      }
    }
  }
  .occupiedBefore,.UsableBefore{
    color: #FFFFFF;
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
  .chart-type{
    text-align:center;
    margin-top:4px;
  }
  .apply-resource{
    text-align: center;
    margin-top: 10px;
    .btn-apply{
      background-color: #6950CA;
      color: #FFFFFF;
    }
  }
}

</style>
