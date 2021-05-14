<template>
  <div class="box">
    <el-row class="tab inner-page-padding" ref="tab">
      <div v-for="(item, index) in tabs" :key="index" class="tab-item" :class="{ active: active === index, tabgap: index > 0 }" @click="switchTab(index)">
        {{ item }}
      </div>
    </el-row>
    <el-row class="tab-gap-con" />
    <el-row class="cont inner-page-padding" ref="cont">
      <div class="cont_1" ref="cont_1">
        <el-row :gutter="44" class="row-statics">
          <el-col class="app-count-col" :span="6">
            <span>应用数量：</span>
            <span class="statics-val">200</span>
            <span>个</span>
          </el-col>
          <el-col class="service-count-col" :span="6">
            <span>服务数量：</span>
            <span class="statics-val">200</span>
            <span>个</span>
          </el-col>
          <el-col class="described-count-col" :span="6">
            <span>被订阅服务：</span>
            <span class="statics-val">200</span>
            <span>个</span>
          </el-col>
          <el-col class="describe-count-col" :span="6">
            <span>订阅应用：</span>
            <span class="statics-val">200</span>
            <span>个</span>
          </el-col>
        </el-row>
        <el-row class="mep-ability-title">MEP自身能力</el-row>
        <hr class="mep-ability-line"/>
        <el-row class="mep-ability-title">边缘节点服务详细信息</el-row>
        <hr class="mep-ability-line"/>
      </div>
      <div class="cont_2" ref="cont_2">内容二</div>
      <div class="cont_3" ref="cont_3">内容三</div>
    </el-row>
    <div class="back-top" @click="backTop"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabs: ['边缘节点的应用和服务概况信息', '拓扑图展示', '其他'],
      active: 0,
      cont1: null,
      cont2: null,
      cont3: null,
      isClickTab: false
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
    }
  },
  mounted () {
    this.cont1 = this.$refs['cont_1']
    this.cont2 = this.$refs['cont_2']
    this.cont3 = this.$refs['cont_3']
    const tabH = this.$refs['tab'].offsetHeight
    this.$refs['cont'].addEventListener('scroll', () => {
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
    })
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
//   overflow-x: auto;
//   height: 100vh;
//   display: -webkit-flex;
//   display: flex;
//   flex-direction: column;
//   flex-grow: 1;
//   flex-wrap: wrap;
  .tab {
//     position: fixed;
    height: 70px;
    line-height: 70px;
//     display: -webkit-flex;
    display: flex;
    align-items: center;
//     z-index: 2;
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
    padding-top: 10px;
//     height: 300px;
//     flex-grow: 1;
//     overflow: auto;
    .cont_1 {
      // height: 400px;
      .row-statics{
        .app-count-col{
          background: no-repeat url("../assets/images/app_cnt_bg.png");
          background-size: 100% 100%;
        }
        .service-count-col{
          background: no-repeat url("../assets/images/service_cnt_bg.png");
          background-size: 100% 100%;
        }
        .described-count-col{
          background: no-repeat url("../assets/images/described_cnt_bg.png");
          background-size: 100% 100%;
        }
        .describe-count-col{
          background: center / contain no-repeat url("../assets/images/describe_cnt_bg.png");
          background-size: 100% 100%;
        }
        font-size: 16px;
        line-height: 60px;
        .statics-val{
          font-size: 24px;
        }
      }
      .mep-ability-title{
        padding-top: 10px;
        font-size: 18px;
        color:#280B4E;
        line-height: 30px;
      }
      .mep-ability-line{
        height: 2px;
        background-color: #F2F3F5;
        border: none;
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
