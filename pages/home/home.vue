<template>
	<view class="home" v-if="true">
		<!-- 用户信息和扫码 -->
		<view class="home-top"></view>

		<!-- 主体内容 -->
		<view class="home-content"></view>
	</view>
	
	<!-- 未拿到数据显示骨架屏 -->
	<homeSkeleton v-else></homeSkeleton>
</template>

<script>
import homeSkeleton from './components/homeSkeleton.vue'; // 自定义骨架屏
import { checkUpdate } from '@/utils/app-update-check.js'; // app更新

export default {
	components: { homeSkeleton },
	data() {
		return {
			loading: true
		};
	},

	onLoad() {
		// 外部链接跳转，则隐藏tabBar
		if (this.$config.isExternalJump) {
			uni.hideTabBar();
		}

		// #ifdef APP-PLUS
		this.getAppInfo(0);
		// #endif
	},
	onPullDownRefresh() {
		//刷新数据之后停止刷新效果
		uni.stopPullDownRefresh();
	},

	methods: {
		// 手动检查更新
		checkIsUpdate() {
			this.getAppInfo(1);
		},
		// 获取线上APP版本信息
		getAppInfo(type) {
			const system_info = uni.getSystemInfoSync();
			//本机设备操作系统（android || ios）
			let params = {
				os: system_info.platform
			};
			//如果不是安卓或ios 返回false
			if (params.os != 'ios' && params.os != 'android') false;

			/* 
				这里自行请求API获取版本信息 建议传入操作系统标识，
				返回本机对应的操作系统最新版本信息，
				也就是安卓的返回就是安卓的版本信息，
				ios返回就是ios的版本信息
			 */
			//请求获取最新版本
			setTimeout(() => {
				let update_info = {
					version: '1.0.2', //线上版本
					now_url: 'https://dldir1.qq.com/weixin/android/weixin802android1860_arm64.apk', //更新链接
					silent: 0, //是否是静默更新
					force: 0, //是否是强制更新
					net_check: 1, //非WIfi是否提示
					note: '<p>1.要改这个字的颜色<p><p>2.需要更新更新呵呵哈哈哈</p><p>3.修复XXXbug</p>' //更新内容
				};
				//检查更新
				checkUpdate(update_info, type).then(res => {
					if (res.msg) {
						plus.nativeUI.toast(res.msg);
					}
				});
			}, 200);
		}
	}
};
</script>
<style lang="scss" scoped>
.home {
}
</style>
