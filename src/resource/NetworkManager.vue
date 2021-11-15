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
  <div class="network-content">
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="8"
          class="search-col"
        >
          <el-input
            v-model="nameQueryVal"
            @change="queryNetwork"
            :placeholder="$t('resourceMgr.searchPlaceholder')"
            class="enterinput lt"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="queryNetwork"
            />
          </el-input>
        </el-col>
        <el-col
          :span="12"
          class="create-col"
        >
          <el-button
            class="create-btn"
            id="createNetworkBtn"
            @click="createNetwork()"
          >
            {{ $t('resourceMgr.createNetwork') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="network-table">
      <el-table
        :data="currentPageData"
        class="tableStyle"
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        @sort-change="sortChange"
        ref="multipleTable"
      >
        <el-table-column
          prop="name"
          label="Name"
          sortable="custom"
        />
        <el-table-column
          prop="subnetsAssociated"
          label="Subnets Associated"
        />
        <el-table-column
          prop="shared"
          label="Shared"
        />
        <el-table-column
          prop="external"
          label="External"
        />
        <el-table-column
          prop="status"
          label="Status"
          width="110"
          sortable="custom"
        />
        <el-table-column
          prop="adminState"
          label="Admin State"
        />
        <el-table-column
          prop="availability"
          label="Availability Zones"
        />
        <el-table-column
          label="Actions"
          width="170"
          sortable="custom"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="networkEditBtn"
              @click.native.prevent="editNetwork(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('resourceMgr.edit') }}
            </el-button>
            <el-button
              class="operations_btn"
              id="networkDeleteBtn"
              @click.native.prevent="deleteNetwork(scope.row)"
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
              src="../assets/images/empty.png"
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
import pagination from '../components/Pagination.vue'
export default {
  components: {
    pagination
  },
  props: {
  },
  data () {
    return {
      nameQueryVal: '',
      paginationData: [{
        name: 'Public',
        subnetsAssociated: 'public-hsei-sdhs20015p',
        shared: 'No',
        external: 'No',
        status: '运行中',
        adminState: 'UP',
        availability: 'Nova'
      }],
      currentPageData: [{
        name: 'Public',
        subnetsAssociated: 'public-hsei-sdhs20015p',
        shared: 'No',
        external: 'No',
        status: '运行中',
        adminState: 'UP',
        availability: 'Nova'
      }]
    }
  },
  methods: {
    editNetwork () {

    },
    deleteNetwork () {

    },
    createNetwork () {

    },
    queryNetwork () {

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
.network-content{
  width: 1100px;
  height: 590px;
  padding-top: 1px;
  box-shadow: 2px 5px 23px 10px rgba(104, 142, 243, 0.2) inset;
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
  .network-table{
    width: 1000px;
    margin: 30px auto;
  }
}
</style>
