<template>
	<div class="page-outer">
		<div class="page-inner">
			<div class="ele-container">
				<div class="ele-left">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>元素列表</span>
						</div>
						<div class="content">
							<el-row style="margin-bottom: 0;padding-bottom: 0;margin-left: 10px">
								<el-input class="keywords" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
							</el-row>
							<el-row style="margin-top: 0; padding-top: 0;margin-left: 10px">
								<el-button size="mini" type="primary" @click="addUIShow" :disabled="showFlag">添加UI</el-button>
								<el-button size="mini" type="primary" @click="deleteUIShow" :disabled="showFlag">删除UI</el-button>
								<el-button size="mini" type="primary" @click="addEleShow" :disabled="showFlag">添加元素</el-button>
								<el-button size="mini" type="primary" @click="deleteEleShow" :disabled="showFlag">删除元素</el-button>
								<el-button size="mini" type="primary" @click="branchAddEleShow" :disabled="showFlag">批量添加</el-button>
							</el-row>
							<el-row style="margin-top: 0; padding-top: 0;margin-left: 10px">
								<el-button size="mini" type="primary" @click="downloadTools">录制工具下载</el-button>
							</el-row>
							<el-tree
								v-loading="treeLoading"
								class="filter-tree"
								:data="treeData"
								:props="defaultProps"
								:filter-node-method="filterNode"
								@node-click="handleNodeClick"
								ref="tree2"
							></el-tree>
						</div>
					</el-card>
				</div>
				<div class="ele-right">
					<el-card class="box-card">
						<div slot="header" class="clearfix headerHeight">
							<span>{{infoCardName}}</span>
						</div>
						<div class="content">
							<el-row>
								<el-col :offset="2" :span="4" v-if="infoCardType === true">
									<span>元素名称 ：</span>
								</el-col>
								<el-col :offset="2" :span="4" v-else-if="infoCardType === false">
									<span>UI名称 ：</span>
								</el-col>
								<el-col :offset="2" :span="6" v-else>
									<span>请选择UI或元素</span>
								</el-col>
								<el-col :span="5" class="rightLable" v-if="infoCardType !== undefined">
									<el-input v-model="input" placeholder="请输入内容" :disabled="editFlag"></el-input>
								</el-col>
								<el-col :span="4" class="rightLable" v-if="infoCardType">
									<span>类型 ：</span>
								</el-col>
								<el-col :span="5" v-if="infoCardType">
									<el-select filterable v-model="classType" placeholder="请选择" :disabled="editFlag">
										<el-option
											v-for="item in classselectOptions"
											:key="item.id"
											:label="item.name"
											:value="item.name"
										></el-option>
									</el-select>
								</el-col>
							</el-row>
							<el-row v-if="infoCardType">
								<el-col :span="4" :offset="2">
									<span>属性</span>
								</el-col>
							</el-row>
							<el-table
								v-if="infoCardType"
								border
								ref="multipleTable"
								:data="mainProperties"
								tooltip-effect="dark"
								style="width: 86%; margin-left: 8%"
								@selection-change="handleSelectionChange"
							>
								<el-table-column type="selection" width="55"></el-table-column>
								<el-table-column label="主属性" width>
									<template slot-scope="scope">
										<div v-if="editFlag">{{scope.row.name}}</div>
										<div v-else>
											<el-col :span="24">
												<el-input v-model="scope.row.name"></el-input>
											</el-col>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="属性值" width>
									<template slot-scope="scope">
										<div v-if="editFlag">{{scope.row.value}}</div>
										<div v-else>
											<el-col :span="24">
												<el-input v-model="scope.row.value"></el-input>
											</el-col>
										</div>
									</template>
								</el-table-column>
							</el-table>
							<div v-if="infoCardType !== undefined">
								<el-row v-if=" editFlag ">
									<el-col :span="5" :offset="17">
										<el-button @click="editButton" type="primary" size="small" :disabled="showFlag">编辑</el-button>
									</el-col>
								</el-row>
								<el-row v-else>
									<el-col :span="3" :offset="14">
										<el-button @click="editFlag = true" size="small">取消</el-button>
									</el-col>
									<el-col :span="5">
										<el-button v-if="infoCardType === true" @click="modifySingleElement" type="primary" size="small">
											保存
										</el-button>
										<el-button v-else @click="modifySingleUI" type="primary" size="small">保存</el-button>
									</el-col>
								</el-row>
							</div>
						</div>
					</el-card>
				</div>
			</div>
		</div>
		<el-dialog title="添加UI" :visible.sync="addUIDialogFlag" width="30%">
			<el-form :model="addUIform" label-width="80px">
				<el-form-item label="UI名称">
					<el-input v-model="addUIform.name"></el-input>
				</el-form-item>
				<el-form-item label="UI描述">
					<el-input type="textarea" rows="5" v-model="addUIform.desc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addUIDialogFlag = false">取 消</el-button>
				<el-button type="primary" @click=" addUI">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="添加元素" :visible.sync="addEleDialogFlag" width="30%">
			<el-form :model="addEleform" label-width="80px">
				<el-form-item label="元素名称">
					<el-input v-model="addEleform.elementName"></el-input>
				</el-form-item>
				<el-form-item label="控件类型">
					<el-select v-model="addEleform.classType" placeholder="请选择类型">
						<el-option
							v-for="item in classselectOptions"
							:key="item.id"
							:label="item.name"
							:value="item.name"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="主属性">
					<el-input v-model="addEleform.name"></el-input>
				</el-form-item>
				<el-form-item label="主属性值">
					<el-input v-model="addEleform.value"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addEleDialogFlag = false">取 消</el-button>
				<el-button type="primary" @click=" addEle">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="批量添加元素" :visible.sync="branchAddEleDialogFlag" width="30%">
			<el-upload
				class="upload-demo"
				ref="upload"
				:action="actionUrl"
				:on-success="tempSuccess"
				:on-error="tempError"
				:limit="1"
				:auto-upload="false"
			>
				<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				<el-button
					style="margin-left: 10px;"
					size="small"
					type="success"
					@click="submitUpload"
				>上传到服务器
				</el-button>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="downloadTemp">模板下载</el-button>
				<div slot="tip" class="el-upload__tip">下载模板，填写完毕后进行上传</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="branchAddEleDialogFlag = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Request from "@/libs/request.js";
	import VueMixins from "@/libs/vueMixins.js";

	export default {
		components: {},
		mixins: [VueMixins],
		props: {
			transId: {
				type: String,
				default: "",
			},
			autId: {
				type: String,
				default: "",
			},
			creatorId: {
				type: Number,
			},
			creatorName: {
				type: String,
			},
		},
		data() {
			return {
				publishActionUrl:
					"http://10.101.167.184:8080/atfcloud2.0a/elementRepository/batchImportElementAndUi?"+"userId="+sessionStorage.getItem("userId"),
				branchAddEleDialogFlag: false, // 批量添加的dialog
				userId: sessionStorage.getItem("userId"),
				fileList: [], // 上传文件列表
				editFlag: true, // 元素信息编辑的状态
				infoCardName: "", //信息详情的卡片名称
				infoCardType: undefined, //信息详情的卡片种类： undifinde是未选择初始状态  true?"ele":"UI"
				classselectOptions: [],
				selectOptions: [],
				classType: "", //当前选中的元素的控件类型
				selectedUI: "", //当前选中的UI
				selectedEle: [], //当前选中的元素
				repositoryId: undefined, //元素库Id
				mainProperties: "",
				autoSelectValue: "",
				filterText: "",
				input: "", //当前选中的元素的名称
				treeData: [],
				addUIDialogFlag: false,
				addEleDialogFlag: false,
				defaultProps: {
					children: "children",
					label: "label",
				},
				addUIform: {
					name: "",
					desc: "",
				},
				addEleform: {
					elementName: "",
					classType: "",
					name: "",
					value: "",
				},
				treeLoading: false,
				uiUID: '', // 负责处理UIID部分
			};
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			},
			transId() {
				if (this.transId && this.autId) {
					this.getEleTree();
					this.getClass();
				}
			},
		},
		computed: {
			actionUrl() {
				return (
					this.publishActionUrl +
					"?" +
					"repositoryId=" +
					this.repositoryId +
					"&" +
					"uploadUserId=3" +
					"&" +
					"autId=" +
					this.autId
				);
			},

		},
		created() {
			this.creatorId=this.creatorId.toString()
			if (this.creatorId == sessionStorage.getItem("userId")) {
				this.showFlag=false
			}else{
				this.showFlag=true
			}
		},
		methods: {
			// 录制工具下载
			downloadTools() {
				window.location = "http://10.101.167.184:8080/atf-data/atf-recorder.zip"
			},
			downloadTemp() {
				let url =
					"http://10.101.167.184:8080/atfcloud2.0a/elementRepository/getExcelTemporary/" +
					this.autId;
				console.log(url);
				window.location.href = url;
			},
			// 以下是三个函数是上传组件用到的
			submitUpload() {
				this.$refs.upload.submit();
				this.getEleTree()
			},
			tempError(response, file, fileList) {
				this.$message.error(response.respMsg);
			},
			tempSuccess(response, file, fileList) {
				if (response.respCode !== "0000") {
					this.$message.error(response.respMsg);
					return;
				}
				this.branchAddEleDialogFlag = false;
				this.$message.success("上传成功");
			},
			handlePreview(file) {
				console.log(file);
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			// 树被点击时，触发事件
			handleNodeClick(data, node, indeterminate) {
				this.editFlag = true; // 信息编辑状态置为不可编辑
				this.infoCardName = data.label;
				this.classType = data.classType;
				this.mainProperties = data.mainProperties;
				// 根据传入的节点所带信息中是否有classtype属性 判断 点击的是元素还是UI
				"classType" in data
					? (this.infoCardType = true)
					: (this.infoCardType = false);
				this.input = data.label;
				console.log(node);
				if ("classType" in data) {
					this.selectedEle.push(node.parent.data.id, data.id, data);
					this.selectedUI = "";
				} else {
					this.uiUID = data.id
					this.selectedUI = data.id;
					this.selectedEle = [];
				}

				console.log(indeterminate, data, this.uiUID);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 获取元素UI树
			getEleTree() {
				console.log('getEleTree', this.transId)
				const _this = this;
				this.treeLoading = true;
				Request({
					url: "/elementRepository/queryAllElementsForATransact",
					method: "post",
					params: {transactId: this.transId},
				})
					.then(
						(res) => {
							let tree = [];
							for (let i = 0; i < res.uis.length; i++) {
								let node = {
									id: res.uis[i].uiId,
									label: res.uis[i].uiName,
									children: [],
								};
								if (!res.uis[i].elements) {
									tree.push(node);
									break;
								}
								for (let j = 0; j < res.uis[i].elements.length; j++) {
									let child = {
										id: res.uis[i].elements[j].elementId,
										label: res.uis[i].elements[j].elementName,
										classType: res.uis[i].elements[j].classType,
										mainProperties: res.uis[i].elements[j].mainProperties,
									};
									node.children.push(child);
								}
								tree.push(node);
							}
							_this.treeData = tree;
							this.repositoryId = res.elementRepositoryId;
							console.log("_this.treeData", _this.treeData);
						},
						(err) => {
							console.log(err);
						}
					)
					.catch((err) => {
						console.log(err);
					})
					.finally((_) => {
						this.treeLoading = false;
					});
			},
			//获取该测试系统下 所有的控件类型
			getClass() {
				Request({
					url: "/aut/queryAutVisibleOmClasses",
					method: "post",
					params: {id: this.autId},
				}).then(
					(res) => {
						if (res.respCode == "0000") {
							this.classselectOptions = res.omClassRespDTOList;
						} else {
							this.$message(res.respMsg);
						}
					},
					(err) => {
						console.log(err);
					}
				);
			},
			// 以下为点击按钮时，清空弹框 并再次展示弹窗
			addUIShow() {
				if (this.creatorId == sessionStorage.getItem("userId")) {
					this.addUIDialogFlag = true;
				} else {
					this.$alert("该被测项目由" + this.creatorName + "创建，你没有权限添加UI")
				}
			},
			deleteUIShow() {
				if (this.creatorId == sessionStorage.getItem("userId")) {
					if (this.selectedUI === "") {
						this.$message("请选择UI，再进行删除");
						return;
					}
					Request({
						url: "/elementRepository/deleteSingleUI",
						method: "post",
						params: {
							uiId: this.selectedUI,
							repositoryId: this.repositoryId,
							userId: this.userId
						},
					}).then(
						(res) => {
							if (res.respCode == "0000") {
								this.getEleTree();
								this.$message("删除成功：" + res.respMsg);
							} else {
								this.$message("删除失败：" + res.respMsg);
							}
						},
						(err) => {
							console.log(err);
						}
					);
				} else {
					this.$alert("该被测项目由" + this.creatorName + "创建，你没有权限删除UI")
				}
			},
			addEleShow() {
				if (this.creatorId == sessionStorage.getItem("userId")) {
					if (this.selectedUI === "") {
						this.$message("请选择UI，再进行添加");
						return;
					}
					this.addEleDialogFlag = true;
				} else {
					this.$alert("该被测项目由" + this.creatorName + "创建，你没有权限添加元素")
				}
			},
			deleteEleShow() {
				if (this.creatorId == sessionStorage.getItem("userId")) {
					if (this.selectedEle.length === 0) {
						this.$message("请选择元素，再进行删除");
						return;
					}
					Request({
						url: "/elementRepository/deleteSingleElement",
						method: "post",
						params: {
							repositoryId: this.repositoryId,
							elementId: this.selectedEle[1],
							uiId: this.selectedEle[0],
							userId: this.userId
						},
					}).then(
						(res) => {
							if (res.respCode == "0000") {
								this.getEleTree();
								this.$message("删除成功：" + res.respMsg);
							} else {
								this.$message("删除失败：" + res.respMsg);
							}
						},
						(err) => {
							console.log(err);
						}
					);
				} else {
					this.$alert("该被测项目由" + this.creatorName + "创建，你没有权限删除元素")
				}
			},
			editButton(){
				if (this.creatorId == sessionStorage.getItem("userId")) {
					this.editFlag = false
				}else{
					this.$alert("该被测项目由" + this.creatorName + "创建，你没有权限进行编辑")
				}
			},
			branchAddEleShow() {
				if (this.creatorId == sessionStorage.getItem("userId")) {
					if (this.selectedUI === "") {
						this.$message("请选择UI，再进行添加");
						return;
					}
					this.branchAddEleDialogFlag = true;
				}else{
					this.$alert("该被测项目由" + this.creatorName + "创建，你没有权限批量添加元素")
				}
			},
			addUI()
				{
					this.addUIDialogFlag = false;
					Request({
						url: "/elementRepository/batchAddUI",
						method: "post",
						params: {
							repositoryId: this.repositoryId,
							uis: [
								{uiName: this.addUIform.name}, //支持数组传参单界面未设计 且desc不用传参
							],
							userId: this.userId
						},
					}).then(
						(res) => {
							this.getEleTree();
							this.$message("添加成功" + res.respMsg);
						},
						(err) => {
							console.log(err);
						}
					);
			},
			addEle() {
				this.addEleDialogFlag = false;
				Request({
					url: "/elementRepository/addSingleElement",
					method: "post",
					params: {
						repositoryId: this.repositoryId,
						uiId: this.selectedUI,
						userId: this.userId,
						element: {
							elementName: this.addEleform.elementName,
							classType: this.addEleform.classType,
							relateIdentifyObjectId: "",
							relateParentIdentifyObjectId: "",
							mainProperties: [
								{
									name: this.addEleform.name,
									value: this.addEleform.value,
									method: "",
									isRelative: null,
									toolName: "",
								},
							],
						},
					},
				}).then(
					(res) => {
						if (res.respCode == "0000") {
							this.getEleTree();
							this.$message("添加成功：" + res.respMsg);
						} else {
							this.$message("添加失败：" + rres.respMsg);
						}
					},
					(err) => {
						console.log(err);
					}
				);
			},
			modifySingleUI() {
				let _this = this
				Request({
					url: '/elementRepository/modifySingleUI',
					method: 'POST',
					params: {
						relateIdentifyObjectId: "",
						repositoryId: _this.repositoryId,
						uiId: _this.uiUID,
						uiName: _this.input,
						userId: this.userId
					}
				}).then(
					(res) => {
						_this.getEleTree();
						_this.editFlag = true;
						_this.$message(res.respMsg);
					},
					(err) => {
						console.log(err);
					}
				);
			},
			// 修改单个元素信息
			modifySingleElement() {
				const _this = this;

				console.log(this.mainProperties);
				Request({
					url: "/elementRepository/modifySingleElement",
					method: "post",
					params: {
						repositoryId: _this.repositoryId,
						uiId: _this.selectedEle[0],
						userId: this.userId,
						element: {
							elementId: _this.selectedEle[2].id,
							elementName: _this.input,
							classType: _this.classType,
							relateIdentifyObjectId: "",
							relateParentIdentifyObjectId: "",
							mainProperties: [
								{
									name: _this.mainProperties[0].name,
									value: _this.mainProperties[0].value,
									method: "",
									isRelative: null,
									toolName: "",
								},
							],
							additionalProperties: [],
							assistantProperties: [],
							relateProperties: [],
						},
					},
				}).then(
					(res) => {
						this.getEleTree();
						this.editFlag = true;
						this.$message(res.respMsg);
					},
					(err) => {
						console.log(err);
					}
				);
			},
		},
		mounted() {
			//  this.$message.success(`transId:${this.transId} + autId: ${this.autId}`)
			this.getEleTree();
			this.getClass();
		},
	};
</script>
<style lang="less" scoped>
	.ele-container {
		display: flex;
	}

	.ele-left {
		width: 40%;
		padding: 10px;
		margin-right: 10px;
	}

	.ele-right {
		width: 60%;
		padding: 10px;
	}

	.keywords {
		margin-bottom: 10px;
		width: 93%
	}

	.content {
		padding: 0px 5px;
		min-height: 450px;
	}

	.page-inner {
		padding-top: 0px !important;
	}

	.el-select {
		width: 100%;
	}

	//统一header高度
	.headerHeight {
		min-height: 20.8px;
	}

	.el-row {
		padding: 10px 0px;
	}
</style>
