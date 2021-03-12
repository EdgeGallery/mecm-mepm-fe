<template>
  <div>
    <el-row :gutter="10">
      <el-col
        :span="8"
        class="mt20 progerss-item"
      >
        <radial-progress-bar
          :diameter="120"
          :completed-steps="cpuUsage"
          :total-steps="totalSteps"
          start-color="#449bf8"
          stop-color="#449bf8"
        >
          <p class="inner-circle-data">
            {{ cpuUsage }}
          </p>
        </radial-progress-bar>
        <p class="inner-circle-data vertical-center">
          CPU
        </p>
      </el-col>
      <el-col
        :span="8"
        class="mt20 progerss-item"
      >
        <radial-progress-bar
          :diameter="120"
          :completed-steps="memUsage"
          :total-steps="totalSteps"
          start-color="#449bf8"
          stop-color="#449bf8"
        >
          <p class="inner-circle-data">
            {{ memUsage }}
          </p>
        </radial-progress-bar>
        <p class="inner-circle-data vertical-center">
          MEM
        </p>
      </el-col>
      <el-col
        :span="8"
        class="mt20 progerss-item"
      >
        <radial-progress-bar
          :diameter="120"
          :completed-steps="diskUsage"
          :total-steps="totalSteps"
          start-color="#449bf8"
          stop-color="#449bf8"
        >
          <p class="inner-circle-data">
            {{ diskUsage }}
          </p>
        </radial-progress-bar>
        <p class="inner-circle-data vertical-center">
          DISK
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
export default {
  props: {
    kpiInfo: {
      required: true,
      type: Object
    }
  },
  components: {
    RadialProgressBar
  },
  data () {
    this.chartSettings = {
      seriesMap: {
        'Usage': {
          splitNumber: 4,
          radius: '90%',
          min: 0,
          max: 100,
          pointer: {
            show: true,
            width: 3,
            length: '60%',
            color: '#0067d1'
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 8,
              color: [
                [0.3, '#20ea71'],
                [0.7, '#23a7f5'],
                [1, '#f919d3']
              ],
              borderColor: '#000',
              borderWidth: '2'
            }
          },
          splitLine: {
            show: false,
            length: '28%',
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          axisLabel: {
            show: true,
            distance: 5,
            color: '#fff',
            fontSize: 10
          },
          detail: {
            show: true,
            fontSize: 15,
            offsetCenter: [0, '70%'],
            formatter: '{value}%'
          }
        }
      }
    }
    return {
      cpuUsage: '70',
      memUsage: '30',
      diskUsage: '60',
      chartDataCpu: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      },
      chartDataMem: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      },
      chartDataDisk: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      },
      completedSteps: 0,
      totalSteps: 100
    }
  },
  watch: {
    kpiInfo: function () {
      this.setData()
    }
  },
  methods: {
    setData () {
      this.chartDataCpu.rows[0].value = parseFloat((this.kpiInfo.cpuusage.used * 100).toFixed(2))
      this.chartDataMem.rows[0].value = parseFloat((this.kpiInfo.memusage.used * 100).toFixed(2))
      this.chartDataDisk.rows[0].value = isNaN(parseFloat((this.kpiInfo.diskusage.used * 100).toFixed(2))) ? 0 : parseFloat((this.kpiInfo.diskusage.used * 100).toFixed(2))
    }
  },
  mounted () {
    if (JSON.stringify(this.kpiInfo) !== '{}') {
      this.setData()
    }
  }
}

</script>
<style lang='less' scoped>
  .progerss-item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    color: white;
    .el-progress__text {
      color: white;
    }
    p{
      position: relative;
      top:-10px;
      color:#ddd;
      font-size:18px;
    }
    .inner-circle-data {
      color: #474c56;
    }
    .vertical-center {
      position: absolute;
      top: 50%;
    }
  }
</style>
