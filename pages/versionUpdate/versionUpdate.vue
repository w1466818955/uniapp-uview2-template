<template>
	<view class="page-height">
		<view class="page-content">
			<view class="wrap" v-if="popupShow">
				<view class="popup-bg">
					<view class="popup-content" :class="{ 'popup-content-show': popupShow }">
						<view class="update-wrap">
							<image src="@/static/images/img.png" class="top-img"></image>
							<view class="content">
								<text class="title">发现新版本V{{ update_info.version }}</text>
								<!-- 升级描述 -->
								<view class="title-sub" v-html="update_info.note"></view>
								<!-- 升级按钮 -->
								<button class="btn" v-if="downstatus < 1" @click="onUpdate()">立即升级</button>
								<!-- 下载进度 -->
								<view class="sche-wrap" v-else>
									<!-- 更新包下载中 -->
									<view class="sche-bg">
										<view class="sche-bg-jindu" :style="lengthWidth"></view>
									</view>
									<text class="down-text">
										下载进度: {{ (downSize / 1024 / 1024).toFixed(2) }}M/{{
											(fileSize / 1024 / 1024).toFixed(2)
										}}M
									</text>
								</view>
							</view>
						</view>
						<image
							src="@/static/images/close.png"
							class="close-ioc"
							@click="closeUpdate()"
							v-if="downstatus < 1 && update_info.force == 0"
						></image>
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
			popupShow: true,
			update_info: null, //上一页面传过来的升级参数
			note: [], //升级说明数组格式
			fileSize: 0, //文件大小
			downSize: 0, //已下载大小
			downing: false, //是否下载中
			downstatus: 0 //0未下载  1已开始 2已连接到资源  3已接收到数据  4下载完成
		};
	},
	onLoad(option) {
		if (option.updata_info) {
			this.update_info = JSON.parse(option.updata_info);
			this.note = this.update_info.note.split('\n'); //版本说明
		} else {
			plus.nativeUI.toast('参数出错');
			setTimeout(() => {
				uni.navigateBack();
			}, 500);
		}
	},
	onBackPress(e) {
		if (e.from == 'backbutton') return true; //APP安卓物理返回键逻辑
	},
	computed: {
		// 下载进度计算
		lengthWidth: function() {
			let w = (this.downSize / this.fileSize) * 100;
			if (!w) {
				w = 0;
			} else {
				w = w.toFixed(2);
			}
			return {
				width: w + '%' //return 宽度半分比
			};
		},
		getHeight: function() {
			let bottom = 0;
			if (this.tabbar) {
				bottom = 50;
			}
			return {
				bottom: bottom + 'px',
				height: 'auto'
			};
		}
	},
	methods: {
		// 当点击更新时
		onUpdate() {
			//判断是否为WIFI网络 并且是非强制更新
			if (this.update_info.net_check == 1 && this.update_info.force == 0) {
				//判断是否为wifi模式
				uni.getNetworkType({
					success: res => {
						if (res.networkType == 'wifi') {
							this.startUpdate(); //开始更新
						} else {
							uni.showModal({
								title: '提示',
								content: '当前网络非WIFI,继续更新可能会产生流量,确认要更新吗？',
								success: modal_res => {
									if (modal_res.confirm) {
										this.startUpdate(); //开始更新
									}
								}
							});
						}
					}
				});
			} else {
				this.startUpdate(); //开始更新
			}
		},
		//开始更新
		startUpdate() {
			if (this.downing) return false; //如果正在下载就停止操作
			this.downing = true; //状态改变 正在下载中
			if (/\.apk$/.test(this.update_info.now_url)) {
				// 如果是apk地址
				this.download_wgt(); // 安装包/升级包更新
			} else if (/\.wgt$/.test(this.update_info.now_url)) {
				// 如果是更新包
				this.download_wgt(); // 安装包/升级包更新
			} else {
				plus.runtime.openURL(this.update_info.now_url, function() {
					//调用外部浏览器打开更新地址
					plus.nativeUI.toast('打开错误');
				});
			}
		},
		// 下载升级资源包
		download_wgt() {
			plus.nativeUI.showWaiting('下载更新文件...'); //下载更新文件...
			let options = {
				method: 'get'
			};
			let dtask = plus.downloader.createDownload(this.update_info.now_url, options);
			dtask.addEventListener('statechanged', (task, status) => {
				if (status === null) {
				} else if (status == 200) {
					//在这里打印会不停的执行，请注意，正式上线切记不要在这里打印东西!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					this.downstatus = task.state;
					switch (task.state) {
						case 3: // 已接收到数据
							plus.nativeUI.closeWaiting();
							this.downSize = task.downloadedSize;
							if (task.totalSize) {
								this.fileSize = task.totalSize; //服务器须返回正确的content-length才会有长度
							}
							break;
						case 4:
							this.installWgt(task.filename); // 安装
							break;
					}
				} else {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.toast('下载出错');
					this.downing = false;
					this.downstatus = 0;
				}
			});
			dtask.start();
		},
		// 安装文件
		installWgt(path) {
			plus.nativeUI.showWaiting('安装更新文件...'); //安装更新文件...
			plus.runtime.install(
				path,
				{},
				function() {
					plus.nativeUI.closeWaiting();
					// 应用资源下载完成！
					plus.nativeUI.alert('更新完成,请重启APP！', function() {
						plus.runtime.restart(); //重启APP
					});
				},
				function(e) {
					plus.nativeUI.closeWaiting();
					// 安装更新文件失败
					plus.nativeUI.alert('安装更新文件失败[' + e.code + ']：' + e.message);
				}
			);
		},
		// 取消更新
		closeUpdate() {
			uni.setStorageSync('update_ignore', this.update_info.version);
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
.page-height {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgba($color: #000000, $alpha: 0.7);
}

.popup-bg {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 750rpx;
}

.popup-content {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.popup-content-show {
	animation: mymove 300ms;
	transform: scale(1);
}

@keyframes mymove {
	0% {
		transform: scale(0);
		/*开始为原始大小*/
	}

	100% {
		transform: scale(1);
	}
}

.update-wrap {
	width: 480rpx;
	border-radius: 18rpx;
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	padding: 170rpx 30rpx 0;

	.top-img {
		position: absolute;
		left: 0;
		width: 100%;
		height: 256rpx;
		top: -128rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 40rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #6526f3;
		}

		.title-sub {
			padding: 30rpx 0;
			text-align: left;
			font-size: 24rpx;
			color: #666666;
		}

		.btn {
			width: 460rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-size: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 100px;
			background-color: #6526f3;
			margin-top: 20rpx;
		}
	}
}

.close-ioc {
	width: 70rpx;
	height: 70rpx;
	margin-top: 30rpx;
}

.sche-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	padding: 10rpx 50rpx 0;

	.sche-wrap-text {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 20rpx;
	}

	.sche-bg {
		position: relative;
		background-color: #cccccc;
		height: 30rpx;
		border-radius: 100px;
		width: 480rpx;
		display: flex;
		align-items: center;

		.sche-bg-jindu {
			position: absolute;
			left: 0;
			top: 0;
			height: 30rpx;
			min-width: 40rpx;
			border-radius: 100px;
			background: url(@/static/images/round.png) #5775e7 center right 4rpx no-repeat;
			background-size: 26rpx 26rpx;
		}
	}

	.down-text {
		font-size: 24rpx;
		color: #5674e5;
		margin-top: 16rpx;
	}
}
</style>
