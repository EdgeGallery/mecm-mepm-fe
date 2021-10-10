<template>
  <div class="overview">
    <div class="mid-content">
      <div class="title_top font-bold">
        {{ $t('nav.overview') }}
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
            v-for="(item,index) in nodeList"
            :key="index"
          >
            <div
              class="edge-info"
              id="edge-info"
            >
              <div class="top-name">
                <span>{{ item.mechostName }}</span>
              </div>
              <img
                v-if="bgImg===false"
                class="content-img"
                :src="language==='cn'? bgImgUrloneCn : bgImgUrloneEn"
                alt=""
              >
              <img
                v-else
                class="content-img"
                :src="language==='cn'? bgImgUrltwoCn : bgImgUrltwoEn"
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
                      v-if="appItem.status"
                      src="../assets/images/appicon_suc.png"
                      alt=""
                    >

                    <img
                      class="startConfig"
                      v-else
                      src="../assets/images/start-appicon.png"
                      alt=""
                      @click="startConfig(index,appindex)"
                    >
                    <p>{{ appItem.appPkgName }}</p>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="resources-show">
                <span class="info-title">
                  {{ $t('overview.resourceDetails') }}
                </span>
                <el-popover
                  placement="bottom"
                  trigger="click"
                >
                  <span
                    slot="reference"
                    class="infoBtn"
                    style="float: right;cursor: pointer;"
                  >{{ $t('overview.moreDetails') }}<em class="el-icon-right" /></span>
                  <div
                    class="detail"
                  >
                    <p class="info-title">
                      {{ $t('overview.moreResource') }}
                    </p>
                    <el-form>
                      <el-form-item :label="$t('overview.network')">
                        {{ item.detailInfo.resource.inter }}
                      </el-form-item>
                      <el-form-item :label="$t('overview.x86')">
                        {{ item.detailInfo.resource.x86Resource }}
                      </el-form-item>
                      <el-form-item :label="$t('overview.GPU')">
                        {{ item.detailInfo.resource.GPU }}
                      </el-form-item>
                      <el-form-item :label="$t('overview.AI')">
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
                      id="GPUchart"
                    />
                    <div
                      class="sumchart"
                      id="MEMORYchart"
                    />
                  </div>
                  <div style="text-align:center;margin-top:4px;">
                    <span
                      class="OccupyedBefore"
                      style="margin-right:15px;"
                    >{{ $t('overview.occupyed') }}</span>
                    <span class="UsableBefore">{{ $t('overview.usable') }}</span>
                  </div>
                  <p style="text-align:center;margin-top:4px;">
                    {{ $t('overview.computeResources') }}
                  </p>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { lcmController } from '../tools/request.js'
import echarts from 'echarts'
export default {
  data () {
    return {
      nodeList: [],
      nodeIndex: 0,
      appIndex: 0,
      bgImg: false,
      carouselHeight: '',
      detailInfoShow: false,
      language: localStorage.getItem('language'),
      bgImgUrloneCn: require('../assets/images/start_bg.png'),
      bgImgUrloneEn: require('../assets/images/start_bg_en.png'),
      bgImgUrltwoCn: require('../assets/images/configured_bg.png'),
      bgImgUrltwoEn: require('../assets/images/configured_bg_en.png')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getNodeListInPage()
    this.drawGPUchart()
    this.drawMEMORYchart()
  },
  methods: {
    getNodeListInPage () {
      lcmController.getHostList().then(res => {
        res.data.forEach(item => {
          item.appList = []
          item.detailInfo = {
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
              }
            ]
          }
          this.nodeList.push(item)
        })
        this.initPackageList()
        this.getNodeKpi(this.nodeList[0].mechostIp)
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('tip.getCommonListFailed'))
      })
    },
    initPackageList () {
      lcmController.getDistributionList().then(res => {
        res.data.forEach(val => {
          val.mecHostInfo.forEach(host => {
            this.nodeList.forEach((node, index) => {
              if (host.hostIp === node.mechostIp) {
                this.nodeList[index].appList.push(val)
              }
            })
          })
        })
        this.getInstanceList()
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('tip.getCommonListFailed'))
      })
    },
    getInstanceList () {
      lcmController.getInstanceList().then(res => {
        res.data.forEach(ins => {
          this.nodeList.forEach((node, index) => {
            node.appList.forEach((app, key) => {
              if (ins.appPackageId === app.packageId) {
                this.nodeList[index].appList[key].status = ins.syncStatus
              }
            })
          })
        })
        this.bgImg = this.nodeList[0].appList[0].status
      }).catch(error => {
        console.log(error)
        this.$message.error(this.$t('tip.getCommonListFailed'))
      })
    },
    getNodeKpi (ip) {
      lcmController.getNodeKpi(ip).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    handleNodeChange (nodeIndex, status) {
      this.nodeIndex = Number(nodeIndex)
      this.bgImg = this.nodeList[nodeIndex].appList[0].status
      this.getNodeKpi(this.nodeList[nodeIndex].mechostIp)
    },
    handleAppChange (index, status) {
      this.appIndex = Number(index)
      this.bgImg = this.nodeList[this.nodeIndex].appList[index].status
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
      if (this.nodeList[node].appList[app].type === 'vm') {
        this.$router.push('/mepm/resource/vm')
      } else {
        this.$router.push('/mepm/resource/container')
      }
    },
    drawGPUchart () {
      let ChartGpu = echarts.init(document.getElementById('GPUchart'))
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
      ChartGpu.setOption(option)
      window.addEventListener('resize', () => {
        if (ChartGpu) {
          ChartGpu.resize()
        }
      })
    },
    drawMEMORYchart () {
      let ChartMem = echarts.init(document.getElementById('MEMORYchart'))
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
      ChartMem.setOption(option)
      window.addEventListener('resize', () => {
        if (ChartMem) {
          ChartMem.resize()
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
            bottom: 180px;
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
