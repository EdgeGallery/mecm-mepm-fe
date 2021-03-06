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

import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/Layout.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'overview',
      component: () => import('../overview/Dashboard.vue')
    }, {
      path: '/index',
      redirect: '/',
      component: () => import('../overview/Dashboard.vue')
    },
    {
      path: '/edge-details',
      name: 'edge-details',
      component: () => import('../overview/Overview.vue')
    },
    {
      path: '',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: 'mecm/apac/list',
          name: 'apaclist',
          component: () => import('../app/PackageList.vue')
        },
        {
          path: 'mecm/ruleconfig',
          name: 'rule',
          component: () => import('../app/RuleConfig.vue')
        },
        {
          path: 'mecm/edge/list',
          name: 'edgelist',
          component: () => import('../app/EdgeList.vue')
        },
        {
          path: 'mecm/apac/detail',
          name: 'apacdetail',
          component: () => import('../app/PackageDetail.vue')
        },
        {
          path: 'mecm/ains/list',
          name: 'ainslist',
          component: () => import('../app/InstanceList.vue')
        },
        {
          path: 'mecm/node/list',
          name: 'hostOverview',
          component: () => import('../host/List.vue')
        },
        {
          path: 'mecm/about',
          name: 'about',
          component: () => import('../app/About.vue')
        }
      ]
    }
  ]
})
