<template>
    <div class="content_wrap">
        <div class="content_inner">
            <div class="head_pic">
                <div class="text_bar">
                    <p>累计已有&nbsp;<span v-for="(el,index) in grandTotalArr" :key="index">{{el}}</span>&nbsp;个孩子获得保障</p>
                    <div class="orange_box">
                        <div class="inner_box"></div>
                    </div>
                </div>
            </div>
            <div class="bot_text">
                <h5>——<span>少儿大病保障</span>——</h5>
                <p class="p1"><i></i>覆盖<strong class="num">15</strong>种儿童常见大病&nbsp;&nbsp;<span>多方位守护&nbsp;</span><router-link to="/scope">详情</router-link></p>
                <p class="p2"><i></i><strong class="num">30</strong>天-<strong class="num">17</strong>周岁均可加入&nbsp;&nbsp;<span>大范围覆盖</span></p>
                <p class="p3"><i></i><strong class="num">10</strong>万元保额&nbsp;&nbsp;<span>高额度保障</span></p>
                <a class="getreceive" href="javascript:" @click="getReceive">免费领取</a>
            </div>
            <div class="share_tip" @click="shareTip">
                <p><i></i><a href="javascript:;">分享给其他有孩子的家庭</a> <span>（免费延长保障）</span></p>
            </div>
        </div>
        
    </div>
</template>
<script>
import base from '@/api/base'; // 导入接口域名列表
import UTILSINDEX from '@/common/util.js'
import INTERFACE from '@/api/index.js'
import COMMONDATA from '@/common/commonData.js'

