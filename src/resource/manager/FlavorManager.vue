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
  <div class="flavor-content">
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="8"
          class="search-col"
        >
          <el-input
            v-model="nameQueryVal"
            @change="queryFlavor"
            :placeholder="$t('resourceMgr.searchPlaceholder')"
            class="enterinput lt"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="queryFlavor"
            />
          </el-input>
        </el-col>
        <el-col
          :span="12"
          class="create-col"
        >
          <el-button
            class="create-btn"
            id="createFlavorBtn"
            @click="createFlavor()"
          >
            {{ $t('resourceMgr.createFlavor') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="flavor-table">
      <el-table
        :data="currentPageData"
        class="tableStyle"
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        @sort-change="sortChange"
        ref="multipleTable"
      >
        <el-table-column
          prop="flavorName"
          label="Flavor Name"
          width="158"
          sortable="custom"
        />
        <el-table-column
          prop="id"
          label="ID"
          width="50"
        />
        <el-table-column
          prop="vcpus"
          label="VCPUs"
          width="85"
        />
        <el-table-column
          prop="ram"
          label="RAM"
        />
        <el-table-column
          prop="rootDisk"
          label="Root Disk"
          width="120"
        />
        <el-table-column
          prop="ephemeral"
          label="Ephemeral Disk"
          width="120"
        />
        <el-table-column
          prop="txfactor"
          label="RX/TXfactor"
          width="120"
        />
        <el-table-column
          prop="public"
          label="Public"
        />
        <el-table-column
          label="Actions"
          width="170"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="flavorEditBtn"
              @click.native.prevent="editFlavor(scope.row)"
              type="text"
              size="small"
              :disabled="true"
            >
              {{ $t('resourceMgr.edit') }}
            </el-button>
            <el-button
              class="operations_btn"
              id="flavorDeleteBtn"
              @click.native.prevent="deleteFlavor(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('resourceMgr.delete') }}
            </el-button>
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
      <FlavorForm
        v-model="isShowForm"
      />
    </div>
  </div>
</template>
<script>
import pagination from '../../components/Pagination.vue'
import FlavorForm from '../form/FlavorForm.vue'
export default {
  components: {
    pagination,
    FlavorForm
  },
  props: {
  },
  data () {
    return {
      nameQueryVal: '',
      paginationData: [],
      currentPageData: [{
        flavorName: 'CIRROS256',
        id: 'c1',
        vcpus: '12',
        ram: '256GB',
        rootDisk: '10GB',
        ephemeral: '0GB',
        txfactor: '1.0',
        public: 'yes'
      }],
      isShowForm: false
    }
  },
  methods: {
    editFlavor () {

    },
    deleteFlavor (row) {
      this.$confirm(this.$t('resourceMgr.deleteFlavorMessage'), this.$t('resourceMgr.deleteFlavorTitle'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        // confirm
      }).catch(() => {
        // cancel
      })
    },
    createFlavor () {
      this.isShowForm = true
    },
    queryFlavor () {

    },
    sortChange () {

    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    getTableData () {

    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="less" scoped>
.flavor-content{
  width: 1053px;
  height: 613px;
  padding-top: 1px;
  border-radius: 16px;
  box-shadow: 0px 3px 62px 6px rgba(226, 220, 247, 0.6) inset;
  .search-createBtn{
    .search-col{
      margin-top: 30px;
      margin-left: 50px;
    }
    .create-col{
      text-align: center;
      .create-btn{
        margin-left: 470px;
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
  .flavor-table{
    width: 1000px;
    margin: 30px auto;
  }
}
</style>
