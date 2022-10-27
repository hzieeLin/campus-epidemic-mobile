<template>
	<view class="page-container">
		<view style="height: 4vh;"></view>
		<swiper class="swiper" circular indicator-dots autoplay interval="4000" duration="2000">
			<swiper-item>
				<view class="swiper-item"><image src="../../../static/b1.jpg" style="width: 100%;border-radius: 10px;" mode=""></image></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"><image src="../../../static/b2.png" style="width: 100%;border-radius: 10px;" mode=""></image></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"><image src="../../../static/b3.png" style="width: 100%;border-radius: 10px;" mode=""></image></view>
			</swiper-item>
		</swiper>
		<view class="func-box">
			<view class="func-item">
				<view class="inner-box" @click="openPage(0)">
					<u-icon name="checkmark-circle-fill" color="#00aa00" class="phone-icon" size="70"></u-icon>
					<view class="func-title">日常打卡</view>
					<view class="func-remark">隔离健康打卡</view>
				</view>
			</view>
			<view class="func-item">
				<view class="inner-box" @click="openPage(1)">
					<u-icon name="minus-square-fill" color="#ffaa00" class="phone-icon" size="70"></u-icon>
					<view class="func-title">隔离记录</view>
					<view class="func-remark">查看隔离记录</view>
				</view>
			</view>
			<view class="func-item">
				<view class="inner-box" @click="openPage(2)">
					<u-icon name="bag-fill" color="#00aaff" class="phone-icon" size="70"></u-icon>
					<view class="func-title">个人反馈</view>
					<view class="func-remark">返校审批入口</view>
				</view>
			</view>
			<view class="func-item">
				<view class="inner-box" @click="openPage(3)">
					<u-icon name="chat-fill" color="#ff0000" class="phone-icon" size="70"></u-icon>
					<view class="func-title">消息通知</view>
					<view class="func-remark">反馈信息入口</view>
				</view>
			</view>
		</view>
		<TabBar></TabBar>
	</view>
</template>

<script>
import TabBar from '../../../components/tabbar/tabbar.vue';
export default {
	components: {
		TabBar
	},
	data() {
		return {};
	},
	methods: {
		openPage(i) {
			switch (i) {
				case 0:
					uni.navigateTo({
						url: '/pages/isolationPersonnel/index/openCard/openCard'
					});
					break;
				case 1:
					uni.navigateTo({
						url: '/pages/isolationPersonnel/index/record/record'
					});
					break;
				case 2:
					uni.navigateTo({
						url: '/pages/isolationPersonnel/index/myFeed/myFeed'
					});
					break;
				case 3:
					uni.navigateTo({
						url: '/pages/isolationPersonnel/index/message'
					});
					break
			}
		}
	}
};
</script>

<style lang="less" scoped>
.page-container {
	width: 100vw;
	height: 100vh;
	background-color: #fafafa;
	.top-nav {
		width: 100%;
		height: 6vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
	}
	.swiper {
		width: 100%;
		height: 24vh;
		.swiper-item {
			width: 95%;
			height: 100%;
			margin: 0 auto;
		}
	}
	.func-box {
		margin-top: 2vh;
		width: 100%;
		height: 30%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.func-item {
			width: 50%;
			height: 240rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.inner-box {
				position: relative;
				width: 90%;
				height: 90%;
				background-color: #fff;
				border: 1px solid #e0e0e0;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				.phone-icon {
					flex-basis: 50%;
					color: aqua;
					padding-left: 20rpx;
				}
				.func-title {
					flex-basis: 30%;
					font-weight: bold;
					padding-left: 20rpx;
				}
				.func-remark {
					flex: 1;
					color: #838383;
					font-size: 14rpx;
					padding-left: 20rpx;
				}
				.red-circle {
					position: absolute;
					top: 10%;
					left: 90%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}
}
</style>
