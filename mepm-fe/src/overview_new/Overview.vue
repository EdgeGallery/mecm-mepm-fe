<template>
  <div class="pageContainer">
    <div class="banner">
      <div
        v-if="nodeList.length === 1"
        class="one-node-banner"
      >
        <div class="banner-title-en">
          EDGE NODE INFORMATION DISPLAY
        </div>
        <div class="banner-title-zh">
          边缘节点信息展示
        </div>
        <div class="node-basic-info">
          <span>{{ $t("overview.nodeName") + nodeList[0].mechostName }}</span>
          <span>{{ $t("overview.nodeAddress") + nodeList[0].city }}</span>
          <span>{{ $t("overview.nodeIp") + nodeList[0].mechostIp }}</span>
        </div>
        <div class="banner-buttons">
          <el-button round>
            {{ $t("overview.nodeDetails") }}
          </el-button>
          <el-button round>
            {{ $t("overview.appsInfo") }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="division">
      <img src="../assets/images/division_line_right.png">
      {{ $t("overview.package") }}
      <img src="../assets/images/division_line_left.png">
    </div>
    <div class="package-area">
      <div class="package-data">
        <img src="../assets/images/usable_package.png">
        <div class="words-area">
          <div class="words-area-title">
            {{ $t("overview.availablePackage") }}
          </div>
          <div class="words-area-value">
            {{ packageUploadedCount }}
          </div>
        </div>
      </div>
      <div class="package-data">
        <img src="../assets/images/distributed_package.png">
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
        <img src="../assets/images/deployed_package.png">
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
    <div class="division">
      <img src="../assets/images/division_line_right.png">
      {{ $t("overview.nodeInfoAreaTitle") }}
      <img src="../assets/images/division_line_left.png">
    </div>
    <NodeDetails />
  </div>
</template>

<script>
import NodeDetails from './NodeDetails.vue'
// import { lcmController } from '../tools/request.js'
import { apm, appo, inventory } from '../tools/request1.js'

export default {
  components: { NodeDetails },
  data () {
    return {
      retryCount: 3,
      packageUploadedCount: 0,
      distributedCount: 0,
      deployedCount: 0,
      nodeList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getAppDistributedCount () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await /* lcmController */apm.getDistributionList().then(res => {
          let count = 0
          if (res.data && res.data.length > 0) {
            this.packageUploadedCount = res.data.length // TODO 待确认是否是已上传的应用包数量
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
            count++ // TODO 一个应用包分发给n个节点，统计计数是n
          }
        })
      }
      return count
    },
    async getAppInfo () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await /* lcmController */ appo.getInstanceList().then(res => {
          if (res.data && res.data.response && res.data.response.length > 0) { // TODO 包了一层response?
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
        await /* lcmController.getHostList() */ inventory.getList(2).then(res => {
          if (res.data && res.data.length > 0) {
            res.data.forEach((item, index) => {
              this.nodeList.push(item)
            })
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
  },
  mounted () {
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style lang='less' scoped>
.pageContainer{
  margin-top: 65px;
  background: #FFFFFF!important;
  .banner{
    width: 100%;
    height: 740px;
    text-align: center;
    .one-node-banner{
      width: 100%;
      height: 100%;
      background: no-repeat url("../assets/images/banner.png");
      background-size: cover;
      .banner-title-en{
        font-size: 36px;
        color: #FFFFFF;
        font-family: Arial;
        font-weight: 400;
        line-height: 37px;
        padding-top: 85px;
      }
      .banner-title-zh{
        font-size: 78px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 80px;
        padding-top: 18px;
      }
      .node-basic-info{
        font-size: 19px;
        font-family: FZLanTingHeiS-L-GB;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 32px;
        padding-top: 22.5px;
      }
      .node-basic-info :nth-child(2), :nth-child(3){
        padding-left: 20px;
      }
      .banner-buttons{
        padding-top: 34.5px;
        .el-button{
          font-size: 20px!important;
        }
      }
      .banner-buttons :nth-child(2) {
        margin-left: 60px;
      }
    }
  }
  .division{
    text-align: center;
    font-size: 32px;
    font-family: FZLanTingHeiS-L-GB;
    font-weight: 400;
    color: #280B4E;
    line-height: 32px;
    padding-top: 60px;
  }
  .package-area{
    width: calc(100% - 400px);
    margin: 40px 200px 0 200px;
    background-image: url("../assets/images/package_area_img.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    overflow: visible;
    box-shadow: 0px 1px 29px 0px rgba(175, 175, 175, 0.21);
    .package-data{
      height: 160px;
      display: flex;
      justify-content: center;
      align-items: center;
      .words-area{
        margin-left: 20px;
        text-align: left;
        .words-area-title{
          font-size: 20px;
          font-family: FZLanTingHeiS-L-GB;
          font-weight: 400;
          color: #280B4E;
          line-height: 26px;
        }
        .words-area-value{
          font-size: 36px;
          font-family: FZZhengHeiS-B-GB;
          font-weight: 400;
          color: #FD8864;
          line-height: 62px;
        }
      }
    }
  }
}

</style>
