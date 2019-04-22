<template>
  <div class="content_wrap">
    <div class="inner_wrap">
      <div class="title_header">
        <strong>陪伴保-{{policyData.insuranceName}}</strong>
        <span :class="computerStatus(policyData.policyStatus)">{{policyData.policyStatusName}}</span>
      </div>
      <div class="info_wrap">
        <div class="message_title">个人保险凭证号:<span>{{policyData.voucherNo}}</span></div>
        
      </div>
      <div class="info_wrap">
        <div class="message_title">被保险人信息:</div>
        <div class="weui_cells_form">
          <div class="weui_cell">
              <span>姓名</span>
              <strong>{{policyDataInsure.name}}</strong>
          </div>
          <div class="weui_cell">
              <span>性别</span>
              <strong>{{policyDataInsure.gender | genderFormat}}</strong>
          </div>
          <div class="weui_cell">
              <span>出生日期</span>
              <strong>{{policyDataInsure.birthday}}</strong>
          </div>
          <div class="weui_cell" v-if="policyDataInsure.idNumber">
              <span>身份证号</span>
              <strong>{{policyDataInsure.idNumber}}</strong>
          </div>
        </div>
      </div>
      <div class="info_wrap">
        <div class="message_title">保障内容：</div>
        <div class="weui_cells_form">
          <div class="weui_cell">
              <span>保障责任</span>
              <strong>{{policyData.scope}}</strong>
          </div>
          <div class="weui_cell">
              <span>保障额度</span>
              <strong>{{policyData.amount}}元</strong>
          </div>
          <div class="weui_cell">
              <span>生效时间</span>
              <strong>{{policyData.policyBeginTime}}</strong>
          </div>
          <div class="weui_cell">
              <span>等待期</span>
              <strong>{{policyData.requirement}}</strong>
          </div>
        </div>
      </div>
      <div class="info_wrap">
        <div class="message_title">保障期间：</div>
        <div class="bottom_line">
          <p>保障有效期至：{{policyData.policyEndTime}}</p>
          <line-bar :diffDays="policyData.diffDays" lineType="2"></line-bar>
          <span>1年</span>
          <p class="tip_p" v-if="policyData.policyStatus==2">保障待生效</p>
          <p class="tip_p" v-if="policyData.policyStatus==3">请在{{policyData.policyEndTime}}前及时延续保障，否则保障将在{{policyData.policyEndTime}}&nbsp;&nbsp;24时失效终止</p>
          <p class="tip_p" v-if="policyData.policyStatus==-12">该保障已于{{policyData.policyEndTime}}&nbsp;&nbsp;24时失效</p>
          <p class="tip_p" v-if="policyData.policyStatus==-11">该保障已于{{policyData.policyEndTime}}&nbsp;&nbsp;24时终止</p>
          <p class="tip_p" v-if="policyData.policyStatus==-21">该保障已于{{policyData.policyEndTime}}&nbsp;&nbsp;24时完成理赔并终止</p>
          <p class="tip_p" v-if="policyData.policyStatus==-22">该保障已于{{policyData.policyEndTime}}&nbsp;&nbsp;24时因解约而终止</p>
          <p class="tip_p" v-if="policyData.policyStatus==-3">保障未生效</p>
        </div>
        <!-- <span class="stamp"></span> -->
      </div>
    </div>
    <div class="text_wrap">
      <p>本产品由光大永明人寿保险有限公司提供，理赔、咨询及其他问题请致电客服热线95348.</p>
    </div>
    <div class="btn_area">
      <a class="weui_btn btn_primary" href="javascript:" id="" @click="completeBtn">完成</a>
    </div>
  </div>
</template>
<script>
import UTILSINDEX from "@/common/util";
import INTERFACE from "@/api/index";
import lineBar from "@/components/linebar/index.js";

