export default {
	namespaced: true,
	state: () => ({
			tokenType: JSON.parse(uni.getStorageSync('tokenType') || 'null')
		}),
		mutations: {
			updateTokenType(state, tokenType) {
				state.tokenType = ''
				state.tokenType = tokenType
				console.log('state.tokenType', state.tokenType)
				console.log('tokenType', tokenType)
				this.commit('m_tabbar/saveTokenTypeToStorage')
			},
			saveTokenTypeToStorage(state) {
				uni.setStorageSync('tokenType', JSON.stringify(state.tokenType))
			}
	}
}