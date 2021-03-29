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
    <page-instru :desc-val="pageDesc"></page-instru>
    <el-row>
      <el-col :span="24">
        <div class="panel panel-default">
          <div class="panel-heading fw-600 h-42">
            <span class="pull-left ">{{$t('DASHBOARD_PAGE.APP_STATICS')}}</span>
            <span class="pull-right">
              <el-button
                class="refresh-button"
                icon="el-icon-refresh"
                @click="exeRefresh"></el-button>
            </span>
          </div>
          <div class="panel-body">
            <el-row style="margin: 0px">
              <el-col
                :span="6"
                class="boxCls"
                v-for="item in dashboardData"
                :key="item.id">
                <img class="staticsCard" :src="item.src" alt=""/>
                <p class="text-center">{{ item.title }}</p>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="tableInDash">
        <TableInDashborad :col-names="appTableColName" :count="appCount" :data="appData" :table-name="appTableName"/>
      </el-col>
      <el-col :span="12">
        <TableInDashborad :col-names="serviceTableColName" :count="serviceCount" :data="serviceData"
                          :table-name="serviceTableName" :showMoreInfoEntry="true"/>
      </el-col>
    </el-row>
  </div>

</template>

<script>

import TableInDashborad from "./TableInDashborad.vue";
import {getServiceList, getSubscribeStatistic} from "@/tools/restApi";
import PageInstru from '../../components/PageInstru.vue';

export default {
  name: "Dashboard",
  components: {
    TableInDashborad,
    PageInstru
  },
  data() {
    return {
      appTableColName: [],
      serviceTableColName: [],
      appData: [],
      serviceData: [],
      subscribedCount: 0,
      subscribeCount: 0,
      appCount: 0,
      serviceCount: 0,
      appTableName: '',
      serviceTableName: '',
      dashboardData: [],
      pageDesc: ''
    }
  },
  methods: {
    refreshShownWithLan () {
      this.pageDesc = this.$i18n.t('DASHBOARD_PAGE.PAGE_DESC')
      this.dashboardData = [
        {
          id: 1,
          title: this.$i18n.t('DASHBOARD_PAGE.APP_STATICS_APP') + this.appCount,
          src: require('../../assets/image/appDashboard.png'),
        },
        {
          id: 2,
          title: this.$i18n.t('DASHBOARD_PAGE.APP_STATICS_SERVICE') + this.serviceCount,
          src: require('../../assets/image/serviceDashboard.png'),
        },
        {
          id: 3,
          title: this.$i18n.t('DASHBOARD_PAGE.SERVICE_STATICS_SUBSCRIBED') + this.subscribedCount,
          src: require('../../assets/image/providerDashboard.png'),
        },
        {
          id: 4,
          title: this.$i18n.t('DASHBOARD_PAGE.APP_STATICS_SUBSCRIBE') + this.subscribeCount,
          src: require('../../assets/image/consumerDashboard.png'),
        }
      ]
      this.appTableName = this.$i18n.t('DASHBOARD_PAGE.APP_TABLE')
      this.serviceTableName = this.$i18n.t('DASHBOARD_PAGE.SERVICE_TABLE')
      this.appTableColName = [{
        name: this.$i18n.t('DASHBOARD_PAGE.APP_TABLE_HEADER_NAME')
        }, {
        name: this.$i18n.t('DASHBOARD_PAGE.APP_TABLE_HEADER_VERSION')
        }, {
        name: this.$i18n.t('DASHBOARD_PAGE.APP_TABLE_HEADER_ID')
        }]
      this.serviceTableColName = [{
        name: this.$i18n.t('DASHBOARD_PAGE.SERVICE_TABLE_HEADER_NAME')
        }, {
        name: this.$i18n.t('DASHBOARD_PAGE.SERVICE_TABLE_HEADER_VERSION')
        }, {
        name: this.$i18n.t('DASHBOARD_PAGE.SERVICE_TABLE_HEADER_ID')
        }]
    },
    exeRefresh() {
      let appMap = new Map()
      let serviceMap = new Map()
      getServiceList().then(res => {
        if (res && res.data) {
        let len = res.data.length
        for (let i = 0; i < len; i++) {
          if (!serviceMap.has(res.data[i].serInstanceId)) {
            serviceMap.set(res.data[i].serInstanceId, {
              id: res.data[i].serInstanceId,
              name: res.data[i].serName,
              version: res.data[i].version,
            })
            if (!appMap.has(res.data[i].serCategory.id)) {
              appMap.set(res.data[i].serCategory.id, {
                id: res.data[i].serCategory.id,
                name: res.data[i].serCategory.name,
                version: res.data[i].serCategory.version,
              })
            }
          }
        }
        let appArray = Array.from(appMap.values())
        let serviceArray = Array.from(serviceMap.values())
        this.appCount = appArray.length
        this.serviceCount = serviceArray.length
        this.appData = appArray
        this.serviceData = serviceArray
        getSubscribeStatistic().then(statisticRes => {
          if (statisticRes && statisticRes.data) {
            this.subscribeCount = statisticRes.data.subscribeNum.appSubscribeNum 
            this.subscribedCount  = statisticRes.data.subscribeNum.serviceSubscribedNum
          }
          this.refreshShownWithLan()
        })
      }
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.refreshShownWithLan()
    }
  },
  beforeMount() {
    this.exeRefresh()
  }
}
</script>

<style lang='less'>
.panel-default {
  border-color: #ddd;

}
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.fw-600 {
  font-weight: 600;
}

.h-42 {
  height: 42px;
}

.pull-left {
  float: left !important;
}

.pull-right {
  float: right !important;
}

.refresh-button {
  padding: 0 !important;
  border: none !important;
}

.boxCls {
  height: 250px;
}

.circle {
  height: 125px;
  line-height: 9.9;
  width: 125px;
  background-color: #28a77226;
  border-radius: 50%;
  margin: 15% auto;
  text-align: center;
}

.text-center {
  text-align: center;
  margin-top: -50px;
  font-size: 24px;
  color: white;
}

.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #f5f5f5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #333000;
  border-radius: 10px;
}

.table-responsive {
  min-height: .01%;
  overflow-x: auto;
  height: 372px;
  width: 100%;
  display: block;
  overflow-y: auto;
}

.dashboardTable {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}

.dashboardTableCell {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
  padding: 8px;
  line-height: 1.42857143;
  text-align: left;
}

.tableInDash {
  padding-right: 15px;
}
.panel-body {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left:15px;
  .staticsCard{
    width: 97%;
    height: 99%;
  }
}
</style>