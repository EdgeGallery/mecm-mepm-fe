<template>
  <div class="overview">
    <div class="mid-content">
      <div class="title_top font-bold">
        概览
        <span class="line_bot" />
      </div>
      <div class="content">
        <el-carousel
          arrow="always"
          :autoplay="false"
          height="800px"
          @change="handleNodeChange"
        >
          <el-carousel-item
            v-for="(item,index) in allnodeList"
            :key="index"
          >
            <div
              class="edge-info"
              id="edge-info"
            >
              <div class="top-name">
                <span>{{ item.name }}</span>
              </div>
              <img
                v-if="bgImg===false"
                class="content-img"
                src="../assets/images/start_bg.png"
                alt=""
              >
              <img
                v-else
                class="content-img"
                src="../assets/images/configured_bg.png"
                alt=""
              >
              <div class="appimg">
                <el-carousel
                  arrow="never"
                  :autoplay="false"
                  height="210px"
                  trigger="click"
                  @change="handleAppChange"
                >
                  <el-carousel-item
                    v-for="(appItem,appindex) in item.appList"
                    :key="appindex"
                  >
                    <img
                      class="startConfig"
                      v-if="appItem.status==='null'"
                      src="../assets/images/start-appicon.png"
                      alt=""
                      @click="startConfig(index,appindex)"
                    >
                    <img
                      v-else-if="appItem.status==='configed'"
                      src="../assets/images/appicon_config.png"
                      alt=""
                      @click="ConfigSteptwo(index,appindex)"
                    >
                    <img
                      v-else-if="appItem.status==='success'"
                      src="../assets/images/appicon_suc.png"
                      alt=""
                    >
                    <img
                      v-else-if="appItem.status==='fail'"
                      src="../assets/images/appicon_fail.png"
                      alt=""
                    >
                    <p>{{ appItem.name }}</p>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="resources-show">
                <span class="info-title">
                  资源展示
                </span>
                <span
                  class="infoBtn"
                  style="float: right;"
                >更多详情<em class="el-icon-right" /></span>
                <div
                  class="detail"
                >
                  <span class="one">{{ item.detailInfo.resource.inter }}</span>
                  <span class="two">{{ item.detailInfo.resource.interResource }}</span>
                  <span class="three">{{ item.detailInfo.resource.GPU }}</span>
                </div>
                <div class="resources">
                  <p>x86计算资源</p>
                  <div
                    class="chartPie"
                  >
                    <div
                      id="GPUchart"
                    />
                    <div
                      id="MEMORYchart"
                    />
                    <div
                      id="DISKchart"
                    />
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <!-- <img
          class="leftArrow"
          src="../assets/images/leftArrow.png"
          alt=""
        >

        <el-tooltip
          effect="dark"
          content="切换下一个节点"
          placement="bottom-end"
        >
          <img
            class="rightArrow"
            src="../assets/images/rightArrow.png"
            alt=""
          >
        </el-tooltip> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allnodeList: [
        {
          name: 'EgNode',
          detailInfo: {
            resource: {
              inter: '5G',
              interResource: 'Tesla P4*5、Tesla P1C0*2、TIAN*2',
              GPU: 'Atlas 200*200'
            },
            chartData: [
              {
                name: 'CPU',
                Occupyed: '20',
                Usable: '80'
              }, {
                name: 'MEMORY',
                Occupyed: '20',
                Usable: '80'
              }, {
                name: 'DISK',
                Occupyed: '20',
                Usable: '80'
              }
            ]
          },
          appList: [{
            name: '工厂物语',
            status: 'null'
          }, {
            name: '金晴云',
            status: 'configed'
          }, {
            name: '兰亭VR',
            status: 'success'
          }
          ]
        },
        {
          name: 'OSNode',
          detailInfo: {
            resource: {
              inter: '5G',
              interResource: 'Tesla P4*5、Tesla P1C0*2、TIAN*2',
              GPU: 'Atlas 200*200'
            },
            chartData: [
              {
                name: 'CPU',
                Occupyed: '20',
                Usable: '80'
              }, {
                name: 'MEMORY',
                Occupyed: '20',
                Usable: '80'
              }, {
                name: 'DISK',
                Occupyed: '20',
                Usable: '80'
              }
            ]
          },
          appList: [{
            name: '安恒soc',
            status: 'null'
          }, {
            name: '未来物联',
            status: 'configed'
          }, {
            name: '贪吃蛇',
            status: 'success'
          }, {
            name: '昇腾应用',
            status: 'success'
          }
          ]
        }
      ],
      nodeIndex: 0,
      appIndex: 0,
      bgImg: false,
      carouselHeight: ''
    }
  },
  // mounted () {
  //   this.setDivHeight()
  //   this.$nextTick(() => {
  //     this.drawGPUchart()
  //   })
  // },
  watch: {
    $route (to, from) {
      console.log(to.path)
      console.log(from.path)
      let fromPath = from.path
      if (fromPath === '/mecm/ruleconfig') {
        let IndexArr = sessionStorage.getItem('appIndex').split(',')
        this.allnodeList[IndexArr[0]].appList[IndexArr[1]].status = 'configed'
        sessionStorage.removeItem('appIndex')
      } else if (fromPath === '/mepm/resource/vm') {
        let IndexArr = sessionStorage.getItem('appIndex').split(',')
        this.allnodeList[IndexArr[0]].appList[IndexArr[1]].status = 'success'
        sessionStorage.removeItem('appIndex')
      }
    }
  },
  methods: {
    handleNodeChange (index) {
      this.nodeIndex = index
      this.bgImg = this.allnodeList[this.nodeIndex].appList[this.appIndex].status !== 'null'
    },
    handleAppChange (index) {
      this.appIndex = index
      this.bgImg = this.allnodeList[this.nodeIndex].appList[this.appIndex].status !== 'null'
    },
    setDivHeight () {
      this.$nextTick(() => {
        const appDiv = document.getElementById('edge-info')
        this.carouselHeight = appDiv.clientHeight + 'px'
      })
    },
    startConfig (node, app) {
      let appIndex = [node, app]
      sessionStorage.setItem('appIndex', appIndex)
      this.$router.push('/mecm/ruleconfig')
    },
    ConfigSteptwo (node, app) {
      let appIndex = [node, app]
      sessionStorage.setItem('appIndex', appIndex)
      this.$router.push('/mepm/resource/vm')
    },
    drawGPUchart () {
      let Chart = this.$echarts.init(document.getElementById('GPUchart'))
      let option = {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ]
          }
        ]
      }
      Chart.setOption(option)
      window.addEventListener('resize', () => {
        if (Chart) {
          Chart.resize()
        }
      })
    }
  }
}
</script>
<style lang='less'>
.font-bold{
  font-family: HarmonyOS_Sans_Bold, Arial, Helvetica, sans-serif;
}
.font-regular{
  font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
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
  background-color: #f6f5f8;
  .mid-content{
    padding: 0 13%;
    .title_top{
      padding: 80px 0 40px;
      margin-left: 140px;
      font-size: 36px;
      color: #380879;
      background-image: url('../assets/images/overview-title-bg.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
    .line_bot{
      display: block;
      width: 88px;
      height: 7px;
      border-radius: 4px;
      background: rgba(158, 123, 205, 0.2);
      margin-top: 15px;
      flex-shrink: 0;
    }
    .content{
      position: relative;
      .edge-info{
        background-color: #fff;
        border-radius: 10px;
        padding: 34px 56px;
        margin-bottom: 40px;
        position: relative;
        .top-name{
          display: flex;
          justify-content: space-between;
          padding-bottom: 15px;
          span{
            color: #7a6e8a;
            font-size: 26px;
            font-family: HarmonyOS_Sans_Regular;
          }
        }
        .content-img{
          width: 100%;
        }
        .appimg{
          position: absolute;
          top: 145px;
          left: 40%;
          width: 15%;
          img{
            width: 100%;
          }
          p{
            position: absolute;
            bottom: 23px;
            left: 50%;
            transform: translateX(-50%);
            color: #827792;
            font-size: 16px;
            font-family: HarmonyOS_Sans_Regular;
          }
          .startConfig{
             animation: rotate 0.5s infinite linear ;
          }
          @keyframes rotate {
            from {
                transform: scale(0.98);
            }
            to {
                 transform: scale(1);
            }
          }
          .el-carousel{
            .el-carousel__indicator--horizontal{
              padding: 3px 3px;
              .el-carousel__button{
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #6653c5;
              }
            }
          }
        }
        .resources-show{
          position: absolute;
          background-color: #dedfea;
          border-radius: 10px;
          width: 30%;
          padding: 20px 15px;
          top: 135px;
          right: 10%;
          .info-title{
            font-size: 18px;
            font-family: HarmonyOS_Sans_Regular;
            color: #5e40c8;
          }
          .info-title::before{
            content: '';
            display: inline-block;
            background-image: url('../assets/images/info-title.png');
            width: 12px;
            height: 12px;
          }
          .infoBtn{
            font-size: 14px;
            font-family: HarmonyOS_Sans_Regular;
            color: #5e40c8;
          }
          .detail{
            padding: 15px 0 15px 24px;
            span{
              margin-right: 20px;
              color: #827792;
              font-size: 14px;
              font-family: HarmonyOS_Sans_Regular;
            }
            .one::before{
              content: '';
              display: inline-block;
              background-image: url('../assets/images/info-one.png');
              width: 14px;
              height: 14px;
              background-position: center;
              margin-right: 5px;
            }
            .two::before{
              content: '';
              display: inline-block;
              background-image: url('../assets/images/info-two.png');
              width: 14px;
              height: 14px;
              background-position: center;
              margin-right: 5px;
            }
            .three::before{
              content: '';
              display: inline-block;
              background-image: url('../assets/images/info-three.png');
              width: 14px;
              height: 14px;
              background-position: center;
              margin-right: 5px;
            }
          }
          .resources{
            padding-left: 24px;
            p{
              color: #827792;
              font-size: 14px;
              font-family: HarmonyOS_Sans_Regular;
            }
          }
        }
      }
      .leftArrow,.rightArrow{
        display: block;
        position: absolute;
        top: 50%;
        cursor: pointer;
      }
      .leftArrow{
        left: -8%;
      }
      .rightArrow{
        right: -8%;
      }
    }
  }
}
</style>
