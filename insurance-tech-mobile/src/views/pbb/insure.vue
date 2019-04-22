<template>
  <div class="content_wrap">
    <div class="info_wrap">
      <div class="message_title">信息填写</div>
      <div class="weui_cells_form">
        <div class="weui_cell">
          <div class="label_title">
            <label class="weui_label">我的姓名</label>
          </div>
          <div class="input_wrap">
            <input class="weui_input" placeholder="请输入姓名" v-model="parentName">
          </div>
        </div>
        <div class="weui_cell">
          <div class="label_title">
            <label class="weui_label">我是孩子的</label>
          </div>
          <div class="input_wrap">
            <strong class="list_item" @click="choosePatriarch(1)">
              <a
                href="javascript:;"
                class="weui_btn"
                :class="patriarch===1?'btn_primary':'btn_default'"
              ></a>
              <span>父亲</span>
            </strong>
            <strong class="list_item" @click="choosePatriarch(2)">
              <a
                href="javascript:;"
                class="weui_btn"
                :class="patriarch===2?'btn_primary':'btn_default'"
              ></a>
              <span>母亲</span>
            </strong>
            
          </div>
        </div>
        <div class="weui_cell">
          <div class="label_title">
            <label class="weui_label">我的身份证号</label>
          </div>
          <div class="input_wrap">
            <input class="weui_input" type="text" placeholder="请输入身份证号" v-model="cardNo">
          </div>
        </div>
        <div class="weui_cell">
          <div class="label_title">
            <label class="weui_label">我的联系方式</label>
          </div>
          <div class="input_wrap">
            <input class="weui_input" type="number" placeholder="请输入手机号码" v-model="phoneContact">
          </div>
        </div>
        <div class="weui_cell">
          <div class="label_title">
            <label class="weui_label">孩子姓名</label>
          </div>
          <div class="input_wrap">
            <input class="weui_input" placeholder="请输入姓名" v-model="childName">
          </div>
        </div>
        <div class="weui_cell">
          <div class="label_title">
            <label class="weui_label">孩子性别</label>
          </div>
          <div class="input_wrap">
            <strong class="list_item" @click="chooseGendar(1)">
              <a
                href="javascript:;"
                class="weui_btn"
                :class="gendar===1?'btn_primary':'btn_default'"
                
              ></a>
              <span>男</span>
            </strong>
            <strong class="list_item" @click="chooseGendar(2)">
              <a
                href="javascript:;"
                class="weui_btn"
                :class="gendar===2?'btn_primary':'btn_default'"
                
              ></a>
              <span>女</span>
            </strong>
            
          </div>
        </div>

        <div class="weui_cell" @click="getBirthDay">
          <div class="label_title">
            <label for class="weui_label">出生日期</label>
          </div>
          <div class="input_wrap">
            <span class="wei_span weispan_hui" v-if="birthDate===''">请选择日期</span>
            <span class="wei_span" v-else>{{birthDate}}</span>
            <!-- <input class="weui_input" type="date" v-model="birthDate" @change="chooseDate"> -->
          </div>
        </div>
        <div class="weui_cell" v-if="childCardNoShow">
          <div class="label_title">
            <label class="weui_label">孩子身份证号</label>
          </div>
          <div class="input_wrap">
            <input class="weui_input" type="text" placeholder="请输入身份证号" v-model="childCardNo">
          </div>
        </div>
        <div class="weui_cell">
          <div class="label_title">
            <label for class="weui_label">保障有效期</label>
          </div>
          <div class="input_wrap">
            <span>1个月</span>
          </div>
        </div>
      </div>
    </div>
    <div class="agree_div">
      <label for="weuiAgree" class="weui-agree">
        <input
          id="weuiAgree"
          type="checkbox"
          class="weui-agree__checkbox"
          @click="selectCheckBox($event)"
        >
        <span class="weui-agree__text">
          确认并同意
        </span>
      </label>
    </div>
    
    <div class="text_wrap">
      <p>我是孩子的父母，我承诺：</p>
      <p>一、本人承诺投保信息的真实性，已阅读并同意<a class="pdf_a" href="保险条款.pdf" target="_black">《被保险人监护人须知及声明授权》</a><a class="pdf_a" target="_black" href="保险条款.pdf">《保险条款》</a></p>
      <p>二、本人承诺被保险人（我的孩子）符合下列健康告知的要求，并且理解不如实告知将影响保险合同效力及赔付：</p>
      <ul class="list_text">
        <li>被保险人最近1年内没有因意外事故以外的健康异常发生过住院（不包括鼻炎/急性肠胃炎/肺炎/感冒、发烧但无抽搐、支气管炎等上呼吸道感染）。</li>
        <li>被保险人既往或目前没有下列症状或疾病：抽搐、昏厥、医生诊断不出原因的发热、浮肿、血尿、淋巴结肿大、肝脾肿大、严重贫血、任何包块或肿物；心脏疾病（含先天性的）、肺水肿、哮喘、脊髓灰质炎、风湿性关节炎、肌营养不良、肌无力、脑膜炎、脑炎、癫痫、糖尿病、恶性肿瘤(含癌症、白血病)、原位癌、身体残疾。</li>
        <li>2周岁及以下的被保险人：出生孕周不低于36周、出生体重不低于2公斤、出生时没有窒息/缺氧/脑出血情况、无病理性黄疸、无明确诊断的发育迟缓。</li>
      </ul>
      
    </div>
    <div class="btn_area">
      <a class="weui_btn btn_default no_more" href="javascript:" id="showTooltips" v-if="submitInsureStatus==-2">领光啦，明天早点来哦</a>
      <a class="weui_btn btn_default no_more" href="javascript:" id="showTooltips" v-else-if="submitInsureStatus==-1">产品已售罄，感谢关注</a>
      <button class="weui_btn" :class="haveRead ? 'btn_primary' : 'btn_default'" id="showTooltips" v-else @click="submitInsure">确认并完成</button>
      <!-- <a class="weui_btn" :class="haveRead ? 'btn_primary' : 'btn_default'" href="javascript:" id="showTooltips" v-else @click="submitInsure">确认并完成</a> -->
    </div>

    <model-box :show="modelBoxShow" :title="title" @getDraw="getDrawFun" @closeDraw="closeDrawFun" :type="modelType">
      <p>已经有 <span class="age">{{repeatPerson}}</span> 位同一天出生的 <span class="name">{{childName}}</span> 小朋友正在享受保障，请您确认不是重复投保。</p>
    </model-box>
    <model-box :show="modelBoxShow2" :title="title" @getDraw="getDrawFun2" @closeDraw="closeDrawFun2" :type="modelType2">
      <p>您的孩子正在享受保障中,可返回首页查看保障详情。</p>
    </model-box>

    <!-- <div class="lightbox" id="lightbox"></div>
    <div id="pop" class="pop" style="display: none;">
      <a href="javascript:close()" style="
          position: absolute;
          right: -90px;
          display: inline-block;
          width: 80px;
          height: 30px;
      " id="close">关闭</a>
      <iframe src="" frameborder="0" id="pdfContainer" name="pdfContainer"></iframe>
    </div> -->
  </div>
