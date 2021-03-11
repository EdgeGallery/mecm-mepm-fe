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

import Vue from 'vue'
import Router from 'vue-router'
import Services from "@/pages/service/Index.vue";
import TopCharts from "@/pages/topo/Index.vue";
import constants from "@/constant/constants";
import Capabilities from "@/pages/capability/Index.vue";
import Dashboard from "@/pages/home/Index.vue";

Vue.use(Router)

const routes = [
    {path: '/', component: Dashboard},
    {path: constants.NAV_INDEX.DASHBOARD, component: Dashboard},
    {path: constants.NAV_INDEX.SERVICE, component: Services},
    {path: constants.NAV_INDEX.CAPABILITIES, component: Capabilities},
    {path: constants.NAV_INDEX.TOPOLOGY, component: TopCharts}
]

export default new Router({
    routes
})