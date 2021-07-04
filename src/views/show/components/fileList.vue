<template>
	<div>
		<p style="margin: 0">{{ fileName }}</p>
		<div class="file-body">
			<div class="file-item" v-for="(item, index) in fileList" :key="index">
				<i class="el-icon-document" style="margin-top: 7px;"></i>
				<span>{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FileList",
	props: {
		fileList: {
			type: Array,
			default: () => []
		},
		fileName: {
			type: String,
			default: "name"
		}
	}
};
</script>

<style>
.file-body {
	min-width: 350px;
	padding: 0 10px;
	border: 1px solid #eee;
	height: 42vh;
	overflow-y: scroll;
}

.file-item {
	line-height: 30px;
	display: flex;
	justify-content: space-between;
}
</style>