</template>
<script>

import VERIFY from "@/common/verify";
import UTILSINDEX from "@/common/util";
import INTERFACE from "@/api/index";
import COMMONDATA from '@/common/commonData.js'
import modelBox from '@/components/model/index.js'

// import PDF from '@/assets/pdf/item.pdf'
const PEIBANBAOINTERFACE = INTERFACE.peibanInsuranceList;

export default {
  data() {
    return {
        parentName: "",//我的姓名    
        patriarch: "",//监护人类别
        cardNo: "",//我的身份证号
        phoneContact: "",//联系方式
        childName: "",//孩子姓名
        gendar: "",//孩子性别
        childCardNo: "",//孩子身份证号
        birthDate: "",//出生日期
        birthYear: "",//出生年份
        birthdays: "",//出生天数
        haveRead: false,//已阅读并同意
        childCardNoShow: false, //默认不显示孩子身份证输入
        submitInsureStatus: this.$route.query.pagestate, //按钮状态
        title: "温馨提示", //组件标题
        modelBoxShow: false, //模态框显示隐藏
        modelType: 1, //模态框是否展示领取按钮
        modelBoxShow2: false, //模态框显示隐藏
        modelType2: 0, //模态框是否展示领取按钮
        repeatPerson: 0, //重复的小朋友
        confirm: false, //confirm为true则后台不校验，强制提交保单，为false则后台校验，可能返回重复数
        // pdfurl: require('@/assets/pdf/item.pdf')
    };
  },
  components: {
    modelBox
  },
  created() {

  },
  mounted() {
  },
  methods: {
    getBirthDay() {
      // this.$toast("已完成")
      let birthYear = new Date().getFullYear() - 18;
      let birthMonth = new Date().getMonth() + 1;
      let birthDay = new Date().getDate() + 1;
      let start = birthYear + '-' + birthMonth + '-' + birthDay;
      // let birthday = new Date();
      // birthday.setDate(birthday.getFullYear() - 16);
      // let minTime = birthday.getTime();
      // let start = UTILSINDEX.dateFormat("yyyy-MM-dd", new Date(minTime));
      // console.log(start)

      let date_max = new Date();
      date_max.setDate(date_max.getDate() - 30);
      
      let maxTime = date_max.getTime();
      let end = UTILSINDEX.dateFormat("yyyy-MM-dd", new Date(maxTime));
    
      let that = this;
      weui.datePicker({
            start: start,
            end: end,
            defaultValue: start,
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                result[1] = result[1] < 10 ? '0' + result[1] : result[1];
                result[2] = result[2] < 10 ? '0' + result[2] : result[2];
                that.birthDate = result.join('-');
                console.log(that.birthDate)

                that.birthYear = UTILSINDEX.jsGetAge(that.birthDate);
                // 当前日期
                let nowDate = UTILSINDEX.dateFormat("yyyy-MM-dd", new Date());
                // 出生天数
                that.birthdays = UTILSINDEX.getDays(that.birthDate, nowDate);
    
                if (that.birthYear >= 16) {
                    that.childCardNoShow = true;
                } else {
                    that.childCardNoShow = false;
                }
            }
        });
    },
      chooseDate(e) {
            console.log(e.target.value)
            // 孩子周岁
            this.birthYear = UTILSINDEX.jsGetAge(this.birthDate);
            console.log(this.birthYear)
            // 当前日期
            let nowDate = UTILSINDEX.dateFormat("yyyy-MM-dd", new Date());
            // 出生天数
            this.birthdays = UTILSINDEX.getDays(this.birthDate, nowDate);

            if (this.birthYear >= 16) {
                this.childCardNoShow = true;
            } else {
                this.childCardNoShow = false;
            }
      },
    chooseGendar(g) {
      this.gendar = g;
    },
    choosePatriarch(p) {
      this.patriarch = p;
    },
    selectCheckBox(e) {
      this.haveRead = e.target.checked;
    },
    submitInsure() {
        let that = this;
        if (this.parentName == '') {
            this.$toast("请输入姓名")
            return;
        }
        if (!VERIFY.isTrueName(this.parentName)) {
            this.$toast("请输入正确的姓名")
            return;
        }
        if (this.patriarch == '') {
            this.$toast("请选择父母亲")
            return;
        }
        if (this.cardNo == '') {
            this.$toast("请输入身份证号")
            return;
        }
        if (!VERIFY.isCardNo(this.cardNo)) {
            this.$toast("请输入正确的身份证号")
            return;
        }
        if (this.phoneContact == '') {
            this.$toast("请输入手机号")
            return;
        }
        if (!VERIFY.isMobil(this.phoneContact)) {
            this.$toast("请输入正确的手机号码")
            return;
        }
        if (this.childName == '') {
            this.$toast("请输入孩子姓名")
            return;
        }
        if (!VERIFY.isTrueName(this.childName)) {
            this.$toast("请输入正确的姓名")
            return;
        }
        if (this.gendar == '') {
            this.$toast("请选择孩子性别")
            return;
        }
        if (this.birthDate == '') {
            this.$toast("请选择出生日期")
            return;
        }
        
        
        // if (this.birthdays < 30) {
        //     this.$toast("出生天数少于30天不能投保");
        //     return;
        // }
        
        // if (this.birthYear > 17) {
        //     this.$toast("超过17周岁不能投保")
        //     return;
        // }
        if (this.childCardNoShow && this.childCardNo == '') {
            this.$toast("请输入孩子身份证号")
            return;
        }
        if (this.childCardNoShow && !VERIFY.isCardNo(this.childCardNo)) {
            this.$toast("请输入正确的身份证号")
            return;
        }
        if (this.haveRead == false) {
            this.$toast("请阅读并同意本人承诺")
            return;
        }
        PEIBANBAOINTERFACE.validReceiveStaff({
            "channelCode": COMMONDATA.channelCode,
            "productCode": COMMONDATA.productCode,
            "vendorCode": COMMONDATA.vendorCode
        }).then( valid => {
          if (valid.data.data.repeat) {
            that.$toast("已经领取了")
            if (UTILSINDEX.isWeiXin()) {
              // 微信获取是否关注公众号
              PEIBANBAOINTERFACE.WXSUBSCRIBEDStaff({}).then( gz => {
                if (!gz.data.data) {
                    that.$router.push({
                        path: '/guide'
                    })
                } else if (gz.data.data) { 
                    that.$router.push({
                        path: '/personal'
                    })
                } 
              })
            } else {
              that.$router.push({
                  path: `/guide`
              })
            }
            
          } else {
            if (valid.data.data.stock > 0) {
                PEIBANBAOINTERFACE.insuredStaff({
                    "channelCode": COMMONDATA.channelCode,
                    "confirm": this.confirm,
                    "guardian": {
                        "idNumber": this.cardNo,
                        "mobile": this.phoneContact,
                        "name": this.parentName,
                        "relationInsured": this.patriarch
                    },
                    "insured": {
                        "birthday": this.birthDate,
                        "gender": this.gendar,
                        "idNumber": this.childCardNo,
                        "name": this.childName,
                        "period": 1
                    },
                    "productCode": COMMONDATA.productCode,
                    "vendorCode": COMMONDATA.vendorCode
                }).then( res => {
                  console.log(res)
                  if (res.data.code == 10000) {
                    that.modelBoxShow = true;
                    that.repeatPerson = res.data.data;
                    that.confirm = true;
                  }else if (res.data.code == 10001) {
                    that.modelBoxShow2 = true;
                  } else if (res.data.code == 1 && res.data.data){
                    that.modelBoxShow = false;

                    that.$toast("领取成功",1);
                    setTimeout(function(){
                      that.$router.push({
                          path: `/orderDetails?policyNo=${res.data.data}`
                      })
                    },1000)
                    

                  } else {
                    that.$toast(res.data.msg);
                  }
                  
                })
            } else {
                that.$toast("已经领光了")
            }
          }
            
        })
        
    },
    getDrawFun() {
      
      this.submitInsure();
    },
    closeDrawFun() {
      this.modelBoxShow = false;
    },
    getDrawFun2() {
      this.modelBoxShow2 = false;
    },
    closeDrawFun2() {
      this.modelBoxShow2 = false;
    },
    // pdfShow() {
      
    //   var state = "";
		// 		state = "block";
		// 	console.log(state)
		// 	var pop = document.getElementById("pop");
		// 	pop.style.display = state;
		// 	var lightbox = document.getElementById("lightbox");
		// 	lightbox.style.display = state;
    // }
  }
};
</script>

