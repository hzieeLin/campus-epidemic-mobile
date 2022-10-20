<template>
	<view class="page-container">
		<view class="top-list">
			<view class="list-box">
				<view class="list-item">
					<view @click="showDetailVisible = 3">待回复</view>
					<view>0</view>
				</view>
				<view class="list-item" style="visibility: hidden;">
					<view>已处理</view>
					<view>{{topList[0].num}}</view>
				</view>
				<view class="list-item">
					<view @click="showDetailVisible = 1">历史记录</view>
					<view>{{topList[1].num}}</view>
				</view>
			</view>
		</view>
		<view class="history-list" v-if="showDetailVisible === 1">
			<view class="list-item" v-for="item in historyList" :key="item.id" @click="showDetail(item.id)">
				<view class="item-top">
					<view style="font-weight: 500;">{{ userinfo.name }}的请假审批单</view>
					<!-- <view>{{getTime}}</view> -->
				</view>
				<view class="item-centent">
					<view>当前时间：{{ item.updateTime }}</view>
				</view>
				<view class="item-bottom">
					<view>由{{ item.name }}提交</view>
					<view >{{leaveResults(item.approvalResult)}}</view>
				</view>
			</view>
		</view>
		<view class="message-list" v-else-if="showDetailVisible === 3">
			<view class="detail-mid" v-show="topList[0].num == 0">
				<view>审批编号</view>
				<view>{{ detailList.id }}</view>
				<view>信息相关</view>
				<view>学生-{{ userinfo.deptName }}-{{ userinfo.majorName }}-{{ userinfo.className }}</view>
				<view>请假类型</view>
				<view>{{detailList.type === 0 ? '事假' : '病假'}}</view>
				<view>预计出校时间</view>
				<view>{{detailList.estimateStartTime}}</view>
				<view>预计返校校时间</view>
				<view>{{detailList.estimateEndTime}}</view>
				<view>请假去向</view>
				<view>{{}}</view>
				<view>请假原因</view>
				<view>{{detailList.reason}}</view>
			</view>
			<scroll-view scroll-y="true" :scroll-top="topNum" class="message-box" ref="msgBox" id="msgId">
				<view v-if="topList[0].num == 0">
					<view v-for="(item, index) in charList" :key="item.id">
						<view>{{item.time}}</view>
						<view v-if="item.type === 1 || item.type === 3 || item.type === 2" style="text-align: center">{{ item.createTime }}</view>
						<view class="chat-item" :style="item.type === 1 || item.type === 3 ? 'flex-direction: row-reverse;' : 'flex-direction: row;'">
							<u-icon></u-icon>
							<view class="msg" :style="item.type === 1 || item.type === 3  ? 'margin-right: 10px;background: #00aaff; color: #fff' : 'margin-left: 10px;'">{{ item.message }}</view>
						</view>
					</view>
				</view>
				<view v-else style="text-align: center;">
				</view>
			</scroll-view>
			<view class="input-box" v-show="topList[0].num == 0">
				<u--input placeholder="请输入内容" border="surround" v-model="inputValue"></u--input>
				<view><u-button type="primary" :disabled="inputDisabled" @click="dealReturnLeave">发送</u-button></view>
			</view>
		</view>
			
		<view v-else class="detail-box">
			<view class="detail-top">
				<view>
					<view>{{ detailList.name }}的请假审批单</view>
					<view>杭州电子科技大学信息工程学院</view>
				</view>
				<view >{{ leaveResults(detailList.approvalResult)}}</view>
				<view class="logo"><askLogo :type="detailList.approvalResult"></askLogo></view>
			</view>
			<view class="detail-mid">
				<view>审批编号</view>
				<view>{{ detailList.id }}</view>
				<view>信息相关</view>
				<view>学生-{{ userinfo.deptName }}-{{ userinfo.majorName }}-{{ userinfo.className }}</view>
				<view>请假类型</view>
				<view>{{detailList.type === 0 ? '事假' : '病假'}}</view>
				<view>预计出校时间</view>
				<view>{{detailList.estimateStartTime}}</view>
				<view>预计返校校时间</view>
				<view>{{detailList.estimateEndTime}}</view>
				<view>请假去向</view>
				<view>{{}}</view>
				<view>请假原因</view>
				<view>{{detailList.reason}}</view>
			</view>
			<view class="detail-bottom">
				<view>流程</view>
				<u-steps direction="column" current="2">
					<u-steps-item title="发起申请" :desc="detailList.name"></u-steps-item>
					<u-steps-item title="审批人" desc="管理员"></u-steps-item>
				</u-steps>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { dateFormat } from '../../../utils/date.js';
import askLogo from '../../../components/theLogo/askLogo.vue';
import { DealReturnLeave } from '@/api/student/insert.js'
import {GetLeaveMessagesNumber, QueryHistoryList, QueryLeaveDetail, QueryStreetList} from '@/api/student/query.js'
export default {
	components: {
		askLogo
	},
	created() {
		this.getMsgList();
		this.getHistoryList();
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
			showDetailVisible: 3,
			queryInfo: {
				pageNum: 1,
				pageSize: 14
			},
			historyList: [],
			charList: [],
			detailList: {}
		};
	},
	mounted() {
		this.scroolBottom()
	},
	watch: {
		inputValue(newVal, oldVal) {
			console.log(newVal, oldVal);
			if (newVal !== '') {
				this.inputDisabled = false;
			} else {
				this.inputDisabled = true;
			}
		}
	},
	updated() {
		this.scroolBottom()
	},
	methods: {
		scroolBottom() {
				let info = uni.createSelectorQuery().in(this).select('.message-box');
				info.boundingClientRect(data => {
					this.topNum = data.bottom
				}).exec();
		},
		leaveResults(code) {
			if(code === 1) {
				return `同意`
			}else if(code === 2) {
				return `拒绝`
			}else {
				return `待处理`
			}
		},
		showDetail(id) {
			this.showDetailVisible = 2;
			QueryLeaveDetail({id: id}).then(res => {
				this.detailList = res
				this.charList = res.process
				console.log(this.charList)
				//this.queryStreetList(res.target)
			})
		},
		getMsgList() {
			GetLeaveMessagesNumber().then(res => {
				this.topList.splice(0, 1, {title: '待回复', num: res.unReadNum})
				this.topList.splice(1, 1, {title: '历史记录', num: res.allNum})
			})
		},
		getHistoryList() {
			QueryHistoryList(this.queryInfo).then(res => {
				console.log(res);
				this.historyList = res.data
			})
		},
		queryStreetList(code) {
			QueryStreetList({code: code}).then(res => {
				console.log(code)
			})
		},
		dealReturnLeave() {
			  const data = {
			    id: this.detailList.id,
			    message: this.inputValue
			  }
			  DealReturnLeave(data).then(() => {
					this.scroolBottom()
			    this.inputValue = ''
					this.showDetail(this.detailList.id)
					this.showDetailVisible = 3
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
