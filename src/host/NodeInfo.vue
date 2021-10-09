<template>
  <div class="node_info">
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('nav.nodeDetails') }}
      <span class="line_bot1" />
    </div>
    <div class="nodeDetails-div">
      <NodeDetails
        :detail="curShownNodeInfo"
      />
    </div>
  </div>
</template>

<script>
import NodeDetails from '../overview/NodeDetails.vue'
import { lcmController } from '../tools/request.js'
export default {
  components: { NodeDetails },
  data () {
    return {
      curShownNodeInfo: {}
    }
  },
  methods: {
    initNodoInfo (nodeIp) {
      lcmController.getHostList().then(response => {
        this.curShownNodeInfo = response.data.find(item => item.mechostIp === nodeIp)
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('tip.failedToGetList'))
      })
    }
  },
  mounted () {
    console.log('this.$route.params.nodeIp: ' + this.$route.params.nodeIp)
    if (this.$route.params.nodeInfo) {
      this.curShownNodeInfo = this.$route.params.nodeInfo
    } else {
      this.initNodoInfo(this.$route.params.nodeIp)
    }
  }
}
</script>
<style lang='less' scoped>
.node_info{
  padding-top: 60px;
  .nodeDetails-div{
    margin: 0 5%;
    height: 100%;
    background: #ffffff;
    border-radius: 8px;
  }
}
</style>
