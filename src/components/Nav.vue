<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="navgation">
    <el-row :gutter="10">
      <el-col
        :lg="6"
        :md="12"
        :sm="12"
        :xs="12"
      >
        <div
          class="logo"
          @click="jumpLogoTo"
        >
          <img
            class="cp"
            src="../assets/images/logo.png"
            alt=""
          >
        </div>
      </el-col>
      <el-col
        :lg="12"
        class="hidden-md-and-down"
        style="height:65px;"
      >
        <div
          v-show="ifLogin"
        >
          <Topbar
            v-if="!smallMenu"
            :json-data="jsonData"
          />
        </div>
      </el-col>
      <el-col
        :lg="6"
        :md="12"
        :sm="12"
        :xs="12"
      >
        <div class="nav-tabs">
          <div class="btn rt hidden-lg-and-up">
            <em
              class="el-icon-s-unfold"
              @click="openNav"
            />
          </div>
          <div class="language rt">
            <span @click="changeLang">{{ lang }}</span>
          </div>
          <div
            class="rt"
            @mouseenter="showFunc=true"
            @mouseleave="showUser"
            v-show="ifLogin"
          >
            <img
              id="usericon"
              class="rt"
              src="../assets/images/mine_icon.png"
              alt=""
            >
            <div
              class="userFunc"
              v-show="showFunc"
              @mouseenter="inBox=true"
              @mouseleave="showFunc=false,inBox=false"
            >
              <p
                @click="logout"
                v-show="ifLogin"
              >
                {{ $t('login.logout') }}
              </p>
              <p
                @click="jumpTo('/modify')"
                v-show="ifLogin"
              >
                {{ $t('login.getPwd') }}
              </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-collapse-transition>
      <div
        v-if="smallMenu"
        id="menu-div"
      >
        <Topbarsmall
          :json-data="jsonData"
          @closeMenu="closeMenu"
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import NavData from '../data/NavData.js'
import NavDataCn from '../data/NavDataCn.js'
import Topbar from '../components/Topbar'
import Topbarsmall from '../components/Topbarsmall'
export default {
  name: 'Navgation',
  components: {
    Topbar,
    Topbarsmall
  },
  data () {
    return {
      loginPage: '',
      ifGuest: true,
      jsonData: [],
      language: 'cn',
      lang: 'English',
      smallMenu: false,
      userName: '',
      ifLogin: true,
      showFunc: false,
      inBox: false
    }
  },
  watch: {
    $route (to, from) {
      if (!sessionStorage.getItem('userName')) {
        this.ifLogin = false
        this.$router.push('/login')
      } else {
        this.ifLogin = true
      }
    }
  },
  mounted () {
    this.jsonData = NavDataCn
    this.language = localStorage.getItem('language') || 'cn'
    this.$i18n.locale = this.language
    if (this.language === 'cn') {
      this.lang = 'English'
      this.jsonData = NavDataCn
    } else {
      this.lang = '简体中文'
      this.jsonData = NavData
    }
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'cn')
    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    },
    showUser () {
      this.showFunc = true
      setTimeout(() => {
        if (!this.inBox) {
          this.showFunc = false
        }
      }, 1000)
    },
    logout () {
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('password')
      sessionStorage.removeItem('userId')
      this.$router.push('/login')
    },
    os () {
      let UserAgent = navigator.userAgent.toLowerCase()
      return {
        isWindows: /windows/.test(UserAgent),
        isMac: /mac/.test(UserAgent)
      }
    },
    openNav () {
      this.smallMenu = !this.smallMenu
    },
    closeMenu (data) {
      this.smallMenu = data
    },
    changeLang () {
      if (this.language === 'en') {
        this.language = 'cn'
        this.lang = 'English'
        this.jsonData = NavDataCn
      } else {
        this.language = 'en'
        this.lang = '简体中文'
        this.jsonData = NavData
      }
      this.$i18n.locale = this.language
      localStorage.setItem('language', this.language)
      let appDom = document.getElementById('app')
      if (this.language === 'cn') {
        appDom.style.fontFamily = 'Huaweisans, Arial, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
      } else {
        if (this.os.isMac) {
          appDom.style.fontFamily = 'PingFang, FZLTXHJW, Hiragino Sans GB, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
        } else {
          appDom.style.fontFamily = 'Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
        }
      }
    },
    jumpLogoTo () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='less' scoped>
.navgation{
  background: transparent;
  height: 65px;
  top: 0px;
  width: 100%;
  position: fixed;
  z-index: 99;
  .logo{
    height:65px;
    width:430px;
    line-height: 65px;
    margin-left:17px;
    img{
      position: relative;
      top: 10px;
      width:150px;
    }
  }
  .language {
    display: inline-block;
    line-height: 65px;
    font-size: 14px;
    color: #6c92fa;
    width: 70px;
    span {
      width:60px!important;
      top:3px!important;
    }
    span:hover {
      text-decoration: underline;
    }
  }
  .user {
    display: inline-block;
    line-height: 65px;
    font-size: 14px;
    color: #6c92fa;
    span {
      width:100%;
      top:3px!important;
    }
    span:hover {
      text-decoration: underline;
    }
  }
  .nav-tabs{
    height:100%;
    font-size:20px;
    line-height: 50px;
    margin-right: 10px;
    span{
      height:24px;
      margin-right: 10px;
      cursor:pointer;
      color:#f5f5f5;
    }
    span.el-icon-user-solid.blue{
      color:#409EFF;
    }
  }
  // 移动端
  .el-icon-s-unfold{
    color:#ffffff;
    line-height: 65px;
    top: 3px;
    position: relative;
  }
  .menu-div{
    overflow-y: auto;
  }
}

#usericon{
  position: relative;
  z-index: 99;
  top: 22px;
  right:40px;
  padding-right: 10px;
  cursor: pointer;
}
.userFunc{
  color: #fff;
  line-height: 25px;
  position: relative;
  top: 66px;
  left: -20px;
  padding: 5px;
  border-radius: 10px;
  background: #5e40c8;
  p{
    cursor: pointer;
    line-height: 30px;
  }
}
</style>
