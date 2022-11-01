import request from '../../http/request.js'

export function AddLeave(data) {
	return request({
		url: '/app/leave/addNewLeaveApplication',
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}

export function OutSchool() {
	return request({
		url: '/app/leave/outSchool',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
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

//回校
export function BackSchool(data) {
	return request({
		url: `/app/leave/backSchool`,
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}