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
export default {
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
			charList: [
				{
					id: '1567525304736440321',
					type: 1,
					message: '测试同城同天但是信誉不好',
					time: '2022-09-07 22:48:51'
				},
				{
					id: '1567541947143307265',
					type: 2,
					message: '你在想什么？？？',
					time: '2022-09-07 23:54:58'
				},
				{
					id: '1567552449290559490',
					type: 3,
					message: '你在狗叫什么？？？',
					time: '2022-09-08 00:36:42'
				},
				{
					id: '1567553439133716482',
					type: 2,
					message: '你再叫叫试试？？',
					time: '2022-09-08 00:40:38'
				},
				{
					id: '1567553516225024001',
					type: 3,
					message: '你废了！不让学生请假！！',
					time: '2022-09-08 00:40:57'
				},
				{
					id: '1567553619274878977',
					type: 2,
					message: '你敢骂老师！你前途没有了！！',
					time: '2022-09-08 00:41:21'
				},
				{
					id: '1567553708282204162',
					type: 3,
					message: '你给我提前途，我们不能出校就有前途了？？',
					time: '2022-09-08 00:41:42'
				},
				{
					id: '1568443311276978177',
					type: 2,
					message: '真的想笑',
					time: '2022-09-10 11:36:40'
				},
				{
					id: '1568445099719790593',
					type: 2,
					message: '怎么不说话了？？',
					time: '2022-09-10 11:43:47'
				},
				{
					id: '1568445144489791489',
					type: 2,
					message: '你聋吗？',
					time: '2022-09-10 11:43:57'
				},
				{
					id: '1568445320155631618',
					type: 2,
					message: '还不讲话是不是想死阿\n',
					time: '2022-09-10 11:44:39'
				},
				{
					id: '1568445640294273025',
					type: 2,
					message: '真的',
					time: '2022-09-10 11:45:56'
				},
				{
					id: '1568446064925609985',
					type: 2,
					message: '111',
					time: '2022-09-10 11:47:37'
				},
				{
					id: '1568451718667046913',
					type: 2,
					message: '1',
					time: '2022-09-10 12:10:05'
				},
				{
					id: '1568516197631135745',
					type: 2,
					message: '2',
					time: '2022-09-10 16:26:18'
				},
				{
					id: '1568516409795809281',
					type: 2,
					message: '3',
					time: '2022-09-10 16:27:08'
				},
				{
					id: '1568516433787228162',
					type: 2,
					message: '4',
					time: '2022-09-10 16:27:14'
				},
				{
					id: '1568516447892672514',
					type: 2,
					message: '5',
					time: '2022-09-10 16:27:17'
				},
				{
					id: '1568519875494678530',
					type: 4,
					message: '同意',
					time: '2022-09-10 16:40:55'
				}
			],
			detailList: { id: '1123123213124', name: '张三', isRemember: 1, startTime: '2022-09-22 00:00:00', result: 1 }
		};
	},
	methods: {
		getHistoryList() {
			// GetHistoryList().then(res => {
			// 	this.historyList = res.data
			// 	this.total = res.total
			// })
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
