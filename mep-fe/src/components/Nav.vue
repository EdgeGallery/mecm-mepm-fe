<!--
  - Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="navgation">
    <el-row>
      <el-col
          :lg="7"
          :md="8"
          :sm="18"
          :xs="13"
      >
        <div
            class="logo lt"
            @click="jumpFromLogo('dashboard')"
        >
          <img
              alt
              src="../assets/image/logo.png"
          >
        </div>
      </el-col>
      <el-col
          :lg="11"
          :md="11"
          :sm="7"
          :xs="3"
          class="nav big"
      >
        <TopBar :json-data="jsonData"/>
      </el-col>
      <el-col
          :lg="11"
          :md="11"
          :sm="2"
          :xs="3"
          class="nav small"
      >
        <em
            class="el-icon-menu"
        />
      </el-col>
      <el-col
          :lg="6"
          :md="5"
          :sm="4"
          :xs="8"
      >
        <div class="language rt">
          <span @click="changeLange">{{ language }}</span>
        </div>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div
          v-show="menu_small"
          id="menu-div"
      >
        <TopbarSmall
            :json-data="jsonData"
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import constants from "../constant/constants";
import TopBar from "@/components/TopBar";
import TopbarSmall from "@/components/TopbarSmall";
import nav from "./navData.js"

export default {
  name: "Nav",
  components: {TopbarSmall, TopBar},
  data() {
    return {
      language: 'English',
      ifGuest: true,
      menu_small: false,
      jsonData: []
    }
  },
  methods: {
    changeLange() {
      let curLan = this.$i18n.locale 
      if (curLan === 'en') {
        this.$i18n.locale = 'zh-cn'
      } else {
        this.$i18n.locale = 'en'
      }
    },
    jumpFromLogo(newPath) {
      this.$router.push(newPath)
    },
    handleSelect(index) {
      this.$emit(constants.EVENT_NAME.NAV_SELECT_CHANGE, index)
    },
    updateUIRes() {
      let curLan = this.$i18n.locale 
      if (curLan === 'en') {
        this.language = this.language = '简体中文'
      } else {
        this.language = 'English'
      }
      this.jsonData = nav.getNavData(curLan)
    }
  },
  beforeMount () {
    this.updateUIRes()
  },
  watch: {
    '$i18n.locale': function () {
      this.updateUIRes()
    }
  }
}
</script>

<style lang="less">
.navgation {
  background: #282b33;
  height: 65px;
  top: 0px;
  width: 100%;
  position: fixed;
  z-index: 99;

  .rt {
    span {
      height: 65px;
      line-height: 65px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      margin-right: 10px;
    }
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav.big {
    display: inline-block;
  }

  .nav.small {
    display: none;
    height: 65px;
    text-align: center;

    .el-icon-menu {
      color: #fff;
      font-size: 30px;
      margin-top: 17px;
    }
  }

  .logo {
    height: 65px;
    line-height: 65px;
    margin-left: 17px;
    display: flex;

    img {
      height: 65px;
      cursor: pointer;
      margin-left: 25px;
    }

    span {
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
  }

  .menu-div {
    overflow-y: auto;
  }

  @media screen and (max-width: 1090px) {
    .el-menu-item {
      padding: 0 10px;
    }

    .el-submenu__title {
      padding: 0 10px;
    }

    .main-sidebar .el-menu .first-menu {
      font-size: 16px;
    }

    .logo {
      span {
        font-size: 16px;
      }
    }
  }
  @media screen and (max-width: 991px) {
    .nav.big {
      display: none;
    }

    .nav.small {
      display: inline-block;
    }

    .el-col-md-5 {
      float: right;
    }

    .el-col-md-11 {
      float: right;
    }
  }
  @media screen and (max-width: 767px) {
    .el-col-xs-8 {
      max-width: 135px;
      float: right;
    }

    .el-col-xs-3 {
      float: right;
    }

    .logo img {
      height: 50px;
      margin: 5px 0 0 0;
    }
  }
  @media screen and (max-width: 553px) {
    .logo {
      margin-left: 0;

      img {
        height: 40px;
        margin: 12px 0 0 0;
      }
    }
  }
  @media screen and (max-width: 385px) {
    .logo {
      img {
        height: 34px;
        margin: 15px 0 0 0;
      }

      span {
        font-size: 13px;
      }
    }
  }
  @media screen and (max-width: 320px) {
    .rt span {
      font-size: 13px;
    }

    .rt:first-child span {
      margin-right: 0;
    }
  }
}
</style>