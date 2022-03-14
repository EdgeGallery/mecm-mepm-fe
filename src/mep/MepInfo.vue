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
  <div class="box">
    <div class="inner-nav">
      <div class="opera-area inner-page-background padding_default">
        <div
          class="tab"
          ref="tab"
        >
          <div
            v-for="(item, index) in tabs"
            :key="index"
            class="tab-item"
            :class="{ active: active === index, tabgap: index > 0 }"
            @click="switchTab(index)"
          >
            {{ $t(item) }}
          </div>
        </div>
        <el-button
          plain
          class="bgBtn"
          @click="returnLastPage()"
        >
          {{ $t('SERVICE_PAGE.BACK_BUTTON_NAME') }}
        </el-button>
      </div>
      <el-row class="tab-gap-con" />
    </div>
    <el-row
      class="cont inner-page-background padding_default"
      ref="cont"
      @scroll.passive="onScroll"
    >
      <div
        class="cont_1"
        ref="cont_1"
      >
        <div class="parent">
          <div class="child app-count-col">
            <span>{{ $t('SERVICE_PAGE.APP_STATICS_APP') }}</span>
            <span class="statics-val">{{ appCount }}</span>
            <span>{{ $t('SERVICE_PAGE.NUM') }}</span>
          </div>
          <div class="child service-count-col">
            <span>{{ $t('SERVICE_PAGE.APP_STATICS_SERVICE') }}</span>
            <span class="statics-val">{{ serviceCount }}</span>
            <span>{{ $t('SERVICE_PAGE.NUM') }}</span>
          </div>
          <div class="child described-count-col">
            <span>{{ $t('SERVICE_PAGE.SERVICE_STATICS_SUBSCRIBED') }}</span>
            <span class="statics-val">{{ subscribedCount }}</span>
            <span>{{ $t('SERVICE_PAGE.NUM') }}</span>
          </div>
          <div class="child describe-count-col">
            <span>{{ $t('SERVICE_PAGE.APP_STATICS_SUBSCRIBE') }}</span>
            <span class="statics-val">{{ subscribeCount }}</span>
            <span>{{ $t('SERVICE_PAGE.NUM') }}</span>
          </div>
        </div>
        <el-row class="mep-ability-title">
          {{ $t('SERVICE_PAGE.ABILITY_MEP_SELF') }}
        </el-row>
        <hr class="mep-ability-line">
        <swiper :data="mepCapabilityies" />
        <el-row class="mep-ability-title">
          {{ $t('SERVICE_PAGE.SERVICES_DETAIL') }}
        </el-row>
        <hr class="mep-ability-line">
        <div class="service-area">
          <service-list
            @showServiceDescribeInfo="showServiceDescribeInfo"
          />
          <div
            v-if="showServiceSubscribeData"
            class="service-subscribe"
          >
            <service-described-info
              :name="serviceDescribeBasicInfo.serviceName"
              :desc="serviceDescribeBasicInfo.serviceDesc"
              :id="serviceDescribeBasicInfo.serviceId"
              :call-times="serviceDescribeBasicInfo.serviceCallTimes"
              @closeServiceDescribeInfo="closeServiceDescribeInfo"
            />
          </div>
        </div>
      </div>
      <div
        class="cont_2"
        ref="cont_2"
      >
        <topology />
      </div>
    </el-row>
  </div>
</template>
<script>
import Swiper from './Swiper.vue'
import ServiceList from './ServiceList'
import Topology from './Topology'
import ServiceDescribedInfo from './ServiceDescribedInfo.vue'
import { lcmController } from '../tools/request.js'

