/*
 * @Author: Ygm
 * @Date: 2022-09-18 21:43:24
 * @LastEditors: Ygm
 * @LastEditTime: 2023-02-07 10:33:54
 * @Description: 基本配置
 */
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development' ? true : false; // 判断是否为生成环境

export default {
	isExternalJump: false, // 其他平台跳转
	tabList: [{ name: '账号登录' }, { name: '手机号登录' }],// 登录方式
	baseURL: IS_DEVELOPMENT ? 'http://127.0.0.1:4523/m1/939424-0-default' : 'XXX', // 请求地址
};
