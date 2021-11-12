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
  <div class="resource-content padding_default">
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('resourceMgr.resManager') }}
      <span class="line_bot1" />
    </div>
    <div class="main-tabs">
      <el-tabs
        @tab-click="setActive"
        class="elTabs"
        :class="{'enLeft':language==='en'}"
        v-model="activeName"
        tab-position="left"
      >
        <el-tab-pane
          class="tab-item"
          name="1"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('1')"
            @mouseleave="groupListLeave('1')"
          >
            <em :class="[selectedName==='1' || activeName==='1'?'tab_active':'tab_default']" />{{ $t('resourceMgr.resourceOverview') }}
          </span>
          <div>
            <ResourceOverview />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="2"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('2')"
            @mouseleave="groupListLeave('2')"
          >
            <em :class="[selectedName==='2' || activeName==='2'?'tab_active':'tab_default']" />{{ $t('resourceMgr.vm') }}
          </span>
          <div>
            <VMManager />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="3"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('3')"
            @mouseleave="groupListLeave('3')"
          >
            <em :class="[selectedName==='3' || activeName==='3'?'tab_active':'tab_default']" />{{ $t('resourceMgr.image') }}
          </span>
          <div>
            <ImageManager />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="4"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('4')"
            @mouseleave="groupListLeave('4')"
          >
            <em :class="[selectedName==='4' || activeName==='4'?'tab_active':'tab_default']" />{{ $t('resourceMgr.network') }}
          </span>
          <div>
            <NetworkManager />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="5"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('5')"
            @mouseleave="groupListLeave('5')"
          >
            <em :class="[selectedName==='5' || activeName==='5'?'tab_active':'tab_default']" />{{ $t('resourceMgr.flavor') }}
          </span>
          <div>
            <FlavorManager />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="6"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('6')"
            @mouseleave="groupListLeave('6')"
          >
            <em :class="[selectedName==='6' || activeName==='6'?'tab_active':'tab_default']" />{{ $t('resourceMgr.securityGroup') }}
          </span>
          <div>
            <SecurityGroupManager />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ResourceOverview from './ResourceOverview.vue'
import VMManager from './VMManager.vue'
import ImageManager from './ImageManager.vue'
import NetworkManager from './NetworkManager.vue'
import FlavorManager from './FlavorManager.vue'
import SecurityGroupManager from './SecurityGroupManager.vue'
export default {
  components: {
    ResourceOverview,
    VMManager,
    ImageManager,
    NetworkManager,
    FlavorManager,
    SecurityGroupManager
  },
  data () {
    return {
      activeName: '1',
      selectedName: '1'
    }
  },
  methods: {
    groupListHover (index) {
      this.selectedName = index
    },
    groupListLeave (index) {
      this.selectedName = 1
    }
  },
  mounted () {

  }
}
</script>
<style lang="less">
.resource-content{
  .main-tabs{
    min-height:750px;
    background-color:#fbfbfb;
    margin-top:20px;
    border-radius:20px;
    padding:43px 57px 60px 48.5px;
    box-shadow: 0 6px 68px 0 rgba(94, 64, 200, 0.06);
    .el-tabs__item{
      height: 49px;
      line-height: 50px;
      margin:7px 8.5px;
      border-radius: 8px;
      font-size: 16px;
      .tab_default{
        background: url('../assets/images/menu_iocn_capability_default.png') no-repeat;
      }
      .tab_active{
        background: url('../assets/images/menu_iocn_capability_selected.png') no-repeat;
      }
      span{
        display: inline-block;
        height: 50px;
        letter-spacing: 4px;
        em{
          float: left;
          width: 28px;
          height: 28px;
          margin: 15px 3px 0 0;
        }
      }
    }
    .el-tabs--left .el-tabs__item.is-left:hover {
      background:#fff;
      color: #5e40c8;
      box-shadow:-1px 0px 10px 0 rgba(40, 12, 128, 0.1);
    }
    .el-tabs--left .el-tabs__item.is-left.is-active{
      background:#fff;
      color: #5e40c8;
      box-shadow:-1px 0px 10px 0 rgba(40, 12, 128, 0.1);
    }
    .el-tabs--left .el-tabs__item.is-left{
      text-align: left;
      background: #fbfbfb;
      font-size:20px;
      color: #7a6e8a;
    }
    .el-tabs--left .el-tabs__header.is-left{
      margin-right: 50px;
    }
    .el-tabs--left .el-tabs__active-bar.is-left{
      display: none;
    }
  }
}
</style>
