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
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item, index) in data" :key="index">
      <card :name="item.name" :desc="item.desc" :id="item.id" :call-times="item.callTimes"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import Card from './Card.vue'

  export default {
    components: {Swiper, SwiperSlide, Card},
    data() {
      return {
        swiperOption: {
          observeSlideChildren: true,
          observer: true,
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
          loop: false,
          loopFillGroupWithBlank: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        option: null
      }
    },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
.swiper {
  height: 421px;
  width: 100%;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    background-color: white;
  }
}
</style>