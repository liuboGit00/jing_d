<template>
    <div v-if="show">
        <div class="model_mask"></div>
        <div class="model_wrap">
            <div class="top_content">
                <h5>{{title}}</h5>
                <slot></slot>
            </div>
            
            <div class="bot_button" v-if="type==1">
                <strong @click="closeGetDraw">稍后再来</strong>
                <strong @click="keepGetDraw">继续领取</strong>
            </div>
            <div class="bot_button" v-if="type==0">
                <span @click="closeGetDraw">我知道了</span>
            </div>
        </div>
    </div>
    

</template>

<script>
export default {
    props: [
        'title',
        'show',
        'type'
    ],
    data() {
        return {

        }
    },

    methods: {
        keepGetDraw() {
            this.$emit('getDraw');
        },
        closeGetDraw() {
            this.$emit('closeDraw');
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/style/common";
@import "~@/style/mixin";
@import "~@/style/reset";
@import "~@/style/var";

.model_mask {
    .wh(100%, 100%);
    .modalbg;
}
.model_wrap {
    .ctp;
    width: 7.466667rem;
    background: @color-fff;
    border-radius: @border-radius-16;
    .top_content {
        padding: .4rem;
        p {
            .ft(@font-size-base,.666667rem);
            .age {
                font-family: @font-family-bold;
            }
            .name {
                color: #FEB342;
            }
        }
        h5 {
            .ft(@font-size-clg,1.066667rem);
        }
    }
    .bot_button {
        border-top: .013333rem solid #E5E5E5;
        .fct;
        strong {
            width: 50%;
            .ft(@font-size-md,1.333333rem);
            &:first-child {
                border-right: 1px solid #E5E5E5;
                opacity: 0.65;
            }
        }
        span {
            .ft(@font-size-md,1.333333rem);
        }
    }
}
</style>
