<template>
	<view class="page-container">
		<view class="top-list">
			<view class="list-box">
				<view class="list-item">
					<view @click="showDetailVisible = 1">我的隔离时间</view>
					<view>2022-05-01至2022-09-01</view>
				</view>
			</view>
		</view>
		<view class="history-list" v-if="showDetailVisible === 1">
			<view class="list-item" v-for="item in historyList" :key="item.id">
				<view class="item-top">
					<view>{{ item.startTime }}</view>
				</view>
				<view class="item-centent">
					<view>体温：{{ item.isRemember === 1 ? '正常' : '异常' }}</view>
					<view>核酸：{{ item.isRemember === 1 ? '阳性' : '阴性' }}</view>
				</view>
				<view class="item-bottom">
				</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { GetHistoryList} from '@/api/isolation.js'
export default {
	data() {
		return {
			topNum: 0,
			inputValue: '',
			inputDisabled: true,
			showDetailVisible: 1,
			historyList: [
				{ id: '1123123213124', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213122', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213123', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 0 },
				{ id: '1123123213144', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213144', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213144', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213144', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213144', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213144', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213144', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 },
				{ id: '1123123213125', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 0 }
			],
			detailList: { id: '1123123213124', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 }
		};
	},
	created() {
		this.getHistoryList();
	},
	methods: {
		getHistoryList() {
			GetHistoryList({
				pageNum: 1,
				pageSize: 14
			}).then(res => {
				this.historyList = res.data
				this.total = res.total
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
			height: 160rpx;
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
