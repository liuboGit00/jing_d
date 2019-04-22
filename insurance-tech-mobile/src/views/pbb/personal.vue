<template>
    <div class="content_wrap">
        <div class="text_bar">
            <p><strong>累计保障</strong><span v-for="(el,index) in grandTotalArr" :key="index">{{el}}</span><strong>人</strong></p>
        </div>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(el,index) in policyListArr" :key="index">
                <div class="slide_list" :class="el.insured.gender===2?'slide_female':''">
                    <div class="sex_tip">
                        <i class="head_photo"></i>
                        <!-- <img src="~@/assets/img/pbb/boy-18@2x.png" alt=""> -->
                        <strong class="name_strong">{{el.insured.name}}</strong>
                        <span class="age_span">{{el.insuredAge}}</span>
                    </div>
                    
                    <div class="content_p">
                        <p class="dateslip dateslip_qx">保障期至 <i>{{el.policyEndTime}}</i> (剩余<i class="red">{{el.diffDays}}</i>天)</p>
                        <div class="linebar_w">
                            <line-bar :diffDays="el.diffDays" lineType="1"></line-bar>
                        </div>
                        
                        <p class="dateslip dateslip_bz">保障金额 <span>{{el.amount}}</span>元
                            <!-- <a href="javascript:;" @click="increase"><i></i>提额</a> -->
                        </p>
                    </div>
                    
                    
                    <div class="slide_bot">
                        <a href="javascript:;" @click="lengthInsure">
                            <span class="span1"></span>
                            <p class="p1">延长保障</p>
                            <p class="p2">支持积分兑换</p>
                        </a>
                        <router-link :to="{path:'/policyDetails',query: {policyNo: el.voucherNo}}">
                            <span class="span2"></span>
                            <p class="p1">查看详情</p>
                            <p class="p2">查看,修改保障信息</p>
                        </router-link>
                    </div>
                    <span class="insure_span" :class="insureCode(el.policyStatus)"></span>
                </div>
                
                
            </swiper-slide>
            <!-- Optional controls -->
            
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>
        <div class="content_list">
            <div class="list_header">
                <strong>我的任务</strong>
                <span @click="noticeTip">新任务通知<i :class="noticeStatus==1?'notice_i':''"></i></span>
            </div>
            <div class="right_text">
                <div class="logo_wrap">
                    <span class="logo_span1"></span>
                </div>
                
                <div class="inner_text">
                    <div class="center_text">
                        <p class="p1">邀好友，送保障</p>
                        <p class="p2">免费延长保障，邀得多延的久</p>
                    </div>
                    <a href="javascript:;" class="text_btn">敬请期待</a>
                </div>
            </div>
            <div class="right_text">
                <div class="logo_wrap">
                    <span class="logo_span2"></span>
                </div>
                
                <div class="inner_text">
                    <div class="center_text">
                        <p class="p1">公共交通工具意外险</p>
                        <p class="p2">10000元保额免费领取</p>
                    </div>
                    <a href="javascript:;" class="text_btn" @click="lengthInsure">免费领取</a>
                </div>
            </div>
            
        </div>
        <div class="content_list">
            <div class="list_header">
                <strong>社区动态</strong>
            </div>
            <div class="content_font">
                <p class="p1">"陪伴保"少儿疾病保险上线啦！</p>
                <p class="p2">京东数科秉承社会责任、普惠保险理念，联合光大永明人寿隆重推出"陪伴保"少儿疾病保险，包含白血病、严重川崎病、严重手足口病、淋巴瘤等15种常见儿童严重疾病，受邀京东数科会员可免费领取一个月保障，并可通过完成任务、邀约朋友延长保障期限。</p>
                <span></span>
                <!-- <strong><i></i>766776</strong> -->
            </div>
        </div>
        <div class="content_list">
            <div class="list_header">
                <strong>专享权益</strong>
            </div>
            <ul class="content_ul">
                <li>
                    <span class="span1"></span>
                    <strong>健康服务</strong>
                </li>
                <li>
                    <span class="span2"></span>
                    <strong>公益救助</strong>
                </li>
                <li>
                    <span class="span3"></span>
                    <strong>赔审团</strong>
                </li>
            </ul>
        </div>
        <div class="bottom_content">
            <p>——没有更多内容啦——</p>
        </div>
    </div>
</template>

<script>
import UTILSINDEX from '@/common/util.js'
import INTERFACE from '@/api/index.js'
import COMMONDATA from '@/common/commonData.js'
import lineBar from "@/components/linebar/index.js";
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

const PEIBANBAOINTERFACE = INTERFACE.peibanInsuranceList;

