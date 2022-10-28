import request from '../../http/request.js'
//  上班打卡
export function UpDaily(data) {
	return request({
		url: '/app/teacherDaily/upDaily',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}
// 下班打卡
export function DownDaily() {
	return request({
		url: '/app/teacherDaily/downDaily',
		method: 'get',
		header: {'Authorization': uni.getStorageSync('token')}
	})
}
// 防疫人员个人反馈
export function AddEpidemicAppFeedbackAcceptance(data) {
	return request({
		url: '/pc/feedbackAcceptance/addEpidemicFeedbackAcceptance',
		method: 'post',
		header: {'Authorization': uni.getStorageSync('token')},
		data
	})
}