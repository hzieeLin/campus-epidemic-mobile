const Token = 'token'

export function getToken() {
	return uni.getStorageSync(Token)
}

export function setToken(token) {
	return uni.setStorageSync(Token, token)
}

export function removeToken(token) {
	return uni.removeStorageSync(Token)
}

export default {getToken, setToken, removeToken }