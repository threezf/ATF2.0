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
		<el-dialog :title="getTitle" :visible.sync="dialogVisible" :before-close="handleClose" width="24%">
			<el-form ref="form" :model="copyData" label-width="80px" label-position='top'>
				<el-form-item label="用例名称" prop="caseName" class="change-label-class">
					<el-input size="small" placeholder="用例名称" v-model.lazy="copyData.nameMedium">
					</el-input>
				</el-form-item>
				<el-form-item label="分组" prop="descShort" class="change-label-class">
					<el-cascader
						size="small"
						:options="menuList"
						v-model="copyData.groupId"
						:show-all-levels="false"
						:props="defaultProps"
						style="width: 100%"
					>
					</el-cascader>
				</el-form-item>
				<el-form-item label="标签" class="change-label-class">
					<el-select
						size="small"
						class="input-new-tag"
						v-model="copyData.descShort"
						multiple
						filterable
						allow-create
						default-first-option
						placeholder="请选择或输入标签"
						style="width:100%"
					>
						<el-option
							v-for="item in tagOptions"
							:key="item.value"
							:label="item.tag"
							:value="item.tag"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<div class="dialogBottom">
						<el-button id="buttonName" type="primary" size="small" @click="submitForm('form')">确定
						</el-button>
						<el-button type="danger" size="small" plain @click="cancelButtonClicked">取消
						</el-button>
					</div>
				</el-form-item>
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
	data(){
		return {
			groupName:'',
			tags: [],
			caseData: {},
			copyData: {},
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
			tagOptions: [
				{
					value: 0,
					tag: "可以添加多个标签",
				},
				{
					value: 1,
					tag: "测试",
				},
			],
			currentUserId : sessionStorage.getItem('userId') || '3',
			modelFlag:0,
		}
	},
	created() {
		console.log('caseData',this.caseData)
		let caseLibId = sessionStorage.getItem('caselibId')
		this.getGroupById(caseLibId)
		let caseId = sessionStorage.getItem('caseId')
		this.getCaseDetail(caseId)
	},
	computed:{
		updateTime(){
			return TimeUtils.timestampToTime(this.caseData.modifiedTime, 'yyyy-MM-dd hh:mm:ss')
		},
		getTitle(){
			let obj = {
				1: '复制用例',
				2: '编辑用例'
			}
			return obj[this.modelFlag]
		}
	},
	methods:{
		handleClose(done) {
			done()
			return true
		},
		editButton(){
			this.modelFlag = 2
			this.copyData = {...this.caseData}
			this.dialogVisible = true
		},
		copyButton(){
			this.modelFlag = 1
			this.copyData = {...this.caseData}
			this.copyData.nameMedium = '副本-'+this.caseData.nameMedium
			this.dialogVisible = true
		},
		deleteButton(){
			this.$confirm('是否确定删除此用例?', '提示', {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning'
			}).then(() => {
				this.delCase(this.caseData.id)
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
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 如果是修改则调用 updateGroup 方法 否则调用 addGroup
					console.log(this.modelFlag);
					if (this.modelFlag === 2) {
						this.updateCase();
					} else {
						this.copyCase();
					}
				} else {
					this.$message("信息格式有误，请检查");
					return false;
				}
			});
		},
		getCaseDetail(id){
			Request({
				url: 'sceneController/pagedQuerySceneById',
				method: 'post',
				params: {
					id: id
				}
			}).then((res) => {
				if(res.respCode === '0000'){
					this.caseData = res.sceneEntityList[0]
					console.log('caseData',this.caseData)
					this.getGroupNameById(this.caseData.groupId)
					this.caseData.descShort = JSON.parse(this.caseData.descShort)
					// this.$message.success("查询成功！")
				}else {
					this.$message.error("查询失败！")
					console.log(res.respMsg)
				}
			}).catch((err) => {
				console.log(err)
			})
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
		delCase(id){
			Request({
				url: '/sceneController/deleteSingleScene',
				method: 'post',
				params: {
					id:id
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
		updateCase() {
			this.tags = this.copyData.descShort.map((item)=>{
				if (item.tagname != null){
					return item.tagname
				}else {
					return item
				}
			})
			Request({
				url: '/sceneController/updateScene',
				method: 'post',
				params: {
					modifierId: this.currentUserId,
					id: this.copyData.id,
					nameMedium: this.copyData.nameMedium,
					descShort: JSON.stringify(this.tags),
					groupId: this.copyData.groupId
				}
			}).then((res) => {
				this.$message(res.respMsg)
				this.dialogVisible = false
				this.getCaseDetail(this.copyData.id)
			},(err) => {
				this.$message(res.respMsg)
				this.dialogVisible = false
				console.log(err)
			}).catch((err) => {
				console.log(err)
			})
		},
		copyCase(){
			this.tags = this.copyData.descShort.map((item)=>{
				if (item.tagname != null){
					return item.tagname
				}else {
					return item
				}
			})
			Request({
				url: '/sceneController/insertScene',
				method: 'post',
				params: {
					nameMedium:this.copyData.nameMedium,
					descShort:JSON.stringify(this.tags),
					groupId: this.copyData.groupId,
					caseLibId: this.copyData.caseLibId,
					creatorId: this.copyData.creatorId
				}
			}).then((res) => {
				this.$message.success('复制成功')
				this.copyDialog = false
				this.$confirm('是否返回流程用例管理界面?', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					this.$router.back(); //返回上一界面
				})
			},(err) => {
				this.copyDialog = false;
				console.log('error occur')
				console.log(err)
				this.$message.error(err)
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
.change-label-class /deep/ .el-form-item__label {
	padding: 0;
	margin-bottom: 0;
	line-height: 30px;
	font-weight: bold;
}
.dialogBottom{
	display: flex;
	justify-content: center;
}
</style>