const PEIBANBAOINTERFACE = INTERFACE.peibanInsuranceList;
export default {
    data() {
        return {
            grandTotalArr: []
            // windowH: window.innerHeight
        }
    },
    created() {
        this.getCount();

    },
    mounted() {
    },
    methods: {
        getReceive() {
            let that = this;
            let nethref = encodeURIComponent('http://ttxapi.jd.com/pbb#/');
            // 微信获取是否关注公众号
            PEIBANBAOINTERFACE.WXSUBSCRIBEDStaff({}).then( res => {
                
                PEIBANBAOINTERFACE.pinStaff({}).then( pin => {
                    if (pin.data.code != 1) {
                        PEIBANBAOINTERFACE.appidStaff({}).then( appi => {
                            const appid = appi.data.data;
                            window.location.href = `${base.login}/user/login.action?appid=${appid}&returnurl=${nethref}&wxautologin=false&qqautologin=false&qbautologin=false&qqlogin=false&wxlogin=false`
                        })
                        
                    } else {
                        PEIBANBAOINTERFACE.validReceiveStaff({
                            "channelCode": COMMONDATA.channelCode,
                            "productCode": COMMONDATA.productCode,
                            "vendorCode": COMMONDATA.vendorCode
                        }).then( valid => {
                            if (!valid.data.data.repeat) {  //未领取
                                
                                if (valid.data.data.stock > 0) {
                                    that.$router.push({
                                        path: '/insure'
                                    })
                                } else if (valid.data.data.stock === 0) {
                                    that.$toast("系统繁忙，请稍后再试");
                                } else {
                                    that.$router.push({
                                        path: `/insure?pagestate=${valid.data.data.stock}`
                                    })
                                }
                                
                            } else { //已领取
                                if (UTILSINDEX.isWeiXin()) { //微信环境
                                    
                                    if (!res.data.data) {
                                        that.$router.push({
                                            path: '/guide'
                                        })
                                    } else if (res.data.data) { 
                                        that.$router.push({
                                            path: '/personal'
                                        })
                                    } 
                                } else { //非微信环境
                                    that.$router.push({
                                        path: '/guide'
                                    })
                                }
                            }
                            
                        })
                    }
                    
                })
                
            })
        },
        getCount() {
            let that = this;
            PEIBANBAOINTERFACE.countStaff({
                "productCode": COMMONDATA.productCode
            }).then( res => {
                if (res.data.code == 1) {
                    if (res.data.data < 10) {
                        that.grandTotalArr.push(0,res.data.data);
                    } else {
                        that.grandTotalArr = res.data.data.toString().split('');
                    }
                }
            })
        },
        shareTip() {
            this.$toast("敬请期待");
        }
    },
    destroyed() {
        if (typeof window !== 'undefined') {
            document.querySelector('body').setAttribute('style', '')
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/style/weui.min.css";
@import "~@/style/common";
@import "~@/style/mixin";
@import "~@/style/reset";
@import "~@/style/var";

.content_wrap {
    background: @color-bg-index;
    color: #5B1E02;
    // height: 30rem;
    font-size: @font-size-base;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    .head_pic {
        .wh(10rem, 9.9rem);
        .bg-images('index_logo@2x.png');
        .relative;
        .text_bar {
            .wh(9.466667rem, 2.133333rem);
            background: @color-bg-yellow;
            border-radius: @border-radius-16;
            .absbottom;
            margin-left: .266667rem;
            overflow: hidden;
            
            .orange_box {
                .wh(9.466667rem, .826667rem);
                .absbottom;
                background: @color-bg-orange;
            }
            p {
                .ft(@font-size-lg, 1.306667rem);
                // .fct;
                text-align: center;
                span {
                    .wh(.426667rem, .72rem);
                    background: #ff2939;
                    // .fct;
                    display: inline-block;
                    line-height: 0.8rem;
                    color: @color-fff;
                    margin-right: 1px;
                    font-family: @font-family-bold;
                    border-radius: @border-radius-6;
                    text-align: center;
                }
            }
            .orange_box {
                .fct;
                .inner_box {
                    .wh(8.8rem,.213333rem);
                    background: #E49E5B;
                    border-radius: @border-radius-6;
                }
            }
            
        }
    }
    .bot_text {
        margin: 0 auto;
        .wh(9.2rem, 4.693333rem);
        .bg-images('baozhang@2x.png');
        .relative;
        padding-top: .4rem;
        top: -0.72rem;
        h5 {
            // .ft(@font-size-mini, 1.173333rem);
            font-size: @font-size-mini;
            padding-top: .346667rem;
            font-weight: 500;
            .fct;
            span {
                font-weight: bold;
                font-size: @font-size-clg;
            }
        }
        p {
            .ftd(@font-size-base, .726667rem);
            // font-size: @font-size-base;
            margin-left: 1.12rem;
            .ftb;
            i {
                margin-right: .36rem;
            }
            span {
                opacity: 0.45;
                font-size: @font-size-sm;
            }
            a {
                .sc(@font-size-sm, @color-text);
                text-decoration: underline;
            }
            &.p1 {
                i {
                    .wh(.4rem, .36rem);
                    .bg-images-inline('icon3@2x.png');
                    background-size: cover;
                }
            }
            &.p2 {
                i {
                    .wh(.426667rem, .453333rem);
                    .bg-images-inline('icon1@2x.png');
                }
            }
            &.p3 {
                i {
                    .wh(.413333rem, .413333rem);
                    .bg-images-inline('icon2@2x.png');
                }
            }
            .num {
                font-family: @font-family-bold;
                position: relative;
                top: .013333rem;
            }
        }
        .getreceive {
            .wh(7.493333rem, 1.68rem);
            .ft(@font-size-clg, 1.4rem);
            display: block;
            .bg-images('button@2x.png');
            color: @color-fff;
            margin: 0.4rem auto 0;
            &:active {
                color: #000;
            }
        }
    }
    .share_tip {
        p {
            .fct;
            // .ft(@font-size-sm, 0.2rem);
            font-size: @font-size-sm;
            i {
                .wh(.826667rem, .533333rem);
                .bg-images-inline('fengxiang@2x.png');
                margin-right: .133333rem;
            }
            a {
                color: @color-text;
                border-bottom: 1px solid rgba(91, 30, 2, 0.35);
                line-height: .35rem;
            }

            span {
                font-size: @font-size-mini;
            }
        }
        
    }
    .content_inner {
        .ctp;
        // height: 100%;
    }
}
</style>
<style>
@media screen and (max-aspect-ratio:10/14){
    /* .content_inner {
        margin: 1rem 0;
    } */

}

/* @media screen and (max-aspect-ratio:10/16){
    
}

@media screen and (max-aspect-ratio:10/18){
   

}

@media screen and (max-aspect-ratio:10/20){
    

}

@media screen and (max-aspect-ratio:10/21){ 
    

} */
</style>