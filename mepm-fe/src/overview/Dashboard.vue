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
      <el-row style=" height: 100%;padding: 0px 40px;width: 100%;margin-top: 80px;">
        <h1 class="section-header">
          {{ $t('dashboard.applicationStatistics') }}
        </h1>
        <el-col
          :span="24"
          class="node-stats-card"
        >
          <!-- Application overview-->
          <el-col
            :span="6"
            class="stats-card"
          >
            <el-card shadow="always">
              <el-row style="display: flex;align-items: center;">
                <el-col
                  :span="6"
                  style="display: flex; justify-content: center"
                >
                  <img
                    class="icon-available"
                    src="../assets/images/package.svg"
                    alt=""
                  >
                </el-col>
                <el-col :span="18">
                  <div style="font-size: 50px; font-weight: bolder; text-align: center">
                    <span>{{ packageUploadedCount }}</span>
                  </div>
                  <div style="font-size: small; text-align: center">
                    <span>{{ $t('dashboard.available') }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col
            :span="6"
            class="stats-card"
          >
            <el-card shadow="always">
              <el-row style="display: flex;align-items: center;">
                <el-col
                  :span="6"
                  style="display: flex; justify-content: center"
                >
                  <img
                    class="icon-distribution"
                    src="../assets/images/distribution.svg"
                    alt=""
                  >
                </el-col>
                <el-col :span="18">
                  <div style=" font-size: 50px; font-weight: bolder; text-align: center">
                    <span>{{ distributedCount }}</span>
                  </div>
                  <div style="font-size: small; text-align: center">
                    <span>{{ $t('dashboard.distributed') }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col
            :span="6"
            class="stats-card"
          >
            <el-card shadow="always">
              <el-row style="display: flex;align-items: center;">
                <el-col
                  :span="6"
                  style="display: flex; justify-content: center"
                >
                  <img
                    class="icon-deployed"
                    src="../assets/images/deployed.svg"
                    alt=""
                  >
                </el-col>
                <el-col :span="18">
                  <div style=" font-size: 50px; font-weight: bolder; text-align: center">
                    <span>{{ deployedCount }}</span>
                  </div>
                  <div style=" font-size: small; text-align: center">
                    <span>{{ $t('dashboard.deployed') }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-col>
      </el-row>
      <el-row style="height: 100%; padding: 40px; width: 100%;">
        <el-col :span="12">
          <h1 class="section-header">
            {{ $t('dashboard.appList') }}
          </h1>
          <el-table
            :data="tableData"
            class="appInstanceTable"
            style="width: 100%"
            header-row-class-name="headerClassName"
          >
            <el-table-column
              prop="appName"
              :label="$t('dashboard.appName')"
            />
            <el-table-column
              prop="appInstanceId"
              :label="$t('dashboard.appId')"
            />
            <el-table-column
              prop="Status"
              :label="$t('dashboard.deploymentStatus')"
            >
              <template>
                <span
                  class="success"
                ><em class="el-icon-success" />{{ DeploymentStatus }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col
          :span="12"
          style="padding: 0px 20px"
        >
          <h1 class="section-header">
            {{ $t('dashboard.nodeList') }}
          </h1>
          <el-carousel
            :interval="4000"
            type="card"
            height="200px"
          >
            <el-carousel-item
              class="edge-card"
              v-for="item in nodeList"
              :key="item"
            >
              <el-row style="display: flex;">
                <el-col
                  :span="12"
                  style="display: flex; justify-content: left"
                >
                  <div style="display: flex; flex-direction: column;">
                    <img
                      class="egde-image"
                      src="../assets/images/edgenode.svg"
                      alt=""
                    >
                    <span>{{ item.mechostName }}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div style="font-size: 15px; text-align: right;display: flex; flex-direction: column; margin-top: 20px">
                    <span>{{ item.mechostIp }}</span>
                    <span>{{ item.city }}</span>
                    <div style="margin-top: 20px">
                      <el-button
                        class="edge-nodes-button"
                        id="nodeDetailsBtn"
                        type="text"
                        size="small"
                        @click="showEdgeDetails(item)"
                        :loading="loginBtnLoading"
                      >
                        {{ $t('dashboard.nodeDetails') }}
                      </el-button>
                      <el-button
                        class="edge-nodes-button"
                        id="AppDetailsBtn"
                        type="text"
                        size="small"
                        @click="showAppDetails(item.mechostIp)"
                        :loading="loginBtnLoading"
                      >
                        {{ $t('dashboard.appDetails') }}
                      </el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { lcmController } from '../tools/request.js'
export default {
  components: {
  },
  mounted () {
    this.getAppDistributedCount()
    this.getAppInfo()
    this.getTotalNodes()
  },
  data () {
    return {
      retryCount: 3,
      distributedCount: 0,
      deployedCount: 0,
      packageUploadedCount: 0,
      totalNodes: 0,
      nodeList: [],
      tableData: [],
      DeploymentStatus: 'Instantiated'
    }
  },
  methods: {
    async showAppDetails (hostIp) {
      window.open('http://' + hostIp + ':30095')
    },

    async getTotalNodes () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await lcmController.getHostList().then(res => {
          if (res.data && res.data.length > 0) {
            this.totalNodes = res.data.length
            res.data.forEach((item, index) => {
              this.nodeList.push(item)
            })
            isQuerySuccess = true
          }
        }).catch((error) => {
          console.log('Failed to get host list -> ', error.response)
        })
      }
    },

    showEdgeDetails (row) {
      console.log('show edge details row -> ', row)
      this.$router.push({ name: 'edge-details', params: row })
    },

    async getAppInfo () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await lcmController.getInstanceList().then(res => {
          if (res.data && res.data.length > 0) {
            this.tableData = res.data
            this.deployedCount = res.data.length
            isQuerySuccess = true
          }
        }).catch((error) => {
          console.log('Failed to get Instance count', error.response)
        })
      }
    },

    async getAppDistributedCount () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await lcmController.getDistributionList().then(res => {
          let count = 0
          if (res.data && res.data.length > 0) {
            this.packageUploadedCount = res.data.length
            res.data.forEach(item => {
              count = count + this.getDistributedCountForHost(item)
            })
            this.distributedCount = count
            isQuerySuccess = true
          }
        }).catch((error) => {
          console.log('Failed to get distribution count', error.response)
        })
      }
    },

    getDistributedCountForHost (resItem) {
      let count = 0
      if (resItem.mecHostInfo && resItem.mecHostInfo.length > 0) {
        resItem.mecHostInfo.forEach(host => {
          if (host.status === 'Distributed') {
            count++
          }
        })
      }
      return count
    }
  }
}
</script>
<style lang='less'>
.section-header {
  font-size: 15px;
  padding: 8px;
  color: #222;
  font-weight: 600;
  background: #efefef;
  margin-bottom: 10px;
}

.mt-60 {
  margin-top: 60px !important;
}

.stats-card {
  padding: 20px;
  height: 100px;
  .el-card {
    border-radius: 5px;
  }
  .el-card__body {
    padding: 5px 15px;
  }
}

.edge-nodes-card {
  padding: 20px;
  .el-card {
    border-radius: 25px;
  }
}

.el-carousel__container {
  position: relative;
  height: 200px;
  overflow: hidden
}

.edge-card {
  background-image: linear-gradient(45deg, #2d67a5, #437cf7);
  color: white;
  padding: 15px;
}

.node-stats-card {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    border-radius: 5px;
  }
}

.edge-nodes-button {
  width: 100px;
  color: #00e7ff;
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

.headerClassName{
  font-size: 13px;
}

.appInstanceTable{
  max-height: 185px;
  overflow-y: auto;
}

.icon-available{
  width: 75px;
  background-color: #35c7cd;
}

.icon-distribution{
  width: 75px;
  background-color: #5ddab4;
}

.icon-deployed{
  width: 75px;
  background-color: #f87875;
}

.egde-image{
  width: 50px;
  height: 50px;
}

.text-muted {
  color: #474c56;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
