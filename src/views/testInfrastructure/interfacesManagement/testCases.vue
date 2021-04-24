<template>
<div class="class-testCases">
	<SideBar :menuList="menuList" @getAllTableData="getAllTableData"
	@getTableDataByIndex="getTableDataByIndex"></SideBar>
	<div class="main-page">
		<InterfacesTable :tableData="tableData" :tableType="tableType" @handleSelectionChange="handleSelectionChange"></InterfacesTable>
		<el-drawer
			title="测试用例"
			:visible.sync="drawer"
			direction="btt"
			:modal="false"
			size="50%">
			<TestCases></TestCases>
		</el-drawer>
	</div>

</div>
</template>

<script>
import SideBar from '@/components/interfaceTest/sideBar'
import InterfacesTable from '@/components/interfaceTest/interfacesTable'
import TestCases from './useCase'
import Request from "@/libs/request.js";
export default {
	name: "testCases",
	components:{
		SideBar,
		TestCases,
		InterfacesTable
	},
	data() {
		return{
			transactId:'',
			menuList:[],
			tableData:[],
			tableType:2,
			pageSize:10,
			currentPage:1,
			multipleSelection:[],
			drawer:false
		}
	},
	created() {
		this.transactId = localStorage.getItem('transactId')
		this.getGroupById(this.transactId)
		this.getAllTableData()
	},
	methods:{
		getAllTableData(){
			console.log(this.transactId)
			Request({
				url: '/interfaceNewController/selectAllInterfaceByTransactId',
				method: 'post',
				params: {
					transactId: this.transactId,
					pageSize: this.pageSize,
					currentPage: this.currentPage,
					orderColumns: "update_time",
					orderType: "desc",
				}
			}).then((res) => {
				if(res.respCode === '0000'){
					this.tableData = res.list
				}else {
					this.$message.error("获取接口信息失败！")
					console.log(err)
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		getTableDataByIndex(index){
			Request({
				url: '/interfaceNewController/selectAllInterface',
				method: 'post',
				params: {
					interfaceGroupId: index,
					pageSize: this.pageSize,
					currentPage: this.currentPage,
					orderColumns: "update_time",
					orderType: "desc",
				}
			}).then((res) => {
				if(res.respCode === '0000'){
					this.tableData = res.list
					this.$message.success("查询成功！")
				}else {
					this.$message.error("获取接口信息失败！")
					console.log(err)
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		getGroupById(id){
			console.log(id)
			Request({
				url: '/interfaceNewController/selectAllInterfaceGroup',
				method: 'post',
				params: {
					transactId: id
				}
			}).then((res) => {
				if(res.respCode === '0000'){
					this.menuList = []
					var treeData = res.interfaceGroupDtoList
					for (var i = 0; i < treeData.length; i++) {
						if (treeData[i].level === 0) {
							this.menuList.push(treeData[i])
						}
					}
					this.$message.success("查询成功！")
				}else {
					this.$message.error("获取接口分组失败！")
					console.log(res.respMsg)
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		handleSelectionChange(val){
			this.multipleSelection = val;
			this.drawer = true
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		}
	}
}
</script>

<style lang="less" scoped>
.class-testCases{
	height: 100%;
	display: flex;
	.main-page{
		flex: 1;
		min-width: calc(100vh - 480px);
	}
}
</style>
