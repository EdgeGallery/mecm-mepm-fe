<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div class="containerlist">
    <div
      class="cls_imagelist clear"
      id="div_imagelist"
    >
      <div class="titleSea">
        <Search
          @getSearchData="getSearchData"
        />
        <el-button
          class="Synchronize bgBtn"
          @click="synchronizeContainerImage"
          :loading="synchronizeImageLoading"
          v-if="isAdmin"
        >
          {{ !synchronizeImageLoading?$t('system.imageMgmt.containerImage.synchronize'):$t('system.imageMgmt.containerImage.syncing') }}
        </el-button>
      </div>
      <el-table
        :data="imageListData"
        :default-sort="{prop: 'createTime', order: 'descending'}"
        v-loading="dataLoading"
        style="width: 100%"
        class="tableStyle default_dropdown"
      >
        <el-table-column
          prop="imageName"
          label="镜像名称"
        >
          <template slot-scope="scope">
            {{ scope.row.imageName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="imagePath"
          label="镜像路径"
        />
        <el-table-column
          prop="userName"
          label="所属用户"
        />
        <el-table-column
          prop="imageVersion"
          label="版本"
        />
        <el-table-column
          label="是否公开"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.imageType"
              active-color="#13ce66"
              inactive-color="#c0ccda"
              :disabled="scope.row.userId!==userId"
              active-value="public"
              inactive-value="private"
              @change="changeImageType(scope.row.imageId,scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="上传时间"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.operation')"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
            >
              <a
                href="./cirros.zip"
                :download="scope.row.imageName+'.tar'"
                style="color:#606266;"
              >下载</a>
            </el-button>
            <el-button
              :disabled="scope.row.userId!==userId"
              @click="handleDelete(scope.row)"
              class="operations_btn"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Search from './ImageSearch.vue'

export default {
  name: 'ImageMgmt',
  components: {
    Search
  },
  props: {
    newcontainerdata: {
      type: Object,
      required: true
    }
  },
  watch: {
    newcontainerdata (val) {
      console.log(val)
      if (val) {
        this.imageListData.push(val)
      }
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      userId: '',
      isAdmin: false,
      dataLoading: false,
      searchCondition: {
        imageName: '',
        userId: '',
        createTimeBegin: '',
        createTimeEnd: '',
        limit: 12,
        offset: 0,
        sortBy: 'upload_time',
        sortOrder: 'desc'
      },
      limitSize: 12,
      offsetPage: 0,
      listTotal: 1,
      imageListData: [
        {
          createTime: '2021-09-18 10:00:41',
          fileName: 'hello.tar',
          imageId: '7d8316e5-c3e8-4ae8-8a06-e830920eff39',
          imageName: 'vesoft/nebula-importer',
          imagePath: '192.168.1.38/developer/vesoft/nebula-importer:v1',
          imageStatus: 'UPLOAD_SUCCEED',
          imageType: 'private',
          imageVersion: 'v1',
          uploadTime: '2021-09-18T10:00:41.000+0000',
          userId: '39937079-99fe-4cd8-881f-04ca8c4fe09d',
          userName: 'admin'
        }
      ],
      showEditImageDlg: false,
      showUploadImageDlg: false,
      showViewImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      statusData: [],
      typeData: [],
      currentIndex: -1,
      synchronizeImageLoading: false
    }
  },
  methods: {
    getSearchData (searchFormData) {
      this.searchCondition.imageName = searchFormData.systemName
      this.searchCondition.createTimeBegin = ''
      this.searchCondition.createTimeEnd = ''
      if (searchFormData.createTimeRange && searchFormData.createTimeRange.length === 2) {
        this.searchCondition.createTimeBegin = searchFormData.createTimeRange[0]
        this.searchCondition.createTimeEnd = searchFormData.createTimeRange[1]
      }
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    },
    handleDelete (row) {
      this.$confirm('确认删除 ' + row.imageName + ' 镜像？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功！')
        this.imageListData.forEach((item, index) => {
          if (row.imageName === item.imageName) {
            this.imageListData.splice(index, 1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    changeImageType (row) {
      if (row.imageType === 'private') {
        row.imageType = '公开'
      } else {
        row.imageType = '私有'
      }
      this.$message.success('修改成功！')
    }
  }
}
</script>
<style lang="less">
.containerlist{
  border-radius: 16px;
  background: #fff;
  padding: 30px 60px;
  .cls_imagelist .titleSea{
    position: relative;
    .Synchronize{
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
