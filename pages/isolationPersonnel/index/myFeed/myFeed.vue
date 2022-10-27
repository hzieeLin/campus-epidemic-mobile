<template>
	<view class="page-container">
		<view class="feed-box">
			<u-notify ref="uNotify" message="反馈类型不能为空!"></u-notify>
			<view class="top-item">
				<h4>反馈类型:</h4>
				<view style="margin: 2vh 0;">
					<u-radio-group @change="groupChange">
						<u-radio label="物质反馈" name="1" size="30" labelSize="24" :customStyle="{ marginLeft: '20px', marginRight: '30px'}"></u-radio>
						<u-radio label="意见反馈" name="2" size="30" labelSize="24" :customStyle="{ marginRight: '8px' }"></u-radio>
					</u-radio-group>
				</view>
				<h4>反馈内容:</h4>
				<u--textarea style="margin: 2vh 0;" v-model="feedInfo.message" confirmType="done" placeholder="请输入您需要反馈的内容" height="140"></u--textarea>
			</view>
			<view><u-button type="primary" @click="submit">提交</u-button></view>
		</view>
	</view>
</template>

<script>
import { AddFeedbackAcceptanceByIsolation } from '@/api/isolation.js';
export default {
	onReady() {
	},
	data() {
		return {
			feedInfo: {
				type: null,
				message: ''
			},
			show: false
		};
	},
	methods: {
		groupChange(e) {
			this.feedInfo.type = e;
		},
		submit() {
			if (this.feedInfo.type === null) {
				this.$refs.uNotify.show({
					top: 10,
					type: 'error',
					color: '#ffffff',
					bgColor: '#ff0000',
					message: '反馈类型不能为空',
					duration: 1000 * 3,
					fontSize: 20,
					safeAreaInsetTop: true
				});
				console.log(1);
				this.show = true;
			} else if(this.feedInfo.message === '') {
				this.$refs.uNotify.show({
					top: 10,
					type: 'error',
					color: '#ffffff',
					bgColor: '#ff0000',
					message: '反馈内容不能为空',
					duration: 1000 * 3,
					fontSize: 20,
					safeAreaInsetTop: true
				});
			} else {
				AddFeedbackAcceptanceByIsolation(this.feedInfo).then(() => {
					uni.navigateTo({
						url: '/pages/common/subSuccess/subSuccess'
					})
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.page-container {
	width: 100vw;
	height: 96vh;
	display: flex;
	justify-content: center;
	.feed-box {
		margin-top: 5vh;
		width: 80%;
	}
}
</style>
