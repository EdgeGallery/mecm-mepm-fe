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
    width="50%"
    :visible.sync="dialogVisible"
    append-to-body
    class="default_dialog"
  >
    <div
      slot="title"
      class="el-dialog__title"
    >
      <em class="title_icon" />
      {{ filterDlgType==="createDlg" ? $t('app.ruleConfig.addTrafficRule'):$t('app.ruleConfig.editTrafficRule') }}
    </div>
    <el-row>
      <el-form
        label-width="auto"
        :model="trafficFilter"
        ref="trafficFilter"
        :rules="formTrafficfilterRules"
        size="small"
      >
        <el-col :span="12">
          <el-form-item
            :label="$t('app.ruleConfig.srcAddress')"
            prop="srcAddress"
          >
            <el-input
              id=""
              maxlength="30"
              v-model="trafficFilter.srcAddress"
              :placeholder="$t('app.ruleConfig.mutipleIp')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.srcPort')"
            prop="srcPort"
          >
            <el-input
              id=""
              maxlength="30"
              v-model="trafficFilter.srcPort"
              :placeholder="$t('app.ruleConfig.mutiplePort')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.dstAddress')"
            prop="dstAddress"
          >
            <el-input
              id=""
              maxlength="30"
              v-model="trafficFilter.dstAddress"
              :placeholder="$t('app.ruleConfig.mutipleIp')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.dstPort')"
            prop="dstPort"
          >
            <el-input
              id=""
              maxlength="30"
              v-model="trafficFilter.dstPort"
              :placeholder="$t('app.ruleConfig.mutiplePort')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.tag')"
            prop="tag"
          >
            <el-input
              v-model="trafficFilter.tag"
              :placeholder="$t('app.ruleConfig.mutipleTag')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.protocol')"
            prop="protocol"
          >
            <el-input
              id=""
              maxlength="30"
              v-model="trafficFilter.protocol"
              :placeholder="$t('app.ruleConfig.mutipleProtocol')"
            />
          </el-form-item>
          <el-form-item
            label="QCI"
            prop="qCI"
          >
            <el-input-number
              v-model="trafficFilter.qCI"
              maxlength="30"
              id=""
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="DSCP"
            prop="dSCP"
          >
            <el-input-number
              id=""
              maxlength="30"
              v-model="trafficFilter.dSCP"
            />
          </el-form-item>
          <el-form-item
            label="TC"
            prop="tc"
          >
            <el-input-number
              id=""
              maxlength="30"
              v-model="trafficFilter.tC"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.dstTunnelAddress')"
            prop="dstTunnelAddress"
          >
            <el-input
              v-model="trafficFilter.dstTunnelAddress"
              :placeholder="$t('app.ruleConfig.mutipleIp')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.srcTunnelPort')"
            prop="dstTunnelPort"
          >
            <el-input
              v-model="trafficFilter.dstTunnelPort"
              :placeholder="$t('app.ruleConfig.mutiplePort')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.srcTunnelAddress')"
            prop="srcTunnelAddress"
          >
            <el-input
              v-model="trafficFilter.srcTunnelAddress"
              :placeholder="$t('app.ruleConfig.mutipleIp')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.dstTunnelPort')"
            prop="srcTunnelPort"
          >
            <el-input
              v-model="trafficFilter.srcTunnelPort"
              :placeholder="$t('app.ruleConfig.mutiplePort')"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="cancelAction('trafficFilter')"
        class="bgBtn"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="bgBtn"
        @click="confirmToAdd('trafficFilter')"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    filterDlgType: {
      required: true,
      type: String
    },
    trafficFilter: {
      required: true,
      type: Object
    },
    filterIndex: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    cancelAction () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    confirmToAdd (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.filterIndex !== -1) {
            let _data = {
              type: 'edit',
              index: this.filterIndex,
              value: this.trafficFilter
            }
            this.$emit('reloadFilterTableData', _data)
          } else {
            let _data = {
              type: 'add',
              value: this.trafficFilter
            }
            this.$emit('reloadFilterTableData', _data)
          }
        }
        this.cancelAction()
      })
    }
  },
  computed: {
    formTrafficfilterRules () {
      return {
        srcAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        srcPort: [
          { required: false, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^\d{4,5}(,+\d{4,5})*$/, message: this.$t('verify.normalVerify') }
        ],
        dstAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        dstPort: [
          { required: false, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^\d{4,5}(,+\d{4,5})*$/, message: this.$t('verify.normalVerify') }
        ],
        srcTunnelAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        srcTunnelPort: [
          { required: false, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^\d{4,5}(,+\d{4,5})*$/, message: this.$t('verify.normalVerify') }
        ],
        dstTunnelAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        dstTunnelPort: [
          { required: false, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^\d{4,5}(,+\d{4,5})*$/, message: this.$t('verify.normalVerify') }
        ]
      }
    }
  }
}
</script>
