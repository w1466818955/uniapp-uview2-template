/*
 * @Author: Ygm
 * @Date: 2022-09-18 21:43:24
 * @LastEditors: Ygm
 * @LastEditTime: 2023-02-07 10:33:54
 * @Description: 登录相关接口
 */
import http from "@/http/request.js"

// 登录
const login = (data = {}) => {
	return http.post('/pet', data, {
		isloading: true
	})
}

export default {
	login
}
