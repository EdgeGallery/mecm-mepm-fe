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
          min-width="10%"
        >
          <template slot-scope="scope">
            {{ scope.row.systemName }}
          </template>
        </el-table-column>
        <el-table-column
          :column-key="'type'"
          min-width="11%"
          label="镜像类型"
          show-overflow-tooltip
          :filters="typeData"
        />
        <el-table-column
          prop="userName"
          min-width="10%"
          label="所属用户"
          show-overflow-tooltip
        />
        <el-table-column
          :column-key="'operateSystem'"
          prop="operateSystem"
          min-width="14.5%"
          label="操作系统"
          show-overflow-tooltip
          :filters="osData"
        />
        <el-table-column
          prop="systemSize"
          min-width="12%"
          label="磁盘大小(M)"
        >
          <template slot-scope="scope">
            {{ scope.row.systemSize?(scope.row.systemSize/1024/1024).toFixed(2):'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="version"
          min-width="7%"
          label="版本"
          show-overflow-tooltip
        />
        <el-table-column
          prop="uploadTime"
          min-width="11.5%"
          label="上传时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.uploadTime?scope.row.uploadTime.substring(0,10):'' }}
          </template>
        </el-table-column>
        <el-table-column
          :column-key="'status'"
          min-width="9.5%"
          label="状态"
          :formatter="convertStatus"
          show-overflow-tooltip
          :filters="statusData"
        >
          上传成功
        </el-table-column>
        <el-table-column
          :label="$t('common.operation')"
          min-width="15%"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleView(scope.row)"
              class="operations_btn"
            >
              详情
            </el-button>
            <el-button
              @mouseenter.native="showMoreBtnFun(scope.$index)"
              @mouseleave.native="showMoreBtnFun(-1)"
              class="operations_btn"
            >
              更多
              <el-collapse-transition>
                <div
                  v-show="currentIndex===scope.$index"
                  class="btn_div el-icon-caret-top"
                  @mouseenter="showMoreBtnFun(scope.$index)"
                  @mouseleave="showMoreBtnFun(-1)"
                >
                  <ul class="dropdown_list">
                    <li v-if="isAdmin || userId===scope.row.userId">
                      <em />
                      <el-button
                        type="text"
                        @click="handleEdit(scope.row)"
                      >
                        编辑
                      </el-button>
                    </li>
                    <li v-if="isAdmin || userId===scope.row.userId">
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status==='UPLOADING' || scope.row.status==='UPLOADING_MERGING'"
                        @click="handleDelete(scope.row)"
                      >
                        删除
                      </el-button>
                    </li>
                    <li v-if="isAdmin || userId===scope.row.userId">
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status==='UPLOADING_MERGING' || scope.row.status==='PUBLISHED'"
                        @click="handleUpload(scope.row)"
                      >
                        上传
                      </el-button>
                    </li>
                    <li>
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status!=='UPLOAD_SUCCEED' && scope.row.status!=='PUBLISHED'"
                        @click="handleDownload(scope.row)"
                      >
                        下载
                      </el-button>
                    </li>
                    <li v-if="isAdmin">
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status!=='UPLOAD_SUCCEED'"
                        @click="handlePublish(scope.row)"
                      >
                        发布
                      </el-button>
                    </li>
                    <li v-if="isAdmin || userId===scope.row.userId">
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status!=='UPLOADING'"
                        @click="handleReset(scope.row)"
                      >
                        重置
                      </el-button>
                    </li>
                    <li>
                      <em />
                      <el-button
                        type="text"
                        :disabled="true"
                      >
                        瘦身
                      </el-button>
                    </li>
                  </ul>
                </div>
              </el-collapse-transition>
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
        { createTime: '2021-09-18 16:39:30',
          errorType: 'failedOnUploadToFS',
          operateSystem: 'ubuntu',
          status: 'UPLOAD_FAILED',
          systemBit: '64',
          systemDisk: 50,
          systemId: 1,
          systemName: 'zwjtest',
          type: 'public',
          userId: '39937079-99fe-4cd8-881f-04ca8c4fe09d',
          userName: 'admin',
          version: '1.0' }
      ],
      imageType: 'All',
      showEditImageDlg: false,
      showUploadImageDlg: false,
      showViewImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      osData: [
        { text: 'ubuntu', value: 'ubuntu' },
        { text: 'centos', value: 'centos' },
        { text: 'window', value: 'window' },
        { text: 'cirros', value: 'cirros' }
      ],
      statusData: [],
      typeData: [],
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
    }
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
