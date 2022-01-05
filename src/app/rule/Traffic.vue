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
  <div>
    <!-- pannel -->
    <div class="pannel">
      <el-button
        size="mini"
        class="btn"
        id="addTrafficRuleBtn"
        @click="showAddTrafficDlg"
      >
        {{ $t('app.instanceList.addTrafficRules') }}
      </el-button>
      <el-button
        size="mini"
        class="btn"
        id="batchDeleteTrafficBtn"
        @click="batchDeleteTrafficRule"
      >
        {{ $t('app.instanceList.batchDeleteTrafficRules') }}
      </el-button>

      <!-- trafficRuleTable -->
      <el-table
        v-loading="loading"
        class="mt20"
        :data="trafficRuleTableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          revers-selection
          width="50"
        />
        <el-table-column
          prop="trafficRuleId"
          :label="$t('app.ruleConfig.trafficRuleId')"
        />
        <el-table-column
          prop="filterType"
          :label="$t('app.ruleConfig.filterType')"
        />
        <el-table-column
          prop="priority"
          :label="$t('app.ruleConfig.priority')"
        />
        <el-table-column
          prop="action"
          :label="$t('app.ruleConfig.action')"
        />
        <el-table-column
          :label="$t('common.operation')"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              id=""
              type="text"
              size="small"
              @click="checkDetail(scope.row)"
            >
              {{ $t('app.ruleConfig.checkRules') }}
            </el-button>
            <el-button
              id=""
              type="text"
              size="small"
              @click="editTraRule(scope.$index, trafficRuleTableData)"
            >
              {{ $t('common.modify') }}
            </el-button>
            <el-button
              id=""
              type="text"
              size="small"
              @click="deleteTraRule(scope.$index,scope.row)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- check Detail dialog-->
    <div v-if="isShowDetail">
      <CheckTrafficDetail
        v-model="isShowDetail"
        :data="detail"
      />
    </div>
    <!-- all operation dialog -->
    <div v-if="isShowTrafficManagerDlg">
      <TrafficManager
        v-model="isShowTrafficManagerDlg"
        :app-rule="appRule"
        :manager-dlg-type="managerDlgType"
        :app-traffic-rule="appTrafficRule"
        :traffic-filter-data="trafficFilterData"
        :traffic-interface-data="trafficInterfaceData"
        @reloadTableData="reloadTableData"
      />
    </div>
  </div>
</template>

