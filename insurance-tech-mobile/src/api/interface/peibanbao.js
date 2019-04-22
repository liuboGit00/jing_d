/**
 * 团险模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from 'axios'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

axios.defaults.withCredentials=true;//让ajax携带cookie

// 拦截器
axios.interceptors.response.use(
  // response => {
  //   let network = window.location.href;
  //   if (response.data.error == "NotLogin" || response.data.error == "DuplicateLogin" || response.data.error == "OldUser" || response.data.error == "RiskLogin") {

  //     window.location.href= base.passport + "?return=" + base.sq + "/redirect/goLogin?url=" + network;
  //   }
  //   return response;
  // },
  // err => {
  //   return Promise.reject(error);
  // }
)

let config = {
  // 上传一定要定义头
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'x-requested-with': 'XMLHttpRequest'
  }
}
let downloadConfig = {
  // 上传一定要定义头
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'x-requested-with': 'XMLHttpRequest'
  },
  responseType: 'blob'
}
let configJson = {
  // 上传一定要定义头
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'x-requested-with': 'XMLHttpRequest'
  }
}
let configHeader = {
  // 上传一定要定义头
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'x-requested-with': 'XMLHttpRequest'
  }
}
// 生成随机数
let randomNum = new Date().getTime();

const groupInsurance = {

  //微信获取js端配置
  WXJSSDKStaff(params) {
    return axios.get(`${base.vchat}/config/sign?url=${params}`);
  },

  //微信获取当前用户信息
  WXUSERINFOStaff() {
    return axios.get(`${base.vchat}/user/info`);
  },

  //微信获取当前用户是否关注当前公众号
  WXSUBSCRIBEDStaff() {
    return axios.get(`${base.vchat}/user/is/subscribed`);
  },

  // 投保
  insuredStaff(params) {
    return axios.post(`${base.sq}/insurance/confirmInfo?t=${randomNum}`, params, configJson);
  },
  
  // 获取当前的领保总人数
  countStaff(params) {
    return axios.get(`${base.sq}/jd-m/count?t=${randomNum}`, {
      params: params
    });
  },

  // 获取京东Pin
  pinStaff(params) {
    return axios.get(`${base.sq}/jd-m/pin?t=${randomNum}`, {
      params: params
    });
  },

  // 获取京东appid
  appidStaff(params) {
    return axios.get(`${base.sq}/jd-m/appid?t=${randomNum}`, {
      params: params
    });
  },

  // 查询库存并返回是否领取
  validReceiveStaff(params) {
    return axios.get(`${base.sq}/insurance/validReceive?t=${randomNum}`, {
      params: params
    });
  },

  // 保单列表
  policyListStaff(params) {
    return axios.get(`${base.sq}/policy/list?t=${randomNum}`, {
      params: params
    });
  },

  // 保单详情查询
  policyQueryStaff(params) {
    return axios.get(`${base.sq}/policy/query?t=${randomNum}`, {
      params: params
    });
  },
}
export default groupInsurance;
