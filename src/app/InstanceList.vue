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
    class="padding_default"
    style="min-height:648px;"
  >
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('nav.appInstance') }}
      <span class="line_bot1" />
    </div>
    <div class="ainsList">
      <div class="topOperArea">
        <el-button
          @click="beforeDelete(selectData,1)"
          class="delete_btn rt"
        >
          {{ this.$t('app.instanceList.batchDelete') }}
        </el-button>
        <el-input
          maxlength="20"
          v-model="searchData"
          :placeholder="$t('app.packageList.name')"
          @keyup.enter.native="filterHandler"
          class="enterinput lt"
        >
          <em
            slot="suffix"
            class="search_icon"
            @click="filterHandler"
          />
        </el-input>
      </div>
      <div class="tableDiv">
        <el-table
          style="width: 100%;"
          :data="currPageTableData"
          v-loading="dataLoading"
          @selection-change="handleSelectionChange"
          class="tableStyle"
        >
          <el-table-column
            type="selection"
            revers-selection
            width="50"
          />
          <el-table-column
            prop="appName"
            sortable
            :label="$t('app.packageList.name')"
          />
          <el-table-column
            prop="mecHost"
            :label="$t('app.distriList.mecHost')"
          />
          <el-table-column
            :label="$t('app.distriList.status')"
          >
            <template>
              <span
                class="success"
              ><em class="el-icon-success" />{{ DeploymentStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('common.operation')"
            width="460"
          >
            <template slot-scope="scope">
              <el-button
                id="deleteBtn"
                @click="beforeDelete(scope.row,2)"
                class="operations_btn"
              >
                {{ $t('common.delete') }}
              </el-button>
              <el-button
                id="detailBtn"
                @click="handleRowSelection(scope.row)"
                class="operations_btn"
              >
                {{ $t('common.detail') }}
              </el-button>
              <el-button
                class="operations_btn"
                @click="showReason(scope.row)"
                :disabled="scope.row.operationalStatus === 'Instantiated'"
              >
                {{ $t('tip.operationInfo') }}
              </el-button>
              <el-button
                class="operations_btn"
                @click="jump(scope.row)"
              >
                {{ $t('nav.ruleConfiguration') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBar">
          <Pagination
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <el-dialog
        :visible.sync="instanceListVisible"
        width="width"
        class="default_dialog detail_dialog"
      >
        <div
          slot="title"
          class="el-dialog__title"
        >
          <em class="title_icon" />{{ $t('app.instanceList.appKpi') }}
        </div>
        <div>
          <div style="min-height:280px;">
            <el-row :gutter="10">
              <el-col
                :span="5"
                style="height:200px;"
              >
                <InstanceUsage :kpi-info="kpiInfo" />
              </el-col>
              <el-col
                :span="19"
                style="margin-top:15px;"
              >
                <el-table
                  ref="podTable"
                  :data="podTable"
                  class="mt20 detailTab"
                  size="small"
                >
                  <el-table-column
                    prop="podname"
                    :label="$t('app.distriList.podName')"
                  />
                  <el-table-column
                    prop="podstatus"
                    :label="$t('app.distriList.status')"
                  />
                  <el-table-column
                    :label="$t('overview.mem')"
                  >
                    <template slot-scope="scope">
                      {{ getMemValue(scope.row) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('overview.cpu')"
                  >
                    <template slot-scope="scope">
                      {{ getCpuValue(scope.row) }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            class="bgBtn"
            @click="instanceListVisible=false"
          >{{ $t('common.cancel') }}</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :close-on-click-modal="false"
        :title="$t('app.instanceList.instanceDetail')"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <el-form
          label-width="auto"
          class="detailForm"
          v-for="(item,index) in detailData"
          :key="index"
        >
          <el-form-item label="Pod Name:">
            <span>{{ item.podname }}</span>
          </el-form-item>
          <el-form-item label="Pod Status:">
            <span
              v-if="item.podstatus === 'Running'"
              class="success"
            ><em class="el-icon-success" />{{ item.podstatus }}</span>
            <span
              v-else
              class="failed"
            ><em class="el-icon-error" />{{ item.podstatus }}</span>
          </el-form-item>
          <el-form-item
            label="Container Name:"
          >
            <span>{{ item.containers[0].containername }}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'
import InstanceUsage from './InstanceUsage.vue'
import { lcmController } from '../tools/request.js'

export default {
  name: 'AinsList',
  components: {
    Pagination, InstanceUsage
  },
  data () {
    return {
      loading: false,
      currPageTableData: [],
      paginationData: [],
      dataLoading: true,
      tableData: [],
      dialogVisible: false,
      interval: '',
      detailForm: {
        podName: ''
      },
      detailData: [],
      searchData: '',
      selectData: [],
      DeploymentStatus: 'Instantiated',
      instanceListVisible: false,
      podTable: [],
      kpiInfo: {},
      appKPIInfo: {}
    }
  },
  mounted () {
    this.initList()
    this.interval = setInterval(() => {
      this.initList()
    }, 10000)
  },
  beforeDestroy () {
    this.clearInterval()
  },
  methods: {
    jump (row) {
      sessionStorage.setItem('instanceId', row.appInstanceId)
      sessionStorage.setItem('instanceName', row.appName)
      this.$router.push('/mepm/ruleconfig')
    },
    getMemValue (rowVal) {
      let val = rowVal.containers[0].metricsusage.memusage.split('/')
      return ((val[0] / val[1]) * 100).toFixed(2) + '%'
    },
    getCpuValue (rowVal) {
      let val = rowVal.containers[0].metricsusage.cpuusage.split('/')
      return ((val[0] / val[1]) * 100).toFixed(2) + '%'
    },
    handleRowSelection (row) {
      lcmController.getServiceInfo(row.appInstanceId).then(res => {
        this.appKPIInfo = res.data
        this.podTable = this.appKPIInfo.pods
        if (this.podTable) {
          this.instanceListVisible = true
          this.getUsageData()
        } else {
          this.instanceListVisible = false
          this.$notify.warning({
            title: 'Info',
            offset: 50,
            message: 'There is no data exist.',
            showClose: false,
            duration: 2000
          })
        }
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          this.$message.warning(this.$t('tip.getStatusDelay'))
        }
        this.loginStatus(error)
      })
    },
    getUsageData () {
      let matrics = this.appKPIInfo
      if (matrics) {
        this.kpiInfo = {
          'cpuusage': matrics.cpupercent,
          'memusage': matrics.mempercent
        }
      } else {
        this.kpiInfo = {}
      }
    },
    showReason (row) {
      this.$alert(row.operationInfo, this.$t('tip.operationInfo'))
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key].toLowerCase()
        return itemVal.indexOf(val) > -1
      })
    },
    filterHandler () {
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        if (this.searchData && this.searchData.length > 0) {
          this.filterTableData(this.searchData, 'appName')
        }
      }
    },
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    handleSelectionChange (selection) {
      this.selectData = selection
    },
    beforeDelete (rows, type) {
      if (type === 1) {
        // batch terminate
        if (rows.length > 0) {
          this.$confirm(this.$t('app.instanceList.beforeDelete'), this.$t('common.warning'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            closeOnClickModal: false,
            type: 'warning'
          }).then(() => {
            this.multipleDelete(rows)
          })
        } else {
          this.$message.warning('Please select one package at least!')
        }
      } else {
        // terminate flow
        this.$confirm(this.$t('app.instanceList.beforeDelete'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.confirmDetlete(rows.appInstanceId)
        })
      }
    },
    initList () {
      lcmController.getInstanceList().then(res => {
        console.log('get instance response -> ', res)
        if (res.data && res.data.length > 0) {
          this.tableData = this.paginationData = res.data
        } else {
          this.tableData = this.paginationData = []
        }
        this.filterHandler()
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    multipleDelete (rows) {
      console.log('multiple delete row -> ', rows)
      let obj = {
        appInstances: ''
      }
      rows.forEach(item => {
        if (obj.appInstances.length > 0) {
          obj.appInstances = obj.appInstances + ',' + item.appInstanceId
        } else {
          obj.appInstances = item.appInstanceId
        }
      })
      console.log('data -> ', obj)
      this.dataLoading = true
      lcmController.batchDeleteInstanceApp(obj).then(response => {
        this.handleDeleteResponse()
      }).catch((error) => {
        this.$message.error(error.response.data.message)
      })
    },
    confirmDetlete (appInstanceId) {
      this.dataLoading = true
      lcmController.deleteInstanceApp(appInstanceId).then(response => {
        this.handleDeleteResponse()
      }).catch((error) => {
        this.$message.error(error.response.data.message)
      })
    },
    handleDeleteResponse () {
      setTimeout(() => {
        this.initList()
      }, 1500)
      this.showMessage('success', this.$t('tip.deleteSuc'), 1500)
    },
    checkDetail (rows) {
      lcmController.getInstanceDetail(rows.appInstanceId).then(response => {
        console.log('get instance detail response -> ', response)
        this.detailData = response.data.pods
        this.dialogVisible = true
      }).catch((error) => {
        console.log('error response -> ', error)
        if (error.response.status === 404) {
          this.$message.warning(this.$t('tip.getStatusDelay'))
        } else {
          this.$message.error('Network Error')
        }
      })
    }
  }
}
</script>

<style lang='less'>
.ainsList{
    height: 100%;
    background: #fff;
    padding: 30px 60px;
    border-radius: 20px;
    box-shadow: 0 6px 68px 0 rgba(94, 64, 200, 0.06);
    .topOperArea{
      height: 65px;
      .el-input{
        margin-top: 5px;
        .search_icon{
          top: 8px;
        }
      }
      .el-input__inner{
        height: 30px;
      }
    }
    .btn-group{
      margin:15px 0;
    }
    .delete_btn{
      margin-right: 10px;
      border: 1px solid #5844be;
      border-radius: 8px;
      padding: 8px 15px;
      margin-top: 4px;
      background: #5844be;
      color: #fff;
    }
  .appStore{
    width:30%;
    height:185px;
    border:1px solid #ddd;
    border-radius: 8px;
    padding:15px;
    .lt{
      width: 30%;
      padding:15px;
      img{
        position: relative;
        left:15px;
      }
      p{
        padding-top:20px;
        text-align: center;
      }
    }
    .rt{
      width:60%;
      div{
        float:left;
        width:46%;
        height:80px;
        border:1px solid #ddd;
        border-radius: 4px;
        margin:0 5px 20px 0;
        text-align: center;
        line-height:30px;
        font-size: 15px;
        font-weight: bold;
        p:first-child{
          margin-top:15px;
        }
        p:nth-child(2){
          color:green;
        }
      }
    }
  }
  .tableDiv{
    p{
      padding-bottom:5px;
      .rt{
        margin-bottom:15px;
      }
    }
  }
  i{
    margin-right: 5px;
  }
  .detailForm{
    p{
      margin-bottom: 12px;
    }
    p::before{
      content:'';
      display:inline-block;
      width:3px;
      height:15px;
      margin-right:3px;
      background: #409EFF;
      position: relative;
      top:3px;
    }
    .el-form-item{
      margin-bottom: 12px!important;
    }
  }
  .detail_dialog{
    .el-dialog,.el-dialog__header{
      background: #ffffff !important;
    }
  }
}
</style>
