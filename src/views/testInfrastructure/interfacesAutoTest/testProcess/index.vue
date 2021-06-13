<template>
	<div class="test-process">

		<el-row class="name-style">
			<el-col :span="12">{{caseData.nameMedium}}</el-col>
			<el-col :span="2" :offset="6">
				<el-button type="primary" size="small"  @click.native="editButton">
					<i class="el-icon-edit-outline"></i>编辑
				</el-button>
			</el-col>
			<el-col :span="2">
				<el-button type="success"  size="small" @click.native="copyButton">
					<i class="el-icon-copy-document"></i>复制
				</el-button>
			</el-col>
			<el-col :span="2">
				<el-button type="danger"  size="small" @click.native="deleteButton">
					<i class="el-icon-delete"></i>删除
				</el-button>
			</el-col>
		</el-row>
		<el-row class="url-style">标签：
			<span v-for="item in caseData.descShort">
				<el-tag class="method-tag" type="success">{{item.tagname}}</el-tag>
			</span>
		</el-row>
		<el-row class="remark-style">
			<el-col :span="4">分组：{{groupName}}</el-col>
			<el-col :span="4">创建者：{{caseData.creatorId}}</el-col>
			<el-col :span="4">更新时间：{{caseData.modifiedTime }}</el-col>
		</el-row>
		<el-divider class="divider-style"></el-divider>
		<el-dialog title="编辑接口" :visible.sync="dialogVisible" :before-close="handleClose" width="60%">
			<el-form :model="interfaceData" label-width="80px" label-position='top'>

			</el-form>
		</el-dialog>
		<el-dialog title="复制接口" :visible.sync="copyDialog" :before-close="handleClose" width="40%">
			<el-form :model="copyInterfaceData" label-width="80px" label-position='top'>

			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {TimeUtils} from "wii-fe-utils";
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
export default {
	mixins: [VueMixins], // 时间格式转化
	name: "index",
	props:{
		caseData:{
			type:Object,
			default:{}
		}
	},
	data(){
		return {
			groupName:'',
			tags: [],
			interfaceData: {},
			copyInterfaceData: {},
			dialogVisible: false,
			copyDialog: false,
			interfaceGroup:[],
			copyInterfaceGroup:[],
			defaultProps: {
				children: 'childNodeList',
				label: 'groupName',
				value: 'id'
			},
			menuList:[],

		}
	},
	created() {
		console.log('caseData',this.caseData)
		let caseLibId = sessionStorage.getItem('caselibId')
		this.getGroupById(caseLibId)
		this.getGroupNameById(this.caseData.groupId)
	},
	computed:{
		updateTime(){
			return TimeUtils.timestampToTime(this.caseData.modifiedTime, 'yyyy-MM-dd hh:mm:ss')
		}
	},
	methods:{
		handleClose(done) {
			done()
			return true
		},
		editButton(){
			this.dialogVisible = true
		},
		copyButton(){
			this.copyInterfaceData = this.interfaceData
			this.copyInterfaceData.interfaceName = '副本-'+this.interfaceData.interfaceName
			this.copyInterfaceGroup = this.interfaceGroup
			this.copyDialog = true
		},
		deleteButton(){
			this.$confirm('是否确定删除此接口?', '提示', {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning'
			}).then(() => {
				this.delInterface(this.interfaceData.id)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		//取消按钮
		cancelButtonClicked() {
			this.dialogVisible = false
			this.copyDialog = false
		},
		getGroupNameById(id){
			console.log(id)
			Request({
				url: '/interfaceNewController/selectInterfaceGroupById',
				method: 'post',
				params: {
					id: id
				}
			}).then((res) => {
				if(res.respCode === '0000'){
					this.groupName = res.interfaceGroupSelectDto.groupName
				}else {
					this.$message.error("获取接口分组名称失败！")
					console.log(err)
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		getInterfaceDetail(id){
			Request({
				url: '/interfaceNewController/selectInterfaceById',
				method: 'post',
				params: {
					id: id
				}
			}).then((res) => {
				if(res.respCode === '0000'){
				}else {
					this.$message.error("查询失败！")
					console.log(res.respMsg)
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		updateInterface() {
			Request({
				url: '/interfaceNewController/updateSingleInterface',
				method: 'post',
				params: this.interfaceData
			}).then((res) => {
				this.$message.success('更新成功')
				this.dialogVisible = false
				this.getInterfaceDetail(this.interfaceData.id)
			}, (err) => {
				this.$message.error(res.respMsg)
				this.dialogVisible = false
				console.log(err)
			}).catch((err) => {
				console.log(err)
			})
		},
		copyInterface() {
			this.interfaceData.transactId = localStorage.getItem('transactId')
			if(typeof this.copyInterfaceGroup ==="number"){
				this.copyInterfaceData.interfaceGroupId =this.interfaceGroup;
			}else {
				let length = this.copyInterfaceGroup.length
				this.copyInterfaceData.interfaceGroupId = this.copyInterfaceGroup[length-1]
			}
			Request({
				url: '/interfaceNewController/addNewInterface',
				method: 'post',
				params: this.copyInterfaceData
			}).then((res) => {
				this.$message.success('复制成功')
				this.$confirm('是否进入此接口详情界面?', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					this.$router.back(); //返回上一界面
				})
			}, (err) => {
				this.$message.error(res.respMsg)
				console.log(err)
			}).catch((err) => {
				console.log(err)
			})
		},
		delInterface(id){
			Request({
				url: '/interfaceNewController/deleteInterface',
				method: 'post',
				params: {
					id :id
				}
			}).then((res) => {
				if(res.respCode === '0000'){
					this.$message.success('删除成功')
					this.$router.back(); //返回上一界面
				}else {
					this.$message.error('删除失败')
					console.log(res.respMsg)
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		getGroupById(id){
			console.log(id)
			Request({
				url: '/interfaceNewController/interfaceGroupSelectAllGroupByCase',
				method: 'post',
				params: {
					caseId: id
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
					// this.$message.success("查询成功！")
				}else {
					this.$message.error("获取接口分组失败！")
					console.log(res.respMsg)
				}
			}).catch((err) => {
				console.log(err)
			})
		},
	}
}
</script>

<style scoped>
.test-process{
	padding: 10px;
}
.method-tag {
	margin: 0 20px;
}
.url-style{
	font-size: 16px;
	margin: 10px 0;
}
.name-style {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
}
.remark-style {
	font-size: 13px;
}
.divider-style {
	margin-top:5px;
	height: 2px;
}
.divider-row {
	background-color:#eef0f0;
	width:100%;
	margin-bottom: 10px;
	margin-top: 20px;
	padding: 0 !important;
	font-size: 18px;
	font-weight: bold;
	/*flex 布局*/
	display: flex;
	/*实现垂直居中*/
	align-items: center;
}
</style>
