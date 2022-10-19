import request from '../../utils/request.js'

export function getScanInfo() {
	return request({
		url: `/app/student/getUserId`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
	})
}