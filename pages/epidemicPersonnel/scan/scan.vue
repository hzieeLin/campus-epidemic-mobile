<template>
	<view>
		<u-overlay :show="show" opacity="0.8">
			<view class="scan-center">
				<u-icon name="close" color="#fff" class="icons" @click="handleClone" ></u-icon>				
				<view class="fun-box">
					<view class="msg-box">
						<h4>学生基本信息</h4>
						<view class="msg-item"><view class="title">学号:</view><view>{{stuInfo.code}}</view></view>
						<view class="msg-item"><view class="title">姓名:</view><view>{{stuInfo.name}}</view></view>
						<view class="msg-item"><view class="title">专业:</view><view>{{stuInfo.majorName}}</view></view>
						<view class="msg-item"><view class="title">班级:</view><view>{{stuInfo.className}}</view></view>
						<view class="msg-item"><view class="title">手机号:</view><view>{{stuInfo.phone}}</view></view>
					</view>
					<view>
						<view style="display: flex;justify-content: space-around;">
							<view class="func-item" @click="handleIsolation">进行隔离</view>
							<view class="func-item" @click="handleLiftIsolation">解除隔离</view>
							<!-- <view class="func-item">添加记录</view> -->
						</view>
					</view>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	import {GetStuInfo, IsolationOperation, LiftIsolationOperation} from '../../../api/epidemic/query.js'
	export default {
		onLoad(option) {
			console.log(option.id);
			this.userId = option.id
			this.userTime = option.time
			this.getStuInfo()
		},
		data() {
			return {
				show: true,
				userId: '',
				userTime: '',
				stuInfo: {
					code: '',
					name: '',
					majorName: '',
					className: '',
					phone: ''
				}
			}
		},
		methods: {
			getStuInfo() {
				const data = {
					id: this.userId,
					time: this.userTime
				}
				console.log(data);
				GetStuInfo(data).then((res) => {
					console.log(res);
					this.stuInfo.code = res.data.code
					this.stuInfo.name = res.data.name
					this.stuInfo.majorName = res.data.majorName
					this.stuInfo.className = res.data.className
					this.stuInfo.phone = res.data.phone
				})
			},
			handleIsolation() {
				const data = {
					id: this.userId
				}
				IsolationOperation(data).then((res) => {
					uni.showToast({
							title: `隔离成功！`,
							icon: 'success',
							duration: 2000
					});
					this.handleClone()
				})
			},
			handleLiftIsolation() {
				const data = {
					id: "1562791600331968514"
					
				}
				IsolationOperation(data).then((res) => {
					uni.showToast({
							title: `解除成功！`,
							icon: 'success',
							duration: 2000
					});
					this.handleClone()
				})
			},
			handleClone() {
				this.show = false
				uni.navigateTo({
					url: `/pages/epidemicPersonnel/index/index`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.scan-center {
	width: 100vw;
	height: 100vh;
	position: relative;
	.icons {
		position: absolute;
		top: 5%;
		right: 2%;
		transform: translate(-50%, -50%);
	}
	.fun-box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80vw;
		height: 50vh;
		.msg-box {
			width: 100%;
			height: 50%;
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			.msg-item {
				width: 80%;
				display: flex;
				padding: 0 10%;
				.title {
					flex-basis: 30%;
				}
			}
		}
		.func-item {
			width: calc(25vw - 2px);
			height: calc(10vh - 2px);
			color: #fff;
			text-align: center;
			line-height: 10vh;
			border: 1px solid #fff;
		}
	}
}
</style>