export default {
    data() {
        return {
            grandTotalArr: [],
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                },
                spaceBetween: 8
            },
            policyListArr: [],
            noticeStatus: false
        }
    },
    components: {
        swiper,
        swiperSlide,
        lineBar
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      insureCode() {
        return function(a) {
            if (a == 2) {
                return 'code_dsx';
            } else if (a == 3) {
                return 'code_bzz';
            } else if (a == -12) {
                return 'code_ysx';
            } else if (a == -11) {
                return 'code_bzzz';
            } else if (a == -21) {
                return 'code_ypf';
            } else if (a == -22) {
                return 'code_yjy';
            } else if (a == -3) {
                return 'code_cdsb';
            }
        }
      }
    },
    created() {
        this.getCount();
        this.policyListData();
        this.$toast("", 2, 100000)
        
    },
    methods: {
        policyListData() {
            let that = this;
            PEIBANBAOINTERFACE.policyListStaff({
                "productCode": COMMONDATA.productCode
            }).then( res => {
                that.policyListArr = res.data.data;
                that.$toast("", 2, 500)
            })
        },
        noticeTip() {
            this.noticeStatus = !this.noticeStatus;
            if (this.noticeStatus) {
                this.$toast("任务提醒已开启")
            } else {
                this.$toast("任务提醒已关闭")
            }
        },
        getCount() {
            let that = this;
            PEIBANBAOINTERFACE.countStaff({
                "productCode": COMMONDATA.productCode,
            }).then( res => {
                if (res.data.code == 1) {
                    if (res.data.data < 10) {
                        that.grandTotalArr.push(0,res.data.data);
                    } else {
                        console.log(res.data.data)
                        that.grandTotalArr = res.data.data.toString().split('');
                    }
                }
            })
        },
        increase() {
            this.$toast("敬请期待");
        },
        lengthInsure() {
            this.$toast("敬请期待");
        }
    }
}
</script>

<style lang="less" scoped>

@import "~@/style/common";
@import "~@/style/mixin";
@import "~@/style/reset";
@import "~@/style/var";


