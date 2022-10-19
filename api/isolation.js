import request from '@/utils/request.js'

export function GetHistoryList() {
	return request({
		url: '',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')}
	})
}