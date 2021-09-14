<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div class="verify-area">
    <el-row>
      <el-col :span="15">
        <el-form
          @submit.native.prevent
        >
          <el-form-item
            prop="verificationCode"
          >
            <el-input
              id="vcode"
              v-model="verificationCode"
              type="text"
              maxlength="4"
              :placeholder="$t('login.capInImg')"
              clearable
            />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="9">
        <img
          id="verifycode_img"
          :src="src"
          alt=""
          @click="refreshImg()"
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Verify',
  data () {
    return {
      verificationCode: '',
      codeList: [
        {
          url: require('../assets/images/user/v1.png'),
          value: '4181'
        },
        {
          url: require('../assets/images/user/v2.png'),
          value: '9049'
        },
        {
          url: require('../assets/images/user/v3.png'),
          value: '8262'
        },
        {
          url: require('../assets/images/user/v4.png'),
          value: '5898'
        },
        {
          url: require('../assets/images/user/v5.png'),
          value: '0452'
        },
        {
          url: require('../assets/images/user/v6.png'),
          value: '1403'
        },
        {
          url: require('../assets/images/user/v7.png'),
          value: '5525'
        },
        {
          url: require('../assets/images/user/v8.png'),
          value: '8389'
        },
        {
          url: require('../assets/images/user/v9.png'),
          value: '7436'
        },
        {
          url: require('../assets/images/user/v10.png'),
          value: '8574'
        },
        {
          url: require('../assets/images/user/v10.png'),
          value: '8574'
        }
      ],
      src: 0,
      index: 0,
      ifVerify: false
    }
  },
  mounted () {
    this.refreshImg()
  },
  watch: {
    verificationCode: function (val) {
      if (val === this.codeList[this.index].value) {
        this.ifVerify = true
      } else {
        this.ifVerify = false
      }
      if (val.length === 4) {
        if (!this.ifVerify) {
          this.$message.error(this.$t('pwdmodify.wrongCode'))
          this.verificationCode = ''
          this.refreshImg()
        }
      }
      this.$emit('validateVerifyCodeSuccess', this.ifVerify)
    }
  },
  methods: {
    refreshImg () {
      let num = Math.floor(Math.random() * 10)
      if (num === this.src) {
        this.refreshImg()
      } else {
        this.index = num
        this.src = this.codeList[num].url
      }
    }
  }
}
</script>
<style lang="less">
.verify-area{
  #verifycode_img{
    width: 100%;
    padding-left: 15px;
    box-sizing: border-box;
    height: 40px;
    cursor: pointer;
  }

}
</style>
