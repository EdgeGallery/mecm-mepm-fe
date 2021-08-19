<template>
  <div>
    <Breadcrumb
      class="breadcrumb"
      :data="[{name: $t('nav.edgeNodes'), path: '/mecm/node/list'}, {name: $t('nav.nodeDetails'), path: '/edge-details'}]"
    />
    <div class="nodeDetails-div">
      <NodeDetails
        :detail="curShownNodeInfo"
      />
    </div>
  </div>
</template>

<script>
import NodeDetails from '../overview/NodeDetails.vue'
import Breadcrumb from '../components/BreadCrumb'
export default {
  components: { NodeDetails, Breadcrumb },
  data () {
    return {
      curShownNodeInfo: {}
    }
  },
  mounted () {
    this.curShownNodeInfo = this.$route.params
  }
}
</script>
<style lang='less' scoped>
.nodeDetails-div{
  margin: 0 5%;
  height: 100%;
  background: #ffffff;
}
</style>
