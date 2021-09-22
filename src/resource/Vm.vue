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
                <el-form-item
                  label="虚拟机名称"
                >
                  <el-input
                    v-model="vmName"
                  />
                </el-form-item>
                <el-form-item
                  label="用户名"
                >
                  <el-input
                    v-model="vmUserName"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item
                  label="密码"
                >
                  <el-input
                    :disabled="true"
                    v-model="vmPassword"
                  />
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
                      {{ scope.row.nameZh }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="适用场景"
                    width="100px"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{ scope.row.sceneZh }}
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
                    prop="createTime"
                    label="上传时间"
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
                    v-model="selectedOSNamePr"
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
                    v-model="selectedSystemIdPr"
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
      vmRegulationDataList: [
        {
          'regulationId': 1,
          'architecture': 'X86',
          'nameZh': '通用计算型-2',
          'nameEn': 'General Computing-1',
          'sceneZh': '普通APP',
          'sceneEn': 'Ordinary APP',
          'memory': 1,
          'cpu': 1,
          'systemDisk': 50,
          'dataDisk': 40,
          'gpu': '',
          'otherAbility': ''
        },
        {
          'regulationId': 2,
          'architecture': 'X86',
          'nameZh': '通用计算型-2',
          'nameEn': 'General Computing-2',
          'sceneZh': '普通APP',
          'sceneEn': 'Ordinary APP',
          'memory': 8,
          'cpu': 4,
          'systemDisk': 50,
          'dataDisk': 100,
          'gpu': '',
          'otherAbility': ''
        },
        {
          'regulationId': 3,
          'architecture': 'X86',
          'nameZh': '通用计算型-4',
          'nameEn': 'General Computing-4',
          'sceneZh': '普通APP',
          'sceneEn': 'Ordinary APP',
          'memory': 16,
          'cpu': 4,
          'systemDisk': 50,
          'dataDisk': 100,
          'gpu': '',
          'otherAbility': ''
        },
        {
          'regulationId': 4,
          'architecture': 'X86',
          'nameZh': '通用计算增强型-2',
          'nameEn': 'General Computing Enhancement-2',
          'sceneZh': '普通APP',
          'sceneEn': 'Ordinary APP',
          'memory': 16,
          'cpu': 8,
          'systemDisk': 50,
          'dataDisk': 200,
          'gpu': '',
          'otherAbility': ''
        },
        {
          'regulationId': 5,
          'architecture': 'X86',
          'nameZh': '通用计算增强型-4',
          'nameEn': 'General Computing Enhancement-4',
          'sceneZh': '普通APP',
          'sceneEn': 'Ordinary APP',
          'memory': 32,
          'cpu': 8,
          'systemDisk': 50,
          'dataDisk': 200,
          'gpu': '',
          'otherAbility': ''
        },
        {
          'regulationId': 6,
          'architecture': 'X86',
          'nameZh': '高I/O型-2',
          'nameEn': 'High I/O-2',
          'sceneZh': '高I/O型APP',
          'sceneEn': 'High I/O-APP',
          'memory': 32,
          'cpu': 4,
          'systemDisk': 50,
          'dataDisk': 100,
          'gpu': '',
          'otherAbility': ''
        },
        {
          'regulationId': 7,
          'architecture': 'X86',
          'nameZh': '高I/O型-4',
          'nameEn': 'High I/O-4',
          'sceneZh': '高I/O型APP',
          'sceneEn': 'High I/O-APP',
          'memory': 64,
          'cpu': 8,
          'systemDisk': 50,
          'dataDisk': 100,
          'gpu': '',
          'otherAbility': ''
        },
        {
          'regulationId': 8,
          'architecture': 'X86',
          'nameZh': '大存储型',
          'nameEn': 'Large Storage',
          'sceneZh': 'IoT数据采集',
          'sceneEn': 'IoT Data Collection',
          'memory': 8,
          'cpu': 4,
          'systemDisk': 50,
          'dataDisk': 1000,
          'gpu': '',
          'otherAbility': ''
        },
        {
          'regulationId': 9,
          'architecture': 'X86',
          'nameZh': 'AI推理型-2',
          'nameEn': 'AI',
          'sceneZh': '工业视觉、园区监控',
          'sceneEn': 'Industrial Vision, Park Monitoring',
          'memory': 8,
          'cpu': 4,
          'systemDisk': 50,
          'dataDisk': 200,
          'gpu': '',
          'otherAbility': '1*Atlas300C(16G)'
        }
      ],
      selectedSystemId: '',
      selectedRegulationId: '',
      imageType: 'public',
      selectedOSName: '',
      osNameOptionList: ['ubuntu'],
      operateSystemOptionList: [
        {
          'systemId': 1,
          'type': 'public',
          'label': 'ubuntu[ubuntu 1804 64(40GB)]'
        },
        {
          'systemId': 2,
          'type': 'public',
          'label': 'ubuntu[ubuntu 1608 64(40GB)]'
        }
      ],
      selectedNetwork: [],
      vmNetworkList: [
        {
          'networkType': 'Network_N6',
          'descriptionZh': 'N6网络，端侧设备在访问边缘应用时，需要通过该网络进行访问',
          'descriptionEn': 'N6 network, when end-side devices access edge applications, they need to access through this network',
          'networkName': 'mec_network_n6'
        },
        {
          'networkType': 'Network_MEP',
          'descriptionZh': '与边缘计算平台之间的网络，当应用存在服务依赖或需要发布服务时，需要该网络',
          'descriptionEn': 'The network with the edge computing platform, when the application has service dependency or needs to publish the service, the network is needed',
          'networkName': 'mec_network_mep'
        },
        {
          'networkType': 'Network_Internet',
          'descriptionZh': 'Internet网络',
          'descriptionEn': 'Internet Network',
          'networkName': 'mec_network_internet'
        }
      ],
      vmUserName: 'root',
      vmPassword: 'root',
      vmName: '',
      selectedOSNamePr: '',
      selectedSystemIdPr: ''
    }
  },
  methods: {
    appendCPUUnit (row) {
      return row.cpu + 'vCPU'
    },
    appendSizeUnit (row, column, cellValue) {
      return cellValue + 'GB'
    },
    handleClickConfirmBtn () {
      let temp = sessionStorage.getItem('appIndex')
      temp = temp + ',success'
      sessionStorage.setItem('appIndex', temp)
      this.$router.push('/')
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
