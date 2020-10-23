<template>
  <div class="page-inner datatableFlowCaseStyle">
		<el-container> 
			<el-main>
				<el-row>
					<el-button
						type="primary"
						size="small"
						class="leftButton"
						icon="el-icon-refresh-right"
						@click="toggleSingle"
						>切换单用例显示
					</el-button>
				</el-row>
				<el-card class="leftCard">
					<!-- <div class="flowTitle">流程用例</div> -->
					<el-table
						:data="flowTestcaseInfos"
						class="tableLeft"
						@current-change="handleCurrentChange"
						border
						stripe
						highlight-current-row>
						<el-table-column 
							align="center"
							label="流程用例列"
							prop="casecode"
							width="217px">
						</el-table-column>
					</el-table>
				</el-card>
				<el-card class="rightCard">
					<el-row
						class="titleRow">
						<el-col :span="16">
							<h3>用例详情及节点数据</h3>
						</el-col>
						<el-col
							class="rightButtons"
							:span="8">
							<el-button
								type="primary"
								size="small"
								icon="el-icon-edit"
								@click="edit"
								>编辑
							</el-button>
							<el-button
								type="primary"
								size="small"
								icon="el-icon-edit"
								@click="saveFlowTestcaseInfo"
								>提交修改
							</el-button>
						</el-col>
					</el-row>
					<el-form
						:model="mainForm"
						class="main"
						label-width="220px">
						<el-row>
							<span class="detailSpan">
								用例详情
							</span>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item
									label="测试点">
									<el-input
										size="small"
										v-model="mainForm.testPoint" 
										:disabled="flag">
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item
									label="测试任务">
									<el-select
										size="small"
										v-model="mainForm.missionId" 
										:disabled="flag">
										<el-option
											v-for="item in missionList"
											:key="item.id"
											:value="item.id"
											:label="item.nameMedium">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item
									label="测试意图">
									<el-input
										size="small"
										v-model="mainForm.testDesign" 
										:disabled="flag">
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item
									label="检查点">
									<el-input
										size="small"
										v-model="mainForm.checkPoint" 
										:disabled="flag">
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item
									label="预计结果">
									<el-input
										size="small"
										v-model="mainForm.expectResult" 
										:disabled="flag">
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item
									label="测试步骤">
									<el-input
										class="textarea"
										type="textarea"
										v-model="mainForm.testStep" 
										:disabled="flag">
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<div 
						class="nodeInfoList"
						v-for="(item, index) in mainForm.nodeInfoList"
						:key="index">
						<hr>
						<el-row>
							<p class="nodeTitle">节点</p>
						</el-row>
						<el-form
							class="formInfo"
							label-width="220px"
							:inline="true">
							<el-row>
								<el-col :span="10">
									<el-form-item label="被测系统">
										<el-select 
											size="small"
											v-model="item.autName"
											:disabled="flag"
											filterable
											placeholder="被测系统名称">
											<el-option 
												v-for="(item) in autRespDTOList"
												:key="item.id"
												:value="item.nameMedium"
												:label="item.nameMedium">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="功能点">
										<el-select
											size="small"
											v-model="item.transName"
											placeholder="修改被测系统名称"
											filterable
											:disabled="flag">
										</el-select>
									</el-form-item>
									</el-col>
							</el-row>
							<el-row>
								<el-col :span="10">
									<el-form-item label="动作标识">
										<el-input 
											size="small"
											placeholder="修改动作标识"
											v-model="item.casecode"
											:disabled="flag">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="步骤序号">
										<el-input 
											size="small"
											placeholder="请输入关键序号"
											v-model="item.steporder"
											:disabled="flag">
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="关联脚本">
								<el-button 
									type="primary"
									size="small"
									@click="showScriptDialog(index)"
									>查看脚本
								</el-button>
							</el-form-item>
						</el-form>
						<div class="nodeData">
							<el-row>
								<p>节点数据</p>
							</el-row>
							<el-form :inline="true" label-width="220px">
								<el-form-item v-for="(it, ind) in item.nodeData" :label="it.widgetName+it.colName" :key="ind">
									<p>										
										<el-input size="small" placeholder="节点数据" v-model="it.data" :disabled="flag"></el-input>
										<el-button icon="el-icon-setting" size="small" plain></el-button>										
									</p>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</el-card>
			</el-main>
		</el-container>
		<el-dialog 
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			class="dialog"
			width="47%">
			<el-table
				:data="dialogTableData"
				stripe
				border
				highlight-current-row>
				<el-table-column 
					label="#" 
					width="50px">
					<template
						slot-scope="scope">
						{{scope.$index + 1}}
					</template>
				</el-table-column>
				<el-table-column 
					label="操作项" 
					min-width="40%">
					<template
						slot-scope="scope">
						{{scope.row.ui? "UI: " + scope.row.ui + " 元素: " + scope.row.element: scope.row.classType}}
					</template>
				</el-table-column>
				<el-table-column 
					label="方法" 
					width="70px"
					prop="method">
				</el-table-column>
				<el-table-column 
					label="参数" 
					min-width="50%">
					<template
						slot-scope="scope">
						<p>{{scope.row.parameters | getParameters}}</p>
					</template>
				</el-table-column>
			</el-table>
			<el-row class="buttonsRow">
				<el-button
					type="warning"
					size="small"
					@click="handleCancel"
					plain
					>取消
				</el-button>
				<el-button
					type="primary"
					size="small"
					@click="handleSure"
					>确定
				</el-button>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
  export default {
    name: "datatableFlowcase",
		mixins: [VueMixins],
		data() {
    	return {
				tableData: [],
				mainForm: {
					checkPoint: "", // 检查点
					expectResult: "",//预计结果
					missionId: "", // 测试任务
					testDesign: "", // 测试意图
					testPoint: "", // 测试点
					testStep: "", // 测试步骤
					nodeInfoList: [], // 节点详情
					missionId: '',//任务id
					casecode: '', //用例编号
					executorId: '', // 执行者编号
				},
				id: '', //节点id
				flag: true, // 是否禁用
				autRespDTOList: [], // 功能点列表
				queryFlowTestCaseParams: {
					executorId: "3",
					caseLibId: ""
				}, // 查询测试用例的表单数据
				flowTestcaseInfos: [], // 流程测试数据
				pagedBatchQueryTestMissionParams: {
					codeLong: "",
					currentPage: 1,
					descMedium: "",
					nameMedium: "",
					orderColumns: "modified_time",
					orderType: "desc",
					pageSize: 10000
				},
				missionList: [], // 任务列表
				testCaseInfoId: '', // 获取测试用例信息id
				// 对话框相关的
				dialogTitle: '查看脚本',
				dialogVisible: false,
				dialogTableData: [],
				currentRow: null,
			}
		},
		created() {
			this.id = sessionStorage.getItem('selectId')
			this.queryFlowTestCaseParams.caseLibId = sessionStorage.getItem('caselibId')
			console.log('toCase',this.id, this.queryFlowTestCaseParams.caseLibId)
    	this.queryListAut()
			this.queryFlowTestcase()
			this.pagedBatchQueryTestMission()
			this.queryTransactsByAutId()
			this.setTableData()
		},
		methods: {
			// 设置表格数据
			setTableData() {
				for(let i= 1; i <= 20; i++) {
					this.tableData.push({id: `000${i}`})
				}
			},
    	//获取全部功能点
			queryListAut() {
				Request({
					url: '/aut/queryListAut',
					method: 'POST',
					params: {}
				}).then(res => {
					if (res.respCode === '0000') {
						console.log('获取成功',res)
						this.autRespDTOList = res.autRespDTOList
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			// 查询流程测试用例
			queryFlowTestcase() {
				Request({
					url: '/dataCenter/queryFlowTestcase',
					method: 'POST',
					params: {
						caseLibId: this.queryFlowTestCaseParams.caseLibId,
						executorId: "3"
					}
				}).then(res => {
					if (res.respCode === '0000') {
						console.log('获取成功', res);
						this.flowTestcaseInfos = res.flowTestcaseInfos
						this.testCaseInfoId = this.flowTestcaseInfos[0].id
						this.queryFlowTestcaseInfo()
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err)
				});
			},
			//查询测试任务
			pagedBatchQueryTestMission() {
				Request({
					url: '/missionController/pagedBatchQueryTestMission',
					method: 'POST',
					params: this.pagedBatchQueryTestMissionParams
				}).then(res => {
					if (res.respCode === '0000') {
						console.log('pagedBatchQueryTestMissionParams获取成功', res);
						this.missionList = res.list
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err)
				});
			},
			//
			queryTransactsByAutId() {
				Request({
					url: '/transactController/queryTransactsByAutId',
					method: 'POST',
					params: {
						id: this.id
					}
				}).then(res => {
					if (res.respCode === '0000') {
						console.log('获取成功', res);
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err)
				});
			},
			// 获取流程用例列表及信息
			queryFlowTestcaseInfo() {
				let _this = this
				Request({
					url: '/dataCenter/queryFlowTestcaseInfo',
					method: 'POST',
					params: {
						id: this.testCaseInfoId
					}
				}).then(res => {
					console.log('queryFlowTestcaseInfo',res)
					_this.mainForm.checkPoint = res.checkPoint
					_this.mainForm.missionId = res.missionName
					_this.mainForm.testDesign = res.testDesign
					_this.mainForm.testPoint = res.testPoint
					_this.mainForm.expectResult = res.expectResult
					_this.mainForm.testStep = res.testStep
					_this.mainForm.nodeInfoList = res.nodeInfoList
					_this.mainForm.missionId = res.missionId
					_this.mainForm.casecode = res.casecode
					_this.mainForm.executorId = res.executorId
				}).catch(error => {

				})
			},
    	//切换单用例显示
			toggleSingle() {
				this.$router.push({path: '/testProjectIndext/datatable'})
			},
			//编辑事件
			edit() {
				this.flag = false
			},
			// 提交修改
			saveFlowTestcaseInfo() {
				console.log(this.mainForm);
				Request({
					url: '/dataCenter/saveFlowTestcaseInfo',
					method: 'POST',
					params: this.mainForm
				}).then(res => {
					if(res.respCode === '0000') {
						this.$message.success('提交成功')
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			// 查看脚本
			showScriptDialog(index = 0) {
				this.dialogVisible = true
				let id = this.mainForm.nodeInfoList[index].id
				this.getTestcaseScript(id)
			},
			// 获取脚本数据
			getTestcaseScript(id) {
				Request({
					url: '/dataCenter/getTestcaseScript',
					method: 'POST',
					params: {
						testcaseId: id,
						caseCompositeType: '3'
					}
				}).then(res => {
					console.log('脚本获取', res)
					this.dialogTableData = res.scriptList
				}).catch(err => {
					this.$message.error('脚本获取失败')
				})
			},
			// 取消对话框
			handleCancel() {
				this.dialogVisible = false
			},
			// 确定对话框
			handleSure() {
				this.dialogVisible = false
			},
			handleCurrentChange(val) {
				this.currentRow = val
				console.log('handleCurrentChange', val)
				this.testCaseInfoId = val.id
				this.queryFlowTestcaseInfo()
			}
		},
		filters: {
			getParameters(value) {
				console.log(value)
				let str = ""
				value.forEach((item,index) => {
					str += '参数' + (index + 1) + "：" + item + ";"
				})
				return str
			}
		}
  }
</script>

<style lang="less" scoped>
	.datatableFlowCaseStyle {
		.leftButton {
			float: left;
		}
		.leftCard {
			width: 260px;
			float: left;
			float: left;
			.flowTitle {
				background: #d9edf7;
				line-height: 40px;
				text-align: center;
				color: #408bb0;
				font-size: 18px;
			}
		}
		.rightCard {
			float: left;
			margin-left: 30px;
			width: calc(100% - 300px);
			.titleRow {
				border-bottom: 1px solid #dddddd;
				padding-bottom: 10px;
				margin-left: 20px;
				padding-right: 10px;
				position: relative;
				overflow: hidden;
				h3 {
					margin-left: 15px;
				}
				.rightButtons {
					display: flex;
					justify-content: flex-end;
					margin-right: 25px;
					
				}
			}
			.main {
				overflow: hidden;
				.detailSpan {
					display: block;
					width: 100px;
					height: 40px;
					margin-left: 5px;
					margin-top: 20px;
					background: #8175c7;
					color: #FFF;
					line-height: 40px;
					text-align: center;
					font-weight: bolder;
					border-radius: 6px;
					box-shadow: pink 2px 2px 10px;
					user-select: none;
					font-family: '微软雅黑';
					font-size: 18px;
				}
				.el-form-item {
					margin-top: 10px;
					float: left;
					margin-left: 10px;
					margin-bottom: 5px;
					.el-input{
						width: 100%;
					}
					.textarea{
						width: 103%;
					}
					.el-select{
						width: 103%;
					}
				}
			}
			.nodeInfoList {
				width: 100%;
				padding: 0px 40px;
				.nodeTitle {
					width: 70px;
					text-align: center;
					padding: 3px 0px;
					background: #8175c7;
					color: white;
					border-radius: 5px;
					font-family: '微软雅黑';
					font-size: 15px;
					font-weight: bold;
					
				}
				.formInfo {
					overflow: hidden;
					.el-form-item {
						margin-left: 10px;
						margin-bottom: 10px;
					}
					.el-input {
						width: 100%;
						float: left;
					}
					.el-select{
						width: 103%;
					}
				}
				.nodeData {
					.el-row {
						p {
							width: 70px;
							padding: 3px 0;
							text-align: center;
							border-radius: 5px;
							background: #a1a1a1;
							color: white;
							font-size: 14px;
							font-weight: bold;
							font-family: "微软雅黑";
						}
					}
					.el-form {
						.el-form-item {
							margin-left: 10px;
							margin-bottom: 10px;
							.el-form-item__label {
								font-size: 12px !important;
								white-space: nowrap !important;
								text-overflow: ellipsis;
								overflow: hidden;
								padding-right: 5px;
							}
							p {
								display: flex;
								.el-input {
									width: 200px;
								}
								.el-button {
									margin-left: 10px;
								}
							}
						}
					}
				}
			}
		}
	}
	.el-dialog {
		position: absolute;
		left: 50%;
		top: 50%;
		margin: 0px !important;
		transform: translate(-50%, -50%);
		.el-dialog__body {
			padding: 20px;
		}
		.el-table__row td {
			height: 30px !important;
			padding: 2px 0px;
			font-size: 14px;
		}
		.buttonsRow {
			padding-top: 10px;
			margin-bottom: -10px;
			display: flex;
			justify-content: flex-end;
		}
	}
	.el-table__row {
		cursor: pointer;
	}
	.el-table__header-wrapper {
		display: none;
		font-size: 20px  !important;
	}
	.el-table__body-wrapper {
		cursor: pointer;
		width: 98%;
		margin: 0px auto;
	}
</style>
