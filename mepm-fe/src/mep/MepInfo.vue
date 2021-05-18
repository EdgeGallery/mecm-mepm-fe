<template>
  <div class="box">
    <el-row
      class="tab inner-page-padding"
      ref="tab"
    >
      <div
        v-for="(item, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: active === index, tabgap: index > 0 }"
        @click="switchTab(index)"
      >
        {{ item }}
      </div>
    </el-row>
    <el-row class="tab-gap-con" />
    <el-row
      class="cont inner-page-padding"
      ref="cont"
      @scroll.passive="onScroll"
    >
      <div
        class="cont_1"
        ref="cont_1"
      >
        <div class="parent">
          <div class="child app-count-col">
            <span>应用数量：</span>
            <span class="statics-val">200</span>
            <span>个</span>
          </div>
          <div class="child service-count-col">
            <span>服务数量：</span>
            <span class="statics-val">200</span>
            <span>个</span>
          </div>
          <div class="child described-count-col">
            <span>被订阅服务：</span>
            <span class="statics-val">200</span>
            <span>个</span>
          </div>
          <div class="child describe-count-col">
            <span>订阅应用：</span>
            <span class="statics-val">200</span>
            <span>个</span>
          </div>
        </div>
        <el-row class="mep-ability-title">
          MEP自身能力
        </el-row>
        <hr class="mep-ability-line">
        <swiper :data="mepCapabilityies" />
        <el-row class="mep-ability-title">
          边缘节点服务详细信息
        </el-row>
        <hr class="mep-ability-line">
        <service-list />
        <!-- <swiper :data="appCapabilityies" /> -->
      </div>
      <div
        class="cont_2"
        ref="cont_2"
      >
        内容二
      </div>
      <div
        class="cont_3"
        ref="cont_3"
      >
        内容三
      </div>
    </el-row>
    <div
      class="back-top"
      @click="backTop"
    />
  </div>
</template>
<script>
import Swiper from './Swiper.vue'
import ServiceList from './ServiceList'
import axios from 'axios'

export default {
  components: { Swiper, ServiceList },
  data () {
    return {
      tabs: ['边缘节点的应用和服务概况信息', '拓扑图展示', '其他'],
      active: 0,
      cont1: null,
      cont2: null,
      cont3: null,
      isClickTab: false,
      mepCapabilityies: [],
      appCapabilityies: []
    }
  },
  methods: {
    backTop () {
      this.cont1.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    },
    switchTab (index) {
      if (index === 0) {
        this.cont1.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      } else if (index === 1) {
        this.cont2.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      } else {
        this.cont3.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      }
    },
    onScroll () {
      this.cont1 = this.$refs['cont_1']
      this.cont2 = this.$refs['cont_2']
      this.cont3 = this.$refs['cont_3']
      const tabH = this.$refs['tab'].offsetHeight
      if (this.cont3.getBoundingClientRect().top <= tabH) {
        this.active = 2
        return false
      }
      if (this.cont2.getBoundingClientRect().top <= tabH) {
        this.active = 1
        return false
      }
      if (this.cont1.getBoundingClientRect().top <= tabH) {
        this.active = 0
      }
    }
  },
  beforeMount () {
    axios('./ability.json').then((res) => {
      let appServices = res.data.appServices
      appServices.forEach((element, index) => {
        element.id = element.name + index
        element.callTimes.reverse()
      })
      this.appCapabilityies = appServices
      let mepServices = res.data.mepServices
      mepServices.forEach((element, index) => {
        element.id = element.name + index
        element.callTimes.reverse()
      })
      this.mepCapabilityies = mepServices
      this.refreshShownWithLan()
    })
  },
  mounted () {
    this.cont1 = this.$refs['cont_1']
    this.cont2 = this.$refs['cont_2']
    this.cont3 = this.$refs['cont_3']
  }
}
</script>
<style lang="less" scoped>
.inner-page-padding{
  padding: 0 360px 0 360px;
  background-color: #FFFFFF;
}
.box {
  margin-top: 65px;
  .tab {
    height: 70px;
    line-height: 70px;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #696969;
    .tab-item{
      cursor: pointer;
    }
    .tabgap{
      padding-left: 44px;
    }
    .active {
      color: #280B4E;
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
  .tab-gap-con{
    height: 10px;
    background: #F2F3F5;
  }
  .cont {
    padding-top: 22px;
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
        font-family: FZLanTingHeiS-L-GB;
        font-weight: 400;
        color: #280B4E;
        line-height: 19px;
      }
      .mep-ability-line{
        height: 2px;
        background-color: #F2F3F5;
        border: none;
        margin-top: 19px;
        margin-bottom: 30px;
      }
    }
//     .cont_2 {
//       height: 800px;
//     }
//     .cont_3 {
//       height: 100%;
//     }
//   }
//   .back-top {
//     width: 80px;
//     height: 80px;
//     background: url(../assets/images/back-top.png) center / 100%
//       100% no-repeat;
//     border-radius: 50%;
//     position: fixed;
//     bottom: 120px;
//     right: 32px;
  }
}
</style>
