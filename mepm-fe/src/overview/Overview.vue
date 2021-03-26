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
  <div class="mecm-overview">
    <el-row
      style="height: 100%; padding: 30px; width: 100%;"
    >
      <el-col
        :span="8"
        style="padding: 30px 0px;"
      >
        <div
          class="edge-souces"
          v-if="alarmStatus === 'nodeinfo'"
        >
          <el-row>
            <el-col
              :span="24"
              style="padding-bottom: 20px"
            >
              <el-card class="bg-theme">
                <h6 class="text-white fs-16">
                  Node information
                </h6>
                <el-row>
                  <el-col :span="12">
                    <div class="nodeBasicInfo2">
                      <p class="text-white">
                        <span>{{ $t('Name :') }}</span>{{ nodeBasicInfo.mechostName }}
                      </p>
                      <p class="text-white">
                        <span>{{ $t('Address :') }}</span>{{ nodeBasicInfo.city }}
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="nodeBasicInfo2">
                      <p class="text-white">
                        <span>{{ $t('Ip :') }}</span>{{ nodeBasicInfo.mechostIp }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="24"
              style="padding-bottom: 20px"
            >
              <el-card>
                <h6 class="text-muted fs-16">
                  K8s Resource
                </h6>
                <div class="pt-0">
                  <Usage :kpi-info="kpiInfo" />
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="24"
              style="padding-bottom: 20px"
            >
              <el-card>
                <el-row class="d-flex align-items-center justify-content-between">
                  <el-col :span="16">
                    <h6 class="text-muted fs-16">
                      MEP Capabilities
                    </h6>
                  </el-col>
                  <el-col
                    :span="8"
                    class="text-right"
                  >
                    <el-button
                      id="manageBtn"
                      type="primary"
                      @click="checkServiceInfo()"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('overview.manage') }}
                    </el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="nodeBasicInfo">
                      <p class="inner-circle-data">
                        <span>{{ $t('Type : ') }}</span>{{ hwCapData.hwType }}
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="nodeBasicInfo">
                      <p class="inner-circle-data">
                        <span>{{ $t('Model : ') }}</span>{{ hwCapData.hwModel }}
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="nodeBasicInfo">
                      <p class="inner-circle-data">
                        <span>{{ $t('vendor : ') }}</span>{{ hwCapData.hwVendor }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-table
                      :data="mepCapData"
                      class="capaTable"
                      style="width: 100%"
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
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col
        :span="16"
        style="height: 600px; padding: 30px"
      >
        <el-card style="height: 700px">
          <div
            slot="header"
            class="text-muted fs-16"
          >
            <span style="font-weight: bold;">Address</span>
          </div>
          <Map
            @node="clickNode"
            @area="clickMap"
            :detail="detail"
          />
        </el-card>
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
    console.log('setting details', this.$route.params)
    this.detail = this.$route.params
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
      nodeBasicInfo: null,
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
      this.nodeBasicInfo = val
      this.alarmStatus = 'nodeinfo'
      this.resetData()
      this.getNodeKpi(val.mechostIp)
      this.getHwCapa()
      this.getMepCapa(val.mechostIp)
      this.edgeIp = val.mechostIp
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
      this.chartData =
        {
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
        // this.$message.error(this.$t('tip.getAppInfoFailed'))
      })
    },
    getHwCapa () {
      console.log('details -> ', this.detail)
      if (this.detail && this.detail.hwcapabilities && this.detail.hwcapabilities.length > 0) {
        this.hwCapData = this.detail.hwcapabilities[0]
        console.log('hw Capabilities -> ', this.hwCapData)
      }
    },
    getMepCapa (host) {
      lcmController.getMepCapabilities(host).then(res => {
        console.log('mep capabilities res', res)
        if (res && res.data) {
          if (res.data.status !== 500) {
            this.mepCapData = JSON.parse(res.data)
          }
        }
      })
    },
    getNodeKpi (ip) {
      lcmController.getNodeKpi(ip).then(res => {
        console.log('kpi response from server', res)
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
          // this.$message.error(this.$t('tip.getServiceFailed'))
        })
      } else {
        this.loginBtnLoading = false
        // this.$message.warning(this.$t('tip.noPackage'))
      }
    },
    async checkServiceInfo () {
      window.open('http://' + this.edgeIp + ':30095')
    }
  }
}
</script>
<style lang='less'>
.mecm-overview {
  position: absolute;
  top: 65px;
  width: 100%;
  height:calc(100% - 65px);
  overflow: auto;
  background:#f5f5f5;
  background-size: cover;
  box-sizing: border-box;
}
.pt-0 {
  padding-top: 0 !important;
}
  label.overviewLabel{
    font-family: PingFangSC-Medium,sans-serif;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 24px;
    display: block;
    padding:8px 0;
    background: #494b4e;
    padding-left: 8px;
  }
  .fs-16 {
    font-size: 16px !important;
  }
  .text-muted {
    color: #474c56;
  }
  .mt20 {
    margin-top: 20px;
  }
  .ml20 {
    margin-left: 20px;
  }
  .el-table td, .el-table th{
    padding:5px 0;
  }
  .nodeBasicInfo{
    color:black;
    padding: 0 0 25px 0;
    margin-top: 15px;
    p{
      font-size: 13px;
      line-height: 32px;
      padding: 0 10px;
      span{
        display: inline-block;
        color:#474c56;
      }
    }
  }

