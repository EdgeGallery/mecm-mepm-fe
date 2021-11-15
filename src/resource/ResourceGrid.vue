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
        type="dashboard"
        :percentage="40"
      />
    </div>
    <div class="gird-statistic">
      <div><span>虚机数量: 6<span /></span></div>
      <div><span>剩余数量: 66<span /></span></div>
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
  width: 290px;
  height: 135px;
  border: 2px solid #1E1E1E;
  border-radius: 15px;
  display: flex;
  .grid-chart{
    margin-top: 10px;
    margin-left: 10px;
    width: 120px;
    height: 120px;
  }
  .gird-statistic{
    margin-top: 40px;
    margin-left: 40px;
  }
}
</style>
