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
  <div
    class="ruleconfig padding_default"
    style="min-height:648px;"
  >
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('nav.ruleConfiguration') }}
      <span class="line_bot1" />
      <el-button
        class="newproject_btn linearGradient2"
        id="syncBtn"
        @click="saveConfig"
      >
        <em class="new_icon" />
        {{ $t('app.ruleConfig.save') }}
      </el-button>
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
      },
      showConfirmBtn: false
    }
  },
  methods: {
    getAppRules () {
      appRuleMgr.getConfigRules(sessionStorage.getItem('instanceId')).then(res => {
        if (res.data) {
          console.log('response for rule config ->', res.data)
          this.type = 2
          this.appRule = res.data
        }
      })
    },
    saveConfig () {
      let temp = sessionStorage.getItem('appIndex')
      temp = temp + ',configed'
      sessionStorage.setItem('appIndex', temp)
      this.$router.push('/')
    }
  },
  mounted () {
    this.getAppRules()
    if (this.sessionStorage.getItem('appIndex')) {
      this.showConfirmBtn = true
    }
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
.newproject_btn{
    position: absolute;
    right: 0;
    bottom: 30px;
    height: 50px;
    color: #fff;
    font-size: 20px !important;
    border-radius: 25px;
    padding: 0 35px;
    .new_icon{
      display: inline-block;
      width: 19px;
      height: 19px;
      background: url('../assets/images/new_icon.png');
      margin-right: 3px;
      position: relative;
      top: 2px;
    }
  }
</style>
