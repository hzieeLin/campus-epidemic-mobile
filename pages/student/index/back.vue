<template>
	<view class="page-container">
		<view class="top-notice">
			<view>各位同学：目前部分省市出现了阳性病例，疫情防控形势严峻。请各位同学克服麻痹思想和侥幸心理，非必要不出校。</view>
			<view>=======================</view>
			<view>请假规则： 务必仔细阅读</view>
			<view>若钉钉请假时间为4月3日 12:00-14:00，</view>
			<view>（1）出校时间有效范围：</view>
			<view>4月3日 11:00-13:00之间，道闸自动开启。</view>
			（2）回校时间有效期范围：当天15:00点之前。
			请各位同学按照规定时间内回校，超时需要手动销假的同学，将列入黑名单，限制下次请假。
			<view>=======================</view>
			**特别提醒**请进出校园之前，检查核酸报告的有效时间（当前是72小时内）。
			<view>谎报、虚报将承担相应的法律责任。</view>
		</view>
		<view class="content">
			<!-- <view class="form-item">
				<view class="form-item-label">健康码上传</view>
				<view class="form-item-content"><u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"></u-upload></view>
			</view> -->
			<view class="form-item">
				<view class="form-item-label">核酸结果</view>
				<view class="form-item-content">
					<u-radio-group @change="groupChange">
						<u-radio label="阴性" name="0" size="40" :customStyle="{ marginRight: '8px' }"></u-radio>
						<u-radio label="阳性" name="1" size="40" :customStyle="{ marginRight: '8px' }"></u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="btn"><u-button type="primary" @click="backSchool">提交</u-button></view>
	</view>
</template>

<script>
import { BackSchool } from '@/api/student/insert.js';
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
			this.nucleicAcid = e;
		},
		deletePic(event) {
			this.fileList = {};
		},
		backSchool() {
			const data = {
				nucleicAcid: this.nucleicAcid
			}
			BackSchool(data).then(res => {
														uni.navigateTo({
															url: '/pages/common/leaveSuccess/leaveSuccess'
														})
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
			height: 30%;
			margin-bottom: 1vh;
			padding: 0 10rpx;
			overflow: auto;
			background-color: #f1f1f1;
			color: #868686;
	}
	.content {
		flex: 1;
		.form-item {
			width: 90%;
			margin: 5vh auto 0;
			height: 100px;
			background-color: #fff;
			display: flex;
			border-radius: 10px;
			flex-direction: column;
			padding: 10px 10px;
			.form-item-label {
				flex-basis: 30%;
				display: flex;
				align-items: center;
			}
			.form-item-content {
				flex: 1;
				display: flex;
				align-items: center;
				padding: 0 0;
			}
		}
	}
	.btn {
		flex-basis: 10%;
		padding: 0 10vw 2vh;
	}
}
</style>
