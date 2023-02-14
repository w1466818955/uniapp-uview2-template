<template>
	<view class="login-account">
		<view class="t-login">
			<form class="cl">
				<view class="t-a">
					<text class="txt">账号</text>
					<input type="text" name="account" placeholder="请输入您的账号" v-model="userInfo.account" />
				</view>
				<view class="t-a">
					<text class="txt">密码</text>
					<input
						class="uni-input-input pwd-input"
						name="code"
						maxlength="18"
						placeholder="请输入您的密码"
						:type="pwdType"
						v-model="userInfo.pwd"
					/>
					<i
						v-if="userInfo.pwd"
						style="font-size: 20px;color: #909399;"
						:class="{ iconfont: true, 'icon-open': isShowPwd, 'icon-close': !isShowPwd }"
						@click="changePwd"
					/>
				</view>

				<button @tap="login()">登 录</button>
				<!-- <view class="reg" @tap="reg()">注 册</view> -->
			</form>

			<view class="t-f"><text>—————— 第三方账号登录 ——————</text></view>
			<view class="t-e cl">
				<view class="t-g" @tap="wxLogin()"><image src="@/static/images/qq.png"></image></view>
				<view class="t-g" @tap="zfbLogin()"><image src="@/static/images/wx.png"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isShowPwd: false,
			pwdType: 'password',
			userInfo: {
				account: '', //账号
				pwd: '' //密码
			}
		};
	},
	onLoad() {},
	methods: {
		//当前登录按钮操作
		login() {
			const { account, pwd } = this.userInfo;
			if (!account) {
				uni.showToast({ title: '请输入您的手机号', icon: 'none' });
				return;
			}
			if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(account)) {
				uni.showToast({ title: '请输入正确手机号', icon: 'none' });
				return;
			}
			if (!pwd) {
				uni.showToast({ title: '请输入您的密码', icon: 'none' });
				return;
			}

			// 登录请求
			this.$api
				.login(this.userInfo)
				.then(res => {
					uni.setStorageSync('token', '123466');
					let timer = setTimeout(() => {
						clearTimeout(timer);
						uni.switchTab({
							url: '/pages/home/home'
						});
					}, 600);
					uni.showToast({
						title: '登录成功',
						duration: 2000
					});
					console.log('res: ', res);
				})
				.catch(err => {
					uni.setStorageSync('token', '123466');
					uni.switchTab({
						url: '/pages/home/home'
					});
					this.$u.toast('登录失败');
				});
		},
		//注册按钮点击
		reg() {
			uni.showToast({ title: '注册跳转', icon: 'none' });
		},
		//微信登录
		wxLogin() {
			uni.showToast({ title: '微信登录', icon: 'none' });
		},
		//支付宝登录
		zfbLogin() {
			uni.showToast({ title: '支付宝登录', icon: 'none' });
		},
		// 密码显示隐藏
		changePwd() {
			console.log('this.isShowPwd: ', this.isShowPwd);
			this.isShowPwd = !this.isShowPwd;
			this.pwdType = this.isShowPwd ? 'text' : 'password';
		}
	}
};
</script>

<style lang="scss" scoped>
.login-account {
	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
	}

	.t-login button {
		font-size: 28rpx;
		background: #2796f2;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
	}

	.t-login input,
	.pwd-input {
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		border-bottom: 1px solid #e9e9e9;
		font-size: 28rpx;
	}

	.t-login .t-a {
		position: relative;
	}

	.iconfont {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.t-b {
		text-align: left;
		font-size: 42rpx;
		color: #ffffff;
		padding: 180rpx 0 0 70rpx;
		font-weight: bold;
		line-height: 70rpx;
	}

	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}

	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 50%;
	}

	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx;
	}

	.t-login .t-f {
		text-align: center;
		margin: 150rpx 0 0 0;
		color: #666;
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}

	.t-login .uni-input-placeholder {
		color: #aeaeae;
	}

	.cl {
		zoom: 1;
	}

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
}
</style>
