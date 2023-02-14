/*
 * @Author: Ygm
 * @Date: 2022-09-18 21:43:24
 * @LastEditors: Ygm
 * @LastEditTime: 2023-02-07 10:33:54
 * @Description: 正则校验
 */

/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
	return /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(s)
}

/**
 * 用户名
 * @param {*} s
 */
export function isUserName(s) {
	return /^[a-zA-Z0-9\u4e00-\u9fa5]{2,30}/.test(s)
}

/**
 * 密码
 * @param {*} s 只能输入6-16位,必须包括数字、字母、特殊字符其中两种
 */
export function isPwd(s) {
	return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\\(\\)])+$)([^(0-9a-zA-Z)]|[\\(\\)]|[a-z]|[A-Z]|[0-9])[^\\u4e00-\\u9fa5]{6,16}$/
		.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
	return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
	return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证号
 * @param {*} s
 */
// export function isID (s) {
//   return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(s)
// }
export function isID(id) {
	// 1 "验证通过!", 0 校验不通过
	var format =
		/^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
	//号码规则校验
	if (!format.test(id)) {
		return false;
	}
	//区位码校验
	//出生年月日校验   前正则限制起始年份为1900;
	var year = id.substr(6, 4), //身份证年
		month = id.substr(10, 2), //身份证月
		date = id.substr(12, 2), //身份证日
		time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
		now_time = Date.parse(new Date()), //当前时间戳
		dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
	if (time > now_time || date > dates) {
		return false;
		//return {'status':0,'msg':'出生日期不合规'}
	}
	//校验码判断
	var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
	var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
	var id_array = id.split("");
	var sum = 0;
	for (var k = 0; k < 17; k++) {
		sum += parseInt(id_array[k]) * parseInt(c[k]);
	}
	if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
		return false;
		//return {'status':0,'msg':'身份证校验码不合规'}
	}
	return true;
}
