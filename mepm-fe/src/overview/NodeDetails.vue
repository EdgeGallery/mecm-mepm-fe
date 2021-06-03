<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
              <el-row class="nodeInfo-area-value pt-10">
                <el-col :span="12">
                  <div class="nodeBasicInfo">
                    <p>
                      <span class="node-label-icon hostName-icon">{{ $t('overview.name') }}</span>
                      {{ detail.mechostName }}
                    </p>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="nodeBasicInfo">
                    <p>
                      <span class="node-label-icon ip-icon">{{ $t('overview.nodeIp') }}</span>
                      {{ detail.mechostIp }}
                    </p>
                  </div>
                </el-col>
              </el-row>
              <el-row class="nodeInfo-area-value">
                <el-col :span="24">
                  <div class="nodeBasicInfo">
                    <p>
                      <span class="node-label-icon address-icon">{{ $t('overview.address') }}</span>
                      {{ detail.city }}
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
              :span="16"
            >
              <div class="nodeInfo-area-title">
                {{ $t('overview.mepInfo') }}
              </div>
            </el-col>
            <el-col
              :span="8"
            >
              <el-button
                type="primary"
                @click="checkServiceInfo()"
                class="float-right mt-20"
              >
                {{ $t('overview.manage') }}
              </el-button>
            </el-col>
          </el-row>
          <el-row class="pt-16">
            <el-table
              :data="detail.hwcapabilities"
              stripe
            >
              <el-table-column
                prop="hwType"
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
        </div>
      </el-col>
      <el-col
        class="shadow ml-30"
        :span="16"
      >
        <div class="p10">
          <Map
            @node="clickNode"
            :detail="detail"
          />
        </div>
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
  beforeMount () {
    this.getNodeKpi(this.detail.mechostIp)
    this.getMepCapa(this.detail.mechostIp)
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      alarmStatus: 'alarms',
      mepCapData: [],
      kpiInfo: {}
    }
  },
  methods: {
    clickNode (val) {
      this.alarmStatus = 'nodeinfo'
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
    checkServiceInfo () {
      this.$router.push({ name: 'mepinfo', params: { nodeIp: this.detail.mechostIp } })
    }
  }
}
</script>
<style lang='less'>
.pt-10{
  padding-top: 10px
}
.p10{
  padding: 10px;
}
.float-right{
  float: right;
}
.ml-30{
  margin-left: 30px;
}
.pb-30{
  padding-bottom: 30px;
}
.mt-20{
  margin-top: 20px;
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
      margin-top: 30px;
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
      padding-left: 11px;
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
