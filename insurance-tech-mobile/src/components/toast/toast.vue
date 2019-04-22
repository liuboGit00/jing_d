<template>
    <transition name="fade">
         <div class="weui-toast" v-show="show" v-if="type==1">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">{{message}}</p>
        </div>
        <div v-show="show" id="loadingToast" v-else-if="type==2">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <div v-show="show" class="m-toast" v-else>
            <p>{{message}}</p>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                message: '',
                type: ''
            }
        }
    }
</script>

<style lang="less" scoped>
@import "~@/style/weui.min.css";
    .m-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2001;
        display: flex;
        flex-flow: column;
        align-items: center;
        padding: 10px 20px;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .fade-enter-active, .fade-leave-active {
        transition: 0.3s ease-out;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-leave-active {
        opacity: 0;
    }
</style>
