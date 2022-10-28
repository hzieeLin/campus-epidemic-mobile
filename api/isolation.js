import request from '@/http/request.js'

export function GetHistoryList(data) {
	return request({
		url: '/app/isolationDetail/queryPageIsolationDetail',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function AddFeedbackAcceptanceByIsolation(data) {
	return request({
		url: `/app/feedbackAcceptance/addFeedbackAcceptanceByIsolation`,
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function QueryPageFeedbackAcceptanceByIsolation(data) {
	return request({
		url: `/app/feedbackAcceptance/queryPageFeedbackAcceptanceByIsolation`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function QueryIsolationTime() {
	return request({
		url: `/app/isolationDetail/queryIsolationTime`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')}
	})
}