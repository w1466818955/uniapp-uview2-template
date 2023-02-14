<template>
	<!-- 引导页 -->
	<view class="guide-page">
		<swiper
			class="guide-page-swiper"
			indicator-dots
			indicator-active-color="#3593ff"
			:current="swiperCurrent"
			@animationfinish="animationfinish"
		>
			<swiper-item class="swiper-item" v-for="item in imgList" :key="item.id">
				<scroll-view scroll-y>
					<u-image width="100%" height="100%" mode="widthFix" :src="item.image"></u-image>
				</scroll-view>
			</swiper-item>

			<swiper-item class="swiper-item">
				<scroll-view scroll-y>
					<u-image width="100%" height="100%" mode="widthFix" src="@/static/images/bg1.png"></u-image>
					<u-button class="now-login" type="primary" text="立即体验" @click="nowLogin"></u-button>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperCurrent: 0,
			imgList: [
				{
					id: 1,
					image: '/static/images/bg1.png'
				},
				{
					id: 2,
					image: '/static/images/bg2.png'
				}
			]
		};
	},
	onShow() {
		// 判断是否已经登录过
		const IS_FIRST = uni.getStorageSync('isFirst');
		if (IS_FIRST) {
			// 跳转到登录页
			uni.navigateTo({
				url: '/pages/login/login'
			});
		}
	},
	methods: {
		animationfinish(e) {
			this.swiperCurrent = e.detail.current;
		},
		// 立即登录
		nowLogin() {
			// 将第一次进入App动作存入缓存
			uni.setStorageSync('isFirst', true);
			// 跳转到登录页
			uni.navigateTo({
				url: '/pages/login/login'
			});
		}
	}
};
</script>

<style lang="scss">
.guide-page {
	position: relative;
	height: 100vh;
	.guide-page-swiper {
		height: 100%;
		.now-login {
			position: absolute;
			bottom: 200rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 300rpx;
		}
	}
}
</style>
