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
  <div class="edgeList">
    <Search
      :type-item="false"
      :name-item="false"
      :affinity-item="false"
      :ip-item="true"
      :status-item="true"
      :status="distributionStatus"
      @getSearchData="getSearchData"
    />
    <el-table
      class="tableStyle"
      style="width: 100%;"
      :data="currPageTableData"
      v-loading="dataLoading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        revers-selection
        width="50"
      />
      <el-table-column
        prop="appPkgName"
        :label="$t('app.packageList.name')"
        width="180"
      >
        <template>
          <div>
            {{ this.appPkgName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="appPkgVersion"
        :label="$t('app.packageList.version')"
        width="130"
      >
        <template>
          <div>
            {{ this.appPkgVersion }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="appProvider"
        :label="$t('app.packageList.vendor')"
        width="160"
      >
        <template>
          <div>
            {{ this.appProvider }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="hostIp"
        :label=" $t('app.distriList.hostIp')"
      />
      <el-table-column
        prop="status"
        :label=" $t('app.distriList.status')"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.status === 'Distributed'"
            class="success"
          ><em class="el-icon-success" />{{ scope.row.status }}</span>
          <span
            v-else-if="scope.row.status === 'Processing'"
            class="primary"
          ><em class="el-icon-loading" />{{ scope.row.status }}</span>
          <span
            v-else
            class="error"
          ><em class="el-icon-error" />{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('common.operation')"
        width="190"
      >
        <template slot-scope="scope">
          <el-button
            id="deleteBtn"
            @click.native.prevent="beforeDelete(scope.row)"
            class="operations_btn"
          >
            {{ $t('common.delete') }}
          </el-button>
          <el-button
            id="deployBtn"
            @click="deploy(scope.row,1)"
            :disabled="scope.row.status !=='Distributed'"
            class="operations_btn"
          >
            {{ $t('app.distriList.deploy') }}
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
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('app.distriList.deploymentConf')"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        label-width="auto"
        class="configForm"
        :model="configForm"

        ref="configForm"
        :rules="rules"
      >
        <p>MEC Host</p>
        <el-form-item :label="$t('app.packageList.ip')">
          <div
            v-for="(item,index) in hostList"
            :key="index"
          >
            <span
              class="hostip"
            >{{ item.hostIp }}</span>
            <span
              v-if="item.status === 'Distributed'"
              class="success"
            ><em class="el-icon-success" />{{ item.status }}</span>
            <span
              v-else-if="item.status === 'Processing'"
              class="primary"
            ><em class="el-icon-loading" />{{ item.status }}</span>
            <span
              v-else
              class="error"
            ><em class="el-icon-error" />{{ item.status }}</span>
          </div>
        </el-form-item>
        <p>APP Information</p>
        <el-form-item
          :label="$t('app.distriList.appName')"
          prop="appName"
        >
          <el-input
            id="appname"
            maxlength="20"
            v-model="configForm.appName"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
          size="small"
          @click="dialogVisible = false,loading=false"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          size="small"
          @click="confirmToDeploy('configForm')"
          :loading="loading"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Search from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'
import { lcmController } from '../tools/request.js'
export default {
  name: 'EdgeList',
  components: {
    Search, Pagination
  },
  props: {
    appid: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      loading: false,
      currPageTableData: [],
      paginationData: [],
      searchVal: '',
      selectedNum: 0,
      selectData: null,
      selectedData: [],
      appPkgId: '',
      appPkgVersion: '',
      appPkgName: '',
      appPkgAffinity: '',
      appProvider: '',
      dialogVisible: false,
      configForm: {
        podName: 'pod1',
        podKind: 'dployment',
        podNameEspace: 'default',
        podSelector: 'martchlabel',
        status: '',
        appPkgId: this.appPkgId,
        appName: '',
        appInstanceDescription: '',
        appId: this.appid,
        hwCapabilities: []
      },
      dataLoading: true,
      tableData: [],
      packageData: [],
      interval: null,
      instanceId: '',
      timer: null,
      distributionStatus: ['Distributed', 'Error'],
      serchData: null,
      hostList: [],
      capabilities: ['GPU', 'NPU']
    }
  },
  computed: {
    rules () {
      return {
        appName: [
          { required: true, message: this.$t('verify.appNameVerify'), trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{4,16}$/, message: this.$t('verify.hostNameVerify') }
        ],
        appInstanceDescription: [
          { required: true, message: this.$t('verify.descVerify'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initList()
    this.interval = setInterval(() => {
      this.initList()
    }, 15000)
  },
  beforeDestroy () {
    this.clearInterval()
  },
  methods: {
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
      clearTimeout(this.timer)
      this.timer = null
    },
    // 对app表格进行筛选 val：需要查询的值  key: 数据对应的字段
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key].toLowerCase()
        return itemVal.indexOf(val) > -1
      })
    },
    // 根据搜索组件进行筛选
    getSearchData (data) {
      this.serchData = data
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            let dataKey = ''
            if (key === 'status') {
              dataKey = 'status'
            } else if (key === 'ip') {
              dataKey = 'hostIp'
            }
            this.filterTableData(data[key].toLowerCase(), dataKey)
          }
        }
        if (!reset) this.paginationData = this.tableData
      }
    },
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    beforeDelete (rows) {
      this.$confirm(this.$t('tip.beforeDeleteFromMechost'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        let hostIp = rows.hostIp
        let type = 1
        lcmController.deleteDistributionApp(type, hostIp, this.appPkgId).then(res => {
          this.showMessage('success', this.$t('tip.deletePacFrmoHost'), 1500)
          this.initList()
        })
      }).catch(() => {
        console.log('failed to delete package distribution')
      })
    },
    initList () {
      console.log('app Id -> ' + this.appid)
      lcmController.getDistributionList().then(res => {
        let resData = res.data
        console.log('get distribution list response ', resData)
        this.paginationData = []
        resData.data.forEach(item => {
          if (item.appId === this.appid) {
            this.appPkgId = item.packageId
            this.appPkgName = item.appPkgName
            this.appPkgVersion = item.appPkgVersion
            this.appPkgAffinity = item.appPkgAffinity
            this.appProvider = item.appProvider
            if (item.mecHostInfo && item.mecHostInfo.length > 0) {
              this.paginationData = item.mecHostInfo
            }
          }
        })
        console.log('pagination data -> ', this.paginationData)
        this.tableData = this.paginationData
        if (this.serchData) {
          this.getSearchData(this.serchData)
        }
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        let resData = error.response
        if (resData && resData.status === 404 && resData.data.message === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    deploy (row, type) {
      this.configForm = {
        podName: 'pod1',
        podKind: 'dployment',
        podNameEspace: 'default',
        podSelector: 'martchlabel',
        status: '',
        appPkgId: this.appPkgId,
        appName: '',
        appInstanceDescription: '',
        appId: this.appid,
        hwCapabilities: []
      }
      this.hostList = []
      this.configForm.appPkgId = this.appPkgId
      this.configForm.appId = this.appid
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.configForm.resetFields()
      })
      if (type === 2) {
        let array = []
        row.forEach(item => {
          array.push(item.hostIp)
        })
        this.configForm.mecHost = array
        this.hostList = row
      } else {
        this.configForm.mecHost = row.hostIp
        this.hostList.push(row)
      }
    },
    confirmToDeploy (configForm) {
      this.$refs[configForm].validate((valid) => {
        if (valid) {
          let params = {
            appId: this.configForm.appId,
            packageId: this.configForm.appPkgId,
            appName: this.configForm.appName,
            hostIp: this.configForm.mecHost,
            origin: 'MEPM'
          }
          this.loading = true
          console.log('app deploy params -> ', params)
          lcmController.instantiateApp(params).then(res => {
            this.dialogVisible = false
          }).catch(() => {
            this.$message.error(this.$t('tip.deployFailed'))
            this.dialogVisible = false
          })
        }
      })
    },
    queryInstanceStatus (instanceids) {
      lcmController.getInstanceInfo(instanceids).then(res1 => {
        let status = res1.data.response.operationalStatus
        if (status === 'Created') {
          this.instaniateApp(instanceids)
        } else if (status === 'Create failed') {
          this.$message.error(res1.data.response.operationInfo)
          this.dialogVisible = false
          this.loading = false
        } else {
          this.queryInstanceStatus()
        }
      }).catch(err => {
        if (err.name === 'Error' && err.message === 'Request failed with status code 404') {
          setTimeout(() => { this.queryInstanceStatus() }, 1000)
        } else {
          throw err
        }
      })
    },
    instaniateApp (instanceId) {
      lcmController.instantiateApp(instanceId).then(res => {
        this.handleInstantiateResponse()
      }).catch(() => {
        this.$message.error(this.$t('tip.deployFailed'))
        this.dialogVisible = false
        this.loading = false
      })
    },
    handleSelectionChange (selection) {
      this.selectData = selection
    },
    handleInstantiateResponse () {
      this.loading = false
      this.dialogVisible = false
      this.$nextTick(() => {
        this.$router.push('/mepm/ains/list')
      })
    }
  }
}
</script>

<style lang='less' scoped>
.edgeList{
  .btn-group{
    margin-bottom: 15px;
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
      text-align: center;
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
    padding-top:25px;
    p{
      position: relative;
      top:15px;
      .rt{
        margin-bottom:15px;
      }
    }
  }
}
.createBtn{
  position: relative;
  top: 3px;
}
.tableStatus{
  i{
    margin-right:5px;
  }
}
.configForm{
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
    margin-bottom: 20px!important;
  }
  .hostip{
    margin-right:10px;
  }
}
.listItem{
  border-bottom: 1px solid #ddd;
  padding-top:10px;
  .el-button{
    position: relative;
    top:-6px;
  }
}
</style>
