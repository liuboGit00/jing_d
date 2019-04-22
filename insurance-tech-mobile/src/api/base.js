/**
 * 接口域名的管理
 * 测试环境与线上环境切换
 */


let base = {};
import SHAREIMGADDRESS from "../assets/img/pbb/share300.png";
// import PDFDRESS from "../assets/pdf/item.pdf";
if(process.env.VUE_APP_URL ==='development') {// 本地环境
  
  base = {
    sq: 'http://jrvchat.jd.com/gitc',//测试环境接口
    vchat: 'http://jrvchat.jd.com/pbb',//微信公众号相关接口
    login: 'http://plogin.m.jd.com',//单点登陆
    share: 'http://ttxapi.jd.com/pbb', //陪伴保分享链接配置
    shareImg: `http://ttxapi.jd.com${SHAREIMGADDRESS}`, //陪伴保分享图片配置,&& 首页也需要配置
    wxauthor: 'http://jrvchat.jd.com/pbb/sns/to/oauth?url=http://ttxapi.jd.com/pbb' //微信授权跳转链接
  }
}else if (process.env.VUE_APP_URL ==='test') {// 测试环境
  base = {
    sq: 'http://jrvchat.jd.com/gitc',//测试环境接口
    vchat: 'http://jrwx.jd.com/pbb',//微信公众号相关接口
    login: 'http://plogin.m.jd.com',//单点登陆
    share: 'http://ttxapi.jd.com/pbb', //陪伴保分享链接配置
    shareImg: `http://ttxapi.jd.com${SHAREIMGADDRESS}`, //陪伴保分享图片配置,&& 首页也需要配置
    wxauthor: 'http://jrvchat.jd.com/pbb/sns/to/oauth?url=http://ttxapi.jd.com/pbb' //微信授权跳转链接
  }
}else if (process.env.VUE_APP_URL ==='uat') {// uat环境
  base = {
    sq: 'http://jrvchat.jd.com/gitc',//测试环境接口
    vchat: 'http://jrvchat.jd.com/pbb',//微信公众号相关接口
    login: 'http://plogin.m.jd.com',//单点登陆
    share: 'http://ttxapi.jd.com/pbb', //陪伴保分享链接配置
    shareImg: `http://ttxapi.jd.com${SHAREIMGADDRESS}`, //陪伴保分享图片配置,&& 首页也需要配置
    wxauthor: 'http://jrvchat.jd.com/pbb/sns/to/oauth?url=http://ttxapi.jd.com/pbb' //微信授权跳转链接
  }

}else if (process.env.VUE_APP_URL ==='production') {// 线上环境
  base = {
    sq: 'http://jrvchat.jd.com/gitc',//测试环境接口
    vchat: 'http://jrvchat.jd.com/pbb',//微信公众号相关接口
    login: 'http://plogin.m.jd.com',//单点登陆
    share: 'http://ttxapi.jd.com/pbb', //陪伴保分享链接配置
    shareImg: `http://ttxapi.jd.com${SHAREIMGADDRESS}`, //陪伴保分享图片配置,&& 首页也需要配置
    wxauthor: 'http://jrvchat.jd.com/pbb/sns/to/oauth?url=http://ttxapi.jd.com/pbb' //微信授权跳转链接
  }
}

export default base;
