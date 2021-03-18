<!--
  - Copyright 2020 - 2021 Huawei Technologies Co., Ltd.
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
  <div class="panel panel-default">
    <div class="panel-heading fw-600 h-42">
      <span class="pull-left">{{ tableName }}</span>
      <span class="pull-right badge">{{ count }}</span>
    </div>
    <div class="panel-body panel-body-height">
      <div class="table-responsive">
        <table class="dashboardTable">
          <caption/>
          <thead>
          <tr>
            <th v-for="item in colNames" id="item.id" :key="item.name" class="dashboardTableCell">{{ item.name }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in data" :key="item.id">
            <td class="dashboardTableCell">{{ item.name }}</td>
            <td class="dashboardTableCell">{{ item.version }}</td>
            <td class="dashboardTableCell">{{ item.id }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel-footer h-42">
      <span class="pull-right">
        <el-link v-if="showMoreInfoEntry" href="#/service" type="primary">查看更多信息</el-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableInDashborad",
  props: {
    tableName: {
      type: String,
      default: ''
    },
    colNames: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: 0
    },
    showMoreInfoEntry: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.h-42 {
  height: 42px;
}

.panel-footer {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

a {
  color: #337ab7;
  text-decoration: none;
}
</style>