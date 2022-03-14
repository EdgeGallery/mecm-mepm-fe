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
                  v-if="!isShowInstancebgImg"
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
                  <div>
                    <img
                      v-if="currentApp.status"
                      src="../assets/images/appicon_suc.png"
                      alt=""
                    >
                    <img
                      class="startConfig"
                      v-else
                      src="../assets/images/start-appicon.png"
                      alt=""
                    >
                  </div>
                  <div class="searchAppBox">
                    <el-col
                      :span="12"
                      style="width:70%"
                    >
                      <el-autocomplete
                        class="inline-input"
                        v-model="inputAppName"
                        size="small"
                        :fetch-suggestions="((queryString,cb)=>{querySearch(queryString, cb, item.appList)})"
                        :placeholder="$t('overview.nameSearch')"
                        suffix-icon="el-icon-search"
                        @select="handleSelect"
                      />
                    </el-col>
                  </div>
                </div>
                <div
                  class="resources-nodeShow"
                  v-if="showK8sDetail"
                >
                  <K8sOverView
                    :percent-k8s-value="percentK8sValue"
                    :item="item"
                  />
                </div>
                <div
                  class="resources-nodeShow"
                  v-else
                >
                  <OpenStackOverView
                    :percent-value="percentValue"
                  />
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
import EgFooter from 'eg-view/src/components/EgFooter.vue'
import K8sOverView from './K8sOverView.vue'
import OpenStackOverView from './OpenStackOverView.vue'

