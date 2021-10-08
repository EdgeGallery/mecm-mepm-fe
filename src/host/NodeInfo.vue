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
export default {
  components: { NodeDetails },
  data () {
    return {
      curShownNodeInfo: {}
    }
  },
  mounted () {
    this.curShownNodeInfo = this.$route.params.nodeInfo
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
