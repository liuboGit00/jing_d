<template>
    <div class="content_wrap">
        <div class="info_wrap">
            <h5>发生下列15种特定疾病，赔付100%保额</h5>
            <ul>
                <li>1.白血病</li>
                <li>2.中枢神经系统恶性肿瘤(含颅内脑实质恶性肿瘤)</li>
                <li>3.心脏瓣膜手术</li>
                <li>4.严重慢性缩窄性心包炎</li>
                <li>5.严重心肌炎</li>
                <li>6.严重重症肌无力</li>
                <li>7.严重脊髓灰质炎</li>
                <li>8.严重哮喘</li>
                <li>9.严重I型糖尿病</li>
                <li>10.严重幼年型类风湿性关节炎</li>
                <li>11.严重川崎病</li>
                <li>12.重症手足口病</li>
                <li>13.骨、关节软骨恶性肿瘤</li>
                <li>14.淋巴瘤</li>
                <li>15.终末期肾病</li>
            </ul>
            <div class="text_wrap">
                <p>具体疾病释义以<a href="保险条款.pdf" target="_black">《保险条款》</a>及<a href="javascript:;">《个人保险凭证》</a>为准</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // pdfurl: require('@/assets/pdf/item.pdf')
        }
    },
    created() {

    },
    methods: {

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
    background: @color-f6;
    color: #5B1E02;
    padding: 0.4rem 0.4rem 2rem 0.4rem;
    .info_wrap {
        width: 8.186667rem;
        padding: .506667rem;
        background: @color-fff;
        border-radius: @border-radius-16;
        h5 {
            .ft(@font-size-md, 1.066667rem);
            font-weight: 600;
        }
        ul {
            li {
                .ftd(@font-size-base, 1.146667rem);
                border-bottom: 1px solid rgba(91, 30, 2, 0.15);
            }
        }
        .text_wrap {
            p {
                .ftd(@font-size-sm, .44rem);
                padding: .133333rem 0;
                color: rgba(91, 30, 2, 0.45);
                a {
                    color: rgba(91, 30, 2, 0.65);
                }
            }
        }
    }
}
</style>