export default {
  components: { EgFooter, K8sOverView, OpenStackOverView },
  data () {
    return {
      nodeList: [],
      nodeIndex: 0,
      appIndex: 0,
      isShowInstancebgImg: false,
      carouselHeight: '',
      detailInfoShow: false,
      language: localStorage.getItem('language'),
      bgImgUrloneCn: require('../assets/images/start_bg.png'),
      bgImgUrloneEn: require('../assets/images/start_bg_en.png'),
      bgImgUrltwoCn: require('../assets/images/configured_bg.png'),
      bgImgUrltwoEn: require('../assets/images/configured_bg_en.png'),
      cpudata: null,
      memdata: null,
      showK8sDetail: true,
      platformData: [],
      showFullFooterPage: true,
      specificBg: true,
      specificBgColor: '#ffffff',
      percentK8sValue: {
        cpudata: {
          used: 0,
          total: 100
        },
        memdata: {
          used: 0,
          total: 100
        }
      },
      percentValue: {
        instance: {
          used: 0,
          unUsed: 100
        },
        vCpu: {
          used: 0,
          unUsed: 100
        },
        ram: {
          used: 0,
          unUsed: 100
        }
      },
      currentApp: {},
      currentNodeIndex: 0,
      inputAppName: ''
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
        setTimeout(() => {
          this.initPackageList()
          setTimeout(() => {
            if (this.nodeList[0].vim.toUpperCase() === 'K8S') {
              this.getNodeKpi(this.nodeList[0].mechostIp)
            } else {
              this.getOpenStackNodeKpi(this.nodeList[0].mechostIp)
            }
          }, 200)
        }, 200)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleNodeList (host, val) {
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
    },
    initPackageList () {
      lcmController.getDistributionList().then(res => {
        res.data.data.forEach(val => {
          if (val.mecHostInfo && val.mecHostInfo.length > 0) {
            val.mecHostInfo.forEach(host => {
              this.handleNodeList(host, val)
            })
          }
        })
        this.$nextTick(function () {
          setTimeout(() => {
            this.getInstanceList()
          }, 400)
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
        this.isShowInstancebgImg = this.nodeList[0].appList[0].status !== undefined
        this.currentApp = this.nodeList[0].appList[0]
        this.inputAppName = this.currentApp.appPkgName
      }).catch(error => {
        console.log(error)
      })
    },
    getNodeKpi (ip) {
      lcmController.getNodeKpi(ip).then(res => {
        this.percentK8sValue = {
          cpudata: res.data.data.cpuusage,
          memdata: res.data.data.memusage
        }
        this.showK8sDetail = false
        this.$nextTick(() => {
          this.showK8sDetail = true
        })
      }).catch(error => {
        console.log(error)
        this.handleK8sError()
      })
    },
    handleK8sError () {
      this.showK8sDetail = false
      this.percentK8sValue = {
        cpudata: {
          used: 0,
          total: 100
        },
        memdata: {
          used: 0,
          total: 100
        }
      }
      this.$nextTick(() => {
        this.showK8sDetail = true
      })
      this.$message.error(this.$t('overview.getKpiError'))
    },
    handleOSError () {
      this.showK8sDetail = true
      this.percentValue = {
        instance: {
          used: 0,
          unUsed: 100
        },
        vCpu: {
          used: 0,
          unUsed: 100
        },
        ram: {
          used: 0,
          unUsed: 100
        }
      }
      this.$nextTick(() => {
        this.showK8sDetail = false
      })
      this.$message.error(this.$t('overview.getKpiError'))
    },
    getOpenStackNodeKpi (ip) {
      lcmController.getNodeKpi(ip).then(res => {
        let statisticInstanceData = {
          used: res.data.data.totalInstancesUsed,
          unUsed: res.data.data.maxTotalInstances - res.data.data.totalInstancesUsed
        }
        let statistivCpuData = {
          used: res.data.data.totalCoresUsed,
          unUsed: res.data.data.maxTotalCores - res.data.data.totalCoresUsed
        }
        let statisticRamData = {
          used: res.data.data.totalRAMUsed,
          unUsed: res.data.data.maxTotalRAMSize - res.data.data.totalRAMUsed
        }
        this.percentValue = {
          instance: statisticInstanceData,
          vCpu: statistivCpuData,
          ram: statisticRamData
        }
        this.showK8sDetail = true
        this.$nextTick(() => {
          this.showK8sDetail = false
        })
      }).catch(error => {
        console.log(error)
        this.handleOSError()
      })
    },
    handleNodeChange (nodeIndex, status) {
      this.nodeIndex = Number(nodeIndex)
      if (this.nodeList[nodeIndex].vim.toUpperCase() === 'K8S') {
        this.getNodeKpi(this.nodeList[nodeIndex].mechostIp)
      } else {
        this.getOpenStackNodeKpi(this.nodeList[nodeIndex].mechostIp)
      }
      this.currentApp = this.nodeList[nodeIndex].appList.length === 0 ? {} : this.nodeList[nodeIndex].appList[0]
      this.isShowInstancebgImg = this.currentApp.status !== undefined
      this.inputAppName = this.currentApp.appPkgName
      this.currentNodeIndex = nodeIndex
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
      this.$router.push('/mepm/ruleconfig')
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
    handleSelect (selectItem) {
      this.nodeList[this.currentNodeIndex].appList.forEach(item => {
        if (item.appId === selectItem.id) {
          this.currentApp = item
          this.isShowInstancebgImg = item.status !== undefined
        }
      })
    },
    querySearch (queryString, cb, allList) {
      let _tempAppArr = []
      allList.forEach(item => {
        let _tempItem = {
          value: item.appPkgName,
          id: item.appId
        }
        _tempAppArr.push(_tempItem)
      })
      if (this.inputAppName === '') {
        cb(_tempAppArr)
      } else {
        cb(_tempAppArr.filter(this.createFilter(queryString)))
      }
    },
    createFilter (queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
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
  .mid-content{
    padding: 0 13%;
    .title_top{
      padding: 80px 0 40px;
      margin-left: 140px;
      font-size: 36px;
      color: #FFFFFF;
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
        background-color: rgba(46,20,124,.7);
        border-radius: 10px;
        padding: 34px 56px;
        margin-bottom: 40px;
        position: relative;
        .top-name{
          display: flex;
          justify-content: space-between;
          padding-bottom: 15px;
          span{
            color: #FFFFFF;
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
          .searchAppBox{
            margin-left: 20px;
            .inline-input{
              width: 150px;
            }
          }
        }
        .resources-nodeShow{
          position: absolute;
          background-color: rgba(46,20,124,.7);
          border-radius: 10px;
          width: 30%;
          padding: 10px 15px;
          top: 125px;
          right: 10%;
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
