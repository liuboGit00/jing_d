<template>
    <p class="load_p">正在跳转中。。。</p>
</template>

<script>
import base from '@/api/base'; // 导入接口域名列表
export default {
    created() {
        window.location.href = base.wxauthor;
    }
}
</script>

<style lang="less" scoped>
.load_p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1.333333rem;
}
</style>
