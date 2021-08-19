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
          重置密码
        </p>
        <ModifyPwdComp
          :modify-scene="scene"
          @processModifyPassSucceed="processModifyPassSucceed"
          @processCancelModifyPass="processCancelModifyPass"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { api } from '../tools/api.js'
import { isForceModifyPwScene, PW_MODIFY_SCENE_FIRSTLOGIN } from '../tools/util.js'
import ModifyPwdComp from './ModifyPwdComp.vue'
export default {
  name: 'ForceModifyPwd',
  components: {
    ModifyPwdComp
  },
  data () {
    return {
      scene: PW_MODIFY_SCENE_FIRSTLOGIN,
      infoTitle: ''
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.infoTitle = this.scene === PW_MODIFY_SCENE_FIRSTLOGIN ? this.$t('pwdmodify.firstLoginTip') : this.$t('pwdmodify.expiredTip')
    }
  },
  mounted () {
    // api.loginInfo().then(res => {
    //   if (!res.data.username || res.data.username === 'guest') {
    //     this.$router.push('/')
    //   }
    //   this.init()
    // }).catch(() => {
    //   this.$router.push('/')
    // })
  },
  methods: {
    init () {
      this.scene = localStorage.getItem('pwmodiscene-' + this.$cookies.get('XSRF-TOKEN'))
      if (!isForceModifyPwScene(this.scene)) {
        this.scene = PW_MODIFY_SCENE_FIRSTLOGIN
      }
      this.infoTitle = this.scene === PW_MODIFY_SCENE_FIRSTLOGIN ? this.$t('pwdmodify.firstLoginTip') : this.$t('pwdmodify.expiredTip')
    },
    processModifyPassSucceed () {
      localStorage.removeItem('pwmodiscene-' + this.$cookies.get('XSRF-TOKEN'))
      let _timer = setTimeout(() => {
        this.logout()
        clearTimeout(_timer)
      }, 1000)
    },
    processCancelModifyPass () {
      let _tipInfo = this.scene === PW_MODIFY_SCENE_FIRSTLOGIN ? this.$t('pwdmodify.cancelOnFirstLoginTip')
        : this.$t('pwdmodify.cancelOnPwExpiredTip')
      this.$confirm(_tipInfo, this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('pwmodiscene-' + this.$cookies.get('XSRF-TOKEN'))
        this.logout()
      })
    },
    logout () {
      api.logout().then(res => {
        let urlPrefix = window.location.href.indexOf('https') > -1 ? 'https://' : 'http://'
        window.location.href = urlPrefix + window.location.host + '/index.html'
      })
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
      padding: 25px 45px;
      background: #fff;
      border-radius: 15px;
      width: 420px;
      height: 438px;
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
