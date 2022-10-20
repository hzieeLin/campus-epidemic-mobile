import request from '../../utils/request.js'

export function AddLeave(data) {
	return request({
		url: '/app/leave/addNewLeaveApplication',
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function AddStudentDaily(data) {
	return request({
		url: `/app/studentDaily/addStudentDaily`,
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function DealReturnLeave(data) {
	return request({
		url: `/app/leave/returnLeaveToAdminMessage`,
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}