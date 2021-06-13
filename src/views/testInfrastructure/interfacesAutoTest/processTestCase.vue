<template>
	<div class="project">
		<SideBarCreate
			v-ref="(c) => setChildrenRef('sidebar', c)"
			:menuList="menuList"
			:caseNeed=true
			@getTableDataByIndex="getTableDataByIndex"
			@getAllTableData="getAllTableData"
			@getGroupById="getGroupById"
		></SideBarCreate>
		<!-- <SideBarCreate ></SideBarCreate> -->
		<div class="main-page">
			<el-row class="rightPage-topRow">
				<el-col :span="3">
					<el-button
						class="new-interface"
						@click="newProcessCase"
						type="primary"
						size="small"
					>
						<i class="el-icon-plus"></i>新建流程用例
					</el-button>
				</el-col>
				<el-col :span="4">
					<el-button
						class="new-interface"
						@click="importButton"
						type="primary"
						size="small"
					>
						批量导入
					</el-button>
				</el-col>
				<el-col :span="4">
					<el-input size="small"  v-model="selectInfo" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="5" :offset="1">
					<el-button
						size="small"
						@click='getAllTableData(1)'
						icon="el-icon-search"
						:loading="tableLoading"
						type="primary">
						搜索
					</el-button>
				</el-col>
				<el-col :span="7">
					<span class="enviroment-span">项目环境</span>
					<el-select
						@change="selectChanged"
						v-model="value"
						placeholder="请选择"
						size="small"
					>
						<el-option
							v-for="item in originEnviormentList"
							:key="item.id"
							:label="item.environmentName"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<table-comp
				:tableHeader="TableHeader"
				:table-data="tableObj"
				:needPagination="false"
				@singlechoosehandler = "handleRowClick"
			>
				<template v-slot:resultSlot="scope">
					<el-tag size="small" :type="scope.row.resultFlag | getType">
						{{ scope.row.resultFlag | getStatus }}
					</el-tag>
				</template>
				<template v-slot:operationSlot="scoped">
					<el-button type="text" size="small" @click="testCaseButton(scoped.row)"
					>测试</el-button
					>
					<el-button type="text" size="small" @click="editCaseButton(scoped.row)"
					>编辑</el-button
					>
					<el-button
						type="text"
						size="small"
						@click="copyCaseButton(scoped.row)"
					>复制</el-button
					>
					<el-button
						type="text"
						size="small"
						@click="deleteCaseButton(scoped.row,scoped.$index)"
					>删除</el-button
					>
				</template>
			</table-comp>

			<el-dialog width="24%" :title="getTitle" :visible.sync="dialogVisible" :before-close="handleClose">
				<el-form ref="ruleForm" label-width="40px" :model="ruleForm" :rules="rules" status-icon  label-position="top">
					<el-form-item label="用例名称" prop="caseName" class="change-label-class">
						<el-input size="small" placeholder="用例名称" v-model.lazy="ruleForm.nameMedium">
						</el-input>
					</el-form-item>
					<el-form-item label="分组" prop="descShort" class="change-label-class">
						<el-cascader
							size="small"
							:options="menuList"
							v-model="interfaceGroup"
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
							v-model="tags"
							multiple
							filterable
							allow-create
							default-first-option
							placeholder="请选择或输入标签"
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
							<el-button id="buttonName" type="primary" size="small" @click="submitForm('ruleForm')">{{buttonName}}
							</el-button>
							<el-button type="danger" size="small" plain @click="cancelButtonClicked">取消
							</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-dialog>
			<!--导入对话框-->
			<el-dialog width="27%" title="导入" :before-close="handleClose" :visible.sync="dialogImportVisible">
				<el-form :action="importURL" enctype="multipart/form-data" method="post" id="uploadForm">
					<el-upload ref="upload" :action="importURL" :limit="1" :auto-upload="false" :file-list="fileList" :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handleExceed" :on-change="handleOnChange">
						<el-button size="small" class="btnSelectFile" type="success" slot="trigger" plain>上传文件
						</el-button>
						<el-input style="margin-left:10px;width: 75%" size="small" class="formInput" placeholder="请选择导入的文件" :disabled="true" v-model="fileName"></el-input>
					</el-upload>
					<hr color="#F5F5F5" />
					<el-form-item>
						<el-col class="buttonDownload" :span="12">
							<el-button type="primary" icon="el-icon-download" size="small" @click="downloadTemplate">模板下载</el-button>
						</el-col>
						<el-col class="buttonGroup" :span="12">
							<el-button type="primary" size="small" @click="importTemplate">导入
							</el-button>
							<el-button size="small" @click="cancelButtonClicked">取消 </el-button>
						</el-col>
					</el-form-item>
				</el-form>
			</el-dialog>
			<el-dialog
				title="复制环境"
				:visible.sync="copyDialog"
				width="40vw"
				:append-to-body="true"
			>
				<el-form :model="copyCaseData" label-position="top">
					<el-row>
						<el-form-item
							label="用例名称"
							prop="nameMedium"
							class="change-label-calss"
						>
							<el-input
								v-model="nameMedium"
								size="small"
								placeholder="用例名称"
								style="width: 100%"
							>
							</el-input>
						</el-form-item>
					</el-row>
					<el-row class="buttons_row">
						<el-button type="primary" size="small" @click="copyCase"
						>确定</el-button
						>
						<el-button size="small" @click="cancelButtonClicked">取消</el-button>
					</el-row>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import SideBarCreate from "@/components/interfaceTest/sidebarCreate";
