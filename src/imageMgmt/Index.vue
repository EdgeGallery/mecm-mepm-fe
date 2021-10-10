<template>
  <div class="image_div padding_default">
    <div class="title_top title_left FontBlod">
      {{ $t('imageMgmt.imageMgmt') }}
      <span class="line_bot1" />
      <el-button
        class="createimage_btn linearGradient2 image_mgmt"
        id="createimage_btn"
        @mouseenter.native="showImageType=true"
        @mouseleave.native="showImageType=false"
      >
        <em class="new_icon" />
        {{ $t('imageMgmt.newImg') }}
        <em
          class="system_up el-icon-caret-top"
          v-show="showImageType"
        />
        <el-collapse-transition>
          <div
            v-show="showImageType"
            class="down_div"
            @mouseenter="showImageType=true"
            @mouseleave="showImageType=false"
          >
            <div
              class="transition-box"
              @click="selectAddType('container')"
            >
              <em />{{ $t('imageMgmt.container') }}
            </div>
            <div
              class="transition-box"
              @click="selectAddType('vm')"
            >
              <em />{{ $t('imageMgmt.vmImage') }}
            </div>
          </div>
        </el-collapse-transition>
      </el-button>
    </div>
    <ul class="list_top clear">
      <li
        @click="activeName='container'"
        :class="{'container_active':activeName==='container','container_default':activeName==='vm'}"
      >
        <span>
          <em class="image_container" />{{ $t('imageMgmt.container') }}
        </span>
      </li>
      <li
        @click="activeName='vm'"
        :class="{'vm_active':activeName==='vm','vm_default':activeName==='container'}"
      >
        <span>
          <em class="image_vm" />{{ $t('imageMgmt.vmImage') }}
        </span>
      </li>
      <li
        class="last_li"
        :class="{'vm_active':activeName==='vm','vm_default':activeName==='container'}"
      >
        <span />
      </li>
    </ul>
    <div
      class="container_div"
      :class="{'vm_div':activeName==='vm'}"
    >
      <ContainerImage
        v-show="activeName==='container'"
        ref="ContainerImage"
        :newcontainerdata="newcontainerIamgeData"
      />
      <VMImage
        v-show="activeName==='vm'"
        ref="VMImage"
        :newvmdata="newVmIamgeData"
      />
    </div>
    <el-dialog
      :visible.sync="showUploadImageDlg"
      width="30%"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        {{ $t('imageMgmt.uploadContainerImage') }}
      </div>
      <div>
        <div style="text-align:center">
          <img
            :src="uploadContainerImageTipImg"
            alt=""
          >
        </div>
        <div>
          <el-upload
            class="upload-demo"
            action="./"
            :on-change="handleChange"
          >
            <el-button
              size="small"
              type="primary"
            >
              {{ $t('imageMgmt.upload') }}
            </el-button>
          </el-upload>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="showUploadImageDlg=false"
          class="bgBtn"
        >
          <strong> {{ $t('common.close') }}</strong>
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showUploadVmImageDlg"
      width="30%"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        {{ $t('imageMgmt.uploadVMImage') }}
      </div>
      <div>
        <div style="text-align:center">
          <img
            :src="uploadSystemImageTipImg"
            alt=""
          >
        </div>
        <div>
          <el-upload
            class="upload-demo"
            action="./"
            :on-change="handleVmChange"
          >
            <el-button
              size="small"
              type="primary"
            >
              {{ $t('imageMgmt.upload') }}
            </el-button>
          </el-upload>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="showUploadVmImageDlg=false"
          class="bgBtn"
        >
          <strong> {{ $t('common.close') }}</strong>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ContainerImage from './ContainerImage.vue'
import VMImage from './VMImage'

