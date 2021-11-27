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
  <div class="image-form">
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
        <em class="title_icon" />{{ $t('resourceMgr.createImage') }}
      </div>
      <el-form
        :model="createImageForm"
        ref="form"
        :rules="rules"
        label-position="right"
        :label-width="language==='cn'? '100px': '120px'"
      >
        <el-form-item
          :label="$t('resourceMgr.imageName')"
          prop="name"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.name"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.containerFormat')"
          prop="containerFormat"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.containerFormat"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.diskFormat')"
          prop="diskFormat"
          class="w50"
        >
          <el-select
            size="small"
            v-model="createImageForm.diskFormat"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in diskFormatList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.properties')"
          prop="properties"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.properties"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.minDisk')"
          prop="minDisk"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.minDisk"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.minRam')"
          prop="minRam"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.minRam"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.resourceUri')"
          prop="resourceUri"
          class="w100"
        >
          <el-input
            size="small"
            v-model="createImageForm.resourceUri"
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
      diskFormatList: [
        { label: 'diskType1', value: 'diskType1' },
        { label: 'diskType2', value: 'diskType2' },
        { label: 'diskType3', value: 'diskType3' }
      ],
      createImageForm: {
        name: '',
        containerFormat: '',
        diskFormat: '',
        minRam: '',
        minDisk: '',
        porperties: {},
        resourceUri: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        minRam: [{ required: true, message: '最小内存不能为空', trigger: 'blur' }],
        minDisk: [{ required: true, message: '最小磁盘不能为空', trigger: 'blur' }],
        resourceUri: [{ required: true, message: '镜像源不能为空', trigger: 'blur' }]
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
        name: this.createImageForm.name,
        containerFormat: this.createImageForm.containerFormat,
        diskFormat: this.createImageForm.diskFormat,
        minRam: this.createImageForm.minRam,
        minDisk: this.createImageForm.minDisk,
        properties: this.createImageForm.properties
      }
      resController.createImage(hostIp, params).then(res => {
        // TODO
        let imageId = res.data.data.imageId
        this.importImage(hostIp, imageId)
      }).catch((error) => {
        console.log(error)
      })
      this.handleClose()
    },
    importImage (hostIp, imageId) {
      resController.importImage(hostIp, imageId, this.createImageForm.resourceUri).then(res => {
        // TODO
        this.$emit('reloadTableData')
      }).catch((error) => {
        console.log(error)
      })
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
.image-form{
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .w100 {
    width: 100%;
    display: inline-block;
  }
}
</style>
