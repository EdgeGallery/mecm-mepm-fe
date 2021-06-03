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
    return {
      cpuUsage: 0,
      memUsage: 0,
      diskUsage: 0,
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
      this.cpuUsage = parseFloat((this.kpiInfo.cpuusage.used * 100).toFixed(2))
      this.memUsage = parseFloat((this.kpiInfo.memusage.used * 100).toFixed(2))
      this.diskUsage = isNaN(parseFloat((this.kpiInfo.diskusage.used * 100).toFixed(2))) ? 0 : parseFloat((this.kpiInfo.diskusage.used * 100).toFixed(2))
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
      font-size: 15px;
    }
    .vertical-center {
      position: absolute;
      top: 50%;
    }
  }
</style>
