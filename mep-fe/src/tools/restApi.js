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

import axios from "axios";

function getServiceList() {
    return new Promise((resolve, reject) => {
        axios.get('/mep/mec_service_mgmt/v1/services')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log(err.response)
                reject(err)
            })
    })
}

function getCapabilityList() {
    return new Promise((resolve, reject) => {
        axios.get('/mep/service_govern/v1/kong_log')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log(err.response)
                reject(err)
            })
    })
}

function getSubscribeStatistic() {
    return new Promise((resolve, reject) => {
        axios.get('/mep/service_govern/v1/subscribe_statistic')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log(err.response)
                reject(err)
            })
    })
}

export {
    getServiceList,
    getCapabilityList,
    getSubscribeStatistic
}

