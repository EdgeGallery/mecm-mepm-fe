<template>
  <div>
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
                  v-if="!bgImg"
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
                <div
                  class="resources-show"
                  v-if="showDetail"
                >
                  <span class="info-title">
                    {{ $t('overview.resourceDetails') }}
                  </span>
                  <el-popover
                    placement="bottom"
                    trigger="hover"
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
                        id="cpuChart"
                      />
                      <div
                        class="sumchart"
                        id="memoryChart"
                      />
                    </div>
                    <div style="text-align:center;margin-top:4px;">
                      <span
                        class="occupiedBefore"
                        style="margin-right:15px;"
                      >{{ $t('overview.occupied') }}</span>
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
    <EgFooter
      :platform-data="platformData"
      :show-full-footer-page="showFullFooterPage"
      :specific-bg="specificBg"
      :specific-bg-color="specificBgColor"
    />
  </div>
</template>

<script>
import { lcmController } from '../tools/request.js'
import echarts from 'echarts'
import EgFooter from 'eg-view/src/components/EgFooter.vue'

export default {
  components: { EgFooter },
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
      bgImgUrltwoEn: require('../assets/images/configured_bg_en.png'),
      cpudata: null,
      memdata: null,
      showDetail: true,
      platformData: [],
      showFullFooterPage: true,
      specificBg: true,
      specificBgColor: '#ffffff'
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getNodeListInPage()
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
              GPU: 'AMD EPYC 7763*2',
              AI: 'Atlas 200*200'
            },
            chartData: [
              {
                name: 'CPU',
                occupied: '20',
                Usable: '80'
              }, {
                name: 'MEMORY',
                occupied: '20',
                Usable: '80'
              }
            ]
          }
          this.nodeList.push(item)
        })
        this.initPackageList()
        if (this.nodeList[0].vim === 'K8S') {
          this.getNodeKpi(this.nodeList[0].mechostIp)
          this.showDetail = true
        } else {
          this.showDetail = false
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    initPackageList () {
      lcmController.getDistributionList().then(res => {
        res.data.forEach(val => {
          if (val.mecHostInfo && val.mecHostInfo.length > 0) {
            val.mecHostInfo.forEach(host => {
              this.nodeList.forEach((node, index) => {
                if (host.hostIp === node.mechostIp) {
                  var result = this.nodeList[index].appList.some(function (item) {
                    if (item.packageId === val.packageId) {
                      return true
                    }
                  })
                  if (!result) {
                    this.nodeList[index].appList.push(val)
                  }
                }
              })
            })
          }
        })
        this.$nextTick(function () {
          this.getInstanceList()
        })
      }).catch((error) => {
        console.log(error)
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
      })
    },
    getNodeKpi (ip) {
      lcmController.getNodeKpi(ip).then(res => {
        this.cpudata = res.data.cpuusage
        this.memdata = res.data.memusage
        this.drawCpuChart()
        this.drawMemoryChart()
      }).catch(error => {
        console.log(error)
      })
    },
    handleNodeChange (nodeIndex, status) {
      this.nodeIndex = Number(nodeIndex)
      if (this.nodeList[nodeIndex].vim === 'K8S') {
        this.getNodeKpi(this.nodeList[nodeIndex].mechostIp)
        this.showDetail = true
      } else {
        this.showDetail = false
      }
      this.bgImg = this.nodeList[nodeIndex].appList[0].status ? this.nodeList[nodeIndex].appList[0].status : ''
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
    drawCpuChart () {
      let cpuChart = echarts.init(document.getElementById('cpuChart'))
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
              {
                value: parseInt((this.cpudata.used / this.cpudata.total) * 100),
                name: this.$t('overview.occupied'),
                label: {
                  normal: {
                    position: 'inner',
                    textStyle: {
                      fontSize: 10
                    },
                    show: true,
                    formatter: '{d}%'
                  }
                }
              },
              {
                value: parseInt(((this.cpudata.total - this.cpudata.used) / this.cpudata.total) * 100),
                name: this.$t('overview.usable'),
                label: {
                  normal: {
                    position: 'inner',
                    textStyle: {
                      fontSize: 10
                    },
                    show: true,
                    formatter: '{d}%'
                  }
                }
              }
            ]
          }
        ]
      }
      cpuChart.setOption(option)
      window.addEventListener('resize', () => {
        if (cpuChart) {
          cpuChart.resize()
        }
      })
    },
    drawMemoryChart () {
      let memChart = echarts.init(document.getElementById('memoryChart'))
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
              {
                value: parseInt((this.memdata.used / this.memdata.total) * 100),
                name: this.$t('overview.occupied'),
                label: {
                  normal: {
                    position: 'inner',
                    textStyle: {
                      fontSize: 10
                    },
                    show: true,
                    formatter: '{d}%'
                  }
                }
              },
              {
                value: parseInt(((this.memdata.total - this.memdata.used) / this.memdata.total) * 100),
                name: this.$t('overview.usable'),
                label: {
                  normal: {
                    position: 'inner',
                    textStyle: {
                      fontSize: 10
                    },
                    show: true,
                    formatter: '{d}%'
                  }
                }
              }
            ]
          }
        ]
      }
      memChart.setOption(option)
      window.addEventListener('resize', () => {
        if (memChart) {
          memChart.resize()
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
            font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
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
            font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
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
            font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
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
            font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
            color: #5e40c8;
          }
          .resources{
            padding-left: 24px;
            p{
              color: #827792;
              font-size: 14px;
              font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
            }
            .chartPie{
              display: flex;
              .sumchart{
                width: 80%;
                height: 100px;
              }
            }
            .occupiedBefore,.UsableBefore{
              color: #827792;
              font-size: 14px;
              font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
            }
            .occupiedBefore::before{
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
              font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
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
              font-family: HarmonyOS_Sans_Regular, Arial, Helvetica, sans-serif;
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
