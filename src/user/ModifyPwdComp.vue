<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="modifypw-comp">
    <el-form
      :model="modifyPassData"
      ref="modifyPassForm"
      :rules="rules"
    >
      <el-row v-if="next">
        <el-col :span="24">
          <el-form-item
            prop="oldPassword"
          >
            <el-input
              v-model="modifyPassData.oldPassword"
              clearable
              :placeholder="$t('login.mailAddr')"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            prop="oldPassword"
          >
            <el-input
              v-model="modifyPassData.oldPassword"
              :placeholder="$t('pwdmodify.oldPw')"
              clearable
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!next">
        <el-col :span="24">
          <el-form-item
            prop="newPassword"
          >
            <el-input
              v-model="modifyPassData.newPassword"
              :placeholder="$t('pwdmodify.newPw')"
              clearable
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!next">
        <el-col :span="24">
          <el-form-item
            prop="newConfirmPassword"
          >
            <el-input
              v-model="modifyPassData.newConfirmPassword"
              @blur.native.capture="checkPassword"
              :placeholder="$t('pwdmodify.confirmNewPw')"
              clearable
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <Verify
            @validateVerifyCodeSuccess="validateVerifyCodeSuccess"
          />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Verify from './Verify.vue'
export default {
  name: 'ModifyPwdComp',
  components: {
    Verify
  },
  props: {
    next: {
      required: true,
      type: Boolean
    }
  },
  data () {
    const validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.newPwdNotNull')))
      } else {
        callback()
      }
    }
    const validateConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.confirmPwdNotNull')))
      } else {
        callback()
      }
    }
    return {
      modifyPassData: {
        oldPassword: '',
        newPassword: '',
        newConfirmPassword: ''
      },
      ifVerify: false,
      rules: {
        newPassword: [{ required: true, validator: validateNewPwd, trigger: 'blur' }],
        newConfirmPassword: [{ required: true, validator: validateConfirmPwd, trigger: 'blur' }]
      }
    }
  },
  watch: {
    modifyPassData: {
      handler (newValue, oldValue) {
        this.$emit('checkPwd', { type: 1, value: newValue })
      },
      deep: true
    },
    ifVerify: {
      handler (newValue, oldValue) {
        this.$emit('checkPwd', { type: 2, value: newValue })
      },
      deep: true
    }
  },
  methods: {
    validateVerifyCodeSuccess (val) {
      this.ifVerify = val
    },
    checkPassword () {
      if (this.modifyPassData.newPassword.length > 0) {
        if (this.modifyPassData.newPassword !== this.modifyPassData.newConfirmPassword) {
          this.$message.error(this.$t('pwdmodify.pwdNotConsistent'))
        }
      }
    }
  }
}
</script>
<style lang="less">
.modifypw-comp {
  .el-form-item{
    margin-bottom: 30px;
  }
  .getVerifyCode{
    line-height: 40px;
    background:#74b4eb;
    color: #fff;
    border-radius: 6px;
    margin-left: 15px;
  }
}
</style>
