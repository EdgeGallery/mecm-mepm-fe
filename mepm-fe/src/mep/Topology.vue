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
  <div class="topology-div">
    <div class="title-div">
      {{ $t('TOPOLOGY_PAGE.PAGE_DESC') }}
    </div>
    <div class="legend-div">
      <div class="type-div">
        <div class="type-title">
          {{ $t("TOPOLOGY_PAGE.NODE_TYPE") }}
        </div>
        <div class="item item-mep">
          MEP
        </div>
        <div class="item item-app">
          APP
        </div>
        <div class="item item-service">
          {{ $t("TOPOLOGY_PAGE.SERVICE") }}
        </div>
      </div>
      <div class="type-div">
        <div class="type-title">
          {{ $t("TOPOLOGY_PAGE.SERVICE_STATUS") }}
        </div>
        <div class="item item-service-active">
          {{ $t("TOPOLOGY_PAGE.SERVICE_STATUS_ACTINVE") }}
        </div>
        <div class="item item-service-inactive">
          {{ $t("TOPOLOGY_PAGE.SERVICE_STATUS_INACTIVE") }}
        </div>
      </div>
    </div>
    <div id="relationCharts" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { TOPOLOGY } from '../tools/constant'
import { lcmController } from '../tools/request'

require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

function addSubscribLinks (subscribeRes, nodesMap, linksMap) {
  if (subscribeRes && subscribeRes.data && subscribeRes.data.subscribeRelations) {
    let len = subscribeRes.data.subscribeRelations.length
    for (let i = 0; i < len; i++) {
      let appId = subscribeRes.data.subscribeRelations[i].subscribeAppId
      let serviceIds = subscribeRes.data.subscribeRelations[i].serviceList
      addOneAppSubscribLink(serviceIds, nodesMap, appId, linksMap)
    }
  }
}

function addOneAppSubscribLink (serviceIds, nodesMap, appId, linksMap) {
  let serviceslen = serviceIds.length
  let appInNodesMap = nodesMap.get(appId)
  if (appInNodesMap && serviceslen > 0) {
    for (let j = 0; j < serviceslen; j++) {
      let linkId = appId + '_' + serviceIds[j] + '_subscribeRelation'
      let service = nodesMap.get(serviceIds[j])
      if ((!linksMap.has(linkId)) && service) {
        linksMap.set(linkId, {
          source: appInNodesMap.index,
          target: service.index,
          category: 1,
          value: '',
          sourceName: appInNodesMap.name,
          targetName: service.name,
          lineStyle: {
            color: getColorByState(service.state),
            type: 'dashed',
            width: 2,
            curveness: 0.3 // 和从属关系的曲度不同，以免和从属的线重叠
          },
          symbol: ['circle', 'arrow'],
          symbolSize: [4, 10]
        })
      }
    }
  }
}

