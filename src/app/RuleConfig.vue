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
  <div class="ruleconfig padding_default">
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('nav.ruleConfiguration') }}
      <span class="line_bot1" />
    </div>
    <div class="ruleconfigcontent">
      <el-tabs
        v-model="activeName"
      >
        <el-tab-pane
          :label="$t('app.ruleConfig.dnsRule')"
          name="dns"
        >
          <Dnspannel
            :app-rule="appRule"
            @onChange="getAppRules"
          />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('app.ruleConfig.trafficRule')"
          name="traffic"
        >
          <trafficpannel
            :app-rule="appRule"
            @onChange="getAppRules"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Dnspannel from './Dns.vue'
import Trafficpannel from './Traffic.vue'
import { appRuleMgr } from '@/tools/request'
export default {
  components: {
    Dnspannel,
    Trafficpannel
  },
  data () {
    return {
      activeName: 'dns',
      appRule: {
        appTrafficRule: [],
        appDnsRule: [],
        appName: '',
        appSupportMp1: true
      }
    }
  },
  methods: {
    getAppRules () {
      console.log('get app rules from rule config')
      appRuleMgr.getConfigRules(sessionStorage.getItem('instanceId')).then(res => {
        if (res.data) {
          console.log('response for rule config ->', res.data)
          this.type = 2
          this.appRule = res.data
        }
      })
    }
  },
  mounted () {
    this.getAppRules()
  }
}

</script>
<style lang='less' scoped>
.ruleconfigcontent {
    height: 100%;
    background: #fff;
    padding: 30px 60px;
    border-radius: 20px;
    box-shadow: 0 6px 68px 0 rgba(94, 64, 200, 0.06);
}
</style>
