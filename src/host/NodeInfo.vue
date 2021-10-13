<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

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
