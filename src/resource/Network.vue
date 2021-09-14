<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="network">
    <BreadCrumb
      class="breadcrumb"
      :data="[{name: '5G网络配置', path: 'mepm/resource/network'}]"
    />
    <div class="contentList">
      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          :label="$t('app.ruleConfig.dnsRule')"
          name="dns"
        >
          <DnsPannel :showtype="type" />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('app.ruleConfig.trafficRule')"
          name="traffic"
        >
          <TrafficPannel :showtype="type" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import DnsPannel from './Dns.vue'
import TrafficPannel from './Traffic.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
export default {
  components: {
    DnsPannel,
    TrafficPannel,
    BreadCrumb
  },
  data () {
    return {
      activeName: 'dns',
      type: 0
    }
  },
  methods: {
    addNew () {
      if (this.activeName === 'dns') {
        this.type = 1
      } else if (this.activeName === 'traffic') {
        this.type = 2
      }
    }
  }
}

</script>
<style lang='less' scoped>
  .contentList{
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
  }
</style>
