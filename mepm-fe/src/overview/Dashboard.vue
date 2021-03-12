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
  <div class="overview container mt-60">
    <div>
      <el-row style="height: 100%; padding: 30px; width: 100%; :gutter=25;">
        <el-col
          :span="12"
          class="node-stats-card"
        >
          <el-card shadow="always">
            <h6 class="text-muted fs-16">
              Applications Overview
            </h6>
            <el-row>
              <el-col
                :span="12"
                style="display: flex;flex-direction: column; align-items: flex-start; margin-top: 40px"
              >
                <p style="padding: 3px">
                  <span>{{ $t('Package Uploaded : ') }}</span>
                  <span>{{ this.nodeNum }}</span>
                </p>
                <p style="padding: 3px">
                  <span>{{ $t('Distributed: ') }}</span>
                  <span>{{ this.nodeNum }}</span>
                </p>
                <p style="padding: 3px">
                  <span>{{ $t('Deployed : 0') }}</span>
                </p>
              </el-col>
              <el-col :span="12">
                <vue-bar-graph
                  :points="[3,5,2]"
                  :width="200"
                  :height="200"
                  :show-values="true"
                  :use-custom-labels="true"
                  :labels="['Uploaded', 'Distributed', 'Deployed']"
                />
              </el-col>
            </el-row>
          </el-card>

          <!--          <el-col-->
          <!--            :span="12"-->
          <!--            class="stats-card"-->
          <!--          >-->
          <!--            <el-card shadow="always">-->
          <!--              <el-row style="display: flex;align-items: center;">-->
          <!--                <el-col-->
          <!--                  :span="12"-->
          <!--                  style="display: flex; justify-content: center"-->
          <!--                >-->
          <!--                  <img-->
          <!--                    class="cp"-->
          <!--                    src="../assets/images/distribution.svg"-->
          <!--                    alt=""-->
          <!--                  >-->
          <!--                </el-col>-->
          <!--                <el-col :span="12">-->
          <!--                  <div style="padding-top: 14px; font-size: 50px; font-weight: bolder; text-align: center">-->
          <!--                    <span>10</span>-->
          <!--                  </div>-->
          <!--                  <div style="padding-top: 14px; font-size: large; text-align: center">-->
          <!--                    <span>Package Uploaded</span>-->
          <!--                  </div>-->
          <!--                </el-col>-->
          <!--              </el-row>-->
          <!--            </el-card>-->
          <!--          </el-col>-->
          <!--          <el-col-->
          <!--            :span="12"-->
          <!--            class="stats-card"-->
          <!--          >-->
          <!--            <el-card shadow="always">-->
          <!--              <el-row style="display: flex;align-items: center;">-->
          <!--                <el-col-->
          <!--                  :span="12"-->
          <!--                  style="display: flex; justify-content: center"-->
          <!--                >-->
          <!--                  <img-->
          <!--                    class="cp"-->
          <!--                    src="../assets/images/distribution.svg"-->
          <!--                    alt=""-->
          <!--                  >-->
          <!--                </el-col>-->
          <!--                <el-col :span="12">-->
          <!--                  <div style="padding-top: 14px; font-size: 50px; font-weight: bolder; text-align: center">-->
          <!--                    <span>10</span>-->
          <!--                  </div>-->
          <!--                  <div style="padding-top: 14px; font-size: large; text-align: center">-->
          <!--                    <span>Distributed</span>-->
          <!--                  </div>-->
          <!--                </el-col>-->
          <!--              </el-row>-->
          <!--            </el-card>-->
          <!--          </el-col>-->
          <!--          <el-col-->
          <!--            :span="12"-->
          <!--            class="stats-card"-->
          <!--          >-->
          <!--            <el-card shadow="always">-->
          <!--              <el-row style="display: flex;align-items: center;">-->
          <!--                <el-col-->
          <!--                  :span="12"-->
          <!--                  style="display: flex; justify-content: center"-->
          <!--                >-->
          <!--                  <img-->
          <!--                    class="cp"-->
          <!--                    src="../assets/images/distribution.svg"-->
          <!--                    alt=""-->
          <!--                  >-->
          <!--                </el-col>-->
          <!--                <el-col :span="12">-->
          <!--                  <div style="padding-top: 14px; font-size: 50px; font-weight: bolder; text-align: center">-->
          <!--                    <span>10</span>-->
          <!--                  </div>-->
          <!--                  <div style="padding-top: 14px; font-size: large; text-align: center">-->
          <!--                    <span>Deployed</span>-->
          <!--                  </div>-->
          <!--                </el-col>-->
          <!--              </el-row>-->
          <!--            </el-card>-->
          <!--          </el-col>-->
        </el-col>
        <el-col
          :span="12"
          class="node-stats-card"
        >
          <el-card shadow="always">
            <h6 class="text-muted fs-16">
              EdgeNode Overview
            </h6>
            <el-row style="display: flex;align-items: center; padding-top: 20px">
              <el-col
                :span="24"
                style="display: flex; justify-content: center"
              >
                <vc-donut
                  background="white"
                  foreground="grey"
                  :size="175"
                  unit="px"
                  :thickness="20"
                  has-legend
                  legend-placement="bottom"
                  :sections="sections"
                  :total="100"
                  :start-angle="0"
                  :auto-adjust-text-size="true"
                  @section-click="handleSectionClick"
                >
                  <h1>{{ this.nodeNum }}</h1>
                  <h1>Total Nodes</h1>
                </vc-donut>
              </el-col>
              <el-col :span="20">
                <p style="padding: 10px">
                  <span>{{ $t('Total Nodes : ') }}</span>
                  <span>{{ this.nodeNum }}</span>
                </p>
                <p style="padding: 20px">
                  <span>{{ $t('Online Nodes : ') }}</span>
                  <span>{{ this.nodeNum }}</span>
                </p>
                <p style="padding: 20px">
                  <span>{{ $t('Offline Nodes : 0') }}</span>
                </p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="height: 100%; padding: 30px; width: 100%; :gutter=12;">
        <h6
          class="text-muted fs-16"
          style="padding-left: 30px;"
        >
          EdgeNode Details
        </h6>
        <el-col
          :span="6"
          class="edge-nodes-card"
        >
          <el-card
            shadow="always"
            class="edge-card"
          >
            <el-row style="display: flex;">
              <el-col
                :span="12"
                style="display: flex; justify-content: left"
              >
                <div style="display: flex; flex-direction: column;">
                  <img
                    class="egde-image"
                    src="../assets/images/cube.svg"
                    alt=""
                  >
                  <span>edge1</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div style="font-size: large; text-align: right;display: flex; flex-direction: column; margin-top: 20px">
                  <span>1.1.1.1</span>
                  <span>Schenzen, China</span>
                  <div style="margin-top: 10px">
                    <el-button
                      class="edge-nodes-button"
                      id="nodeDetailsBtn"
                      type="text"
                      size="small"
                      @click="showDetails()"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('Node details') }}
                    </el-button>
                    <el-button
                      class="edge-nodes-button"
                      id="AppDetailsBtn"
                      type="text"
                      size="small"
                      @click="showAppDetails()"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('App details') }}
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col
          :span="6"
          class="edge-nodes-card"
        >
          <el-card
            shadow="always"
            class="edge-card"
          >
            <el-row style="display: flex;">
              <el-col
                :span="12"
                style="display: flex; justify-content: left"
              >
                <div style="display: flex; flex-direction: column;">
                  <img
                    class="egde-image"
                    src="../assets/images/cube.svg"
                    alt=""
                  >
                  <span>edge1</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div style="font-size: large; text-align: right;display: flex; flex-direction: column; margin-top: 20px">
                  <span>1.1.1.1</span>
                  <span>Schenzen, China</span>
                  <div style="margin-top: 10px">
                    <el-button
                      class="edge-nodes-button"
                      id="nodeDetailsBtn"
                      type="text"
                      size="small"
                      @click="showDetails()"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('Node details') }}
                    </el-button>
                    <el-button
                      class="edge-nodes-button"
                      id="AppDetailsBtn"
                      type="text"
                      size="small"
                      @click="showAppDetails()"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('App details') }}
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col
          :span="6"
          class="edge-nodes-card"
        >
          <el-card
            shadow="always"
            class="edge-card"
          >
            <el-row style="display: flex;">
              <el-col
                :span="12"
                style="display: flex; justify-content: left"
              >
                <div style="display: flex; flex-direction: column;">
                  <img
                    class="egde-image"
                    src="../assets/images/cube.svg"
                    alt=""
                  >
                  <span>edge1</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div style="font-size: large; text-align: right;display: flex; flex-direction: column; margin-top: 20px">
                  <span>1.1.1.1</span>
                  <span>Schenzen, China</span>
                  <div style="margin-top: 10px">
                    <el-button
                      class="edge-nodes-button"
                      id="nodeDetailsBtn"
                      type="text"
                      size="small"
                      @click="showDetails()"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('Node details') }}
                    </el-button>
                    <el-button
                      class="edge-nodes-button"
                      id="AppDetailsBtn"
                      type="text"
                      size="small"
                      @click="checkServiceInfo(this.edgeIp)"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('App details') }}
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col
          :span="6"
          class="edge-nodes-card"
        >
          <el-card
            shadow="always"
            class="edge-card"
          >
            <el-row style="display: flex;">
              <el-col
                :span="12"
                style="display: flex; justify-content: left"
              >
                <div style="display: flex; flex-direction: column;">
                  <img
                    class="egde-image"
                    src="../assets/images/cube.svg"
                    alt=""
                  >
                  <span>edge1</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div style="font-size: large; text-align: right;display: flex; flex-direction: column; margin-top: 20px">
                  <span>1.1.1.1</span>
                  <span>Schenzen, China</span>
                  <div style="margin-top: 10px">
                    <el-button
                      class="edge-nodes-button"
                      id="nodeDetailsBtn"
                      type="text"
                      size="small"
                      @click="showDetails()"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('Node details') }}
                    </el-button>
                    <el-button
                      class="edge-nodes-button"
                      id="AppDetailsBtn"
                      type="text"
                      size="small"
                      @click="checkServiceInfo(this.edgeIp)"
                      :loading="loginBtnLoading"
                    >
                      {{ $t('App details') }}
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { lcmController } from '../tools/request.js'
import VueBarGraph from 'vue-bar-graph'
export default {
  components: {
    VueBarGraph
  },
  mounted () {
    console.log(this.$route.params)
    this.detail = this.$route.params
    this.getTotalNodes()
  },
  data () {
    return {
      sections: [
        { label: 'Online Nodes', value: this.nodeNum, color: 'blue' },
        { label: 'Offline Nodes', value: 0, color: 'grey' }
      ],
      nodeNum: 0
    }
  },
  methods: {
    async showAppDetails () {
      window.open('http://' + this.edgeIp + ':30095')
    },
    handleSectionClick (section, event) {
      console.log(`${section.label} clicked.`)
    },
    getTotalNodes () {
      lcmController.getHostList(2).then(res => {
        if (res.data && res.data.length > 0) {
          this.nodeNum = res.data.length
        }
      }, error => {
        this.$message.error(this.$t('tip.getCommonListFailed'))
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.$message.error(this.$t('host record not found'))
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    showDetails (row) {
      console.log(row)
      this.$router.push({ name: 'edge-details', params: row })
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
    }
  }
}
</script>
<style lang='less'>
.mt-60 {
  margin-top: 60px !important;
}
.stats-card {
  padding: 20px;
  .el-card {
    height: 150px;
    border-radius: 25px;
  }
}
.edge-nodes-card {
  padding: 20px;
  .el-card {
    height: 200px;
    border-radius: 25px;
  }
}
.edge-card {
  background-image: linear-gradient(45deg, #2d67a5, #437cf7);
  color: white;
  //el-button {
  //  color: #00e7ff;
  //}
}
.node-stats-card {
  padding: 20px;
  .el-card {
    height: 300px;
    border-radius: 25px;
  }
}
.edge-nodes-button {
  width: 100px;
  color: #00e7ff;
}
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
    color:#F5F5F5;
    padding: 0 0 25px 0;
    margin-top: 15px;
    p{
      font-size: 16px;
      line-height: 32px;
      padding: 0 10px;
      span{
        display: inline-block;
        color:#c0c4cc;
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
  .image {
    width: 64px;
    height: 64px;
    display: block;
  }
  .cp{
    width: 60px;
  }
  .egde-image{
    width: 40px;
  }
.fs-16 {
  font-size: 16px !important;
}
.text-muted {
  color: #474c56;
}
</style>
