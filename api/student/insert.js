import request from '../../utils/request.js'

export function AddLeave(data) {
	return request({
		url: '/app/leave/addNewLeaveApplication',
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}