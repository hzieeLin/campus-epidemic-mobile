<template>
	<view class="page-container">
		<view class="top-notice">notice图片区域</view>
		<view class="content">
			<view class="form-item">
				<view class="form-item-label">健康码上传</view>
				<view class="form-item-content"><u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"></u-upload></view>
			</view>
			<view class="form-item">
				<view class="form-item-label">核酸结果</view>
				<view class="form-item-content">
					<u-radio-group @change="groupChange">
						<u-radio label="阴性" name="0" size="30" :customStyle="{ marginRight: '8px' }"></u-radio>
						<u-radio label="阳性" name="1" size="30" :customStyle="{ marginRight: '8px' }"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view style="color: red;">{{ this.success }}</view>
		</view>
		<view class="btn"><u-button type="primary" @click="uploadFilePromise">提交</u-button></view>
	</view>
</template>

<script>
import { UploadImg } from '../../../api/system.js';
export default {
	data() {
		return {
			fileList: [],
			nucleicAcid: 1,
			success: 0
		};
	},
	methods: {
		groupChange(e) {
			nucleicAcid = e;
		},
		deletePic(event) {
			this.fileList = {};
		},
		async afterRead(event) {
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = event.file;
			this.fileList[0] = lists[0];
		},
		uploadFilePromise() {
			uni.compressImage({
				src: this.fileList[0].url,
				quality: 80,
				success: res => {
					uni.uploadFile({
						url: 'https://49t17g0193.zicp.fun/campus-epidemic-system/pc/system/upload', //仅为示例，非真实的接口地址
						filePath: res.tempFilePath,
						name: 'file',
						header: {
							Authorization: uni.getStorageSync('token')
						},
						success: uploadFileRes => {
							console.log(uploadFileRes);
							this.success = 1;
						}
					})
				}
			})
		}
	}
};
</script>

<style lang="less" scoped>
.page-container {
	width: 100vw;
	height: 95vh;
	background-color: #f1f1f1;
	display: flex;
	flex-direction: column;
	.top-notice {
		flex-basis: 20%;
		// background-color: #33eeee;
	}
	.content {
		flex: 1;
		.form-item {
			height: 100px;
			background-color: #fff;
			margin-bottom: 1vh;
			display: flex;
			flex-direction: column;
			.form-item-label {
				flex-basis: 30%;
				display: flex;
				align-items: center;
			}
			.form-item-content {
				flex: 1;
				display: flex;
				align-items: center;
				padding: 0 4vw;
			}
		}
	}
	.btn {
		flex-basis: 10%;
		padding: 0 10vw 2vh;
	}
}
</style>
