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
  <div class="pb-30">
    <el-row
      type="flex"
      class="node-detail-area"
    >
      <el-col
        :span="8"
        class="nodeinfo-left shadow"
      >
        <div
          class="nodeinfo"
          v-if="alarmStatus === 'nodeinfo'"
        >
          <el-row>
            <el-col
              :span="24"
            >
              <div class="nodeInfo-area-title">
                {{ $t('overview.nodeInfo') }}
              </div>
              <el-row class="nodeInfo-area-value">
                <el-col :span="12">
                  <div class="nodeBasicInfo">
                    <p>
                      <span class="node-label-icon hostName-icon">{{ $t('overview.name') }}</span>
                      {{ nodeBasicInfo.mechostName }}
                    </p>
                    <p>
                      <span class="node-label-icon address-icon">{{ $t('overview.address') }}</span>
                      {{ nodeBasicInfo.city }}
                    </p>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="nodeBasicInfo">
                    <p>
                      <span class="node-label-icon ip-icon">{{ $t('overview.nodeIp') }}</span>
                      {{ nodeBasicInfo.mechostIp }}
                    </p>
                  </div>
                </el-col>
              </el-row>
              <hr>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="24"
            >
              <div class="nodeInfo-area-title">
                {{ $t('overview.k8sResc') }}
              </div>
              <div class="pt-0 pb-10">
                <Usage :kpi-info="kpiInfo" />
              </div>
              <hr>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="24"
            >
              <el-row>
                <div class="nodeInfo-area-title">
                  {{ $t('overview.mepInfo') }}
                </div>
              </el-row>
              <el-row class="pt-16">
                <el-table
                  :data="hwCapData"
                  stripe
                >
                  <el-table-column
                    prop="hwCapData"
                    :label="$t('overview.type')"
                    width="180"
                  />
                  <el-table-column
                    prop="hwModel"
                    :label="$t('overview.model')"
                    width="180"
                  />
                  <el-table-column
                    prop="hwVendor"
                    :label="$t('overview.vendor')"
                  />
                </el-table>
              </el-row>
              <el-row class="pt-16">
                <el-col :span="18">
                  <el-select
                    v-model="value"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in edgeAppList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col
                  :span="6"
                >
                  <el-button
                    type="primary"
                    @click="checkServiceInfo(nodeBasicInfo)"
                    class="float-right"
                  >
                    {{ $t('overview.manage') }}
                  </el-button>
                </el-col>
              </el-row>
              <el-row class="pt-16">
                <el-col :span="24">
                  <el-table
                    :data="mepCapData"
                    header-row-class-name="headerClassName"
                  >
                    <el-table-column
                      prop="capabilityName"
                      :label="$t('overview.softwareCapa')"
                    />
                    <el-table-column
                      prop="status"
                      :label="$t('app.packageList.status')"
                    />
                    <el-table-column
                      prop="version"
                      :label="$t('app.packageList.version')"
                    />
                  </el-table>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col
        class="shadow ml-30"
        :span="16"
      >
        <Map
          @node="clickNode"
          @area="clickMap"
          :detail="detail"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Usage from './Usage.vue'
