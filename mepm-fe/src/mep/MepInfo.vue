<template>
  <div class="container">
    <div
      class="top-nav"
      ref="tab"
    >
      <el-row class="inner-page-padding">
        <el-col
          :span="12"
          class="nav-item"
          v-for="(item, index) in tabs"
          :key="index"
        >
          <div
            :class="{ active: item.active }"
            class="nav-title"
            @click="switchTab(index)"
          >
            {{ item.name }}
          </div>
          <img
            v-show="item.active"
            class="nav-img"
            src="../assets/images/underline.png"
          >
        </el-col>
      </el-row>
      <el-row class="nav-con-gap" />
    </div>
    <div
      class="inner-page-padding cont"
      ref="cont"
    >
      <div
        class="cont_1"
        ref="cont_1"
      >
        内容一
      </div>
      <div
        class="cont_2"
        ref="cont_2"
      >
        内容二
      </div>
    </div>
    <div
      class="back-top"
      @click="backTop"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabs: [{ name: '边缘节点的应用和服务概况信息', active: true }, { name: '拓扑图展示', active: false }],
      cont1: null,
      cont2: null
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
        this.tabs[0].active = true
        this.tabs[1].active = false
      } else if (index === 1) {
        this.cont2.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
        this.tabs[0].active = false
        this.tabs[1].active = true
      }
    }
  },
  mounted () {
    this.cont1 = this.$refs['cont_1']
    this.cont2 = this.$refs['cont_2']
    const tabH = this.$refs['tab'].offsetHeight
    this.$refs['cont'].addEventListener('scroll', () => {
      if (this.cont2.getBoundingClientRect().top <= tabH) {
        this.tabs[0].active = false
        this.tabs[1].active = true
        return false
      }
      if (this.cont1.getBoundingClientRect().top <= tabH) {
        this.tabs[0].active = true
        this.tabs[1].active = false
      }
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  margin-top: 65px;
  background-color: #F2F3F5;
  overflow-x: auto;
  height: 100vh;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  .inner-page-padding{
    padding: 0 360px 0 360px;
    background-color: #FFFFFF;
  }
  .top-nav{
    position:fixed;
    width: 100%;
    height: 88px;
    // display: -webkit-flex;
    // display: flex;
    .nav-item{
      // width: 280px;
      .nav-title{
        padding-left: 12px;
        font-family: FZLanTingHeiS-B-GB;
        font-weight: 400;
        color: #666666;
        font-size: 18px;
        line-height: 76px;
      }
      .nav-title.active {
        color: #311656!important;
      }
      .nav-img{
        height: 2px;
        float: left;
      }
    }
    .nav-con-gap{
      // margin-top: 10px;
      // position: fixed;
      width: 100%;
      height: 10px;
    }
  }
  .cont {
    margin-top: 88px;
    height: 700px;
    flex-grow: 1;
    overflow: auto;
    .cont_1 {
      height: 800px;
      background: pink;
    }
    .cont_2 {
      height: 800px;
      background: yellow;
    }
  }
  .back-top {
    width: 80px;
    height: 80px;
    background: url(../assets/images/back-top.png) center / 100%
      100% no-repeat;
    border-radius: 50%;
    position: fixed;
    bottom: 120px;
    right: 32px;
  }
}
</style>
