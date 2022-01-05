<!--
  -  Copyright 2022 Huawei Technologies Co., Ltd.
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
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="75%"
    class="default_dialog"
  >
    <div
      slot="title"
      class="el-dialog__title"
    >
      <em class="title_icon" />
      {{ managerDlgType==="createDlg" ? $t('app.ruleConfig.addTrafficRule'):$t('app.ruleConfig.editTrafficRule') }}
    </div>
    <div>
      <el-form
        label-width="auto"
        :model="appTrafficRule"

        ref="appTrafficRule"
        :rules="formRules"
        size="small"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              :label="$t('app.ruleConfig.trafficRuleId')"
              prop="trafficRuleId"
            >
              <el-input
                id=""
                maxlength="30"
                v-model="appTrafficRule.trafficRuleId"
              />
            </el-form-item>
            <el-form-item
              :label="$t('app.ruleConfig.priority')"
            >
              <el-input-number
                v-model="appTrafficRule.priority"
                :min="1"
                :max="255"
                label="1-255"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('app.ruleConfig.action')"
            >
              <el-select
                v-model="appTrafficRule.action"
                :placeholder="$t('tip.pleaseSelect')"
              >
                <el-option
                  v-for="item in action"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('app.ruleConfig.filterType')"
            >
              <el-select
                v-model="appTrafficRule.filterType"
                :placeholder="$t('tip.pleaseSelect')"
              >
                <el-option
                  v-for="item in filterType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 新增Filter -->
      <div>
        <p class="title">
          {{ $t('app.ruleConfig.trafficFilter') }}
          <el-button-group class="rt">
            <el-button
              type="text"
              class="btn"
              @click="addNew(1)"
            >
              {{ $t('app.instanceList.addFilter') }}
            </el-button>
          </el-button-group>
        </p>

        <!-- filter table -->
        <el-table
          class="mt20"
          :data="trafficFilterData"
          border
          size="small"
          style="width: 100%;"
        >
          <el-table-column
            prop="srcAddress"
            :label="$t('app.ruleConfig.srcAddress')"
            width="120px"
          />
          <el-table-column
            prop="srcPort"
            :label="$t('app.ruleConfig.srcPort')"
          />
          <el-table-column
            prop="dstAddress"
            :label="$t('app.ruleConfig.dstAddress')"
            width="120px"
          />
          <el-table-column
            prop="dstPort"
            :label="$t('app.ruleConfig.dstPort')"
          />
          <el-table-column
            prop="dstTunnelAddress"
            :label="$t('app.ruleConfig.dstTunnelAddress')"
          />
          <el-table-column
            prop="dstTunnelPort"
            :label="$t('app.ruleConfig.srcTunnelPort')"
            width="120px"
          />
          <el-table-column
            prop="srcTunnelAddress"
            :label="$t('app.ruleConfig.srcTunnelAddress')"
            width="120px"
          />
          <el-table-column
            prop="srcTunnelPort"
            :label="$t('app.ruleConfig.dstTunnelPort')"
            width="120px"
          />
          <el-table-column
            prop="tag"
            label="Tag"
          />
          <el-table-column
            prop="qCI"
            label="QCI"
          />
          <el-table-column
            prop="dSCP"
            label="DSCP"
          />
          <el-table-column
            prop="tC"
            label="TC"
          />
          <el-table-column
            :label="$t('common.operation')"
            width="120"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                id=""
                type="text"
                size="small"
                @click="modifyLines(scope.$index,scope.row,1)"
              >
                {{ $t('common.modify') }}
              </el-button>
              <el-button
                id="deleteBtn"
                type="text"
                size="small"
                @click="deleteLines(scope.$index, trafficFilterData)"
              >
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 新增interface -->
      <div>
        <p class="title">
          {{ $t('app.ruleConfig.interfaceDescriptor') }}
          <el-button-group class="rt">
            <el-button
              type="text"
              class="btn"
              @click="addNew(2)"
            >
              {{ $t('app.ruleConfig.addNewInterfaceInfo') }}
            </el-button>
          </el-button-group>
        </p>

        <!-- interface table -->
        <div>
          <el-table
            class="mt20"
            :data="trafficInterfaceData"
            border
            size="small"
            style="width: 100%;"
          >
            <el-table-column
              prop="interfaceType"
              :label="$t('app.ruleConfig.interfaceType')"
            />
            <el-table-column
              prop="tunnelInfo.tunnelType"
              :label="$t('app.ruleConfig.tunnelType')"
            />
            <el-table-column
              prop="tunnelInfo.tunnelDstAddress"
              :label="$t('app.ruleConfig.dstTunnelAddress')"
              width="120px"
            />
            <el-table-column
              prop="tunnelInfo.tunnelSrcAddress"
              :label="$t('app.ruleConfig.srcTunnelAddress')"
            />
            <el-table-column
              prop="tunnelInfo.tunnelSpecificData"
              :label="$t('app.ruleConfig.tunnelSpecificData')"
            />
            <el-table-column
              prop="dstMacAddress"
              :label="$t('app.ruleConfig.dstMacAddress')"
            />
            <el-table-column
              prop="srcMacAddress"
              :label="$t('app.ruleConfig.srcMacAddress')"
            />
            <el-table-column
              prop="dstIpAddress"
              :label="$t('app.ruleConfig.dstAddress')"
            />
            <el-table-column
              :label="$t('common.operation')"
              width="120"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  id=""
                  type="text"
                  size="small"
                  @click="modifyLines(scope.$index,scope.row,2)"
                >
                  {{ $t('common.modify') }}
                </el-button>
                <el-button
                  id="deleteBtn"
                  type="text"
                  size="small"
                  @click="deleteLines(scope.$index, trafficInterfaceData)"
                >
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- Filter dialog -->
      <div v-if="isShowTrafficFilterForm">
        <TrafficFilterForm
          v-model="isShowTrafficFilterForm"
          :filter-dlg-type="filterDlgType"
          :traffic-filter="trafficFilter"
          :filter-index="filterIndex"
          @reloadFilterTableData="reloadFilterTableData"
        />
      </div>

      <!-- interface dialog -->
      <div v-if="isShowTrafficInterfaceForm">
        <TrafficInterfaceForm
          v-model="isShowTrafficInterfaceForm"
          :interface-dlg-type="interfaceDlgType"
          :traffic-interface="trafficInterface"
          :interface-index="interfaceIndex"
          @reloadInterfaceTableData="reloadInterfaceTableData"
        />
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        id="cancelBtn"
        class="bgBtn"
        @click="cancelAction"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="confirmBtn"
        class="bgBtn"
        @click="confirmToAddTraRules"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { appRuleMgr } from '../../tools/request.js'
