import request from '../../http/request.js'

export function accountLogin(data) {
	return request({
		url: `/app/user/login`,
		method: 'post',
		data
	})
}