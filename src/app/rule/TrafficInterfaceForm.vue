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
    width="30%"
    :visible.sync="dialogVisible"
    append-to-body
    class="default_dialog"
  >
    <div
      slot="title"
      class="el-dialog__title"
    >
      <em class="title_icon" />
      {{ interfaceDlgType==="createDlg" ? $t('app.ruleConfig.addNewInterfaceInfo'):$t('app.ruleConfig.editInterfaceInfo') }}
    </div>
    <el-row>
      <el-form
        label-width="auto"
        :model="trafficInterface"
        ref="trafficInterface"
        :rules="formInterfaceRules"
        size="small"
      >
        <p class="title">
          {{ $t('app.ruleConfig.interfaceInfo') }}
        </p>
        <el-form-item
          :label="$t('app.ruleConfig.interfaceType')"
          prop="interfaceType"
        >
          <el-select
            v-model="trafficInterface.interfaceType"
            :placeholder="$t('tip.pleaseSelect')"
          >
            <el-option
              v-for="item in interfaceType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <p class="title">
          {{ $t('app.ruleConfig.tunnelInfo') }}
        </p>
        <el-form-item
          :label="$t('app.ruleConfig.tunnelType')"
          prop="tunnelType"
        >
          <el-select
            v-model="trafficInterface.TunnelInfo.tunnelType"
            :placeholder="$t('tip.pleaseSelect')"
          >
            <el-option
              v-for="item in tunnelType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('app.ruleConfig.srcTunnelAddress')"
          prop="tunnelSrcAddress"
        >
          <el-input
            v-model="trafficInterface.TunnelInfo.tunnelSrcAddress"
          />
        </el-form-item>
        <el-form-item
          :label="$t('app.ruleConfig.dstTunnelAddress')"
          prop="tunnelDstAddress"
        >
          <el-input
            v-model="trafficInterface.TunnelInfo.tunnelDstAddress"
          />
        </el-form-item>
        <el-form-item
          :label="$t('app.ruleConfig.tunnelSpecificData')"
          prop="tunnelSpecificData"
        >
          <el-input
            v-model="trafficInterface.TunnelInfo.tunnelSpecificData"
          />
        </el-form-item>
        <p class="title">
          {{ $t('app.ruleConfig.macInfo') }}
        </p>
        <el-form-item
          :label="$t('app.ruleConfig.srcMacAddress')"
          prop="srcMacAddress"
        >
          <el-input
            v-model="trafficInterface.srcMacAddress"
          />
        </el-form-item>
        <el-form-item
          :label="$t('app.ruleConfig.dstMacAddress')"
          prop="dstMacAddress"
        >
          <el-input
            v-model="trafficInterface.dstMacAddress"
          />
        </el-form-item>
        <p class="title">
          {{ $t('app.ruleConfig.ipInfo') }}
        </p>
        <el-form-item
          :label="$t('app.ruleConfig.dstAddress')"
          prop="dstIpAddress"
        >
          <el-input
            v-model="trafficInterface.dstIpAddress"
          />
        </el-form-item>
      </el-form>
    </el-row>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="cancelAction('trafficInterface')"
        class="bgBtn"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="bgBtn"
        @click="confirmToAdd('trafficInterface')"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    interfaceDlgType: {
      required: true,
      type: String
    },
    trafficInterface: {
      required: true,
      type: Object
    },
    interfaceIndex: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      dialogVisible: true,
      interfaceType: [
        {
          value: 'TUNNEL',
          label: 'TUNNEL'
        },
        {
          value: 'MAC',
          label: 'MAC'
        },
        {
          value: 'IP',
          label: 'IP'
        }
      ],
      tunnelType: [
        {
          value: 'GTP-U',
          label: 'GTP-U'
        },
        {
          value: 'GRE',
          label: 'GRE'
        }
      ]
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
          if (this.interfaceIndex !== -1) {
            let _data = {
              type: 'edit',
              index: this.interfaceIndex,
              value: this.trafficInterface
            }
            this.$emit('reloadInterfaceTableData', _data)
          } else {
            let _data = {
              type: 'add',
              value: this.trafficInterface
            }
            this.$emit('reloadInterfaceTableData', _data)
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
    },
    formInterfaceRules () {
      return {
        tunnelDstAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        tunnelSrcAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        srcMacAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, message: this.$t('verify.normalVerify') }
        ],
        dstMacAddress: [
          { required: false, message: this.$t('tip.macMust'), trigger: 'blur' },
          { pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, message: this.$t('verify.normalVerify') }
        ],
        dstIpAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ]
      }
    }
  }
}
</script>
