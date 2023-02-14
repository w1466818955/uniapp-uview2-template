/*
 * @Author: Ygm
 * @Date: 2022-09-18 21:43:24
 * @LastEditors: Ygm
 * @LastEditTime: 2023-02-07 10:33:54
 * @Description: 工具函数
 */
/**
 * 身份证号计算年龄 性别  出生日期
 * @param {*} s
 */
export function IdCard(UUserCard) {
	let briday = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12,
		14); //出生日期
	console.log(briday);
	let sex = ''; //性别
	if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
		sex = 2
	} else {
		sex = 1
	}
	let myDate = new Date();
	let month = myDate.getMonth() + 1;
	let day = myDate.getDate();
	let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
	if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <=
		day) {
		age++;
	}
	let ob = {
		briday: briday,
		sex: sex,
		age: age
	}
	return ob;
}

export function formatTen(num) {
	return num > 9 ? (num + "") : ("0" + num);
}

//标准时间转年月日---
export function TimeYY(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour) + ":" + formatTen(minute) +
		":" + formatTen(second);
}

export function TimeYYdAY(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
	var week = weekArray[new Date(date).getDay()];
	let data = {
		year: year,
		month: formatTen(month),
		day: formatTen(day),
		week: week
	}
	return data;
}
//倒计时
export function daojishi(endTime, startTime) {
	let date = endTime - startTime; //时间差  
	let mmsec = date % 1000 //所余毫秒数  
	let seconds = Math.floor(date / 1000 % 60); //所余秒数  
	let minutes = Math.floor(date / 1000 / 60 % 60); //所余分钟数  
	let hour = Math.floor(date / 1000 / 60 / 60 % 24); //所余时钟数  
	let day = Math.floor(date / 1000 / 60 / 60 / 24); //天数  
	return {
		day: day,
		hour: hour,
		minutes: minutes,
		seconds: seconds,
		mmsec: mmsec
	}
}
//计算后多少分钟之后的时间
export function addMinutes(date, minutes) {
	minutes = parseInt(minutes);
	var interTimes = minutes * 60 * 1000;
	interTimes = parseInt(interTimes);
	return new Date(Date.parse(date) + interTimes);
}

//标准时间转年月日
export function TimeDate(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return year.toString().substr(2, 2) + formatTen(month);
}

//获取日期的前十天
export function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
	var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
	return y + "-" + m + "-" + d;
}

// 时间戳转时间
// 时间戳转换成时间
export function timestampToTime(cjsj) {
	var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	var h = date.getHours() + ':'
	var m = date.getMinutes() + ':'
	var s = date.getSeconds()
	return Y + M + D + h + m + s
}
export function timestampToTimes(cjsj) {
	var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	return Y + M + D + h + m
}
