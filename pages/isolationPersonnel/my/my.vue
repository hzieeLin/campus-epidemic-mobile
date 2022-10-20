<template>
	<view class="page-container">
		<view class="top">
			<view class="img-avatar"><image class="img" src="../../../static/account.jpeg"></image></view>
			<view class="userinfo">
				<view class="info">
					<view class="stu-name">{{ userinfo.name }}</view>
					<view class="stu-dept">{{ userinfo.deptName }}</view>
					<view class="stu-code">{{ userinfo.code }}</view>
				</view>
			</view>
			<view class="code"><uni-icons type="scan" size="30" @click="changeShowScan"></uni-icons></view>
		</view>
		<view class="btn-list" v-if="showTwoScan">
			<view class="item">
				<view class="left">
					<uni-icons type="staff-filled" size="30"></uni-icons>
					<view @click="showEditPwd = true">修改密码</view>
				</view>
				<uni-icons type="forward" size="30"></uni-icons>
			</view>
			<view class="item">
				<view class="left">
					<uni-icons type="info-filled" size="30"></uni-icons>
					<view>关于我们</view>
				</view>
				<uni-icons type="forward" size="30"></uni-icons>
			</view>
			<view class="item">
				<view class="left">
					<uni-icons type="gear-filled" size="30"></uni-icons>
					<view @click="loginOut">退出登录</view>
				</view>
				<uni-icons type="forward" size="30"></uni-icons>
			</view>
		</view> 
		<view class="two-scan" v-else>
			<view class="currentTime">{{ currentTime }}</view>
			<uqrcode ref="qrcode" class="content" canvas-id="qrcode" :value="scanInfo" :options="{ foregroundColor: '#ffaa00' }"></uqrcode>
			<view class="message">(绿码为允许， 黄码禁止出行)</view>
		</view>
		<u-modal :show="showEditPwd" title="修改密码" :showCancelButton="true" @cancel="showEditPwd = false" @confirm="handleEditPwd">
			<view>
				<u-row>
					<u-col span="4">旧密码</u-col>
					<u-col span="9"><u--input placeholder="填写原密码" border="surround" v-model.trim="pwdInfo.password"></u--input></u-col>
				</u-row>
				<u-gap height="40" bgColor="#fff"></u-gap>
				<u-row>
					<u-col span="4">新密码</u-col>
					<u-col span="9"><u--input placeholder="填写新密码" border="surround" v-model.trim="pwdInfo.passwordRepeat"></u--input></u-col>
				</u-row>
			</view>
		</u-modal>
		<TabBar></TabBar>
	</view>
</template>

<script>
import UQRCode from 'uqrcodejs';
import TabBar from '../../../components/tabbar/tabbar.vue';
import {EditPwd } from '../../../api/system.js'
import { dateFormat } from '../../../utils/date.js';
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
		TabBar
	},
	data() {
		return {
			list: {
				code: '199200118',
				name: '林世宏'
			},
			showTwoScan: true,
			showEditPwd: false,
			currentTime: '',
			scanInfo: '1111',
			pwdInfo: {
				password: '',
				passwordRepeat: ''
			}
		};
	},
	created() {
		setInterval(() => {
			this.getCurrentTime();
		}, 1000);
	},
	methods: {
		...mapMutations('m_tarbar', ['updateTokenType']),
		changeShowScan() {
			this.showTwoScan = !this.showTwoScan;
		},
		getCurrentTime() {
			this.currentTime = dateFormat(null, null, 3);
		},
		handleEditPwd() {
			EditPwd(this.pwdInfo).then((res) => {
				this.showEditPwd = false
				uni.showToast({
						title: `密码修改成功！`,
						icon: 'success',
						duration: 2000
				});
			})
		},
		loginOut() {
			uni.setStorageSync('token', null);
			uni.navigateTo({
				url: `/pages/account/login/login`
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
	height: 100vh;
	background: #e0e0e0;
	.top {
		width: 100%;
		height: 30%;
		background-color: #fff;
		display: flex;
		.img-avatar {
			flex-basis: 28%;
			display: flex;
			align-items: center;
			justify-content: center;
			.img {
				width: 60%;
				height: 28%;
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
		margin-top: 2rem;
		background-color: #fff;
		height: 46%;
		.item {
			height: 25%;
			border-bottom: 1px solid #e0e0e0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				width: 30%;
				padding-left: 0.5rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #fff;
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