export default {
  name: 'ImageMgmt',
  components: {
    ContainerImage, VMImage
  },
  data () {
    return {
      showUploadImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      activeName: 'container',
      showImageType: false,
      newcontainerIamgeData: {},
      newVmIamgeData: {},
      showUploadVmImageDlg: false,
      uploadContainerImageTipImg: require('@/assets/images/UploadContainerImageTip.png'),
      uploadSystemImageTipImg: require('@/assets/images/UploadSystemImageTip.png'),
      fileList: [],
      fileName: '',
      vmFileName: '',
      showConProgress: false,
      conPercentage: 0,
      showVmProgress: false,
      vmPercentage: 0,
      conInterval: null,
      vmInterval: null
    }
  },
  methods: {
    selectAddType (type) {
      if (type === 'container') {
        this.showUploadImageDlg = true
      } else {
        this.showUploadVmImageDlg = true
      }
    },
    handleChange (val) {
      if (val.name !== this.fileName) {
        this.fileName = val.name
        this.conPercentage = 0
        this.showConProgress = true
        this.conInterval = setInterval(() => {
          this.conPercentage += 10
          if (this.conPercentage === 100) {
            this.conInterval = null
            clearInterval(this.conInterval)
            this.newcontainerIamgeData = {
              createTime: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
              fileName: 'cirror.tar',
              imageId: '7d8316e5-c3e8-4ae8-8a06-e830920eff39',
              imageName: 'soft/yunxun-importer',
              imagePath: '192.168.1.38/developer/vesoft/yunxun-importer:v1',
              imageStatus: 'UPLOAD_SUCCEED',
              imageType: 'private',
              imageVersion: 'v1',
              uploadTime: '2021-09-18T10:00:41.000+0000',
              userId: '39937079-99fe-4cd8-881f-04ca8c4fe09d',
              userName: 'admin'
            }
            this.showUploadImageDlg = false
            this.$message.success("$t('tip.uploadSuccess')")
          }
        }, 1000)
      }
    },
    formatDate (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    },
    handleVmChange (val) {
      if (val.name !== this.vmFileName) {
        this.vmFileName = val.name
        this.vmPercentage = 0
        this.showVmProgress = true
        this.vmInterval = setInterval(() => {
          this.vmPercentage += 10
          if (this.vmPercentage === 100) {
            this.vmInterval = null
            clearInterval(this.vmInterval)
            this.newVmIamgeData = {
              createTime: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
              errorType: 'failedOnUploadToFS',
              operateSystem: 'ubuntu',
              status: 'UPLOAD_SUCCESS',
              systemBit: '64',
              systemDisk: 50,
              systemId: 1,
              systemName: 'yunxun/yunxun-AI',
              type: 'public',
              userId: '39937079-99fe-4cd8-881f-04ca8c4fe09d',
              userName: 'admin',
              version: '1.0',
              systemSize: '152687425'
            }
            this.showUploadVmImageDlg = false
            this.$message.success('上传成功！')
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less">
.image_div{
  .FontBlod{
    font-family: HarmonyOS_Sans_Bold, Arial, Helvetica, sans-serif;
  }
  .createimage_btn{
    position: absolute;
    right: 0;
    bottom: -20px;
    height: 50px;
    color: #fff;
    font-size: 20px !important;
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
  .system_up.el-icon-caret-top{
      color: #5b2ecd;
      position: absolute;
      right: 25px;
      top: 47px;
      z-index: 99999;
    }
  .down_div{
    width: 100%;
    position: absolute;
    right: 0;
    top: 60px;
    border-radius: 10px;
    font-size: 16px;
    color: #b793e9;
    background-image: linear-gradient(127deg, #4444d0, #6724cb);
    box-shadow:0px -20px 15px -15px rgba(94,64,200,0.6),
               0px 30px 30px -15px rgba(94,64,200,0.6);
    .transition-box{
      height: 40px;
      line-height: 40px;
      position: relative;
      z-index: 2;
      em{
        display: inline-block;
        width: 3px;
        border-radius: 1.5px;
        position: absolute;
        top: 16px;
        left: 4px;
        transition:all 0.6s;
      }
    }
    .transition-box:last-child{
      border-top: 1px solid #4215c8;
    }
    .transition-box:hover{
      color: #fff;
      em{
        background: #a1a7e6;
        height: 8px;
        transform: scale(1,2);
      }
    }
  }
  .list_top{
    li{
      float: left;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      span{
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 30px;
        font-size: 20px;
        color: #fff;
        transition: all 0.5s;
      }
    }
    .last_li{
      cursor: default;
    }
    em{
      display: inline-block;
      width: 19px;
      height: 22px;
      position: relative;
      top: 4px;
      margin-right: 10px;
    }
    .image_container{
      background: url('../assets/images/system_image_container.png');
    }
    .image_vm{
      background: url('../assets/images/system_image_vm.png');
    }
    .container_active .image_container{
      background: url('../assets/images/system_image_container_active.png');
    }
    .vm_active .image_vm{
      background: url('../assets/images/system_image_vm_active.png');
    }
    .container_active{
      background: #d4d1ec;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #fff;
        border-radius: 16px 16px 0 0;
        color: #5e40c8;
        transition: all 0.5s;
      }
    }
    .vm_default{
      background: #fff;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #d4d1ec;
        border-radius: 0 16px 0 16px;
        transition: all 0.5s;
      }
    }
    .last_li.vm_default{
      background: #d4d1ec;
      span{
        background: linear-gradient(to bottom, #f5f4f8, #f1edf6);
        border-radius: 0 0 0 16px;
        transition: all 0.5s;
      }
    }
    .container_default{
      background: #fff;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #d4d1ec;
        border-radius: 16px 0 16px 0;
        transition: all 0.5s;
      }
    }
    .vm_active{
      background: #d4d1ec;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #fff;
        border-radius: 16px 16px 0 0;
        color: #5e40c8;
        transition: all 0.5s;
      }
    }
    .last_li.vm_active{
      background: #fff;
      span{
        background: #f5f6f8;
        border-radius: 0 0 0 16px;
      }
    }
  }
  .container_div{
    background: #fff;
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
  }
  .vm_div{
    background: #d4d1ec;
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
  }
  .view_image_dialog .el-dialog{
    width: 40%;
    min-width: 600px;
  }
}
</style>