<style lang="less" scoped>

@import "~@/style/common";
@import "~@/style/mixin";
@import "~@/style/reset";
@import "~@/style/var";
// @import "~@/style/weui.min.css";

.content_wrap {
  background: @color-f6;
  font-size: .373333rem;
  color: #5B1E02;
  padding: 0.4rem 0.4rem 2rem 0.4rem;
  .info_wrap {
    width: 8.186667rem;
    // margin: .4rem;
    padding: .506667rem .506667rem 0 .506667rem;
    background: @color-fff;
    border-radius: @border-radius-16;
    .message_title {
      font-size: @font-size-md;
      font-weight: bold;
    }
    .weui_cell {
      .ftb;
      justify-content: space-between;
      line-height: 1.44rem;
      border-bottom: .013333rem solid rgba(91, 30, 2, 0.15);
      &:last-child {
        border-bottom: none;
      }
    }
    .label_title {
      width: 2.853333rem;
      .weui_label {
        opacity: 0.65;
      }
    }
    .input_wrap {
      width: 5.333333rem;
      justify-content: flex-end;
      .ftb;
      .list_item {
        font-weight: 500;
        .ftb;
        padding-left: .666667rem;
        span {
          padding-left: .133333rem;
          color: #5B1E02;
          font-size: .373333rem;
          // color: rgba(91, 30, 2, 0.75);
        }
      }
      // .wei_span {
      //   display: block;
      //   width: 100%;
      //   height: 0.6rem;
      // }
      .weispan_hui {
        color:rgba(91, 30, 2, 0.15);
      }
      .weui_input {
        width: 100%;
        text-align: right;
        border: none;
        color: #5B1E02;
        font-size: .373333rem;
      }
      .weui_btn {
        .ftb;
        .wh(.613333rem, .613333rem);
        &.btn_default {
        
          .bg-images('anniu_f.png');
        }
        &.btn_primary {
          .bg-images('anniu_t.png');
          
        }
        // span {
        //   .relative;
        //   left: .666667rem;
        //   color: @color-text;
        // }
        // margin-right: 1.333333rem;
      }
      
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
      &.no_more {
        background: #E8E8E8;
        border: none;
        font-size: .48rem;
        color: rgba(0, 0, 0, 0.15);
      }
    }
    .btn_default {
      background: #E8E8E8;
      border: none;
      font-size: .48rem;
      color: rgba(0, 0, 0, 0.15);

    }
    .btn_primary {
      &:active {
        color: #000;
      }
    }
  }
  .list_text {
    li {
      list-style: disc;
      margin-left: .4rem;
    }
  }
  .text_wrap {
    opacity: 0.65;
    font-size: .32rem;
    .pdf_a {
      color: #6D7CE5;
    }
  }
  
}
.weui-agree {
  font-size: @font-size-md;
  padding: .4rem 0 .266667rem 0;
  display: inline;
}

.weui-agree__text {
  font-weight: bold;
}
.agree_div {
  padding: .533333rem 0 .266667rem;
}
</style>