.nodeBasicInfo2{
  color:white;
  margin-top: 15px;
  p{
    font-size: 13px;
    line-height: 24px;
    span{
      display: inline-block;
      color:white;
    }
  }
}
  .content-right {
      padding: 0!important;
      background: #2f2d2d;
      height: 100%;
    .my-title {
      color: white;
    }
    .edge-souces {
      padding: 15px 15px 0 15px;
      .el-table {
        border-color: #2395db !important;
        color: white;
        .el-table__row:nth-child(2n) {
          background: #102238 !important;
        }
        .el-table__row:nth-child(2n + 1) {
          background: #2D4868 !important;
        }
        td {
          padding: 3px 0;
          .cell {
            line-height: 30px !important;
          }
        }
        .headerClassName {
          th {
            background: #152437 !important;
            color: #F5F5F5;
          }
          .cell::before{
            content:'';
            display:inline-block;
            height:13px;
            width:2px;
            background: #f5f5f5;
            margin-right:4px;
            position: relative;
            top:3px;
          }
        }
      }
      .el-table::before,
      .el-table--border::after {
        height: 0 !important;
      }
      .el-table--border th {
        border-right: 1px solid #2395db !important;
      }
      .el-table tbody tr:hover > td {
        background-color: transparent;
      }
      .el-table td, .el-table th.is-leaf{
        border-bottom: none;
      }
      .el-select {
        .el-input {
          input {
            background-color: transparent;
            border: 1px solid #2395db;
            color: white;
          }
          .el-input__suffix {
            i {
              color: white;
            }
          }
        }
      }
      .el-button {
        background-color: #2c58a6;
        border-color: #0263ff;
      }
    }
  }
  .headerClassName{
    font-size: 13px;
  }
  .hwCapData{
    margin-top:15px;
  }
  .capaTable{
    max-height: 185px;
    overflow-y: auto;
  }
  .nodelistTable{
    max-height: 350px;
    overflow-y: auto;
  }
  .bg-theme {
    background-color: #409EFF;
  }
  .text-white {
    color: white;
  }
  .text-right {
    text-align: right;
  }
  .d-flex {
    display: flex;
  }
  .align-items-center {
    align-items: center;
  }
  .justify-content-between {
    justify-content: space-between;
  }
  .inner-circle-data {
    color: #474c56;
    font-size: 13px;
  }
</style>
