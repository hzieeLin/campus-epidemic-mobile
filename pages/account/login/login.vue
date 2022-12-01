<template>
	<view class="login-container" v-show="tokens === null || tokens === 'undefined' || tokens === ''">
		<view class="top-img">
			<image src="../../../static/account.jpeg" class="img" mode=""></image>
			<view class="form-box">
				<form>
					<view class="uni-form-item uni-column">
						<view class="title">学号/手机号</view>
						<input class="uni-input" placeholder="请输入账号" v-model="loginByCode.account" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">密码</view>
						<input class="uni-input" placeholder="请输入密码" v-model="loginByCode.password" type="password" />
					</view>
					<view class="uni-form-item uni-column">
						<u-checkbox-group @change="checkboxChange">
							<u-checkbox :customStyle="{ marginTop: '10px' }" size="30" labelSize="30" 
							:label="checkInfo.label"  
							:checked="checkInfo.checked"
							></u-checkbox>
						</u-checkbox-group>
					</view>

					<view class="btn" form-type="submit" @click="onSubmit">登 录</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { accountLogin } from '../../../api/account/user.js';
import { setToken } from '../../../utils/auth.js';
export default {
	onLoad() {
		const token = uni.getStorageSync('token');
		this.tokens = token;
		console.log(this.tokens);
		if (this.tokens !== null) {
			const tokenType = uni.getStorageSync('tokenType');
			this.RolePaths(tokenType);
		} else {
			console.log(2);
		}
		const accountInfo = uni.getStorageSync('accountInfo')
		if(accountInfo !== null ) {
			console.log(111111);
			this.loginByCode.account = accountInfo.account
			this.loginByCode.password = accountInfo.password
		} else {
			this.loginByCode.account = ''
			this.loginByCode.password = ''
		}
	},
	data() {
		return {
			tokens: '',
			loginByCode: {
				account: '',
				password: ''
			},
			checkInfo: {
				label: '记住密码',
				checked: false
			}
		};
	},
	computed: {
		...mapState('m_tabbar', ['tokenType'])
	},
	methods: {
		...mapMutations('m_user', ['updateUserInfo']),
		...mapMutations('m_tabbar', ['updateTokenType']),
		onSubmit() {
			accountLogin(this.loginByCode).then(res => {
				const accountInfo = {
					account: this.loginByCode.account,
					password: this.loginByCode.password,
					checked: this.checkInfo.checked
				}
				if(this.checkInfo.checked) {
					uni.setStorageSync('accountInfo', accountInfo)
				} else {
					uni.setStorageSync('accountInfo', {})
				}
				this.updateTokenType(res.userType);
				this.updateUserInfo(res.information);
				uni.setStorageSync('token', res.token);
				this.RolePaths(res.userType);
			});
		},
		checkboxChange(e) {
			this.checkInfo.checked = !this.checkInfo.checked
			console.log(this.checkInfo.checked);
		},
		RolePaths(role) {
			if (role.indexOf('学生') >= 0) {
				uni.setStorageSync('tabbar', ['/pages/student/index/index', '/pages/student/scan/scan', '/pages/student/my/my']);
				uni.redirectTo({
					url: '/pages/student/index/index'
				});
			} else if (role.indexOf('防疫人员') >= 0) {
				uni.setStorageSync('tabbar', ['/pages/epidemicPersonnel/index/index', '/pages/epidemicPersonnel/scan/scan', '/pages/epidemicPersonnel/my/my']);
				uni.redirectTo({
					url: '/pages/epidemicPersonnel/index/index'
				});
			} else if (role.indexOf('隔离人员') >= 0) {
				uni.setStorageSync('tabbar', ['/pages/isolationPersonnel/index/index', '/pages/isolationPersonnel/scan/scan', '/pages/isolationPersonnel/my/my']);
				uni.redirectTo({
					url: '/pages/isolationPersonnel/index/index'
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.login-container {
	width: 100vw;
	height: 100vh;
}
.top-img {
	height: 70vh;
	background-color: #e0e0e0;
	position: relative;
	.img {
		width: 100%;
		height: 100%;
	}
	.form-box {
		position: absolute;
		width: 80%;
		height: 50%;
		border-radius: 1rem;
		background-color: #fff;
		left: 50%;
		bottom: -10%;
		transform: translate(-50%, 0%);
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
		.uni-form-item {
			margin: 1rem 1rem 0 1rem;
			height: 30%;
			border-bottom: 1px solid #e0e0e0;
			display: flex;
			flex-direction: column;
			.title {
				font-size: 1rem;
				font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
			}
			input {
				flex: 1;
				font-size: 1.2rem;
			}
		}
		.btn {
			position: absolute;
			left: 50%;
			bottom: -8%;
			transform: translate(-50%, 0%);
			width: 90%;
			border-radius: 1.2rem;
			text-align: center;
			font-size: 1.1rem;
			height: 3.4rem;
			line-height: 3.2rem;
			color: #fff;
			background-color: #5680fa;
			box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
		}
	}
}
</style>
