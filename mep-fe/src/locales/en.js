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

import enLocale from 'element-ui/lib/locale/lang/en'
const EN = {
  NAV: {
    DASHBOARD: 'Dashboard',
    SERVICE: 'Services',
    CAPABILITIES: 'Capabilities',
    TOPOLOGY: 'Topology',
  },
  DASHBOARD_PAGE: {
    PAGE_DESC: 'Overview of applications and services on edge nodes',
    APP_STATICS: 'Application Statistics',
    APP_STATICS_APP: 'Application Count：',
    APP_STATICS_SERVICE: 'Service Count：',
    APP_STATICS_SUBSCRIBED: 'Subscribed Count：',
    APP_STATICS_SUBSCRIBE: 'Subscribe Count：',
    APP_TABLE: 'Appliction List',
    SERVICE_TABLE: 'Service List',
    APP_TABLE_HEADER_NAME: 'Application Name', 
    APP_TABLE_HEADER_VERSION: 'Application Version', 
    APP_TABLE_HEADER_ID: 'Application Id',
    SERVICE_TABLE_HEADER_NAME: 'Service Name', 
    SERVICE_TABLE_HEADER_VERSION: 'Service Version', 
    SERVICE_TABLE_HEADER_ID: 'Service ID',
  },
  SERVICE_PAGE: {
    PAGE_DESC: 'Edge Node Service Details',
    TABLE_HEADER_SERVICE_NAME: 'Service Name',
    TABLE_HEADER_SERVICE_STATUS: 'Service Status',
    TABLE_HEADER_APP_NAME: 'Application Name',
    TABLE_HEADER_SERVICE_VERSION: 'Service Version',
    TABLE_HEADER_SERVICE_ID: 'Service ID',
    NO_DATA_NOTICE: 'No data available.'
  },
  CAPABILITIES_PAGE: {
    PAGE_DESC: 'Capabilities of an edge node and the number of times that the edge node is invoked in the last seven datys',
    CAPABILITY_SERVICE_REGISTRATION: 'Service Registration',
    CAPABILITY_SERVICE_DISCOVERY: 'Service Discovery',
    CAPABILITY_DNS: 'DNS Capability',
    CAPABILITY_LOCATION: 'Positioning Capability',
    CAPABILITY_FACE_RECOGNITION: 'Face Recognition Capability',
    CAPABILITY_SERVICE_REGISTRATION_DESC: 'Registers services to MEP',
    CAPABILITY_SERVICE_DISCOVERY_DESC: 'Provides the application with the service registed on the MEP',
    CAPABILITY_DNS_DESC: 'Provides the domain name resolution capability for applications',
    CAPABILITY_LOCATION_DESC: 'Provides location service for applications',
    CAPABILITY_FACE_RECOGNITION_DESC: 'Upload a photo for facial recognition and return the location of the face to be recognized',
    CARD_DESC: 'Use Times in Last 7 Days',
    MEP_SELF_CAPABILITY: 'MEP Capablities',
    APP_CAPABILITY: 'APP Capabilities'
  },
  TOPOLOGY_PAGE: {
    PAGE_DESC: 'Topology of applications and services on edge nodes',
    NODE_TYPE: 'Node Type',
    SERVICE: 'Service',
    SERVICE_STATUS: 'Service Status',
    SERVICE_STATUS_INACTINVE: 'InActive',
    SERVICE_STATUS_ACTINVE: 'Active',
    TIPS_KEY_SERVICE_NAME: 'Service Name：',
    TIPS_KEY_SERVICE_VERSION: 'Service Version：',
    TIPS_KEY_SERVICE_STATE: 'Service Status：',
    TIPS_KEY_APP_NAME: 'APP Name：',
    TIPS_KEY_NAME: 'Name：',
    TIPS_KEY_SOURCE: 'Source：',
    TIPS_KEY_TARGET: 'Target：',
    TIPS_KEY_SUBORDINATION: 'Type of Affiliation',
    TIPS_KEY_SUBSCRIBE: 'Subscription Relation Type'
  },
  ...enLocale
}
export default EN
