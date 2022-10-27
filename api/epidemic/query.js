import request from '../../utils/request.js'
// 扫码获取学生的信息以及操作权限
export function GetStuInfo(data) {
	return request({
		url: `/app/student/scanCodeGetStudentInformation`,
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}
// 隔离操作
export function IsolationOperation(data) {
	return request({
		url: '/app/isolationPerson/isolationOperation',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}
// 解除隔离
export function LiftIsolationOperation(data) {
	return request({
		url: '/app/isolationPerson/liftIsolationOperation',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}