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
  <div class="overview-content">
    <div class="change-node">
      <el-row :gutter="24">
        <el-col :span="12">
          <span class="resource-status">资源状态</span>
        </el-col>
        <el-col
          :span="12"
          class="resourcePercentage"
        >
          <em class="title-icon" />{{ $t("resourceMgr.minPercentage") }}
          <em class="title-icon" />{{ $t("resourceMgr.middlePercentage") }}
          <em class="title-icon" />{{ $t("resourceMgr.maxPercentage") }}
        </el-col>
      </el-row>
    </div>
    <div class="resource-content">
      <el-row
        class="resource-row"
        :gutter="24"
      >
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
      </el-row>
      <el-row
        class="resource-row"
        :gutter="24"
      >
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
      </el-row>
      <el-row
        class="resource-row"
        :gutter="24"
      >
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
        <el-col :span="8">
          <ResourceGrid />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ResourceGrid from './ResourceGrid.vue'
export default {
  components: {
    ResourceGrid
  },
  props: {
  },
  data () {
    return {
      edgeNodeList: []
    }
  },
  methods: {
    getSelectAppstoreData () {

    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.overview-content{
  width: 1100px;
  height: 590px;
  padding-top: 1px;
  box-shadow: 2px 5px 23px 10px rgba(104, 142, 243, 0.2) inset;
  .change-node{
    margin-top: 20px;
    margin-left: 20px;
    .resourcePercentage{
      text-align: center;
      .title-icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 12px;
        background-image: linear-gradient(45deg, #72dcc8, #c0e8e0);
        margin-right: 5px;
        position: relative;
        top: 2px;
        margin-left: 20px;
      }
    }
    .resource-status{
      font-weight: 600;
      margin-left: 5px;
    }
  }
  .resource-content{
    margin-top: 20px;
    margin-left: 30px;
    .resource-row{
      margin-top: 20px;
    }
  }
  .el-select{
    border-radius: 20px;
    color: #FFFFFF;
  }
}
</style>
