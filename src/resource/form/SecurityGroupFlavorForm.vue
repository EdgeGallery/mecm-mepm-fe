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
          :label="$t('resourceMgr.openPort')"
          prop="openPort"
          class="w50"
        >
          <el-select
            size="small"
            :style="{width: '100%'}"
            v-model="securityGroupFlavorForm.openPort"
          >
            <el-option
              v-for="item in portList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click.native="getSelectPortType(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.port')"
          prop="port"
          class="w50"
          v-if="isPortType"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.port"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.portRangeMin')"
          prop="portRangeMin"
          class="w50"
          v-if="isPortRangeType"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.portRangeMin"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.portRangeMax')"
          prop="portRangeMax"
          class="w50"
          v-if="isPortRangeType"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.portRangeMax"
          />
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
          :label="$t('resourceMgr.remote')"
          prop="remote"
          class="w50"
        >
          <el-select
            size="small"
            :style="{width: '100%'}"
            v-model="securityGroupFlavorForm.remote"
          >
            <el-option
              v-for="item in remoteList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click.native="getSelectRemoteType(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="CIDR"
          prop="remoteIpPrefix"
          class="w50"
          v-if="isCIDR"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.remoteIpPrefix"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.securityGroup')"
          prop="remoteGroupId"
          class="w50"
          v-if="!isCIDR"
        >
          <el-select
            size="small"
            v-model="securityGroupFlavorForm.remoteGroupId"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in remoteGroupList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.ethertype')"
          prop="ethertype"
          class="w50"
          v-if="!isCIDR"
        >
          <el-select
            size="small"
            v-model="securityGroupFlavorForm.ethertype"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in ethertypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
    },
    securityGroupId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      dialogVisible: true,
      ruleList: [
        { label: 'tcp', value: 'tcp' },
        { label: 'udp', value: 'udp' },
        { label: 'icmp', value: 'icmp' }
      ],
      directList: [
        { label: '入口', value: 'ingress' },
        { label: '出口', value: 'egress' }
      ],
      ethertypeList: [
        { label: 'IPv4', value: 'IPv4' },
        { label: 'IPv6', value: 'IPv6' }
      ],
      portList: [
        { label: '端口', value: 'port' },
        { label: '端口范围', value: 'portRange' },
        { label: '所有端口', value: 'allPort' }
      ],
      remoteList: [
        { label: 'CIDR', value: 'CIDR' },
        { label: '安全组', value: 'securityGroup' }
      ],
      isPortType: true,
      isPortRangeType: false,
      isCIDR: true,
      securityGroupFlavorForm: {
        rule: '',
        direct: '',
        ethertype: '',
        description: '',
        port: '',
        openPort: '',
        remote: '',
        portRangeMin: '',
        portRangeMax: '',
        remoteIpPrefix: '',
        remoteGroupId: ''
      },
      rules: {
        direct: [{ required: true, message: '方向不能为空', trigger: 'blur' }],
        openPort: [{ required: true, message: '端口类型不能为空', trigger: 'blur' }],
        remote: [{ required: true, message: '根磁盘不能为空', trigger: 'blur' }],
        cidr: [{ required: true, message: '临时磁盘不能为空', trigger: 'blur' }]
      },
      remoteGroupList: []
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
        securityGroupId: this.securityGroupId,
        direction: this.securityGroupFlavorForm.direct,
        protocol: this.securityGroupFlavorForm.rule,
        ethertype: this.securityGroupFlavorForm.ethertype,
        port_range_min: parseInt(this.securityGroupFlavorForm.portRangeMin, 10),
        port_range_max: parseInt(this.securityGroupFlavorForm.portRangeMax, 10),
        remoteIpPrefix: this.securityGroupFlavorForm.remoteIpPrefix,
        remoteGroupId: this.securityGroupFlavorForm.remoteGroupId
      }
      resController.createSecurityGroupRule(hostIp, this.securityGroupId, params).then(res => {
        this.$message.success(this.$t('resourceMgr.createSecurityGroupFlavorSuccess'))
        this.$emit('reloadTableData')
        this.handleClose()
      }).catch((error) => {
        console.log(error)
        this.handleClose()
      })
    },
    cancelAction () {
      this.handleClose()
    },
    getSelectPortType (item) {
      if (item.value === 'port') {
        this.isPortType = true
        this.isPortRangeType = false
        // Todo
      } else if (item.value === 'portRange') {
        this.isPortRangeType = true
        this.isPortType = false
      } else {
        this.isPortType = false
        this.isPortRangeType = false
      }
    },
    getSelectRemoteType (item) {
      if (item.value === 'CIDR') {
        this.isCIDR = true
      } else {
        this.isCIDR = false
      }
    },
    getRemoteGroupList () {
      let hostIp = sessionStorage.getItem('hostIp')
      resController.querySecurityGroupsByMechost(hostIp).then(res => {
        res.data.data.forEach(item => {
          let securityGroupItem = {
            label: item.name,
            value: item.id
          }
          this.remoteGroupList.push(securityGroupItem)
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getRemoteGroupList()
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
