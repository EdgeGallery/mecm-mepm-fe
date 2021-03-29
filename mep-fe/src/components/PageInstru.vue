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
  <div class="pageInstru">
    <div class="desc">
      <p class="value">
        {{ descVal }}
      </p>      
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    descVal: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
  }
}
</script>
<style lang='less' scoped>
  .pageInstru {
    margin: 30px auto 40px;
    border-top: 1px solid #e3e2e6;
    position: relative;
    .desc {
      height: 50px;
      background: #f0f2f5;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      color: #333333;
      position: absolute;
      top: -25px;
      left: 10px;
      padding: 0px 10px 0px 10px;
      .value {
        display: inline;
      }
    }
  }
</style>
