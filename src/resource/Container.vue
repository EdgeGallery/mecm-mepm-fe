<template>
  <div class="container">
    <BreadCrumb
      class="breadcrumb"
      :data="[{name: '容器资源', path: 'mepm/resource/container'}]"
    />
    <div class="containerBox">
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
  .containerBox{
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
  }
</style>
