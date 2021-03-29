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
          Application Statistics
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
                    class="cp"
                    src="../assets/images/packageupload.svg"
                    alt=""
                  >
                </el-col>
                <el-col :span="18">
                  <div style="font-size: 50px; font-weight: bolder; text-align: center">
                    <span>{{ packageUploadedCount }}</span>
                  </div>
                  <div style="font-size: small; text-align: center">
                    <span>Available</span>
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
                    class="cp"
                    src="../assets/images/distribution.svg"
                    alt=""
                  >
                </el-col>
                <el-col :span="18">
                  <div style=" font-size: 50px; font-weight: bolder; text-align: center">
                    <span>{{ distributedCount }}</span>
                  </div>
                  <div style="font-size: small; text-align: center">
                    <span>Distributed</span>
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
                    class="cp"
                    src="../assets/images/application.svg"
                    alt=""
                  >
                </el-col>
                <el-col :span="18">
                  <div style=" font-size: 50px; font-weight: bolder; text-align: center">
                    <span>{{ deployedCount }}</span>
                  </div>
                  <div style=" font-size: small; text-align: center">
                    <span>Deployed</span>
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
            Application List
          </h1>
          <el-table
            :data="tableData"
            class="appInstanceTable"
            style="width: 100%"
            header-row-class-name="headerClassName"
          >
            <el-table-column
              prop="appName"
              :label="$t('Application Name')"
            />
            <el-table-column
              prop="appInstanceId"
              :label="$t('Application ID')"
            />
            <el-table-column
              prop="Status"
              :label="$t('Deployment status')"
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
            EdgeNodes List
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
                      src="../assets/images/cube.svg"
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
                        {{ $t('Node details') }}
                      </el-button>
                      <el-button
                        class="edge-nodes-button"
                        id="AppDetailsBtn"
                        type="text"
                        size="small"
                        @click="showAppDetails(item.mechostIp)"
                        :loading="loginBtnLoading"
                      >
                        {{ $t('App details') }}
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
    <div
      style="display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 8px;
    color: #aaa;"
    >
      Icons made by <a
        href="https://www.freepik.com"
        title="Freepik"
      >Freepik</a> from <a
        href="https://www.flaticon.com/"
        title="Flaticon"
      >www.flaticon.com</a>
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
      distributedCount: 0,
      deployedCount: 0,
      packageUploadedCount: 0,
      infoList: [],
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
    handleSectionClick (section, event) {
      console.log(`${section.label} clicked.`)
    },
    getTotalNodes () {
      lcmController.getHostList().then(res => {
        console.log('get host list', res.data)
        if (res.data && res.data.length > 0) {
          this.totalNodes = res.data.length
          res.data.forEach((item, index) => {
            this.nodeList.push(item)
          })
        }
      }, error => {
        this.$message.error(this.$t('tip.getCommonListFailed'))
        if (error.status === 404 && error.data.details[0] === 'Record not found') {
          this.$message.error(this.$t('host record not found'))
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },

    showEdgeDetails (row) {
      console.log('show edge details row -> ', row)
      this.$router.push({ name: 'edge-details', params: row })
    },

    getAppInfo () {
      lcmController.getInstanceList().then(res => {
        console.log('get Instance count ->', res.data)
        this.infoList = res.data
        if (this.infoList && this.infoList.length > 0) {
          this.tableData = res.data
          this.deployedCount = this.infoList.length
        }
      }).catch(() => {
        console.log('Failed to get Instance count')
      })
    },

    getAppDistributedCount () {
      lcmController.getDistributionList().then(res => {
        console.log('distribution count ->', res.data)
        this.infoList = res.data
        let count = 0
        if (this.infoList && this.infoList.length > 0) {
          this.packageUploadedCount = this.infoList.length
          this.infoList.forEach(item => {
            if (item.mecHostInfo && item.mecHostInfo.length > 0) {
              item.mecHostInfo.forEach(host => {
                if (host.status === 'Distributed') {
                  count++
                }
              })
            }
          })
          this.distributedCount = count
        }
      }).catch(() => {
        console.log('Failed to get distribution count')
      })
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
.appInstanceTable{
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
  width: 75px;
}
.egde-image{
  width: 50px;
  height: 50px;
}
.fs-16 {
  font-size: 16px !important;
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
