import request from '../utils/request.js'
// 查询全国省份
export function GetProvinceList() {
	return request({
		url: `/pc/province/getProvinceList`,
		method: 'get',
		header: {
		        'Authorization': uni.getStorageSync('token') //自定义请求头信息
		    },
	})
}
// 通过省查市
export function GetCityListByCode(data) {
	return request({
		url: '/pc/city/getCityList',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}
// 通过市查区县
export function GetCountyListByCode(data) {
	return request({
		url: '/pc/county/getCountyList',
		method: 'get',
		data,
		header: {
		        'Authorization': uni.getStorageSync('token') //自定义请求头信息
		    },
	})
}
// 通过区县查街道
export function GetStreetListByCode(data) {
	return request({
		url: '/app/street/queryStreetList',
			method: 'get',
			data,
			header: {
			        'Authorization': uni.getStorageSync('token') //自定义请求头信息
			    },
		})
}

export function UploadImg(data) {
	return request({
		url: `/pc/system/upload`,
		method: 'post',
		data,
		header: {
		        'Authorization': uni.getStorageSync('token')
		    },
	})
}

export function EditPwd(data) {
	return request({
		url: `xxx`,
		method: 'post',
		data,
		header: {
		        'Authorization': uni.getStorageSync('token')
		    }
	})
}