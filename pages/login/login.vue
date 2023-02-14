<!-- 蓝色登录页面2 -->
<template>
	<view class="login">
		<!-- 背景 -->
		<view class="login-bg"></view>

		<!-- 登录 -->
		<view class="login-form">
			<!-- 切换登录方式 -->
			<view class="login-mode-tab">
				<u-tabs
					lineWidth="40px"
					lineHeight="6"
					:activeStyle="{ color: '#3291ff', fontWeight: '900' }"
					:inactiveStyle="{ color: '#949494' }"
					:list="tabList"
					@click="tabClick"
				></u-tabs>
			</view>

			<!-- 登录方式内容 -->
			<view class="login-mode-content">
				<!-- 账号登录 -->
				<loginAccount v-if="loginWay === '账号登录'"></loginAccount>
				<!-- 手机号登录 -->
				<loginMobile v-if="loginWay === '手机号登录'"></loginMobile>
			</view>
		</view>
	</view>
</template>
<script>
import loginAccount from './components/loginAccount.vue';
import loginMobile from './components/loginMobile.vue';
export default {
	components: { loginMobile, loginAccount },
	data() {
		return {
			// 登录方式列表
			tabList: [{ name: '账号登录' }, { name: '手机号登录' }],
			// 登录方式选中
			loginWay: '账号登录'
		};
	},
	onLoad() {
		this.tabList = this.$config.tabList;
	},
	methods: {
		// 登录方式切换
		tabClick(tab) {
			this.loginWay = tab.name;
		}
	}
};
</script>
<style lang="scss" scoped>
.login {
	position: relative;
	height: 100vh;
	overflow: hidden;
	background-color: #fff;
	z-index: 99;

	.login-bg {
		// position: absolute;
		// top: 0;
		width: 100%;
		height: 300rpx;
		overflow: hidden;
		z-index: -1;
	}

	.login-bg:after {
		/* 这个伪类的作用就是一个圆弧的背景色 */
		position: absolute;
		content: '';
		top: 0;
		z-index: -1;
		width: 140%;
		height: 300rpx;
		left: -20%;
		border-radius: 0 0 50% 50%;
		/*分别对应 左上 右上 右下 左下 可以修改成其它颜色*/
		background: linear-gradient(160deg, #1496f1, #79dcfa);
	}

	// 登录
	.login-form {
		padding: 20rpx 40rpx;

		.login-mode-content {
			padding: 40rpx 20rpx 0;
		}
	}
}
</style>
