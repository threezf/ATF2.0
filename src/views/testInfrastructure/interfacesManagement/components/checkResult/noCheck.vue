<template>
	<div class="tab-nocheck">
		<p>
			不校验返回结果，任意结果均判断为正确
		</p>
	</div>
</template>

<script>
export default {
	name: "noCheck",
	data() {
		return {

		}
	}
}
</script>

<style lang="less" scoped>
.tab-nocheck {
	min-height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	p {
		text-align: center;
		color: gray;
		font-size: 13px;
	}
}

</style>
