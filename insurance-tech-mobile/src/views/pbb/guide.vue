<template>
    <div class="content_wrap">
        <!--  :style="{height: windowH + 'px'}" -->
        <h5>陪伴保 | 关注"小东老师"微信公众号查看详情</h5>
        <div class="message_info">
            <div class="inner_info">
                <div class="top_img"></div>
                <div class="center_div">
                    <div class="inner_center" :style="{height: centerH + 'px'}">
                        <h6>致每位家长的一封信</h6>
                        <p class="left_p">尊敬的家长，您好</p>
                        
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;恭喜您成功领取10万元少儿疾病保险，成为"陪伴保"大家庭成员。</p>
                        <div class="flex_box"></div>
                        <div class="inner_img"></div>
                        <div class="flex_box"></div>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;幸福千万条，陪伴第一条。"陪伴家人、关爱子女"是我们倡导的生活价值观，关注"小东老师"微信公众号，查看保障详情、获取更多福利。</p>
                        <!-- <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> -->
                    </div>
                </div>
                <div class="bot_div" ref="botHight">
                    <img class="ewm_img" src="@/assets/img/pbb/jqbewm_small.jpg" alt="">
                    <div class="text_p">
                        <p>给孩子更多陪伴，为宝贝健康护航</p>
                        <p>京东数科-保险科技</p>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        <img class="ewm_imgbig" src="@/assets/img/pbb/jqbewm_big.jpg" alt="">
    </div>
</template>
<script>
export default {
    data() {
        return {
            windowH: window.innerHeight,
            centerH: ''
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.querySelector('body').setAttribute('style', 'height:100%;overflow:hidden')
        }
    },
    mounted() {
        this.centerH = this.windowH - this.$refs.botHight.offsetHeight;
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>

// @import "~@/style/weui.min.css";
@import "~@/style/common";
@import "~@/style/mixin";
@import "~@/style/reset";
@import "~@/style/var";
.content_wrap {
    // background: @color-f6;
    color: @color-text;
    height: 100%;
    // height: 30rem;
    h5 {
        .ft(@font-size-md, 1.84rem);
        font-weight: bold;
        position: relative;
        z-index: 9;
    }
    
    .message_info {
        .wh(10rem, 14.253333rem);
        // .bg-images('xinfen@2x.png');
        // .absbottom;
        .ftd(@font-size-base, .533333rem);
        .inner_info {
            .inner_img {
                width: 6.826667rem;
                height: 4.026667rem;
                .bg-images('zhanshi8@2x.png');
                display: block;
                margin: 0 auto 0.2rem;
            }
            .left_p {
                line-height: .6rem;
            }
            h6 {
                .ft(@font-size-md, 1.333333rem);
                font-weight: bold;
            }
            .right_p {
                text-align: right;
                line-height: .6rem;
            }
            .top_img {
                .wh(10rem, .24rem);
                .bg-images('xinfen@2x_01.png');
            }
            .center_div {
                width: 100%;
                background: url('~@/assets/img/pbb/xinfen@2x_02.png') repeat-y center;
                background-size: 100%;
                .inner_center {
                    padding: .4rem .8rem;
                    // height: 20rem;
                    p {
                        position: relative;
                        z-index: 10;
                    }
                }
            }
            .bot_div {
                .wh(10rem, 4.866667rem);
                .bg-images('xinfen@2x_03.png');
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                .text_p {
                    position: absolute;
                    bottom: .693333rem;
                    right: 1rem;
                    text-align: right;
                }
                .ewm_img {
                    .wh(2rem, 2rem);
                    position: absolute;
                    bottom: .693333rem;
                    left: .4rem;
                }
                
            }
        }
        
    }
    .ewm_imgbig {
        .wh(100%, 100%);
        .allcover();
        z-index: 20;
        opacity: 0;
    }
}


</style>
<style>
@media screen and (max-aspect-ratio:10/14){
    .flex_box {
        height: 0;
        /* background: black; */
    }

}

@media screen and (max-aspect-ratio:10/16){
    .flex_box {
        height: .266667rem;
        /* background: orange; */
    }

}

@media screen and (max-aspect-ratio:10/18){
    .flex_box {
        height: 1.333333rem;
        /* background: blue; */
    }

}

@media screen and (max-aspect-ratio:10/20){
    .flex_box {
        height: 1.466667rem;
        /* background: yellow; */
    }

}

/* iphoneX */
@media screen and (max-aspect-ratio:10/21){ 
    .flex_box {
        /* background: red; */
        height: 1.6rem;
    }

}
</style>