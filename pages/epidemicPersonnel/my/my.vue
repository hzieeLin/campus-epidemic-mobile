<template>
	<view class="page-container">
		<view class="top">
			<view class="img-avatar">
				<image class="img" src="../../../static/man.jpeg" v-if="userinfo.sex == '1'"></image>
				<image class="img" src="../../../static/weman.jpeg" v-else></image>
			</view>
			<view class="userinfo">
				<view class="info">
					<view class="stu-name">{{ userinfo.name }}</view>
					<view class="stu-dept">{{ userinfo.deptName }}</view>
					<view class="stu-code">{{ userinfo.code }}</view>
				</view>
			</view>
			<view class="more">
				<u-icon
					name="more-dot-fill"
					size="40"
					@click="
						showType = true;
						uni.hideKeyboard();
					"
				></u-icon>
			</view>
		</view>
		<view class="btn-list" v-if="showTwoScan">
			<view class="my-calendar"><uni-calendar class="uni-calendar--hook" :showMonth="true" :selected="info.selected" @change="change" /></view>
		</view>
		<u-modal :show="showEditPwd" title="修改密码" :showCancelButton="true" @cancel="showEditPwd = false" @confirm="handleEditPwd">
			<view>
				<u-row>
					<u-col span="4">新密码</u-col>
					<u-col span="8"><u--input placeholder="填写原密码" type="password" border="surround" v-model.trim="pwdInfo.password"></u--input></u-col>
				</u-row>
				<u-gap height="40" bgColor="#fff"></u-gap>
				<u-row>
					<u-col span="4">重密码</u-col>
					<u-col span="8"><u--input placeholder="填写新密码" type="password" border="surround" v-model.trim="pwdInfo.passwordRepeat"></u--input></u-col>
				</u-row>
			</view>
		</u-modal>
		<u-action-sheet :show="showType" :actions="actions" @close="showType = false" @select="TypeSelect"></u-action-sheet>
		<TabBar></TabBar>
	</view>
</template>

<script>
import UQRCode from 'uqrcodejs';
import TabBar from '../../../components/tabbar/tabbar.vue';
import { EditPwd } from '../../../api/system.js';
import { dateFormat } from '../../../utils/date.js';
import { mapState, mapMutations } from 'vuex';
import { QueryTeacherDailyHistory } from '@/api/epidemic/query.js';
export default {
	components: {
		TabBar
	},
	data() {
		return {
			list: {
				code: '',
				name: ''
			},
			showTwoScan: true,
			showEditPwd: false,
			currentTime: '',
			scanInfo: '',
			pwdInfo: {
				password: '',
				passwordRepeat: ''
			},
			info: {
				selected: []
			},
			showType: false,
			actions: [{ name: '修改密码', value: 0 }, { name: '退出登录', value: 1 }, { name: '取消', value: 2 }]
		};
	},
	created() {
		setInterval(() => {
			this.getCurrentTime();
		}, 1000);
		this.queryIsUpDaily();
	},
	methods: {
		...mapMutations('m_tarbar', ['updateTokenType']),
		changeShowScan() {
			this.getStuInfo();
			this.showTwoScan = !this.showTwoScan;
		},
		getCurrentTime() {
			this.currentTime = dateFormat(null, null, 3);
		},
		queryIsUpDaily() {
			const data = {
				code: this.userinfo.code
			};
			QueryTeacherDailyHistory(data).then(res => {
				this.info.selected = [];
				res.forEach(item => {
					this.info.selected.push({
						date: dateFormat(item.createTime, null, 6),
						info: '已打卡'
					});
				});
				console.log(res);
			});
		},
		TypeSelect(e) {
			console.log(e.value);
			if (e.value == 0) {
				this.showEditPwd = true;
			} else if (e.value == 1) {
				this.loginOut();
			} else {
				this.showType = false;
			}
		},
		handleEditPwd() {
			EditPwd(this.pwdInfo).then(res => {
				this.showEditPwd = false;
				uni.showToast({
					title: `密码修改成功！`,
					icon: 'success',
					duration: 2000
				});
			});
		},
		loginOut() {
			uni.setStorageSync('token', null);
			uni.setStorageSync('userinfo', null);
			uni.navigateTo({
				url: `/pages/account/login/login`
			});
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
	height: 100vh;
	background: #e0e0e0;
	.top {
		width: 100%;
		height: 24%;
		background-color: #fff;
		display: flex;
		position: relative;
		.more {
			position: absolute;
			top: 0;
			right: 5%;
		}
		.img-avatar {
			flex-basis: 28%;
			display: flex;
			align-items: center;
			justify-content: center;
			.img {
				width: 80%;
				height: 44%;
			}
		}
		.userinfo {
			flex-basis: 56%;
			display: flex;
			align-items: center;
			justify-content: start;
			.info {
				padding-left: 1rem;
				width: 80%;
				height: 50%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.stu-name {
					font-size: 1.2rem;
					font-weight: bold;
				}
				.stu-dept {
				}
				.stu-code {
				}
			}
		}
		.code {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.btn-list {
		margin-top: 3rem;
		height: 62%;
		display: flex;
		flex-direction: column;
		.my-calendar {
			flex-basis: 60%;
			background-color: aqua;
		}
		.list {
			flex-basis: 12%;
			margin-top: 2rem;
			background-color: #fff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.item {
				text-align: center;
				.left {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}
		}
	}
	.two-scan {
		margin-top: 2rem;
		background-color: #fff;
		width: 100%;
		height: 46%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.currentTime {
			font-size: 24px;
			margin-bottom: 1vh;
		}
		.message {
			margin-top: 1vh;
		}
	}
}
</style>