function addNodsAndLinks (res, nodesMap, linksMap) {
  if (res && res.data) {
    nodesMap.set('MEP', {
      id: 'MEP',
      name: 'MEP',
      version: 'MEP',
      state: 'MEP',
      category: TOPOLOGY.NODE_CATEGORY.MEP,
      draggable: true,
      symbolSize: TOPOLOGY.NODE_SIZE.MEP,
      index: nodesMap.size
    })
    let len = res.data.length
    for (let i = 0; i < len; i++) {
      if (!nodesMap.has(res.data[i].serInstanceId)) {
        nodesMap.set(res.data[i].serInstanceId, {
          id: res.data[i].serInstanceId,
          name: res.data[i].serName,
          version: res.data[i].version,
          state: res.data[i].state,
          serCategory: res.data[i].serCategory,
          category: getServiceCategory(res.data[i].state),
          draggable: true,
          symbolSize: TOPOLOGY.NODE_SIZE.SERVICE,
          index: nodesMap.size
        })
        if (!nodesMap.has(res.data[i]._links.appInstanceId)) {
          nodesMap.set(res.data[i]._links.appInstanceId, {
            id: res.data[i]._links.appInstanceId,
            name: res.data[i].serCategory.name,
            version: res.data[i].serCategory.version,
            state: res.data[i].state,
            category: TOPOLOGY.NODE_CATEGORY.APP,
            draggable: true,
            symbolSize: TOPOLOGY.NODE_SIZE.APP,
            index: nodesMap.size
          })
          linksMap.set('MEP' + '_' + res.data[i]._links.appInstanceId, {
            source: nodesMap.get('MEP').index,
            target: nodesMap.get(res.data[i]._links.appInstanceId).index,
            category: 0,
            value: '',
            sourceName: nodesMap.get(res.data[i]._links.appInstanceId).name,
            targetName: nodesMap.get('MEP').name,
            lineStyle: {
              color: TOPOLOGY.COLOR.APP // 以APP为source的连接颜色与app图标颜色一致
            }
          })
        }
      }
      let linkId = res.data[i]._links.appInstanceId + '_' + res.data[i].serInstanceId
      if (!linksMap.has(linkId)) {
        linksMap.set(linkId, {
          source: nodesMap.get(res.data[i]._links.appInstanceId).index,
          target: nodesMap.get(res.data[i].serInstanceId).index,
          category: 0,
          value: '',
          sourceName: nodesMap.get(res.data[i].serInstanceId).name,
          targetName: nodesMap.get(res.data[i]._links.appInstanceId).name,
          lineStyle: {
            color: getColorByState(res.data[i].state)
          }
        })
      }
    }
  }
}

function getServiceCategory (state) {
  return state === 'ACTIVE' ? TOPOLOGY.NODE_CATEGORY.ACTIVE_SERVICE : TOPOLOGY.NODE_CATEGORY.INACTIVE_SERVICE
}

function getColorByState (state) {
  return state === 'ACTIVE' ? TOPOLOGY.COLOR.ACTIVE_SERVICE : TOPOLOGY.COLOR.INACTIVE_SERVICE
}

