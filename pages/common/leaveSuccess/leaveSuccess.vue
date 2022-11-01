<template>
	<view class="page-container">
		<view class="top">
			<u-icon name="arrow-left" size="40" color="#000" @click="backIndex"></u-icon>
			<view style="margin-left: 20rpx;font-weight: 600;" @click="backIndex">返回主页</view>
		</view>
		<view>
			<view class="info">
				<u-row justify="center" customStyle="margin: 10px 0">
				       <u-col span="12" textAlign="center">
				           <view class="demo-layout bg-purple-light"><h4>基本信息</h4></view>
				       </u-col>
				   </u-row>
				 <u-row justify="center" customStyle="margin: 10px 0">
				        <u-col span="6" textAlign="center">
				            <view class="demo-layout bg-purple-light"><h4>学生姓名:</h4></view>
				        </u-col>
				        <u-col span="6">
				            <view class="demo-layout bg-purple">{{ userinfo.name }}</view>
				        </u-col>
				    </u-row>
				    <u-row customStyle="margin: 10px 0">
				        <u-col span="6" textAlign="center">
				            <view class="demo-layout bg-purple-light"><h4>所在学院:</h4></view>
				        </u-col>
				        <u-col span="6">
				            <view class="demo-layout bg-purple">{{ userinfo.deptName }}</view>
				        </u-col>
				    </u-row>
						<u-row customStyle="margin: 10px 0">
						    <u-col span="6" textAlign="center">
						        <view class="demo-layout bg-purple-light"><h4>学生学号:</h4></view>
						    </u-col>
						    <u-col span="6">
						        <view class="demo-layout bg-purple">{{ userinfo.code }}</view>
						    </u-col>
						</u-row>
			</view>
		</view>
		<view class="content">
			<view class="icons">
				<image src="../../../static/code.jpg" mode="" ></image>
			</view>
		</view>
		<view class="text">
			可出行
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
					uni.navigateTo({
						url: '/pages/student/index/index'
					})
		}
	},
	computed: {
		...mapState('m_tabbar', ['tokenType']),
		...mapState('m_user', ['userinfo'])
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
	align-items: center;
	.top {
		flex-basis: 5%;
		display: flex;
		align-items: center;
		align-self: flex-start;
		border-bottom: 1px solid #e0e0e0;
	}
	.info {
		width: 50vw;
		height: 18vh;
		margin: 10vh 0 5vh;
		border-radius: 20px;
		border: 2px solid #e0e0e0;
	}
	.content {
		width: 60vw;
		aspect-ratio: 1/1;
		border: 5px solid #41c300;
		border-radius: 20px;
		position: relative;
		.icons{
			image {
				width: 100%;
				display: block;
				margin: 10px auto;
			}
		}
	}
	.text {
		margin-top: 2vh;
		font-size: 2rem;
		color: #41c300;
	}
}
</style>
