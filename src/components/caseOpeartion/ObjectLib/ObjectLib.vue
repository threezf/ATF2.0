<template>
	<div class="elementDiv">
		<div class="leftCard">
			<div class="title">对象库</div>
			<el-card>
				<el-input
					size="small"
					v-model="filterText"
					placeholder="输入关键字进行过滤">
					<el-button 
						slot="append"
						icon="el-icon-search"
					></el-button>
				</el-input>
				<el-row>
					<el-button
						type="primary"
						size="small"
						@click="addObject"
					>添加对象
					</el-button>
					<el-button
						type="primary"
						size="small"
						@click="removeObject"
					>删除对象
					</el-button>
					<el-tree
						accordion
						:data="objectList"
						:props="defaultProps"
						@node-click="handleNodeClick"
						:filter-node-method="filterNode"
						ref="tree">
					</el-tree>
				</el-row>
			</el-card>
		</div>
		<div class="rightCard">
			<div class="title">
				{{rightTitle}}
			</div>
			<el-card v-show="maskFlag" class="mask">
				请选择对象
			</el-card>
			<el-card v-show="!maskFlag" class="rightBody">
				<el-form
					class="baseForm"
					label-width="80px">
					<el-row>
						<el-form-item
							label="对象名称">
							<el-input size="small" v-model="selectObject.objectName"></el-input>
						</el-form-item>
						<el-form-item
							label="类型">
							<el-select 
								size="small"
								placeholder="--选择构件类型--"
								v-model="selectObject.classType">
								<el-option 
									v-for="(item) in omClassRespDTOList"
									:key="item.id" 
									:value="String(item.id)" 
									:label="item.name">
								</el-option>
							</el-select>
						</el-form-item>
					</el-row>
				</el-form>
				<div class="attributeInfo">
					<div class="title">属性</div>
					<div class="mainAttributeDiv">
						<el-row>
							<span>主属性</span>
							<span>
								<el-button
									type="danger"
									size="mini"
									icon="el-icon-minus"
									@click="deleteButton(1)"
									plain>
								</el-button>
								<el-button
									type="success"
									size="mini"
									icon="el-icon-plus"
									@click="addButton(1)"
									plain>
								</el-button>
							</span>
						</el-row>
						<el-table
							width="100%"
							:data="selectObject.mainProperties"
							stripe
							border
							highlight-current-row>
							<el-table-column
								width="35px">
								<template slot-scope="scope">
									<el-radio
										v-model="mainFlag"
										:label='scope.$index'
										@change="handleMainChange">
									</el-radio>
								</template>
							</el-table-column>
							<el-table-column
								label="属性名"
								min-width="40%">
								<template
									slot-scope="scope">
									<el-input
										v-model="scope.row.name">
									</el-input>
								</template>
							</el-table-column>
							<el-table-column
								label="属性值"
								min-width="40%">
								<template
									slot-scope="scope">
									<el-input
										v-model="scope.row.value">
									</el-input>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="attachAttributeDiv">
						<el-row>
							<span>附加属性</span>
							<span>
								<el-button
									type="danger"
									size="mini"
									icon="el-icon-minus"
									@click="deleteButton(2)"
									plain>
								</el-button>
								<el-button
									type="success"
									size="mini"
									icon="el-icon-plus"
									@click="addButton(2)"
									plain>
								</el-button>
							</span>
						</el-row>
						<el-table
							:data="selectObject.additionalProperties"
							width="100%"
							stripe
							border
							highlight-current-row>
							<el-table-column
								width="35px">
								<template
									slot-scope="scope">
									<el-radio
										v-model="additionalFlag"
										:label="scope.$index"
										@change="handleAdditionChange">
									</el-radio>
								</template>
							</el-table-column>
							<el-table-column
								label="属性名"
								min-width="40%">
								<template
									slot-scope="scope">
									<el-input
										v-model="scope.row.name">
									</el-input>
								</template>
							</el-table-column>
							<el-table-column
								label="属性值"
								min-width="40%">
								<template
									slot-scope="scope">
									<el-input
										v-model="scope.row.value">
									</el-input>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="auxiliaryAttributeDiv">
						<el-row>
							<span>辅助属性</span>
							<span>
								<el-button
									type="danger"
									size="mini"
									icon="el-icon-minus"
									@click="deleteButton(3)"
									plain>
								</el-button>
								<el-button
									type="success"
									size="mini"
									icon="el-icon-plus"
									@click="addButton(3)"
									plain>
								</el-button>
							</span>
						</el-row>
						<el-table
							:data="selectObject.assistantProperties"
							width="100%"
							stripe
							border
							highlight-current-row>
							<el-table-column
								width="35px">
								<template
									slot-scope="scope">
									<el-radio
										v-model="assistantFlag"
										:label="scope.$index"
										@change="handleAssistanceChange">
									</el-radio>
								</template>
							</el-table-column>
							<el-table-column
								label="属性名"
								min-width="40%">
								<template
									slot-scope="scope">
									<el-input
										v-model="scope.row.name">
									</el-input>
								</template>
							</el-table-column>
							<el-table-column
								label="属性值"
								min-width="40%">
								<template
									slot-scope="scope">
									<el-input
										v-model="scope.row.value">
									</el-input>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="relativeAttributeDiv">
						<el-row>
							<span>关联属性</span>
							<span>
								<el-button
									type="danger"
									size="mini"
									icon="el-icon-minus"
									@click="deleteButton(4)"
									plain>
								</el-button>
								<el-button
									type="success"
									size="mini"
									icon="el-icon-plus"
									@click="addButton(4)"
									plain>
								</el-button>
							</span>
						</el-row>
						<el-table
							:data="selectObject.relateProperties"
							width="100%"
							stripe
							border
							highlight-current-row>
							<el-table-column
								width="35px">
								<template
									slot-scope="scope">
									<el-radio
										v-model="relateFlag"
										:label="scope.$index"
										@change="handleLinkChange">
									</el-radio>
								</template>
							</el-table-column>
							<el-table-column
								label="属性名"
								min-width="40%">
								<template
									slot-scope="scope">
									<el-input
										v-model="scope.row.name">
									</el-input>
								</template>
							</el-table-column>
							<el-table-column
								label="属性值"
								min-width="40%">
								<template
									slot-scope="scope">
									<el-input
										v-model="scope.row.value">
									</el-input>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-row class="saveRow">
						<el-button
							type="primary"
							size="small"
							@click="saveObject"
						>保存
						</el-button>
					</el-row>
				</div>
			</el-card>
		</div>
		<el-dialog
			width="500px"
			title="添加对象"
			:visible.sync="dialogVisible">
			<el-form
				class="dialogFormStyle"
				label-width="100px">
				<el-form-item
					label="对象名称">
					<el-input
					 	size="small"
						placeholder="请输入UI名称"
						v-model="objectName">
					</el-input>
				</el-form-item>
				<span>若要添加多个，请以英文逗号“,”隔开。</span>
				<el-row type="flex" justify="center">
					<el-button
						type="primary"
						size="small"
						@click="dialogSure"
						>添加
					</el-button>
					<el-button
						type="warning"
						size="small"
						plain
						@click="dialogCancel"
						>取消
					</el-button>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import Request from '../../../libs/request'
	import ObjectConfig from  './ObjectConfig'
  export default {
    name: "ObjectLib",
		data() {
    	return {
				transactId: '',
				repositoryId: '',
    		objectList: [], // 对象数组
				filterText: '', // 过滤数据
				rightTitle: '对象名称',
				dialogVisible: false,
				objectName: '', // 对象名称
				selectedId: '', // 对象id
				repositoryId: '',
				selectObject: {}, // 点击行获取到的对象
				repositoryId: '',
				omClassRespDTOList: [], // 构件类型
				mainFlag: false, // 选择的主属性的内容
				additionalFlag: false, // 选择的附加属性
				assistantFlag: false, // 选择的辅助属性
				relateFlag: false, // 选择的相关属性
				maskFlag: true, // 遮挡标识
			}
		},
		props: {
			testCaseId: Number,
		},
		computed: {
			defaultProps() {
				return {
					label: data => {
						if(data.objectName) {
							return data.objectName
						}else {
							return false
						}
					},
					children: 'subIdentifyElementIds'
				}
			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val)
			}
		},
		created() {
			this.getSingleTestCaseInfo()
		},
		methods: {
			// 获取单个用例详情数据
			getSingleTestCaseInfo() {
				let _this = this
				Request({
					url: "/testcase/getSingleTestCaseInfo",
					method: "POST",
					params: {
						id: this.testCaseId
					}
				}).then(res => {
					if (res.respCode === "0000") {
						_this.transactId = res.testcaseViewRespDTO.transId
						_this.queryAllObjectForATransact()
						_this.queryAutVisibleOmClasses(res.testcaseViewRespDTO.autId)
					} else {
						this.$message.warning(res.respMsg);
					}
				})
				.catch(err => {
					this.$message.error("连接失败");
				});
			},
    	// 查询全部
			queryAllObjectForATransact() {
				Request({
					url: '/objectRepository/queryAllObjectForATransact',
					method: 'POST',
					params: {
						transactId: this.transactId
					}
				}).then(res => {
					console.log(res,res.respCode === '0000');
					if (res.respCode === '0000') {
						// this.$message.success(res.respMsg)
						this.objectList = res.objects
						this.repositoryId = res.repositoryId
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			// 获取构件类型
			queryAutVisibleOmClasses(id) {
				Request({
					url: '/aut/queryAutVisibleOmClasses',
					method: 'POST',
					params: {
                        autId:id,
                        companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
					}
				}).then(res => {
					if(res.respCode === '0000') {
						this.omClassRespDTOList = res.omClassRespDTOList
					}
				}).catch(err => {
					console.log('获取失败')
				})
			},
			// 添加对象
			addObject() {
				this.dialogVisible = true
			},
			// 删除对象
			removeObject() {
    		if(!this.selectedId) {
    			this.$message.warning('请选择要删除的对象')
				}else {
    			Request({
						url: '/objectRepository/deleteSingleObject',
						method: 'POST',
						params: {
							objectId: this.selectedId,
							repositoryId: this.repositoryId
						}
					}).then(res => {
						if (res.respCode === '0000') {
							this.$message.success(res.respMsg)
							this.queryAllObjectForATransact()
							this.maskFlag = true
						}else {
							this.$message.warning(res.respMsg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					})
				}
			},
			dialogCancel() {
				this.dialogVisible = false
			},
			dialogSure() {
				let params
				let objects = []
				this.objectName.split(',').forEach(item => {
					objects.push({objectName: item, parentObjectId: "0"})
				})
				params = {
					objects,
					repositoryId: this.repositoryId
				}
				console.log('dialogSure',params)
				Request({
					url: '/objectRepository/batchAddOrModifyObject',
					method: 'POST',
					params
				}).then(res => {
					if (res.respCode === '0000') {
						this.$message.success(res.respMsg)
						this.queryAllObjectForATransact()
						this.objectName = ""
						this.maskFlag = true
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
    		this.dialogVisible = false
			},
			handleNodeClick(val) {
				console.log('handleNodeClick', val);
				this.maskFlag = false
				this.selectedId = val.objectId
				this.selectObject = val
				if(val.additionalProperties === null) {
					this.selectObject.additionalProperties = []
				}
				if(val.assistantProperties === null) {
					this.selectObject.assistantProperties = []
				}
				if(val.mainProperties === null) {
					this.selectObject.mainProperties = []
				}
				if(val.relateProperties === null) {
					this.selectObject.relateProperties = []
				}
				this.rightTitle = val.objectName
			},
			querySingleObject(objectId) {
				Request({
					url: '/objectRepository/querySingleObject',
					method: 'POST',
					params: {
						objectId,
						repositoryId: this.repositoryId
					}
				}).then(res => {
					console.log(res)
					if (res.respCode !=='0000') {
						this.$message.warning(res.respMsg)
					}
					
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			filterNode(value,data) {
				console.log('filterNode', value, data);
				if(!value) return true
				return data.objectName.indexOf(value) !== -1
			},
			/** 
			 * 右侧card事件
			 */ 
			// 删除按钮
			deleteButton(index) {
				switch (index) {
					case 1: {
						if (typeof this.mainFlag !== 'number') {
							this.$message.warning('选择要移除的主属性内容')
						}else {
							this.selectObject.mainProperties.splice(this.mainFlag,1)
						}
					}break;
					case 2: {
						if (typeof this.additionalFlag !== 'number') {
							this.$message.warning('选择要移除的附加属性内容')
						}else {
							this.selectObject.additionalProperties.splice(this.additionalFlag,1)
						}
					}break;
					case 3: {
						if (typeof this.assistantFlag !== 'number') {
							this.$message.warning('选择要移除的辅助属性内容')
						}else {
							this.selectObject.assistantProperties.splice(this.assistantFlag,1)
						}
					}break;
					case 4: {
						if (typeof this.relateFlag !== 'number') {
							this.$message.warning('选择要移除的关联属性内容')
						}else {
							this.selectObject.relateProperties.splice(this.relateFlag,1)
						}
					}break;
					default:
						break;
				}
			},
			// 添加按钮
			addButton(index) {
				let obj = {
					name: '',
					value: '',
					method: "",
					isRelative: null,
					toolName: ""
				}
				switch (index) {
					case 1: {
						this.selectObject.mainProperties.push(obj)
					}break;
					case 2: {
						this.selectObject.additionalProperties.push(obj)
					}break;
					case 3: {
						this.selectObject.assistantProperties.push(obj)
					}break;
					case 4: {
						this.selectObject.relateProperties.push(obj)
					}break;
					default:
						break;
				}
			},
			//主表格事件处理
			handleMainChange(val) {
				console.log('main',val);
				this.mainFlag = val
			},
			//附加表格事件处理
			handleAdditionChange(val) {
				console.log('additionalFlag',val);
				this.additionalFlag = val
			},
			//帮助表格事件处理
			handleAssistanceChange(val) {
				console.log('assistantFlag',val);
				this.assistantFlag = val
			},
			//关联表格事件处理
			handleLinkChange(val) {
				console.log('relateFlag',val);
				this.relateFlag = val
			},
			// 保存数据
			saveObject() {
				let _this = this;
				let object = _this.selectObject
				// console.log('保存数据',element,this.repositoryId);
				Request({
					url: '/objectRepository/modifySingleObject',
					method: 'POST',
					params: {
						object,
						repositoryId: this.repositoryId,
					}
				}).then(res => {
					if (res.respCode === "0000") {
						this.$message.success(res.respMsg)
						this.maskFlag = true
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			}
		},
  }
</script>

<style lang="less" scoped>
	.elementDiv {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.leftCard {
			float: left;
			width: 35%;
			height: 700px;
			.title {
				color: #868886;
				padding-left: 20px;
				margin-bottom: 10px;
			}
			.el-card {
				height: calc(100% - 40px);
				.el-input {
					width: 70%;
				}
				.el-row {
					margin-top: 10px;
					margin-left: 10px;
					.el-button {
						height: 36px;
					}
				}
				.el-tree {
					margin-top: 20px;
				}
			}
		}
		.rightCard {
			width: 64%;
			height: 700px;
			.title {
				color: #868886;
				padding-left: 20px;
				margin-bottom: 10px;
				font-size: 18px;
			}
			.mask {
				height: calc(100% - 40px);
				line-height: 660px;
				font-size: 30px;
				color: #cccccc;
				text-align: center;
			}
			.el-card {
				height: calc(100% - 40px);
				.tipDiv {
					padding: 0;
					margin: 0;
					height: (100% - 40px);
					font-size: 30px;
					color: #cccccc;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.parentDiv {
					.el-form-item {
						width: 100%;
						.el-input {
							width: 300px;
						}
					}
				}
			}
		}
	}
	.dialogFormStyle {
		.el-input {
			width: 310px;
		}
		span {
			color: #797979;
			display: inline-block;
			font-size: 14px;
			margin-left: 100px;
			margin-top: -30px;
		}
		.el-row {
			display: flex;
			justify-content: center;
			border-top: 1px solid #e5e5e5;
			margin-top: 40px;
			padding-top: 10px;
			margin-bottom: -20px;
		}
	}
	.rightBody {
		margin-left: 20px;
		margin-right: 10px;
		height: 685px;
		overflow: scroll;
		.baseForm {
			.el-row {
				height: 50px;
				margin-bottom: 20px;
				.el-form-item {
					float: left;
					width: 400px;
					color: #818c9c;
					margin-bottom: 0;
				}
			}
		}
		.attributeInfo {
			width: 50%;
			margin-left: 10px;
			.title {
				color: #aea4c1;
				padding-bottom: 5px;
				border-bottom: 1px solid #f5f7fa;
			}
			.mainAttributeDiv,
			.attachAttributeDiv,
			.auxiliaryAttributeDiv,
			.relativeAttributeDiv {
				margin-left: 30px;
				.el-row {
					overflow: hidden;
					span:nth-child(1) {
						float: left;
						color: #9c9f9f;
						font-size: 12px;
						margin-left: 5px;
					}
					span:nth-child(2) {
						float: right;
						.el-button {
							margin-left: 0;
						}
					}
				}
				.el-input__inner {
					border: none !important;
				}
			}
			.saveRow {
				display: flex;
				justify-content: flex-end;
				margin: 10px 5px -10px;
			}
		}
		.objDialog {
			.objectDiv {
				border: 1px solid gray;
				width: 98%;
				margin: 0 auto 30px auto;
				min-height: 400px;
			}
			.el-row {
				display: flex;
				justify-content: flex-end;
				padding-right: 10px;
				margin-bottom: -15px;
				margin-top: -10px;
			}
		}
	}
</style>
