<template>
	<view class="home">
		<!-- 用户信息和扫码 -->
		<view class="home-user">
			<!-- 头像 -->
			<view class="user-avatar"></view>
			<!-- 扫一扫 -->
			<view class="scan-code"></view>
		</view>

		<!-- 主体内容 -->
		<view class="home-content">
			<!-- 业务系统 -->
			<view class="business-system">
				<view class="system-item" v-for="item in systemList" :key="item">
					<!-- 图标 -->
					<u--image width="60px" height="60px"></u--image>
					<!-- 名称 -->
					<text></text>
				</view>
			</view>

			<!-- 考务通知 -->
			<view class="examination-notice"></view>

			<!-- 任务跟踪 -->
			<view class="card">
				<!-- 标题 -->
				<view class="card-title">
					<text></text>
					<text></text>
				</view>

				<!-- 上报列表 -->
				<view class="card-list">
					<view class="card-item">
						<!-- 名称 -->
						<text></text>
						<!-- 进度 -->
						<view class="card-progress">
							<view class="card-progress-progress"></view>
							<view class="card-progress-date"></view>
						</view>
					</view>
					<view class="card-item">
						<!-- 名称 -->
						<text></text>
						<!-- 进度 -->
						<view class="card-progress">
							<view class="card-progress-progress"></view>
							<view class="card-progress-date"></view>
						</view>
					</view>
				</view>
			</view>

			<!-- 我的待办 -->
			<view class="card">
				<!-- 标题 -->
				<view class="card-title">
					<text></text>
					<text></text>
				</view>

				<!-- 上报列表 -->
				<view class="card-list">
					<view class="card-item">
						<!-- 名称 -->
						<view class="card-item-top">
							<text></text>
							<text></text>
						</view>
						<!-- 进度 -->
						<view class="card-sponsor">
							<view class="card-sponsor-item"></view>
							<view class="card-progress-date"></view>
						</view>
					</view>

					<view class="card-item">
						<!-- 名称 -->
						<view class="card-item-top">
							<text></text>
							<text></text>
						</view>
						<!-- 进度 -->
						<view class="card-sponsor">
							<view class="card-sponsor-item"></view>
							<view class="card-progress-date"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			systemList: [1, 2, 3, 4, 5, 6]
		};
	}
};
</script>
<style lang="less" scoped>
@loading-grey: #f6f6f6; // 背景颜色
@avatar-color: #ededed; // 头像颜色

.home {
	position: relative;
	background-color: #fff;
	.home-user {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		padding-left: 20rpx;
		padding-top: var(--status-bar-height);
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12);
		z-index: 9999;

		.user-avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			animation-delay: 0.4ms;
		}

		.scan-code {
			width: 70rpx;
			height: 70rpx;
			margin-right: 40rpx;
		}
	}

	.home-content {
		// #ifdef APP-PLUS
		margin-top: 150rpx;
		// #endif

		// #ifdef H5
		margin-top: 100rpx;
		//  #endif
		.business-system {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 20rpx;
			box-sizing: border-box;

			.system-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20rpx 40rpx;
				margin: 10rpx;

				text {
					display: block;
					width: 100%;
					height: 40rpx;
					margin-top: 15rpx;
					animation-delay: 0.6ms;
				}
			}
		}

		.examination-notice {
			height: 80rpx;
		}

		.card {
			margin: 40rpx 0;
			.card-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 25rpx;

				text {
					display: block;
					width: 100rpx;
					height: 40rpx;
				}
			}

			.card-item {
				padding: 40rpx 25rpx;
				margin-bottom: 20rpx;

				text {
					display: block;
					width: 80%;
					height: 60rpx;
					animation-delay: 0.2ms;
				}

				.card-item-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					& :nth-child(1) {
						display: block;
						width: 60%;
						height: 60rpx;
						animation-delay: 0.2ms;
					}
					& :nth-child(2) {
						display: block;
						width: 30%;
						height: 60rpx;
						animation-delay: 0.2ms;
					}
				}

				.card-progress,
				.card-sponsor {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;

					.card-progress-progress {
						width: 60%;
						height: 40rpx;
					}

					.card-progress-date {
						width: 30%;
						height: 40rpx;
					}

					.card-sponsor-item {
						width: 25%;
						height: 40rpx;
					}
				}
			}
		}
	}
}

.home .home-user,
.home .system-item,
.home .examination-notice,
.card,
.card .card-item text,
.card-progress-item,
.card-progress-progress,
.card-progress-date,
.card-sponsor-item {
	background: linear-gradient(
			100deg,
			rgba(255, 255, 255, 0) 40%,
			rgba(255, 255, 255, 0.6) 50%,
			rgba(255, 255, 255, 0) 60%
		)
		@loading-grey;
	background-size: 200% 100%;
	background-position-x: 180%;
	animation: 1s loading ease-in-out infinite;
}
// 光束动画效果
@keyframes loading {
	to {
		background-position-x: -20%;
	}
}

.home .user-avatar,
.home .scan-code,
.home .system-item text,
.card .card-title text,
.card .card-item {
	background-color: @avatar-color;
}
</style>
