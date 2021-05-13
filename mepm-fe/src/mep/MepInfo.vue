<template>
  <div class="box">
    <div class="tab inner-page-padding" ref="tab">
      <div class="tab-item" v-for="(item, index) in tabs" :key="index">
        <div :class="{ active: active === index }" @click="switchTab(index)">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="tab-gap-con" />
    <div class="cont inner-page-padding" ref="cont">
      <div class="cont_1" ref="cont_1">内容一</div>
      <div class="cont_2" ref="cont_2">内容二</div>
      <div class="cont_3" ref="cont_3">内容三</div>
    </div>
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
  overflow-x: auto;
  height: 100vh;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  .tab {
    height: 70px;
    background: #fff;
    line-height: 70px;
    color: #696969;
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
    z-index: 2;
    font-size: 18px;
    .tab-item{
      cursor: pointer;
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
    width: 100%;
    height: 10px;
    background: #F2F3F5;
  }
  .cont {
    height: 300px;
    flex-grow: 1;
    overflow: auto;
    .cont_1 {
      height: 400px;
    }
    .cont_2 {
      height: 800px;
    }
    .cont_3 {
      height: 100%;
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
