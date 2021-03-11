<!--
  - Copyright 2020 - 2021 Huawei Technologies Co., Ltd.
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
    <page-instru :desc-val="pageDesc"></page-instru>
    <div id="relationCharts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import constants from "../../constant/constants"
import {getServiceList} from "@/tools/restApi";
import PageInstru from '../../components/PageInstru.vue';

require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  components: { PageInstru },
  name: "TopCharts", $ajax: undefined,

  data() {
    return {
      myChart: null,
      symbol_mep: require('../../assets/image/MEP.svg'),
      symbol_app: require('../../assets/image/app.svg'),
      legend_mep: require('../../assets/image/icon_mep.svg'),
      legend_app: require('../../assets/image/icon_app.svg'),
      pageDesc: ''
    }
  },
  methods: {
    drawRelateChart(chartData) {
      let data = chartData.nodes
      let link = chartData.links
      let categories = [{
        name: 'MEP',
        itemStyle: {
          normal: {
            color: constants.COLOR.MEP,
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        symbol: `image://${this.symbol_mep}`,
        legend_symbol: `image://${this.legend_mep}`,
        symbolSize: constants.NODE_SIZE.MEP, //TODO 未生效原因是data中已指定大小，包括symbol等，也可以直接在单个节点中指定
      }, {
        name: 'APP',
        symbol: `image://${this.symbol_app}`,
        legend_symbol: `image://${this.legend_app}`,
        itemStyle: {
          normal: {
            color: constants.COLOR.APP // app名称颜色与图标颜色一致
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.SERVICE_STATUS_ACTINVE'),
        itemStyle: {
          normal: {
            color: constants.COLOR.ACTIVE_SERVICE,
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.SERVICE_STATUS_INACTINVE'),
        itemStyle: {
          normal: {
            color: constants.COLOR.INACTIVE_SERVICE,
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.NODE_TYPE'),
        itemStyle: {
          normal: {
            color: constants.COLOR.INACTIVE_SERVICE,
          }
        }
      },{
        name: this.$i18n.t('TOPOLOGY_PAGE.SERVICE_STATUS'),
        itemStyle: {
          normal: {
            color: constants.COLOR.INACTIVE_SERVICE,
          }
        }
      }, {
        name: this.$i18n.t('TOPOLOGY_PAGE.SERVICE'),
        itemStyle: {
          normal: {
            color: constants.COLOR.ACTIVE_SERVICE,
          }
        }
      }]
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("relationCharts"));
      // 指定图表的配置项和数据, 原始ppt的option
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
              if (params.data.category === constants.NODE_CATEGORY.ACTIVE_SERVICE || params.data.category === constants.NODE_CATEGORY.INACTIVE_SERVICE) {
                res = '<div><p>服务名称：' + params.data.name + '</p></div>'
                res += '<p>服务版本：' + params.data.version + '</p></div>'
                res += '<p>服务状态：' + params.data.state + '</p></div>'
              } else if (params.data.category === constants.NODE_CATEGORY.APP) {
                res = '<div><p>应用名称：' + params.data.name + '</p></div>'
              } else {
                res = '<div><p>名称：' + params.data.name + '</p></div>'
              }
            } else if (params.dataType === 'edge') {
              res = '<div><p>源：' + params.data.sourceName + '</p></div>'
              res += '<p>宿：' + params.data.targetName + '</p></div>'
            }
            return res
          }
        },
        animation: true, // TODO 是否开启动画 无效果
        animationEasingUpdate: 'quinticInOut',
        animationDurationUpdate: 1500,
        legend: [{ // 节点类型, MEP, APP
          // 图例位置
          top: '5%', // top, middle, bottom, 20, 20%
          left: '83%', //right, auto, 20, 20%
          bottom: 'auto', //auto, 20, 20%
          borderRadius: 5,
          itemWidth: 14,
          itemHeight: 14,
          padding: [10, 50, 10, 10],

          // 图例列表布局方向
          orient: 'vertical', //horizontal, vertical

          // 名字超长展示...
          formatter: function (name) {
            return echarts.format.truncateText(name, 200, '14px Microsoft Yahei', '…');
          },

          // 图例tips展示
          tooltip: {
            show: true
          },

          backgroundColor: '#fff',//transparent

          data: [{name: categories[4].name, icon:'none'}].concat(categories.map(function (a) {
            if (a.name === 'MEP' || a.name === 'APP') {
              return {
                name: a.name,
                icon: a.legend_symbol,
                textStyle: {
                  color: a.itemStyle.normal.color
                }
              }
            }
          })).concat([{name: categories[6].name, icon:'circle'}])
        }, { // 服务状态
          // 图例位置
          top: '5%', // top, middle, bottom, 20, 20%
          left: '92%', //right, auto, 20, 20%
          bottom: 'auto', //auto, 20, 20%
          borderRadius: 5,
          itemWidth: 14,
          itemHeight: 14,
          padding: [10, 50, 33, 10],

          // 图例列表布局方向
          orient: 'vertical',

          // 名字超长展示...
          formatter: function (name) {
            return echarts.format.truncateText(name, 200, '14px Microsoft Yahei', '…');
          },

          // 图例tips展示
          tooltip: {
            show: true
          },

          backgroundColor: '#fff',

          data: [{name: categories[5].name, icon:'none', textStyle: {
            fontSize: 12
          }}].concat(categories.map(function (a) {
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
        ],
        series: [
          {
            type: 'graph',
            layout: 'force', //force力引导布局
            focusNodeAdjacency: true,
            roam: true,
            categories: categories,
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                },
                position: 'right', //标签位置
                color: 'auto', //标签颜色
              }
            },
            force: {
              repulsion: 1000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10
                },
                formatter: "{c}"
              }
            },
            data: data,
            links: link,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0.3,  // 线的曲度，0代表直线
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
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    refreshShownWithLan () {
      this.pageDesc = this.$i18n.t('TOPOLOGY_PAGE.PAGE_DESC')
      this.$nextTick(() => {
        getServiceList().then(res => {
          let nodesMap = new Map()
          let linksMap = new Map()
          if (res && res.data) {
            nodesMap.set('MEP', {
              id: 'MEP',
              name: 'MEP', 
              version: 'MEP',
              state: 'MEP',
              category: constants.NODE_CATEGORY.MEP,
              draggable: false,
              symbolSize: constants.NODE_SIZE.MEP,
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
                  category: res.data[i].state === 'ACTIVE' ? constants.NODE_CATEGORY.ACTIVE_SERVICE : constants.NODE_CATEGORY.INACTIVE_SERVICE,
                  draggable: false,
                  symbolSize: constants.NODE_SIZE.SERVICE,
                  index: nodesMap.size
                })
                if (!nodesMap.has(res.data[i].serCategory.id)) {
                  nodesMap.set(res.data[i].serCategory.id, {
                    id: res.data[i].serCategory.id,
                    name: res.data[i].serCategory.name,
                    version: res.data[i].serCategory.version,
                    state: res.data[i].state,
                    category: constants.NODE_CATEGORY.APP,
                    draggable: false,
                    symbolSize: constants.NODE_SIZE.APP,
                    index: nodesMap.size
                  })
                  linksMap.set('MEP' + '_' + res.data[i].serCategory.id, {
                    source: nodesMap.get('MEP').index,
                    target: nodesMap.get(res.data[i].serCategory.id).index,
                    category: 0,
                    value: '',
                    sourceName: nodesMap.get('MEP').name,
                    targetName: nodesMap.get(res.data[i].serCategory.id).name,
                    lineStyle: {
                      color: constants.COLOR.MEP // 以MEP为source的连接颜色与MEP图标颜色一致
                    }
                  })
                }
              }
              let linkId = res.data[i].serCategory.id + '_' + res.data[i].serInstanceId
              if (!linksMap.has(linkId)) {
                linksMap.set(linkId, {
                  source: nodesMap.get(res.data[i].serCategory.id).index,
                  target: nodesMap.get(res.data[i].serInstanceId).index,
                  category: 0,
                  value: '',
                  sourceName: nodesMap.get(res.data[i].serCategory.id).name,
                  targetName: nodesMap.get(res.data[i].serInstanceId).name,
                  lineStyle: {
                    color: constants.COLOR.APP // 以APP为source的连接颜色与app图标颜色一致
                  }
                })
              }

            }
          }
          let chartData = {
            nodes: Array.from(nodesMap.values()),
            links: Array.from(linksMap.values())
          }
          this.drawRelateChart(chartData)
        })
      })
    }
  },
  mounted() {
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
#relationCharts {
  width: 100%;
  height: 852px;
}
.pageInstru {
  margin-bottom: 0px!important;
}
</style>