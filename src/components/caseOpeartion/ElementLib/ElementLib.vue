<template>
  <div class="elementDiv">
		<div class="leftCard">
			<div class="title">元素库</div>
			<el-card>
				<el-input
					placeholder="输入关键字进行过滤"
					v-model="filterText">
				</el-input>
				<el-row>
					<el-button
						type="primary"
						size="small"
						@click="addUI"
						>添加UI
					</el-button>
					<el-button
						type="primary"
						size="small"
						@click="removeUI"
						>删除UI
					</el-button>
					<el-button
						type="primary"
						size="small"
						@click="addElement"
						>添加元素
					</el-button>
					<el-button
						type="primary"
						size="small"
						@click="removeElement"
						>删除元素
					</el-button>
					<el-tree
						:data="getList"
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
			<el-card>
				<div
					class="tipDiv"
					v-if="contentFlag">
					请选择UI或者元素
				</div>
				<div v-else>
					<div class="parentDiv" v-if="parentNode">
						<el-form
							label-width="150px">
							<el-row>
								<el-form-item
									label="UI名称：">
									<el-input v-model="uiName"></el-input>
								</el-form-item>
							</el-row>
							<el-row>
								<el-form-item label="关联对象库对象：">
									<el-col :span="12">
										<el-input v-model="relateIdentifyObjectId" disabled></el-input>
									</el-col>
									<el-col :span="12">
										<el-button
											type="primary"
											size="small"
											icon="el-icon-link"
											@click="linkObject"
											>关联对象
										</el-button>
										<el-button
											type="primary"
											size="small"
											icon="el-icon-delete"
											@click="removeLink"
											>解除关联
										</el-button>
										<el-button
											type="primary"
											size="small"
											icon="el-icon-folder"
											@click="modifySingleUI"
											>保存
										</el-button>
									</el-col>
								</el-form-item>
							</el-row>
						</el-form>
					</div>
					<div v-else>
						<element-config
							:elementObj="configObj"
							:objects="objects"
							:uiId='uiId'
							:repositoryId="repositoryId">
						</element-config>
					</div>
				</div>
			</el-card>
		</div>
		<el-dialog
			width="500px"
			:title="dialogTitles[dialogIndex]"
			:visible.sync="dialogVisible"
			@before-close="handleBeforeClose">
			<el-form
				class="dialogFormStyle"
				label-width="100px">
				<el-form-item
					v-if="dialogIndex === 0"
					label="UI名称">
					<el-input
						placeholder="请输入UI名称"
						v-model="dialogUIName">
					</el-input>
				</el-form-item>
				<el-form-item
					v-else
					label="元素名称">
					<el-input
						placeholder="请输入元素名称"
						v-model="dialogElementName">
					</el-input>
				</el-form-item>
				<span>若要添加多个，请以英文逗号“,”隔开。</span>
				<el-row>
					<el-button
						type="warning"
						size="small"
						plain
						@click="dialogCancel"
						>取消
					</el-button>
					<el-button
						type="primary"
						size="small"
						@click="dialogSure"
						>添加
					</el-button>
				</el-row>
			</el-form>
		</el-dialog>
		<el-dialog
			class="objDialog"
			width="600px"
			title="对象库"
			:visible.sync="objectDialogVisible">
			<div class="objectDiv">
				<el-tree
					:data="objects"
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
	import Request from "../../../libs/request";
	import VueMixins from "@/libs/vueMixins.js";
	import ElementConfig from './ElementConfig'
  export default {
		mixin: [VueMixins],
    name: "ElementLib",
		data() {
    	return {
    		getList: [], // 元素库数据
				filterText: '', // 搜索需要的数据
				getObjects: [], // 获取的对象库数据
				contentFlag: true,
				rightTitle: '名称',
				parentNode: true,
				uiName: '', //UI名称
				uiId: '', // UI的id
				dialogTitles: ['添加UI','添加元素'],
				dialogIndex: 0,
				dialogVisible: false, // 添加数据的对话框
				// 对话框数据
				dialogUIName: '',
				dialogElementName: '',
				repositoryId: '25',
				transactId: '148',
				// 控制关联对象的对话框
				objectDialogVisible: false,
				selectObjectId: '', // 选择的Object的Id
				selectObjectName: '', // 选择的Object的Name
				// 右侧界面所需数据
				relateIdentifyObjectId: '', // 相关元素id
				elementId: '',  // 删除元素所需要的id
				// 元素配置组件传递的数据
				configObj: {}
			}
		},
		computed: {
			// 元素库props
			defaultProps() {
				return {
					label: (data)=> {
						if (data.uiName) {
							return data.uiName
						}else {
							return data.elementName
						}
					},
					children: 'elements'
				}
			},
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
		created() {
			this.getList = this.list
			this.getObjects = this.objects
			this.queryAllElementsForATransact()
			console.log(this.getList,this.getObjects)
		},
		props: {
			list: Array,
			objects: Array
		},
		watch: {
			filterText(val) {
				// filter: 接收的参数会在filter-node-method作为第一个参数
				// val参数就是filterText监督变化的值
				console.log(val)
				this.$refs.tree.filter(val)
			}
		},
		methods: {
			// 查询全部元素与UI
			queryAllElementsForATransact() {
				Request({
					url: '/elementRepository/queryAllElementsForATransact',
					method: 'POST',
					params: {
						transactId: this.transactId
					}
				}).then(res => {
					if (res.respCode === '0000') {
						this.getList = res.uis
						this.$message.success(res.respMsg)
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			// 查询单个UI
			querySingleUI(uiId) {
				Request({
					url: '/elementRepository/querySingleUI',
					method: 'POST',
					params: {
						repositoryId: this.repositoryId,
						uiId: uiId
					}
				}).then(res => {
					if (res.respCode === '0000') {
						console.log('查询单个UI',res)
						this.relateIdentifyObjectId = res.relateIdentifyObjectId
						this.selectObjectId = res.relateIdentifyObjectId
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
    	// 添加UI
			addUI() {
				this.dialogVisible = true
				this.dialogIndex = 0
			},
			// 删除UI
			removeUI() {
				if (this.uiId.length === 0) {
					this.$message.warning('请选择UI')
				}else {
					Request({
						url: '/elementRepository/deleteSingleUI',
						method: 'POST',
						params: {
							repositoryId: this.repositoryId,
							uiId: this.uiId
						}
					}).then(res => {
						if (res.respCode === '0000') {
							this.$message.success(res.respMsg)
							this.queryAllElementsForATransact()
						}else {
							this.$message.warning(res.respMsg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					})
				}
			},
			// 添加元素
			addElement() {
				if (this.uiId.length === 0) {
					this.$message.warning('请选择UI')
				}else {
					this.dialogVisible = true
					this.dialogIndex = 1
				}
			},
			// 删除元素
			removeElement() {
				if (this.uiId.length === 0) {
					this.$message.warning('请选择UI')
				}else {
					Request({
						url: '/elementRepository/deleteSingleElement',
						method: 'POST',
						params: {
							elementId: this.elementId,
							repositoryId: this.repositoryId,
							uiId: this.uiId
						}
					}).then(res => {
						if (res.respCode === '0000') {
							this.$message.success(res.respMsg)
							this.queryAllElementsForATransact()
						}else {
							this.$message.warning(res.respMsg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					})
				}
			},
			// 节点过滤事件
			filterNode(value,data) {
				console.log(value,data)
				if (!value) return true
				// 包含返回true 否则返回false
				// return data.label.indexOf(value) !== -1
				if(data.uiName) {
					console.log('true')
					return data.uiName.indexOf(value) !== -1
				}else {
					return data.elementName.indexOf(value) !== -1
				}
			},
    	// 处理节点点击
			handleNodeClick(el) {
				this.contentFlag = false
				if (el.hasOwnProperty('uiName')) {
					this.parentNode = true
					this.rightTitle = el.uiName
					this.uiName = el.uiName
					this.relateIdentifyObjectId = el.relateIdentifyObjectId
					this.uiId = el.uiId
					this.querySingleUI(this.uiId)
				}else {
					this.rightTitle = el.elementName
					this.elementId = el.elementId
					this.parentNode = false
					this.configObj = el
					console.log(this.configObj);
				}
			},
			// 处理对话框关闭
			handleBeforeClose(done) {
				console.log('handleBeforeClose');
				done()
				return true
			},
			dialogCancel() {
				this.dialogVisible = false
				this.dialogElementName = ""
				this.dialogUIName = ""
			},
			dialogSure() {
				console.log('sure',this.dialogIndex,this.uiId)
				if(this.dialogIndex === 0) {
					let uis = [{uiName: this.dialogUIName}]
					console.log(uis);
					Request({
						url: '/elementRepository/batchAddUI',
						method: 'POST',
						params: {
							repositoryId: this.repositoryId,
							uis: uis
						}
					}).then(res => {
						if (res.respCode === '0000') {
							this.$message.success(res.respMsg)
							this.queryAllElementsForATransact()
							this.dialogVisible = false
						}else {
							this.$message.warning(res.respMsg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					})
				}else {
					let elements = [{elementName: this.dialogElementName}]
					Request({
						url: '/elementRepository/batchAddOrModifyElement',
						method: 'POST',
						params: {
							elements: elements,
							repositoryId: this.repositoryId,
							uiId: this.uiId
						}
					}).then(res => {
						if (res.respCode === '0000') {
							this.$message.success(res.respMsg)
							this.queryAllElementsForATransact()
							this.dialogVisible = false
						}else {
							this.$message.warning(res.respMsg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					})
				}
			},
			// 保存对象库关联
			modifySingleUI() {
				Request({
					url: '/elementRepository/modifySingleUI',
					method: 'POST',
					params: {
						relateIdentifyObjectId: this.selectObjectId,
						repositoryId: this.repositoryId,
						uiId: this.uiId,
						uiName: this.uiName
					}
				}).then(res => {
					if (res.respCode === '0000') {
						this.$message.success(res.respMsg)
						this.queryAllElementsForATransact()
						this.contentFlag = true
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			// 对象库
			nodeClickObj(val) {
				console.log(val);
				this.selectObjectId = val.objectId
				this.objectName = val.objectName
			},
			// 关联对象
			linkObject() {
				this.objectDialogVisible = true
			},
			// 解除关联
			removeLink() {
				this.selectObjectId = ""
				this.relateIdentifyObjectId = ""
			},
			// 对象库取消
			objectCancel() {
				this.objectDialogVisible = false
			},
			// 对象库确认
			objectSure() {
				this.objectDialogVisible = false
				this.relateIdentifyObjectId = this.objectName
			}
		},
		components: {
			ElementConfig
		}
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
			min-height: 660px;
			.title {
				color: #868886;
				padding-left: 20px;
				margin-bottom: 10px;
			}
			.el-card {
				height: calc(100% - 40px);
				.el-input {
					width: 90%;
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
			.title {
				color: #868886;
				padding-left: 20px;
				margin-bottom: 10px;
				font-size: 18px;
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
			margin-top: -20px;
		}
		.el-row {
			display: flex;
			justify-content: flex-end;
			border-top: 1px solid #e5e5e5;
			margin-top: 40px;
			padding-top: 10px;
			margin-bottom: -20px;
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
