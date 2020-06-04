<template>
  <div class="page-base-inner">
		<el-container>
			<el-main>
				录制功能点管理界面{{autId}}<br>
				<el-button
					type="primary"
					size="small"
					plain
					@click="toUI"
					>UI管理
				</el-button>
			</el-main>
		</el-container>
	</div>
</template>

<script>
  export default {
    name: "recordTransact",
		data(){
    	return {
    		autId: '', // 测试系统Id
			}
		},
		created() {
    	this.autId = this.$route.query.autId;
		},
		methods: {
			toUI() {
				this.$router.push({
					path: '/recordFunction/RecordManagementRouter/recordDetail',
					query: {
						id: this.autId
					}
				})
			}
		}
  }
</script>

<style scoped>

</style>
