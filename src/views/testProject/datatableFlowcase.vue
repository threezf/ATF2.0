<template>
  <div class="page-inner">
		<el-container>
			<el-main>
				<el-button
					type="primary"
					size="small"
					class="leftButton"
					icon="el-icon-refresh-right"
					@click="toggleSingle"
					>切换单用例显示
				</el-button>
				<el-card>
					<el-row
						class="titleRow">
						<el-col :span="16">
							<span>用例详情及节点数据</span>
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
						label-width="100px">
						<el-row>
							<span class="detailSpan">
								用例详情
							</span>
						</el-row>
						<el-form-item
							label="测试点">
							<el-input
								v-model="mainForm.testPoint" :disabled="flag">

							</el-input>
						</el-form-item>
						<el-form-item
							label="测试任务">
							<el-select
								v-model="mainForm.missionId" :disabled="flag">
								<el-option
									v-for="item in missionList"
									:key="item.id"
									:value="item.id"
									:label="item.nameMedium">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="测试意图">
							<el-input
								v-model="mainForm.testDesign" :disabled="flag">

							</el-input>
						</el-form-item>
						<el-form-item
							label="检查点">
							<el-input
								v-model="mainForm.checkPoint" :disabled="flag">

							</el-input>
						</el-form-item>
						<el-form-item
							label="预计结果">
							<el-input
								v-model="mainForm.expectResult" :disabled="flag">

							</el-input>
						</el-form-item>
						<el-form-item
							label="测试步骤">
							<el-input
								class="textarea"
								type="textarea"
								v-model="mainForm.testStep" :disabled="flag">

							</el-input>
						</el-form-item>

					</el-form>
				</el-card>
			</el-main>
		</el-container>
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
				mainForm: {
					checkPoint: "", // 检查点
					expectResult: "",//预计结果
					missionId: "", // 测试任务
					testDesign: "", // 测试意图
					testPoint: "", // 测试点
					testStep: "" // 测试步骤
				},
				id: '1601', //节点id
				flag: true, // 是否禁用
				autRespDTOList: [], // 功能点列表
				queryFlowTestCaseParams: {
					executorId: "3",
					caseLibId: "1276"
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
			}
		},
		created() {
    	this.queryListAut()
			this.queryTransactsByAutId()
			this.queryFlowTestcase()
			this.pagedBatchQueryTestMission()
		},
		methods: {
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
					this.$message.error('网络连接失败')
				})
			},
			// 查询流程测试用例
			queryFlowTestcase() {
				Request({
					url: '/dataCenter/queryFlowTestcase',
					method: 'POST',
					params: this.pagedBatchQueryTestMissionParams
				}).then(res => {
					if (res.respCode === '0000') {
						console.log('获取成功', res);
						this.flowTestcaseInfos = res.flowTestcaseInfos
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error('网络连接失败')
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
					this.$message.error('网络连接失败')
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
					this.$message.error('网络连接失败')
				});
			},
    	//切换单用例显示
			toggleSingle() {
                this.$router.push({
                    name: 'datatable'
                })
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
					this.$message.error('网络连接失败')
				})
			}
		}
  }
</script>

<style lang="less" scoped>
	.leftButton {
		float: left;
	}
	.titleRow {
		border-bottom: 1px solid #dddddd;
		padding-bottom: 10px;
		margin-left: 20px;
		position: relative;
		overflow: hidden;
		span {
			color: #868886;
			font-size: 18px;
			margin-left: 15px;
		}
		.rightButtons {
			display: flex;
			justify-content: flex-end;
			margin-right: 15px;
		}
	}
	.main {
		.detailSpan {
			display: block;
			width: 100px;
			height: 40px;
			margin-left: 45px;
			margin-top: 20px;
			background: #8175c7;
			color: #FFF;
			line-height: 40px;
			text-align: center;
			font-weight: bolder;
			border-radius: 6px;
			box-shadow: pink 2px 2px 10px;
			user-select: none;
		}
		.el-form-item {
			margin-top: 10px;
			float: left;
			margin-left: 50px;
			.el-input,
			.textarea,
			.el-select {
				width: 300px;
			}
		}
	}

</style>
