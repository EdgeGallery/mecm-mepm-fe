/*
 *  Copyright 2020 - 2021 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const CN = {
  NAV: {
    DASHBOARD: '概览',
    SERVICE: '服务',
    CAPABILITIES: '能力',
    TOPOLOGY: '拓扑',
  },
  DASHBOARD_PAGE: {
    PAGE_DESC: '边缘节点应用和服务的概览信息',
    APP_STATICS: '应用统计',
    APP_STATICS_APP: '应用：',
    APP_STATICS_SERVICE: '服务：',
    APP_STATICS_SUBSCRIBED: '被订阅的应用：',
    APP_STATICS_SUBSCRIBE: '订阅方应用：',
    APP_TABLE: '应用列表',
    SERVICE_TABLE: '服务列表',
    APP_TABLE_HEADER_NAME: '应用名称', 
    APP_TABLE_HEADER_VERSION: '应用版本', 
    APP_TABLE_HEADER_ID: '应用 Id',
    SERVICE_TABLE_HEADER_NAME: '服务名称', 
    SERVICE_TABLE_HEADER_VERSION: '服务版本', 
    SERVICE_TABLE_HEADER_ID: '服务 Id',
    
  },
  SERVICE_PAGE: {
    PAGE_DESC: '边缘节点服务的详细信息',
    TABLE_HEADER_SERVICE_NAME: '服务名称',
    TABLE_HEADER_SERVICE_STATUS: '服务状态',
    TABLE_HEADER_APP_NAME: '所属应用',
    TABLE_HEADER_SERVICE_VERSION: '服务版本',
    TABLE_HEADER_SERVICE_ID: '服务ID',
    NO_DATA_NOTICE: '暂无数据'
  },
  CAPABILITIES_PAGE: {
    PAGE_DESC: '边缘节点所具备的能力及最近7天被调用的次数',
    CAPABILITY_SERVICE_REGISTRATION: '服务注册',
    CAPABILITY_SERVICE_DISCOVERY: '服务发现',
    CAPABILITY_DNS: 'DNS能力',
    CAPABILITY_LOCATION: '定位能力',
    CAPABILITY_FACE_RECOGNITION: '人脸识别能力',
    CAPABILITY_SERVICE_REGISTRATION_DESC: '提供APP注册服务到MEP的能力',
    CAPABILITY_SERVICE_DISCOVERY_DESC: '为APP提供发现MEP上已注册的服务',
    CAPABILITY_DNS_DESC: '为APP提供域名解析能力',
    CAPABILITY_LOCATION_DESC: '为APP提供定位服务',
    CAPABILITY_FACE_RECOGNITION_DESC: '上传照片进行人脸识别，返回待识别人脸所在的位置',
    CARD_DESC: '最近7天使用次数',
    MEP_SELF_CAPABILITY: 'MEP自身能力',
    APP_CAPABILITY: 'APP能力'
  },
  TOPOLOGY_PAGE: {
    PAGE_DESC: '边缘节点应用和服务的拓扑图',
    NODE_TYPE: '节点类型',
    SERVICE: '服务',
    SERVICE_STATUS: '服务状态',
    SERVICE_STATUS_INACTINVE: '未激活',
    SERVICE_STATUS_ACTINVE: '激活',
    TIPS_KEY_SERVICE_NAME: '服务名称：',
    TIPS_KEY_SERVICE_VERSION: '服务版本：',
    TIPS_KEY_SERVICE_STATE: '服务状态：',
    TIPS_KEY_APP_NAME: '应用名称：',
    TIPS_KEY_NAME: '名称：',
    TIPS_KEY_SOURCE: '源端：',
    TIPS_KEY_TARGET: '宿端：',
    TIPS_KEY_SUBORDINATION: '从属关系',
    TIPS_KEY_SUBSCRIBE: '订阅关系'
  },
  ...zhLocale
}
export default CN
