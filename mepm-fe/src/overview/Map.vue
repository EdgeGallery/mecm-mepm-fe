<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div style="height:600px;">
    <div class="content">
      <div
        id="mapChart"
        class="chart"
        v-show="showMainView"
      />
      <div
        id="mapChart1"
        class="chart1"
        v-show="!showMainView"
      />
    </div>
  </div>
</template>

<script>
import CityMap from '../assets/js/CityMap'
import { lcmController } from '../tools/request.js'
import echarts from 'echarts'

import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OlFeature from 'ol/Feature'
import OlGeomPoint from 'ol/geom/Point'
import OlLayerVector from 'ol/layer/Vector'
import OlSourceVector from 'ol/source/Vector'
import OlCluster from 'ol/source/Cluster'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import XYZ from 'ol/source/XYZ'
import InteractionSelect from 'ol/interaction/Select'

import axios from 'axios'
export default {
  name: 'Map',
  props: {
    detail: {
      required: true,
      type: Object,
      detault: function () {
        return null
      }
    }
  },
  data () {
    return {
      chinaId: 100000,
      chinaName: 'china',
      chinaJson: null,
      nodeData: [],
      continue: true,
      btnShow: false,
      map: null,
      showMainView: true,
      language: localStorage.getItem('language')
    }
  },
  mounted () {
    this.getNodeList()
  },
  watch: {
    detail () {
      let arr = []
      arr.push(this.detail)
      console.log('detail -> this.detail', this.detail)
      this.showLayers(arr)
      this.$emit('node', this.detail)
    },
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getNodeList()
    }
  },
  methods: {
    getNodeList () {
      lcmController.getHostList().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item, index) => {
            item.coordinates = item.coordinates.split(',')
          })
          this.nodeData = res.data
          console.log('getNodeList -> this.nodeData', this.nodeData)
        }
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.nodeData = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    showLayers (arr) {
      this.showMainView = false
      this.$nextTick(() => {
        this.openlayers(arr)
      })
    },
    mapChart (divid) {
      axios.get('./map/' + this.chinaId + '.json', {}).then(response => {
        const mapJson = response.data
        this.chinaJson = mapJson
        let myChart = echarts.init(document.getElementById(divid))
        window.onresize = function () {
          myChart.resize()
        }
        this.regAndSetOption(myChart, this.chinaName, mapJson, false)
        myChart.on('click', (param) => {
          if (param.componentType === 'markPoint') {
            let arr = []
            arr.push(param.data)
            this.$emit('node', param.data)
            this.showLayers(arr)
          } else {
            if (this.continue) {
              this.mapAreaClick(param, myChart)
            } else {
              this.regAndSetOption(myChart, this.chinaName, this.chinaJson, false)
            }
          }
        })
      })
    },
    mapAreaClick (param, myChart) {
      let cityId = CityMap[param.name]
      let arr = []
      this.nodeData.forEach((val, index) => {
        if (val.city.indexOf(param.data.name) > -1) {
          arr.push(val)
        }
      })
      if (arr.length === 0) {
        this.returnOverviewModel()
      }
      axios
        .get('./map/' + cityId + '.json', {})
        .then(res => {
          this.btnShow = true
          const mapJson1 = res.data
          this.regAndSetOption(
            myChart,
            param.name,
            mapJson1,
            true
          )
          this.$emit('area', arr, param.name)
        }).catch(err => {
          if (arr.length > 0) {
            this.showLayers(arr)
          }
          console.log(err)
        })
    },
    regAndSetOption (myChart1, name, mapJson, flag) {
      let data = this.nodeData
      data.forEach(item => {
        item.coord = item.coordinates
      })
      echarts.registerMap(name, mapJson)
      myChart1.setOption({
        visualMap: {
          show: false
        },
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: '#000',
            decoration: 'none'
          },
          formatter: function (params) {
            var tipHtml = ''
            let num = 0
            data.forEach(item => {
              if (item.city.indexOf(params.data.name) > -1) {
                num++
              }
            })
            if (localStorage.getItem('language') === 'en') {
              if (params.componentType === 'markPoint') {
                tipHtml = '<div style="width:310px;height:150px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' + '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' + '</i>' +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' + 'Node Information' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              'Node Name：' + '<span style="color:#11ee7d;margin:0 6px;">' + params.data.mechostName + '</span>' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              'Node IP：' + '<span style="color:#f48225;margin:0 6px;">' + params.data.mechostIp + '</span>' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              'Node Location：' + '<span style="color:#f4e925;margin:0 6px;">' + params.data.city + '</span>' + '</p>' +
              '</div>' + '</div>'
              } else {
                tipHtml = '<div style="width:240px;height:130px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' + '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' + '</i>' +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' + 'Area Node Info' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              'Online Node：' + '<span style="color:#11ee7d;margin:0 6px;">' + num + '</span>' + '个' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              'Offline Node：' + '<span style="color:#f48225;margin:0 6px;">' + 0 + '</span>' + '个' + '</p>' +
              '</div>' + '</div>'
              }
            } else {
              if (params.componentType === 'markPoint') {
                tipHtml = '<div style="width:310px;height:150px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' + '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' + '</i>' +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' + '节点信息' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '节点名称：' + '<span style="color:#11ee7d;margin:0 6px;">' + params.data.mechostName + '</span>' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '节点IP：' + '<span style="color:#f48225;margin:0 6px;">' + params.data.mechostIp + '</span>' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '节点地址：' + '<span style="color:#f4e925;margin:0 6px;">' + params.data.city + '</span>' + '</p>' +
              '</div>' + '</div>'
              } else {
                tipHtml = '<div style="width:240px;height:130px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' + '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' + '</i>' +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' + '地域节点信息' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '在线节点：' + '<span style="color:#11ee7d;margin:0 6px;">' + num + '</span>' + '个' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '离线节点：' + '<span style="color:#f48225;margin:0 6px;">' + 0 + '</span>' + '个' + '</p>' +
              '</div>' + '</div>'
              }
            }
            return tipHtml
          }
        },
        series: [
          {
            type: 'map',
            map: name,
            zoom: 1.2,
            aspectScale: 0.75,
            animationDelayUpdate: 300,
            label: {
              normal: {
                show: true,
                color: '#fff',
                fontSize: 12,
                formatter: function (params) {
                  return params.name
                }
              },
              emphasis: {
                show: true,
                color: '#fff'
              }

            },
            itemStyle: {
              normal: {
                // 常规
                areaColor: '#013C62',
                borderColor: '#2ab8ff'
              },
              emphasis: {
                areaColor: '#5c6ff3'
              }
            },
            data: this.initMapData(mapJson),
            markPoint: {
              symbol: 'image://./w.png',
              symbolSize: [26, 26],
              hoverAnimation: true,
              data: data
            }
          }
        ]
      })
    },
    initMapData (mapJson) {
      let mapData = []
      for (const mapJsonFeature of mapJson.features) {
        mapData.push({
          name: mapJsonFeature.properties.name
        })
      }
      return mapData
    },
    returnOverviewModel () {
      let myChart = echarts.init(document.getElementById('mapChart'))
      this.regAndSetOption(myChart, this.chinaName, this.chinaJson, false)
      this.showMainView = true
      this.btnShow = false
      this.continue = true
      this.$emit('area', this.nodeData, '')
    },
    openlayers (data) {
      console.log('open layers', data)
      data[0].coordinates = data[0].coordinates.split(',')
      console.log('openlayers -> data', data[0].coordinates)
      let _this = this
      this.btnShow = true
      if (this.map) {
        console.log('openlayers -> this.map', this.map)
        this.map.setView(new View({
          projection: 'EPSG:4326',
          center: [data[0].coordinates[0], data[0].coordinates[1]],
          zoom: 16
        }))
      } else {
        this.map = new Map({
          target: 'mapChart1',
          layers: [
            new TileLayer({
              source: new XYZ({
                // openstreet
                url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              })

            })
          ],
          view: new View({
            projection: 'EPSG:4326',
            center: [data[0].coordinates[0], data[0].coordinates[1]],
            zoom: 16
          })
        })
        console.log('openlayers -> this.map -> init', this.map)
      }
      console.log('nodedata', this.nodeData)

      var features = []
      console.log('features initialized')
      features.push(
        new OlFeature({
          type: 'icon',
          geometry: new OlGeomPoint([data[0].coordinates[0], data[0].coordinates[1]]),
          eventTarget_: data,
          style: './style.json'
        })
      )
      console.log('features', features)
      var source = new OlSourceVector({
        features: features
      })

      var clusterSource = new OlCluster({
        distance: 0,
        source: source
      })

      var clusters = new OlLayerVector({
        source: clusterSource,
        style: new Style({
          image: new Icon({
            src: './w.png',
            scale: 0.3
          })
        }),
        zIndex: 999
      })

      this.map.addLayer(clusters)

      this.map.on('click', (e) => {
        // 在点击时获取像素区域
        var pixel = this.map.getEventPixel(e.originalEvent)
        this.map.forEachFeatureAtPixel(pixel, function (feature) {
          data.forEach(item => {
            if (feature.geometryChangeKey_.target.extent_[0] === parseFloat(item.coordinates[0])) {
              _this.$emit('node', item)
            }
          })
        })
      })

      let selectSingleClick = new InteractionSelect({})

      // 监听选中事件，然后在事件处理函数中改变被选中的`feature`的样式
      this.map.addInteraction(selectSingleClick)
      selectSingleClick.on('select', function (event) {
        event.selected[0].setStyle(new Style({
          image: new Icon({
            src: './ww.png',
            scale: 0.3
          })
        }))
      })
    }
  }
}

</script>

<style lang='less' scoped>
.content {
  width: 100%;
  height: 100%;
  .chart,.chart1 {
    height: 100%;
  }
  .return{
    position: absolute !important;
    top:15px !important;
    left:27% !important;
  }
}
</style>
