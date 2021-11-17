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
  <div
    class="instance-type"
  >
    <div>
      <el-table
        :data="currentPageData"
        class="tableStyle"
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        @sort-change="sortChange"
        ref="multipleTable"
      >
        <el-table-column
          type="selection"
          width="50"
        />
        <el-table-column
          prop="name"
          label="Name"
          sortable="custom"
        />
        <el-table-column
          prop="virtualCore"
          :label="$t('resourceMgr.virtualCore')"
        />
        <el-table-column
          prop="ram"
          :label="$t('resourceMgr.ram')"
        />
        <el-table-column
          prop="totalDisk"
          :label="$t('resourceMgr.totalDisk')"
        />
        <el-table-column
          prop="rootDisk"
          :label="$t('resourceMgr.rootDisk')"
        />
        <el-table-column
          prop="tempDisk"
          :label="$t('resourceMgr.tempDisk')"
        />
        <el-table-column
          prop="public"
          :label="$t('resourceMgr.public')"
        />
        <template slot="empty">
          <div>
            <img
              src="../../assets/images/empty.png"
              alt=""
              style="padding: 10px;"
            >
            <p>{{ $t('resourceMgr.noData') }}</p>
          </div>
        </template>
      </el-table>
      <div class="pageBar">
        <pagination
          :page-sizes="[10,15,20,25]"
          :table-data="paginationData"
          @getCurrentPageData="getCurrentPageData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import pagination from '../../components/Pagination.vue'
export default {
  components: {
    pagination
  },
  props: {
  },
  data () {
    return {
      dialogVisible: true,
      currentPageData: [{
        name: 'test Ins Type',
        virtualCore: '1',
        ram: '128MB',
        totalDisk: '1GB',
        rootDisk: '1GB',
        tempDisk: '0GB',
        public: '是'
      }]
    }
  },
  methods: {
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    // receive msg from parent component
    parentMsg: function (active) {
      this.$emit('getStepData', this.currentPageData)
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.instance-type{
  .w50 {
    width: 50%;
    display: inline-block;
  }
}
</style>
