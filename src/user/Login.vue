<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="login">
    <div
      class="loginBox"
    >
      <div class="imgBox">
        <img
          src="../assets/images/user-logo.png"
          alt="logo"
        >
      </div>
      <div
        class="login-area"
      >
        <p class="login-top">
          {{ $t('login.loginWithUser') }}
        </p>
        <el-form
          :model="userData"
          ref="userData"
        >
          <el-form-item
            prop="username"
          >
            <el-input
              id="uname"
              v-model="userData.userName"
              type="text"
              :placeholder="$t('login.namePla')"
              clearable
              ref="userNameInput"
            />
          </el-form-item>
          <el-form-item
            prop="password"
          >
            <el-input
              id="upass"
              v-model="userData.password"
              type="password"
              :placeholder="$t('login.pwdPla')"
              clearable
            />
          </el-form-item>
        </el-form>
        <Verify
          @validateVerifyCodeSuccess="validateVerifyCodeSuccess"
        />
        <div
          class="login-btn"
        >
          <el-button
            id="loginBtn"
            type="primary"
            size="medium"
            @click="submitForm('userData')"
          >
            {{ $t('login.login') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Verify from './Verify.vue'
import { lcmController } from '../tools/request'
export default {
  name: 'Login',
  components: {
    Verify
  },
  data () {
    return {
      userData: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    },
    validateVerifyCodeSuccess (val) {
      this.ifVerify = val
    },
    submitForm () {
      if (this.ifVerify) {
        sessionStorage.setItem('userName', this.userData.userName)
        sessionStorage.setItem('password', this.userData.password)
        setTimeout(() => {
          lcmController.login().then(res => {
            sessionStorage.setItem('userId', res.data.authenticate_id)
            this.$router.push('/')
          }).catch(err => {
            sessionStorage.removeItem('userName')
            sessionStorage.removeItem('password')
            sessionStorage.removeItem('userId')
            console.log(err)
          })
        }, 1000)
      } else {
        this.$message.error(this.$t('pwdmodify.wrongCode'))
      }
    }
  }
}
</script>
<style lang="less">
.login {
  height: 100%;
  background: url('../assets/images/user-bg.png') no-repeat center;
  position: relative;
  background-size: cover;
  .loginBox {
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
    .login-area {
      padding: 25px 45px 45px 45px;
      background: #fff;
      border-radius: 15px;
      width: 420px;
      box-sizing: border-box;
    }
    .login-top {
      text-align: left;
      display: inline-block;
      width: 100%;
      line-height: 18px;
      font-size: 18px;
      font-weight: bold;
      font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
      color: #5d3da0;
      margin: 10px 0 35px 0;
    }
    .login-certify {
      padding: 0 25px;
      margin: 25px 0;
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 38px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 1380px) {
    .loginBox{
      margin: 140px 10px 0 0;
    }
  }
  @media screen and (max-width: 1024px) {
    .loginBox{
      margin: 200px 10px 0 0;
    }
  }
  @media screen and (max-width: 640px) {
    .loginBox{
      width: 340px;
      margin: 140px 10px 0 0;
    }
  }
  .login-btn {
    button {
      width: 100%;
      font-size: 18px;
      border: none;
      border-radius: 22px;
      font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
      background:linear-gradient(to right, #54aaf3 , #53dabd)!important;
    }
    .verify-box em{
      top: 0;
    }
  }
  .login-tips {
    margin-top: 15px;
    padding: 0 45px;
    position: relative;
    top: -185px;
    z-index: 12;
    .el-button--text{
      color: #53c6d4;
      font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
      font-size: 12px;
    }
  }
}
.el-button--medium{
  padding: 15px 0px!important;
  border-radius: 30px;
}
.el-form-item{
  margin-bottom: 30px;
}
</style>