import InterfacesTable from "@/components/interfaceTest/interfacesTable";
import TestTabs from "@/components/interfaceTest/testTabs";
import ResponseTabs from "@/components/interfaceTest/responseTabs";
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import { mapState } from "vuex";
import { ProcessCaseConf } from "@/config/interfacesAutoTest/processTestCase/processCaseTableConf";
import {TimeUtils} from "wii-fe-utils";
let that
export default {
	mixins: [VueMixins], // 时间格式转化
	name: "ProcessTestCase",
	components: {
		SideBarCreate: SideBarCreate,
		InterfacesTable: InterfacesTable,
		TestTabs: TestTabs,
		ResponseTabs: ResponseTabs,
	},
	data() {
		let checkNameMedium = (rule, value, callback) => {
			if (value === "") {
				return callback(new Error("用例名称不能为空"));
			} else {
				return callback();
			}
		};
		return {
			TableHeader: ProcessCaseConf,
			originEnviormentList: [],
			value: "",
			tableData: [],
			options: [],
			//被测系统编号
			autId: "",
			menuList: [],
			// menuId: "", // 获取接口管理传递的id数据
			currentPage: 1,
			totalCount: 30,
			pageSize: 10,
			modelFlag: 1,
			dialogVisible: false,
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
			tags: [],
			interfaceGroup: [],
			defaultProps: {
				children: "childNodeList",
				label: "groupName",
				value: "id",
			},
			environmentUrl: "",
			tableType: 1,
			//表单数据
			ruleForm: {
				nameMedium: "",
			}, //表单信息数据
			rules: {
				nameMedium: [{
					validator: checkNameMedium,
					trigger: "blur",
				}, ],
			}, //表单验证数据
			dialogImportVisible: false,
			copyDialog:false,
			//文件上传
			fileList: [],
			fileName:"",
			resultsOption: [
				{
					value: 0,
					result: "未测试",
				},
				{
					value: 1,
					result: "通过",
				},
				{
					value: 2,
					result: "未通过",
				},
			],
			copyCaseData:{},
			caseLibId : sessionStorage.getItem('caselibId'),
			currentUserId : sessionStorage.getItem('userId') || '3',
			tableLoading: false,
			selectInfo: '',
			nameMedium:''
		};
	},
	inject: {
		setChildrenRef: {
			default: () => {},
		},
	},
	filters: {
		getStatus(val) {
			for (let item in that.resultsOption) {
				let option = that.resultsOption[item];
				if (option.value === val) {
					return option.result;
				}
			}
		},
		getType(val) {
			return val === 0
				? "success"
				: val === 1
					? "primary"
					: val === 2
						? "danger"
						: "warning";
		},
	},
	computed: {
		tableObj() {
			return {
				data: this.tableData,
			};
		},
		//根据modelFlag 展示弹窗的名字
		getTitle() {
			var obj = {
				1: "新建用例",
				2: "修改用例",
			};
			return obj[this.modelFlag];
		},
		//用于展示弹窗按钮的文字
		buttonName() {
			var obj = {
				1: "添加",
				2: "确认",
			};
			return obj[this.modelFlag];
		},
		...mapState("interface", {
			interfaceEvironmentList: "interfaceEvironmentList",
		}),
		importURL() {
			return "http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/batchImportInterfaceTransact"; // 上传的URL
		},
		params() {
			let obj = {
				currentPage: this.currentPage,
				pageSize: this.pageSize,
				orderColumns: "modified_time",
				orderType: "DESC",
				caseLibId: this.caseLibId
			}
			return obj
		},
	},
	beforeCreate: function () {
		that = this;
	},
	created() {
		let data;
		if (this.$route.query.data && this.$route.query.data.hasOwnProperty("id")) {
			data = this.$route.query.data;
			console.log(data);
			this.caseLibId = data.caseLibId;
		} else {
			this.caseLibId = sessionStorage.getItem("caselibId");
		}
		this.getGroupById(this.caseLibId);
		this.getAllTableData();
		this.getEnvironmentList();
	},
	methods: {
		handleRowClick(row){
			console.log("row", row);
			sessionStorage.setItem("caseGroupId", row.groupId) //把分组存入缓存中
			sessionStorage.setItem("caseId", row.id) //把流程用例编号存入缓存中
			sessionStorage.setItem("caseData",row)
			this.$router.push({
				path: "processCaseSteps",
				query:{
					data:row
				}
			}); //界面跳转
		},
		testCaseButton(){

		},
		copyCaseButton(row) {
			this.copyCaseData = row;
			this.nameMedium = "副本-" + row.nameMedium;
			this.tags = []
			this.tags = this.copyCaseData.descShort.map((item)=>{
				return item.tagname
			})
			console.log('tags',this.tags)
			this.copyDialog = true;
		},
		deleteCaseButton(row, index) {
			console.log(row, index);
			this.$confirm("是否确定删除此用例?", "提示", {
				cancelButtonText: "取消",
				confirmButtonText: "确定",
				type: "warning",
			})
				.then(() => {
					this.delCase(row.id);
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		importButton() {
			this.dialogImportVisible = true;
		},
		//导入文件相关
		downloadTemplate() {
			window.location.href =
				"http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/downloadInterfaceTemplate";
		},
		handleRemove(file, fileList) {
			// console.log('file:',file,fileList)
			this.fileName = "删除" + file.name;
			this.fileList.splice(0, 1)
		},
		handlePreview(file) {
			// console.log('file:' + file);
			this.fileName = "点击" + file.name;
		},
		handleExceed(file, fileList) {
			this.$message.warning(`只允许上传1个文件`);
		},
		handleOnChange(file) {
			this.$message.success(`选择文件成功`);
			this.fileName = file.name;
			this.fileList.push(file)
		},
		// 导入模板
		importTemplate() {
			console.log("importTemplate", this.autId);
			let formData = new FormData();
			formData.append("autId", this.autId);
			formData.append("creatorId", sessionStorage.getItem('userId'));
			// formData.append("menuId", this.menuId);
			formData.append("file", this.fileList[0].raw);
			Request({
				url: "/interfaceNewController/batchImportInterfaceTransact",
				method: "POST",
				params: formData
			})
				.then((res) => {
					if (res.respCode === "0000") {
						this.$message.success(res.respMsg);
						this.dialogImportVisible = false;
						this.getAllTableData();
						this.fileList = [];
						this.fileName = "";
					}
				})
				.catch((err) => {
					this.$message.error("上传失败");
					this.dialogImportVisible = false;
					console.log(err)
				});
		},
		getEnvironmentList() {
			Request({
				url: "/interfaceNewController/interfaceEnvironmentSelect",
				method: "post",
				params: {
					autId: this.autId,
				},
			}).then((res) => {
				console.log("查询成功列表", res);
				this.originEnviormentList = res.list;
				if(this.originEnviormentList) {
					this.options = this.originEnviormentList.map((item) => ({
						label: item.environmentName,
						value: item.id,
					}));
					this.value = this.options[0].value;
					this.$store.commit("interface/updateEvironmentList", {
						value: this.options,
					});
					localStorage.setItem(
						"environmentList",
						JSON.stringify(this.originEnviormentList)
					);
				}
			});
		},
		selectChanged(val) {
			if (val === 1) {
				this.$router.push({
					path: "projectEnvironment",
				}); //界面跳转
			} else if (val === 2) {
				this.environmentUrl = "";
				console.log(val);
			} else {
				console.log(val);
			}
		},
		newProcessCase() {
			this.modelFlag = 1;
			this.dialogVisible = true;
		},
		handleClose(done) {
			if (this.modelFlag === 1) {
				done();
				return true;
			}
			this.$refs["ruleForm"].resetFields();
			done();
			return true;
		},
		//取消按钮
		cancelButtonClicked() {
			this.dialogVisible = false;
			this.dialogImportVisible = false;
			this.copyDialog = false;
		},
		//修改分组表单
		editCaseButton(row) {
			this.ruleForm = {}
			this.modelFlag = 2;
			console.log("row", row);
			this.tags = row.descShort.map((item)=>{
				return item.tagname
			})
			this.interfaceGroup = row.groupId;
			const {
				id,
				nameMedium,
			} = row;

			this.ruleForm = {
				id,
				nameMedium,
			};
			this.dialogVisible = true;
		},
		// 提交表单进行验证
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 如果是修改则调用 updateGroup 方法 否则调用 addGroup
					console.log(this.modelFlag);
					if (this.modelFlag === 2) {
						this.updateCase();
					} else {
						this.addCase();
					}
				} else {
					this.$message("信息格式有误，请检查");
					return false;
				}
			});
		},
		getTableDataByIndex(index) {
			Request({
				url: "/sceneController/pagedBatchQuerySceneByGroupId",
				method: "post",
				params: {
					groupId: index,
					...this.params,
				},
			})
				.then((res) => {
					if (res.respCode === "0000") {
						this.tableData = res.sceneEntityList;
						this.tableData.forEach(item =>{
							if(item.descShort == null){
								item.descShort = []
							}else {
								let tags = JSON.parse(item.descShort)
								item.descShort = tags.map((item, index) =>({
									id:index,
									tagname: item
								}))
							}
							item.modifiedTime = TimeUtils.timestampToTime(item.modifiedTime, 'yyyy-MM-dd hh:mm:ss')
						})
						// this.$message.success("查询成功！")
					} else {
						console.log(res.respMsg);
					}
				})
				.catch((err) => {
					console.log("查询失败",err);
					if (res.respCode === "10011111"){
						this.$message.info("暂无数据！")
					}
				});
		},
		getAllTableData(type) {
			if(type === 1){
				this.currentPage = 1
			}
			this.tableLoading = true
			let search = {}
			if(this.selectInfo){
				search.nameMedium = this.selectInfo
			}
			Request({
				url: '/sceneController/pagedBatchQuerySceneByGroupId',
				method: 'post',
				params: {
					...this.params,
					...search
				}
			}).then((res) => {
				this.tableData = res.sceneEntityList
				this.tableData.forEach(item =>{
					if(item.descShort == null){
						item.descShort = []
					}else {
						let tags = JSON.parse(item.descShort)
						item.descShort = tags.map((item, index) =>({
							id:index,
							tagname: item
						}))
					}
					item.modifiedTime = TimeUtils.timestampToTime(item.modifiedTime, 'yyyy-MM-dd hh:mm:ss')
				})
				this.totalCount = res.totalCount
			},(err) => {
				console.log(err)
			}).catch((err) => {
				console.log(err)
			}).finally(_=>{
				this.tableLoading = false
			})
		},
		getGroupById(id) {
			console.log(id);
			Request({
				url: "/interfaceNewController/interfaceGroupSelectAllGroupByCase",
				method: "post",
				params: {
					caseId: id,
				},
			})
				.then((res) => {
					if (res.respCode === "0000") {
						this.menuList = [];
						var treeData = res.interfaceGroupDtoList;
						for (var i = 0; i < treeData.length; i++) {
							if (treeData[i].level === 0) {
								this.menuList.push(treeData[i]);
							}
						}
						// this.$message.success("查询成功！")
					} else {
						console.log(res.respMsg);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		updateCase() {
			if (typeof this.interfaceGroup === "number") {
				this.groupId = this.interfaceGroup;
			} else {
				let length = this.interfaceGroup.length;
				this.groupId = this.interfaceGroup[length - 1];
			}
			Request({
				url: '/sceneController/updateScene',
				method: 'post',
				params: {
					modifierId: this.currentUserId,
					id: this.ruleForm.id,
					nameMedium: this.ruleForm.nameMedium,
					descShort: JSON.stringify(this.tags),
					groupId: this.groupId
				}
			}).then((res) => {
				this.$message(res.respMsg)
				this.dialogVisible = false
				this.getAllTableData()
			},(err) => {
				this.$message(res.respMsg)
				this.dialogVisible = false
				console.log(err)
			}).catch((err) => {
				console.log(err)
			})
		},
		addCase() {
			let length = this.interfaceGroup.length;
			this.groupId = this.interfaceGroup[length - 1];
			Request({
				url: '/sceneController/insertScene',
				method: 'post',
				params: {
					nameMedium:this.ruleForm.nameMedium ,
					descShort: JSON.stringify(this.tags),
					groupId: this.groupId,
					caseLibId: this.caseLibId,
					creatorId: this.currentUserId
				}
			}).then((res) => {
				this.$message(res.respMsg)
				this.dialogVisible = false
				this.getAllTableData()
			},(err) => {
				this.dialogVisible = false;
				console.log('error occur')
				console.log(err)
				this.$message.warning(err)
				this.dialogVisible = false
			}).catch((err) => {
				console.log(err)
			})
		},
		copyCase(){
			Request({
				url: '/sceneController/insertScene',
				method: 'post',
				params: {
					nameMedium:this.nameMedium,
					descShort:JSON.stringify(this.tags),
					groupId: this.copyCaseData.groupId,
					caseLibId: this.copyCaseData.caseLibId,
					creatorId: this.copyCaseData.creatorId
				}
			}).then((res) => {
				this.$message(res.respMsg)
				this.copyDialog = false
				this.getAllTableData()
			},(err) => {
				this.copyDialog = false;
				console.log('error occur')
				console.log(err)
				this.$message.warning(err)
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
				this.$message(res.respMsg)
				this.getAllTableData()
			},(err) => {
				console.log('error occur')
				console.log(err)
				this.$message.warning(err)
			}).catch((err) => {
				console.log(err)
			})
		}
	},
};
</script>
<style lang="less" scoped>
.project {
	height: 100%;
	display: flex;
}
.main-page {
	flex: 1;
	min-width: calc(100vh - 480px);
}
.new-interface {
	margin: 0 0 0 20px;
}
.enviroment-span {
	margin-right: 20px;
	font-size: 15px;
	color: #b6b6b6;
}
/**添加取消按钮样式 */
.buttons_row {
	text-align: center;
	margin-bottom: -15px;
	margin-top: 20px;
}
.divider-style {
	width: 3px;
	margin: 0;
	background-color: #409eff;
	height: 30px;
}
.divider-span {
	font-size: 15px;
	margin-left: 10px;
}
.divider-row {
	background-color: #eef0f0;
	width: 100%;
	margin-bottom: 10px;
}
.change-label-calss /deep/ .el-form-item__label {
	padding: 0;
	margin-bottom: 0;
	line-height: 30px;
	font-weight: bold;
}
.input-new-tag {
	width: 99%;
}
.select-status {
	width: 99%;
}
.rightPage-topRow {
	padding: 10px 5px;
	line-height: 40px;
}
.in-file {
	text-align: center;
}
.btnSelectFile {
	margin: -10px -5px 10px 0px;
}
.buttonDownload,
.buttonGroup {
	margin: 15px 0px -35px 0px;
	display: flex;
}

.buttonGroup {
	justify-content: flex-end;
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
