<template>
	<view class="page-container">
		<view class="content-box">
			<view class="top">
				<view ref="upWork" class="title" id="upWork" :style="state === 0 ? 'border-radius: 20px 0 0 20px; background: #346DF4; color: #F7F7F7':'border-radius: 20px 0 0 20px; background: #F7F7F7; color: #161616'" @click="changeType(0)">上班打卡</view>
				<view ref="upWork" class="title" id="upWork" :style="state === 1 ? 'border-radius: 0 20px 20px 0; background: #346DF4; color: #F7F7F7':'border-radius: 0 20px 20px 0; background: #F7F7F7; color: #161616'" @click="changeType(1)">下班打卡</view>
			</view>
			<view class="info">
				<view class="user-avatar">
					<image src="../../../static/account.jpeg"></image>
				</view>
				<view class="user-info">
					<view class="stu-code">工号：{{userinfo.code}}</view>
					<view class="stu-name">学院：{{userinfo.deptName}}</view>
					<view class="stu-name">姓名：{{userinfo.name}}</view>
				</view>
			</view>
			<view class="code-info" v-show="state === 0">
				<view class="form-item-label">健康码上传</view>
				<view class="form-item-content"><u-upload :fileList="fileList" @afterRead="afterRead" name="1" multiple :maxCount="1"></u-upload></view>
				<div style="padding-right: 5vw;">健康码颜色：</div>
				 <u-radio-group @change="groupChange">
				    <u-radio :customStyle="{marginRight: '8px'}" label="绿码" name="0" size="30" labelSize="24"></u-radio>
				    <u-radio :customStyle="{marginRight: '8px'}" label="黄码" name="1" size="30" labelSize="24"></u-radio>
				    <u-radio :customStyle="{marginRight: '8px'}" label="红码" name="2" size="30" labelSize="24"></u-radio>
				</u-radio-group>
			</view>
			<view class="submit-btn">
				<div class="btn" @click="submit">
					<span>{{time}}</span>
					<span>{{handleState}}打卡</span>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState} from 'vuex'
	import { dateFormat} from '../../../utils/date.js'
	import {UpDaily, DownDaily} from '../../../api/epidemic/insert.js'
	export default {
		data() {
			return {
				fileList: [],
				state: 0,
				time: '',
				result: null
			}
		},
		created() {
			setInterval(() => {
				this.time = dateFormat(null,null, 4)
			},1000)
		},
		methods: {
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = event.file;
				this.fileList[0] = lists[0];
			},
			uploadFilePromise() {
				// uni.compressImage({
				// 	src: this.fileList[0].url,
				// 	quality: 80,
				// 	success: res => {
				// 		console.log(res.tempFilePath)
				// 	}
				// })
				uni.uploadFile({
					url: 'https://49t17g0193.zicp.fun/campus-epidemic-system/app/teacherDaily/upDaily', //仅为示例，非真实的接口地址
					filePath: this.fileList[0].name,
					name: 'file',
					formData: {
									'result': this.result
								},
					header: {
						Authorization: uni.getStorageSync('token')
					},
					success: uploadFileRes => {
						console.log(uploadFileRes);
						this.success = 1;
					}
				})
			},
			groupChange(e) {
				this.result = parseInt(e)
				console.log(this.result);
			},
			changeType(i) {
				if (i === 0) {
					this.state = 0
				} else if (i === 1) {
			    this.state = 1			
				}
			},
			submit() {
				if(this.state === 0) {
					this.uploadFilePromise()
					this.state = 3
				} else if(this.state === 1) {
					DownDaily().then(() => {
						this.state = 3
					})
				}
			}
		},
		computed: {
			...mapState('m_user', ['userinfo']),
			handleState() {
				if(this.state === 0) {
					return '上班'
				} else if(this.state === 1) {
					return '下班'
				} else {
					return '已'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.page-container {
	width: 100vw;
	height: 95vh;
	background-color: #fafafa;
	.content-box {
		margin-top: 5vh;
		width: 100%;
		height: 60%;
		// background-color: #e0e0e0;
		display: flex;
		flex-direction: column;
		.top {
			display: flex;
			height: 10%;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			font-weight: bold;
			.title {
				width: 160rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				border: 1px solid #e0e0e0;
			}
		}
		.info {
			margin-top: 1vh;
			flex-basis: 20%;
			background-color: #fff;
			display: flex;
			margin: 0 8vw;
			.user-avatar {
				flex-basis: 40%;
				display: flex;
				align-items: center;
				image {
					margin: 0 40rpx;
					height: 60%;
					width: 50%;
				}
			}
			.user-info {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}
		.code-info {
			margin-top: 20px;
			background-color: #fff;
			width: 100%;
			height: 20vh;
			display: flex;
			flex-direction: column;
			// align-items: center;
			padding-left: 10vw;
		}
		.submit-btn {
			width: 100%;
			height: 30vh;
			position: relative;
			.btn {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 100px;
				height: 100px;
				background: #346DF4;
				color: #fff;
				border-radius: 50%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
			}
		}
	}
}
</style>