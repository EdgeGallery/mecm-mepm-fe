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
          :initial-index="nodeIndex"
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
                  :initial-index="appIndex"
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
                <el-popover
                  placement="bottom"
                  trigger="click"
                >
                  <span
                    slot="reference"
                    class="infoBtn"
                    style="float: right;cursor: pointer;"
                  >更多详情<em class="el-icon-right" /></span>
                  <div
                    class="detail"
                  >
                    <p class="info-title">
                      更多资源展示
                    </p>
                    <el-form>
                      <el-form-item label="网络:">
                        {{ item.detailInfo.resource.inter }}
                      </el-form-item>
                      <el-form-item label="x86计算资源:">
                        {{ item.detailInfo.resource.x86Resource }}
                      </el-form-item>
                      <el-form-item label="GPU算力:">
                        {{ item.detailInfo.resource.GPU }}
                      </el-form-item>
                      <el-form-item label="AI加速:">
                        {{ item.detailInfo.resource.AI }}
                      </el-form-item>
                    </el-form>
                  </div>
                </el-popover>

                <div class="resources">
                  <div
                    class="chartPie"
                  >
                    <div
                      class="sumchart"
                      :id="GPUId(index)"
                    />
                    <div
                      class="sumchart"
                      :id="MEMORYId(index)"
                    />
                    <div
                      class="sumchart"
                      :id="DISKId(index)"
                    />
                  </div>
                  <div style="text-align:center;margin-top:4px;">
                    <span
                      class="OccupyedBefore"
                      style="margin-right:15px;"
                    >已占用</span>
                    <span class="UsableBefore">未占用</span>
                  </div>
                  <p style="text-align:center;margin-top:4px;">
                    x86计算资源
                  </p>
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
import echarts from 'echarts'
export default {
  data () {
    return {
      allnodeList: [
        {
          name: '广东_node_v3_12',
          detailInfo: {
            resource: {
              inter: '5G',
              x86Resource: '50C、256G、1T',
              GPU: 'Tesla P4*5、Tesla P1C0*2、TIAN*2',
              AI: 'Atlas 200*200'
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
            status: 'null',
            type: 'vm'
          }, {
            name: '金晴云',
            status: 'configed',
            type: 'vm'
          }, {
            name: '兰亭VR',
            status: 'success',
            type: 'vm'
          }
          ]
        },
        {
          name: '北京_node_V1.1',
          detailInfo: {
            resource: {
              inter: '5G',
              x86Resource: '50C、256G、1T',
              GPU: 'Tesla P4*5、Tesla P1C0*2、TIAN*2',
              AI: 'Atlas 200*200'
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
            status: 'null',
            type: 'vm'
          }, {
            name: '未来物联',
            status: 'configed',
            type: 'vm'
          }, {
            name: '贪吃蛇',
            status: 'success',
            type: 'container'
          }, {
            name: '昇腾应用',
            status: 'success',
            type: 'container'
          }
          ]
        }
      ],
      nodeIndex: 0,
      appIndex: 0,
      bgImg: false,
      carouselHeight: '',
      detailInfoShow: false
    }
  },
  mounted () {
    // this.setDivHeight()
    this.drawGPUchart()
    this.drawMEMORYchart()
    this.drawDISKchart()
    let IndexArr = sessionStorage.getItem('appIndex').split(',')
    if (IndexArr) {
      this.nodeIndex = Number(IndexArr[0])
      this.appIndex = Number(IndexArr[1])
      this.allnodeList[IndexArr[0]].appList[IndexArr[1]].status = IndexArr[2]
      this.handleNodeChange(IndexArr[0])
      this.handleAppChange(IndexArr[1])
      sessionStorage.removeItem('appIndex')
    }
  },
  methods: {
    handleNodeChange (index) {
      this.nodeIndex = Number(index)
      this.bgImg = this.allnodeList[this.nodeIndex].appList[this.appIndex].status !== 'null'
    },
    handleAppChange (index) {
      this.appIndex = Number(index)
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
      if (this.allnodeList[node].appList[app].type === 'vm') {
        this.$router.push('/mepm/resource/vm')
      } else {
        this.$router.push('/mepm/resource/container')
      }
    },
    GPUId (index) {
      return 'GPUchart' + index
    },
    MEMORYId (index) {
      return 'MEMORYchart' + index
    },
    DISKId (index) {
      return 'DISKchart' + index
    },
    drawGPUchart () {
      let Chart0 = echarts.init(document.getElementById('GPUchart0'))
      let Chart1 = echarts.init(document.getElementById('GPUchart1'))
      let colors = ['#7152db', '#9686e1']
      let option = {
        color: colors,
        title: {
          text: 'CPU',
          x: 'center',
          y: 'bottom',
          padding: 0,
          textStyle: {
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 'normal'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: [
              { value: 1048,
                name: '已占用',
                label: {
                  normal: {
                    position: 'inner',
                    textStyle: {
                      fontSize: 10
                    },
                    show: true,
                    formatter: '{d}%'
                  }
                } },
              { value: 735,
                name: '未占用',
                label: {
                  normal: {
                    position: 'inner',
                    show: false
                  }
                } }
            ]
          }
        ]
      }
      Chart0.setOption(option)
      Chart1.setOption(option)
      window.addEventListener('resize', () => {
        if (Chart0) {
          Chart0.resize()
        }
      })
    },
    drawMEMORYchart () {
      let Chart2 = echarts.init(document.getElementById('MEMORYchart0'))
      let Chart3 = echarts.init(document.getElementById('MEMORYchart1'))
      let colors = ['#7152db', '#9686e1']
      let option = {
        color: colors,
        title: {
          text: 'MEMORY',
          x: 'center',
          y: 'bottom',
          padding: 0,
          textStyle: {
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 'normal'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: [
              { value: 100,
                name: '已占用',
                label: {
                  normal: {
                    position: 'inner',
                    textStyle: {
                      fontSize: 10
                    },
                    show: true,
                    formatter: '{d}%'
                  }
                } },
              { value: 300,
                name: '未占用',
                label: {
                  normal: {
                    position: 'inner',
                    show: false
                  }
                } }
            ]
          }
        ]
      }
      Chart2.setOption(option)
      Chart3.setOption(option)
      window.addEventListener('resize', () => {
        if (Chart2) {
          Chart2.resize()
        }
      })
    },
    drawDISKchart () {
      let Chart4 = echarts.init(document.getElementById('DISKchart0'))
      let Chart5 = echarts.init(document.getElementById('DISKchart1'))
      let colors = ['#7152db', '#9686e1']
      let option = {
        color: colors,
        title: {
          text: 'DISK',
          x: 'center',
          y: 'bottom',
          padding: 0,
          textStyle: {
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 'normal'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: [
              { value: 135,
                name: '已占用',
                label: {
                  normal: {
                    position: 'inner',
                    textStyle: {
                      fontSize: 10
                    },
                    show: true,
                    formatter: '{d}%'
                  }
                } },
              { value: 235,
                name: '未占用',
                label: {
                  normal: {
                    position: 'inner',
                    show: false
                  }
                } }
            ]
          }
        ]
      }
      Chart4.setOption(option)
      Chart5.setOption(option)
      window.addEventListener('resize', () => {
        if (Chart4) {
          Chart4.resize()
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
          left: 42%;
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
          .resources{
            padding-left: 24px;
            p{
              color: #827792;
              font-size: 14px;
              font-family: HarmonyOS_Sans_Regular;
            }
            .chartPie{
              display: flex;
              .sumchart{
                width: 80%;
                height: 100px;
              }
            }
            .OccupyedBefore,.UsableBefore{
              color: #827792;
              font-size: 14px;
              font-family: HarmonyOS_Sans_Regular;
            }
            .OccupyedBefore::before{
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background-color: #7152db;
              border-radius: 50%;
              margin-right: 5px;
            }
            .UsableBefore::before{
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background-color: #9686e1;
              border-radius: 50%;
              margin-right: 5px;
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
.el-popover{
  border-radius: 15px;
          .detail{
            background-color: #fff;
            border-radius: 20px;
            width: 310px;
            .info-title{
              font-size: 18px;
              font-family: HarmonyOS_Sans_Regular;
              color: #5e40c8;
              padding-bottom: 8px;
            }
            .info-title::before{
              content: '';
              display: inline-block;
              background-image: url('../assets/images/info-title.png');
              width: 12px;
              height: 12px;
            }
            .el-form{
              padding-left: 12px;
              color: #5e40c8;
              font-size: 14px;
              font-family: HarmonyOS_Sans_Regular;
              .el-form-item{
                margin-bottom: 0;
              }
              .el-form-item__label{
                 color: #857a93;
                 height: 25px;
                 line-height: 25px;
              }
              .el-form-item__content{
                 height: 25px;
                 line-height: 25px;
              }
            }
          }
}

</style>
