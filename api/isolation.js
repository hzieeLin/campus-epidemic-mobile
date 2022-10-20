import request from '@/utils/request.js'

export function GetHistoryList() {
	return request({
		url: '/app/isolationDetail/queryPageIsolationDetail',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')}
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