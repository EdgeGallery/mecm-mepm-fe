/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  nav: {
    login: '登录',
    logout: '注销',
    mecm: '管理平台',
    overview: '概览',
    appMana: '应用管理',
    packageMana: '应用包管理',
    packageDist: '应用包分发',
    appInstance: '应用实例管理',
    edgeNodes: '边缘节点管理',
    nodeList: '边缘节点列表',
    mepList: 'MEP列表',
    system: '系统',
    externalSysMan: '外部系统管理',
    edgeNode: '边缘节点注册系统',
    appRule: 'App Rule MGR 注册系统',
    appDetail: '应用详情',
    logoutTip: '确认要离开吗？',
    ruleConfiguration: '规则配置',
    nodeDetails: '节点详情'
  },
  overview: {
    location: '地址',
    address: '地址：',
    regionEdge: '边缘节点',
    k8sResc: 'K8S资源',
    cpu: 'CPU',
    mem: 'MEM', // memory
    disk: 'DISK',
    mepCapa: 'MEP硬件能力',
    mepInfo: 'MEP能力信息',
    softwareCapa: '软件能力',
    capa: '能力',
    vendor: '提供商',
    model: '品牌',
    type: '硬件能力',
    desc: '描述',
    app: '应用',
    manage: '管理',
    maintenance: '运维',
    serviceName: '服务名称',
    services: '服务',
    containers: '容器',
    containerUsage: '容器占用率',
    name: '名称：',
    register: '注册',
    alarms: '告警',
    statistics: '统计表',
    nodeIp: '节点IP：',
    nodeName: '节点名称：',
    nodeAddress: '节点地址：',
    nodeInfo: '节点信息',
    overview: '节点统计信息',
    edgeNodes: '节点总数',
    onlineNodes: '在线节点数',
    offlineNodes: '离线节点数',
    returnOverview: '返回主视图',
    nodeDetails: '查看节点详情>>',
    appsInfo: '查看应用信息>>',
    package: '应用程序包',
    nodeInfoAreaTitle: '节点信息',
    availablePackage: '可用的应用程序包',
    distributedPackage: '已分发的应用程序包',
    deployedPackage: '已部署的应用程序包',
    info: '提示：当前环境没有可管理的节点！',
    commonNodesInfo: '常用节点信息展示',
    moreNodes: '查看更多'
  },
  footer: {
    about: '关于',
    website: '官网',
    videoResource: '视频资源',
    trainingMaterials: '培训材料',
    communication: '沟通交流',
    softwareDownload: '软件下载',
    community: '社区介绍',
    project: '项目',
    membership: '会员',
    contactUs: '联系我们',
    followUs: '关注我们',
    WeChatPublic: '微信公众号',
    codeWarehouse: '代码仓库',
    followWeibo: '关注微博',
    mailingList: '邮件列表',
    copyright: '版权所有 © EdgeGallery 2019 - 2021 保留一切权利 请参见法律声明',
    legalNotice: '法律声明',
    privacyPolicy: '政策隐私',
    containerResource: '资源',
    developer: '开发者',
    docs: '文档'
  },
  app: {
    packageList: {
      name: '名称',
      size: '大小',
      version: '版本',
      vendor: '厂商',
      type: '类型',
      affinity: '架构',
      modifyTime: '修改时间',
      desc: '描述',
      distribute: '分发',
      synchronize: '从应用市场同步',
      slectEdgeNodes: '选择边缘节点',
      selected: '已选择',
      ip: 'IP地址',
      city: '城市',
      address: '地址',
      createTime: '创建时间',
      download: '下载',
      fileNotSupport: '不支持的文件格式',
      auth: '作者',
      pacVersion: '应用版本',
      status: '状态',
      sync: '同步',
      syncTip: '请至少选择一个应用进行同步！',
      newPackage: '新的应用程序包',
      package: '包裹',
      uploadPackage: '上传套餐'
    },
    distriList: {
      mecHost: 'MEC 主机',
      hostIp: '主机IP地址',
      status: '状态',
      deploy: '部署',
      appName: '应用名称',
      appDesc: '应用描述',
      podName: 'Pod名称',
      podKind: 'Pod类型',
      podNameEspace: 'Pod命名空间',
      podSel: 'Pod选择器',
      deploymentConf: '部署配置',
      multipleDeploy: '批量部署',
      deleteError: '请先删除分发状态为“Error”的应用'
    },
    instanceList: {
      operationStatus: '运行状态',
      terminate: '中断',
      instanceDetail: '应用实例详情',
      beforeDelete: '确定从host删除此应用吗？',
      addRule: '添加规则',
      batchDeleteDnsRules: '批量删除DNS规则',
      batchDeleteTrafficRules: '批量删除分流规则',
      addDnsRules: '增加DNS规则',
      addTrafficRules: '增加分流规则',
      addFilter: '新增流过滤规则',
      batchDelete: '批量删除应用'
    },
    ruleConfig: {
      srcAddress: '源IP地址',
      srcPort: '源端口号',
      dstAddress: '目的IP地址',
      dstPort: '目的端口号',
      trafficRuleId: '流规则标识',
      filterType: '过滤类型',
      priority: '优先级',
      protocol: '协议类型',
      action: '规则动作',
      dnsRuleId: 'DNS规则标识',
      ipAddress: 'IP地址',
      ipAddressType: 'IP地址类型',
      domainName: 'FQDN域名',
      ttl: '有效时长',
      checkRules: '查看详情',
      dnsRule: 'DNS规则',
      trafficRule: '分流规则',
      trafficFilter: '流过滤规则',
      appRuleManReg: 'App Rule MGR 注册',
      appRuleManEdit: 'App Rule MGR 编辑',
      appRuleMgrMust: 'App Rule MGR为必填项',
      srcTunnelPort: '隧道源端口',
      srcTunnelAddress: '隧道源地址',
      dstTunnelPort: '隧道目的端口',
      dstTunnelAddress: '隧道目的地址',
      tag: '标签',
      mutiplePort: '多个端口请用","分割',
      mutipleIp: '多个IP请用","分割',
      srcMacAddress: '源MAC地址',
      dstMacAddress: '目的MAC地址',
      tunnelSpecificData: '隧道指定参数',
      tunnelType: '隧道类型',
      interfaceType: '接口类型',
      addNewInterfaceInfo: '新增接口信息',
      interfaceDescriptor: '转发接口信息',
      ipInfo: 'IP信息',
      macInfo: 'MAC信息',
      tunnelInfo: '隧道信息',
      interfaceInfo: '接口信息',
      mutipleProtocol: '多个协议请用","分割',
      mutipleTag: '多个标签请用","分割',
      mepError: '调用MEP接口错误，请检查后重试。',
      addRuleSuc: '添加规则成功',
      editRuleSuc: '编辑规则成功',
      delRuleSuc: '删除规则成功'
    }
  },
  edgeNode: {
    ip: 'IP地址',
    city: '城市',
    address: '地址',
    affinity: '架构',
    edgeNexusIp: 'Edge Repo IP地址',
    edgeNexusPort: 'Edge Repo端口',
    applcmIp: 'App LCM IP',
    k8sUrl: 'K8S URL',
    monitor: '监控',
    detail: '节点详情',
    appDetails: '应用详情'
  },
  system: {
    edgeNodes: {
      systemPlatform: '系统',
      ip: 'IP地址',
      city: '城市',
      affinity: '架构',
      address: '地址',
      edgeNexusIp: '边缘仓库地址',
      edgeNexusPort: '边缘仓库端口',
      applcmIp: 'App LCM地址',
      k8sUrl: 'K8S URL',
      newReg: '新增注册',
      hostName: '主机名称',
      ipAddress: 'IP地址',
      location: '部署位置',
      zipcode: '邮政编码',
      username: '用户名',
      repoUsername: '边缘仓库用户名',
      password: '密码',
      kubernetesUrl: 'K8S Url',
      edgeNexusName: '边缘仓库名称',
      edgeNexusPass: '边缘仓库密码',
      upload: '* 上传',
      uploadTip: '仅支持不超过500KB的配置文件。',
      nodeReg: 'Edge Node注册',
      nodeModify: 'Edge Node编辑',
      uploadFile: '上传配置文件',
      howToUpload: '拖拽文件到上传区域内，或者点击上传',
      hwCapability: '硬件能力',
      coordinates: '坐标',
      chooseLocation: '选择部署位置',
      vim: '虚拟机',
      newEdge: '新增边缘节点'
    }
  },
  common: {
    reset: '重置',
    search: '搜索',
    operation: '操作',
    cancel: '取消',
    submit: '提交',
    confirm: '确认',
    delete: '删除',
    detail: '详情',
    modify: '编辑',
    warning: '提示',
    copy: '复制'
  },
  verify: {
    ipTip: 'IP地址不能为空。',
    hostnameTip: '主机名称不能为空。',
    zipcodeTip: '邮政编码不能为空。',
    cityTip: '城市名称不能为空。',
    addressTip: '地址不能为空。',
    usernameTip: '用户名不能为空。',
    passwordTip: '密码不能为空。',
    edgeNexusIpTip: 'Edge Repo IP不能为空。',
    edgeNexusPortTip: 'Edge Repo port不能为空。',
    edgeNexusUsernameTip: 'Edge Repo user name不能为空。',
    edgeNexusPasswordTip: 'Edge Repo password不能为空。',
    appLcmIpTip: 'App LCM IP不能为空。',
    k8sURLTip: 'K8S URL不能为空。',
    portTip: '端口不能为空。',
    managedMecHostTip: '管理的MEC Host不能为空。',
    appstorenameTip: '应用市场名称不能为空。',
    vendorTip: '生产商不能为空。',
    uriTip: 'URI不能为空。',
    affinityTip: '架构不能为空。',
    areaTip: '请选择地域',
    applcmNameTip: 'App LCM名称不能为空',
    normalVerify: '输入的内容格式不正确',
    hostNameVerify: '4到16位（字母，数字）',
    edgeNodeNameVerify: '4至16个字符（字母，数字），不能包含特殊符号',
    noSymbol: '不能包含特殊符号',
    coordinates: '坐标不能为空',
    uriVerify: '请填写正确的Uri',
    descVerify: '描述信息不能为空',
    appNameVerify: '应用名称不能为空',
    mustOptions: '必填项',
    appRuleManaVerify: '应用规则管理IP为必选项'
  },
  tip: {
    getCommonListFailed: '获取列表失败',
    deletePacFrmoHost: '你已经成功从host节点删除应用！',
    networkError: '错误，请检查你的网络！',
    failedReg: '注册用户失败, ',
    wrongCaptcha: '不正确的验证码，请重新输入！',
    failedAuth: '认证失败，请检查你用户名和密码！',
    deploySuc: '部署成功！',
    deleteSuc: '删除成功！',
    sucToDownload: '成功从App Store下载应用！',
    registerServSuc: '你已经成功注册该服务！',
    unregisterServSuc: '你已经取消该服务注册！',
    regAppLcmSuc: '你已成功注册App LCM！',
    modAppLcmSuc: '你已成功编辑App LCM！',
    regAppStoreSuc: '你已成功注册App Store！',
    modAppStoreSuc: '你已成功编辑App Store',
    deleteAppStoreSuc: '你已经成功删除App Store！',
    sucToDeleteNodes: '你已成功删除node节点！',
    uploadSuc: '你已成功上传配置文件！',
    sucToRegNode: '你已成功注册Node节点！',
    sucToModNode: '你已成功编辑Node节点！',
    regUserSuc: '你已成功注册该用户！',
    fileFormatError: '文件格式不支持或者内容为空！',
    sessionOut: '你的登录信息过期，请重新登录！',
    sessionExp: 'Session过期',
    version: '请选择要下发的应用包版本！',
    noPackage: '没有可以管理的应用！',
    warning: '警告',
    browserAdvise: '为了部分功能正常使用，我们建议使用Chrom浏览器！',
    confirm: '确认',
    mecHost: '请选择要下发的host节点！',
    failedToDistribute: '无法分发包裹!',
    failedToGetList: '获取节点列表失败！',
    deployFailed: '部署失败，请检查！',
    getListFailed: '获取分发列表失败！',
    getNodeListFailed: '获取节点列表失败！',
    getPackageInfoFailed: '获取应用应用包信息失败！',
    getAppInfoFailed: '获取应用信息失败！',
    getCapaFailed: '获取能力列表失败！',
    getKpiFailed: '获取KPI信息失败！',
    getServiceFailed: '获取应用服务信息失败！',
    failedToGetCaptcha: '获取手机验证码失败',
    nameAlSinged: '用户名已被注册，请重新输入或前往登录',
    telAlSigned: '电话号码已被注册，请重新输入或前往登录',
    modifyPwd: '重置密码成功，请登录',
    failedModifyPwd: '重置密码失败',
    faileToGetInstanceList: '获取应用实例列表失败',
    faileToDeleteNode: '删除node失败!',
    faileToUpload: '上传config文件失败',
    failToRegNode: '注册新的node节点失败',
    failToModifyNode: '修改节点失败',
    typeApp: '请先输入节点IP地址!',
    uploadConf: '请上传config文件',
    typeCity: '请选择部署位置',
    confirmToDeleteNode: '确认要删除该节点吗？',
    deleteAppBeforeDeleteNode: '你需要先删除安装在该节点上的应用',
    beforeDeleteApplcm: '确认要删除App LCM？',
    beforeDeleteAppstore: '确认要删除App Store？',
    beforeDeleteFromMechost: '确认要从该节点删除应用应用包？',
    getStatusDelay: '查询详情存在延迟，请等待部署完成30-40S后查询！',
    pleaseSelect: '请选择',
    successToAddRules: '你已经成功创建一条规则。',
    regAppManSuc: '你已成功注册App Rule MGR',
    modAppRuleSuc: '你已成功编辑App Rule MGR',
    ifContinue: '此操作将永久删除该分流规则, 是否继续?',
    oneAtLeast: '请至少选择一条规则',
    loginStatusFailed: '登录状态已失效，请刷新界面并重新登录。',
    loginOperation: '您当前没有登录，请登录后操作。',
    operationInfo: '操作信息',
    ttl: '请输入正确的ttl',
    macMust: '请填写正确的MAC地址',
    idMust: '请填写正确的规则标识',
    domainMust: '请填写正确的域名',
    beforeDeleteAppMgr: '确认要删除本条数据吗？'
  },
  area: {
    beijing: '北京市',
    haidian: '海淀区',
    caict: '中国信通院',
    huaweiBeijing: '华为北京研究所',
    shanxi: '陕西省',
    xian: '西安市',
    huaweiXian: '华为西安研究所',
    xidian: '西安电子科技大学',
    jiangsu: '江苏省',
    nanjing: '南京市',
    zijinshan: '紫金山实验室',
    shanghai: '上海市',
    pudong: '浦东新区',
    huaweiShanghai: '华为上海研究所',
    guangdong: '广东省',
    shenzhen: '深圳市',
    huaweiBantian: '华为坂田基地',
    tiananyungu: '华为天安云谷',
    clab: 'Clab实验室',
    SUSTech: '南方科技大学',
    shandong: '山东省',
    qingdao: '青岛市',
    haier: '海尔青岛工厂'
  },
  dashboard: {
    nodeDetails: '节点详细信息',
    appDetails: '申请详情',
    appList: '应用实例管理',
    nodeList: '边缘节点',
    appName: '名称',
    appId: '应用程式识别码',
    deploymentStatus: '状态',
    applicationStatistics: '统计',
    available: '可用的应用程序包',
    distributed: '分布式应用',
    deployed: '部署的应用程序'
  },
  CAPABILITIES_PAGE: {
    PAGE_DESC: '边缘节点所具备的能力及最近7天被调用的次数',
    CAPABILITY_SERVICE_REGISTRATION: '服务注册',
    CAPABILITY_SERVICE_DISCOVERY: '服务发现',
    CAPABILITY_DNS: 'DNS能力',
    CAPABILITY_LOCATION: '定位能力',
    CAPABILITY_FACE_RECOGNITION: '人脸识别能力',
    CAPABILITY_SERVICE_REGISTRATION_DESC: '提供APP注册服务到MEP的能力',
    CAPABILITY_SERVICE_DISCOVERY_DESC: '为APP提供发现MEP上已注册的服务',
    CAPABILITY_DNS_DESC: '为APP提供域名解析能力',
    CAPABILITY_LOCATION_DESC: '为APP提供定位服务',
    CAPABILITY_FACE_RECOGNITION_DESC: '上传照片进行人脸识别，返回待识别人脸所在的位置',
    CARD_DESC: '最近7天使用次数',
    MEP_SELF_CAPABILITY: 'MEP自身能力',
    APP_CAPABILITY: 'APP能力'
  },
  SERVICE_PAGE: {
    PAGE_DESC: '边缘节点服务的详细信息',
    TABLE_HEADER_SERVICE_NAME: '服务名称',
    TABLE_HEADER_SERVICE_STATUS: '服务状态',
    TABLE_HEADER_APP_NAME: '所属应用',
    TABLE_HEADER_SERVICE_VERSION: '服务版本',
    TABLE_HEADER_SERVICE_ID: '服务ID',
    NO_DATA_NOTICE: '暂无数据',
    TABLE_HEADER_APP_VERSION: '应用版本',
    TABLE_HEADER_OPERATION: '操作',
    APP_STATICS_APP: '应用数量：',
    APP_STATICS_SERVICE: '服务数量：',
    SERVICE_STATICS_SUBSCRIBED: '被订阅的服务：',
    APP_STATICS_SUBSCRIBE: '订阅方应用：',
    NUM: '个',
    ABILITY_MEP_SELF: 'MEP自身能力',
    SERVICES_DETAIL: '边缘节点服务详细信息',
    OPERATION_VIEW: '查看',
    BACK_BUTTON_NAME: '返回',
    DATA: '日期：',
    TIMES: '次数：'
  },
  TOPOLOGY_PAGE: {
    PAGE_DESC: '边缘节点应用和服务的拓扑图',
    NODE_TYPE: '节点类型',
    SERVICE: '服务',
    SERVICE_STATUS: '服务状态',
    SERVICE_STATUS_INACTIVE: '未激活',
    SERVICE_STATUS_ACTINVE: '激活',
    TIPS_KEY_SERVICE_NAME: '服务名称：',
    TIPS_KEY_SERVICE_VERSION: '服务版本：',
    TIPS_KEY_SERVICE_STATE: '服务状态：',
    TIPS_KEY_APP_NAME: '应用名称：',
    TIPS_KEY_NAME: '名称：',
    TIPS_KEY_SOURCE: '源端：',
    TIPS_KEY_TARGET: '宿端：',
    TIPS_KEY_SUBORDINATION: '从属关系',
    TIPS_KEY_SUBSCRIBE: '订阅关系',
    DASHBORD_TAB: '边缘节点的应用和服务概况信息',
    TOPOLOGY_TAB: '拓扑图展示'
  },
  ...zhLocale
}

export default cn
