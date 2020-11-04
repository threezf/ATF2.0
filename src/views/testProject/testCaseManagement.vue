<template>
<div class="page-inner">
    <el-container>
        <el-main>
            <el-row>
                <!--		<el-button-->
                <!--		@click=''-->
                <!--                    type="primary"-->
                <!--		size="small"-->
                <!--		icon="el-icon-arrow-down">-->
                <!--		显示筛选-->
                <!--		</el-button>-->
                <el-button @click="addCase" type="primary" size="small" icon="el-icon-plus">
                    添加
                </el-button>
                <el-button @click="uploadCase" type="primary" size="small" icon="el-icon-upload2">
                    导入
                </el-button>
                <el-button @click="toUploadRecord" type="primary" size="small" icon="el-icon-upload2">
                    导入记录
                </el-button>
                <el-button @click="outputCase" type="primary" size="small" icon="el-icon-download">
                    导出
                </el-button>
                <el-button @click="addNodeShow" type="primary" size="small" icon="el-icon-plus">
                    添加流程节点
                </el-button>
                <el-button @click="deleteNode" type="primary" size="small" icon="el-icon-delete">
                    删除流程节点
                </el-button>
                <el-button @click="changeInf" type="primary" size="small" icon="el-icon-delete">
                    更改多种用例信息
                </el-button>
            </el-row>
            <el-row style="padding-top:10px;padding-bottom:10px">
                <search @getComponentData="searchCase" @getTotalCount="searchCase2"></search>
            </el-row>
                <el-table stripe :data="testCaseList" border ref="table" :row-class-name="tableRowClassName" class="table" @expand-change="subShow" :row-key="getRowKeys"
					:expand-row-keys="expands" @selection-change="handleSelectionChange">
									<el-table-column type="expand" >
                        <template slot-scope="scope">
                            <div class="scrollbar" v-if="scope.row.caseCompositeType == '2'">
                                <el-table :data="subCaseList" @selection-change="subHandleSelectionChange" row-key="id" class="tabPosition">
                                    <el-table-column width="48"><i class="el-icon-rank" style="color:#F56C6C;font-size:16px;cursor: pointer"></i>
                                    </el-table-column>
                                    <el-table-column type="selection" />
                                    <el-table-column label="流程节点名称" property="actioncasecode" />
                                    <el-table-column label="被测系统" property="autName" />
                                    <el-table-column label="功能点" property="transName" />
                                    <el-table-column label="用例组成类型">
                                        <template>
                                            {{ "流程节点" }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态">
                                        <template slot-scope="scope">
                                            {{scope.row.useStatus == "0" ? "新增" : "评审通过" }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="关联脚本名称" property="scriptTemplateName" />
                                    <el-table-column label="作者" property="authorName" />
                                    <el-table-column label="用例性质">
                                        <template slot-scope="scope">
                                            {{convertCasePro(scope.row.caseProperty) }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="300">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column type="selection"></el-table-column>
                    <!--		<el-table-column-->
                    <!--		label="节点"-->
                    <!--		property=""-->
                    <!--		width="60">-->
                    <!--		<template slot-scope="scope">-->
                    <!--		<i class="el-icon-arrow-down" v-if="scope.row.caseCompositeType!='1'"-->
                    <!--		   @click="subShow(scope.row.id,scope.row.caseCompositeType,scope.row.index)"></i>-->
                    <!--		</template>-->
                    <!--		</el-table-column>-->
                    <el-table-column label="用例名称" property="casecode" />
                    <el-table-column label="被测系统" property="autName" />
                    <el-table-column label="功能点" property="transName" />
                    <el-table-column label="用例组成类型">
                        <template slot-scope="scope">
                            {{scope.row.caseCompositeType == "1" ? "单用例" : "流程用例" }}
                        </template>
                    </el-table-column>
                    <el-table-column label="关联脚本名称" property="scriptTemplateName" />
                    <el-table-column label="作者" property="authorReallyName" />
                    <el-table-column label="用例性质">
                        <template slot-scope="scope">
                            {{ convertCasePro(scope.row.caseProperty) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button size="small" @click="showInfo(scope.row,'1')">查看
                            </el-button>
                            <el-button size="small" type="info" @click="showInfo(scope.row,'2')">修改
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

            <el-dialog title="添加用例" :visible.sync="dialogVisible" width="65%" class="addDialog">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="单用例" name="first" class="addTab">
                        <div>
                            <el-form ref="addForm" :model="addForm">
                                <el-row style="padding:0;margin:0" type="flex" justify="center">
                                    <el-form-item label="用例名称" prop="casecode" label-width="35%" >
                                        <el-col :span="14">
                                            <el-input v-model="
                         addForm.casecode" size="small"></el-input>
                                        </el-col>
                                        <el-col :span="8" :offset="1">
                                            <el-button @click="showVisibleS" v-if="buttonS" type="primary" size="small" icon="el-icon-arrow-down">
                                                隐藏详情
                                            </el-button>
                                            <el-button @click="showVisibleS" v-else type="primary" size="small" icon="el-icon-arrow-down">
                                                显示详情
                                            </el-button>
                                        </el-col>
                                    </el-form-item>
                                </el-row>
                                <div v-if="dialogVisibleS" class="addForm">
                                    <el-divider content-position="center" style="padding:0;margin:0">后缀有*为必填项目</el-divider>
                                    <el-row>
                                        <el-col :span="7">
                                            <el-form-item label="被测系统" prop="autName" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.autId" size="small" filterable @change="transChange($event)">
                                                    <el-option v-for="item in autList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" :offset="1">
                                            <el-form-item label="功能点" prop="transName" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.transId" size="small" @change="templateChange($event)">
                                                    <el-option v-for="item in transList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" :offset="1">
                                            <el-form-item label="基础脚本" prop="scriptModeFlag" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.scriptModeFlag" size="small">
                                                    <el-option v-for="item in templateList" :key="item.id" :label="item.name" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="7">
                                            <el-form-item label="用例性质" prop="caseproperty" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.caseproperty" size="small">
                                                    <el-option v-for="item in casePropertyList" :key="item.id" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" :offset="1">
                                            <el-form-item label="作者" prop="author" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.author" size="small">
                                                    <el-option v-for="item in userList" :key="item.id" :label="item.reallyname" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="11">
                                            <el-form-item label="测试意图" prop="testdesign" label-width="25%"  required>
                                                <el-input size="small" v-model="addForm.testdesign"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11" style="margin-left: 6.5%">
                                            <el-form-item label="前置条件" prop="prerequisites" label-width="25%" required>
                                                <el-input size="small" v-model="addForm.prerequisites"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="11">
                                            <el-form-item label="测试步骤" prop="teststep" label-width="25%" size="small" >
                                                <el-input size="small" v-model="addForm.teststep"></el-input>
                                            </el-form-item>
                                        </el-col>
											<el-col :span="11" style="margin-left: 6.5%">
												<el-form-item label="检查点" prop="checkpoint" size="small" label-width="25%" >
												    <el-input size="small" v-model="addForm.checkpoint"></el-input>
												</el-form-item>
										</el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="11">
                                            <el-form-item label="预期结果" prop="expectresult" size="small" label-width="25%" >
                                                <el-input size="small" v-model="addForm.expectresult"></el-input>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="备注" prop="note" label-width="11.5%">
                                                <el-col style="width:94%">
                                                    <el-input type="textarea" placeholder="请输入内容" v-model="addForm.note">
                                                    </el-input>
                                                </el-col>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" justify="center" >
                                            <el-button type="primary" size="small" @click="insert(1)">添加</el-button>
                                            <el-button type="primary" size="small" @click="dialogVisible = !dialogVisible">取消
                                            </el-button>
                                    </el-row>
                                </div>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="流程用例" name="second" class="addTab">
                        <div>
                            <el-form ref="addForm" :model="addForm">
                                <el-row style="padding:0;margin:0" type="flex" justify="center">
                                    <el-form-item label="用例名称" prop="casecode" label-width="35%" >
                                        <el-col :span="14">
                                            <el-input v-model="addForm.casecode" size="small"></el-input>
                                        </el-col>
                                        <el-col :span="8" :offset="1">
                                            <el-button @click="showVisibleM" v-if="buttonM" type="primary" size="small" icon="el-icon-arrow-down">
                                                隐藏详情
                                            </el-button>
                                            <el-button @click="showVisibleM" v-else type="primary" size="small" icon="el-icon-arrow-down">
                                                显示详情
                                            </el-button>
                                        </el-col>
                                    </el-form-item>
                                </el-row>
                                <div v-if="dialogVisibleM" class="addForm">
                                    <el-divider content-position="center" style="padding:0;margin:0">后缀有*为必填项目</el-divider>
                                    <el-row>
                                        <el-col :span="7">
                                            <el-form-item label="被测系统" prop="autName" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.autId" size="small" filterable @change="transChange($event)">
                                                    <el-option v-for="item in autList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" :offset="1">
                                            <el-form-item label="功能点" prop="transName" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.transId" size="small" @change="templateChange($event)">
                                                    <el-option v-for="item in transList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" :offset="1">
                                            <el-form-item label="基础脚本" prop="scriptModeFlag" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.scriptModeFlag" size="small">
                                                    <el-option v-for="item in templateList" :key="item.id" :label="item.name" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="7">
                                            <el-form-item label="用例性质" prop="caseproperty" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.caseproperty" size="small">
                                                    <el-option v-for="item in casePropertyList" :key="item.id" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" :offset="1">
                                            <el-form-item label="作者" prop="author" label-width="40%">
                                                <el-select class="selectWidth" v-model="addForm.author" size="small">
                                                    <el-option v-for="item in userList" :key="item.id" :label="item.reallyname" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="11">
                                            <el-form-item label="测试意图" prop="testdesign" label-width="25%" size="small" >
                                                <el-input v-model="addForm.testdesign"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11" style="margin-left: 6.5%">
                                            <el-form-item label="前置条件" prop="prerequisites" label-width="25%" size="small" >
                                                <el-input v-model="addForm.prerequisites"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="11">
                                            <el-form-item label="测试步骤" prop="teststep" label-width="25%" size="small" >
                                                <el-input v-model="addForm.teststep"></el-input>
                                            </el-form-item>
                                        </el-col>
																			<el-col :span="11" style="margin-left: 6.5%">
																				<el-form-item label="检查点" prop="checkpoint" size="small" label-width="25%" >
																					<el-input v-model="addForm.checkpoint"></el-input>
																				</el-form-item>
																			</el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="11">
                                            <el-form-item label="预期结果" prop="expectresult" size="small" label-width="25%" >
                                                <el-input v-model="addForm.expectresult"></el-input>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="备注" prop="note" label-width="11.5%">
                                                <el-col style="width:94%">
                                                    <el-input type="textarea" placeholder="请输入内容" v-model="addForm.note">
                                                    </el-input>
                                                </el-col>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <div v-for="item in caseNodeNums" :key="item.id">
                                        <el-form ref="addNodeForm" v-if="item.display" :model="item.addNodeForm">
                                            <el-row style="font-size:20px;padding-top:20px">
                                                <el-col :span="4" :offset="1">
                                                    流程节点用例
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="18" :offset="2">
                                                    <el-form-item label="流程节点名称" prop="actioncasecode" label-width="35%" >
                                                        <el-col :span="6">
                                                            <el-input v-model="item.addNodeForm.actioncasecode" size="small"></el-input>
                                                        </el-col>
                                                        <el-col :span="6" :offset="1">
                                                            <el-button @click="item.show = !item.show" v-if="item.show" type="primary" size="small" icon="el-icon-arrow-down">
                                                                隐藏详情
                                                            </el-button>
                                                            <el-button @click="item.show = !item.show" v-else type="primary" size="small" icon="el-icon-arrow-down">
                                                                显示详情
                                                            </el-button>
                                                        </el-col>
                                                        <el-col :span="5" style="margin-left: 10px">
                                                            <el-button @click="caseNodeNums.splice((item.num -1),1)" type="primary" size="small" icon="el-icon-arrow-down">
                                                                删除节点
                                                            </el-button>
                                                        </el-col>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-divider content-position="center">后缀有*为必填项目</el-divider>
                                            <div v-show="item.show">
                                                <el-row>
                                                    <el-col :span="7">
                                                        <el-form-item label="被测系统" prop="autName" label-width="40%">
                                                            <el-select class="selectWidth" v-model="item.addNodeForm.autId" filterable size="small" @change="transChange($event)">
                                                                <el-option v-for="item in autList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="7" :offset="1">
                                                        <el-form-item label="功能点" prop="transName" label-width="40%">
                                                            <el-select class="selectWidth" v-model="item.addNodeForm.transId" size="small" @change="templateChange($event)">
                                                                <el-option v-for="item in transList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="7" :offset="1">
                                                        <el-form-item label="基础脚本" prop="scriptModeFlag" label-width="40%">
                                                            <el-select class="selectWidth" v-model="item.addNodeForm.scriptModeFlag" size="small">
                                                                <el-option v-for="item in templateList" :key="item.id" :label="item.name" :value="item.id">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :span="7" >
                                                        <el-form-item label="节点顺序号" prop="steporder" label-width="40%" >
                                                            <el-input v-model="item.addNodeForm.steporder" size="small"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :span="11">
                                                        <el-form-item label="测试意图" prop="testdesign" label-width="25%" >
                                                            <el-input size="small" v-model="item.addNodeForm.testdesign"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="11" style="margin-left: 6.5%">
                                                        <el-form-item label="前置条件" prop="prerequisites" label-width="25%" >
                                                            <el-input size="small" v-model="item.addNodeForm.prerequisites"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :span="11">
                                                        <el-form-item label="测试步骤" prop="teststep" label-width="25%" >
                                                            <el-input size="small" v-model="item.addNodeForm.teststep"></el-input>
                                                        </el-form-item>
                                                    </el-col>
														<el-col :span="11" style="margin-left: 6.5%">
															<el-form-item label="检查点" prop="checkpoint" label-width="25%" >
																<el-input size="small" v-model="item.addNodeForm.checkpoint"></el-input>
															</el-form-item>
														</el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :span="11">
                                                        <el-form-item label="预期结果" prop="expectresult" label-width="25%" >
                                                            <el-input size="small" v-model="item.addNodeForm.expectresult"></el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>
                                                <el-row>
                                                    <el-col>
                                                        <el-form-item label="备注" prop="note" label-width="11.5%">
                                                            <el-col  style="width:94%">
                                                                <el-input type="textarea" placeholder="请输入内容" v-model="item.addNodeForm.note">
                                                                </el-input>
                                                            </el-col>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-form>
                                    </div>
                                    <el-row style="height:50px"></el-row>
                                    <el-row>
                                        <el-col :span="6" :offset="1">
                                            <el-button type="primary" size="mini" @click="showElement(1)" plain>添加流程节点</el-button>
                                        </el-col>
                                    </el-row>

                                    <el-divider></el-divider>
                                    <el-row type="flex" justify="center">
                                            <el-button type="primary" size="small" @click="insert(2)">添加</el-button>
                                            <el-button type="primary" size="small" @click="dialogVisible = !dialogVisible">取消
                                            </el-button>
                                    </el-row>
                                </div>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
            <el-dialog title="添加一个流程节点" :visible.sync="dialogVisibleN" width="65%">
                <el-tabs v-model="activeName" type="card" class="addTab">
                    <div v-for="item in caseNodeNums" :key="item.id">
                        <el-form ref="addNodeForm" :model="item.addNodeForm">
                            <el-row>
                                <el-col :span="18" :offset="2">
                                    <el-form-item label="流程节点名称" prop="actioncasecode" label-width="35%" >
                                        <el-col :span="6">
                                            <el-input v-model="item.addNodeForm.actioncasecode" size="small"></el-input>
                                        </el-col>
                                        <el-col :span="5" :offset="1">
                                            <el-button @click="item.show = !item.show" v-if="item.show" type="primary" size="small" icon="el-icon-arrow-down">
                                                隐藏详情
                                            </el-button>
                                            <el-button @click="item.show = !item.show" v-else type="primary" size="small" icon="el-icon-arrow-down">
                                                显示详情
                                            </el-button>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-divider content-position="center">后缀有*为必填项目</el-divider>
                            <div v-show="item.show">
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="被测系统" prop="autName" label-width="40%">
                                            <el-select class="selectWidth" v-model="item.addNodeForm.autId" filterable size="small" @change="transChange($event)">
                                                <el-option v-for="item in autList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" :offset="1">
                                        <el-form-item label="功能点" prop="transName" label-width="40%">
                                            <el-select class="selectWidth" v-model="item.addNodeForm.transId" size="small" @change="templateChange($event)">
                                                <el-option v-for="item in transList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" :offset="1">
                                        <el-form-item label="基础脚本" prop="scriptModeFlag" label-width="40%">
                                            <el-select class="selectWidth" v-model="item.addNodeForm.scriptModeFlag" size="small">
                                                <el-option v-for="item in templateList" :key="item.id" :label="item.name" :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7" >
                                        <el-form-item label="节点顺序号" prop="steporder" label-width="40%" >
                                            <el-input v-model="item.addNodeForm.steporder" size="small"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="测试意图" prop="testdesign" label-width="25%" >
                                            <el-input size="small" v-model="item.addNodeForm.testdesign"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" style="margin-left: 6.5%">
                                        <el-form-item label="前置条件" prop="prerequisites" label-width="25%" >
                                            <el-input size="small" v-model="item.addNodeForm.prerequisites"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="测试步骤" prop="teststep" label-width="25%" >
                                            <el-input size="small" v-model="item.addNodeForm.teststep"></el-input>
                                        </el-form-item>
                                    </el-col>
									<el-col :span="11" style="margin-left: 6.5%">
										<el-form-item label="检查点" prop="checkpoint" label-width="25%" >
											<el-input size="small" v-model="item.addNodeForm.checkpoint"></el-input>
										</el-form-item>
									</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="预期结果" prop="expectresult" label-width="25%" >
                                            <el-input size="small" v-model="item.addNodeForm.expectresult"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-form-item label="备注" prop="note" label-width="11.5%">
                                            <el-col style="width:94%">
                                                <el-input type="textarea" placeholder="请输入内容" v-model="item.addNodeForm.note">
                                                </el-input>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </div>

                        </el-form>
                    </div>
                    <el-row style="height:50px"></el-row>

                    <el-row type="flex" justify="center">
                        <el-button type="primary" size="small" @click="insertNode">添加</el-button>
                        <el-button type="primary" size="small" @click="dialogVisibleN=!dialogVisibleN">取消</el-button>
                    </el-row>

                </el-tabs>
            </el-dialog>
            <el-dialog title="更改多种用例信息" :visible.sync="dialogVisibleC" width="30%">
                <el-tabs v-model="activeName" type="card">
                    <el-form ref="changeForm" :model="changeForm">
                        <el-form-item label="被测系统" prop="autName" label-width="40%">
                            <el-select class="selectWidth" v-model="changeForm.autId" filterable size="small" @change="transChange($event)">
                                <el-option v-for="item in autList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="功能点" prop="transName" label-width="40%">
                            <el-select class="selectWidth" v-model="changeForm.transId" size="small" @change="templateChange($event)">
                                <el-option v-for="item in transList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="基础脚本" prop="scriptModeFlag" label-width="40%">
                            <el-select class="selectWidth" v-model="changeForm.scriptModeFlag" size="small">
                                <el-option v-for="item in templateList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用例性质" prop="caseproperty" label-width="40%">
                            <el-select class="selectWidth" v-model="changeForm.caseProperty" size="small">
                                <el-option v-for="item in casePropertyList" :key="item.id" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-row style="height:10px"></el-row>

                    <el-row type="flex" justify="center">
                            <el-button type="primary" size="small" @click="changeIm">更改</el-button>
                            <el-button type="primary" size="small" @click="toOrigin">重置</el-button>
                            <el-button type="primary" size="small" @click="noChangeIm">取消</el-button>
                    </el-row>
                </el-tabs>
            </el-dialog>
            <el-dialog title="导入" :visible.sync="dialogVisibleI" width="30%">
                <!-- ElementUI上传 -->
                <el-upload class="upload-demo in-file" :action="importURL" :limit="1" :auto-upload="false" :on-change="changeFile" :on-remove="handleRemove" :file-list="fileList">
                    <el-button size="small" type="primary">选择文件</el-button>
                    <i slot="tip" class="el-upload__tip text">&nbsp;&nbsp;只能选择xlsx文件</i>
                </el-upload>
                <el-divider></el-divider>
                <!--		<div>-->
                <!--		上传方式：-->
                <!--		<el-radio v-model="radio" label="1">简单版</el-radio>-->
                <!--		<el-button size="small" type="success" @click="downloadTemplate(0)">模板下载</el-button>-->
                <!--		</div>-->
                <div>
                    <el-radio v-model="radio" label="2" class="radio">标准版</el-radio>
                    <el-button size="small" type="success" @click="downloadTemplate(1)">模板下载</el-button>
                </div>
                <el-divider></el-divider>
                <div class="in-file">
                    <el-button size="small" type="primary" @click="uploadTemp">导入</el-button>
                    <el-button size="small" type="primary" @click="dialogVisibleI = !dialogVisibleI">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="导出" :visible.sync="dialogVisibleO" width="30%">
                <el-form ref="outputForm" prop="outputForm" label-width="80px" method="POST" :action="exportUrl">
                    <div hidden>
                        <el-input type="text" name="testCaseIdList" v-for="(id,index) in selectList" :value="id" :key="index">
                        </el-input>
                    </div>
                    <el-form-item label="导出范围" prop="output">
                        <el-input :disabled="true" placeholder="部分"></el-input>
                    </el-form-item>
                    <div class="in-file">
                        <el-button size="small" type="primary" native-type="submit">导出</el-button>
                        <el-button size="small" type="primary" @click="dialogVisibleO = !dialogVisibleO">取消</el-button>
                    </div>
                </el-form>
            </el-dialog>
            <el-dialog :title="title" :visible.sync="dialogVisibleQ" width="50%">
                <el-form :disabled="!changeFlag" ref="addForm" :model="addForm">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="用例名称" prop="casecode" label-width="40%" >
                                <el-input v-model="addForm.casecode" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="被测系统" prop="autName" label-width="40%">
                                <el-select class="selectWidth" v-model="addForm.autId" size="small" filterable @change="transChange($event)">
                                    <el-option v-for="item in autList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="功能点" prop="transName" label-width="40%">
                                <el-select class="selectWidth" v-model="addForm.transId" size="small" @change="templateChange($event)">
                                    <el-option v-for="item in transList" :key="item.id" :label="item.nameMedium" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="基础脚本" prop="scriptModeFlag" label-width="40%">
                                <el-select class="selectWidth" v-model="addForm.scriptModeFlag" size="small">
                                    <el-option v-for="item in templateList" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="用例性质" prop="caseproperty" label-width="40%">
                                <el-select class="selectWidth" v-model="addForm.caseproperty" size="small">
                                    <el-option v-for="item in casePropertyList" :key="item.id" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="作者" prop="author" label-width="40%">
                                <el-select class="selectWidth" v-model="addForm.author" size="small">
                                    <el-option v-for="item in userList" :key="item.id" :label="item.reallyname" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="测试意图" prop="testdesign" label-width="20%" >
                                <el-input type="textarea" v-model="addForm.testdesign"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="前置条件" prop="prerequisites" label-width="20%" >
                                <el-input type="textarea" v-model="addForm.prerequisites"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="测试步骤" prop="teststep" label-width="20%" >
                                <el-input type="textarea" v-model="addForm.teststep"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="预期结果" prop="expectresult" label-width="20%" >
                                <el-input type="textarea" v-model="addForm.expectresult"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="检查点" prop="checkpoint" label-width="20%" >
                                <el-input type="textarea" v-model="addForm.checkpoint"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="备注" prop="note" label-width="20%">
                                <el-input type="textarea" placeholder="请输入内容" v-model="addForm.note">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row type="flex" justify="center">
                    <el-button type="primary" size="small" v-show="changeFlag" @click="changeCaseInfo">修改</el-button>
                    <el-button type="primary" size="small" @click="dialogVisibleQ = !dialogVisibleQ">退出</el-button>
                </el-row>
            </el-dialog>
        </el-main>
        <el-footer class="dialog-footer">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
        </el-footer>
    </el-container>
</div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import searchTestCase from "@/components/searchTestcase/index";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
import Sortable from 'sortablejs';
import {
    exportExcel
} from '@/libs/utils.js'

export default {
    mixins: [VueMixins], // 混入
    components: {
        ElSlPanel,
        "search": searchTestCase
    },

    data() {
        return {
            addForm: {
                actionList: [],
                autId: "",
                author: sessionStorage.getItem("userId"),
                automaton: "",
                caseCompositeType: "",
                casecode: "",
                caseproperty: "1",
                casetype: "1",
                categoryTeam: "",
                checkpoint: "",
                datarequest: "",
                executeMethod: "2",
                executor: sessionStorage.getItem("userId"),
                expectresult: "",
                functionModule: "",
                modifyChannel: "",
                modifyChannelNo: "",
                note: "",
                prerequisites: "",
                priority: "1",
                reviewer: sessionStorage.getItem("userId"),
                scriptMode: "1",
                scriptModeFlag: "",
                submissionId: "49",
                tags: "",
                testdesign: "",
                testpoint: "1",
                teststep: "",
                transId: "",
                useStatus: "1",
                version: "1",
            },
            caseNodeNums: [{
                num: 1,
                status: true,
                show: true,
                name: "boundGroup1",
                display: false,
                addNodeForm: {
                    actioncasecode: "",
                    actioncode: "",
                    autId: "",
                    checkpoint: "",
                    datarequest: "",
                    executeMethod: "2",
                    expectresult: "",
                    note: "",
                    prerequisites: "",
                    scriptMode: "1",
                    scriptModeFlag: "",
                    steporder: "",
                    testdesign: "",
                    testpoint: "1",
                    teststep: "",
                    transId: ""
                }
            }],
            changeForm: {
                autId: "未选择",
                caseProperty: "未选择",
                caseType: "未选择",
                executeMethod: "未选择",
                executor: "未选择",
                missionId: "未选择",
                priority: "未选择",
                reviewer: "未选择",
                scriptMode: "未选择",
                scriptModeFlag: "未选择",
                transId: "未选择",

            },
            casePropertyList: [{
                    value: "1",
                    label: "正常值"
                },
                {
                    value: "2",
                    label: "错误值"
                },
                {
                    value: "3",
                    label: "边界值"
                },
                {
                    value: "4",
                    label: "要素级"
                },
                {
                    value: "5",
                    label: "流程级"
                }
            ],
            // caseTypeList: [{
            // 	value: "1",
            // 	label: "联机"
            // },
            // 	{
            // 		value: "2",
            // 		label: "批量"
            // 	},
            // 	{
            // 		value: "3",
            // 		label: "接口"
            // 	}
            // ],
            // priorityList: [{
            // 	value: "1",
            // 	label: "1级"
            // },
            // 	{
            // 		value: "2",
            // 		label: "2级"
            // 	},
            // 	{
            // 		value: "3",
            // 		label: "3级"
            // 	},
            // 	{
            // 		value: "4",
            // 		label: "4级"
            // 	},
            // 	{
            // 		value: "5",
            // 		label: "5级"
            // 	},
            // 	{
            // 		value: "6",
            // 		label: "6级"
            // 	},
            // 	{
            // 		value: "7",
            // 		label: "级"
            // 	},
            // 	{
            // 		value: "8",
            // 		label: "8级"
            // 	},
            // 	{
            // 		value: "9",
            // 		label: "9级"
            // 	}
            // ],
            // useStatusList: [{
            // 	value: "1",
            // 	label: "新增"
            // },
            // 	{
            // 		value: "2",
            // 		label: "评审通过"
            // 	}
            // ],
            // executeMethodList: [{
            // 	value: "1",
            // 	label: "手工"
            // },
            // 	{
            // 		value: "2",
            // 		label: "自动化"
            // 	},
            // 	{
            // 		value: "3",
            // 		label: "配合"
            // 	}
            // ],
            // scriptModeList: [{
            // 	value: "1",
            // 	label: "模板"
            // }],
            testCaseList: [],
            subCaseList: [],
            missionList: [],
            autList: [],
            transList: [],
            templateList: [],
            userList: [],
					  expands:[],
            multipleSelection: [],
            subMultipleSelection: [],
				  	getRowKeys: (row) => {//获取当前行id
						// console.log(row)
						 return row.id   //这里看这一行中需要根据哪个属性值是id
					},
            addVisible: false,
            addVisibleM: false,
            changeFlag: false,
            titleFlag: 1,
            author: "",
            executor: "",
            reviewer: "",
            selectValue: "caseCompositeType",
            selectInfo: "",
            fileList: [], //文件列表
            fileListM: [], //用于导入
            idList: [], //一级表格选择的流程用例
            subIdList: [], //二级表格选择的流程节点
            selectList: [], //一级表格选择的全部用例
            hostId: "",
            caseNodeNum: 1,
            failMSG: "操作失败啦",
            scriptMode: "模板",
            useStatus: "评审通过",
            executeMethod: "自动化",
            caseProperty: "正常值",
            caseType: "联机",
            priority: "1级",
            autValue: "",
            transValue: "",
            templateValue: "",
            missionValue: "",
            systemValue: "",
            radio: "2",
            // apiUrl: '',
            tt: 0, //总条数
            pageSize: 10, //页面大小
            currentPage: 1, //当前页
            totalPage: 1, //总页数
            listnum: 5, //页面大小
            totalCount: 0,
            order: "id",
            sort: "asc",
            activeName: "first",
            dialogVisible: false,
            dialogVisibleI: false,
            dialogVisibleO: false,
            dialogVisibleN: false,
            dialogVisibleS: true,
            dialogVisibleM: true,
            dialogVisibleC: false,
            dialogVisibleQ: false,
            buttonM: true,
            buttonS: true,
            modelFlag: 0,
            row: {},
            conditionList: [],
            timer: null,
            exportUrl: 'http://10.101.167.184:8080/atfcloud2.0a/testcase/exportTestCase'
        };
    },
    computed: {
        params() {
            let obj = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                orderColumns: this.order,
                orderType: this.sort,
                caseLibId: sessionStorage.getItem("caselibId")
            };
            return obj;
        },
        title() {
            var obj = {
                1: '查看测试用例信息',
                2: '修改测试用例信息'
            }
            return obj[this.titleFlag]
        },
			importURL() {
				return "http://10.101.167.184:8080/atfcloud2.0a/testcase/batchImportTestcase"; // 上传的URL
			},
    },
    created() {
        this.getCase();
        this.getAutSystem();
        this.getUsers();
    },
    mounted() {

    },
    methods: {
        searchCase(val) {
            this.testCaseList = val
            this.currentPage = 1
        },
        searchCase2(val) {
            this.totalCount = val;
            this.totalPage = Math.ceil(
                this.totalCount / this.pageSize
            );
        },
        //展示查看和修改页面表单
        showInfo(row, flag) {
            this.dialogVisibleQ = !this.dialogVisibleQ
            if (flag == "1") {
                this.titleFlag = 1
                this.changeFlag = false
            } else {
                this.titleFlag = 2
                this.changeFlag = true
                this.row = row
            }
            this.addForm = {
                autId: row.autName,
                author: row.authorReallyName,
                casecode: row.casecode,
                caseproperty: row.caseProperty.toString(),
                casetype: row.caseType.toString(),
                checkpoint: row.checkPoint,
                datarequest: row.dataRequest,
                executeMethod: row.executeMethod.toString(),
                executor: row.executorName,
                expectresult: row.expectResult,
                functionModule: row.functionModule,
                // modifyChannel: row.modifyChannel,
                // modifyChannelNo: row.modifyChannelNo,
                note: row.note,
                prerequisites: row.preRequisites,
                priority: row.priority.toString(),
                reviewer: row.reviewerName,
                scriptMode: row.scriptTemplateName,
                scriptModeFlag: row.scriptTemplateName,
                submissionId: row.missionId,
                tags: row.tags,
                testdesign: row.testDesign,
                testpoint: row.testPoint,
                teststep: row.testStep,
                transId: row.transName,
                useStatus: row.useStatus.toString(),
                version: row.version
            }
            for (let item in this.addForm) {
                if (this.addForm[item]) {
                    this.addForm[item] = this.addForm[item].toString()
                } else {
                    this.addForm[item] = ''
                }
            }
        },
        //修改用例信息
        changeCaseInfo() {
            var _this = this
            Request({
                    url: "/testcase/modifySingleTestCaseInfo",
                    method: "post",
                    params: {
                        ...this.addForm,
                        transId: _this.row.transName == _this.addForm.transId ? _this.row.transId.toString() : _this.addForm.transId.toString(),
                        id: _this.row.id.toString(),
                        author: _this.row.authorId.toString(),
                        reviewer: _this.row.authorId.toString(),
                        executor: _this.row.authorId.toString(),
                    }
                })
                .then(
                    res => {
                        _this.getCase(1);
                        _this.dialogVisibleQ = !_this.dialogVisibleQ;
                        this.$alert('修改用例成功', '成功', {
                            confirmButtonText: '确定',
                        });
                    },
                    err => {
                        this.$alert('修改用例失败', '失败', {
                            confirmButtonText: '确定',
                        });
                    }
                )
                .catch(err => {
                    this.$alert('修改用例失败', '失败', {
                        confirmButtonText: '确定',
                    });
                });
        },
        //展示添加用例表单
        addCase() {
            this.dialogVisible = true;
        },
        //添加用例
        insert(caseCompositeType) {
            var _this = this;
            _this.addForm.actionList = []
            _this.addForm.caseCompositeType = caseCompositeType;
            if (caseCompositeType == 2) {
                for (var i = 0; i < _this.caseNodeNum - 1; i++) {
                    _this.addForm.actionList.push(
                        _this.caseNodeNums[i].addNodeForm
                    );
                }
            }
            this.$alert(typeof _this.addForm.author)
            typeof _this.addForm.author=="number"?1:parseInt(_this.addForm.author=sessionStorage.getItem("userId"))
					  _this.addForm.executor=_this.addForm.author
				  	_this.addForm.reviewer=_this.addForm.author
            Request({
                    url: "/testcase/addTestcase",
                    method: "post",
                    params: {
                        ..._this.addForm,
                        caseLibId: sessionStorage.getItem("caselibId")
                    }
                })
                .then(
                    res => {
                        _this.getCase(1);
                        _this.dialogVisible = !_this.dialogVisible;
                        this.$alert('添加用例成功', '成功', {
                            confirmButtonText: '确定',
                        });
                    },
                    err => {
                        this.$alert('添加用例失败', '失败', {
                            confirmButtonText: '确定',
                        });
                    }
                )
                .catch(err => {
                    this.$alert('添加用例失败', '失败', {
                        confirmButtonText: '确定',
                    });
                });
        },
        //添加流程节点
        showElement(type) {
            var _this = this;
            _this.caseNodeNum++;
            var caseNodeNum = {
                num: _this.caseNodeNum,
                status: true,
                show: true,
                name: "boundGroup" + _this.caseNodeNum,
                display: false,
                addNodeForm: {
                    actioncasecode: "",
                    actioncode: "",
                    autId: _this.autList[0].id,
                    checkpoint: "",
                    datarequest: "",
                    executeMethod: "2",
                    expectresult: "",
                    note: "",
                    prerequisites: "",
                    scriptMode: "1",
                    scriptModeFlag: _this.templateList.length == 0 ?
                        "" : _this.templateList[0].id,
                    steporder: "",
                    testdesign: "",
                    testpoint: "1",
                    teststep: "",
                    transId: _this.transList[0].id

                }
            };
            _this.caseNodeNums.push(caseNodeNum);
            // _this.groupBound(_this.caseNodeNums[_this.caseNodeNum-2].name);
            if (type == 1) {
                _this.caseNodeNums[_this.caseNodeNum - 2].display = true;
            } else {
                _this.caseNodeNums[_this.caseNodeNum - 1].display = true;
            }

        },
        //添加一个流程节点
        insertNode() {
            var _this = this
            Request({
                    url: "/testcase/addFlowNode",
                    method: "post",
                    params: {
                        addTestCaseActionDTO: _this.caseNodeNums[0].addNodeForm,
                        caseLibId: _this.idList[0]
                    }
                })
                .then(
                    res => {
                        _this.getCase(1);
                        _this.dialogVisibleN = !_this.dialogVisibleN;
                        this.$alert('添加节点成功', '成功', {
                            confirmButtonText: '确定',
                        });
                    },
                    err => {
                        this.$alert('添加节点失败', '失败', {
                            confirmButtonText: '确定',
                        });
                    }
                )
                .catch(err => {
                    this.$alert('添加节点失败', '失败', {
                        confirmButtonText: '确定',
                    });
                });
        },
        //删除流程节点
        deleteNode() {
            var _this = this
            Request({
                    url: "/testcase/deleteFlowNode",
                    method: "post",
                    params: {
                        testCaseActionIds: _this.subIdList,
                        caseLibId: _this.hostId
                    }
                })
                .then(
                    res => {
                        _this.getCase(1);
                        this.$alert('删除节点成功', '成功', {
                            confirmButtonText: '确定',
                        });
                    },
                    err => {
                        this.$alert('删除节点失败', '失败', {
                            confirmButtonText: '确定',
                        });
                    }
                )
                .catch(err => {
                    this.$alert('删除节点失败', '失败', {
                        confirmButtonText: '确定',
                    });
                });
        },
        //显示更改用例信息页面
        changeInf() {
            this.dialogVisibleC = !this.dialogVisibleC
        },
        // 执行方式数据处理
        convertExecMe(em) {
            switch (em) {
                case 1:
                    return "手工";
                    break;
                case 2:
                    return "自动化";
                    break;
                case 3:
                    return "配合";
                    break;
                default:
                    return "";
            }
        },
        // 优先级数据处理
        convertPri(em) {
            switch (em) {
                case 1:
                    return "1级";
                    break;
                case 2:
                    return "2级";
                    break;
                case 3:
                    return "3级";
                    break;
                case 4:
                    return "4级";
                    break;
                case 5:
                    return "5级";
                    break;
                case 6:
                    return "6级";
                    break;
                case 7:
                    return "7级";
                    break;
                case 8:
                    return "8级";
                    break;
                case 9:
                    return "9级";
                    break;
                default:
                    return "";
            }
        },
        // 用例类型数据处理
        convertCaseType(em) {
            switch (em) {
                case 1:
                    return "联机";
                    break;
                case 2:
                    return "批量";
                    break;
                case 3:
                    return "接口";
                    break;
                default:
                    return "";
            }
        },
        // 用例性质数据处理
        convertCasePro(em) {
            switch (em) {
                case 1:
                    return "正常值";
                    break;
                case 2:
                    return "错误值";
                    break;
                case 3:
                    return "边界值";
                    break;
                case 4:
                    return "要素级";
                    break;
                case 5:
                    return "流程级";
                    break;
                default:
                    return "";
            }
        },
        //得到用例信息
        getCase(type) {
            if (type === 1) {
                this.currentPage = 1;
            }
            Request({
                    url: "/testcase/pagedBatchQueryTestCase",
                    method: "post",
                    params: this.params
                })
                .then(
                    res => {
                        this.testCaseList = res.testcaseViewRespDTOList;
                        this.totalCount = res.totalCount;
                        this.totalPage = Math.ceil(
                            this.totalCount / this.pageSize
                        );
                        this.pageSize = this.pageSize;
                    },
                    err => {
                        console.log(err);
                    }
                )
                .catch(err => {
                    console.log(err);
                });
        },

        //得到用户
        getUsers() {
            var _this = this;
            Request({
                    url: "/testProjectController/queryAllRelatedUser",
                    method: "post",
                    params: {
                        userId: sessionStorage.getItem("userId"),
                        projectId: sessionStorage.getItem("selectId"),
                    }
                })
                .then(
                    res => {
                        _this.userList = res.userEntityList;
                        _this.addForm.author = res.userEntityList[0].id;
                        _this.addForm.executor = res.userEntityList[0].id;
                        _this.addForm.reviewer = res.userEntityList[0].id;
                    },
                    err => {
                        console.log(err);
                    }
                )
                .catch(err => {
                    console.log(err);
                });
        },
        //得到被测系统
        getAutSystem() {
            var _this = this;
            Request({
                    url: "/aut/queryListAut",
                    method: "post",
                    params: {
                        companyId: JSON.parse(localStorage.getItem("loginInfo")).companyId
                    }
                })
                .then(
                    res => {
                        _this.autList = res.autRespDTOList;
                        _this.addForm.autId = _this.autList[0].id;
                        _this.caseNodeNums[0].addNodeForm.autId =
                            _this.autList[0].id;
                        _this.getTrans(_this.autList[0].id);
                    },
                    err => {
                        console.log(err);
                    }
                )
                .catch(err => {
                    console.log(err);
                });
        },
        //得到功能点
        getTrans(autId) {
            var _this = this;
            Request({
                    url: "/transactController/pagedBatchQueryTransact",
                    method: "post",
                    params: {
                        autId: autId,
                        currentPage: 1,
                        orderColumns: "id",
                        orderType: "asc",
                        pageSize: 100000
                    }
                })
                .then(
                    res => {
                        _this.transList = res.list;
                        _this.addForm.transId = _this.transList[0].id;
                        _this.caseNodeNums[0].addNodeForm.transId =
                            _this.transList[0].id;
                        _this.getTemplate(_this.transList[0].id);
                    },
                    err => {
                        console.log(err);
                    }
                )
                .catch(err => {
                    console.log(err);
                });
        },
        //得到基础脚本
        getTemplate(transId) {
            var _this = this;
            Request({
                    url: "/scriptTemplate/queryTemplateByTransId",
                    method: "post",
                    params: {
                        id: transId
                    }
                })
                .then(
                    res => {
                        _this.templateList = res.scriptTemplateList;
                        if (_this.templateList.length == 0) {
                            _this.addForm.scriptModeFlag = "";
                            _this.caseNodeNums[0].addNodeForm.scriptModeFlag =
                                "";
                        } else {
                            _this.addForm.scriptModeFlag =
                                _this.templateList[0].id;
                            _this.caseNodeNums[0].addNodeForm.scriptModeFlag =
                                _this.templateList[0].id;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                )
                .catch(err => {
                    console.log(err);
                });
        },
        //点击被测系统
        transChange(e) {
            this.getTrans(e);
        },
        //点击功能点
        templateChange(e) {
            this.getTemplate(e);
        },
        //展示添加详情界面
        showVisibleS() {
            this.dialogVisibleS = !this.dialogVisibleS;
            if (this.dialogVisibleS) {
                this.buttonS = true;
            } else {
                this.buttonS = false;
            }
        },
        //展示添加详情界面
        showVisibleM() {
            this.dialogVisibleM = !this.dialogVisibleM;
            if (this.dialogVisibleM) {
                this.buttonM = true;
            } else {
                this.buttonM = false;
            }
        },
        //取消更改用例信息
        noChangeIm() {
            this.dialogVisibleC = !this.dialogVisibleC

        },
        //更改用例信息重置
        toOrigin() {
            this.changeForm = {
                autId: "未选择",
                caseProperty: "未选择",
                caseType: "未选择",
                executeMethod: "未选择",
                executor: "未选择",
                missionId: "未选择",
                priority: "未选择",
                reviewer: "未选择",
                scriptMode: "未选择",
                scriptModeFlag: "未选择",
                transId: "未选择",

            }
        },
        //更改多种用例信息
        changeIm() {
            let data = {}
            this.changeForm.autId == "未选择" ? 1 : data.autId = this.changeForm.autId
            this.changeForm.caseProperty == "未选择" ? 1 : data.caseProperty = this.changeForm.caseProperty
            this.changeForm.caseType == "未选择" ? 1 : data.caseType = this.changeForm.caseType
            this.changeForm.executeMethod == "未选择" ? 1 : data.executeMethod = this.changeForm.executeMethod
            this.changeForm.executor == "未选择" ? 1 : data.executor = this.changeForm.executor
            this.changeForm.missionId == "未选择" ? 1 : data.missionId = this.changeForm.missionId
            this.changeForm.priority == "未选择" ? 1 : data.priority = this.changeForm.priority
            this.changeForm.reviewer == "未选择" ? 1 : data.reviewer = this.changeForm.reviewer
            this.changeForm.scriptMode == "未选择" ? 1 : data.scriptMode = this.changeForm.scriptMode
            this.changeForm.scriptModeFlag == "未选择" ? 1 : data.scriptModeFlag = this.changeForm.scriptModeFlag
            this.changeForm.transId == "未选择" ? 1 : data.transId = this.changeForm.transId
            var _this = this;
            Request({
                    url: "/testcase/batchModifyMultiProperty",
                    method: "post",
                    params: {
                        testcaseIds: _this.selectList,
                        testcaseActionIds: _this.subIdList,
                        propertyValueMap: data,
                    }
                })
                .then(
                    res => {

                        _this.getCase(0)
                        _this.dialogVisibleC = !_this.dialogVisibleC
                        this.$alert('修改用例信息成功', '成功', {
                            confirmButtonText: '确定',
                        });
                    },
                    err => {
                        this.$alert('修改用例信息失败', '失败', {
                            confirmButtonText: '确定',
                        });
                    }
                )
                .catch(err => {
                    this.$alert('修改用例信息失败', '失败', {
                        confirmButtonText: '确定',
                    });
                });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getCase();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getCase();
        },
        uploadCase() {
            this.dialogVisibleI = true;
        },
        changeFile(file) {
            this.fileListM.push(file);
            console.log("怎么办")
        },
        handleRemove(file, fileList) {
            var index = 0
            for (var i = 0; i < fileList.length; i++) {
                if (file.name == fileList[i].name) {
                    index = i
                    break
                }
            }
            this.fileListM.splice(index, 1);
        },
        handlePreview(file) {
            console.log(file);
        },
        // beforeRemove(file, fileList) {
        // 	// return this.$confirm(`确定移除 ${file.name}？`);
        // },
        //实际导入函数
        uploadTemp() {
            let file = this.fileListM[0];
            let param = new FormData();
            var caseLibId = sessionStorage.getItem("caselibId");
            param.append("file", file.raw);
            param.append("caseLibId", caseLibId);
            param.append("uploadUserId", sessionStorage.getItem("userId"));
					  param.append("templateType", 1);
            var _this = this;
            Request({
                    url: "/testcase/batchImportTestcase",
                    method: "post",
                    params: param
                })
                .then(res => {
                    if (res.respCode == "0000") {
                        this.dialogVisibleI = false;
                        _this.getCase();
                        this.$alert("导入成功", "导入情况", {
                            confirmButtonText: "确定",
                            callback: action => {
                                this.$message({
                                    type: "info",
                                    message: `action: ${action}`
                                });
                            }
                        });
                    } else {

                        this.dialogVisibleI = false;
                        this.$alert("导入失败", "导入情况", {
                            confirmButtonText: "确定",
                            callback: action => {
                                this.$message({
                                    type: "info",
                                    message: `action: ${action}`
                                });
                            }
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        outputCase() {
            this.dialogVisibleO = true;
        },
        addNodeShow() {
            if (this.idList.length == 1) {
                this.caseNodeNums = [this.caseNodeNums[0]]
                this.dialogVisibleN = true;
            } else {
                this.$alert('请仅选中一个用例且必须是流程用例', '警告', {
                    confirmButtonText: '确定',

                });
            }

        },
        //下载模板
        downloadTemplate(val) {
            if (val == 0) {
                let url =
                    "http://10.101.167.184:8080/atfcloud2.0a/testcase/batchImport/file/template/simple";
                window.location.href = url;
            } else {
                let url =
                    "http://10.101.167.184:8080/atfcloud2.0a/testcase/getStandardExcelTemporary?companyId=" + JSON.parse(localStorage.getItem('loginInfo')).companyId;
                window.location.href = url;
            }
        },
        //选择一级表格
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.idList = []; //选择流程用例
            this.selectList = []; //选择所有用例
            for (var i = 0; i < this.multipleSelection.length; i++) {
                if (this.multipleSelection[i].caseCompositeType == 2) {
                    this.idList.push(this.multipleSelection[i].id);
                }

            }
            for (var i = 0; i < this.multipleSelection.length; i++) {
                this.selectList.push(this.multipleSelection[i].id)

            }

        },
        //实际导出函数（待寻找原因）
        exportURL() {
            var exportIdList = [];

            this.selectList = this.selectList.toString()
            let qs = require('qs')
            console.log(this.selectList)
            Request({
                    url: "/testcase/exportTestCase",
                    method: "POST",
                    params: qs.stringify({
                        testCaseIdList: this.selectList
                    }),
                    responseType: 'arraybuffer'
                })
                .then(res => {
                    exportExcel(res, '批量用例导出.xls')
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //选择二级表格
        subHandleSelectionChange(val) {
            this.subMultipleSelection = val
            this.subIdList = []
            for (var i = 0; i < this.subMultipleSelection.length; i++) {
                this.subIdList.push(this.subMultipleSelection[i].id);
            }
            this.hostId = this.subMultipleSelection[0].caseId
        },
        //行拖拽流程节点
        rowDrop() {
            const tbody = document.querySelector(".el-table__expanded-cell tbody")
            const _this = this
            // tbody.style.position="relative"
            Sortable.create(tbody, {
                filter: ".el-input__inner", // 不需要拖动的元素
                preventOnFilter: false, //默认true 是否禁用默认绑定的方法
                animation: 180, // 0.18s 动画时间
                delay: 0, // 按住、松开0毫秒后触发效果
                dropOnEmpty: true,
                onEnd({
                    newIndex,
                    oldIndex
                }) {
                    const currRow = _this.subCaseList.splice(oldIndex, 1)[0]
                    _this.subCaseList.splice(newIndex, 0, currRow)
                    _this.subCaseList.push(_this.subCaseList.pop())
                    var subIdList = []
                    for (var i = 0; i < _this.subCaseList.length; i++) {
                        subIdList.push(_this.subCaseList[i].id)
                    }
                    Request({
                            url: "/testcase/changeFlowNodeOrder",
                            method: "post",
                            params: {
                                caseLibId: _this.subCaseList[0].caseId,
                                testCaseActionIds: subIdList
                            }
                        })
                        .then(res => {
                            console.log("拖拽成功")
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
        },
        //展示流程节点
        subShow(row, rowList) {
					this.subCaseList=[]
					if (rowList.length) { // 只展开一行//说明展开了
						this.expands = []
						if (row) {
							this.expands.push(row.id)// 只展开当前行id
						}
						//  this.tablaData(row.eqId)  这里可以调用接口数据渲染
					} else { // 说明收起了
						this.expands = []
					}
            if (row.caseCompositeType != 1) {
                var _this = this;
                Request({
                        url: "/testcase/queryTestcaseActionList",
                        method: "post",
                        params: {
                            id: row.id
                        }
                    })
                    .then(res => {
                    	if(res.testcaseActionViewList){
												_this.subCaseList = res.testcaseActionViewList;
											}else{
												_this.subCaseList=[]
											}
                    },
							err => {
								_this.subCaseList=[]
							})
                    .catch(err => {
											_this.subCaseList=[]
                    });
                clearTimeout(this.timer); //清除延迟执行
                this.timer = setTimeout(() => { //设置延迟执行
                    this.rowDrop()
                }, 1000);
            }

        },

        // 添加行的索引
        tableRowClassName({
            row,
            rowIndex
        }) {
            row.index = rowIndex;
        },
        toUploadRecord() {
            this.$router.push({
                path: "uploadRecord"
            });
        }
    },

};
</script>

<style>
.scrollbar {
    width: calc(100vw);
}

.inline-block {
    display: inline-block;
}

.notShowAddSingle {
    display: none;
}

.showAddSingle {
    display: block;
}

.addTab .el-row {
    padding-bottom: 10px;
}

.addTab .el-form-item {
    margin-bottom: 5px;
}

.addDialog .el-dialog__body {
    padding: 5px 20px
}

.in-file {
    text-align: center;
}

.text {
    padding-right: 10px;
}

.radio {
    padding-left: 75px;
    padding-top: 15px;
}

.el-table__expanded-cell[class*="cell"] {
    padding: 0;
}

/*.el-table__expanded-cell .el-scrollbar__wrap {*/
/*	padding-left: 48px;*/
/*}*/
.el-table__expanded-cell .el-table th,
.el-table__expanded-cell .el-table tr {
    background-color: rgba(64, 158, 255, 0.15);
}

.el-table__expanded-cell .el-table td,
.el-table__expanded-cell .el-table th.is-leaf {
    border-bottom: 1px solid #c0c4cc;
    border-right: 1px solid #c0c4cc;
}

.tabPosition {
    position: relative
}
</style>
