<template>
	<view class="page-container">
		<u-notify ref="uNotify" message=""></u-notify>
		<view class="top-notice">
			<view>各位同学：目前部分省市出现了阳性病例，疫情防控形势严峻。请各位同学克服麻痹思想和侥幸心理，非必要不出校。</view>
			<view>=======================</view>
			<view>请假规则： 务必仔细阅读</view>
			<view>若钉钉请假时间为4月3日 12:00-14:00</view>
		</view>
		<view class="form">
			<view class="form-item">
				<view class="form-item-label">1.体温是否正常(小于37.3℃)</view>
				<view class="form-item-content">
					<u-radio-group
					  v-model="formData.temperature"
					  placement="column"
					  @change="groupChange"
					>
					<u-radio label="是" name="0" size="30" :customStyle="{marginBottom: '8px'}"></u-radio>
					<u-radio label="否" name="1" size="30"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">2.是否存在发热,干咳,乏力等症状</view>
				<view class="form-item-content">
					<u-radio-group
					  v-model="formData.cough"
					  placement="column"
					  @change="groupChange1"
					>
					<u-radio label="是" name="0" size="30" :customStyle="{marginBottom: '8px'}"></u-radio>
					<u-radio label="否" name="1" size="30"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">3.健康码颜色</view>
				<view class="form-item-content">
					<u-radio-group
					  :v-model="formData.color"
						@change="groupChange2">
						<u-radio label="绿码" name="0" size="30" :customStyle="{marginRight: '8px'}"></u-radio>
						<u-radio label="黄码" name="1" size="30" :customStyle="{marginRight: '8px'}"></u-radio>
						<u-radio label="红码" name="2" size="30"></u-radio>
						</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">4.本人承诺以上提供的资料真实准确</view>
				<view class="form-item-content">
					<u-radio-group
					  v-model="formData.agree"
					  placement="column"
					  @change="groupChange3"
					>
					<u-radio label="是" name="0" size="30" :customStyle="{marginBottom: '8px'}"></u-radio>
					<u-radio label="否" name="1" size="30"></u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="btn">
				<u-button type="primary" @click="submitLeave">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
		},
		data() {
			return {
				formData: {
					temperature: null,
					cough: null,
					color: null,
					agree: null
				}
			}
		},
		methods: {
			groupChange(e) {
				this.formData.temperature = e
			},
			groupChange1(e) {
				this.formData.cough = e
			},
			groupChange2(e) {
				this.formData.color = e
			},
			groupChange3(e) {
				this.formData.agree = e
			},
			submitLeave() {
				let result = 0
				for(const key in this.formData) {
					if(this.formData[key] === null) {
						this.$refs.uNotify.show({
							top: 10,
							type: 'error',
							color: '#ffffff',
							bgColor: '#ff0000',
							message: '填写内容选项不能为空',
							duration: 1000 * 3,
							fontSize: 20,
							safeAreaInsetTop: true
						});
					} else {
						result++
					}
				}
				if(result === 4) {
						uni.navigateTo({
							url: '/pages/common/subSuccess/subSuccess'
						})
						}
				// 写提交代码api调用
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-container {
		width: 100vw;
		height: 96vh;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f1f1f1;
		justify-content: space-between;
		.top-notice {
			margin-bottom: 1vh;
			padding: 0 1vh;
			overflow: auto;
			background-color: #f1f1f1;
			color: #868686;
		}
		.form {
			flex: 1;
			color: #000;
			.form-item {
				height: 100px;
				background-color: #fff;
				margin: 0 1vh 1vh;
				border-radius: 10px;
				padding: 10rpx;
				display: flex;
				flex-direction: column;
				.form-item-label {
					flex-basis: 30%;
					// background-color: #868686;
					display: flex;
					align-items: center;
				}
				.form-item-content {
					flex: 1;
					// background-color: #868686;
					display: flex;
					align-items: center;
					padding: 0 4vw;
				}
			}
		}
		.btn {
			flex-basis: 20%;
			padding: 0 10vw 2vh;
		}
	}
</style>