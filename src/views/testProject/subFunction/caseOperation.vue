<!--用例执行结果查询-->
<template>
  <div
		class="page-inner">
		<el-row
			class="topRow">
			<el-form
				label-width="120px">
				<el-form-item
					label="测试项目">
					<el-input></el-input>
				</el-form-item>
				<el-form-item
					label="用例编号">
					<el-input
						v-model="testcaseViewRespDTO.casecode"
						disabled>

					</el-input>
				</el-form-item>
				<el-form-item
					label="流程节点">
					<!--<el-select></el-select>-->
				</el-form-item>
			</el-form>
		</el-row>
		<el-tabs
			class="tabsStyle"
			type="border-card">
			<el-tab-pane
				label="执行结果">
				<el-table
					stripe
					border
					highlight-current-row>
					<el-table-column
						label="场景ID"
						min-width="5%">
					</el-table-column>
					<el-table-column
						label="测试计划"
						min-width="13%">
					</el-table-column>
					<el-table-column
						label="用例编号"
						min-width="13%">
					</el-table-column>
					<el-table-column
						label="节点名称"
						min-width="13%">
					</el-table-column>
					<el-table-column
						label="记录单状态"
						min-width="15%">
					</el-table-column>
					<el-table-column
						label="执行结果状态"
						min-width="17%">
					</el-table-column>
					<el-table-column
						label="来源渠道"
						min-width="12%">
					</el-table-column>
					<el-table-column
						label="资源路径"
						min-width="12%">
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane
				label="元素库">
				<element-lib :list="uis" :objects="objects"></element-lib>
			</el-tab-pane>
			<el-tab-pane
				label="对象库">
				<object-lib :objects="objects"></object-lib>
			</el-tab-pane>
			<el-tab-pane
				class="scriptPane"
				label="查看脚本">
				<div class="scriptDiv">暂无数据</div>
			</el-tab-pane>
			<el-tab-pane
				class="userDataPane"
				label="用例数据">
				<el-row>
					<el-col
						:span="10">
						<el-checkbox
							class="checkboxAll"
							v-model="checkAll"
							:indeterminate="indeterminate"
							@change="handleCheckAllChange"
							>全选
						</el-checkbox>
						<el-checkbox-group
							class="checkboxGroup"
							v-model="checkedData"
							@change="handleCheckedDataChange">
							<el-checkbox
								v-for="(item,index) in datas"
								:key="index"
								:label="item"
								:value="item"
								>{{item}}
							</el-checkbox>
						</el-checkbox-group>
					</el-col>
					<el-col
						:span="14">
						<el-button
							type="primary"
							size="mini"
							icon="el-icon-search"
							>搜索
						</el-button>
						<el-button
							type="primary"
							size="mini"
							icon="el-icon-refresh"
							>刷新
						</el-button>
						<el-button
							type="primary"
							size="mini"
							icon="el-icon-folder"
							>保存
						</el-button>
					</el-col>
				</el-row>
				<el-table
					:data="dataPoolList"
					class="useDataStyle"
					border
					stripe
					highlight-current-row>
					<el-table-column
						label="数据名称"
						min-width="15.4%">
					</el-table-column>
					<el-table-column
						label="数据值"
						min-width="12.7%">
					</el-table-column>
					<el-table-column
						label="数据池名"
						min-width="15.5%">
					</el-table-column>
					<el-table-column
						label="流程节点名称"
						min-width="20.9%">
					</el-table-column>
					<el-table-column
						label="对象名称"
						min-width="15.5%">
					</el-table-column>
					<el-table-column
						label="描述"
						min-width="10%">
					</el-table-column>
					<el-table-column
						label="操作"
						min-width="10%">
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane
				class="detailTabPane"
				label="用例详情">
				<div
					class="detailDiv">
					流程用例
				</div>
				<el-form
					class="detailFormStyle"
					label-width="100px">
					<el-row>
						<el-form-item
							label="用例编号">
							<el-input
								v-model="testcaseViewRespDTO.casecode"
								disabled>
							</el-input>
						</el-form-item>
					</el-row>
					<div
						class="threeDiv">
						<el-form-item
							v-for="(item,index) in threeLabelInput"
							:key="item.id"
							:label="item.value">
							<el-input v-model="threeInputParams[index]" disabled></el-input>
						</el-form-item>

						<el-form-item
							v-for="(item,index) in threeLabelSelect"
							:key="item.id"
							:label="item.value">
							<!--<el-select></el-select>-->
						</el-form-item>
					</div>
					<div
						class="twoDiv">
						<el-form-item
							v-for="(item,index) in twoLabel"
							:key="item.id"
							:label="item"
							:value="index">
							<el-input
								type="textarea"
								v-model="twoInputParams[index]"
								disabled>
							</el-input>
						</el-form-item>
					</div>
					<el-form-item
						class="remarkFormItem"
						label="备注">
						<el-input
							type="textarea"
							v-model="testcaseViewRespDTO.note"
							disabled>
						</el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<div class="copyright">
				Copyright © 1998－2019 BUPT All Rights Reserved
				教育部信息网络工程研究中心 版权所有
			</div>
		</el-tabs>
	</div>
