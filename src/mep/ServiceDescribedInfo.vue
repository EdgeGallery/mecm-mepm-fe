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
  <div class="description-root">
    <img
      src="../assets/images/close.png"
      class="close-img"
      @click="handleClose"
      alt="the image for close button."
    >
    <ser-card
      :name="name"
      :desc="desc"
      :id="id"
      :call-times="callTimes"
      class="description-content"
    />
  </div>
</template>

<script>
import SerCard from './SerCard.vue'

export default {
  components: { SerCard },
  props: {
    name: {
      type: String,
      default: 'name'
    },
    desc: {
      type: String,
      default: 'desc'
    },
    id: {
      type: String,
      default: 'id'
    },
    callTimes: {
      type: Array,
      default: function () { return [0, 0, 0, 0, 0, 0, 0] }
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleClose () {
      this.$emit('closeServiceDescribeInfo')
    }
  }
}
</script>
<style lang='less' scoped>
.description-root{
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 547px;
  display: flex;
  .close-img{
    position: absolute;
    width: 25px;
    height: 25px;
    right: 100px;
    top: 68px;
  }
  .close-img:hover {
    content: url('../assets/images/close_active.png');
  }
  .description-content{
    margin: auto;
    width: 922px;
    height: 364px;
    background: #FFFFFF;
    box-shadow: 0px 1px 21px 0px rgba(201, 181, 228, 0.4);
  }
}
</style>
