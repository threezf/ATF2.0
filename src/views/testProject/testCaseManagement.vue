<template>
	<div class="page-inner">
		<el-container>
			<el-main>
				<el-row>
					<!--				<el-button-->
					<!--					@click=''-->
					<!--                    type="primary"-->
					<!--					size="small"-->
					<!--					icon="el-icon-arrow-down">-->
					<!--					显示筛选-->
					<!--				</el-button>-->
					<el-button
						@click='addCase'
						type="primary"
						size="small"
						icon="el-icon-plus">
						添加
					</el-button>
					<el-button
						@click=''
						type="primary"
						size="small"
						icon="el-icon-upload2">
						导入
					</el-button>
					<el-button
						@click=''
						type="primary"
						size="small"
						icon="el-icon-upload2">
						导入记录
					</el-button>
					<el-button
						@click=''
						type="primary"
						size="small"
						icon="el-icon-download">
						导出
					</el-button>
					<el-button
						@click=''
						type="primary"
						size="small"
						icon="el-icon-plus">
						添加流程节点
					</el-button>
					<el-button
						@click=''
						type="primary"
						size="small"
						icon="el-icon-delete">
						删除流程节点
					</el-button>
					<el-button
						@click=''
						type="primary"
						size="small"
						icon="el-icon-delete">
						更改多种用例信息
					</el-button>
				</el-row>
				<div class="scrollbar">
					<el-scrollbar style="width:100%">
						<el-table
							stripe
							:data="testCaseList"
							border
							style="overflow: hidden"
							class='table'>
							<el-table-column
								label="节点"
								property=""
								width="80"/>
							<el-table-column
								label="用例编号"
								property="casecode"
								width="120"/>
							<el-table-column
								label="被测系统"
								property="autName"
								width="120"/>
							<el-table-column
								label="功能点"
								property='transName'
								width="120"/>
							<el-table-column
								label="用例组成类型"
								width="120">
								<template slot-scope="scope">
									{{ scope.row.caseCompositeType=='1'?'单用例':'流程用例' }}
								</template>
							</el-table-column>
							<el-table-column
								label="状态"
								width="120">
								<template slot-scope="scope">
									{{ scope.row.useStatus=='0'?'新增':'评审通过' }}
								</template>
							</el-table-column>
							<el-table-column
								label="关联脚本名称"
								property='scriptTemplateName'
								width="120"/>
							<el-table-column
								label="作者"
								property='authorName'
								width="120"/>
							<el-table-column
								label="执行者"
								property='executorName'
								width="120"/>
							<el-table-column
								label="评审者"
								property='reviewerName'
								width="120"/>
							<el-table-column
								label="执行方式"
								width="120">
								<template slot-scope="scope">
									{{ convertExecMe(scope.row.executeMethod) }}
								</template>
							</el-table-column>
							<el-table-column
								label="测试任务"
								property='missionName'
								width="120"/>
							<el-table-column
								label="优先级"
								width="120">
								<template slot-scope="scope">
									{{ convertPri(scope.row.priority) }}
								</template>
							</el-table-column>
							<el-table-column
								label="用例类型"
								width="120">
								<template slot-scope="scope">
									{{ convertCaseType(scope.row.caseType) }}
								</template>
							</el-table-column>
							<el-table-column
								label="用例性质"
								width="120">
								<template slot-scope="scope">
									{{ convertCasePro(scope.row.caseProperty) }}
								</template>
							</el-table-column>
							<el-table-column
								label="测试点"
								property='testPoint'
								width="120"/>
							<el-table-column label="操作" width="300">
								<template slot-scope="scope">
									<el-button
										size="mini"
										@click="">查看
									</el-button>
									<el-button
										size="mini"
										type="info"
										@click="">修改
									</el-button>
									<el-button
										size="mini"
										type="danger"
										@click="">删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-scrollbar>
				</div>
				<div class="block">
					<el-col :span="10" :offset='4'>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[8, 10, 20, 50]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="totalCount">
						</el-pagination>
					</el-col>
				</div>
				<el-dialog
					:title="modelName"
					:visible.sync="dialogVisible"
					:before-close="handleClose"
					width="65%">
					<el-tabs v-model="activeName" type="card">
						<el-tab-pane label="单用例" name="first">
							<div>
								<el-form ref="addSingleForm" :rules="rules" :model="addSingleForm">
									<el-row>
										<el-form-item label="用例编号" prop="casecode" label-width="35%" required>
											<el-col :span="8">
												<el-input v-model="addSingleForm.casecode"></el-input>
											</el-col>
											<el-col :span="8" :offset='1'>
												<el-button
													@click=''
													type="primary"
													size="small"
													icon="el-icon-arrow-down">
													显示详情
												</el-button>
											</el-col>
										</el-form-item>
									</el-row>
									<div>
										<el-divider content-position="center">后缀有*为必填项目</el-divider>
										<el-row>
											<el-col :span="7">
												<el-form-item label="测试点" prop="testPoint" label-width="40%" required>
													<el-input v-model="addSingleForm.testPoint"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="测试任务" prop="missionName" label-width="40%"
															  required>
													<el-input v-model="addSingleForm.missionName"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="版本号" prop="version" label-width="40%">
													<el-input v-model="addSingleForm.version"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="被测系统" prop="autName" label-width="40%" required>
													<el-input v-model="addSingleForm.autName"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="功能点" prop="transName" label-width="40%"
															  required>
													<el-input v-model="addSingleForm.transName"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="基础脚本" prop="scriptTemplateName" label-width="40%">
													<el-input v-model="addSingleForm.scriptTemplateName"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="用例性质" prop="caseProperty" label-width="40%" >
													<el-input v-model="addSingleForm.caseProperty"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="测试用例类型" prop="caseType" label-width="40%">
													<el-input v-model="addSingleForm.caseType"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="优先级" prop="priority" label-width="40%">
													<el-input v-model="addSingleForm.priority"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="作者" prop="authorName" label-width="40%" >
													<el-input v-model="addSingleForm.authorName"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="评审者" prop="executorName" label-width="40%">
													<el-input v-model="addSingleForm.executorName"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="执行者" prop="reviewerName" label-width="40%">
													<el-input v-model="addSingleForm.reviewerName"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="用例使用状态" prop="useStatus" label-width="40%" required>
													<el-input v-model="addSingleForm.useStatus"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="执行方式" prop="executeMethod" label-width="40%">
													<el-input v-model="addSingleForm.executeMethod"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="脚本管理方式" prop="scriptMode" label-width="40%">
													<el-input v-model="addSingleForm.scriptMode"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="11">
												<el-form-item label="测试意图" prop="testPoint" label-width="25%" required>
													<el-input v-model="addSingleForm.testPoint"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="11" :offset="1">
												<el-form-item label="前置条件" prop="missionName" label-width="25%"
															  required>
													<el-input v-model="addSingleForm.missionName"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="11">
												<el-form-item label="测试步骤" prop="testPoint" label-width="25%" required>
													<el-input v-model="addSingleForm.testPoint"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="11" :offset="1">
												<el-form-item label="数据需求" prop="missionName" label-width="25%">
													<el-input v-model="addSingleForm.missionName"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="11">
												<el-form-item label="预期结果" prop="testPoint" label-width="25%" required>
													<el-input v-model="addSingleForm.testPoint"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="11" :offset="1">
												<el-form-item label="附加检查点" prop="missionName" label-width="25%"
															  required>
													<el-input v-model="addSingleForm.missionName"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-form-item label="备注" prop="" label-width="11.5%">
												<el-col :span="23">
												<el-input
													type="textarea"
													placeholder="请输入内容"
													v-model="textarea">
												</el-input>
												</el-col>
											</el-form-item>
										</el-row>
									</div>
								</el-form>
							</div>
						</el-tab-pane>
						<el-tab-pane label="流程用例" name="second">
						</el-tab-pane>
					</el-tabs>
				</el-dialog>
			</el-main>
			<el-footer>

			</el-footer>
		</el-container>
	</div>
