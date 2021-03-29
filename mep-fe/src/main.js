/*
 * Copyright 2021 Huawei Technologies Co., Ltd.
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
import App from './App.vue'
import router from "@/router/router"
import ElementUI from 'element-ui'
import '../src/assets/css/common.css'
import Axios from 'axios'
import VueI18n from 'vue-i18n'
import en from "./locales/en.js"
import cn from "./locales/cn.js"
import 'eg-view/src/assets/style/element-variables.scss'
import 'eg-view/src/assets/style/normal.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VueI18n)
Vue.use(VueAwesomeSwiper)

const messages = {
  en: en,
  'zh-cn': cn
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh-cn', // set locale
  messages, // set locale messages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api' // <<<<<<<------此处将所有经过axios的请求加上了/api, 本地调试使用

// Vue.use(ElementUI, {locale})

Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    render: h => h(App),
}).$mount('#app')
