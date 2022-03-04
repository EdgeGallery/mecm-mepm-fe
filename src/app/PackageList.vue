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
    class="package_list padding_default"
    style="min-height:648px;"
  >
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('app.packageList.edgeAppMarket') }}
      <span class="line_bot1" />
      <el-button
        class="newproject_btn linearGradient2"
        id="syncBtn"
        @click="uploadPackage"
      >
        <em class="new_icon" />
        {{ $t('app.packageList.newPackage') }}
      </el-button>
    </div>
    <div class="apacList">
      <div class="topOperArea">
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
          v-loading="dataLoading"
          :data="currPageTableData"
          style="width: 100%;"
          class="tableStyle"
        >
          <el-table-column
            prop="appPkgName"
            sortable
            :label="$t('app.packageList.name')"
          />
          <el-table-column
            prop="appPkgVersion"
            :label="$t('app.packageList.version')"
          />
          <el-table-column
            prop="appProvider"
            :label="$t('app.packageList.vendor')"
          />
          <el-table-column
            prop="appPkgDesc"
            :label="$t('app.packageList.desc')"
          />
          <el-table-column
            :label="$t('common.operation')"
            width="250"
          >
            <template slot-scope="scope">
              <el-button
                id="distributeBtn"
                @click="distribute(scope.row)"
                class="operations_btn"
                type="text"
                size="small"
              >
                {{ $t('app.packageList.distribute') }}
              </el-button>
              <el-button
                id="detailAnddeployBtn"
                @click="checkDetail(scope.row)"
                class="operations_btn"
                type="text"
                size="small"
              >
                {{ $t('app.distriList.detailAnddeploy') }}
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
          :visible.sync="uploadPkgDialogVisible"
          width="40%"
          class="default_dialog"
        >
          <div
            slot="title"
            class="el-dialog__title"
          >
            <em class="title_icon" />{{ $t('app.packageList.uploadPackage') }}
          </div>
          <el-row>
            <el-form
              label-width="auto"
              :model="currForm"
              ref="currForm"
              :rules="rules"
            >
              <el-form-item
                prop="package"
              >
                <el-upload
                  id="upload"
                  class="upload-demo"
                  drag
                  action=""
                  :http-request="fileUpload"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :multiple="false"
                  accept=""
                  :limit="1"
                  :on-exceed="handleExceed"
                >
                  <em class="el-icon-upload" />
                  <div class="el-upload__text">
                    {{ $t('system.edgeNodes.howToUpload') }}
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-row>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              id="cancelBtn"
              class="bgBtn"
              @click="uploadCancel()"
            >{{ $t('common.cancel') }}</el-button>
            <el-button
              id="confirmBtn"
              class="bgBtn"
              @click="submitUpload('currForm')"
            >{{ $t('common.confirm') }}</el-button>
          </span>
        </el-dialog>
      </div>
    </div>

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      v-loading="loading"
      class="default_dialog"
    >
      <el-row>
        <div
          slot="title"
          class="el-dialog__title"
        >
          <em class="title_icon" />{{ $t('app.packageList.slectEdgeNodes') }}
        </div>
        <el-input
          id="nodesearch"
          class="enterinput lt"
          v-model="edgeNodeSearchInput"
          @change="hostFilterHandler"
          size="small"
        >
          <em
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="hostFilterHandler"
          />
        </el-input>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            ref="multipleEdgeNodeTable"
            :data="currPageEdgeNodeTableData"
            class="tableStyle mt20"
            border
            size="small"
            style="width: 100%;"
            @selection-change="handleEdgeNodeSelectionChange"
          >
            <el-table-column
              type="selection"
            />
            <el-table-column
              prop="mechostName"
              sortable
              :label="$t('app.packageList.name')"
            />
            <el-table-column
              prop="mechostIp"
              :label="$t('app.packageList.ip')"
            />
            <el-table-column
              prop="city"
              :label="$t('app.packageList.city')"
            />
            <el-table-column
              prop="affinity"
              :label="$t('app.packageList.affinity')"
            />
            <el-table-column
              :label="$t('system.edgeNodes.hwCapability')"
              width="200"
            >
              <template slot-scope="scope">
                <span
                  v-for="(item,index) in scope.row.hwcapabilities"
                  :key="index"
                >
                  {{ item.hwType }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <pagination
          :page-sizes="[10,15,20,25]"
          :table-data="distPaginationData"
          @getCurrentPageData="getCurrentDistPageData"
        />
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
          class="bgBtn"
          @click="cancel()"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="confirmBtn"
          class="bgBtn"
          @click="confirm()"
          :loading="loading"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { lcmController } from '../tools/request.js'
import Pagination from '../components/Pagination.vue'
export default {
  name: 'ApacList',
  components: {
    Pagination
  },
  data () {
    return {
      fileList: [],
      dataLoading: false,
      tableData: [],
      paginationData: [],
      currPageTableData: [],
      distPaginationData: [],
      currPageEdgeNodeTableData: [],
      dialogVisible: false,
      uploadPkgDialogVisible: false,
      packageSearchInput: '',
      edgeNodeSearchInput: '',
      edgeNodeCurrentPage: 1,
      edgeNodePageSize: 5,
      rowSelection: [],
      selectedNum: 0,
      nodeSelection: [],
      selectedNodeNum: 0,
      currentRowData: '',
      appType: '',
      loading: false,
      dialogLoading: false,
      appId: '',
      language: localStorage.getItem('language'),
      currForm: {
        appPkgName: '',
        description: ''
      },
      searchData: ''
    }
  },
  mounted () {
    this.appType = this.$route.query.type ? this.$route.query.type : ''
    this.getPackageList()
  },
  computed: {
    rules () {
      return {
        mechostIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        mechostName: [
          { required: true, message: this.$t('verify.hostnameTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.edgeNodeNameVerify') }
        ],
        city: [
          { required: true, message: this.$t('tip.typeCity'), trigger: 'change' }
        ],
        coordinates: [
          { required: true, message: this.$t('verify.coordinates'), trigger: 'blur' }
        ],
        affinity: [
          { required: true, message: this.$t('verify.affinityTip'), trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  },
  methods: {
    uploadPackage () {
      this.uploadPkgDialogVisible = true
    },
    // 对app表格进行筛选 val：需要查询的值  key: 数据对应的字段
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        if (item[key] !== null) {
          let itemType = item[key].toLowerCase()
          return itemType.indexOf(val) > -1
        }
      })
    },
    // 根据搜索组件进行筛选
    filterHandler () {
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        if (this.searchData && this.searchData.length > 0) {
          this.filterTableData(this.searchData, 'appPkgName')
        }
      }
    },
    hostFilterHandler () {
      if (this.edgeNodeSearchInput && this.edgeNodeSearchInput.length > 0) {
        this.filterHostTableData(this.edgeNodeSearchInput, 'mechostName')
      } else {
        this.reloadHostTableData()
      }
    },
    filterHostTableData (val, key) {
      lcmController.getHostList().then(response => {
        this.distPaginationData = response.data
        this.distPaginationData = this.distPaginationData.filter(item => {
          let _itemVal = item[key].toLowerCase()
          return _itemVal.indexOf(val) > -1
        })
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('app.distriList.getHostError'))
      })
    },
    reloadHostTableData () {
      lcmController.getHostList().then(response => {
        this.distPaginationData = response.data
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('app.distriList.getHostError'))
      })
    },
    // 列表根据分页组件显示数据
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    getCurrentDistPageData (data) {
      this.currPageEdgeNodeTableData = data
    },
    checkDetail (row) {
      sessionStorage.setItem('appId', row.appId)
      this.$nextTick(
        this.$router.push('/mepm/apac/detail?appId=' + row.appId)
      )
    },
    distribute (row) {
      console.log(row)
      this.currentRowData = row
      this.dialogVisible = true
      this.getNodeList(row)
    },
    handleEdgeNodeSelectionChange (val) {
      this.nodeSelection = val
      this.selectedNodeNum = val.length
    },
    getPackageList () {
      lcmController.getDistributionList().then(response => {
        console.log('get package list', response.data.data)
        this.tableData = this.paginationData = response.data.data
        this.dataLoading = false
      }).catch((error) => {
        console.log('error in catch block', error)
        this.dataLoading = false
        this.$message.error(this.$t('app.packageList.getPackagesError'))
      })
    },
    async getNodeList (row) {
      sessionStorage.setItem('appId', row.appId)
      await lcmController.getHostList().then(response => {
        this.distPaginationData = response.data
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('app.distriList.getHostError'))
      })
    },
    cancel () {
      this.dialogVisible = false
      this.$refs.multipleEdgeNodeTable.clearSelection()
    },
    uploadCancel () {
      this.fileList = []
      this.uploadPkgDialogVisible = false
    },
    beforeUpload (file) {
      console.log(file)
    },
    fileUpload (content) {
      this.fileList.push(content.file)
    },
    async submitUpload () {
      this.loading = true
      this.isSecureBackend = sessionStorage.getItem('isSecureBackend')
      console.log('file list -> ', this.fileList[0])
      console.log('current form -> ', this.currForm)
      this.uploadPkgDialogVisible = false
      let params = new FormData()
      params.append('package', this.fileList[0])
      params.append('origin', 'MEPM')
      lcmController.uploadPackage(params).then(response => {
        this.showMessage('success', this.$t('tip.uploadSuccess'), 1500)
        this.dialogVisible = false
        this.fileList = []
        this.getPackageList()
        this.loading = false
      }).catch((error) => {
        this.loading = false
        this.fileList = []
        if (error.response.status === 403) {
          this.$message.error(this.$t('tip.loginOperation'))
        } else {
          this.$message.error(error.response.data.message)
        }
      })
    },
    async confirm () {
      this.loading = true
      let selectedMecHost = []
      this.nodeSelection.forEach(data => {
        selectedMecHost.push(data.mechostIp)
      })
      this.$refs.multipleEdgeNodeTable.clearSelection()
      console.log('current row data -> ', this.currentRowData)
      let params = {
        packageId: this.currentRowData.packageId,
        hostIp: selectedMecHost,
        appId: this.currentRowData.appId
      }
      console.log('distribute params -> ', params)
      if (params.hostIp.length > 0) {
        lcmController.confirmToDistribute(params).then(response => {
          this.showMessage('success', this.$t('tip.sucToDownload'), 1500)
          sessionStorage.setItem('appId', params.appId)
          this.$nextTick(
            this.$router.push('/mepm/apac/detail?appId=' + params.appId)
          )
        }).catch(() => {
          this.loading = false
          this.$message.error(this.$t('tip.failedToDistribute'), 3000)
        })
      } else {
        this.loading = false
        if (params.hostIp.length === 0) {
          this.$message.warning(this.$t('tip.mecHost'))
        } else {
          this.$message.warning(this.$t('tip.version'))
        }
      }
    },
    beforeRemove (file, fileList) {
      let checkInfo = this.$t('app.packageList.fileDeleteConfirmInfo').replace('%s', file.name)
      return this.$confirm(checkInfo)
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    handleExceed (files, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('app.packageList.onlyOneFile'))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.package_list{
  position: relative;
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
  .apacList {
    height: 100%;
    background: rgba(46,20,124,.7);
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
    }
    .tableDiv {
      width: 100%;
    }
    .el-row-button-input {
      margin-top: 10px;
    }
    .shortdesc{
      overflow: hidden;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
  }
}
</style>
