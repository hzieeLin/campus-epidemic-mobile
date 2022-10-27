import request from '../../utils/request.js'

export function getScanInfo() {
	return request({
		url: `/app/student/getUserId`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
	})
}

//  查询该学生的未读和所有请假数量
export function GetLeaveMessagesNumber() {
	return request({
		url: `/app/leave/queryLeaveMessagesNumber`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
	})
}

// 
export function QueryHistoryList(data) {
	console.log(data)
	return request({
		url: `/app/leave/queryHistoryList`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function QueryLeaveDetail(data) {
	console.log(data)
	return request({
		url: `/app/leave/queryLeaveDetail`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function QueryStreetList(data) {
	return request({
		url: `/app/street/queryStreetList`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function QueryLeaveMessagesNumber() {
	return request({
		url: `/app/leave/queryLeaveMessagesNumber`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')}
	})
}

export function QueryLeaveChat() {
	return request({
		url: `/app/leave/queryLeaveChat`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')}
	})
}