</template>
<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'

	export default {
		mixins: [VueMixins], // 混入
		data() {
			return {
				addSingleForm: {
					casecode: '',
					testPoint: '',
					missionName: '',
					version: '',
					autName:'',
					transName:'',
					scriptTemplateName:'',
					caseType:'',
					caseProperty:'',
					priority:'',
					authorName:'',
					executorName:'',
					receiverName:'',
					scriptMode:'',
					useStatus:'',
					executeMethod:'',

				},
				testCaseList: [],
				// apiUrl: '',
				tt: 0, //总条数
				pageSize: 8, //页面大小
				currentPage: 1, //当前页
				totalPage: 1, //总页数
				listnum: 5, //页面大小
				totalCount: 0,
				order: 'id',
				sort: 'asc',
				activeName: '1',
				dialogVisible: false,
				modelFlag: 0,
			}
		},
		computed: {
			params() {
				let obj = {
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					orderColumns: this.order,
					orderType: this.sort,
					caseLibId: sessionStorage.getItem("caselibId"),
				}
				return obj
			}
		},
		created() {
			this.getCase();
		},
		mounted() {
		},
		methods: {
			//添加用例表单
			addCase() {
				this.dialogVisible = true
			},
			// 执行方式数据处理
			convertExecMe(em) {
				switch (em) {
					case 1:
						return '手工';
						break;
					case 2:
						return '自动化';
						break;
					case 3:
						return '配合';
						break;
					default:
						return '';
				}
			},
			// 优先级数据处理
			convertPri(em) {
				switch (em) {
					case 1:
						return '1级';
						break;
					case 2:
						return '2级';
						break;
					case 3:
						return '3级';
						break;
					case 4:
						return '4级';
						break;
					case 5:
						return '5级';
						break;
					case 6:
						return '6级';
						break;
					case 7:
						return '7级';
						break;
					case 8:
						return '8级';
						break;
					case 9:
						return '9级';
						break;
					default:
						return '';
				}
			},
			// 用例类型数据处理
			convertCaseType(em) {
				switch (em) {
					case 1:
						return '联机';
						break;
					case 2:
						return '批量';
						break;
					case 3:
						return '接口';
						break;
					default:
						return '';
				}
			},
			// 用例性质数据处理
			convertCasePro(em) {
				switch (em) {
					case 1:
						return '正常值';
						break;
					case 2:
						return '错误值';
						break;
					case 3:
						return '边界值';
						break;
					case 4:
						return '要素级';
						break;
					case 5:
						return '流程级';
						break;
					default:
						return '';
				}
			},
			getCase(type) {
				if (type === 1) {
					this.currentPage = 1
				}
				Request({
					url: '/testcase/pagedBatchQueryTestCase',
					method: 'post',
					params: this.params
				}).then((res) => {
					this.testCaseList = res.testcaseViewRespDTOList
					this.totalCount = res.totalCount
					this.totalPage = Math.ceil(this.totalCount / this.pageSize)
					this.pageSize = this.pageSize
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.getCase()
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.getCase()
			}
		}
	}
</script>
<style>
	.scrollbar {
		width: 1180px;
	}

	.inline-block {
		display: inline-block;
	}

</style>
