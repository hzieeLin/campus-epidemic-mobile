<template>
	<view class="page-container">
		<view class="top-notice">
			<view>各位同学：目前部分省市出现了阳性病例，疫情防控形势严峻。请各位同学克服麻痹思想和侥幸心理，非必要不出校。</view>
			<view>=======================</view>
			<view>请假规则： 务必仔细阅读</view>
			<view>对自己己负责、对他人负责的态度，按时、如实上报健康信息。</view>
		</view>
		<view class="form">
			<view class="form-item">
				<view class="form-item-label">1.当前地点</view>
				<view class="form-item-content">
					<u--text :text="formData.preciseArea" size="30"></u--text>
					<u-icon name="reload" @click="getLoaction"></u-icon>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">2.体温是否正常(小于37.3℃)</view>
				<view class="form-item-content">
					<u-radio-group
					  v-model="formData.temperatureAbnormal"
					  placement="column"
					>
					<u-radio label="是" name="0" size="40" labelSize="30" :customStyle="{marginBottom: '8px'}"></u-radio>
					<u-radio label="否" name="1" size="40" labelSize="30"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">3.是否存在发热,干咳,乏力等症状</view>
				<view class="form-item-content">
					<u-radio-group
					  v-model="formData.abnormalSymptoms"
					  placement="column"
					>
					<u-radio label="是" name="0" size="40" labelSize="30" :customStyle="{marginBottom: '8px'}"></u-radio>
					<u-radio label="否" name="1" size="40" labelSize="30"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">4.健康码颜色</view>
				<view class="form-item-content">
					<u-radio-group
					  v-model="formData.healthCode"
					>
					<u-radio label="绿" name="0" size="40" labelSize="30" :customStyle="{marginRight: '8px'}"></u-radio>
					<u-radio label="黄" name="1" size="40" labelSize="30" :customStyle="{marginRight: '8px'}"></u-radio>
					<u-radio label="红" name="2" size="40" labelSize="30" ></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">5.本人承诺以上提供的资料真实准确</view>
				<view class="form-item-content">
					<u-radio-group
					  v-model="formData.promise"
					  placement="column"
					>
					<u-radio label="是" name="0" size="40" labelSize="30" :customStyle="{marginBottom: '8px'}"></u-radio>
					<u-radio label="否" name="1" size="40" labelSize="30"></u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="btn">
				<u-button type="primary" @click="submitAdd">提交</u-button>
		</view>
	</view>
</template>

<script>
	import { AddStudentDaily} from '../../../api/student/insert.js'
	export default {
		onLoad() {
		},
		data() {
			return {
				formData: {
					preciseArea: '',
					temperatureAbnormal: null,
					abnormalSymptoms: null,
					healthCode: null,
					promise: null
				}
			}
		},
		// created() {
		// 	this.getLoaction()
		// },
		methods: {
			getLoaction() {
				uni.getLocation({
					type: 'gcj02',
					geocode: 'true',
					success: (res) => {
						// this.addressList.province = res.address.province
						console.log(JSON.stringify(res.address));
						console.log(`${res.address.province}${res.address.city}${res.address.district}${res.address.street}${res.address.streetNum}${res.address.poiName}`);
						this.formData.preciseArea = JSON.parse(JSON.stringify(`${res.address.province}${res.address.city}${res.address.district}${res.address.street}${res.address.streetNum}${res.address.poiName}`))
					}
				})
			},
			submitAdd() {
				AddStudentDaily(this.formData).then(() => {
					uni.navigateTo({
						url: '/pages/common/subSuccess/subSuccess'
					})
				}).catch((err) => {
					console.log(err);
				})
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
			min-height: 20vh;
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