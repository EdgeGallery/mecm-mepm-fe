<!--
  - Copyright 2021 Huawei Technologies Co., Ltd.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->
<template>
  <div class="securityGroupFlavor-form">
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        {{ dlgType==="createDlg" ? $t('resourceMgr.addSecurityGroupFlavor'):$t('resourceMgr.editSecurityGroupFlavor') }}
      </div>
      <el-form
        :model="securityGroupFlavorForm"
        ref="form"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item
          :label="$t('resourceMgr.rule')"
          prop="rule"
          class="w50"
        >
          <el-select
            size="small"
            v-model="securityGroupFlavorForm.rule"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in ruleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.direct')"
          prop="direct"
          class="w50"
        >
          <el-select
            size="small"
            v-model="securityGroupFlavorForm.direct"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in directList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.description')"
          prop="description"
          class="w100"
        >
          <el-input
            size="small"
            type="textarea"
            v-model="securityGroupFlavorForm.description"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.openPort')"
          prop="openPort"
          class="w50"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.openPort"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.port')"
          prop="port"
          class="w50"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.port"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.remote')"
          prop="remote"
          class="w50"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.remote"
          />
        </el-form-item>
        <el-form-item
          label="CIDR"
          prop="cidr"
          class="w50"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.cidr"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="medium"
          @click="cancelAction"
          class="bgBtn"
        >
          {{ $t('resourceMgr.cancel') }}
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="confirmAction"
          class="bgBtn"
        >
          {{ $t('resourceMgr.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { resController } from '../../tools/request.js'
export default {
  components: {
  },
  props: {
    dlgType: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      dialogVisible: true,
      ruleList: [
        { label: '规则1', value: '1' },
        { label: '规则2', value: '2' },
        { label: '规则3', value: '3' }
      ],
      directList: [
        { label: '出口1', value: '1' },
        { label: '出口2', value: '2' },
        { label: '出口3', value: '3' }
      ],
      securityGroupFlavorForm: {
        rule: '',
        direct: '',
        description: '',
        openPort: '',
        port: '',
        remote: '',
        cidr: ''
      },
      rules: {
        rule: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        openPort: [{ required: true, message: 'VCPU不能为空', trigger: 'blur' }],
        port: [{ required: true, message: '内存不能为空', trigger: 'blur' }],
        remote: [{ required: true, message: '根磁盘不能为空', trigger: 'blur' }],
        cidr: [{ required: true, message: '临时磁盘不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    confirmAction () {
      let hostIp = sessionStorage.getItem('hostIp')
      let params = {
        securityGroupId: this.securityGroupFlavorForm.securityGroupId,
        direction: this.securityGroupFlavorForm.direction,
        protocol: this.securityGroupFlavorForm.protocol,
        ethertype: this.securityGroupFlavorForm.ethertype,
        port_range_min: this.securityGroupFlavorForm.port_range_min,
        port_range_max: this.securityGroupFlavorForm.port_range_max,
        remoteTpPrefix: this.securityGroupFlavorForm.remoteTpPrefix,
        remote_group_id: this.securityGroupFlavorForm.remote_group_id
      }
      resController.createSecurityGroupRule(hostIp, params).then(res => {
        // TODO
        this.$emit('reloadTableData')
      }).catch((error) => {
        console.log(error)
      })
      this.handleClose()
    },
    cancelAction () {
      this.handleClose()
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.securityGroupFlavor-form{
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .w100 {
    width: 100%;
    display: inline-block;
  }
  .el-input {
    width: 85%;
  }
}
</style>
