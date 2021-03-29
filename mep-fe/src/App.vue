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
  <div id="app">
    <Nav/>
    <Layout/>
  </div>
</template>

<script>
import Nav from './components/Nav'
import constants from "./constant/constants";
import Layout from "@/components/Layout";

export default {
  name: 'App',
  components: {
    Layout,
    Nav
  },
  data() {
    return {
      showTopo: false,
      defaultSelectMenuIndex: constants.NAV_INDEX.SERVICE,
      showTable: true
    }
  },
  methods: {
    menuSelctChange(index) {
      this.showTopo = index === constants.NAV_INDEX.TOPOLOGY
      this.showTable = index === constants.NAV_INDEX.SERVICE
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Huaweisans, Arial, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  height: 100%;
  width: 100%;
  background: white;
  min-width: 320px;
}
</style>
