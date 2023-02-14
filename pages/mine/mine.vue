<template>
	<view class="mine">
		<view class="mine-bottom">
			<u-button type="primary" text="退出登录" @click="signOut"></u-button>
			<u-button text="检查更新" @click="checkIsUpdate"></u-button>
		</view>
	</view>
</template>

<script>
import { checkUpdate } from '@/utils/app-update-check.js'; // app更新

export default {
	data() {
		return {};
	},

	methods: {
		// 退出登录
		signOut() {
			uni.removeStorageSync('token'); // 清除token
			uni.reLaunch({
				url: '/pages/login/login'
			});
		},

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

<style lang="scss">
.mine {
	display: flex;
	align-items: center;
	justify-content: center;
	.mine-bottom {
		width: 50%;
	}
}
</style>
