<template>
  <div>
		<el-form
			class="baseForm"
			label-width="140px">
			<el-row>
				<el-form-item
					label="元素名称">
					<el-input v-model="elementName"></el-input>
				</el-form-item>
				<el-form-item
					label="类型">
					<el-select placeholder="--选择控件类型--" v-model="selectedType">
						<el-option v-for="(item,index) in controlType"
											 :key="index" :value="item" :label="item">
						</el-option>
					</el-select>
				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item
					label="对象库中的父对象">
					<el-input
						v-model="relateParentIdentifyObjectId"
						disabled>
					</el-input>
				</el-form-item>
				<div class="buttons">
					<el-button
						type="primary"
						size="small"
						@click="setParentObj"
						>设置父对象
					</el-button>
					<el-button
						type="primary"
						size="small"
						@click="removeParentLink"
						>解除关联
					</el-button>

				</div>
			</el-row>
			<el-row>
				<el-form-item
					label="对象库中的关联对象">
					<el-input
						v-model="relateIdentifyObjectId"
						disabled>
					</el-input>
				</el-form-item>
				<div class="buttons">
					<el-button
						type="primary"
						size="small"
						@click="setLinkObj"
						>设置关联对象
					</el-button>
					<el-button
						type="primary"
						size="small"
						@click="removeObjLink"
						>解除关联
					</el-button>
				</div>
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
					:data="mainProperties"
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
								v-model="mainProperties[scope.$index].name">
							</el-input>
						</template>
					</el-table-column>
					<el-table-column
						label="属性值"
						min-width="40%">
						<template
							slot-scope="scope">
							<el-input
								v-model="mainProperties[scope.$index].value">
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
					:data="additionalProperties"
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
								v-model="additionalProperties[scope.$index].name">
							</el-input>
						</template>
					</el-table-column>
					<el-table-column
						label="属性值"
						min-width="40%">
						<template
							slot-scope="scope">
							<el-input
								v-model="additionalProperties[scope.$index].value">
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
					:data="assistantProperties"
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
								v-model="assistantProperties[scope.$index].name">
							</el-input>
						</template>
					</el-table-column>
					<el-table-column
						label="属性值"
						min-width="40%">
						<template
							slot-scope="scope">
							<el-input
								v-model="assistantProperties[scope.$index].value">
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
					:data="relateProperties"
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
								v-model="relateProperties[scope.$index].name">
							</el-input>
						</template>
					</el-table-column>
					<el-table-column
						label="属性值"
						min-width="40%">
						<template
							slot-scope="scope">
							<el-input
								v-model="relateProperties[scope.$index].value">
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
		<el-dialog
			class="objDialog"
			width="600px"
			title="对象库"
			:visible.sync="objectDialogVisible">
			<div class="objectDiv">
				<el-tree
					:data="getObjects"
					:props="objectProps"
					@node-click="nodeClickObj">
				</el-tree>
			</div>
			<el-row>
				<el-button
					type="warning"
					size="small"
					plain
					@click="objectCancel"
					>取消
				</el-button>
				<el-button
					type="primary"
					size="small"
					@click="objectSure"
					>确认
				</el-button>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
	import Request from '../../../libs/request'
  export default {
    name: "ElementConfig",
		data() {
    	return {
    		baseInfo: {},
				getObjects: [],
				controlType: [],
				selectedType: '', // 选择的控件类型
				elementName: '', // 元素名称
				objectDialogVisible: false,
				// 对象库树处理
				relateParentIdentifyObjectId: '', // 父对象名称
				selectedParentId: '', // 父对象Id
				relateIdentifyObjectId: '', // 关联对象名称
				selectedLinkId: '', // 关联对象Id
				selectedIndex: 1, // 对象库设置，1为父对象，2为关联对象
				tempName: '', // 临时姓名
				tempId: '', // 临时Id
				mainProperties: [], //主属性表格
				mainFlag: false, // 选择的主属性的内容
				additionalProperties: [], // 附加属性
				additionalFlag: false, // 选择的附加属性
				assistantProperties: [], // 辅助属性
				assistantFlag: false, // 选择的辅助属性
				relateProperties: [], // 相关属性
				relateFlag: false, // 选择的相关属性
			}
		},
		props: {
			elementObj: Object,
			objects: Array,
			uiId: Number,
			repositoryId: String
		},
		created() {
    	this.configBaseInfo()
		},
		computed: {
			// 对象库props
			objectProps() {
				return {
					label: (data) => {
						if (data.parentObjectId === 0 || !data.parentObjectId) {
							return data.objectName
						}else {
							return false
						}
					},
					children: '',
				}
			}
		},
		methods: {
    	// 配置基础信息
			configBaseInfo() {
				this.baseInfo = this.elementObj
				this.getObjects = this.objects
				this.elementName = this.baseInfo.elementName
				this.relateParentIdentifyObjectId = this.baseInfo.relateParentIdentifyObjectId
				this.relateIdentifyObjectId = this.baseInfo.relateIdentifyObjectId
				this.mainProperties = this.baseInfo.mainProperties
				this.additionalProperties = this.baseInfo.additionalProperties
				this.assistantProperties = this.baseInfo.assistantProperties
				this.relateProperties = this.baseInfo.relateProperties
			},
			// 设置父对象
			setParentObj() {
				this.objectDialogVisible = true
				this.selectedIndex = 1
			},
			// 移除父关联
			removeParentLink() {
				this.relateParentIdentifyObjectId = ''
				this.selectedParentId = ''
			},
			// 设置关联对象
			setLinkObj() {
				this.objectDialogVisible = true
				this.selectedIndex = 2
			},
			// 移除对象关联
			removeObjLink() {
				this.relateIdentifyObjectId = ''
				this.selectedLinkId = ''
			},
			// 对象库
			nodeClickObj(val) {
				console.log(val);
				this.tempName = val.objectName
				this.tempId = val.objectId
			},
			// 对象库取消
			objectCancel() {
				this.objectDialogVisible = false
			},
			// 对象库确认
			objectSure() {
				this.objectDialogVisible = false
				if (this.selectedIndex === 1) {
					this.relateParentIdentifyObjectId = this.tempName
					this.selectedParentId = this.tempId
				}else {
					this.relateIdentifyObjectId = this.tempName
					this.selectedLinkId = this.tempId
				}
			},
			// 删除按钮
			deleteButton(index) {
				switch (index) {
					case 1: {
						if (typeof this.mainFlag !== 'number') {
							this.$message.warning('选择要移除的主属性内容')
						}else {
							this.mainProperties.splice(this.mainFlag,1)
						}
					}break;
					case 2: {
						if (typeof this.additionalFlag !== 'number') {
							this.$message.warning('选择要移除的附加属性内容')
						}else {
							this.additionalProperties.splice(this.additionalFlag,1)
						}
					}break;
					case 3: {
						if (typeof this.assistantFlag !== 'number') {
							this.$message.warning('选择要移除的辅助属性内容')
						}else {
							this.assistantProperties.splice(this.assistantFlag,1)
						}
					}break;
					case 4: {
						if (typeof this.relateFlag !== 'number') {
							this.$message.warning('选择要移除的关联属性内容')
						}else {
							this.relateProperties.splice(this.relateFlag,1)
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
						this.mainProperties.push(obj)
						}break;
					case 2: {
						this.additionalProperties.push(obj)
						}break;
					case 3: {
						this.assistantProperties.push(obj)
						}break;
					case 4: {
						this.relateProperties.push(obj)
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
				let element = {
					additionalProperties: _this.additionalProperties,
					assistantProperties: _this.assistantProperties,
					classType: _this.baseInfo.classType,
					elementId: _this.baseInfo.elementId,
					elementName: _this.elementName,
					mainProperties: _this.mainProperties,
					relateIdentifyObjectId: _this.selectedLinkId,
					relateParentIdentifyObjectId: _this.selectedParentId,
					relateProperties: _this.relateProperties
				}
				console.log(element,this.repositoryId,this.uiId);
				Request({
					url: '/elementRepository/modifySingleElement',
					method: 'POST',
					params: {
						element,
						repositoryId: this.repositoryId,
						uiId: this.uiId
					}
				}).then(res => {
					if (res.respCode === "0000") {
						this.$message.success(res.respMsg)
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
			.buttons {
				float: left;
				margin-left: 30px;
				.el-button {
					margin-right: 30px;
				}
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
</style>
