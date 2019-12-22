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
						@click='uploadCase'
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
							class='table'
							@selection-change="handleSelectionChange">
							<el-table-column type="selection" ></el-table-column>
							<el-table-column
								label="节点"
								property=""
								width="60">
								<template slot-scope="scope">
									<i class="el-icon-arrow-down" v-if="scope.row.caseCompositeType!='1'" @click="subShow(scope.row.id)"></i>
								</template>
							</el-table-column>
							<el-table-column
								label="用例编号"
								property="casecode"/>
							<el-table-column
								label="被测系统"
								property="autName"/>
							<el-table-column
								label="功能点"
								property='transName'/>
							<el-table-column
								label="用例组成类型">
								<template slot-scope="scope">
									{{ scope.row.caseCompositeType=='1'?'单用例':'流程用例' }}
								</template>
							</el-table-column>
							<el-table-column
								label="状态">
								<template slot-scope="scope">
									{{ scope.row.useStatus=='0'?'新增':'评审通过' }}
								</template>
							</el-table-column>
							<el-table-column
								label="关联脚本名称"
								property='scriptTemplateName'/>
							<el-table-column
								label="作者"
								property='authorName'/>
							<el-table-column
								label="执行者"
								property='executorName'
								width="120"/>
							<el-table-column
								label="评审者"
								property='reviewerName'/>
							<el-table-column
								label="执行方式">
								<template slot-scope="scope">
									{{ convertExecMe(scope.row.executeMethod) }}
								</template>
							</el-table-column>
							<el-table-column
								label="测试任务"
								property='missionName'/>
							<el-table-column
								label="优先级">
								<template slot-scope="scope">
									{{ convertPri(scope.row.priority) }}
								</template>
							</el-table-column>
							<el-table-column
								label="用例类型">
								<template slot-scope="scope">
									{{ convertCaseType(scope.row.caseType) }}
								</template>
							</el-table-column>
							<el-table-column
								label="用例性质">
								<template slot-scope="scope">
									{{ convertCasePro(scope.row.caseProperty) }}
								</template>
							</el-table-column>
							<el-table-column
								label="测试点"
								property='testPoint'/>
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
					title="添加用例"
					:visible.sync="dialogVisible"
					width="65%">
					<el-tabs v-model="activeName" type="card">
						<el-tab-pane label="单用例" name="first">
							<div>
								<el-form ref="addSingleForm" :rules="rules" :model="addSingleForm">
									<el-row>
										<el-col :span="18" :offset="4">
											<el-form-item label="用例编号" prop="casecode" label-width="35%" required>
												<el-col :span="8">
													<el-input v-model="addSingleForm.casecode" size="small"></el-input>
												</el-col>
												<el-col :span="8" :offset='1'>
													<el-button
														@click='showVisible'
														type="primary"
														size="small"
														icon="el-icon-arrow-down">
														<span v-if="!addVisible">显示详情</span>
														<span v-else>收起详情</span>
													</el-button>
												</el-col>
											</el-form-item>
										</el-col>
									</el-row>
									<div id="addVisible" class="notShowAddSingle">
										<el-divider content-position="center">后缀有*为必填项目</el-divider>
										<el-row>
											<el-col :span="7">
												<el-form-item label="测试点" prop="testPoint" label-width="40%" required>
													<el-input v-model="addSingleForm.testPoint" size="small"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="测试任务" prop="missionName" label-width="40%"
															  required>
													<el-select class="selectWidth" v-model="missionValue" size="small">
														<el-option
															v-for="item in missionList"
															:key="item.id"
															:label="item.nameMedium"
															:value="item.nameMedium">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="版本号" prop="version" label-width="40%">
													<el-input v-model="addSingleForm.version" size="small"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="被测系统" prop="autName" label-width="40%" required>
													<el-select class="selectWidth" v-model="autValue" size="small"
															   @change="transChange($event)">
														<el-option
															v-for="item in autList"
															:key="item.id"
															:label="item.nameMedium"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="功能点" prop="transName" label-width="40%"
															  required>
													<el-select class="selectWidth" v-model="transValue" size="small"
															   @change="templateChange($event)">
														<el-option
															v-for="item in transList"
															:key="item.id"
															:label="item.nameMedium"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="基础脚本" prop="scriptTemplateName" label-width="40%">
													<el-select class="selectWidth" v-model="templateValue" size="small">
														<el-option
															v-for="item in templateList"
															:key="item.id"
															:label="item.name"
															:value="item.name">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="用例性质" prop="caseProperty" label-width="40%">
													<el-select class="selectWidth" v-model="caseProperty" size="small">
														<el-option
															v-for="item in casePropertyList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="测试用例类型" prop="caseType" label-width="40%">
													<el-select class="selectWidth" v-model="caseType" size="small">
														<el-option
															v-for="item in caseTypeList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="优先级" prop="priority" label-width="40%">
													<el-select class="selectWidth" v-model="priority" size="small">
														<el-option
															v-for="item in priorityList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="作者" prop="authorName" label-width="40%">
													<el-select class="selectWidth" v-model="author" size="small">
														<el-option
															v-for="item in userList"
															:key="item.id"
															:label="item.username"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="评审者" prop="executorName" label-width="40%">
													<el-select class="selectWidth" v-model="executor" size="small">
														<el-option
															v-for="item in userList"
															:key="item.id"
															:label="item.username"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="执行者" prop="reviewerName" label-width="40%">
													<el-select class="selectWidth" v-model="reviewer" size="small">
														<el-option
															v-for="item in userList"
															:key="item.id"
															:label="item.username"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="用例使用状态" prop="useStatus" label-width="40%">
													<el-select class="selectWidth" v-model="useStatus" size="small">
														<el-option
															v-for="item in useStatusList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="执行方式" prop="executeMethod" label-width="40%">
													<el-select class="selectWidth" v-model="executeMethod" size="small">
														<el-option
															v-for="item in executeMethodList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="脚本管理方式" prop="scriptMode" label-width="40%">
													<el-select class="selectWidth" v-model="scriptMode" size="small">
														<el-option
															v-for="item in scriptModeList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
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
											<el-col :span="24">
												<el-form-item label="备注" prop="" label-width="11.5%">
													<el-col :span="23">
														<el-input
															type="textarea"
															placeholder="请输入内容"
															v-model="textarea">
														</el-input>
													</el-col>
												</el-form-item>
											</el-col>

										</el-row>
										<el-row>
											<el-col :span="6" :offset="18">
												<el-button type="primary" size="small">添加</el-button>
												<el-button type="primary" size="small"
														   @click="dialogVisible=!dialogVisible">取消
												</el-button>
											</el-col>
										</el-row>
									</div>
								</el-form>
							</div>
						</el-tab-pane>
						<el-tab-pane label="流程用例" name="second">
							<div>
								<el-form ref="addMultipleForm" :rules="rules" :model="addMultipleForm">
									<el-row>
										<el-col :span="18" :offset="4">
											<el-form-item label="用例编号" prop="casecode" label-width="35%" required>
												<el-col :span="8">
													<el-input v-model="addMultipleForm.casecode"></el-input>
												</el-col>
												<el-col :span="8" :offset='1'>
													<el-button
														@click='showVisibleM'
														type="primary"
														size="small"
														icon="el-icon-arrow-down">
														显示详情
													</el-button>
												</el-col>
											</el-form-item>
										</el-col>
									</el-row>
									<div id="addVisibleM" class="notShowAddSingle">
										<el-divider content-position="center">后缀有*为必填项目</el-divider>
										<el-row>
											<el-col :span="7">
												<el-form-item label="测试点" prop="testPoint" label-width="40%" required>
													<el-input v-model="addMultipleForm.testPoint"
															  size="small"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="测试任务" prop="missionName" label-width="40%"
															  required>
													<el-select class="selectWidth" v-model="missionValue" size="small">
														<el-option
															v-for="item in missionList"
															:key="item.id"
															:label="item.nameMedium"
															:value="item.nameMedium">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="版本号" prop="version" label-width="40%">
													<el-input v-model="addMultipleForm.version" size="small"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="被测系统" prop="autName" label-width="40%" required>
													<el-select class="selectWidth" v-model="autValue" size="small"
															   @change="transChange($event)">
														<el-option
															v-for="item in autList"
															:key="item.id"
															:label="item.nameMedium"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="功能点" prop="transName" label-width="40%"
															  required>
													<el-select class="selectWidth" v-model="transValue" size="small"
															   @change="templateChange($event)">
														<el-option
															v-for="item in transList"
															:key="item.id"
															:label="item.nameMedium"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="基础脚本" prop="scriptTemplateName" label-width="40%">
													<el-select class="selectWidth" v-model="templateValue" size="small">
														<el-option
															v-for="item in templateList"
															:key="item.id"
															:label="item.name"
															:value="item.name">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="用例性质" prop="caseProperty" label-width="40%">
													<el-select class="selectWidth" v-model="caseProperty" size="small">
														<el-option
															v-for="item in casePropertyList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="测试用例类型" prop="caseType" label-width="40%">
													<el-select class="selectWidth" v-model="caseType" size="small">
														<el-option
															v-for="item in caseTypeList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="优先级" prop="priority" label-width="40%">
													<el-select class="selectWidth" v-model="priority" size="small">
														<el-option
															v-for="item in priorityList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="作者" prop="authorName" label-width="40%">
													<el-select class="selectWidth" v-model="author" size="small">
														<el-option
															v-for="item in userList"
															:key="item.id"
															:label="item.username"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="评审者" prop="executorName" label-width="40%">
													<el-select class="selectWidth" v-model="executor" size="small">
														<el-option
															v-for="item in userList"
															:key="item.id"
															:label="item.username"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="执行者" prop="reviewerName" label-width="40%">
													<el-select class="selectWidth" v-model="reviewer" size="small">
														<el-option
															v-for="item in userList"
															:key="item.id"
															:label="item.username"
															:value="item.id">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="7">
												<el-form-item label="用例使用状态" prop="useStatus" label-width="40%">
													<el-select class="selectWidth" v-model="useStatus" size="small">
														<el-option
															v-for="item in useStatusList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="执行方式" prop="executeMethod" label-width="40%">
													<el-select class="selectWidth" v-model="executeMethod" size="small">
														<el-option
															v-for="item in executeMethodList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="7" :offset="1">
												<el-form-item label="脚本管理方式" prop="scriptMode" label-width="40%">
													<el-select class="selectWidth" v-model="scriptMode" size="small">
														<el-option
															v-for="item in scriptModeList"
															:key="item.id"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="11">
												<el-form-item label="测试意图" prop="testPoint" label-width="25%" required>
													<el-input v-model="addMultipleForm.testPoint"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="11" :offset="1">
												<el-form-item label="前置条件" prop="missionName" label-width="25%"
															  required>
													<el-input v-model="addMultipleForm.missionName"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="11">
												<el-form-item label="测试步骤" prop="testPoint" label-width="25%" required>
													<el-input v-model="addMultipleForm.testPoint"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="11" :offset="1">
												<el-form-item label="数据需求" prop="missionName" label-width="25%">
													<el-input v-model="addMultipleForm.missionName"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="11">
												<el-form-item label="预期结果" prop="testPoint" label-width="25%" required>
													<el-input v-model="addMultipleForm.testPoint"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="11" :offset="1">
												<el-form-item label="附加检查点" prop="missionName" label-width="25%"
															  required>
													<el-input v-model="addMultipleForm.missionName"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="24">
												<el-form-item label="备注" prop="" label-width="11.5%">
													<el-col :span="23">
														<el-input
															type="textarea"
															placeholder="请输入内容"
															v-model="textarea">
														</el-input>
													</el-col>
												</el-form-item>
											</el-col>

										</el-row>
										<el-row>
											<el-col :span="6" :offset="18">
												<el-button type="primary" size="small">添加</el-button>
												<el-button type="primary" size="small">取消</el-button>
											</el-col>
										</el-row>
									</div>
								</el-form>
							</div>
						</el-tab-pane>
					</el-tabs>
				</el-dialog>
				<el-dialog
					title="导入"
					:visible.sync="dialogVisibleI"
					width="30%">
					<!-- ElementUI上传 -->
					<el-upload
						class="upload-demo in-file"
						action="http://10.101.167.184:8080/atfcloud2.0a/testcase/batchImportTestcase"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						multiple
						:on-exceed="handleExceed"
						:file-list="fileList">
						<el-button size="small" type="primary">选择文件</el-button>
						<i slot="tip" class="el-upload__tip text">只能选择xlsx文件</i>
					</el-upload>
					<el-divider ></el-divider>
					<div>
						上传方式：
						<el-radio v-model="radio" label="1">简单版</el-radio>
						<el-button size="small" type="success" @click="downloadTemplate(0)">模板下载</el-button>
					</div>
					<div>
						<el-radio v-model="radio" label="2" class="radio">标准版</el-radio>
						<el-button size="small" type="success" @click="downloadTemplate(1)">模板下载</el-button>
					</div>
					<el-divider ></el-divider>
					<div class="in-file">
						<el-button size="small" type="primary">导入</el-button>
						<el-button size="small" type="primary">取消</el-button>
					</div>
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
					autName: '',
					transName: '',
					scriptTemplateName: '',
					caseType: '',
					caseProperty: '',
					priority: '',
					authorName: '',
					executorName: '',
					receiverName: '',
					scriptMode: '',
					useStatus: '',
					executeMethod: '',

				},
				addMultipleForm: {
					casecode: '',
					testPoint: '',
					missionName: '',
					version: '',
					autName: '',
					transName: '',
					scriptTemplateName: '',
					caseType: '',
					caseProperty: '',
					priority: '',
					authorName: '',
					executorName: '',
					receiverName: '',
					scriptMode: '',
					useStatus: '',
					executeMethod: '',

				},
				casePropertyList: [{
					value: '1',
					label: '正常值'
				}, {
					value: '2',
					label: '错误值'
				}, {
					value: '3',
					label: '边界值'
				}, {
					value: '4',
					label: '要素级'
				}, {
					value: '5',
					label: '流程级'
				}],
				caseTypeList: [{
					value: '1',
					label: '联机'
				}, {
					value: '2',
					label: '批量'
				}, {
					value: '3',
					label: '接口'
				}],
				priorityList: [{
					value: '1',
					label: '1级'
				}, {
					value: '2',
					label: '2级'
				}, {
					value: '3',
					label: '3级'
				}, {
					value: '4',
					label: '4级'
				}, {
					value: '5',
					label: '5级'
				}, {
					value: '6',
					label: '6级'
				}, {
					value: '7',
					label: '级'
				}, {
					value: '8',
					label: '8级'
				}, {
					value: '9',
					label: '9级'
				}],
				useStatusList: [{
					value: '1',
					label: '新增'
				}, {
					value: '2',
					label: '评审通过'
				}],
				executeMethodList: [{
					value: '1',
					label: '手工'
				}, {
					value: '2',
					label: '自动化'
				}, {
					value: '3',
					label: '配合'
				}],
				scriptModeList: [{
					value: '1',
					label: '模板'
				}],
				testCaseList: [],
				missionList: [],
				autList: [],
				transList: [],
				templateList: [],
				userList: [],
				addVisible: false,
				addVisibleM: false,
				author: '',
				executor: '',
				reviewer: '',
				fileList: [], //文件列表
				scriptMode: '模板',
				useStatus: '评审通过',
				executeMethod: '自动化',
				caseProperty: '正常值',
				caseType: '联机',
				priority: '1级',
				autValue: '',
				transValue: '',
				templateValue: '',
				missionValue: '',
				systemValue: '',
				radio:'1',
				// apiUrl: '',
				tt: 0, //总条数
				pageSize: 8, //页面大小
				currentPage: 1, //当前页
				totalPage: 1, //总页数
				listnum: 5, //页面大小
				totalCount: 0,
				order: 'id',
				sort: 'asc',
				activeName: 'first',
				dialogVisible: false,
				dialogVisibleI: false,
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
			this.getCase()
			this.getMission()
			this.getAutSystem()
			this.getUsers()
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
			//得到用例信息
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
			//得到测试任务
			getMission() {
				var _this = this
				Request({
					url: '/missionController/pagedBatchQueryTestMission',
					method: 'post',
					params: {
						currentPage: 1,
						pageSize: 10000,
						orderColumns: 'modified_time',
						orderType: 'desc',
						nameMedium: '',
						descMedium: '',
						codeLong: ''
					}
				}).then((res) => {
					_this.missionList = res.list
					_this.missionValue = res.list[0].nameMedium
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//得到用户
			getUsers() {
				var _this = this
				Request({
					url: '/userController/selectAllUsername',
					method: 'post',
					params: {}
				}).then((res) => {
					_this.userList = res.list
					_this.author = res.list[0].username
					_this.executor = res.list[0].username
					_this.reviewer = res.list[0].username
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//得到被测系统
			getAutSystem() {
				var _this = this
				Request({
					url: '/aut/queryListAut',
					method: 'post',
				}).then((res) => {
					_this.autList = res.autRespDTOList;
					_this.autValue = _this.autList[0].nameMedium
					_this.getTrans(_this.autList[0].id)
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//得到功能点
			getTrans(autId) {
				var _this = this
				Request({
					url: '/transactController/pagedBatchQueryTransact',
					method: 'post',
					params: {
						autId: autId,
						currentPage: 1,
						orderColumns: 'id',
						orderType: 'asc',
						pageSize: 100000
					}
				}).then((res) => {
					_this.transList = res.list;
					_this.transValue = _this.transList[0].nameMedium
					_this.getTemplate(_this.transList[0].id)
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//得到基础脚本
			getTemplate(transId) {
				var _this = this
				Request({
					url: '/scriptTemplate/queryTemplateByTransId',
					method: 'post',
					params: {
						id: transId
					}
				}).then((res) => {
					_this.templateList = res.scriptTemplateList;
					if (_this.templateList.length == 0) {
						_this.templateValue = ''
					} else {
						_this.templateValue = _this.templateList[0].name
					}
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//点击被测系统
			transChange(e) {
				this.getTrans(e)
			},
			//点击功能点
			templateChange(e) {
				this.getTemplate(e)
			},
			//展示添加详情界面
			showVisible() {
				var dv = document.getElementById('addVisible')
				if (this.addVisible == false) {
					dv.className = ''
					dv.setAttribute("class", "showAddSingle")
					this.addVisible = true
				} else {
					dv.className = ''
					dv.setAttribute("class", "notShowAddSingle")
					this.addVisible = false
				}
			},
			//展示添加详情界面
			showVisibleM() {
				var dv = document.getElementById('addVisibleM')
				if (this.addVisibleM == false) {
					dv.className = ''
					dv.setAttribute("class", "showAddSingle")
					this.addVisibleM = true
				} else {
					dv.className = ''
					dv.setAttribute("class", "notShowAddSingle")
					this.addVisibleM = false
				}
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.getCase()
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.getCase()
			},
			uploadCase() {
				this.dialogVisibleI = true
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//下载模板
			downloadTemplate(val){
				if(val==0){
					let url ="http://10.101.167.184:8080/atfcloud2.0a/testcase/batchImport/file/template/simple";
					window.location.href = url;
				}
				else{
					let url ="http://10.101.167.184:8080/atfcloud2.0a/testcase/getStandardExcelTemporary";
					window.location.href = url;
				}
			},
			subShow(caseId){

			},
		}
	}
</script>
<style>
	.scrollbar {
		width: calc(100vw - 320px);
	}

	.inline-block {
		display: inline-block;
	}

	.notShowAddSingle {
		display: none;
	}

	.showAddSingle {
		display: block
	}

	.el-container .el-row {
		padding: 3px 0
	}

	.in-file {
		text-align: center;
	}
	.text{
		padding-right:10px
	}
	.radio{
		padding-left:75px;
		padding-top: 15px;
	}
</style>
