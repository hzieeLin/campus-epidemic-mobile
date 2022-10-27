<template>
	<view class="page-container">
		<view class="top-list">
			<view class="list-box">
				<view class="list-item">
					<view @click="showDetailVisible = 1">历史记录</view>
					<view>{{topNum}}</view>
				</view>
			</view>
		</view>
		<view class="history-list" v-if="showDetailVisible === 1">
			<view class="list-item" v-for="item in historyList" :key="item.id">
				<view class="item-top">
					<view style="font-weight: 500;">{{ userinfo.name }}的反馈审批单</view>
				</view>
				<view class="item-centent">
					<view>反馈类型：{{ item.type === 1 ? '物质请求' : '意见申诉' }}</view>
					<view>反馈内容：{{ item.message }}</view>
				</view>
				<view class="item-bottom">
					<view>由{{ userinfo.name }}提交</view>
					<view :style="item.result === 1 ? { color: '#00aa00' } : { color: '#ff0000' }">
						<span style="color: #007aff;" v-if="item.result === 0">正在审批</span>
						<span style="color: #00aa00;" v-else-if="item.result === 1">审批通过</span>
						<span style="color: #ff0000;" v-else-if="item.result === 2">审批拒绝</span>
					</view>
				</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { dateFormat } from '../../../utils/date.js';
import askLogo from '../../../components/theLogo/askLogo.vue';
import {QueryPageFeedbackAcceptanceByIsolation} from '@/api/isolation.js'
export default {
	components: {
		askLogo
	},
	data() {
		return {
			topNum: 0,
			topList:[
				{title: '待回复', num: 0},
				{title: '历史记录', num: 0}
			],
			inputValue: '',
			inputDisabled: true,
			showDetailVisible: 1,
			historyList: [],
			charList: [],
			detailList: { id: '1123123213124', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 }
		};
	},
	created() {
		this.getHistoryList();
	},
	methods: {
		getHistoryList() {
			QueryPageFeedbackAcceptanceByIsolation({
				pageNum: 1,
				pageSize: 10
			}).then(res => {
				console.log(res);
				this.topNum = res.total
				res.data.forEach(item => {
					this.historyList.unshift(item)
				})
			})
		}
	},
	computed: {
		...mapState('m_user', ['userinfo'])
	}
};
</script>

<style lang="less" scoped>
.page-container {
	width: 100vw;
	height: 96vh;
	background-color: #f3f3f3;
	display: flex;
	flex-direction: column;
	.top-list {
		width: 100%;
		flex-basis: 10%;
		background-color: #fff;
		border-bottom: 1px solid #e0e0e0;
		.list-box {
			margin-top: 20px;
			background-color: #fff;
			height: 80px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.list-item {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
		/deep/.u-search__content {
			margin-top: 20px;
			height: 80rpx !important;
			.u-icon__icon {
				font-size: 28px;
			}
		}
	}
	.message-list {
		flex: 1;
		background-color: #f3f3f3;
		display: flex;
		flex-direction: column;
		.detail-mid {
			padding: 20upx;
			flex: 1;
			background-color: #fff;
		}
		.message-box {
			height: 48vh;
			overflow: auto;
			.chat-item {
				width: 100%;
				height: 60px;
				display: flex;
				align-items: center;
			}
			.msg {
				border: 1px solid #e0e0e0;
				font-size: 16px;
				padding: 5px;
			}
		}
		.input-box {
			display: flex;
		}
	}
	.history-list {
		flex: 1;
		background-color: #f3f3f3;
		.list-item {
			border-radius: 10px;
			padding: 20upx;
			width: 94%;
			height: 300rpx;
			background-color: #ffffff;
			margin: 10px auto;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.item-top {
				flex-basis: 20%;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.item-centent {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				color: #9b9b9b;
			}
			.item-bottom {
				flex-basis: 20%;
				display: flex;
				justify-content: space-between;
			}
		}
	}
	.detail-box {
		flex: 1;
		background-color: #f3f3f3;
		display: flex;
		flex-direction: column;
		.detail-top {
			flex-basis: 12%;
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 20upx;
			margin: 10px 0;
			position: relative;
			.logo {
				position: absolute;
				right: -5%;
				bottom: -60%;
				transform: translate(-50%, -50%);
			}
		}
		.detail-mid {
			flex: 1;
			padding: 20upx;
			background-color: #ffffff;
		}
		.detail-bottom {
			flex-basis: 20%;
			padding: 20upx;
			margin: 10px 0 0;
			background-color: #ffffff;
		}
	}
}
</style>
