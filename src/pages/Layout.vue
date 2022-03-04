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
  <div class="home-container">
    <router-view id="container" />
    <EgFooter
      :platform-data="platformData"
      :show-full-footer-page="showFullFooterPage"
      :specific-bg="specificBg"
      :specific-bg-color="specificBgColor"
    />
  </div>
</template>

<script>
import EgFooter from 'eg-view/src/components/EgFooter.vue'
export default {
  name: 'Layout',
  components: { EgFooter },
  data () {
    return {
      platformData: [],
      showFullFooterPage: false,
      specificBg: true,
      specificBgColor: '#f6f5f8'
    }
  },
  methods: {
    specificRender (path) {
      if (path.includes('mepm/mepinfo/')) {
        this.specificBgColor = '#ffffff'
      } else {
        this.specificBgColor = '#f6f5f8'
      }
    }
  },
  watch: {
    $route (to, from) {
      this.specificRender(to.path)
    }
  }
}
</script>
<style lang='less'>
.home-container{
  padding-top: 60px;
}
</style>
