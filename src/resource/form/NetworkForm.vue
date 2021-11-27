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
  <div class="network-form">
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
        <em class="title_icon" />{{ $t('resourceMgr.createNetwork') }}
      </div>
      <el-form
        :model="createNetworkForm"
        ref="form"
        :rules="rules"
        label-position="right"
        :label-width="language==='cn'? '100px': '130px'"
      >
        <el-form-item
          :label="$t('resourceMgr.networkName')"
          prop="networkName"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createNetworkForm.networkName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.networkAddr')"
          prop="networkAddr"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createNetworkForm.networkAddr"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.ipVersion')"
          prop="ipVersion"
          class="w50"
        >
          <el-select
            size="small"
            v-model="createNetworkForm.ipVersion"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in ipVersions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.gatewayIP')"
          prop="gatewayIP"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createNetworkForm.gatewayIp"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.subnetName')"
          prop="subnetName"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createNetworkForm.subnetName"
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
  },
  data () {
    return {
      dialogVisible: true,
      ipVersions: [
        { label: '1.0', value: '1.0' },
        { label: '2.0', value: '2.0' },
        { label: '3.0', value: '3.0' }
      ],
      createNetworkForm: {
        networkName: '',
        networkAddr: '',
        ipVersion: '',
        gatewayIP: '',
        subnetName: ''
      },
      rules: {
        networkName: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        networkAddr: [{ required: true, message: '网络地址不能为空', trigger: 'blur' }],
        ipVersion: [{ required: true, message: 'IP版本不能为空', trigger: 'blur' }],
        gatewayIP: [{ required: true, message: '网关IP不能为空', trigger: 'blur' }],
        subnetName: [{ required: true, message: '子网名称不能为空', trigger: 'blur' }]
      },
      language: localStorage.getItem('language')
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
        name: this.createFlavorForm.flavorName,
        vcpus: this.createFlavorForm.flavorVCPU,
        ram: this.createFlavorForm.flavorRAM,
        disk: this.createFlavorForm.flavorRootDisk,
        swap: this.createFlavorForm.flavorSwapDisk,
        extraSpecs: this.createFlavorForm.extraSpecs
      }
      resController.createNetwork(hostIp, params).then(res => {
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
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>
<style lang="less" scoped>
.network-form{
  .w50 {
    width: 50%;
    display: inline-block;
  }
}
</style>
