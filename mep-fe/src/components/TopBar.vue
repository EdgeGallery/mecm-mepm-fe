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
  <div class="main-sidebar">
    <el-menu
        :default-active="selectIndex"
        :unique-opened="true"
        active-text-color="#6c92fa"
        background-color="#282b33"
        mode="horizontal"
        router
        text-color="#fff"
    >
      <!-- 一级菜单 -->
      <template v-for="item in jsonData">
        <el-submenu
            v-if="item.children && item.children.length"
            :key="item.id"
            :disabled="!item.display"
            :index="item.path"
        >
          <template slot="title">
            <em :class="item.icon"/><span class="first-menu">{{ item.name }}</span>
          </template>

          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-submenu
                v-if="itemChild.children && itemChild.children.length"
                :key="itemChild.id"
                :index="itemChild.path"
            >
              <template slot="title">
                <em :class="itemChild.icon"/><span class="second-menu">{{ itemChild.name }}</span>
              </template>

              <!-- 三级菜单 -->
              <el-menu-item
                  v-for="itemChild_Child in itemChild.children"
                  :key="itemChild_Child.id"
                  :index="itemChild_Child.path"
              >
                <em :class="itemChild_Child.icon"/>
                <span slot="title">{{ itemChild_Child.name }}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item
                v-else
                :key="itemChild.id"
                :index="itemChild.path"
            >
              <em :class="itemChild.icon"/>
              <span
                  slot="title"
                  class="second-menu"
                  v-html="itemChild.href=='1'? itemChild.html:itemChild.name"
              >{{ itemChild.name }}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item
            v-else
            :key="item.id"
            :disabled="!item.display"
            :index="item.path"
        >
          <em :class="item.icon"/>
          <span
              slot="title"
              class="first-menu"
          >{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import constants from '../constant/constants'

export default {
  name: "TopBar",
  props: {
    jsonData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectIndex: ''
    }
  },
  watch: {
    $route(to) {
      this.selectIndex = to.path
    }
  },
  mounted () {
    if ('/' === this.$route.fullPath) {
      this.selectIndex = constants.NAV_INDEX.DASHBOARD
    } else {
      this.selectIndex = this.$route.fullPath
    }
  }
}
</script>

<style lang="less">
.main-sidebar {
  position: relative;
  z-index: 99;
  float: left;

  .el-menu.el-menu--horizontal {
    height: 65px;
    border-bottom: none;

    .el-menu-item {
      height: 65px;
      line-height: 65px;
    }
  }

  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 65px !important;
    line-height: 65px !important;
  }

  .el-menu {
    display: flex;

    .first-menu {
      font-size: 18px;
      font-weight: bold;
    }

    .second-menu {
      font-size: 15px;
    }

    .third-menu {
      font-size: 12px;
    }
  }
}
</style>