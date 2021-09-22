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
  <div class="vmlist">
    <div
      class="cls_vmlist clear"
      id="div_vmlist"
    >
      <div class="titleSea">
        <Search
          @getSearchData="getSearchData"
        />
      </div>
      <el-table
        :data="imageListData"
        :default-sort="{prop: 'createTime', order: 'descending'}"
        v-loading="dataLoading"
        style="width: 100%"
        class="tableStyle default_dropdown"
        :class="{'tableStyle_en':language==='en'}"
      >
        <el-table-column
          prop="systemName"
          label="镜像名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.systemName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="所属用户"
          show-overflow-tooltip
        />
        <el-table-column
          :column-key="'operateSystem'"
          prop="operateSystem"
          label="操作系统"
          show-overflow-tooltip
        />
        <el-table-column
          prop="systemSize"
          label="磁盘大小(M)"
        >
          <template slot-scope="scope">
            {{ scope.row.systemSize?(scope.row.systemSize/1024/1024).toFixed(2):'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本"
          show-overflow-tooltip
        />
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
              @click="handleDelete(scope.row)"
              class="operations_btn"
            >
              删除
            </el-button>
            <el-button
              :disabled="scope.row.status!=='UPLOAD_SUCCEED' && scope.row.status!=='PUBLISHED'"
              class="operations_btn"
            >
              <a
                href="./cirros.zip"
                :download="scope.row.systemName+'.tar'"
                style="color:#606266;"
              >下载</a>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Search from './ImageSearch'

export default {
  name: 'ImageMgmt',
  components: {
    Search
  },
  props: {
    newvmdata: {
      type: Object,
      required: true
    }
  },
  watch: {
    newvmdata (val) {
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
        systemName: '',
        operateSystem: '',
        status: 'All',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      pageCtrl: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      sortCtrl: {
        sortBy: 'createTime',
        sortOrder: 'DESC'
      },
      imageListData: [
        {
          createTime: '2021-09-18 16:39:30',
          errorType: 'failedOnUploadToFS',
          operateSystem: 'ubuntu',
          status: 'UPLOAD_FAILED',
          systemBit: '64',
          systemDisk: 50,
          systemId: 1,
          systemName: 'anheng/anheng-waf',
          type: 'public',
          userId: '39937079-99fe-4cd8-881f-04ca8c4fe09d',
          userName: 'admin',
          version: '1.0',
          systemSize: '152687425'
        }
      ],
      imageType: 'All',
      showEditImageDlg: false,
      showUploadImageDlg: false,
      showViewImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      statusData: [],
      currentIndex: -1
    }
  },
  methods: {
    showMoreBtnFun (index) {
      this.currentIndex = index
    },
    getSearchData (searchFormData) {
      this.pageCtrl.currentPage = 1
      this.searchCondition.systemName = searchFormData.systemName
      this.searchCondition.operateSystem = searchFormData.operateSystem
      this.searchCondition.status = searchFormData.status
      this.searchCondition.createTimeBegin = ''
      this.searchCondition.createTimeEnd = ''
      if (searchFormData.createTimeRange && searchFormData.createTimeRange.length === 2) {
        this.searchCondition.createTimeBegin = searchFormData.createTimeRange[0]
        this.searchCondition.createTimeEnd = searchFormData.createTimeRange[1]
      }
    },
    convertStatus (row) {
      if (row.status) {
        let statusOption = this.statusData.find(item => item.value === row.status)
        if (statusOption) {
          return statusOption.text
        }
      }
      return this.$t('common.unknown')
    },
    handleView () {

    },
    handleEdit () {},
    handleDelete (row) {
      this.$confirm('确认删除 ' + row.systemName + ' 镜像？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功！')
        this.imageListData.forEach((item, index) => {
          if (row.systemName === item.systemName) {
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
    handleUpload () {}
  }
}
</script>
<style lang="less">
.vmlist{
  border-radius: 16px;
  background: #fff;
  padding: 30px 60px;
  .createimage_btn{
    position: absolute;
    right: 0;
    bottom: 30px;
    height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
    padding: 0 35px;
    .new_icon{
      display: inline-block;
      width: 19px;
      height: 19px;
      background: url('../assets/images/work_new_project.png');
      margin-right: 3px;
      position: relative;
      top: 2px;
    }
  }
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .el-form-item__label {
    padding: 0 20px 0 0
  }
  .cls_vmlist{
    .titleSea{
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
}
</style>