import Map from './Map.vue'
import { lcmController } from '../tools/request.js'
export default {
  components: {
    Map,
    Usage
  },
  mounted () {
    this.detail = { // TODO
      mechostIp: '192.168.100.29',
      mechostName: 'vm',
      zipCode: '',
      city: '北京市',
      address: '1/1.1/116.35,39.979508',
      ffinity: 'X86',
      userName: '',
      applcmIp: '159.138.139.166',
      appRuleIp: '159.138.139.166',
      coordinates: [
        '116.35',
        '39.979508'
      ],
      hwcapabilities: [
        {
          hwType: 'GPU',
          hwVendor: '',
          hwModel: 'huawei'
        }
      ],
      vim: 'OpenStack',
      configUploadStatus: 'Uploaded',
      coord: [
        '116.35',
        '39.979508'
      ],
      edgeAppList: []
    }
  },
  data () {
    return {
      serviceInfo: {},
      alarmStatus: 'alarms',
      hwCapData: [],
      mepCapData: [],
      edgeApp: '',
      edgeAppList: [],
      manageDialogStatus: false,
      infoList: [],
      kpiInfo: {},
      loginBtnLoading: false,
      chartData: {},
      nodeBasicInfo: {
        mechostName: 'mechostName',
        city: 'city',
        mechostIp: '119.8.47.5'
      },
      nodeNum: 0,
      city: '',
      edgeIp: '',
      nodeList: [],
      detail: {}
    }
  },
  watch: {
    '$i18n.locale': function (val) {
      if (val === 'en') {
        this.city = 'All '
      } else {
        this.city = '全国'
      }
    }
  },
  methods: {
    resetData () {
      this.hwCapData = []
      this.edgeAppList = []
      this.edgeApp = ''
      this.edgeIp = ''
    },
    clickNode (val) {
      // this.nodeBasicInfo = val
      this.alarmStatus = 'nodeinfo'
      this.resetData()
      this.getNodeKpi(this.nodeBasicInfo.mechostIp)
      this.getHwCapa()
      this.getMepCapa(this.nodeBasicInfo.mechostIp)
      this.edgeIp = this.nodeBasicInfo.mechostIp
    },
    clickMap (msg, city) {
      this.alarmStatus = 'alarms'
      if (this.$i18n.locale === 'en') {
        this.city = city
      } else {
        if (city === '西藏') {
          this.city = 'Xizang'
        } else if (city === '重庆') {
          this.city = 'Chongqing'
        } else if (city === '全国') {
          this.city = 'All'
        }
      }
      this.nodeList = msg
      this.nodeList.forEach(item => {
        item.city = item.city.split('/')[0]
      })
      this.nodeNum = msg.length
      this.chartData = {
        'Total': this.nodeNum,
        'Online': this.nodeNum,
        'Offline': 0
      }
    },
    showDetail (row) {
      this.detail = row
    },
    appChange (val) {
      this.edgeAppList.forEach(item => {
        if (item.value === val) {
          this.edgeApp = val
        }
      })
    },
    getAppInfo (ip) {
      lcmController.getInstanceList().then(res => {
        this.infoList = res.data.response
        this.edgeAppList = []
        if (this.infoList && this.infoList.length > 0) {
          this.infoList.forEach(item => {
            if (item.mecHost === ip && item.operationalStatus === 'Instantiated') {
              let obj = {}
              obj.label = item.appName
              obj.value = item.appInstanceId
              obj.id = item.appPackageId
              obj.appId = item.appId
              this.edgeAppList.push(obj)
            }
          })
          this.edgeApp = this.edgeAppList[0].value
        }
      }).catch(() => {
      })
    },
    getHwCapa () {
      if (this.detail && this.detail.hwcapabilities && this.detail.hwcapabilities.length > 0) {
        this.hwCapData = this.detail.hwcapabilities // TODO
      }
    },
    getMepCapa (host) {
      lcmController.getMepCapabilities(host).then(res => {
        if (res && res.data) {
          if (res.data.status !== 500) {
            this.mepCapData = res.data
          }
        }
      })
    },
    getNodeKpi (ip) {
      lcmController.getNodeKpi(ip).then(res => {
        if (res.data) {
          this.kpiInfo = res.data
        }
      }).catch(() => {
        console.log('error response from server for query kpi')
        this.$message.error(this.$t('tip.getKpiFailed'))
      })
    },
    getServiceInfo (instanceId) {
      if (this.edgeAppList.length > 0) {
        this.loginBtnLoading = true
        lcmController.getServiceInfo(instanceId).then(res => {
          this.serviceInfo = JSON.parse(res.data.response)
          this.manageDialogStatus = true
          this.loginBtnLoading = false
        }).catch((error) => {
          if (error.response.status === 412) {
            this.$message.error(error.response.data.response)
          } else if (error.response.status === 404) {
            this.$message.warning(this.$t('tip.getStatusDelay'))
          } else {
            this.$message.error('Network Error')
          }
          this.loginBtnLoading = false
        })
      } else {
        this.loginBtnLoading = false
      }
    },
    checkServiceInfo () {
      this.$router.push({ name: 'mepinfo', params: { nodeIp: this.nodeBasicInfo.mechostIp } })
    }
  }
}
</script>
<style lang='less'>
.float-right{
  float: right;
}
.ml-30{
  margin-left: 30px;
}
.pb-30{
  padding-bottom: 30px;
}
.node-detail-area {
  width: calc(100% - 400px);
  margin: 40px 200px 0 200px;
  overflow: visible;
  background-size: cover;
  box-sizing: border-box;
  .nodeinfo-left{
    padding: 0px 29px 0px 29px;
    opacity: 0.8;
  }
  .nodeinfo{
    .nodeInfo-area-title::before{
      margin-top: 30px;
      content: "";
      display: inline-block;
      width: 2px;
      height: 14px;
      margin-right: 3px;
      background: #280B4E;
      position: relative;
      top: 1px;
    }
    .nodeInfo-area-title{
      font-size: 16px;
      font-family: FZLanTingHeiS-L-GB;
      font-weight: bold;
      color: #280B4E;
      line-height: 24px;
    }
    .nodeInfo-area-value{
      font-size: 14px;
      font-family: FZLanTingHeiS-L-GB;
      font-weight: 400;
      color: #280B4E;
      line-height: 24px;
      padding: 10px 0px 0px 11px;
      .nodeBasicInfo{
        p{
          padding-bottom: 10px;
        }
      }
      .node-label-icon::before{
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 8px;
        position: relative;
        top: 3px;
        background-size: auto auto;
        background-repeat: no-repeat;
      }
      .hostName-icon::before{
        background-image: url('../assets/images/label_icon_name.png');
      }
      .address-icon::before{
        background-image: url('../assets/images/label_icon_address.png');
      }
      .ip-icon::before{
        background-image: url('../assets/images/label_icon_ip.png');
      }
    }
    hr{
      height: 2px;
      background: #E9E9E9;
      border: none;
      padding: 0;
      margin: 5px 0px 0px 0px;
    }
    .pb-10{
      padding-bottom: 10px;
    }
    .pt-16{
      padding-top: 16px;
    }
  }
}
.shadow{
  box-shadow: 0px 1px 29px 0px rgba(175, 175, 175, 0.35);
}
</style>
