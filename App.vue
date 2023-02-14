<script>
// #ifdef APP-PLUS
const openIM = uni.requireNativePlugin('Tuoyun-OpenIMSDK');
const event = uni.requireNativePlugin('globalEvent');
console.log('openIM: ', openIM, event);
// #endif
export default {
	onLaunch: function() {
		const IS_FIRST = uni.getStorageSync('isFirst'); // 是否第一次进入
		const IS_TOKEN = uni.getStorageSync('token'); // 获取token
		// 1.非外部跳转
		if (!this.$config.isExternalJump) {
			// 1.1 如果是第一次进页面，则去引导页
			if (!IS_FIRST) {
				uni.reLaunch({
					url: '/pages/guidePage/guidePage'
				});
				return;
			}
			
			// 1.2 判断是否存在token
			if (IS_TOKEN) {
				// 1.2.1 存在token跳转到首页
				uni.reLaunch({
					url: '/pages/home/home'
				});
			} else {
				// 1.2.2 不存在token跳转登录页
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		} else {
			// 2.从外部跳转
			if (!IS_TOKEN) {
				// 2.1 不存在token跳转404
				uni.reLaunch({
					url: '/pages/404/404'
				});
			} else {
				// 2.2 存在token跳转首页
				uni.setStorageSync('token', IS_TOKEN); // 存入token
				uni.reLaunch({
					url: '/pages/home/home'
				});
			}
		}
	},

	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onPageNotFound: function() {
		// 路由不匹配跳转404
		uni.navigateTo({
			url: '/pages/404/404'
		});
	}
};
</script>

<style lang="scss">
/* uview-ui样式 */
@import '@/uni_modules/uview-ui/index.scss';
/* 引入iconfont */
@import '@/static/icon/iconfont.css';
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
page {
	// height: 100%;
	background: transparent;
}
</style>
