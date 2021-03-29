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
  <div>
    <page-instru :desc-val="pageDesc"></page-instru>
    <div class=pageContainer>
      <div class=pageInner>
        <div class="myApp-operArea">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQueryVal"
            :placeholder="$t('SERVICE_PAGE.TABLE_HEADER_SERVICE_NAME')"
            class="search_input"
          />
        </div>
        <el-table
          :data="currentPageData"
          style="width: 100%; margin: 20px 0;"
          header-cell-class-name="headerStyle"
          :default-sort="defaultSort"
          @sort-change="sortChange"
          @filter-change="filterChange"
        >
          <el-table-column
            :label="tableHeaderName"
            prop="name"
            sortable="custom">
          </el-table-column>
          <el-table-column
            :column-key="'status'"
            :label="tableHeaderStatus"
            prop="status"
            :filters="[{text: 'ACTIVE', value: 'ACTIVE'}, {text: 'INACTIVE', value: 'INACTIVE'}]"
            :filtered-value="filterValue.status">
          </el-table-column>
          <el-table-column
              :label="tableHeaderVersion"
              prop="version"
              sortable="custom">
          </el-table-column>
          <el-table-column
              :label="tableHeaderId"
              prop="instance"
              sortable="custom">
          </el-table-column>
          <el-table-column
              :label="tableHeaderAppName"
              prop="app"
              sortable="custom">
          </el-table-column>
          <template slot="empty">
            <div>
              <img
                src="../../assets/image/empty.png"
                alt=""
                style="padding: 10px;"
              >
              <p>{{$t('SERVICE_PAGE.NO_DATA_NOTICE')}}</p>
            </div>
          </template>
        </el-table>
        <eg-pagination
          :page-num="pageNum"
          :page-sizes="pageSizes"
          :page-size="curPageSize"
          :total="total"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
          style="margin-top: 20px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {getServiceList} from "@/tools/restApi";
import PageInstru from '../../components/PageInstru.vue';
import EgPagination from 'eg-view/src/components/EgPagination.vue'

export default {
  components: { PageInstru, EgPagination },
  name: "ServiceTable",
  data() {
    return {
      pageDesc: '',
      tableData: [],
      tableHeaderName: '',
      tableHeaderStatus: '',
      tableHeaderAppName: '',
      tableHeaderVersion: '',
      tableHeaderId: '',
      pageSizes: [10, 20, 30],
      pageSize: 10,
      curPageSize: 10,
      pageNumCache: 1,
      filterValue: { status: [] },
      nameQueryVal: '',
      defaultSort: { prop: 'name', order: 'ascending' }
    }
  },
  methods: {
    sortChange (column) {
      this.defaultSort = {
        prop: column.prop,
        order: column.order
      }
    },
    filterChange (filters) {
      this.filterValue = filters
    },
    filterStatus (val, row) {
      return row.status === val
    },
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNumCache = val
    },
    tableRowClassName({row}) {
      if (row.status === 'INACTIVE') {
        return 'warning-row'
      }
    },
    refreshShownWithLan () {
      this.pageDesc = this.$i18n.t('SERVICE_PAGE.PAGE_DESC')
      this.tableHeaderName = this.$i18n.t('SERVICE_PAGE.TABLE_HEADER_SERVICE_NAME')
      this.tableHeaderStatus = this.$i18n.t('SERVICE_PAGE.TABLE_HEADER_SERVICE_STATUS')
      this.tableHeaderAppName = this.$i18n.t('SERVICE_PAGE.TABLE_HEADER_APP_NAME')
      this.tableHeaderVersion = this.$i18n.t('SERVICE_PAGE.TABLE_HEADER_SERVICE_VERSION')
      this.tableHeaderId = this.$i18n.t('SERVICE_PAGE.TABLE_HEADER_SERVICE_ID')
    }
  },
  computed: {
    findedData: function () {
      if (!this.nameQueryVal) {
        return this.tableData
      } else {
        return this.tableData.filter((item) => {
          let itemName = item.name.toLowerCase()
          return itemName.indexOf(this.nameQueryVal.toLowerCase()) !== -1
        })
      }
    },
    filteredData: function () {
      if (this.filterValue.status.length === 0) {
        return this.findedData
      } else {
        return this.findedData.filter(item => this.filterValue.status.includes(item.status))
      }
    },
    sortedData: function () {
      let tempData = [].concat(this.filteredData)
      let sortProp = this.defaultSort.prop
      let sortOrder = this.defaultSort.order
      tempData.sort((a, b) => {
        let aProp = a[sortProp].toLowerCase()
        let bProp = b[sortProp].toLowerCase()
        if (sortOrder === 'descending') {
          if (aProp > bProp) {
            return -1
          }
          if (aProp < bProp) {
            return 1
          }
          return 0
        } else {
          if (aProp > bProp) {
            return 1
          }
          if (aProp < bProp) {
            return -1
          }
          return 0
        }
      })
      return tempData
    },
    total: function () {
      return this.sortedData.length
    },
    pageNum: function () {
      if (this.curPageSize * (this.pageNumCache - 1) > this.total) {
        return 1
      }
      return this.pageNumCache
    },
    currentPageData: function () {
      let start = this.curPageSize * (this.pageNum - 1)
      let end = this.curPageSize * this.pageNum
      return this.sortedData.slice(start, end)
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.refreshShownWithLan()
    },
  },
  beforeMount() {
    getServiceList().then(res => {
      let nodesMap = new Map()
      if (res && res.data) {
        let len = res.data.length
        for (let i = 0; i < len; i++) {
          if (!nodesMap.has(res.data[i].serInstanceId)) {
            nodesMap.set(res.data[i].serInstanceId, {
              instance: res.data[i].serInstanceId,
              name: res.data[i].serName,
              status: res.data[i].state,
              app: res.data[i].serCategory.name,
              version: res.data[i].version,
            })
          }
        }
        this.tableData = Array.from(nodesMap.values())
      }
    })
    this.refreshShownWithLan()
  }
}
</script>

<style lang="less">
.pageContainer {
  background-color: white;
  .pageInner {
    padding: 20px;
    overflow: hidden;
    .myApp-operArea {
      height: 40px;
      .search_input{
        float: right;
        width: 200px;
      }
    }
  }
}
</style>