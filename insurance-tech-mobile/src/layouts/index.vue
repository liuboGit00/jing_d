<template>
	<div class="layout-container">
        <slot></slot>
    </div>
</template>

<script>

import UTILSINDEX from '@/common/util.js'
import INTERFACE from '@/api/index.js'
import base from '@/api/base'; // 导入接口域名列表

const PEIBANBAOINTERFACE = INTERFACE.peibanInsuranceList;

export default {
	name: "Layout",
	data() {
		return {

		}
	},
	components: {},
	created() {
		const netStr = base.share;
		const shareTitle = "快来领取您孩子的专属保障吧";
		const shareDesc = "价值10万元的少儿疾病保障金，保障15种少儿常见大病，7天超短等待期";
		const shareImg = base.shareImg;

		let that = this;
		
		// 微信分享
		PEIBANBAOINTERFACE.WXJSSDKStaff(netStr).then(res => {
			wx.config({
				// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: res.data.data.appId, // 必填，公众号的唯一标识
				timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
				nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
				signature: res.data.data.signature,// 必填，签名
				jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表
			});
			wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
				wx.updateAppMessageShareData({ 
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: netStr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg, // 分享图标
					success: function () {
						console.log("分享成功了")
						// 设置成功
					}
				})
				wx.updateTimelineShareData({ 
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: netStr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 设置成功
						console.log("朋友圈分享成功")
					}
				})
				wx.onMenuShareTimeline({ 
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: netStr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 设置成功
						console.log("朋友圈分享成功2")
					}
				})

				wx.onMenuShareAppMessage({ 
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: netStr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 设置成功
						console.log("朋友圈分享成功2")
					}
				})
				wx.onMenuShareQQ({ 
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: netStr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 设置成功
						console.log("朋友圈分享成功2")
					}
				})
				wx.onMenuShareWeibo({ 
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: netStr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 设置成功
						console.log("朋友圈分享成功2")
					}
				})
				wx.onMenuShareQZone({ 
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: netStr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 设置成功
						console.log("朋友圈分享成功2")
					}
				})
			});	
		})

		// 微信获取用户信息
		// PEIBANBAOINTERFACE.WXUSERINFOStaff({}).then( res => {
		// 	console.log(res)
		// })

		
		// window.location.href=`http://jrvchat.jd.com/pbb/sns/to/oauth?url=http://ttxapi.jd.com`
		// http://jrvchat.jd.com/pbb/config/sign?url=http://jdpbb.jd.com/insure

	},
	mounted() {
		
	}
};
</script>


<style lang="less" scoped>
	.layout-container {
		max-width: 10rem;
		margin: 0 auto;
	}
</style>
