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
  <div class="image-content">
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="8"
          class="search-col"
        >
          <el-input
            v-model="nameQueryVal"
            @change="queryImage"
            :placeholder="$t('resourceMgr.searchPlaceholder')"
            class="enterinput lt"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="queryImage"
            />
          </el-input>
        </el-col>
        <el-col
          :span="12"
          class="create-col"
        >
          <el-button
            class="create-btn"
            id="createImageBtn"
            @click="createImage()"
          >
            {{ $t('resourceMgr.createImage') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="image-table">
      <el-table
        :data="currentPageData"
        class="tableStyle"
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        @sort-change="sortChange"
        ref="multipleTable"
      >
        <el-table-column
          prop="imageName"
          :label="$t('resourceMgr.name')"
          sortable="custom"
        />
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="type"
          :label="$t('resourceMgr.type')"
        />
        <el-table-column
          prop="status"
          :label="$t('resourceMgr.status')"
        />
        <el-table-column
          prop="visibility"
          :label="$t('resourceMgr.visibility')"
          width="110"
          sortable="custom"
        />
        <el-table-column
          prop="protect"
          :label="$t('resourceMgr.protect')"
        />
        <el-table-column
          prop="diskFormat"
          :label="$t('resourceMgr.diskFormat')"
        />
        <el-table-column
          prop="size"
          :label="$t('resourceMgr.size')"
        />
        <el-table-column
          :label="$t('resourceMgr.operator')"
          width="170"
          sortable="custom"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="imageEditBtn"
              @click.native.prevent="editImage(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('resourceMgr.edit') }}
            </el-button>
            <el-button
              class="operations_btn"
              id="imageDeleteBtn"
              @click.native.prevent="deleteInstance(scope.row)"
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
  data () {
    return {
      nameQueryVal: '',
      paginationData: [],
      currentPageData: [{
        imageName: 'testImage',
        id: 'xxx',
        type: 'image',
        status: '运行中',
        visibility: '共享的',
        protect: '否',
        diskFormat: 'QCOW2',
        size: '760.38M'
      }]
    }
  },
  methods: {
    editImage () {

    },
    deleteImage () {

    },
    createImage () {

    },
    queryImage () {

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
.image-content{
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
  .image-table{
    width: 1000px;
    margin: 30px auto;
  }
}
</style>
