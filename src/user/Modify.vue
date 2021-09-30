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
  <div class="modifypwd">
    <div class="modifypwdBox">
      <div class="imgBox">
        <img
          src="../assets/images/user-logo.png"
          alt="logo"
        >
      </div>
      <div class="modify-area">
        <p class="modify-top">
          {{ $t('login.getPwd') }}
        </p>
        <ModifyPwdComp
          :next="nextValue"
          @checkPwd="checkPwd"
        />
        <div
          class="modify-btn"
        >
          <el-button
            id="modifyBtn"
            type="primary"
            size="medium"
            @click="nextStep"
            v-if="nextValue"
          >
            {{ $t('pwdmodify.next') }}
          </el-button>
          <el-button
            id="modifyBtn"
            type="primary"
            size="medium"
            @click="submit"
            v-if="!nextValue"
          >
            {{ $t('pwdmodify.submit') }}
          </el-button>
          <el-button
            id="modifyBtn"
            type="text"
            @click="cancel"
            v-if="nextValue"
          >
            {{ $t('pwdmodify.cancel') }}
          </el-button>
        </div>
        <div
          class="modify-tips"
          v-if="!nextValue"
        >
          <el-button
            type="text"
            @click="jumpTo('/login')"
          >
            {{ $t('pwdmodify.return') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModifyPwdComp from './ModifyPwdComp.vue'
import { lcmController } from '../tools/request'
export default {
  name: 'ForceModifyPwd',
  components: {
    ModifyPwdComp
  },
  data () {
    return {
      nextValue: false,
      newPwd: '',
      verify: false
    }
  },
  methods: {
    nextStep () {
      this.nextValue = true
    },
    submit () {
      if (this.newPwd.length > 0 && this.verify) {
        sessionStorage.setItem('newpassword', this.newPwd)
        setTimeout(() => {
          lcmController.changPwd().then(res => {
            sessionStorage.removeItem('userName')
            sessionStorage.removeItem('password')
            sessionStorage.removeItem('newpassword')
            sessionStorage.removeItem('userId')
            this.jumpTo('/login')
          }).catch(err => {
            console.log(err)
          })
        }, 1000)
      } else {
        this.$message.error(this.$t('pwdmodify.formDataVerify'))
      }
    },
    cancel () {
      this.nextValue = false
    },
    jumpTo (path) {
      this.$router.go(-1)
    },
    checkPwd (value) {
      if (value.type === 1) {
        this.newPwd = value.value.newPassword
      } else {
        this.verify = value.value
      }
    }
  }
}
</script>
<style lang="less">
.modifypwd {
  height: 100%;
  background: url('../assets/images/user-bg.png') no-repeat center;
  position: relative;
  background-size: cover;
  .modifypwdBox {
    position: relative;
    top: 50%;
    left: 50%;
    height: auto;
    width: 420px;
    text-align: center;
    transform: translate(-50%, -50%);
    .imgBox{
      margin-bottom: 25px;
    }
    .modify-area {
      padding: 25px 45px 35px 45px;
      background: #fff;
      border-radius: 15px;
      width: 420px;
      height: auto;
      box-sizing: border-box;
    }
    .modify-top {
      text-align: left;
      display: inline-block;
      width: 100%;
      line-height: 18px;
      font-size: 18px;
      font-weight: bold;
      font-family: HarmonyHeiTi;
      color: #5d3da0;
      margin: 10px 0 35px 0;
    }
    .info-title {
      height: 100px;
      line-height: 100px;
      color: #252b3a;
    }
  }
  .modify-btn {
    button.el-button--primary {
      width: 100%;
      font-size: 18px;
      border: none;
      font-family: HarmonyHeiTi;
      font-size: 22px;
      background:linear-gradient(to right, #54aaf3 , #53dabd)!important;
      border-radius: 22px;
    }
    .el-button--text{
      color: #53c6d4;
      font-family: HarmonyHeiTi;
      font-size: 14px;
      margin-top: 15px;
      margin-left: 0;
    }
  }
  .modify-tips{
    margin-top: 15px;
    color: #5d3da0;
    font-family: HarmonyHeiTi;
    font-size: 12px;
    .el-button--text{
      color: #53c6d4;
      font-family: HarmonyHeiTi;
      font-size: 12px;
    }
  }
  @media screen and (max-width: 1380px) {
    .modifypwdBox{
      margin: 140px 10px 0 0;
    }
  }
  @media screen and (max-width: 1024px) {
    .modifypwdBox{
      margin: 200px 10px 0 0;
    }
  }
  @media screen and (max-width: 640px) {
    .modifypwdBox{
      width: 340px;
      margin: 140px 10px 0 0;
    }
  }
}
</style>