export default {
  name: 'TopCharts',
  $ajax: undefined,

  data () {
    return {
      myChart: null,
      symbol_mep: require('../assets/images/mep.png'), // TODO 替换为svg
      symbol_app: require('../assets/images/app.png'),
      legend_mep: require('../assets/images/icon_mep.svg'),
      legend_app: require('../assets/images/icon_app.svg'),
      symbol_service_active: require('../assets/images/service_active.png'),
      symbol_service_inactive: require('../assets/images/service_inactive.png'),
      pageDesc: ''
    }
  },
  methods: {
    drawRelateChart (chartData) {
      let data = chartData.nodes
      let link = chartData.links
      let categories = [{
        name: 'MEP',
        itemStyle: {
          normal: {
            color: TOPOLOGY.COLOR.MEP
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        symbol: `image://${this.symbol_mep}`,
        legend_symbol: `image://${this.legend_mep}`,
        symbolSize: TOPOLOGY.NODE_SIZE.MEP
      }, {
        name: 'APP',
        symbol: `image://${this.symbol_app}`,
        legend_symbol: `image://${this.legend_app}`,
        itemStyle: {
          normal: {
            color: TOPOLOGY.COLOR.APP // app名称颜色与图标颜色一致
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.SERVICE_STATUS_ACTINVE'),
        symbol: `image://${this.symbol_service_active}`,
        itemStyle: {
          normal: {
            color: TOPOLOGY.COLOR.ACTIVE_SERVICE
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.SERVICE_STATUS_INACTIVE'),
        symbol: `image://${this.symbol_service_inactive}`,
        itemStyle: {
          normal: {
            color: TOPOLOGY.COLOR.INACTIVE_SERVICE
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.NODE_TYPE'),
        itemStyle: {
          normal: {
            color: TOPOLOGY.COLOR.INACTIVE_SERVICE
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.SERVICE_STATUS'),
        itemStyle: {
          normal: {
            color: TOPOLOGY.COLOR.INACTIVE_SERVICE
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.SERVICE'),
        itemStyle: {
          normal: {
            color: TOPOLOGY.COLOR.ACTIVE_SERVICE
          }
        }
      }]
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('relationCharts'))
      // 指定图表的配置项和数据, 原始ppt的option
      let serviceNameKey = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_SERVICE_NAME')
      let serviceVersionKey = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_SERVICE_VERSION')
      let serviceVersionState = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_SERVICE_STATE')
      let appName = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_APP_NAME')
      let name = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_NAME')
      let source = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_SOURCE')
      let target = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_TARGET')
      let subOrdination = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_SUBORDINATION')
      let subscribe = this.$i18n.t('TOPOLOGY_PAGE.TIPS_KEY_SUBSCRIBE')
      let option = {
        title: {
          text: '',
          top: 'top',
          left: 'left'
        },
        tooltip: {
          appendToBody: true,
          formatter: function (params) {
            let res
            if (params.dataType === 'node') {
              if (params.data.category === TOPOLOGY.NODE_CATEGORY.ACTIVE_SERVICE || params.data.category === TOPOLOGY.NODE_CATEGORY.INACTIVE_SERVICE) {
                res = '<div><p>' + serviceNameKey + params.data.name + '</p></div>'
                res += '<p>' + serviceVersionKey + params.data.version + '</p></div>'
                res += '<p>' + serviceVersionState + params.data.state + '</p></div>'
              } else if (params.data.category === TOPOLOGY.NODE_CATEGORY.APP) {
                res = '<div><p>' + appName + params.data.name + '</p></div>'
              } else {
                res = '<div><p>' + name + params.data.name + '</p></div>'
              }
            } else if (params.dataType === 'edge') {
              if (params.data.category === 0) {
                res = '<div><p>' + subOrdination + '</p></div>'
              } else {
                res = '<div><p>' + subscribe + '</p></div>'
              }
              res += '<br>'
              res += '<p>' + source + params.data.sourceName + '</p>'
              res += '<p>' + target + params.data.targetName + '</p></div>'
            }
            return res
          }
        },
        animation: true,
        animationEasingUpdate: 'quinticInOut',
        animationDurationUpdate: 1500,
        legend: {
          show: false,
          data: [{ // 节点类型, MEP, APP, Service
            top: '5%', // top, middle, bottom, 20, 20%
            left: '83%', // right, auto, 20, 20%
            bottom: 'auto', // auto, 20, 20%
            borderRadius: 5,
            itemWidth: 14,
            itemHeight: 14,
            padding: [10, 50, 10, 10],

            // 图例列表布局方向
            orient: 'vertical', // horizontal, vertical

            // 名字超长展示...
            formatter: function (nameParam) {
              return echarts.format.truncateText(nameParam, 200, '14px Microsoft Yahei', '…')
            },

            // 图例tips展示
            tooltip: {
              show: true
            },

            backgroundColor: '#fff', // transparent

            data: [{ name: categories[4].name, icon: 'none' }].concat(categories.map(function (a) {
              if (a.name === 'MEP' || a.name === 'APP') {
                return {
                  name: a.name,
                  icon: a.legend_symbol,
                  textStyle: {
                    color: a.itemStyle.normal.color
                  }
                }
              }
            })).concat([{ name: categories[6].name, icon: 'circle' }])
          }, { // 服务状态
            top: '5%', // top, middle, bottom, 20, 20%
            left: '92%', // right, auto, 20, 20%
            bottom: 'auto', // auto, 20, 20%
            borderRadius: 5,
            itemWidth: 14,
            itemHeight: 14,
            padding: [10, 50, 33, 10],

            // 图例列表布局方向
            orient: 'vertical',

            // 名字超长展示...
            formatter: function (param) {
              return echarts.format.truncateText(param, 200, '14px Microsoft Yahei', '…')
            },

            // 图例tips展示
            tooltip: {
              show: true
            },

            backgroundColor: '#fff',

            data: [{ name: categories[5].name,
              icon: 'none',
              textStyle: {
                fontSize: 12
              } }].concat(categories.map(function (a) {
              let iconVal = 'roundRect'
              if (a.name === categories[2].name || a.name === categories[3].name) {
                return {
                  name: a.name,
                  icon: iconVal,
                  textStyle: {
                    color: a.itemStyle.normal.color,
                    fontSize: 12
                  }
                }
              }
            }))
          }
          ]
        },
        series: [
          {
            type: 'graph',
            layout: 'force', // force力引导布局
            focusNodeAdjacency: true,
            draggable: true,
            roam: true,
            categories: categories,
            legendHoverLink: false,
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                },
                position: 'right', // 标签位置
                color: 'auto' // 标签颜色
              }
            },
            force: {
              repulsion: 1000
            },
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10
                },
                formatter: '{c}'
              }
            },
            data: data,
            links: link,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0.2, // 线的曲度，0代表直线
                color: 'source'
              }
            },
            rippleEffect: {
              brushType: 'stroke'
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    refreshShownWithLan () {
      this.pageDesc = this.$i18n.t('TOPOLOGY_PAGE.PAGE_DESC')
      this.$nextTick(() => {
        lcmController.getServiceList().then(res => {
          let nodesMap = new Map()
          let linksMap = new Map()
          addNodsAndLinks(res, nodesMap, linksMap)
          lcmController.getSubscribeInfo().then(subscribeRes => {
            addSubscribLinks(subscribeRes, nodesMap, linksMap)
            let chartData = {
              nodes: Array.from(nodesMap.values()),
              links: Array.from(linksMap.values())
            }
            this.drawRelateChart(chartData)
          })
        })
      })
    }
  },
  mounted () {
    this.refreshShownWithLan()
  },
  watch: {
    '$i18n.locale': function () {
      this.refreshShownWithLan()
    }
  }
}

</script>

<style lang="less" scoped>
.topology-div{
  box-shadow: 0px 1px 21px 0px rgba(201, 181, 228, 0.4);
  overflow: hidden;
  padding: 30px 35px 30px 35px;
  .title-div {
    font-size: 16px;
    font-family: FZLanTingHeiS-L-GB;
    font-weight: 400;
    color: #280B4E;
  }
  .title-div::before{
    content:'';
    display:inline-block;
    width:6px;
    height:6px;
    margin-right:8px;
    background: #280B4E;
    position: relative;
  }
  #relationCharts {
    width: 100%;
    height: 852px;
  }
  .legend-div{
    position: absolute;
    right: calc(18.75% + 54px); // TODO 与屏幕大小相关
    width: 178px;
    font-family: FZLanTingHeiS-L-GB;
    font-weight: 400;
    .type-div{
      background: #FFFFFF;
      border: 1px solid #F2F3F5;
      border-radius: 4px;
      padding: 5px 23px 12px;
      margin-bottom: 15px;
      .type-title{
        font-size: 16px;
        color: #2B0E52;
        line-height: 36px;
      }
      .item{
        font-size: 13px;
        line-height: 23px;
      }
      .item-mep{
        color: #2B0E52;
      }
      .item-mep::before{
        content: '';
        display:inline-block;
        margin-right: 13px;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background: #280B4E;
        border-radius: 50%;
      }
      .item-app{
        color: #9766D8;
      }
      .item-app::before{
        content: '';
        display:inline-block;
        margin-right: 13px;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background: #9766D8;
        border-radius: 50%;
      }
      .item-service{
        color: #688EF3;
      }
      .item-service::before{
        content: '';
        display:inline-block;
        margin-right: 13px;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background: #688EF3;
        border-radius: 50%;
      }
      .item-service-active{
        color: #688EF3;
      }
      .item-service-active::before{
        content: '';
        display:inline-block;
        margin-right: 13px;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background: #688EF3;
        border-radius: 50%;
      }
      .item-service-inactive{
        color: #B7B7B7;
      }
      .item-service-inactive::before{
        content: '';
        display:inline-block;
        margin-right: 13px;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background: #B7B7B7;
        border-radius: 50%;
      }
    }
  }
}
.pageInstru {
  margin-bottom: 0px!important;
}
@media screen and (max-width:1380px){
  .legend-div{
    right: 110px!important;
  }
}
</style>
