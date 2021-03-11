/*
 * Copyright 2020 - 2021 Huawei Technologies Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const constants = {
    NODE_SIZE: {
        MEP: 100,
        APP: 50,
        SERVICE: 20
    },
    NODE_CATEGORY: {
        MEP: 0,
        APP: 1,
        ACTIVE_SERVICE: 2,
        INACTIVE_SERVICE: 3
    },
    NAV_INDEX: {
        DASHBOARD: '/dashboard',
        SERVICE: '/service',
        CAPABILITIES: '/capabilities',
        TOPOLOGY: '/topology'
    },
    EVENT_NAME: {
        NAV_SELECT_CHANGE: 'selectChange'
    },
    COLOR: {
        MEP: '#9364cf',
        APP: '#688ef3',
        ACTIVE_SERVICE: '#1fbdba',
        INACTIVE_SERVICE: '#6b7691',
    }
}

export default constants