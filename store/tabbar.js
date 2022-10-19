export default {
	namespaced: true,
	state: () => ({
			tokenType: JSON.parse(uni.getStorageSync('tokenType') || '[]')
		}),
		mutations: {
			updateTokenType(state, tokenType) {
				state.tokenType = ''
				state.tokenType = tokenType
				this.commit('m_tabbar/saveTokenTypeToStorage')
			},
			saveTokenTypeToStorage(state) {
				uni.setStorageSync('tokenType', JSON.stringify(state.tokenType))
			}
	}
}