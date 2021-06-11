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
  <div class="pageContainer">
    <div class="banner">
      <swiper
        v-if="nodeList.length >= 1"
        class="swiper"
        :options="swiperOption"
        @slideChange="slideChange"
        ref="mySwiper"
      >
        <swiper-slide
          v-for="(item, index) in nodeList"
          :key="index"
          class="one-node-banner"
        >
          <div class="banner-title-en">
            EDGE NODE INFORMATION DISPLAY
          </div>
          <div class="banner-title-zh">
            边缘节点信息展示
          </div>
          <div class="node-basic-info">
            <span>{{ $t("overview.nodeName") + item.mechostName }}</span>
            <span>{{ $t("overview.nodeAddress") + item.city }}</span>
            <span>{{ $t("overview.nodeIp") + item.mechostIp }}</span>
          </div>
          <div class="banner-buttons">
            <el-button
              round
              @click="checkNodeInfo()"
            >
              {{ $t("overview.nodeDetails") }}
            </el-button>
            <el-button
              round
              @click="checkServiceInfo(item.mechostIp)"
            >
              {{ $t("overview.appsInfo") }}
            </el-button>
          </div>
        </swiper-slide>
        <div
          v-if="nodeList.length > 1"
          class="swiper-button-prev"
          slot="button-prev"
        />
        <div
          v-if="nodeList.length > 1"
          class="swiper-button-next"
          slot="button-next"
        />
      </swiper>
      <div
        v-else
        class="swiper"
      >
        <div class="one-node-banner">
          <div class="banner-title-en">
            EDGE NODE INFORMATION DISPLAY
          </div>
          <div class="banner-title-zh">
            边缘节点信息展示
          </div>
          <div class="node-basic-info">
            <span>{{ $t("overview.info") }}</span>
          </div>
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
    <div
      class="division"
      v-if="nodeList.length >= 1"
    >
      <img src="../assets/images/division_line_right.png">
      {{ $t("overview.nodeInfoAreaTitle") }}
      <img src="../assets/images/division_line_left.png">
    </div>
    <div class="pb-30">
      <div class="node-detail-area">
        <NodeDetails
          :detail="curShownNodeInfo"
          ref="nodeDetails"
          v-show="nodeList.length >= 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import NodeDetails from './NodeDetails.vue'
// import { lcmController } from '../tools/request.js'
import { apm, appo, inventory } from '../tools/request-mock.js'

export default {
  components: { NodeDetails, Swiper, SwiperSlide },
  data () {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      retryCount: 3,
      packageUploadedCount: 0,
      distributedCount: 0,
      deployedCount: 0,
      nodeList: [],
      curShownNodeInfo: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    checkNodeInfo () {
      let ele = this.$refs.nodeDetails.$el
      ele.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'nearest'
      })
    },
    checkServiceInfo (mechostIp) {
      this.$router.push({ name: 'mepinfo', params: { nodeIp: mechostIp } })
    },
    slideChange () {
      let activeIndex = this.$refs.mySwiper.$swiper.activeIndex
      this.curShownNodeInfo = this.nodeList[activeIndex]
    },
    async getAppDistributedCount () {
      let isQuerySuccess = false
      for (let i = 0; i < this.retryCount && !isQuerySuccess; i++) {
        await apm.getDistributionList().then(res => {
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
        await appo.getInstanceList().then(res => {
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
        await inventory.getList(2).then(res => {
          if (res.data && res.data.length > 0) {
            res.data.forEach((item, index) => {
              this.nodeList.push(item)
            })
            isQuerySuccess = true
            this.curShownNodeInfo = this.nodeList[0]
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
.pageContainer{
  margin-top: 65px;
  background: #FFFFFF!important;
  .banner{
    width: 100%;
    text-align: center;
    .swiper{
      height: 740px;
      .one-node-banner{
        width: 100%;
        height: 100%;
        background: no-repeat url("../assets/images/banner.png");
        background-size: cover;
        .banner-title-en{
          font-size: 36px;
          color: #FFFFFF;
          font-weight: 400;
          line-height: 37px;
          padding-top: 85px;
        }
        .banner-title-zh{
          font-size: 78px;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 80px;
          padding-top: 18px;
        }
        .node-basic-info{
          font-size: 19px;
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
            background-color: unset;
            color: #ffffff;
            border: 2px solid #ffffff;
            border-radius: 30px;
            padding: 18px 32px;
          }
          .el-button:hover, .el-button:hover,{
            color: #F5EA6E;
            border: 2px solid #F5EA6E;
          }
        }
        .banner-buttons :nth-child(2) {
          margin-left: 60px;
        }
      }
    }
    .swiper-button-prev {
      left: 81px;
      height: 100%;
      width: 42px;
      top: 0px;
      background: url("../assets/images/pre-button-size42.png") center center no-repeat;
    }
    .swiper-button-next {
      right: 81px;
      height: 100%;
      width: 42px;
      top: 0px;
      background: url("../assets/images/next-button-size42.png") center center no-repeat;
    }
    .swiper-button-prev:after, .swiper-button-next:after{
      content: '';
    }
  }
  .division{
    text-align: center;
    font-size: 32px;
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
  }
  .node-detail-area {
    width: calc(100% - 400px);
    margin: 40px 200px 0 200px;
    overflow: visible;
    background-size: cover;
    box-sizing: border-box;
  }
  .pb-30{
  padding-bottom: 30px;
}
}

</style>
