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
    <div class=pageInner>
      <h2  class="inner-hd-title top0"> {{$t('CAPABILITIES_PAGE.MEP_SELF_CAPABILITY')}} </h2>
      <swiper :data="mepCapabilityies"/>
      <h2  class="inner-hd-title top20"> {{$t('CAPABILITIES_PAGE.APP_CAPABILITY')}} </h2>
      <swiper :data="appCapabilityies"/>
    </div>
  </div>
</template>

<script>

import PageInstru from '../../components/PageInstru.vue';
import {getCapabilityList} from '../../tools/restApi.js'
import Swiper from './Swiper.vue';
export default {
  name: "Capabilities",
  components: { PageInstru, Swiper},
  data () {
    return {
      pageDesc: '',
      mepCapabilityies: [],
      appCapabilityies: []
    }
  },
  methods: {
    refreshShownWithLan () {
      this.pageDesc = this.$i18n.t('CAPABILITIES_PAGE.PAGE_DESC')
      this.mepCapabilityies.forEach(element => {
        if (element.id === 'serviceDiscovery') {
          element.name = this.$i18n.t('CAPABILITIES_PAGE.CAPABILITY_SERVICE_DISCOVERY')
          element.desc = this.$i18n.t('CAPABILITIES_PAGE.CAPABILITY_SERVICE_DISCOVERY_DESC')
        } else if (element.id === 'serviceRegister') {
          element.name = this.$i18n.t('CAPABILITIES_PAGE.CAPABILITY_SERVICE_REGISTRATION')
          element.desc = this.$i18n.t('CAPABILITIES_PAGE.CAPABILITY_SERVICE_REGISTRATION_DESC')
        }
      })
    }
  },
  beforeMount () {
    getCapabilityList().then((res) => {
      let appServices = res.data.appServices
      appServices.forEach((element, index) => {
        element.id = element.name + index
        element.callTimes.reverse()
      })
      this.appCapabilityies = appServices
      let mepServices = res.data.mepServices
      mepServices.forEach((element, index) => {
        element.id = element.name + index
        element.callTimes.reverse()
      })
      this.mepCapabilityies = mepServices
      this.refreshShownWithLan()
    })
  },
  watch: {
    '$i18n.locale': function () {
      this.refreshShownWithLan()
    }
  }
}
</script>

<style lang='less' scoped>
.pageInner {
    padding: 0px 20px 20px 20px;
    overflow: hidden;
    .inner-hd-title {
      text-align: center;
      font-size: 24px;
      color: #000;
      font-weight: 400;
      line-height: 48px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-font-smoothing: antialiased;
      margin-bottom: 10px;
    }
    .top20 {
      margin-top: 25px;
    }
  }

</style>