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
  <div class="pageInner">
    <div class="myApp-operArea">
      <el-input
        prefix-icon="el-icon-search"
        v-model="nameQueryVal"
        :placeholder="$t('SERVICE_PAGE.TABLE_HEADER_SERVICE_NAME')"
        class="search_input"
      />
    </div>
    <hr class="service-top-line">
    <el-table
      :data="sortedData"
      class="tableStyle"
      stripe
      height="412"
      style="width: 100%;"
      header-cell-class-name="headerStyle"
      :default-sort="defaultSort"
      @sort-change="sortChange"
      @filter-change="filterChange"
    >
      <el-table-column
        :label="tableHeaderName"
        prop="name"
        sortable="custom"
      />
      <el-table-column
        :column-key="'status'"
        :label="tableHeaderStatus"
        prop="status"
        :filters="[{text: 'ACTIVE', value: 'ACTIVE'}, {text: 'INACTIVE', value: 'INACTIVE'}, {text: 'SUSPENDED', value: 'SUSPENDED'}]"
        :filtered-value="filterValue.status"
      />
      <el-table-column
        :label="tableHeaderVersion"
        prop="version"
        sortable="custom"
      />
      <el-table-column
        :label="tableHeaderAppName"
        prop="app"
        sortable="custom"
      />
      <el-table-column
        :label="tableHeaderAppVersion"
        prop="appVersion"
        sortable="custom"
      />
      <el-table-column
        :label="tableHeaderOper"
      >
        <template slot-scope="scope">
          <el-button
            @click="showCalledTimes(scope.row)"
            type="text"
            size="small"
          >
            {{ tableHeaderOperView }}
          </el-button>
        </template>
      </el-table-column>
      <template slot="empty">
        <div>
          <img
            src="../assets/images/empty.png"
            alt=""
            style="padding: 10px;"
          >
          <p>{{ $t('SERVICE_PAGE.NO_DATA_NOTICE') }}</p>
        </div>
      </template>
    </el-table>
  </div>
</template>

<script>
import { lcmController } from '../tools/request'

export default {
  name: 'ServiceTable',
  data () {
    return {
      pageDesc: '',
      tableData: [],
      tableHeaderName: '',
      tableHeaderStatus: '',
      tableHeaderAppName: '',
      tableHeaderVersion: '',
      tableHeaderId: '',
      tableHeaderOper: '',
      tableHeaderOperView: '',
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
    tableRowClassName ({ row }) {
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
      this.tableHeaderAppVersion = this.$i18n.t('SERVICE_PAGE.TABLE_HEADER_APP_VERSION')
      this.tableHeaderOper = this.$i18n.t('SERVICE_PAGE.TABLE_HEADER_OPERATION')
      this.tableHeaderOperView = this.$i18n.t('SERVICE_PAGE.OPERATION_VIEW')
    },
    showCalledTimes (rowData) {
      this.$emit('showServiceDescribeInfo', rowData)
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
    }
  },
  beforeMount () {
    lcmController.getServiceList(this.$route.params.nodeIp).then(res => {
      let nodesMap = new Map()
      if (res && res.data && res.data.data) {
        let serviceList = res.data.data
        let len = serviceList.length
        for (let i = 0; i < len; i++) {
          if (!nodesMap.has(serviceList[i].serInstanceId)) {
            nodesMap.set(serviceList[i].serInstanceId, {
              instance: serviceList[i].serInstanceId,
              name: serviceList[i].serName,
              status: serviceList[i].state,
              app: serviceList[i].serCategory.name,
              version: serviceList[i].version,
              appVersion: serviceList[i].serCategory.version,
              desc: ''
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

<style lang="less" scoped>
// 边框
/deep/ .el-table td, /deep/ .el-table th.is-leaf {
    border-bottom: none;
}
/deep/ .el-table--border::after, /deep/ .el-table--group::after, /deep/ .el-table::before {
  height: 0px;
}
// 表头
/deep/ .el-table thead {
  font-size: 16px;
  color: #FFFFFF;
}
/deep/ .el-table th>.cell{
  font-weight: 400!important;
}

// 行高
/deep/ .el-table td, /deep/ .el-table th {
  padding: 6px 0;
}
/deep/ .el-table .cell{
  line-height: 40px;
}

// 斑马色
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #F2F3F5;
}

.pageInner {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  box-shadow: 0px 1px 21px 0px rgba(201, 181, 228, 0.4);
  overflow: hidden;
  padding: 0 33px 39px 33px;
  .myApp-operArea {
    padding: 30px 0 25px 0;
    height: 40px;
    .search_input{
      float: right;
      width: 269px;
    }
  }
  .service-top-line{
    height: 1px;
    background: #F2F3F5;
    border: none;
    margin: 0;
  }
}
</style>
