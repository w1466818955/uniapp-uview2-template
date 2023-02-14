/*
 * @Author: Ygm
 * @Date: 2022-09-18 21:43:24
 * @LastEditors: Ygm
 * @LastEditTime: 2023-02-07 10:33:54
 * @Description: 请求封装
 */
import config from "./config.js"

// 获取token
const TOKEN = uni.getStorageSync('token');
/**
 *  拦截器
 * @param {*} options
 */
let Interceptor = options => {
	options.url = config.baseURL + options.url;
	options.dataType = options.dataType || 'json';
	options.data = {
		...options.data
	};
	options.header = {
		'token': TOKEN,
		'content-type': 'application/json',
		...options.header,
	};
	options.method = options.method;

	//如果传入loading为true,则显示loadding
	if (options.isloading) {
		uni.showLoading({
			title: '加载中',
			mask: true
		})
	}
	return options;
}

/**
 * 响应器
 * @param {*} res
 */
let Responder = res => {
	uni.hideLoading();
	if (res && res.data) {
		switch (res.data.code) {
			case 200:
				return Promise.resolve(res.data);
			case 400:
				uni.showToast({
					icon: 'error',
					title: '错误请求',
					duration: 2000
				});
				return Promise.reject({
					msg: "错误请求"
				});
			case 403:
				uni.reLaunch({
					url: "/pages/login/login"
				})
				uni.showToast({
					icon: 'error',
					title: '登录失效',
					duration: 2000
				});
				return Promise.reject({
					msg: "登录失效"
				});
			case 404:
				uni.showToast({
					icon: 'error',
					title: '资源加载错误',
					duration: 2000
				});
				return Promise.reject({
					msg: "资源加载错误"
				});
			default:
				uni.showToast({
					icon: 'error',
					title: '请求不存在',
					duration: 2000
				});
				return Promise.reject(res.data);
		}
	}
}

/**
 * 请求
 *
 * */
let request = (options = {}) => {
	options = Interceptor(options);
	//发起请求
	return new Promise((resolve, reject) => {
		// 判断有无网络验证
		uni.getNetworkType({
			success(res) {
				if (res.networkType == 'none') {
					uni.showModal({
						title: '没有网络',
						content: '请检查您的网络',
						showCancel: false,
						success: (res) => {
							uni.hideLoading()
						}
					});
				} else {
					uni.request({
						...options,
						success: res => {
							resolve(Responder(res))
						},
						fail: err => {
							reject(err)
						}
					})

				}
			}
		})

	})
}


export default {
	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return request(options)
	},
	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return request(options)
	}

}
