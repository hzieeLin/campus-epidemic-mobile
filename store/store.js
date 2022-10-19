import Vue from 'vue'
import Vuex from 'vuex'
import moduleTabBar from '@/store/tabbar.js'
import moduleUser from '@/store/user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		'm_tabbar': moduleTabBar,
		'm_user': moduleUser
	}
})
export default store