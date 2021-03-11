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
import constants from '../constant/constants.js'
import en from '../locales/en.js'
import cn from '../locales/cn.js'

function getNavData(lan) {
  return [{
  id: '1',
  path: constants.NAV_INDEX.DASHBOARD,
  name: lan === 'en'? en.NAV.DASHBOARD: cn.NAV.DASHBOARD,
  display: true
}, {
  id: '2',
  path: constants.NAV_INDEX.SERVICE,
  name: lan === 'en'? en.NAV.SERVICE: cn.NAV.SERVICE,
  display: true
}, {
  id: '3',
  path: constants.NAV_INDEX.CAPABILITIES,
  name: lan === 'en'? en.NAV.CAPABILITIES: cn.NAV.CAPABILITIES,
  display: true
}, {
  id: '4',
  path: constants.NAV_INDEX.TOPOLOGY,
  name: lan === 'en'? en.NAV.TOPOLOGY: cn.NAV.TOPOLOGY,
  display: true
}]
}

export default{
  getNavData
}