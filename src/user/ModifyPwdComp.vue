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
    >
      <el-row v-if="next">
        <el-col :span="24">
          <el-form-item
            prop="oldPassword"
          >
            <el-input
              v-model="modifyPassData.oldPassword"
              clearable
              placeholder="邮箱地址"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="next">
        <el-col :span="24">
          <el-form-item
            prop="newPassword"
          >
            <el-input
              v-model="modifyPassData.oldPassword"
              placeholder="输入旧密码"
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
              placeholder="输入新密码"
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
              v-model="newConfirmPassword"
              @blur.native.capture="checkPassword"
              placeholder="确认新密码"
              clearable
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="next"
      >
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
      type: String
    }
  },
  data () {
    return {
      modifyPassData: {
        oldPassword: '',
        newPassword: ''
      },
      newConfirmPassword: '',
      ifVerify: false
    }
  },
  watch: {
    modifyPassData: function (val) {
      if (this.ifVerify) {
        this.$emit('checkPwd', this.modifyPassData)
      }
    }
  },
  methods: {
    validateVerifyCodeSuccess (val) {
      this.ifVerify = val
    },
    checkPassword () {
      if (this.modifyPassData.newPassword.length > 0) {
        if (this.modifyPassData.newPassword !== this.newConfirmPassword) {
          this.ifVerify = false
          this.$message.error('两次密码不一致，请重新输入')
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
