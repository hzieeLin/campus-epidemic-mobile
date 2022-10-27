<template>
	<view class="page-container">
		<view class="top">
			<u-icon name="arrow-left" size="40" color="#000" @click="backIndex"></u-icon>
			<view style="margin-left: 20rpx;font-weight: 600;" @click="backIndex">返回主页</view>
		</view>
		<view class="content">
			<image src="../../../static/subSuccess.png"></image>
			<h4>提交成功</h4>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	methods: {
		backIndex() {
			switch (this.tokenType) {
				case '学生':
					uni.navigateTo({
						url: '/pages/student/index/index'
					})
					break;
				case '防疫人员':
					uni.navigateTo({
						url: '/pages/epidemicPersonnel/index/index'
					})
					break;
				case '隔离人员':
					uni.navigateTo({
						url: '/pages/isolationPersonnel/index/index'
					})
					break;
			}
		}
	},
	computed: {
		...mapState('m_tabbar', ['tokenType'])
	}
};
</script>

<style lang="less" scoped>
.page-container {
	width: 100vw;
	height: 100vh;
	padding-top: 3vh;
	display: flex;
	flex-direction: column;
	.top {
		flex-basis: 5%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #e0e0e0;
	}
	.content {
		flex: 1;
		position: relative;
		image {
			position: absolute;
			top: 30%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 500rpx;
			height: 400rpx;
		}
		h4 {
			position: absolute;
			top: 38%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
