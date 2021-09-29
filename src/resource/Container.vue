<template>
  <div class="container_content">
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('resource.containers') }}
      <span class="line_bot1" />
      <el-button
        class="newproject_btn linearGradient2"
        id="syncBtn"
        @click="confirmImg"
      >
        <em class="new_icon" />
        {{ $t('resource.confirmImg') }}
      </el-button>
    </div>
    <div class="containerBox">
      <div class="work_area">
        <el-table
          :data="containerList"
        >
          <el-table-column width="35px">
            <template slot-scope="scope">
              <el-radio
                :label="scope.row.id"
                v-model="imageId"
                class="work-radio"
              />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('resource.imgName')"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            prop="src"
            :label="$t('resource.imgPath')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="version"
            :label="$t('resource.version')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="size"
            :label="$t('resource.size')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="other"
            :label="$t('resource.others')"
            show-overflow-tooltip
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      containerList: [
        {
          id: '3215',
          name: 'anheng/anheng_waf',
          version: 'v1.5.6',
          src: 'lib/anheng/anheng_waf.tar',
          size: '2.41GB',
          other: 'NA',
          createTime: '2021-09-20 10:31'
        },
        {
          id: '3225',
          name: 'lanting/langting_VR',
          version: 'v1.2',
          src: 'lib/lanting/langting_VR.tar',
          size: '8.41GB',
          other: 'GPU、CPU',
          createTime: '2021-09-18 12:01'
        },
        {
          id: '3235',
          name: 'yunxun/yunxun_AI',
          version: 'v1.5',
          src: 'lib/yunxun/yunxun_AI.tar',
          size: '3.41GB',
          other: 'CPU',
          createTime: '2021-09-15 10:12'
        },
        {
          id: '3245',
          name: 'huawei/huawei_hetu',
          version: 'v0.2.6',
          src: 'lib/huawei/huawei_hetu.tar',
          size: '5.41GB',
          other: 'GPU、CPU',
          createTime: '2021-09-13 08:00'
        }
      ],
      imageId: '3215'
    }
  },
  methods: {
    checkDetail () {

    },
    handleSelectionChange (val) {

    },
    confirmImg () {
      let temp = sessionStorage.getItem('appIndex')
      temp = temp + ',success'
      sessionStorage.setItem('appIndex', temp)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
  .container_content{
    margin: 0 13%;
    .containerBox{
      height: 100%;
      background: #fff;
      padding: 30px 60px;
      border-radius: 20px;
    }
    .newproject_btn{
      position: absolute;
      right: 0;
      bottom: 30px;
      height: 50px;
      color: #fff;
      font-size: 20px !important;
      border-radius: 25px;
      padding: 0 35px;
      .new_icon{
        display: inline-block;
        width: 19px;
        height: 19px;
        background: url('../assets/images/new_icon.png');
        margin-right: 3px;
        position: relative;
        top: 2px;
      }
    }
  }
</style>
