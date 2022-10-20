<template>
	<view class="page-container">
		<view class="top-notice">
			<view>各位同学：目前部分省市出现了阳性病例，疫情防控形势严峻。请各位同学克服麻痹思想和侥幸心理，非必要不出校。</view>
			<view>=======================</view>
			<view>请假规则： 务必仔细阅读</view>
			<view>若钉钉请假时间为4月3日 12:00-14:00，</view>
			<view>（1）出校时间有效范围：</view>
			<view>4月3日 11:00-13:00之间，道闸自动开启。</view>
			（2）回校时间有效期范围：当天15:00点之前。
			请各位同学按照规定时间内回校，超时需要手动销假的同学，将列入黑名单，限制下次请假。
			<view>=======================</view>
			**特别提醒**请进出校园之前，检查核酸报告的有效时间（当前是72小时内）。
			<view>谎报、虚报将承担相应的法律责任。</view>
		</view>
		<view class="form" abelPosition="left">
			<u--form v-model="formList" >
				<u-form-item label="请假类型" prop="formList.type"  labelWidth="200" @click="showType = true; uni.hideKeyboard()">
					<u-text :text="typeValue" size="26"></u-text>
					<u-icon  slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="预计出校时间" prop="formList.estimateStartTime" labelWidth="200" @click="showDate1 = true; uni.hideKeyboard()">
					<u-text :text="formList.estimateStartTime" size="26"></u-text>
					<u-icon  slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="预计返校时间" prop="formList.estimateEndTime"  labelWidth="200" @click="showDate2 = true; uni.hideKeyboard()">
					<u-text :text="formList.estimateEndTime" size="26"></u-text>
					<u-icon  slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="请假去向" prop="formList.type"  labelWidth="200"　@click="showArea = true; uni.hideKeyboard()">
					<u-text :text="targetValue" size="26"></u-text>
					<u-icon  slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="请假原因" prop="formList.message"  labelWidth="200">
					<u-input v-model="formList.message" border="none" size="26"></u-input>
				</u-form-item>
			</u--form>
			<u-action-sheet
							:show="showType"
							:actions="actions"
							title="请选择请假类型"
							@close="showType = false"
							@select="TypeSelect"
					>
					</u-action-sheet>
			<u-picker :show="showArea" ref="uPicker" :columns="columns" keyName="name" @confirm="confirm" @cancel="showArea = false" @change="changeHandler"></u-picker>
			<u-datetime-picker
			                :show="showDate1"
											@confirm="getStartTime"
											@cancel="showDate1 = false"
											:formatter="formatter"
			                mode="time"
			        ></u-datetime-picker>	
			<u-datetime-picker
			                :show="showDate2"
											:minDate="1640966400000"
											@confirm="getEndTime"
											@cancel="showDate2 = false"
			                mode="datetime"
			        ></u-datetime-picker>					
		</view>
		<view class="btn">
			<u-button type="primary" @click="submitLeave">提交</u-button>
		</view>
	</view>
</template>

<script>
	import {GetProvinceList, GetCityListByCode, GetCountyListByCode, GetStreetListByCode} from '../../../api/system.js'
	import { AddLeave} from '../../../api/student/insert.js'
	import {dateFormat} from '../../../utils/date.js'
	export default {
		data() {
			return {
				typeValue: '',
				targetValue: '',
				showType: false,
				actions: [{name: '事假', value: 0},{name: '病假', value: 1}],
				showArea: false,
				columns: [],
				showDate1: false,
				showDate2: false, 
				value1: Number(new Date()),
				formList: {
					type: null,
					estimateStartTime:null,
					estimateEndTime: null,
					target:null,
					message: null
				}
			}
		},
		created() {
			this.getProviceList()
		},
		methods: {
			TypeSelect(e) {
				this.formList.type = e.value
				this.typeValue = e.value === 0 ? '事假' : '病假'
			},
			confirm(e) {
				this.targetValue = `${e.values[0][e.indexs[0] === undefined ? '0': e.indexs[0]].name}${e.values[1][e.indexs[1] === undefined ? '0': e.indexs[1]].name}${e.values[2][e.indexs[2] === undefined ? '0': e.indexs[2]].name}${e.values[3][e.indexs[3] === undefined ? '0': e.indexs[3]].name}`
				this.formList.target = e.value[3].code
				this.showArea = false
			},
			formatter(type, value) {
					if (type === 'hour') {
					    return `${value}时`
					}
					if (type === 'minute') {
					    return `${value}分`
					}
			        return value
			    },
			getStartTime(e) {
				this.formList.estimateStartTime = dateFormat(null, e.value, 1)
				this.showDate1 = false
			},
			getEndTime(e) {
				this.formList.estimateEndTime = dateFormat( e.value,null, 0)
				this.showDate2 = false
			},
			changeHandler(e) {
				const {columnIndex, value, values, index, picker = this.$refs.uPicker} = e
				switch(columnIndex) {
					case 0:
							this.getCityList(value[0].code)
							break
					case 1:
							this.getCountyList(value[1].code)
							break
					case 2:
							this.getStreetList(value[2].code)
							break
				}
			},
			getProviceList() {
				GetProvinceList().then((res) => {
					this.getCityList(res[0].code)
					this.$refs.uPicker.setColumnValues(0, res)
					this.$refs.uPicker.setColumnValues(1, [])
					this.$refs.uPicker.setColumnValues(2, [])
					this.$refs.uPicker.setColumnValues(3, [])
				})
			},
			getCityList(code) {
				const data = {provinceCode: code}
				GetCityListByCode(data).then((res) => {
					this.$refs.uPicker.setColumnValues(1, res)
					this.getCountyList(res[0].code)
					this.$refs.uPicker.setColumnValues(2, [])
					this.$refs.uPicker.setColumnValues(3, [])
				})
				
			},
			getCountyList(code) {
				const data = {cityCode: code}
				GetCountyListByCode(data).then((res) => {
					this.$refs.uPicker.setColumnValues(2, res)
					this.getStreetList(res[0].code)
					this.$refs.uPicker.setColumnValues(3, [])
				})
			},
			getStreetList(code) {
				const data = {code: code}
				GetStreetListByCode(data).then((res) => {
					this.$refs.uPicker.setColumnValues(3, res)
				})
			},
			submitLeave() {
				AddLeave(this.formList).then(res => {
					console.log('提交成功');
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-container {
		width: 100vw;
		height: 95vh;
		background-color: #fafafa;
		display: flex;
		flex-direction: column;
		.top-notice {
			height: 30%;
			margin-bottom: 1vh;
			padding: 0 10rpx;
			overflow: auto;
			background-color: #f1f1f1;
			color: #868686;
		}
		.form {
			flex: 1;
			.u-form {
				.u-form-item {
					padding: 10px 10px;
					height: 60px;
					margin-bottom: 1vh;
					background-color: #fff;
				}
			}
		}
		.btn {
			flex-basis: 10%;
			padding: 0 10vw;
		}
	}
</style>