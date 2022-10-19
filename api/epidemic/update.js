import request from '../../utils/request.js'
// 同意审批
export function Agree(data) {
	return request({
		url: '/app/feedbackAcceptance/agree',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		params: {...data}
	})
}

export function Reject(data) {
	return request({
		url: '/app/feedbackAcceptance/reject',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		params: {...data}
	})
}

export function UnableDeal(data) {
	return request({
		url: '/app/feedbackAcceptance/unableDeal',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		params: {...data}
	})
}