<script>
import { appRuleMgr } from '../../tools/request.js'
import TrafficManager from './TrafficManager.vue'
import CheckTrafficDetail from './CheckTrafficDetail.vue'
export default {
  props: {
    appRule: {
      required: true,
      type: Object
    }
  },
  components: {
    TrafficManager,
    CheckTrafficDetail
  },
  data () {
    return {
      timer: null,
      loading: false,
      isShowTrafficManagerDlg: false,
      managerDlgType: 'createDlg',
      filterDlgType: 'createDlg',
      interfaceDlgType: 'createDlg',
      isShowDetail: false,
      index: -1,
      appName: sessionStorage.getItem('instanceName'),
      rule: {
        appTrafficRule: [],
        appDnsRule: [],
        appName: '',
        appSupportMp1: true
      },
      detail: {},
      trafficRuleTableData: [],
      appTrafficRule: {
        trafficRuleId: '',
        action: 'DROP',
        filterType: 'FLOW',
        priority: 0,
        trafficFilter: [],
        dstInterface: []
      },
      trafficFilterData: [],
      trafficInterfaceData: [],
      selectedData: [],
      type: 1
    }
  },
  methods: {
    showAddTrafficDlg () {
      this.index = -1
      this.managerDlgType = 'createDlg'
      this.isShowTrafficManagerDlg = true
    },
    changeAToS (arr) {
      if (arr && arr.length > 0) {
        return arr.join(',')
      }
      return ''
    },
    handleSelectionChange (selection) {
      this.selectedData = selection
    },
    getAppRules () {
      appRuleMgr.getConfigRules(sessionStorage.getItem('instanceId')).then(res => {
        if (res.data) {
          this.type = 2
          this.rule = JSON.parse(JSON.stringify(res.data))
          this.appName = res.data.appName
          this.rule.appTrafficRule.forEach(val => {
            val.trafficFilter.forEach(item => {
              item.srcAddress = this.changeAToS(item.srcAddress)
              item.srcPort = this.changeAToS(item.srcPort)
              item.dstAddress = this.changeAToS(item.dstAddress)
              item.dstPort = this.changeAToS(item.dstPort)
              item.protocol = this.changeAToS(item.protocol)
              item.srcTunnelAddress = this.changeAToS(item.srcTunnelAddress)
              item.dstTunnelAddress = this.changeAToS(item.dstTunnelAddress)
              item.srcTunnelPort = this.changeAToS(item.srcTunnelPort)
              item.dstTunnelPort = this.changeAToS(item.dstTunnelPort)
              item.tag = this.changeAToS(item.tag)
            })
          })
          this.trafficRuleTableData = this.rule.appTrafficRule
        }
      })
      this.loading = false
      this.$emit('onChange')
    },
    handleResponse (res) {
      if (res.data.configResult === 'FAILURE') {
        this.$message.error(this.$t('app.ruleConfig.mepError'))
      } else {
        if (this.index === -1) {
          this.showMessage('success', this.$t('app.ruleConfig.addRuleSuc'), 1500)
        } else {
          this.showMessage('success', this.$t('app.ruleConfig.editRuleSuc'), 1500)
        }
      }
    },
    checkDetail (row) {
      this.detail = row
      this.isShowDetail = true
    },
    editTraRule (index, row) {
      this.index = index
      this.managerDlgType = 'editDlg'
      this.isShowTrafficManagerDlg = true
      this.appTrafficRule = row[index]
      this.trafficFilterData = row[index].trafficFilter
      this.trafficInterfaceData = row[index].dstInterface
    },
    batchDeleteTrafficRule () {
      if (this.selectedData.length > 0) {
        this.deleteTraRule(-1, this.selectedData)
      } else {
        this.$message.warning(this.$t('tip.oneAtLeast'))
      }
    },
    deleteTraRule (index, row) {
      this.$confirm(this.$t('tip.ifContinue'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        console.log('delete traffic rule, parent app rule -> ', this.appRule)
        let data = {
          appTrafficRule: [...this.appRule.appTrafficRule],
          appDnsRule: [...this.appRule.appDnsRule],
          appName: this.appName,
          appSupportMp1: true
        }
        if (index !== -1) {
          data.appTrafficRule = data.appTrafficRule.filter(rule => rule.trafficRuleId !== row.trafficRuleId)
        } else {
          row.forEach(item => {
            data.appTrafficRule = data.appTrafficRule.filter(rule => rule.trafficRuleId !== item.trafficRuleId)
          })
        }
        console.log('delete data', data)
        appRuleMgr.addConfigRules(2, sessionStorage.getItem('instanceId'), data).then(response => {
          if (response.data) {
            if (response.data.configResult === 'FAILURE') {
              this.$message.error(this.$t('app.ruleConfig.mepError'))
            } else {
              if (this.index === -1) {
                this.showMessage('success', this.$t('app.ruleConfig.addRuleSuc'), 1500)
              } else {
                this.showMessage('success', this.$t('app.ruleConfig.editRuleSuc'), 1500)
              }
            }
            this.loading = true
            this.timer = setTimeout(() => { this.getAppRules() }, 3000)
          }
        }).catch(err => {
          console.log('error modifying traffic rule', err)
          this.getAppRules()
        }
        )
      })
    },
    reloadTableData () {
      this.getAppRules()
    }
  },
  mounted () {
    this.getAppRules()
  },
  beforeDestroy () {
    this.timer = null
    clearTimeout(this.timer)
  }
}

</script>
<style lang='less' scoped>
.btn{
  margin:15px 15px 15px 0;
}
</style>