</template>

<script>
  import Request from "../../../libs/request";
	import VueMixins from "@/libs/vueMixins.js";
	import ElementLib from '../../../components/caseOpeartion/ElementLib/ElementLib'
	import ObjectLib from '../../../components/caseOpeartion/ObjectLib/ObjectLib'
	export default {
		mixin: [VueMixins],
    name: "caseOperation",
		data() {
    	return {
    		//查询所需要的数据
				batchId: '',// 测试轮次编号
				caseCompositeType: '2', //
				caseId: '1', // 用例编号
				testPlanId: '', // 测试计划编号
				testcaseId: '1', // 测试用例编号
				sceneId: 1,
    		// 执行结果
				// 元素库
				uis: [], // 元素库数据列表
				// 对象库
				objects: [],//对象库列表数据
				// 查看脚本
				//用例数据
				indeterminate: true,
				checkAll: true,
				checkedData: [],//选择的数据类型
				dataPoolList: [], // 查询的数据池列表数据
				datas: ['输入数据', '流程数据', '场景数据', '全局数据'],
    		// 用例详情
				testcaseViewRespDTO: {
					casecode: '', // 用例编号
					testPoint: "", // 测试点
					missionName: "", // 测试任务
					version: '', // 版本号
					autName: '', // 被测系统
					transName: '', // 功能点
					scriptTemplateName: '', // 基础脚本
					authorName: '', // 作者
					automatonName: '', // 评审者
					executorName: '', // 执行者
					caseProperty: '', // 用例性质
					caseType: '', // 用例类型
					priority: '', // 优先级
					useStatus: '', // 用例使用状态
					executeMethod: '', //执行方式
					scriptMode: '', //脚本管理方式
					testDesign: '', // 测试意图
					preRequisites: '', // 前置条件
					testStep: '', // 测试步骤
					dataRequest: '', // 数据需求
					expectResult: '', // 预计结果
					checkPoint: '', //附加检查点
					note: '' // 备注

				}, // 获取的用例数据
    		threeLabelInput: [
					{id: 1, value: '测试点'},
					{id: 2, value: '测试任务'},
					{id: 3, value: '版本号'},
					{id: 4, value: '被测系统'},
					{id: 5, value: '功能点'},
					{id: 6, value: '基础脚本'},
					{id: 7, value: '作者'},
					{id: 8, value: '评审者'},
					{id: 9, value: '执行者'}
				],
				threeLabelSelect: [
					{id: 10, value: '用例性质'},
					{id: 11, value: '测试用例类型'},
					{id: 12, value: '优先级'},
					{id: 13, value: '用例使用状态'},
					{id: 14, value: '执行方式'},
					{id: 15, value: '脚本管理方式'},
				],
    		twoLabel: ['测试意图','前置条件','测试步骤','数据需求','预计结果','附加检查点'],
			}
		},
		created() {
			this.getSingleTestCaseInfo()
			this.queryInputData()
			this.querySingleRecordByCaseId()
			this.batchQueryDataPool()
			this.queryAllObjectForATransact()
			this.queryAllElementsForATransact()
		},
		computed: {
			threeInputParams() {
				return [
					this.testcaseViewRespDTO.testPoint,
					this.testcaseViewRespDTO.missionName,
					this.testcaseViewRespDTO.version,
					this.testcaseViewRespDTO.autName,
					this.testcaseViewRespDTO.transName,
					this.testcaseViewRespDTO.scriptTemplateName,
					this.testcaseViewRespDTO.authorName,
					this.testcaseViewRespDTO.automatonName,
					this.testcaseViewRespDTO.executorName
				]
			},
			twoInputParams() {
				return [
					this.testcaseViewRespDTO.testDesign, // 测试意图
					this.testcaseViewRespDTO.preRequisites, // 前置条件
					this.testcaseViewRespDTO.testStep, // 测试步骤
					this.testcaseViewRespDTO.dataRequest, // 数据需求
					this.testcaseViewRespDTO.expectResult, // 预计结果
					this.testcaseViewRespDTO.checkPoint //附加检查点
				]
			}
		},
		methods: {
    	// 全选操作，默认方法存在参数
			handleCheckAllChange(val) {
				console.log('handleCheck',val)
				this.checkedData = val? this.datas: []
				this.indeterminate = false
			},
			// 选择的数据类型
			handleCheckedDataChange(value) {
				console.log('handleCheck',value)
				this.checkAll = (this.datas.length === value.length)
				this.indeterminate = (value.length > 0 && value.length < this.datas.length)
			},
			// 通过测试计划Id获取流程节点数据
			getFlowDataByTestPlanId() {

			},
			// 查询输入数据
			queryInputData() {
				console.log('queryInputData')
				Request({
					url: '/testRecordController/queryInputData',
					method: 'POST',
					params: {
						batchId: this.batchId,
						caseCompositeType: this.caseCompositeType,
						caseId: this.caseId,
						testPlanId: this.testPlanId
					}
				}).then(res => {
					if (res.respCode === '0000') {

					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error('用例组成类型只能为1(单用例)或3(流程节点)')
				})
			},
			// 获取单个用例详情数据
			getSingleTestCaseInfo() {
				Request({
					url: '/testcase/getSingleTestCaseInfo',
					method: 'POST',
					params: {
						id: '1'
					}
				}).then(res => {
					if (res.respCode === '0000') {
						this.testcaseViewRespDTO = res.testcaseViewRespDTO
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error('连接失败')
				})
			},
			//
			querySingleRecordByCaseId() {
				Request({
					url: '/testRecordController/querySingleRecordByCaseId',
					method: 'POST',
					params: {
						batchId: this.batchId,
						caseId: this.caseId,
						sceneId: this.sceneId
					}
				}).then(res => {
					if (res.respCode === '0000') {

					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			//
			getTestcaseScript() {
				Request({
					url: '/dataCenter/getTestcaseScript',
					method: 'POST',
					params: {
						caseCompositeType: 3,
						testcaseId: this.testcaseId
					}
				}).then(res => {
					if (res.respCode === '0000') {

					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			queryAutVisibleOmClasses() {
				Request({
					url: '/aut/queryAutVisibleOmClasses',
					method: 'POST',
					params: {
						id: 59
					}
				}).then(res => {
					if (res.respCode === '0000') {

					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			// 被测系统池数据
			batchQueryDataPool() {
				Request({
					url: '/dataPool/batchQueryDataPool',
					method: 'POST',
					params: {
						poolName: "被测系统数据池",
						poolObjId: 59
					}
				}).then(res => {
					if (res.respCode === '0000') {

					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			// 对象库数据
			queryAllObjectForATransact() {
				Request({
					url: '/objectRepository/queryAllObjectForATransact',
					method: 'POST',
					params: {
						transactId: 148
					}
				}).then(res => {
					if (res.respCode === '0000') {
						this.objects = res.objects
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			},
			// 查询元素库数据
			queryAllElementsForATransact() {
				Request({
					url: '/elementRepository/queryAllElementsForATransact',
					method: 'POST',
					params: {
						transactId: 148
					}
				}).then(res => {
					if (res.respCode === '0000') {
						this.uis = res.uis
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				})
			}
    },
		components: {
			ElementLib,
			ObjectLib
		}
  }
</script>

<style lang="less" scoped>
	.topRow {
		overflow: hidden;
		.el-form-item {
			float: left;
			margin-left: 20px;
			.el-input {
				width: 230px;
			}
		}
	}
	.tabsStyle {
		.scriptPane {
			text-align: center;
			.scriptDiv {
				font-size: 14px;
				margin-bottom: 20px;
				color: rgb(121, 121, 121);
			}
		}
		.userDataPane {
			overflow: hidden;
			.checkboxAll {
				float: left;
			}
			.checkboxGroup {
				float: left;
				margin-left: 30px;
			}
			.useDataStyle {
				width: 98%;
				margin: 3px auto;
			}
		}
		.detailTabPane {
			.detailDiv {
				font-size: 24px;
				color: #8c7979;
			}
			.detailFormStyle {
				margin: 10px 0 10px 10px;
				.el-form-item {
					width: 400px;
				}
				.threeDiv {
					.el-form-item {
						float: left;
						margin-right: 20px;
						width: 400px;
					}
				}
				.twoDiv {
					.el-form-item {
						float: left;
						width: 600px;
						margin-right: 40px;
					}
				}
				.remarkFormItem {
					width: 1240px;
				}
			}
		}
		.copyright {
			margin: 20px auto;
			width: 300px;
			line-height: 20px;
			font-size: 13px;
			color: #7979a2;
			text-align: center;
		}
	}
</style>
