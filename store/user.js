export default {
	namespaced: true,
	state: () => ({
			userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
		}),
		mutations: {
			updateUserInfo(state, userinfo) {
				state.userinfo = ''
				state.userinfo = userinfo
				this.commit('m_user/saveUserInfoToStorage')
			},
			saveUserInfoToStorage(state) {
				uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
			}
	}
}