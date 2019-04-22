<template>
    <div class="line_wrap">
        <!-- 个人中心 -->
        <div class="bot_line" v-if="lineType==1" :class="diffDays<=30?'diff_red':diffDays<=90?'diff_orange':'diff_green'">
            <div class="inner_line" :style="{width: diffDays/3.65+'%'}"></div>
            <div class="list">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <!-- 订单页 -->
        <div class="bot_line line_order" v-if="lineType==2" :class="diffDays<=30?'diff_red':diffDays<=90?'diff_orange':'diff_green'">
            <div class="inner_line" :style="{width: diffDays/3.65+'%'}"></div>
            <div class="list">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['lineType','diffDays'],
    data() {
        return {
            
        }
    }
}
</script>

<style lang="less" scoped>
    .line_wrap {
        .bot_line {
            width: 100%;
            height: .32rem;
            background: rgba(255, 255, 255, 0.45);
            border-radius: .16rem;
            overflow: hidden;
            position: relative;
            .inner_line {
                width: 0;
                height: .32rem;
                background: #FF7C18;
            }
            .list {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                span {
                    width: 25%;
                    height: .32rem;
                    border-right: .013333rem solid #fff;
                    opacity: 0.45;
                }
            }
        }
        .diff_red {
            .inner_line {
                background: #EF4343;
            }
        }
        .diff_orange {
            .inner_line {
                background: #ff7200;
            }
        }
        .diff_green {
            .inner_line {
                background: #4ac624;
            }
        }
        .line_order {
            background: #f9f9f9;
            border: .023333rem solid #ccc;
            .list {
                span {
                    border-right: .023333rem solid #ccc;
                }
            }
        }
    } 
</style>
