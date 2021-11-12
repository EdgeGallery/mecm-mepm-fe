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
          class="nodeIP"
        >
          <span class="ip-addr">100.100.0.0</span>
          <el-select :popper-append-to-body="false">
            <el-option
              v-for="item in edgeNodeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              @click.native="getSelectAppstoreData(item)"
            />
          </el-select>
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
    .resource-status{
      font-weight: 600;
      margin-left: 5px;
    }
    .nodeIP{
      text-align: center;
      .ip-addr{
        margin-left: 170px;
        color: #5E3FC8;
      }
      /deep/ input::-webkit-input-placeholder {
        color: #FFFFFF;
      }
      /deep/  input::-moz-input-placeholder {
        color: #FFFFFF;
      }
      /deep/  input::-ms-input-placeholder {
        color: #FFFFFF;
      }
      /deep/ .el-input__inner{
        background-color: #5F40C9;
        color: #FFFFFF;
        border: 0px;
        border-radius: 25px;
        text-align: center;
        width: 160px;
        margin-left: 30px;
      }
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
