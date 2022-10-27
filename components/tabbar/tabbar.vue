<template>
	<view class="uni-tabbar">
		<u-tabbar :fixed="true">
			<u-tabbar-item text="功能页" icon="home" @click="click"></u-tabbar-item>
			<u-tabbar-item text="扫一扫" icon="scan" @click="click" v-show="tokenType!=='隔离人员'"></u-tabbar-item>
			<u-tabbar-item text="个人中心" icon="account-fill" @click="click"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>
<script>
import {mapState} from 'vuex'
export default {
	name:"tabbar",
	data() {
		return {
			list: [],
			tabbar: [],
			stuPath: ['/pages/student/index/index','/pages/student/scan/scan','/pages/student/my/my'],
			epidemicPath: ['/pages/epidemicPersonnel/index/index', '/pages/epidemicPersonnel/scan/scan', '/pages/epidemicPersonnel/my/my'],
			isolationPath: ['/pages/isolationPersonnel/index/index', '/pages/isolationPersonnel/scan/scan', '/pages/isolationPersonnel/my/my']
		}
	},
	mounted() {
		switch(this.tokenType) {
			case '学生':
					this.tabbar = [...this.stuPath]
					break
			case '防疫人员':
					this.tabbar = [...this.epidemicPath]
					break
			case '隔离人员':
					this.tabbar = [...this.isolationPath]
					break
		}
	},
	methods: {
		click(e) {
			switch(e) {
				case 0:
					uni.navigateTo({
						url: this.tabbar[0]
					})
					break
				case 1:
					uni.scanCode({
							success: res => {
									let rst = res.result
									switch(this.tokenType) {
										case '学生':
												break
										case '防疫人员':
												console.log('ret',JSON.stringify(res.result))
												uni.navigateTo({
													url: `/pages/epidemicPersonnel/scan/scan?id=${rst.split(',')[0]}&time=${rst.split(',')[1]}`
												})
												break
										case '隔离人员':
												break
									}
							 }
					 });
					break
				case 2:
					uni.navigateTo({
						url: this.tabbar[2]
					})
			}
		}
	},
	computed: {
		...mapState('m_tabbar', ['tokenType'])
	}
}
</script>
