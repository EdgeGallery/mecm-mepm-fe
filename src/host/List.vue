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
    class="edge_list padding_default"
    style="min-height:648px;"
  >
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('nav.edgeNodes') }}
      <span class="line_bot1" />
      <el-button
        class="newproject_btn linearGradient2"
        id="regBtn"
        @click="register()"
      >
        <em class="new_icon" />
        {{ $t('system.edgeNodes.newEdge') }}
      </el-button>
    </div>
    <div class="sysk8s">
      <Search
        :status-item="false"
        :affinity-item="false"
        :ip-item="true"
        @getSearchData="getSearchData"
      />
      <div class="tableDiv">
        <el-table
          :data="currPageTableData"
          v-loading="dataLoading"
          class="tableStyle"
          style="width: 100%;"
        >
          <el-table-column
            prop="mechostName"
            sortable
            :label="$t('app.packageList.name')"
          >
            <template slot-scope="scope">
              <em
                class="el-icon-success"
                :style="{color: '#67C23A'}"
              />
              <span style="margin-left: 10px">{{ scope.row.mechostName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mechostIp"
            :label="$t('app.packageList.ip')"
          />
          <el-table-column
            prop="city"
            :label="$t('system.edgeNodes.location')"
          />
          <el-table-column
            prop="affinity"
            :label="$t('app.packageList.affinity')"
          />
          <el-table-column
            :label="$t('system.edgeNodes.hwCapability')"
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
          <el-table-column
            :label="$t('common.operation')"
            align="center"
            width="280"
          >
            <template slot-scope="scope">
              <el-button
                class="operations_btn"
                id="deleteBtn"
                @click.native.prevent="beforeDelete(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('common.delete') }}
              </el-button>
              <el-button
                class="operations_btn"
                id="uploadBtn"
                @click.native.prevent="uploadFile(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('system.edgeNodes.uploadFile') }}
              </el-button>
              <el-button
                class="operations_btn"
                id="modifyBtn"
                @click="handleModify(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('common.modify') }}
              </el-button>
              <el-button
                class="operations_btn"
                id="detailBtn"
                type="text"
                size="small"
                @click="showDetails(scope.row)"
              >
                {{ $t('edgeNode.detail') }}
              </el-button>
              <el-button
                class="operations_btn"
                id="appDetailBtn"
                type="text"
                size="small"
                @click="showAppDetails(scope.row)"
              >
                {{ $t('edgeNode.appDetails') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBar">
          <pagination
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        style="padding-right:30px;"
        width="40%"
        class="default_dialog"
      >
        <div
          slot="title"
          class="el-dialog__title"
        >
          <em class="title_icon" />{{ title }}
        </div>
        <div class="k8s">
          <el-row>
            <el-form
              label-width="auto"
              :model="currForm"
              ref="currForm"
              :rules="rules"
              size="small"
            >
              <el-form-item
                :label="$t('system.edgeNodes.systemPlatform')"
              >
                <el-radio-group
                  v-model="currForm.vim"
                  @change="changeType"
                  class="default_radio"
                >
                  <el-radio
                    label="K8S"
                  >
                    K8S
                  </el-radio>
                  <el-radio
                    label="OpenStack"
                  >
                    OpenStack
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.name')"
                prop="mechostName"
              >
                <el-input
                  id="hostname"
                  maxlength="20"
                  v-model="currForm.mechostName"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.ip')"
                prop="mechostIp"
              >
                <el-input
                  id="ip"
                  v-model="currForm.mechostIp"
                  :disabled="isDisable"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.location')"
                prop="address"
              >
                <area-select
                  v-model="selectedArea"
                  :data="$pcaa"
                  @change="cityChanged"
                  :level="2"
                  type="text"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.address')"
                prop="city"
              >
                <el-input
                  id="address"
                  v-model="currForm.city"
                  :placeholder="$t('system.edgeNodes.address')"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.coordinates')"
                prop="coordinates"
              >
                <el-input
                  id="coord"
                  v-model="currForm.coordinates"
                  :placeholder="$t('system.edgeNodes.coordPlaceholder')"
                />
                <p class="referCoord">
                  {{ $t('system.edgeNodes.referCoord') }}
                  <a
                    href="https://www.openstreetmap.org/#map=11/39.9064/116.3913"
                    target="_blank"
                  >OpenStreetMap</a>
                </p>
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.affinity')"
                prop="affinity"
              >
                <el-radio-group
                  v-model="currForm.affinity"
                  class="default_radio"
                >
                  <el-radio
                    v-for="(item,index) in affinityList"
                    :key="index"
                    :label="item"
                  >
                    {{ item }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.hwCapability')"
              >
                <el-checkbox-group
                  v-model="capabilities"
                >
                  <el-checkbox
                    v-for="(item,index) in capability"
                    :key="index"
                    :label="item"
                  />
                </el-checkbox-group>
              </el-form-item>
              <el-form-item
                label="GPU Info"
                v-if="capabilities.includes('GPU')"
              >
                <el-row :gutter="24">
                  <el-col :span="5">
                    <el-input
                      type="text"
                      v-model="gpuModel"
                      placeholder="Model"
                    />
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      type="text"
                      v-model="gpuVendor"
                      placeholder="Vendor"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item
                label="NPU Info"
                v-if="capabilities.includes('NPU')"
              >
                <el-row :gutter="24">
                  <el-col :span="5">
                    <el-input
                      type="text"
                      v-model="npuModel"
                      placeholder="Model"
                    />
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      type="text"
                      v-model="npuVendor"
                      placeholder="Vendor"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-row>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            id="cancelBtn"
            class="bgBtn"
            @click="cancel()"
          >{{ $t('common.cancel') }}</el-button>
          <el-button
            id="confirmBtn"
            class="bgBtn"
            @click="confirm('currForm')"
          >{{ $t('common.confirm') }}</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="dialogVisibleUpload"
        width="30%"
        class="default_dialog"
      >
        <div
          slot="title"
          class="el-dialog__title"
        >
          <em class="title_icon" />{{ $t('system.edgeNodes.uploadFile') }}
        </div>
        <el-upload
          id="upload"
          class="upload-demo"
          drag
          action=""
          :http-request="submitUpload"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :multiple="false"
          accept=""
          :limit="1"
        >
          <em class="el-icon-upload" />
          <div class="el-upload__text">
            {{ $t('system.edgeNodes.howToUpload') }}
          </div>
          <div
            class="el-upload__tip"
            slot="tip"
          >
            {{ $t('system.edgeNodes.uploadTip') }}
          </div>
        </el-upload>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            class="bgBtn"
            @click="dialogVisibleUpload=false"
          >{{ $t('common.cancel') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { lcmController } from '../tools/request.js'
import pagination from '../components/Pagination.vue'
import Search from '../components/Search.vue'
export default {
  name: 'Sysk8s',
  components: {
    Search, pagination
  },
  data () {
    return {
      paginationData: [],
      currPageTableData: [],
      dataLoading: true,
      tableData: [],
      dialogVisible: false,
      dialogVisibleUpload: false,
      fileList: [],
      op: false,
      area: false,
      selectedArea: [],
      currForm: {
        address: '',
        affinity: '',
        city: '',
        mechostIp: '',
        mechostName: '',
        userName: '',
        zipCode: '',
        hwcapabilities: [],
        coordinates: '',
        vim: 'K8S',
        origin: 'MEPM'
      },
      capabilities: [],
      gpuModel: '',
      gpuVendor: '',
      npuModel: '',
      npuVendor: '',
      title: '',
      editType: 1,
      isDisable: false,
      affinityList: ['X86', 'ARM64', 'ARM32'],
      capability: ['GPU', 'NPU'],
      fileConfirm: true,
      rlp: sessionStorage.getItem('rlp')
    }
  },
  mounted () {
    this.getNodeListInPage()
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
        address: [
          { required: true, message: this.$t('tip.typeAddress'), trigger: 'change' }
        ],
        coordinates: [
          { required: true, message: this.$t('verify.coordinates'), trigger: 'blur' },
          { pattern: /^([789][3-9](?:\.\d{1,10})?|[1][0-2][0-9](?:\.\d{1,10})?|[13][0-6](?:\.\d{1,10})?)[,]\s?([3-9](?:\.\d{1,10})?|[1234][0-9](?:\.\d{1,10})?|[5][0-4](?:\.\d{1,10})?)$/, message: this.$t('verify.coordinates') }
        ],
        affinity: [
          { required: true, message: this.$t('verify.affinityTip'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async showAppDetails (row) {
      this.$router.push({ name: 'mepinfo', params: { nodeIp: row.mechostIp } })
    },
    showDetails (row) {
      this.$router.push({ name: 'nodeinfo', params: { nodeInfo: row, nodeIp: row.mechostIp } })
    },
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key]
        if (itemVal) return itemVal.toLowerCase().indexOf(val) > -1
      })
    },
    // 根据搜索组件进行筛选
    getSearchData (data) {
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            let dataKey = key
            if (key === 'ip') {
              dataKey = 'mechostIp'
            } else if (key === 'name') {
              dataKey = 'mechostName'
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
    cityChanged (val) {
      if (val) {
        this.currForm.address = val.join('/')
      } else {
        this.location = []
      }
    },
    changeType () {
      this.op = !this.op
    },
    uploadFile (row) {
      this.fileList = []
      this.dialogVisibleUpload = true
      this.currForm = row
    },
    handleModify (row) {
      this.editType = 2
      this.title = this.$t('system.edgeNodes.nodeModify')
      this.isDisable = true
      let middleData = JSON.parse(JSON.stringify(row))
      this.currForm = middleData
      this.currForm.vim = this.currForm.vim.toLowerCase() === 'k8s' ? 'K8S' : this.currForm.vim
      this.selectedArea = row.address.split('/')
      this.dialogVisible = true
      this.area = true
      row.hwcapabilities.forEach(item => {
        this.capabilities.push(item.hwType)
      })
      this.checkCapabilityInfo(row)
    },
    checkCapabilityInfo (row) {
      row.hwcapabilities.forEach(item => {
        if (item.hwType === 'GPU') {
          this.gpuVendor = item.hwVendor
          this.gpuModel = item.hwModel
        } else {
          this.npuVendor = item.hwVendor
          this.npuModel = item.hwModel
        }
      })
    },
    cancel (row) {
      this.dialogVisible = false
      this.area = false
      this.area = false
      this.isDisable = false
      this.resetForm()
    },
    resetForm () {
      this.currForm = {
        address: '',
        affinity: '',
        city: '',
        mechostIp: '',
        mechostName: '',
        userName: '',
        zipCode: '',
        hwcapabilities: [],
        coordinates: '',
        vim: 'K8S',
        origin: 'MEPM'
      }
      this.selectedArea = []
      this.capabilities = []
    },
    beforeDelete (row) {
      lcmController.getInstanceList().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach(item => {
            if (item.mecHost === row.mechostIp) {
              this.$message.error(this.$t('tip.deleteAppBeforeDeleteNode'))
            } else {
              this.showWarningBox(row)
            }
          })
        } else {
          this.showWarningBox(row)
        }
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.showWarningBox(row)
        }
      })
    },
    showWarningBox (row) {
      this.$confirm(this.$t('tip.confirmToDeleteNode'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.handleDelete(row)
      })
    },
    handleDelete (row) {
      lcmController.deleteHost(row.mechostIp).then(response => {
        this.showMessage('success', this.$t('tip.sucToDeleteNodes'), 1500)
        this.getNodeListInPage()
      }).catch(() => {
        this.$message.error(this.$t('tip.faileToDeleteNode'))
      })
    },
    register () {
      this.editType = 1
      this.title = this.$t('system.edgeNodes.nodeReg')
      this.resetForm()
      this.isDisable = false
      this.dialogVisible = true
      this.area = true
      this.$nextTick(() => {
        this.$refs.currForm.resetFields()
      })
    },
    beforeUpload (file) {
      console.log(file)
    },
    async submitUpload (content) {
      let params = new FormData()
      params.append('configFile', content.file)
      params.append('hostIp', this.currForm.mechostIp)
      if (this.currForm.mechostIp) {
        lcmController.uploadConfig(params).then(response => {
          this.showMessage('success', this.$t('tip.uploadSuc'), 1500)
          this.dialogVisibleUpload = false
        }).catch((error) => {
          console.log(error)
          this.$message.error("File shouldn't contain any extension or filename is larger than max size")
          this.fileList = []
        })
      } else {
        this.$message.error(this.$t('tip.typeApp'))
        this.fileList = []
      }
    },
    getNodeListInPage () {
      lcmController.getHostList().then(response => {
        this.tableData = this.paginationData = response.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.failedToGetList'))
        }
      })
    },
    confirm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.setCapabilities()
          if (this.editType === 1) {
            lcmController.createHost(this.currForm).then(response => {
              this.showMessage('success', this.$t('tip.sucToRegNode'), 1500)
              this.getNodeListInPage()
              this.dialogVisible = false
              this.area = false
              this.isDisable = false
            }).catch(() => {
              this.$message.error(this.$t('tip.failToAddNode'))
            })
          } else {
            lcmController.modifyHost(this.currForm).then(response => {
              this.showMessage('success', this.$t('tip.sucToModNode'), 1500)
              this.getNodeListInPage()
              this.dialogVisible = false
              this.area = false
              this.isDisable = false
              this.resetForm()
            }).catch(() => {
              this.$message.error(this.$t('tip.failToModifyNode'))
            })
          }
        }
      })
    },
    setCapabilities () {
      this.currForm.hwcapabilities = []
      if (this.capabilities.length > 0) {
        if (this.capabilities.includes('GPU')) {
          let obj = {}
          obj.hwType = 'GPU'
          obj.hwVendor = this.gpuVendor
          obj.hwModel = this.gpuModel
          this.currForm.hwcapabilities.push(obj)
        }
        if (this.capabilities.includes('NPU')) {
          let obj = {}
          obj.hwType = 'NPU'
          obj.hwVendor = this.npuVendor
          obj.hwModel = this.npuModel
          this.currForm.hwcapabilities.push(obj)
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.edge_list{
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
  .sysk8s{
    height: 100%;
    background: #fff;
    padding: 30px 60px;
    border-radius: 20px;
    box-shadow: 0 6px 68px 0 rgba(94, 64, 200, 0.06);
    .referCoord{
      height:25px;
      font-size: 12px;
      a{
        color: #166bea;
      }
    }
  }
  .el-col{
    padding-left:0 !important;
  }
}
</style>
