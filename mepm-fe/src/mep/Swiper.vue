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
  <swiper
    class="swiper"
    :options="swiperOption"
  >
    <swiper-slide
      v-for="(item, index) in data"
      :key="index"
    >
      <card
        :name="item.name"
        :desc="item.desc"
        :id="item.id"
        :call-times="item.callTimes"
      />
      <div class="chartName">
        {{ $t('CAPABILITIES_PAGE.CARD_DESC') }}
      </div>
    </swiper-slide>
    <div
      class="swiper-pagination"
      slot="pagination"
    />
    <div
      class="swiper-button-prev"
      slot="button-prev"
    />
    <div
      class="swiper-button-next"
      slot="button-next"
    />
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Card from './Card.vue'

export default {
  components: { Swiper, SwiperSlide, Card },
  data () {
    return {
      swiperOption: {
        observeSlideChildren: true,
        observer: true,
        slidesPerView: 2,
        spaceBetween: 45,
        slidesPerGroup: 2,
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
  }
}
</script>

<style lang="less" scoped>
.swiper-container{
  overflow: unset;
}
.swiper {
  // height: 421px;
  height: 308.5px;
  width: 100%;
  .swiper-slide {
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    background-color: white;
    .chartName {
      margin-top: 11px;
      height: 13px;
      font-size: 12px;
      font-family: FZLanTingHeiS-EL-GB;
      font-weight: 400;
      color: #999999;
      line-height: 22px;
    }
  }
  .swiper-button-prev {
    margin-left: -60px;
  }
  .swiper-button-next {
    margin-right: -60px;
  }
}
</style>