import TrafficFilterForm from './TrafficFilterForm.vue'
import TrafficInterfaceForm from './TrafficInterfaceForm.vue'
export default {
  components: {
    TrafficFilterForm,
    TrafficInterfaceForm
  },
  props: {
    appRule: {
      required: true,
      type: Object
    },
    managerDlgType: {
      required: true,
      type: String
    },
    appTrafficRule: {
      required: true,
      type: Object
    },
    trafficFilterData: {
      required: true,
      type: Array
    },
    trafficInterfaceData: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: true,
      isShowTrafficFilterForm: false,
      isShowTrafficInterfaceForm: false,
      type: 1,
      trafficFilter: {
        srcAddress: '192.168.1.1/32',
        srcPort: '8080',
        dstAddress: '192.168.1.1/32',
        dstPort: '8080',
        protocol: 'ANY',
        qCI: 0,
        dSCP: 0,
        tC: 0,
        tag: 'tag',
        srcTunnelAddress: '1.1.1.1',
        srcTunnelPort: '8080',
        dstTunnelAddress: '2.2.2.2',
        dstTunnelPort: '8080'
      },
      trafficInterface: {
        interfaceType: 'TUNNEL',
        TunnelInfo: {
          tunnelType: 'GRE',
          tunnelDstAddress: '3.3.3.3',
          tunnelSrcAddress: '4.4.4.4',
          tunnelSpecificData: 'any'
        },
        srcMacAddress: '02-00-00-00-00-00',
        dstMacAddress: '02-00-00-00-00-00',
        dstIpAddress: '5.5.5.5'
      },
      filterType: [
        {
          value: 'FLOW',
          label: 'FLOW'
        },
        {
          value: 'PACKET',
          label: 'PACKET'
        }
      ],
      action: [
        {
          value: 'DROP',
          label: 'DROP'
        },
        {
          value: 'FORWARD_DECAPSULATED',
          label: 'FORWARD_DECAPSULATED'
        },
        {
          value: 'FORWARD_AS_IS',
          label: 'FORWARD_AS_IS'
        },
        {
          value: 'PASSTHROUGH',
          label: 'PASSTHROUGH'
        },
        {
          value: 'SUPLICATED_DECAPSULATED',
          label: 'SUPLICATED_DECAPSULATED'
        }

      ]
    }
  },
  methods: {
    cancelAction () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    addNew (type) {
      if (type === 1) {
        this.filterIndex = -1
        this.filterDlgType = 'createDlg'
        this.isShowTrafficFilterForm = true
      } else {
        this.interfaceIndex = -1
        this.interfaceDlgType = 'createDlg'
        this.isShowTrafficInterfaceForm = true
      }
    },
    modifyLines (index, row, type) {
      if (type === 1) {
        this.filterIndex = index
        this.trafficFilter = JSON.parse(JSON.stringify(row))
        this.filterDlgType = 'editDlg'
        this.isShowTrafficFilterForm = true
      } else {
        this.interfaceIndex = index
        this.trafficInterface = JSON.parse(JSON.stringify(row))
        this.interfaceDlgType = 'editDlg'
        this.isShowTrafficInterfaceForm = true
      }
    },
    deleteLines (index, rows) {
      rows.splice(index, 1)
    },
    confirmToAddTraRules () {
      let data = JSON.parse(JSON.stringify(this.trafficFilterData))
      data.forEach(item => {
        item.srcAddress = this.changeSToA(item.srcAddress)
        item.srcPort = this.changeSToA(item.srcPort)
        item.dstAddress = this.changeSToA(item.dstAddress)
        item.dstPort = this.changeSToA(item.dstPort)
        item.protocol = this.changeSToA(item.protocol)
        item.srcTunnelAddress = this.changeSToA(item.srcTunnelAddress)
        item.dstTunnelAddress = this.changeSToA(item.dstTunnelAddress)
        item.srcTunnelPort = this.changeSToA(item.srcTunnelPort)
        item.dstTunnelPort = this.changeSToA(item.dstTunnelPort)
        item.tag = this.changeSToA(item.tag)
      })
      this.appTrafficRule.trafficFilter = data
      this.appTrafficRule.dstInterface = this.trafficInterfaceData
      this.addAppRules()
    },
    changeSToA (str) {
      return str.split(',')
    },
    addAppRules () {
      this.$refs.appTrafficRule.validate((valid) => {
        if (valid) {
          let data = {
            appTrafficRule: [...this.appRule.appTrafficRule],
            appDnsRule: [...this.appRule.appDnsRule],
            appName: this.appName,
            appSupportMp1: true
          }
          this.isShowTrafficManagerDlg = false
          data.appTrafficRule.push(this.appTrafficRule)
          if (data.appTrafficRule.length > 0) {
            this.type = 2
          }
          console.log('data -> ', data)
          console.log('type -> ', this.type)
          appRuleMgr.addConfigRules(this.type, sessionStorage.getItem('instanceId'), data).then(res => {
            if (res.data) {
              this.handleResponse(res)
              this.$emit('reloadTableData')
              this.cancelAction()
            }
          }).catch(err => {
            console.log('error modifying traffic rule', err)
            this.cancelAction()
          }
          )
        }
      })
    },
    handleResponse (res) {
      if (res.data.configResult === 'FAILURE') {
        this.$message.error(this.$t('app.ruleConfig.mepError'))
      } else {
        if (this.managerDlgType === 'createDlg') {
          this.showMessage('success', this.$t('app.ruleConfig.addRuleSuc'), 1500)
        } else {
          this.showMessage('success', this.$t('app.ruleConfig.editRuleSuc'), 1500)
        }
      }
    },
    reloadFilterTableData (data) {
      if (data.type === 'edit') {
        this.trafficFilterData[data.index] = data.value
        this.$set(this.trafficFilterData, data.index, data.value)
      } else {
        this.trafficFilterData.push(data.value)
      }
    },
    reloadInterfaceTableData (data) {
      if (data.type === 'edit') {
        this.trafficInterfaceData[data.index] = data.value
        this.$set(this.trafficInterfaceData, data.index, data.value)
      } else {
        this.trafficInterfaceData.push(data.value)
      }
    }
  },
  computed: {
    formRules () {
      return {
        trafficRuleId: [
          { required: true, message: this.$t('idMust'), trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