// @import "~@/style/weui.min.css";
.content_wrap {
  background: @color-f6;
  color: #5B1E02;
  padding: .266667rem 0.4rem 0 0.4rem;
  .text_bar {       
        p {
            font-size: @font-size-lg;
            padding-bottom: .186667rem;
            // .fct;
            text-align: center;
            strong {
                padding: 0 .133333rem;
                font-weight: 500;
            }
            span {
                .wh(.426667rem, .72rem);
                display: inline-block;
                // .fct;
                margin: 1px;
                font-family: @font-family-bold;
                border: 1px solid #ae8779;
                border-radius: @border-radius-6;
                line-height: 0.8rem;
                text-align: center;
            }
        }   
    }
    .swiper-container {
            overflow: inherit;
        }
    .slide_list {
        width: 9.2rem;
        height: 5.586667rem;
        background: @color-bg-tip-yellow;
        border-radius: @border-radius-16;
        .content_p {
            padding: 0 .4rem;
            .linebar_w {
                width: 5rem;
            }
        }
        .relative;
        .slide_bot {
            background: @color-bg-tip-orange;
            .absbottom;
            width: 100%;
            height: 1.666667rem;
            border-radius: 0 0 @border-radius-16 @border-radius-16;
            .fct;
            a {
                position: relative;
                display: block;
                width: 50%;
                color: @color-text;
                &:first-child {
                    border-right: 1px solid rgba(91,30,2,0.20);
                }
                .span1 {
                    .wh(.693333rem, .693333rem);
                    .bg-images('chakan.png');
                    display: block;
                    position: absolute;
                    top: .2rem;
                    left: .4rem;
                }
                .span2 {
                    .wh(.653333rem, .72rem);
                    .bg-images('yanchang.png');
                    display: block;
                    position: absolute;
                    top: .2rem;
                    left: .4rem;
                }
                p {
                    text-indent: 1.3rem;
                    &.p1 {
                        font-size: @font-size-base;
                    }
                    &.p2 {
                        font-size: @font-size-sm;
                        opacity: 0.45; 
                    }
                }
            }
        }
        .sex_tip {
            height: 1rem;
            .head_photo {
                width: .8rem;
                height: 1.173333rem;
                position: absolute;
                top: -0.266667rem;
                left: .4rem;
                .bg-images('boy-18@2x.png');
            }
            .name_strong {
                font-size: .586667rem;
                padding: 0 .133333rem;
                margin-left: 1.466667rem;
                line-height: 1.173333rem;
            }
            .age_span {
                font-size: @font-size-base;
                line-height: 1.173333rem;
                font-family: @font-family-bold;
            }
        }
        .insure_span {
            .wh(1.866667rem, 1.866667rem);
            // .bg-images('baozhangzhong@2x.png');
            display: block;
            position: absolute;
            top: -.4rem;
            right: .266667rem;
            &.code_dsx {
                .bg-images('dsx.png');
            }
            &.code_bzz {
                .bg-images('bzz.png');
            }
            &.code_ysx {
                .bg-images('ysx.png');
            }
            &.code_bzzz {
                .bg-images('bzzz.png');
            }
            &.code_ypf {
                .bg-images('ylp.png');
            }
            &.code_yjy {
                .bg-images('yjy.png');
            }
            &.code_cdsb {
                .bg-images('cdsb.png');
            }
        }
        .dateslip {
            .ftd(@font-size-sm, .666667rem);
            // .ftb;
            span {
                font-size: 1.066667rem;
                font-family: @font-family-bold;
            }
            .red {
                color: @color-bg-red;
                font-style: normal;
            }
            .yellow {
                color: #FF7C18;
                font-style: normal;
            }
            .green {
                color: #6EC344;
                font-style: normal;
            }
            a {
                .wh(2rem, .8rem);
                background: @color-bg-red;
                border: .013333rem solid rgba(5,5,5,0.08);
                .ftd(.346667rem, .8rem);
                display: block;
                color: #fff;
                border-radius: @border-radius-6;
                position: absolute;
                top: 2.4rem;
                right: 1rem;
                text-align: center;
                i {
                    .wh(.28rem, .32rem);
                    .bg-images('arrow.png');
                    display: inline-block;
                    margin-right: .066667rem;
                    position: relative;
                    top: .013333rem;
                }
            }
            &.dateslip_qx {
                color: rgba(91,30,2,0.45);
            }
            &.dateslip_bz {
                margin-top: .7rem;
            }
            i {
                font-style: normal;
                font-family: @font-family-bold;
            }
        }
        &.slide_female {
            background: #ffd2c2;
            .slide_bot {
                background: #ffc8b6;
            }
            .sex_tip {
                .head_photo {
                    .wh(1.093333rem, 1.173333rem);
                    .bg-images('female.png');
                }
            }
        }
    }
    .content_list {
        background: @color-fff;
        border-radius: @border-radius-16;
        margin-top: .266667rem;
        padding: .266667rem;
        .list_header {
            height: .766667rem;
            .ftb;
            justify-content: space-between;
            border-bottom: .013333rem solid rgba(91,30,2,0.15);
            span {
                .ftb;
                opacity: 0.45;
                font-size: .32rem;
                i {
                    .wh(.8rem, .48rem);
                    .bg-images-inline('button_close.png');
                    margin-left: .133333rem;
                    &.notice_i {
                        .wh(.8rem, .48rem);
                        .bg-images-inline('button_open.png');
                    }
                }
            }
        }
        .right_text {
            .ftb;    
            .logo_wrap {
                width: 1.36rem;
                overflow: hidden;
                text-align: left;
            }       
            .logo_span1 {
                .wh(.826667rem, .533333rem);
                .bg-images-inline('fengxiang@2x.png');
                // margin-right: .533333rem;
            }
            .logo_span2 {
                .wh(.68rem, .773333rem);
                .bg-images-inline('hongbao@2x.png');
                // margin-right: .533333rem;
            }
            .inner_text {
                .ftb;
                width: 100%;
                justify-content: space-between;
                border-bottom: .013333rem solid rgba(91,30,2,0.15);
                padding: .266667rem 0;
                .p1 {
                    font-size: .32rem;
                    color: rgba(91,30,2,0.45);
                }
                .text_btn {
                    .ft(.346667rem, .8rem);
                    color: rgba(91,30,2,0.45);
                    border: .013333rem solid rgba(91,30,2,0.15);
                    border-radius: @border-radius-6;
                    padding: 0 .08rem;
                }
            }
        }
        .content_font {
            padding: .266667rem 0;
            position: relative;
            p {
                opacity: 0.65;
                font-size: .373333rem;
            }
            span {
                .wh(.666667rem, .666667rem);
                .bg-images-inline('New-Tga@2x.png');
                .allcover;
            }
            strong {
                .ftb;
                justify-content: flex-end;
                i {
                    .wh(.426667rem, .266667rem);
                    .bg-images-inline('yuedu@2x.png');
                }
            }
        }
        .content_ul {
            .ftb;
            li {
                .fct;
                flex-direction: column;
                flex-grow: 1;
                padding-top: .266667rem;  
                strong {
                    .ftd(@font-size-base, .8rem)
                }  
                .span1 {
                    .wh(.92rem, .773333rem);   
                    .bg-images('jiangkang@2x.png');  
                }
                .span2 {
                    .wh(.92rem, .773333rem);   
                    .bg-images('gongyi@2x.png');  
                }
                .span3 {
                    .wh(.813333rem, .773333rem);   
                    .bg-images('chuizi@2x.png');  
                }
            }
        }
    }
    .bottom_content {
        color: #D8D8D8;
        .ft(@font-size-sm, 1.333333rem);
    }
}


</style>