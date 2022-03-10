<!--
  -  Copyright 2022 Huawei Technologies Co., Ltd.
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
        {{ $t('app.ruleConfig.returnPrePage') }}
      </el-button>
    </div>
    <div
      class="ruleconfigcontent"
      v-if="isShowRuleDlg"
    >
      <el-tabs
        v-model="activeName"
      >
        <el-tab-pane
          :label="$t('app.ruleConfig.dnsRule')"
          name="dns"
        >
          <Dnspannel
            :app-rule="appRule"
          />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('app.ruleConfig.trafficRule')"
          name="traffic"
        >
          <Trafficpannel
            :app-rule="appRule"
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
      isShowRuleDlg: false,
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
      appRuleMgr.getConfigRules(sessionStorage.getItem('instanceId')).then(res => {
        if (res.data) {
          console.log('response for rule config ->', res.data)
          this.appRule = res.data
          this.isShowRuleDlg = true
        }
      }).catch(() => {
        this.isShowRuleDlg = true
      })
    },
    saveConfig () {
      let temp = sessionStorage.getItem('appIndex')
      temp = temp + ',configed'
      sessionStorage.setItem('appIndex', temp)
      this.$router.push('/mepm/ains/list')
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
  background: rgba(46,20,124,.7);
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
    background: url('../../assets/images/new_icon.png');
    margin-right: 3px;
    position: relative;
    top: 2px;
  }
}
/deep/ .el-tabs__item {
  color: #7a6e8a !important;
}
/deep/ .el-tabs__item.is-active {
  color: #FFFFFF !important;
}
</style>
