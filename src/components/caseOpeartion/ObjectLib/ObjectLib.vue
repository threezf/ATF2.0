<template>
	<div class="elementDiv">
		<div class="leftCard">
			<div class="title">对象库</div>
			<el-card>
				<el-input
					v-model="filterText"
					placeholder="输入关键字进行过滤">
					<el-button
						slot="append"
						icon="el-icon-search"
						@click="searchObject"
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
						:data="objectList"
						:props="defaultProps"
						@node-click="handleNodeClick"
						:filter-node-method="filterNode"
						ref="tree">
					</el-tree>
				</el-row>
				{{selectObject}}
			</el-card>
		</div>
		<div class="rightCard">
			<div class="title">
				{{rightTitle}}
			</div>
			<el-card>
				<object-config
					:row="selectObject"
				  :repositoryId="repositoryId"
					:UiId="uiId"
				></object-config>
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
						placeholder="请输入UI名称"
						v-model="objectName">
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
	</div>
</template>

<script>
	import Request from '../../../libs/request'
	import ObjectConfig from  './ObjectConfig'
  export default {
    name: "ObjectLib",
		data() {
    	return {
    		objectList: [], // 对象数组
				filterText: '', // 过滤数据
				rightTitle: '对象名称',
				dialogVisible: false,
				objectName: '', // 对象名称
				selectedId: '', // 对象id
				repositoryId: '25',
				selectObject: {}, // 点击行获取到的对象
				transactId: '148'
			}
		},
		computed: {
			defaultProps() {
				return {
					label(data) {
						if(data.parentObjectId === 0) {
							return data.objectName
						}else {
							return false
						}
					},
					children: ''
				}
			}
		},
		created() {
    	this.queryAllObjectForATransact()
		},
		methods: {
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
						this.$message.success(res.respMsg)
						this.objectList = res.objects
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
    	// 搜索对象
			searchObject() {

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
				if(this.selectedId) {
					params = {
						objectId: this.selectedId,
						repositoryId: this.repositoryId
					}
				}else {
					params = {
						objects: [{
							objectName: this.objectName,
							parentObjectId: "0"
						}],
						repositoryId: this.repositoryId
					}
				}
				console.log(params)
				Request({
					url: '/objectRepository/batchAddOrModifyObject',
					method: 'POST',
					params
				}).then(res => {
					if (res.respCode === '0000') {
						this.$message.success(res.respMsg)
						this.queryAllObjectForATransact()
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
    		this.dialogVisible = false
			},
			handleNodeClick(val) {
				console.log(val);
				this.selectedId = val.objectId
				this.querySingleObject(this.selectedId)
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
					this.selectObject = res.object
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			filterNode(value,data) {
				console.log(value, data);
			}
		},
		components: {
    	ObjectConfig
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
			margin-top: -30px;
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
</style>
