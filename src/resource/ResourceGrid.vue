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
  <div class="resource-grid">
    <div class="grid-chart">
      <el-progress
        type="circle"
        :stroke-width="12"
        :width="80"
        :percentage="40"
        color="#40C8A0"
      />
    </div>
    <div class="gird-statistic">
      <div class="statistic-div">
        <span class="statistic-detail">虚机数量: 6<span /></span>
      </div>
      <div class="statistic-div">
        <span class="statistic-detail">剩余数量: 66<span /></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.resource-grid{
  width: 258px;
  height: 112px;
  border: 1px solid #7A6E8A;
  border-radius: 15px;
  display: flex;
  .grid-chart{
    margin-top: 16px;
    margin-left: 30px;
  }
  .gird-statistic{
    margin-top: 30px;
    margin-left: 25px;
    .statistic-div{
      padding: 3px;
      .statistic-detail{
        color: #1F1348;
      }
    }
  }
}
</style>
