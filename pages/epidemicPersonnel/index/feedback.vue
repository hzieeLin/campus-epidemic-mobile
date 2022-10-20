<template>
	<view class="page-container">
		<view class="top-list">
			<u-search style="height: 44px;padding: 0 10px;" shape="round" :showAction="false" searchIconSize="40"></u-search>
			<view class="list-box">
				<view class="list-item">
					<view>待办</view>
					<view>2</view>
				</view>
				<view class="list-item">
					<view>已处理</view>
					<view>2</view>
				</view>
				<view class="list-item">
					<view>全部</view>
					<view>2</view>
				</view>
			</view>
		</view>
		<view class="content">
					<u-list
						@scrolltolower="scrolltolower"
					>
						<u-list-item
							v-for="(item, index) in indexList"
							:key="index"
						>
							<u-cell
								:title="`列表长度-${index + 1}`" size="large"
							>
								<u-avatar
									slot="icon"
									shape="square"
									size="35"
									:src="item.url"
									customStyle="margin: -3px 5px -3px 0"
								></u-avatar>
							</u-cell>
						</u-list-item>
					</u-list>
		</view>
	</view>
</template>

<script>
	import {Agree, Reject, UnableDeal} from '../../../api/epidemic/update.js'
	export default {
			data() {
				return {
					indexList: [],
					title:'',
					urls: [
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/2.jpg',
						'https://cdn.uviewui.com/uview/album/3.jpg',
						'https://cdn.uviewui.com/uview/album/4.jpg',
						'https://cdn.uviewui.com/uview/album/5.jpg',
						'https://cdn.uviewui.com/uview/album/6.jpg',
						'https://cdn.uviewui.com/uview/album/7.jpg',
						'https://cdn.uviewui.com/uview/album/8.jpg',
						'https://cdn.uviewui.com/uview/album/9.jpg',
						'https://cdn.uviewui.com/uview/album/10.jpg',
					]
				}
			},
			onLoad() {
				this.loadmore()
			},
			methods: {
				scrolltolower() {
					this.loadmore()
				},
				loadmore() {
					for (let i = 0; i < 30; i++) {
						this.indexList.push({
							url: this.urls[uni.$u.random(0, this.urls.length - 1)]
						})
					}
				},
				submit(state) {
					switch(state) {
						case 0: 
							Agree(data).then(() => {
								// 关闭弹框
							})
							break
						case 1: 
							UnableDeal(data).then(() => {
								// 关闭弹框
							})
							break
						case 2: 
							Reject(data).then(() => {
								// 关闭弹框
							})
							break
					}
				}
			},
		}
</script>

<style lang="less" scoped>
	.page-container {
		width: 100vw;
		height: 95vh;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: column;
		.top-list {
			width: 100%;
			flex-basis: 18%;
			background-color: #fff;
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
				height: 80rpx!important;
				.u-icon__icon {
					font-size: 28px;
				}
			}
		}
		.content {
			flex: 1;
			background-color: aliceblue;
		}
	}
</style>