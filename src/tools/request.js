/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
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

import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import { uuid } from 'vue-uuid'

const serverPort = 31252

let api
if (window.location.href.indexOf('31252') > -1) {
  api = 'https://' + window.location.href.split('//')[1].split(':')[0]
} else {
  api = 'https://' + window.location.hostname
}

let lcmcontrollerApi = api + ':' + serverPort + '/lcmcontroller/v1'
let appRuleMgrApi = api + ':' + serverPort + '/apprulemgr/v1'
let lcmcontrollerApiV2 = api + ':' + serverPort + '/lcmcontroller/v2'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

function GET (url, params) {
  let headers = {
    name: sessionStorage.getItem('userName'),
    key: sessionStorage.getItem('password')
  }
  return axios.get(url, {
    params: params,
    headers: headers
  })
}

function POST (url, params) {
  let headers = {
    name: sessionStorage.getItem('userName'),
    key: sessionStorage.getItem('password')
  }
  return axios.post(url, params, { headers: headers })
}

function PUT (url, params) {
  let headers = {
    name: sessionStorage.getItem('userName'),
    key: sessionStorage.getItem('password')
  }
  return axios.put(url, params, { headers: headers })
}

function DELETE (url, params) {
  let headers = {
    name: sessionStorage.getItem('userName'),
    key: sessionStorage.getItem('password')
  }
  return axios.delete(url, {
    headers: headers,
    data: params
  })
}

function getUserId () {
  return sessionStorage.getItem('userId') || '00000000-0000-0000-0000-000000000000'
}

function getRandomAppInstanceId () {
  return uuid.v4()
}

let lcmController = {
  login () {
    return POST(lcmcontrollerApi + '/login')
  },
  changPwd () {
    let headers = {
      name: sessionStorage.getItem('userName'),
      key: sessionStorage.getItem('password'),
      newkey: sessionStorage.getItem('newpassword')
    }
    return axios.post(lcmcontrollerApi + '/password', '', { headers: headers })
  },
  createHost (params) {
    return POST(lcmcontrollerApi + '/hosts', params)
  },
  getHostList () {
    return GET(lcmcontrollerApi + '/hosts')
  },
  modifyHost (params) {
    return PUT(lcmcontrollerApi + '/hosts', params)
  },
  deleteHost (params) {
    return DELETE(lcmcontrollerApi + '/hosts' + '/' + params)
  },
  uploadConfig (params) {
    return POST(lcmcontrollerApiV2 + '/configuration', params)
  },
  uploadPackage (params) {
    return POST(lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/packages', params)
  },
  getAppPackageList () {
    return GET(lcmcontrollerApi + '/tenants/' + getUserId() + '/packages')
  },
  confirmToDistribute (params) {
    return POST(lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/packages/' + params.packageId,
      params)
  },
  getDistributionList () {
    return GET(lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/packages')
  },
  deleteDistributionApp (type, hostIp, packageId) {
    let url = lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/packages/' + packageId + '/hosts/' + hostIp
    if (type === 2) {
      url = lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/packages/' + packageId
    }
    return DELETE(url)
  },
  getNodeKpi (hostip) {
    return GET(lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/hosts/' + hostip + '/kpi')
  },
  getServiceInfo (instanceId) {
    return GET(lcmcontrollerApi + '/tenants/' + getUserId() + '/app_instances/' + instanceId)
  },
  getMepCapabilities (hostIp) {
    return GET(lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/mep_capabilities')
  },
  confirmToDeploy (params) {
    return POST(lcmcontrollerApi + '/tenants/' + getUserId() + '/app_instances', params)
  },
  confirmToBatchDeploy (params) {
    return POST(lcmcontrollerApi + '/tenants/' + getUserId() + '/app_instances/batch_create', params)
  },
  getInstanceInfo (instanceId) {
    return GET(lcmcontrollerApi + '/tenants/' + getUserId() + '/app_instances/' + instanceId)
  },
  instantiateApp (params) {
    return POST(lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/app_instances/' + getRandomAppInstanceId() +
      '/instantiate', params)
  },
  getInstanceList () {
    return GET(lcmcontrollerApi + '/tenants/' + getUserId() + '/app_instances')
  },
  getInstanceDetail (appInstanceId) {
    return GET(lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/app_instances/' + appInstanceId)
  },
  deleteInstanceApp (instanceId) {
    return POST(lcmcontrollerApiV2 + '/tenants/' + getUserId() + '/app_instances/' + instanceId + '/terminate')
  },
  batchDeleteInstanceApp (params) {
    return DELETE(lcmcontrollerApi + '/tenants/' + getUserId() + '/app_instances/batchTerminate', params)
  },
  getAbilityCallTimesInfo (nodeIp) {
    let lcmBasicUrl = 'https://' + nodeIp + ':' + serverPort + '/lcmcontroller/v1'
    return GET(lcmBasicUrl + '/mep/kong_log')
  },
  getServiceList (nodeIp) {
    let lcmBasicUrl = 'https://' + nodeIp + ':' + serverPort + '/lcmcontroller/v1'
    return GET(lcmBasicUrl + '/mep/services')
  },
  getSubscribeInfo (nodeIp) {
    let lcmBasicUrl = 'https://' + nodeIp + ':' + serverPort + '/lcmcontroller/v1'
    return GET(lcmBasicUrl + '/mep/subscribe_statistic')
  }
}

let appRuleMgr = {
  addConfigRules (type, id, params) {
    if (id) {
      if (type === 2) {
        return PUT(appRuleMgrApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
      } else {
        return POST(appRuleMgrApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
      }
    } else {
      if (type === 2) {
        return PUT(appRuleMgrApi + '/tenants/' + getUserId() + '/app_instances/390ef60a-e570-49f2-80f8-a8c1077c8eac/appd_configuration', params)
      } else {
        return POST(appRuleMgrApi + '/tenants/' + getUserId() + '/app_instances/390ef60a-e570-49f2-80f8-a8c1077c8eac/appd_configuration', params)
      }
    }
  },
  deleteConfigRules (id, params) {
    return DELETE(appRuleMgrApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
  },
  getConfigRules (id) {
    return GET(appRuleMgrApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration')
  }
}

export {
  GET,
  POST,
  PUT,
  DELETE,
  lcmController,
  appRuleMgr
}
