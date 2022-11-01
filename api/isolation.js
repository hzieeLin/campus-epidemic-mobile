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
		url: `/app/feedbackAcceptance/stuAddFeedbackAcceptance`,
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

export function InsertDetail(data) {
	return request({
		url: `/app/isolationDetail/insertDetail`,
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

