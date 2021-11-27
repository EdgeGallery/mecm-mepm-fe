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
    class="instance-network"
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
          prop="networkName"
          label="Network"
          width="150px"
        />
        <el-table-column
          prop="connectSubnet"
          :label="$t('resourceMgr.connectSubnet')"
          width="180px"
        />
        <el-table-column
          prop="shared"
          :label="$t('resourceMgr.shared')"
          width="90px"
        />
        <el-table-column
          prop="adminStatus"
          :label="$t('resourceMgr.adminStatus')"
          width="200px"
        />
        <el-table-column
          prop="status"
          :label="$t('resourceMgr.status')"
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
        networkName: 'public_net',
        connectSubnet: 'ipv6-public',
        shared: '否',
        adminStatus: '正常',
        status: '运行中'
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
.instance-network{
  .w50 {
    width: 50%;
    display: inline-block;
  }
}
</style>
