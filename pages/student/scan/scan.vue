<template>
	<view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLaunch() {
			uni.onTabBarMidButtonTap = () => {
				uni.scanCode({
					success: (res) => {
						alert(res)
					}
				});
			}
		}
	}
</script>

<style lang="less">

</style>
