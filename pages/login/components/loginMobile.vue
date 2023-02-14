<template>
	<!-- 手机号登录 -->
	<view class="mobile-login">
		<form class="login-form-tel">
			<view class="uni-form-item uni-column">
				<text>手机号：</text>
				<u-input placeholder="请输入手机号" v-model="userInfo.account" maxlength="11" type="number" clearable />
			</view>
			<view class="uni-form-item uni-column">
				<view class="form-item-left">
					<text>验证码：</text>
					<u-input
						class="item-input"
						placeholder="请输入验证码"
						v-model="userInfo.pwd"
						type="number"
						maxlength="4"
						password-icon="true"
					/>
				</view>
				<u-code ref="uCode" seconds="10" @change="codeChange"></u-code>
				<u-button
					type="primary"
					class="get-code-btn"
					:text="tips"
					:disabled="codeDisabled"
					@tap="getCode"
				></u-button>
			</view>
			<view class="login-btn"><u-button type="primary" shape="circle" class="btn" text="登录"></u-button></view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 登录信息
			userInfo: {
				account: null,
				pwd: null
			},
			tips: '', // 验证码提示
			codeDisabled: false // 是否禁用验证码发送
		};
	},

	methods: {
		// 改变内容
		codeChange(text) {
			this.tips = text;
			this.codeDisabled = text === '获取验证码' || text === '重新获取' ? false : true;
		},
		// 获取验证码
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				});
				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					uni.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 2000);
			} else {
				uni.$u.toast('倒计时结束后再发送');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
// 登录
.mobile-login {
	.uni-form-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 40rpx;
		.form-item-left {
			display: flex;
			align-items: center;
			.item-input {
				margin-right: 15rpx;
			}
		}

		.get-code-btn {
			width: 200rpx;
			height: 74rpx;
			margin: 0;
		}
	}

	.login-btn {
		display: flex;
		justify-content: center;
		margin-top: 100rpx;
		.btn {
			width: 500rpx;
		}
	}
}
</style>
