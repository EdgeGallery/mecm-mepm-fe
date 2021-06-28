<template>
  <div class="overview">
    <div class="banner">
      <div class="pl-255 pt-118">
        <div class="fs-28 font-regular">
          EDGE NODE MANAGEMENT PLATFORM
        </div>
        <div class="fs-74 font-bold font-weight-600 space-6">
          边缘节点管理平台
        </div>
        <div class="banner-buttons">
          <el-button
            @click="jumpToEdgeNodesPage()"
          >
            {{ $t("nav.edgeNodes") }}
          </el-button>
          <el-button
            @click="jumpToPackagePage()"
          >
            {{ $t("nav.packageMana") }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="package-area">
        <div class="package-data right-division">
          <img
            src="../assets/images/usable_package.png"
            alt="usable package count."
          >
          <div class="words-area">
            <div class="words-area-title">
              {{ $t("overview.availablePackage") }}
            </div>
            <div class="words-area-value">
              {{ packageUploadedCount }}
            </div>
          </div>
        </div>
        <div class="package-data right-division">
          <img
            src="../assets/images/distributed_package.png"
            alt="distributed package count."
          >
          <div class="words-area">
            <div class="words-area-title">
              {{ $t("overview.distributedPackage") }}
            </div>
            <div class="words-area-value">
              {{ distributedCount }}
            </div>
          </div>
        </div>
        <div class="package-data">
          <img
            src="../assets/images/deployed_package.png"
            alt="deployed package count."
          >
          <div class="words-area">
            <div class="words-area-title">
              {{ $t("overview.deployedPackage") }}
            </div>
            <div class="words-area-value">
              {{ deployedCount }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="nodeList.length > 0"
        class="node-area"
      >
        <div class="node-area-title">
          {{ $t("overview.nodeInfo") }}
        </div>
        <div class="node-area-title-underline" />
        <div class="node-list">
          <el-row class="mb-30">
            <el-col :span="16">
              <div class="fs-18 pb-10">
                {{ $t("overview.commonNodesInfo") }}
              </div>
              <el-radio-group v-model="radio">
                <el-radio
                  v-for="(item, index) in nodeList.slice(0, 6)"
                  :key="index"
                  :label="index"
                />
              </el-radio-group>
            </el-col>
            <el-col :span="8">
              <el-button
                @click="moreNodesInfo()"
                class="float-right"
              >
                {{ $t('overview.moreNodes') }}
              </el-button>
            </el-col>
          </el-row>
          <NodeDetails
            :detail="curShownNodeInfo"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NodeDetails from './NodeDetails.vue'
import Footer from '../components/Footer.vue'
import { lcmController } from '../tools/request.js'
export default {
  components: { NodeDetails, Footer },
  data () {
    return {
      retryCount: 3,
      packageUploadedCount: 0,
      distributedCount: 0,
      deployedCount: 0,
      nodeList: [],
      radio: 0
    }
  },
  computed: {
    curShownNodeInfo: function () {
      if (this.nodeList.length > this.radio) {
        return this.nodeList[this.radio]
      }
      return null
    }
  },
  methods: {
    jumpToEdgeNodesPage () {
      this.$router.push({ name: 'hostOverview' })
    },
    jumpToPackagePage () {
      this.$router.push({ name: 'apaclist' })
    },
    moreNodesInfo () {
      this.$router.push({ name: 'hostOverview' })
    },
    async getAppDistributedCount () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await lcmController.getDistributionList().then(res => {
          let count = 0
          if (res.data && res.data.length > 0) {
            this.packageUploadedCount = res.data.length
            res.data.forEach(item => {
              count = count + this.getDistributedCountForHost(item)
            })
            this.distributedCount = count
            isQuerySuccess = true
          }
        }).catch((error) => {
          console.log('Failed to get distribution count', error.response)
        })
      }
    },
    getDistributedCountForHost (resItem) {
      let count = 0
      if (resItem.mecHostInfo && resItem.mecHostInfo.length > 0) {
        resItem.mecHostInfo.forEach(host => {
          if (host.status === 'Distributed') {
            count++
          }
        })
      }
      return count
    },
    async getAppInfo () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await lcmController.getInstanceList().then(res => {
          if (res.data && res.data.response && res.data.response.length > 0) {
            this.deployedCount = res.data.response.length
            isQuerySuccess = true
          }
        }).catch((error) => {
          console.log('Failed to get Instance count', error.response)
        })
      }
    },
    async getTotalNodes () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await lcmController.getHostList().then(res => {
          if (res.data && res.data.length > 0) {
            this.nodeList = res.data
            isQuerySuccess = true
          }
        }).catch((error) => {
          console.log('Failed to get host list -> ', error.response)
        })
      }
    }
  },
  created () {
    this.getAppDistributedCount()
    this.getAppInfo()
    this.getTotalNodes()
  }
}
</script>
<style lang='less' scoped>
.font-bold{
  font-family: HarmonyOS_Sans_Bold;
}
.font-regular{
  font-family: HarmonyOS_Sans_Regular;
}
.font-weight-600 {
  font-weight: 600;
}
.space-6 {
  letter-spacing: 6px;
}
.pb-10{
  padding-bottom: 10px;
}
.mb-30{
  margin-bottom: 30px;
}
.float-right{
  float: right;
}
.pl-255{
  padding-left: 255px;
}
.pt-118{
  padding-top: 118px;
}
.fs-28{
  font-size: 28px;
}
.fs-74{
  font-size: 74px;
}
.fs-18{
  font-size: 18px;
}
.overview{
  margin-top: 60px;
  background-color: #FFFFFF;
  .banner{
    height: 545px;
    background: center / cover no-repeat url("../assets/images/banner_new.png");
    color: #FFFFFF;
    .banner-buttons{
      padding-top: 34.5px;
      .el-button{
        font-size: 20px!important;
        background-color: unset;
        color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 6px;
        padding: 14px 30px;
      }
      .el-button:hover{
        color: #F5EA6E;
        border: 1px solid #F5EA6E;
      }
    }
    .banner-buttons :nth-child(2) {
      margin-left: 60px;
    }
  }
  .content{
    width: 80%;
    margin: 0 auto;
    margin-bottom: 115px;
    .package-area{
      margin-top: -74px;
      background-color: #FFFFFF;
      border-radius: 8px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      text-align: center;
      overflow: visible;
      box-shadow: 0px 0px 38px 10px rgba(214, 187, 249, 0.2) inset;
      .package-data{
        height: 208px;
        display: flex;
        justify-content: center;
        align-items: center;
        .words-area{
          margin-left: 20px;
          text-align: left;
          .words-area-title{
            font-size: 20px;
            font-weight: 400;
            color: #280B4E;
            line-height: 26px;
          }
          .words-area-value{
            font-size: 36px;
            font-weight: 400;
            color: #FD8864;
            line-height: 62px;
          }
        }
      }
      .right-division{
        background: right / 2px 75px no-repeat url('../assets/images/vertical-division.png')
      }
    }
    .node-area{
      margin-top: 40px;
      .node-area-title{
        font-size: 24px;
        color: #280B4E;
      }
      .node-area-title-underline{
        margin: 4px 0 0 44px;
        width: 48px;
        height: 2px;
        background: linear-gradient(270deg, #BFABDA, #280B4E);
      }
      .node-list{
        margin-top: 30px;
        background: #F4F4FF;
        box-shadow: 0px 1px 51px 0px rgba(209, 209, 209, 0.2);
        border-radius: 8px;
        padding: 30px 40px 40px 40px;
        /deep/ .el-radio__label{
          display: none;
        }
        /deep/ .el-radio{
          margin-right: 7px;
        }
        /deep/ .el-radio__inner{
          width: 12px;
          height: 12px;
          background: #D1D1D1;
        }
        /deep/ .el-radio__input.is-checked .el-radio__inner::after{
          content: none;
        }
        /deep/ .el-radio__input.is-checked .el-radio__inner{
          background: #451F78;
        }
        .el-button{
          font-size: 16px;
          border-radius: 6px;
          padding: 8px 12px;
        }
        .el-button:hover{
          background-color: unset;
          color: #463098;
          border: 1px solid #463098;
        }
      }
    }
  }
}
</style>
