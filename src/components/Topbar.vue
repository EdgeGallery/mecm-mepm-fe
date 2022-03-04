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
  <div class="main-sidebar lt">
    <el-menu
      :default-active="indexName"
      :unique-opened="true"
      router
      @select="handleSelect"
      text-color="#bdb1e4"
      background-color="transparent"
      active-text-color="#ffffff"
      mode="horizontal"
    >
      <!-- 一级菜单 -->
      <template v-for="item in jsonData">
        <el-submenu
          v-if="item.children && item.children.length"
          :index="item.path"
          :key="item.id"
        >
          <template slot="title">
            <em :class="item.icon" /><span class="first-menu">{{ item.name }}</span>
          </template>

          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-submenu
              v-if="itemChild.children && itemChild.children.length"
              :index="itemChild.path"
              :key="itemChild.id"
            >
              <template slot="title">
                <em :class="itemChild.icon" /><span class="second-menu">{{ itemChild.name }}</span>
              </template>

              <!-- 三级菜单 -->
              <el-menu-item
                v-for="itemChild_Child in itemChild.children"
                :index="itemChild_Child.path"
                :key="itemChild_Child.id"
              >
                <em :class="itemChild_Child.icon" />
                <span slot="title">{{ itemChild_Child.name }}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item
              v-else
              :index="itemChild.path"
              :key="itemChild.id"
            >
              <em :class="itemChild.icon" />
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
          :index="item.path?item.path:''"
          :key="item.id"
        >
          <em :class="item.icon" />
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

export default {
  name: 'MainSidebar',
  props: {
    jsonData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      indexName: ''
    }
  },
  methods: {
    handleSelect (path) {
      this.indexName = path
      this.$root.$emit('refreshDnd')
      this.$root.$emit('refreshProvision')
    }
  },
  watch: {
    $route (to, from) {
      this.indexName = to.path
      // 解决MECDeveloper下DevTools导航子菜单首次点击没有选中状态问题
      if (this.indexName === '/mepm/apac/detail') {
        this.indexName = '/mepm/apac/list'
      } else if (this.indexName === '/mepm/ruleconfig/addTrafficRules') {
        this.indexName = '/mepm/ains/list'
      } else if (this.indexName === '/mepm/ruleconfig') {
        this.indexName = '/mepm/ains/list'
      } else if (this.indexName.includes('mepm/mepinfo/')) {
        this.indexName = '/mepm/node/list'
      } else if (this.indexName.includes('nodeinfo')) {
        this.indexName = '/mepm/node/list'
      } else if (this.indexName.includes('mepm/resource/manager')) {
        this.indexName = '/mepm/resource/manager'
      } else if (this.indexName.includes('mepm/resource')) {
        this.indexName = '/'
      } else {
        this.indexName = to.path
      }
    }
  },
  mounted () {
    this.indexName = this.$route.fullPath
  }
}

</script>
<style lang='less'>
.main-sidebar{
  position: relative;
  top:10px;
  z-index: 0;
  .el-menu.el-menu--horizontal{
    height: 50px;
    border:none!important;
    .el-menu-item{
      height: 50px;
      line-height: 50px;
    }
    .el-menu-item:hover {
      background-color: transparent !important;
    }
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 50px !important;
    line-height: 50px !important;
  }
  .el-menu{
    display: flex;
    .first-menu{
      font-size: 16px;
      font-weight: bold;
    }
    .second-menu{
      font-size: 15px;
    }
    .third-menu{
      font-size: 12px;
    }
  }
}

</style>
