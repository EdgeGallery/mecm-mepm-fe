/*
 *  Copyright 2020 Huawei Technologies Co ., Ltd .
 *
 *  Licensed under the Apache License, Version 2 .0 (the "License");
 *  you may not use this file except in compliance with the License .
 *  You may obtain a copy of the License at
 *
 *      http://www .apache .org/licenses/LICENSE-2 .0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied .
 *  See the License for the specific language governing permissions and
 *  limitations under the License .
 */

import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
  login: {
    userName: 'Username',
    password: 'Password',
    login: 'Log In',
    logout: 'Logout',
    register: 'Register',
    legalRegister: 'Agree to the agreement and register',
    iAgree: 'I have read and agree to the',
    userAgreement: '《EdgeGallery Customer Agreement》',
    and: 'and',
    privacyStatement: '《Privacy Statement》',
    legalProvisions: 'Legal Clauses',
    siteAgreement: 'Website Agreement',
    contact: 'Contact Number',
    company: 'Company',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    namePla: 'Username',
    pwdPla: 'Password',
    pwdConfPla: 'Confirm Password',
    compPla: 'Company',
    mailAddr: 'Email Address',
    telPla: 'Mobile Phone Number',
    registerHint: 'Tip: it is recommended to fill in at least one piece of real information for email address and mobile phone number, so as to retrieve the password after forgetting it.',
    getCap: 'Get captcha',
    capInImg: 'Image Captcha Code',
    capPla: '6-Digit Captcha Code',
    sendCaptchaTo: 'Send captcha to:',
    newPwd: 'New password',
    confirmNewPwd: 'Confirm your new password',
    forgotPwd: 'Forgot password？',
    loginWithUser: 'Account Login',
    welcome: 'EdgeGallery Account Registration',
    freeSign: 'Free Registration',
    getPwd: 'Modify Password',
    getPwdByMail: 'By Mail',
    getPwdBySms: 'By Mobile Phone',
    verify: 'Drag slider to verify',
    finishVerify: 'Verifiy succeeded',
    changeOne: 'Chang one',
    loginFail: 'Failed to log in, please check your account and password, enter the wrong password more than five consecutive times, the account will be locked',
    usernameRule: 'Any of two combinations of 6-30 characters, numbers, and underscores. The first digit must be a letter',
    passwordRule: 'The password must be composed of 6-18 characters, numbers and special symbols',
    phoneNumberRule: 'The mobile phone number is not in accordance with the rules',
    mailAddressRule: 'The email address is not in accordance with the rules',
    userLock: 'You have entered the wrong password five times in a row, the account has been locked, please try again in 5 minutes',
    hasLogin: ' has logged in.'
  },
  pwdmodify: {
    oldPw: 'Old Password',
    newPw: 'New Password',
    confirmNewPw: 'Confirm Password',
    passNotChanged: 'New password is same as old password',
    modifyPwdSucceed: 'Successfully modify your password!',
    modifyPwdFailed: 'Failed to modify your password, please try again later.',
    firstLoginTip: 'Modify Password (First time login)',
    expiredTip: 'Modify Password (Password has expired)',
    cancelOnFirstLoginTip: 'After the first login, you must change the default password. If you cancel, you will exit the current account. Continue?',
    cancelOnPwExpiredTip: 'Your password has expired. You must set a new password. If you cancel, you will exit the current account. Continue?',
    next: 'Next',
    submit: 'Submit',
    cancel: 'Cancel',
    return: 'Return',
    formDataVerify: 'Please type right data to modify!'
  },
  nav: {
    login: 'Log In',
    logout: 'Logout',
    mecm: 'Manager',
    overview: 'Overview',
    appMana: 'App Management',
    packageMana: 'Package List',
    packageDist: 'Package Distribution',
    appInstance: 'App Instance List',
    edgeNodes: 'EdgeNodes Management',
    nodeList: 'Edege Node List',
    mepList: 'MEP List',
    system: 'System',
    externalSysMan: 'External System Manager',
    edgeNode: 'Edge Node',
    appDetail: 'App Detail',
    appRule: 'App Rules',
    fileNotSupport: 'File not support to read.',
    logoutTip: 'Are you sure to log out?',
    ruleConfiguration: 'Rule Configuration',
    nodeDetails: 'Node Details'
  },
  overview: {
    location: 'Address',
    address: 'Address : ',
    regionEdge: 'Edge Nodes',
    k8sResc: 'K8S Resource',
    cpu: 'CPU',
    mem: 'MEM', // memory
    disk: 'DISK',
    mepCapa: 'HW Capabilities : ',
    mepInfo: 'MEP Information',
    softwareCapa: 'SW Capabilities',
    capa: 'Capabilities',
    vendor: 'Vendor',
    model: 'Model',
    type: 'HW Capabilities',
    desc: 'Description',
    app: 'App',
    manage: 'Manage',
    maintenance: 'Operation',
    serviceName: 'Service Name',
    services: 'Services',
    containers: 'Containers',
    containerUsage: 'Container Usage',
    name: 'Name : ',
    register: 'Register',
    alarms: 'Alarms',
    nodeinfo: 'Node Info',
    statistics: 'Statistics',
    nodeIp: 'IP : ',
    nodeName: 'Node Name: ',
    nodeAddress: 'Node Address: ',
    nodeInfo: 'Node Information',
    overview: 'Node Statistics',
    edgeNodes: 'Total Edge Nodes',
    onlineNodes: 'Number of Online Nodes',
    offlineNodes: 'Number of Offline Nodes',
    returnOverview: 'Back to main view',
    nodeDetails: 'Node Details>>',
    appsInfo: 'App Information>>',
    package: 'Application Packages',
    nodeInfoAreaTitle: 'Node Information',
    availablePackage: 'Avaliable Application Packages',
    distributedPackage: 'Distributed Application Packages',
    deployedPackage: 'Deployed Application Packages',
    info: 'hints： No manageable nodes. ',
    commonNodesInfo: 'Common Nodes Info',
    moreNodes: 'more'
  },
  footer: {
    about: 'About',
    website: 'Official website',
    videoResource: 'Video',
    trainingMaterials: 'Training material',
    communication: 'Communication',
    softwareDownload: 'Software Download',
    community: 'Community',
    project: 'Project',
    membership: 'Membership',
    contactUs: 'Contact Us',
    followUs: 'Follow Us',
    WeChatPublic: 'WeChat public account',
    codeWarehouse: 'Code warehouse',
    followWeibo: 'Follow the Weibo',
    mailingList: 'Mailing list',
    copyright: 'Copyright © EdgeGallery 2019 - 2021. All rights reserved. For details, see the Legal Statement',
    legalNotice: 'Legal Notice',
    privacyPolicy: 'Privacy Policy',
    containerResource: 'Resource',
    developer: 'Developer',
    docs: 'Docs'
  },
  app: {
    packageList: {
      name: 'Name',
      size: 'Size',
      version: 'Version',
      vendor: 'Vendor',
      type: 'Type',
      affinity: 'Architecture',
      modifyTime: 'Modified Time',
      desc: 'Description',
      distribute: 'Distribute',
      synchronize: 'Sychronize From App Store',
      slectEdgeNodes: 'Select Edge Nodes',
      selected: 'Selected',
      ip: 'Ip',
      city: 'City',
      address: 'Address',
      createTime: 'Create Time',
      download: 'Download',
      auth: 'Author',
      pacVersion: 'Package Version',
      status: 'Status',
      sync: 'Sync',
      syncTip: 'Select at lease one application for synchronization!',
      newPackage: 'New Package',
      package: 'Package',
      uploadPackage: 'Upload Package',
      fileDeleteConfirmInfo: 'Are you sure want to remove %s ?',
      onlyOneFile: 'Only one file is allowed, please remove the file first!'
    },
    distriList: {
      mecHost: 'MEC Hosts',
      hostIp: 'Host IP',
      status: 'Status',
      deploy: 'Deploy',
      appName: 'App Name',
      appDesc: 'App Description',
      podName: 'Pod Name',
      podKind: 'Pod Kind',
      podNameEspace: 'Pod Name Espace',
      podSel: 'Pod Selector',
      deploymentConf: 'Deployment Configuration',
      multipleDeploy: 'Batch Deployment',
      deleteError: 'Please delete the error status applications'
    },
    instanceList: {
      operationStatus: 'Operational Status',
      terminate: 'Terminate',
      instanceDetail: 'Instance Detail',
      beforeDelete: 'Are you sure to delete this instance from the MEC host?',
      addRule: 'Add Rules',
      batchDeleteDnsRules: 'Batch delete DNS ruls',
      batchDeleteTrafficRules: 'Batch delete traffic ruls',
      addDnsRules: 'Add DNS rules',
      addTrafficRules: 'Add Traffic rules',
      addFilter: 'Add Traffic Filter',
      batchDelete: 'Batch delete instances',
      appKpi: 'Application KPI'
    },
    ruleConfig: {
      srcAddress: 'Src IP Address',
      srcPort: 'Src Port',
      dstAddress: 'Dst IP Address',
      dstPort: 'Dst Port',
      trafficRuleId: 'Traffic Rule Id',
      filterType: 'Filter Type',
      priority: 'Priority',
      protocol: 'Protocol',
      action: 'Action',
      dnsRuleId: 'DNS Rule Id',
      ipAddress: 'IP Address',
      ipAddressType: 'IP Address Type',
      domainName: 'Domain Name',
      ttl: 'TTL',
      checkRules: 'Check Rules',
      dnsRule: 'DNS Rules',
      trafficRule: 'Traffic Rules',
      trafficFilter: 'Traffic Filter',
      appRuleManReg: 'App Rule MGR Registration',
      appRuleManEdit: 'App Rule MGR Editor',
      appRuleMgrMust: 'App Rule MGR is must',
      srcTunnelPort: 'Src Tunnel Port',
      srcTunnelAddress: 'Src Tunnel Address',
      dstTunnelPort: 'Dst Tunnel Port',
      dstTunnelAddress: 'Dst Tunnel Address',
      tag: 'Tag',
      mutiplePort: 'Use "," to separate multiple ports',
      mutipleIp: 'Use "," to separate multiple IPs',
      srcMacAddress: 'Src MAC Address',
      dstMacAddress: 'Dst MAC Address',
      tunnelSpecificData: 'Tunnel Specific Data',
      tunnelType: 'Tunnel Type',
      interfaceType: 'Interface Type',
      addNewInterfaceInfo: 'Add New Interface Info',
      interfaceDescriptor: 'Interface Descriptor',
      ipInfo: 'IP Information',
      macInfo: 'MAC Information',
      tunnelInfo: 'Tunnel Information',
      interfaceInfo: 'Interface Information',
      mutipleProtocol: 'Use "," to separate multiple protocols',
      mutipleTag: 'Use "," to separate multiple tags',
      mepError: 'MEP error, please try again later.',
      addRuleSuc: 'You have added rule successfully',
      editRuleSuc: 'You have modified the rule successfully',
      delRuleSuc: 'You have deleted the rule successfully'
    }
  },
  edgeNode: {
    ip: 'Ip',
    city: 'City',
    address: 'Address',
    affinity: 'Architecture',
    edgeNexusIp: 'Edge Repo IP',
    edgeNexusPort: 'Edge Repo Port',
    applcmIp: 'App LCM IP',
    k8sUrl: 'K8S URL',
    monitor: 'Monitor',
    vim: 'VIM',
    detail: 'Details',
    appDetails: 'AppDetails'
  },
  system: {
    edgeNodes: {
      systemPlatform: 'System',
      ip: 'Ip',
      city: 'City',
      affinity: 'Architecture',
      address: 'Address',
      edgeNexusIp: 'Edge Repo IP',
      edgeNexusPort: 'Edge Repo Port',
      applcmIp: 'App LCM IP',
      k8sUrl: 'K8S URL',
      newReg: 'New Registration',
      hostName: 'Host Name',
      ipAddress: 'Ip Address',
      location: 'Location',
      zipcode: 'Zipcode',
      username: 'Username',
      repoUsername: 'Edge Repo Username',
      password: 'Password',
      kubernetesUrl: 'Kubernetes Url',
      edgeNexusName: 'Edge Repo Name',
      edgeNexusPass: 'Edge Repo Password',
      upload: 'Upload',
      uploadTip: 'only support config file, no more than 500kb',
      nodeReg: 'Edge Node Registration',
      nodeModify: 'Edge Node Modify',
      uploadFile: 'Upload Config File',
      howToUpload: 'Drag the file here，or click to upload',
      hwCapability: 'HW Capabilities',
      coordinates: 'Coordinates',
      chooseLocation: 'Please select location',
      newEdge: 'New Edge'
    }
  },
  common: {
    reset: 'Reset',
    search: 'Search',
    operation: 'Operation',
    cancel: 'Cancel',
    submit: 'Submit',
    confirm: 'Confirm',
    delete: 'Delete',
    detail: 'Detail',
    modify: 'Modify',
    warning: 'Promt',
    copy: 'Copy'
  },
  verify: {
    usernameTip: 'User name can not be empty',
    passwordTip: 'Password can not be empty',
    confirmpasswordTip: 'Confirm password can not be empty',
    telephoneTip: 'Mobile phone number can not be empty',
    mailAddressBlankTip: 'Email Address can not be empty',
    verifyCodeTip: 'Verification code con not be empty',
    verifycodeRule: 'Please enter a six-digit verification code',
    imgVerifycodeRule: 'Please enter a four-digit verification code',
    imgVerifycodeWrong: 'verification code error or expired',
    ipTip: 'Ip should not be empty',
    hostnameTip: 'Host name should not be empty',
    zipcodeTip: 'Zipcode should not be empty',
    cityTip: 'City should not be empty',
    addressTip: 'Address Mec Host should not be empty',
    edgeNexusIpTip: 'Edge Repo ip should not be empty',
    edgeNexusPortTip: 'Edge Repo port should not be empty',
    edgeNexusUsernameTip: 'Edge Repo user name should not be empty',
    edgeNexusPasswordTip: 'Edge Repo password should not be empty',
    appLcmIpTip: ' App LCM ip should not be empty',
    k8sURLTip: 'k8sURL should not be empty',
    portTip: 'Port should not be empty',
    managedMecHostTip: 'Managed Mec Host should not be empty',
    appstorenameTip: 'App store name should not be empty',
    vendorTip: 'Vendor should not be empty',
    uriTip: 'URI should not be empty',
    affinityTip: 'Architecture should not be empty',
    areaTip: 'Area should not be empty',
    applcmNameTip: 'App LCM should not be empty',
    normalVerify: 'Style is not right',
    hostNameVerify: '4 to 16 digits (letters, numbers)',
    edgeNodeNameVerify: '4 to 16 characters (letters, numbers), cannot contain special symbols',
    noSymbol: 'Cannot contain special symbols',
    coordinates: 'Coordinates should not be empty',
    uriVerify: 'Try to type right Uri.',
    descVerify: 'Describtion can not be empty.',
    appNameVerify: 'App name can not be empty',
    mustOptions: 'This input box can not be empty',
    appRuleManaVerify: 'App rule manager can not be empty'
  },
  tip: {
    getCommonListFailed: 'Get list failed.',
    deletePacFrmoHost: 'You have deleted the package from the host successfully!',
    networkError: 'Error, please check your internet!',
    failedReg: 'Failed to register user. ',
    wrongCaptcha: 'Invalid captcha, please recheck the Captcha.',
    failedAuth: 'Authentication Failure, please recheck the User Name or Password.',
    deploySuc: 'Deploy successfully!',
    deleteSuc: 'Delete successfully!',
    sucToDownload: 'Succeed to download package from app store!',
    registerServSuc: 'You have register this service successed!',
    unregisterServSuc: 'You have unregister this service successed!',
    regAppLcmSuc: 'Register App LCM success!',
    modAppLcmSuc: 'Modify App LCM success!',
    regAppStoreSuc: 'Register App Store success!',
    modAppStoreSuc: 'Modify App Store success!',
    deleteAppStoreSuc: 'You have deleted the app store successfully!',
    sucToDeleteNodes: 'Succeed to delete edge node!',
    uploadSuc: 'Succeed to upload config file!',
    sucToRegNode: 'Succeed to register edge node!',
    sucToModNode: 'Succeed to modify edge node!',
    regUserSuc: 'User is registered successfully!',
    fileFormatError: 'The file format does not support read or empty content!',
    sessionOut: 'Your session is expired.',
    sessionExp: 'Session Expired.',
    version: 'Please choose the package version first.',
    noPackage: 'There is no package.',
    warning: 'Warning',
    browserAdvise: 'For sure some functions work well, please use Chrome.',
    confirm: 'Confirm',
    mecHost: 'Please choose the host.',
    failedToDistribute: 'Failed to distribute package!',
    failedToGetList: 'Failed to get node list!',
    deployFailed: 'Deploy failed!',
    getListFailed: 'Failed to get distribution list!',
    getNodeListFailed: 'Failed to get node list!',
    getPackageInfoFailed: 'Failed to get package info!',
    getAppInfoFailed: 'Failed to get app info!',
    getCapaFailed: 'Failed to get the capabilities!',
    getKpiFailed: 'Failed to get the node kpi.',
    getServiceFailed: 'Failed to get service info!',
    failedToGetCaptcha: 'Failed to get captcha.',
    nameAlSinged: 'The username number has been already registered, please change another one.',
    telAlSigned: 'The telephone number has been already registered, please change another one.',
    modifyPwd: 'You have successfully reset your password.',
    failedModifyPwd: 'Failed to reset your password.',
    faileToGetInstanceList: 'Failed to get instance list!',
    faileToDeleteNode: 'Failed to delete edge node!',
    faileToUpload: 'Failed to upload config file.',
    failToRegNode: 'Failed to register the node.',
    failToModifyNode: 'Failed to modify.',
    typeApp: 'Please type MEC host ip first!',
    uploadConf: 'Please upload config file first.',
    typeCity: 'Please select deployment area.',
    confirmToDeleteNode: 'Are you sure to delete this node?',
    deleteAppBeforeDeleteNode: 'You need to delete the application installed on the node first.',
    beforeDeleteApplcm: 'Are you sure to delete this App LCM?',
    beforeDeleteAppstore: 'Are you sure to delete this App Store?',
    beforeDeleteFromMechost: 'Are you sure to delete this package from the MEC host?',
    getStatusDelay: 'There is a delay in query details, please wait 30-40S after the deployment is completed!',
    pleaseSelect: 'Please select.',
    successToAddRules: 'You have created one rule successfully.',
    regAppManSuc: 'You have created one app rule manager successfully.',
    modAppRuleSuc: 'You have modified one app rule manager successfully.',
    ifContinue: 'This operation will permanently delete the diversion rule, continue?',
    oneAtLeast: 'Please select one rule at least.',
    loginStatusFailed: 'The login status has expired, please refresh the page and log in again.',
    loginOperation: 'User is not authorized to perform this operation, please login.',
    operationInfo: 'Operation Info',
    ttl: 'Please type right ttl.',
    macMust: 'Please type right mac address.',
    idMust: 'Please type right rule ID.',
    domainMust: 'Please type right domain name.',
    beforeDeleteAppMgr: 'Are you sure to delete this data?',
    uploadSuccess: 'Upload success!'
  },
  area: {
    beijing: 'Beijing',
    haidian: 'Haidian',
    caict: 'CAICT',
    huaweiBeijing: 'Huawei Beijing',
    shanxi: "Shan'xi",
    xian: "Xi'an",
    huaweiXian: "Huawei Xi'an",
    xidian: 'Xidian Univercity',
    jiangsu: 'Jiangsu',
    nanjing: 'Nanjing',
    zijinshan: 'Zijinshan Lab',
    shanghai: 'Shanghai',
    pudong: 'Pudong',
    huaweiShanghai: 'Huawei Shanghai',
    guangdong: 'Guangdong',
    shenzhen: 'Shenzhen',
    huaweiBantian: 'Huawei Bantian',
    tiananyungu: 'Huawei Tiananyungu',
    clab: 'Clab',
    SUSTech: 'SUSTech',
    shandong: 'Shandong',
    qingdao: 'Qingdao',
    haier: 'Haier Qingdao'
  },
  dashboard: {
    nodeDetails: 'Node details',
    appDetails: 'App details',
    appList: 'Application List',
    nodeList: 'EdgeNodes List',
    appName: 'Application Name',
    appId: 'Application ID',
    deploymentStatus: 'Deployment status',
    applicationStatistics: 'Application Statistics',
    available: 'Available',
    distributed: 'Distributed',
    deployed: 'Deployed'
  },
  CAPABILITIES_PAGE: {
    PAGE_DESC: 'Capabilities of an edge node and the number of times that the edge node is invoked in the last seven datys',
    CAPABILITY_SERVICE_REGISTRATION: 'Service Registration',
    CAPABILITY_SERVICE_DISCOVERY: 'Service Discovery',
    CAPABILITY_DNS: 'DNS Capability',
    CAPABILITY_LOCATION: 'Positioning Capability',
    CAPABILITY_FACE_RECOGNITION: 'Face Recognition Capability',
    CAPABILITY_SERVICE_REGISTRATION_DESC: 'Registers services to MEP',
    CAPABILITY_SERVICE_DISCOVERY_DESC: 'Provides the application with the service registed on the MEP',
    CAPABILITY_DNS_DESC: 'Provides the domain name resolution capability for applications',
    CAPABILITY_LOCATION_DESC: 'Provides location service for applications',
    CAPABILITY_FACE_RECOGNITION_DESC: 'Upload a photo for facial recognition and return the location of the face to be recognized',
    CARD_DESC: 'Use Times in Last 7 Days',
    MEP_SELF_CAPABILITY: 'MEP Capablities',
    APP_CAPABILITY: 'APP Capabilities'
  },
  SERVICE_PAGE: {
    PAGE_DESC: 'Edge Node Service Details',
    TABLE_HEADER_SERVICE_NAME: 'Service Name',
    TABLE_HEADER_SERVICE_STATUS: 'Service Status',
    TABLE_HEADER_APP_NAME: 'Application Name',
    TABLE_HEADER_SERVICE_VERSION: 'Service Version',
    TABLE_HEADER_SERVICE_ID: 'Service ID',
    NO_DATA_NOTICE: 'No data available.',
    TABLE_HEADER_APP_VERSION: 'Application Version',
    TABLE_HEADER_OPERATION: 'Operation',
    APP_STATICS_APP: 'Application Count：',
    APP_STATICS_SERVICE: 'Service Count：',
    SERVICE_STATICS_SUBSCRIBED: 'Subscribed Count：',
    APP_STATICS_SUBSCRIBE: 'Subscribe Count：',
    NUM: '',
    ABILITY_MEP_SELF: 'MEP Capabilities',
    SERVICES_DETAIL: 'Edge Node Service Details',
    OPERATION_VIEW: 'View',
    BACK_BUTTON_NAME: 'Return',
    DATA: 'Date：',
    TIMES: 'Times：'
  },
  TOPOLOGY_PAGE: {
    PAGE_DESC: 'Topology of applications and services on edge nodes',
    NODE_TYPE: 'Node Type',
    SERVICE: 'Service',
    SERVICE_STATUS: 'Service Status',
    SERVICE_STATUS_INACTIVE: 'InActive',
    SERVICE_STATUS_ACTINVE: 'Active',
    TIPS_KEY_SERVICE_NAME: 'Service Name：',
    TIPS_KEY_SERVICE_VERSION: 'Service Version：',
    TIPS_KEY_SERVICE_STATE: 'Service Status：',
    TIPS_KEY_APP_NAME: 'APP Name：',
    TIPS_KEY_NAME: 'Name：',
    TIPS_KEY_SOURCE: 'Source：',
    TIPS_KEY_TARGET: 'Target：',
    TIPS_KEY_SUBORDINATION: 'Type of Affiliation',
    TIPS_KEY_SUBSCRIBE: 'Subscription Relation Type',
    DASHBORD_TAB: 'Overview of Applications and Services on Edge Node',
    TOPOLOGY_TAB: 'Topology'
  },
  ...enLocale
}

export default en
