<template>
  <div class="description-root">
    <img
      src="../assets/images/close.png"
      class="close-img"
      @click="handleClose"
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
  },
  created () {
  },
  mounted () {
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
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
  .description-content{
    margin: auto;
    width: 922px;
    height: 364px;
    background: #FFFFFF;
    box-shadow: 0px 1px 21px 0px rgba(201, 181, 228, 0.4);
  }
}
</style>
