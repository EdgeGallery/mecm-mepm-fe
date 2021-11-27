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
  <div class="vm-content">
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="8"
          class="search-col"
        >
          <el-input
            v-model="nameQueryVal"
            @change="queryVM"
            :placeholder="$t('resourceMgr.searchPlaceholder')"
            class="enterinput lt"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="queryVM"
            />
          </el-input>
        </el-col>
        <el-col
          :span="12"
          class="create-col"
        >
          <el-button
            :class="language==='cn'? 'create-btn':'create-btn-en'"
            id="createVMBtn"
            @click="createVMInstance()"
          >
            {{ $t('resourceMgr.createVMInstance') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="vm-table">
      <el-table
        :data="currentPageData"
        class="tableStyle"
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        @sort-change="sortChange"
        ref="multipleTable"
        v-loading="dataLoading"
      >
        <el-table-column
          prop="instanceName"
          label="Instance Name"
          width="190"
          sortable="custom"
        />
        <el-table-column
          prop="imageName"
          label="Image Name"
        />
        <el-table-column
          prop="ip"
          label="IP Address"
        />
        <el-table-column
          prop="flavor"
          label="Flavor"
        />
        <el-table-column
          prop="status"
          label="Status"
          sortable="custom"
        />
        <el-table-column
          label="Actions"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="vmDeleteBtn"
              @click.native.prevent="deleteInstance(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('resourceMgr.delete') }}
            </el-button>
            <el-dropdown>
              <el-button
                class="operations_btn"
                type="text"
              >
                {{ $t('resourceMgr.more') }}
              </el-button>
              <el-dropdown-menu
                slot="dropdown"
                class="drop-menu"
                size="mini"
              >
                <el-dropdown-item
                  class="operations_btn"
                  @click.native="createSnapshot(scope.row)"
                  type="text"
                  :disabled="true"
                >
                  {{ $t('resourceMgr.createSnapshot') }}
                </el-dropdown-item>
                <el-dropdown-item
                  class="operations_btn"
                  @click.native="openControl(scope.row)"
                  type="text"
                  :disabled="true"
                >
                  {{ $t('resourceMgr.control') }}
                </el-dropdown-item>
                <el-dropdown-item
                  class="operations_btn"
                  @click.native="pauseInstance(scope.row)"
                  type="text"
                  :disabled="true"
                >
                  {{ $t('resourceMgr.pauseInstance') }}
                </el-dropdown-item>
                <el-dropdown-item
                  class="operations_btn"
                  @click.native="hangInstance(scope.row)"
                  type="text"
                  :disabled="true"
                >
                  {{ $t('resourceMgr.hangInstance') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
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
    <div v-if="isShowForm">
      <VMInstanceDlg
        v-model="isShowForm"
        @reloadTableData="reloadTableData"
      />
    </div>
  </div>
</template>
<script>
import pagination from '../../components/Pagination.vue'
import VMInstanceDlg from '../vmInstance/VMInstanceDlg.vue'
import { resController } from '../../tools/request.js'
export default {
  components: {
    pagination,
    VMInstanceDlg
  },
  data () {
    return {
      nameQueryVal: '',
      paginationData: [],
      currentPageData: [{
        instanceName: 'testVM',
        imageName: 'testImage',
        ip: '100.100.100.100',
        flavor: 'm1.small',
        status: 'run'
      }],
      isShowForm: false,
      dataLoading: true,
      language: localStorage.getItem('language')
    }
  },
  methods: {
    editInstance () {

    },
    deleteInstance (row) {
      this.$confirm(this.$t('resourceMgr.deleteVMMessage'), this.$t('resourceMgr.deleteVMTitle'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        // confirm
        let hostIp = sessionStorage.getItem('hostIp')
        resController.deleteVMByVMId(hostIp, row.id).then(res => {
        // TODO
          this.getTableData()
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
        // cancel
      })
    },
    createVMInstance () {
      this.isShowForm = true
    },
    createSnapshot (row) {

    },
    openControl (row) {

    },
    pauseInstance (row) {

    },
    hangInstance (row) {

    },
    sortChange () {

    },
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key].toLowerCase()
        return itemVal.indexOf(val) > -1
      })
    },
    queryVM () {
      if (this.paginationData && this.paginationData.length > 0) {
        if (this.nameQueryVal && this.nameQueryVal.length > 0) {
          this.filterTableData(this.nameQueryVal, 'instanceName')
        }
      }
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    getTableData () {
      let hostIp = sessionStorage.getItem('hostIp')
      resController.queryVMsByMechost(hostIp).then(res => {
        // TODO
        this.paginationData = res.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
      })
    },
    reloadTableData () {
      this.getTableData()
    }
  },
  mounted () {
    this.getTableData()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>
<style lang="less" scoped>
.vm-content{
  width: 1053px;
  height: 602px;
  padding-top: 1px;
  border-radius: 16px;
  box-shadow: 0px 3px 62px 6px rgba(226, 220, 247, 0.6) inset;
  .search-createBtn{
    .search-col{
      margin-top: 30px;
      margin-left: 30px;
    }
    .create-col{
      text-align: center;
      .create-btn{
        margin-left: 486px;
        margin-top: 30px;
        height: 40px;
        color: #fff;
        font-size: 20px !important;
        border-radius: 10px;
        padding: 0 35px;
        background-image: linear-gradient(127deg, #4444d0, #6724cb);
        border: none;
      }
      .create-btn-en{
        margin-left: 425px;
        margin-top: 30px;
        height: 40px;
        color: #fff;
        font-size: 20px !important;
        border-radius: 10px;
        padding: 0 35px;
        background-image: linear-gradient(127deg, #4444d0, #6724cb);
        border: none;
      }
    }
  }
  .vm-table{
    width: 1000px;
    margin: 30px auto;
  }
}
</style>