export default {
  components: { Swiper, ServiceList, Topology, ServiceDescribedInfo },
  data () {
    return {
      tabs: ['TOPOLOGY_PAGE.DASHBORD_TAB', 'TOPOLOGY_PAGE.TOPOLOGY_TAB'],
      active: 0,
      cont1: null,
      cont2: null,
      isClickTab: false,
      mepCapabilityies: [],
      appCapabilityies: [],
      showServiceSubscribeData: false,
      serviceDescribeBasicInfo: {
        serviceName: 'name',
        serviceDesc: 'desc',
        serviceId: 'id',
        serviceCallTimes: [0, 0, 0, 0, 0, 0, 0]
      },
      subscribedCount: 0,
      subscribeCount: 0,
      appCount: 0,
      serviceCount: 0
    }
  },
  methods: {
    returnLastPage () {
      this.$router.back(-1)
    },
    backTop () {
      this.cont1.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    },
    switchTab (index) {
      if (index === 0) {
        let scrolledY = window.scrollY
        if (scrolledY) {
          window.scroll({
            top: 0, // 样式强相关数据
            left: 0,
            behavior: 'smooth'
          })
        }
      } else if (index === 1) {
        this.cont2.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
          inline: 'nearest'
        })
        let offsetY = this.$refs.cont_2.offsetTop
        if (offsetY) {
          window.scroll({
            top: offsetY - 102, // 样式强相关数据:102
            left: 0,
            behavior: 'smooth'
          })
        }
      }
    },
    onScroll () {
      this.cont1 = this.$refs['cont_1']
      this.cont2 = this.$refs['cont_2']
      if (this.cont2.getBoundingClientRect && this.cont2.getBoundingClientRect().top <= 167) { // 样式强相关数据:167
        this.active = 1
      } else {
        this.active = 0
      }
    },
    closeServiceDescribeInfo () {
      this.showServiceSubscribeData = false
    },
    showServiceDescribeInfo (basicInfo) {
      this.showServiceSubscribeData = true
      let callInfo = this.appCapabilityies.find(ele => ele.name === basicInfo.name)
      this.serviceDescribeBasicInfo = {
        serviceName: basicInfo.name,
        serviceDesc: basicInfo.desc,
        serviceId: basicInfo.instance,
        serviceCallTimes: callInfo ? callInfo.callTimes : [0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  beforeMount () {
    let appMap = new Map()
    let serviceMap = new Map()
    lcmController.getServiceList(this.$route.params.nodeIp).then(res => {
      if (res && res.data && res.data.data) {
        let serviceList = res.data.data
        let len = serviceList.length
        for (let i = 0; i < len; i++) {
          if (!serviceMap.has(serviceList[i].serInstanceId)) {
            serviceMap.set(serviceList[i].serInstanceId, {
              id: serviceList[i].serInstanceId,
              name: serviceList[i].serName,
              version: serviceList[i].version
            })
            if (!appMap.has(serviceList[i].serCategory.id)) {
              appMap.set(serviceList[i].serCategory.id, {
                id: serviceList[i].serCategory.id,
                name: serviceList[i].serCategory.name,
                version: serviceList[i].serCategory.version
              })
            }
          }
        }
        let appArray = Array.from(appMap.values())
        let serviceArray = Array.from(serviceMap.values())
        this.appCount = appArray.length
        this.serviceCount = serviceArray.length
        this.appData = appArray
        this.serviceData = serviceArray
        lcmController.getSubscribeInfo(this.$route.params.nodeIp).then(statisticRes => {
          if (statisticRes && statisticRes.data && statisticRes.data.data) {
            this.subscribeCount = statisticRes.data.data.subscribeNum.appSubscribeNum
            this.subscribedCount = statisticRes.data.data.subscribeNum.serviceSubscribedNum
          }
          lcmController.getAbilityCallTimesInfo(this.$route.params.nodeIp).then((response) => {
            let appServices = response.data.data.appServices
            appServices.forEach((element, index) => {
              element.id = element.name + index
              element.callTimes.reverse()
            })
            this.appCapabilityies = appServices
            let mepServices = response.data.data.mepServices
            mepServices.forEach((element, index) => {
              element.id = element.name + index
              element.callTimes.reverse()
            })
            this.mepCapabilityies = mepServices
          })
        })
      }
    })
  },
  mounted () {
    this.cont1 = this.$refs['cont_1']
    this.cont2 = this.$refs['cont_2']
    window.addEventListener('scroll', this.onScroll)
  }
}
</script>
<style lang="less" scoped>
.inner-page-background{
  background-color: rgba(46,20,124,.7);
}
.box {
  .inner-nav{
    position: fixed;
    z-index: 10;
    width: 100%;
    .opera-area{
      display: flex;
      align-items: center;
      .tab {
        width: calc(100% - 93px);
        height: 70px;
        line-height: 70px;
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #FFFFFF;
        .tab-item{
          cursor: pointer;
        }
        .tabgap{
          padding-left: 44px;
        }
        .active {
          color: #DEDBE5;
          &::after {
            display: block;
            content: "";
            height: 2px;
            margin: auto;
            margin-top: -3px;
            background: no-repeat url("../assets/images/underline.png");
            background-size: 100% 100%;
          }
        }
      }
      .el-button{
        width: 93px;
        height: 40px; // TODO 图片UCD设计
      }
    }
    .tab-gap-con{
      height: 10px;
      background: rgba(46,20,124,.7);
    }
  }
  .cont {
    padding-top: 102px;
    .cont_1 {
      .parent{
        display: grid;
        grid-gap: 44px;
        grid-template-columns: repeat(4, calc(25% - 33px));
        grid-template-rows: 60px;
        .child{
          text-align: center;
          font-size: 16px;
          line-height: 60px;
          color: #FEFEFE;
          background-position: center!important;
          background-repeat: no-repeat!important;
          border-radius: 6px;
        }
        .statics-val{
          font-size: 24px;
        }
        .app-count-col{
          background: url("../assets/images/app_cnt_bg.png");
        }
        .service-count-col{
          background: url("../assets/images/service_cnt_bg.png");
        }
        .described-count-col{
          background: url("../assets/images/described_cnt_bg.png");
        }
        .describe-count-col{
          background: url("../assets/images/describe_cnt_bg.png");
        }
      }
      .mep-ability-title{
        margin-top: 41px;
        font-size: 18px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 19px;
      }
      .mep-ability-line{
        height: 2px;
        background-color: #F2F3F5;
        border: none;
        margin-top: 19px;
        margin-bottom: 30px;
      }
      .service-area{
        position: relative;
        .service-subscribe{
          position: absolute;
          width: 100%;
        }
      }
    }
    .cont_2 {
      margin-top: 610px;
      margin-bottom: 80px;
    }
  }
}
</style>
