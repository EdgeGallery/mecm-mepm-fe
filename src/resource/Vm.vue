<template>
  <div class="vm">
    <div class="title_top title_left defaultFontBlod clear">
      虚机资源
      <span class="line_bot1" />
    </div>
    <div class="vmBox">
      <el-row :gutter="10">
        <el-col :span="6">
          <div style="height:300px;">
            <el-steps
              direction="vertical"
              :active="active"
              simple
            >
              <el-step />
              <el-step />
              <el-step />
            </el-steps>
          </div>
        </el-col>
        <el-col :span="18">
          <div
            class="part_content"
            v-if="active==0"
          >
            <div class="work-title">
              基本信息
            </div>
            <div class="work_area">
              <el-form
                ref="form"
                :model="form"
                label-width="auto"
              >
                <el-form-item label="虚拟机名称">
                  <el-input />
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input />
                </el-form-item>
                <el-form-item label="密码">
                  <el-input />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div
            class="part_content"
            v-if="active==1"
          >
            <div class="work-title">
              虚机规格
            </div>
            <div class="work_area">
              <el-radio-group
                class="work-radio-button"
                v-model="archType"
              >
                <el-radio-button label="X86" />
                <el-radio-button label="ARM" />
              </el-radio-group>
              <div class="work-table">
                <div class="work-table-title">
                  虚机规格选择
                </div>
                <el-table
                  :data="vmRegulationDataList"
                >
                  <el-table-column width="35px">
                    <template slot-scope="scope">
                      <el-radio
                        :label="scope.row.regulationId"
                        v-model="selectedRegulationId"
                        class="work-radio"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="名称"
                    width="150px"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{ language==='cn'?scope.row.nameZh:scope.row.nameEn }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="适用场景"
                    width="100px"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{ language==='cn'?scope.row.sceneZh:scope.row.sceneEn }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="cpu"
                    label="CPU"
                    width="70px"
                    :formatter="appendCPUUnit"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="memory"
                    label="内存"
                    width="80px"
                    :formatter="appendSizeUnit"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="systemDisk"
                    label="硬盘"
                    width="105px"
                    :formatter="appendSizeUnit"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="dataDisk"
                    label="数据盘"
                    width="90px"
                    :formatter="appendSizeUnit"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="gpu"
                    label="GPU"
                    width="90px"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="otherAbility"
                    label="其他能力"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>
            </div>
            <div class="work_area">
              <div class="work-title">
                选择镜像
              </div>
              <div class="select-mirror-content">
                <div class="content-line">
                  <el-radio
                    v-model="imageType"
                    label="public"
                    class="work-radio image-type"
                  >
                    <div class="work-p">
                      公共镜像
                    </div>
                  </el-radio>
                  <el-select
                    class="work-select system-type"
                    v-model="selectedOSName"
                    :disabled="imageType === 'private'"
                  >
                    <el-option
                      v-for="item in osNameOptionList"
                      :label="item"
                      :value="item"
                      :key="item"
                    />
                  </el-select>
                  <el-select
                    class="work-select system-image"
                    v-model="selectedSystemId"
                    :disabled="imageType === 'private'"
                  >
                    <el-option
                      v-for="item in operateSystemOptionList"
                      :label="item.label"
                      :value="item.systemId"
                      :key="item.systemId"
                    />
                  </el-select>
                </div>
                <div class="content-line">
                  <el-radio
                    v-model="imageType"
                    label="private"
                    class="work-radio image-type"
                  >
                    <div class="work-p">
                      私有镜像
                    </div>
                  </el-radio>
                  <el-select
                    class="work-select system-type"
                    v-model="selectedOSName"
                    :disabled="imageType === 'public'"
                  >
                    <el-option
                      v-for="item in osNameOptionList"
                      :label="item"
                      :value="item"
                      :key="item"
                    />
                  </el-select>
                  <el-select
                    class="work-select system-image"
                    v-model="selectedSystemId"
                    :disabled="imageType === 'public'"
                  >
                    <el-option
                      v-for="item in operateSystemOptionList"
                      :label="item.label"
                      :value="item.systemId"
                      :key="item.systemId"
                    />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div
            class="part_content"
            v-if="active==2"
          >
            <div class="work-title">
              选择网络类型
            </div>
            <div class="work_area">
              <div class="select-network">
                <div class="work-table-title">
                  网络类型
                </div>
                <div class="work-table">
                  <el-table
                    :data="vmNetworkList"
                  >
                    <el-table-column width="35">
                      <template slot-scope="scope">
                        <el-checkbox
                          class="work-checkbox"
                          v-model="selectedNetwork"
                          :label="scope.row.networkType"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="networkType"
                      width="200px"
                      label="类型"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      label="描述"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        {{ scope.row.descriptionZh }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
          <div class="work_btn_group">
            <el-button
              class="work-button"
              @click="active==1?active=0:active=1"
              v-if="active > 0"
            >
              上一步
            </el-button>
            <el-button
              class="work-button"
              @click="active===0?active=1:active=2"
              v-if="active < 2"
            >
              下一步
            </el-button>
            <el-button
              class="work-button"
              @click="handleClickConfirmBtn"
              v-if="active >=2"
            >
              确认提交
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      form: {
      },
      active: 0,
      archType: 'X86',
      vmRegulationDataList: [],
      imageType: '',
      selectedOSName: '',
      osNameOptionList: [],
      operateSystemOptionList: [],
      selectedNetwork: '',
      vmNetworkList: []
    }
  },
  methods: {
    appendCPUUnit (row) {
      return row.cpu + 'vCPU'
    },
    appendSizeUnit (row, column, cellValue) {
      return cellValue + 'GB'
    }
  }
}
</script>

<style lang="less" scoped>
  .vm{
    margin: 0 13%;
    .vmBox{
      height: 100%;
      background: #fff;
      padding: 30px 60px;
      border-radius: 20px;
    }
  }
</style>
