<template>
	<div id="app">
		<Layout>
			<router-view/>
		</Layout>
	</div>
</template>

<script>
	import Layout from "@/layouts";
	export default {
		name: "App",
		components: {
			Layout
		}
	};
</script>

<style lang="less" scoped>
@import "~@/style/common";
@import "~@/style/mixin";
@import "~@/style/reset";
@import "~@/style/var";
    @import "~@/assets/iconfont/iconfont.css";
    #app {
        font-size: @font-size-base;
		    color: @color-text;
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "SF UI Text",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    }
</style>