const PEIBANBAOINTERFACE = INTERFACE.peibanInsuranceList;
export default {
  data() {
    return {
      policyNo: this.$route.query.policyNo,//保单号
      policyData: {},
      policyDataInsure: {}
    }
  },
  components: {
    lineBar
  },
  computed: {
    computerStatus() {
      return function(a) {
          if (a == 2) {
              return 'code_red';
          } else if (a == 3) {
              return 'code_bzz';
          } else if (a == -12) {
              return 'code_red';
          } else if (a == -11) {
              return 'code_red';
          } else if (a == -21) {
              return 'code_red';
          } else if (a == -22) {
              return 'code_red';
          } else if (a == -3) {
              return 'code_red';
          }
      }
    }
  },
  created() {
    this.$toast("", 2, 100000)
    this.policyListData();
  },
  mounted() {
  },
  methods: {
      policyListData() {
          let that = this;
          PEIBANBAOINTERFACE.policyQueryStaff({
              "voucherNo": this.policyNo
          }).then( res => {
              console.log(res)
              that.policyData = res.data.data;
              that.policyDataInsure = res.data.data.insured;
              that.$toast("", 2, 500)
          })
      },
      completeBtn() {
          let that = this;
          let nethref = encodeURIComponent(window.location.href);
          // 微信获取是否关注公众号
          PEIBANBAOINTERFACE.WXSUBSCRIBEDStaff({}).then( res => {
              
              PEIBANBAOINTERFACE.pinStaff({}).then( pin => {
                  if (pin.data.data == null) {
                      PEIBANBAOINTERFACE.appidStaff({}).then( appi => {
                          const appid = appi.data.data;
                          window.location.href = `${base.login}/user/login.action?appid=${appid}&returnurl=${nethref}`
                      })
                      
                  } else {
                    if (UTILSINDEX.isWeiXin()) { //微信环境
                      if (!res.data.data) {
                          that.$router.push({
                              path: '/guide'
                          })
                      } else {
                          that.$router.push({
                              path: '/personal'
                          })
                      } 
                    } else {
                      that.$router.push({
                          path: '/guide'
                      })
                    }
                      
                  }
                  
              })
              
          })
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
  padding: 0.4rem 0.4rem 2rem 0.4rem;
  // min-height: 20rem;
  .inner_wrap {
    padding: .4rem;
    background: @color-fff;
  }
  .title_header {
    .ftb;
    justify-content: space-between;
    strong {
      font-size: @font-size-md;
    }
    span {
      .wh(1.6rem, .8rem);
      color: @color-text-yellow;
      border: .013333rem solid rgba(255, 190, 0, 0.15);
      line-height: 0.8rem;
      text-align: center;
      border-radius: @border-radius-6;
      &.code_red {
        color: #EF4343;
        border: .013333rem solid rgba(239, 67, 67, 0.35);
      }
      // &.status_wsx {
      //   color: @color-text-yellow;
      //   border: .013333rem solid rgba(255, 190, 0, 0.35);
      // }
      &.code_bzz {
        color: #6EC344;
        border: .013333rem solid rgba(110, 195, 68, 0.35);
      }
    }
  }
  .message_title {
    .ftd(@font-size-base, 1.066667rem);
    font-weight: bold;
    // font-weight: @font-weight-min;
    span {
      float: right;
    }
  }
  .info_wrap {
    width: 8.186667rem;
    // padding: .506667rem .506667rem 0 .506667rem;
    .relative;
    border-bottom: .013333rem solid rgba(91, 30, 2, 0.15);
    // .stamp {
    //   .wh(1.866667rem, 1.866667rem);
    //   .bg-images-inline('zhang@2x.png');
    //   position: absolute;
    //   top: .4rem;
    //   right: 0;
    // }
    &:last-child {
      border-bottom: none;
    }
  }
  .weui_cell {
    .ftb;
    justify-content: space-between;
    line-height: 1.066667rem;
    font-size: @font-size-base;
    span {
      opacity: 0.65;
    }
    strong {
      font-weight: 500;
    }
  }
  .btn_area {
    .weui_btn {
      .wh(10rem, 1.333333rem);
      background: @color-bg-red;
      border: 2px solid rgba(5,5,5,0.08);
      .ftd(@font-size-clg, 1.333333rem);
      color: @color-fff;
      display: block;
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      text-align: center;
    }
    
  }
  .text_wrap {
    padding: .266667rem 0;
    opacity: 0.65;
    font-size: .32rem;
  }
  .bottom_line {
    span {
      display: block;
      text-align: right;
      color: rgba(91, 30, 2, 0.45)
    }
    .tip_p {
      opacity: 0.65;
      font-size: .32rem;
    }
  }
}


</style>