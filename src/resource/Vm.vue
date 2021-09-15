<template>
  <div class="vm">
    <BreadCrumb
      class="breadcrumb"
      :data="[{name: '虚机资源', path: 'mepm/resource/vm'}]"
    />
    <div class="vmBox">
      Container
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../components/BreadCrumb.vue'
export default {
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>
  .vmBox{
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
  }
</style>
