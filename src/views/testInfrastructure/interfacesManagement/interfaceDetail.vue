<template>
    <div class="project">
        <el-tabs type="border-card" class="tabs-card" v-model="activeTab">
            <el-tab-pane v-for="(tab, index) in interfaceTabs" :key="'tab' + index" :label="tab.label" :name="tab.name">
              <div v-if="activeTab === 'detail'">
                <el-row>
                  <el-col :span="18">
                    <el-tag size="middle"  :type="interfaceData.protocol | getType1">
                        {{interfaceData.protocol | getProtocol}}
                    </el-tag>
                    <el-tag class="method-tag" size="middle"  :type="interfaceData.method | getType2">
                        {{interfaceData.method | getMethod}}
                    </el-tag>
                    <el-tag size="middle"  :type="interfaceData.status | getType3">
                        {{interfaceData.status | getStatus}}
                    </el-tag>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" size="small"  @click.native="editButton">
                        <i class="el-icon-edit-outline"></i>编辑
                    </el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="success"  size="small" @click.native="copyButton">
                        <i class="el-icon-copy-document"></i>复制
                    </el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="danger"  size="small" @click.native="deleteButton">
                        <i class="el-icon-delete"></i>删除
                    </el-button>
                  </el-col>
                </el-row>
                <el-row class="url-style">
                  <el-col :span="12">{{interfaceData.urlPath}}</el-col>
                </el-row>
                <el-row class="name-style">
                  <el-col :span="12">{{interfaceData.interfaceName}}</el-col>
                </el-row>
                <el-row class="remark-style">
                  <el-col :span="4">分组：{{groupName}}</el-col>
                  <el-col :span="4">创建者：{{interfaceData.createUser}}</el-col>
                  <el-col :span="4">更新时间：{{updateTime}}</el-col>
                </el-row>
                <el-divider class="divider-style"></el-divider>
                <div v-if="header.length>0">
                  <el-row class="divider-row">
                      <el-divider class="divider-vertical" direction="vertical"></el-divider>
                      <span class="divider-span">请求头部</span>
                  </el-row>
                  <el-table
                      ref="singleTable"
                      highlight-current-row
											:data="header"
                      border
                      @current-change="handleCurrentChange"
                      style="width: 100%">
                      <el-table-column
                        property="name"
                        label="参数名"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="val"
                        label="参数值"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="desc"
                        label="描述"
                        header-align="center">
                      </el-table-column>
                  </el-table>
                </div>
								<div v-if="body.length>0 || jsonVariable !==''">
									<el-row class="divider-row">
											<el-divider class="divider-vertical" direction="vertical"></el-divider>
											<span class="divider-span">Body请求参数</span>
											<el-tag class="tag-style" type="info" size="small" v-if="interfaceData.bodyFormat === 1" >Raw</el-tag>
											<el-tag class="tag-style" type="info" size="small" v-else>From-data</el-tag>
									</el-row>

									<div v-if="interfaceData.bodyFormat === 1" class="body-content">
											<el-row>
												<span class="span-content">内容类型</span>
												<el-select size="small" style="width:100px" v-model="contentType" placeholder="请选择">
													<el-option
														v-for="item in options"
														:key="item.value"
														:label="item.type"
														:value="item.value">
													</el-option>
												</el-select>
												<el-button type="primary" size="mini"
														v-show="interfaceData.bodyFormat === 1"
														style="margin-left:20px"
														@click="formatData()">整理格式
												</el-button>
											</el-row>
											<div style="border:1px solid rgb(234, 234, 234) ">
													<el-container>
															<editor
																			v-contextmenu:contextmenu
																			style="font-size: 15px"
																			v-model="jsonVariable"
																			@init="editorInit"
																			lang="json"
																			theme="chrome"
																			width="100%"
																			height="100px"
																			:options="{showPrintMargin:false,   //去除编辑器里的竖线
																			}"
															>
															</editor>
													</el-container>
											</div>
									</div>
									<div v-else>
										<el-table
												highlight-current-row
												:data="body"
												border
												@current-change="handleCurrentChange"
												style="width: 100%">
												<el-table-column
													property="name"
													label="参数名"
													header-align="center">
												</el-table-column>
												<el-table-column
													property="type"
													label="参数类型"
													header-align="center">
												</el-table-column>
												<el-table-column
													property="val"
													label="参数值"
													header-align="center">
												</el-table-column>
												<el-table-column
													property="desc"
													label="描述"
													header-align="center">
												</el-table-column>
										</el-table>
									</div>
								</div>
								<div v-if="params.length>0">
									<el-row class="divider-row">
										<el-divider class="divider-vertical" direction="vertical"></el-divider>
										<span class="divider-span">请求参数</span>
									</el-row>
									<el-table
										highlight-current-row
										:data="params"
										border
										@current-change="handleCurrentChange"
										style="width: 100%">
										<el-table-column
											property="name"
											label="参数名"
											header-align="center">
										</el-table-column>
										<el-table-column
											property="val"
											label="参数值"
											header-align="center">
										</el-table-column>
										<el-table-column
											property="desc"
											label="描述"
											header-align="center">
										</el-table-column>
									</el-table>
								</div>
                <div v-if="respHeader.length>0">
                  <el-row class="divider-row">
                      <el-divider class="divider-vertical" direction="vertical"></el-divider>
                      <span class="divider-span">返回头部</span>
                  </el-row>
                  <el-table
                      highlight-current-row
											:data="respHeader"
                      border
                      @current-change="handleCurrentChange"
                      style="width: 100%">
                      <el-table-column
                        property="name"
                        label="参数名"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="val"
                        label="参数值"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="desc"
                        label="描述"
                        header-align="center">
                      </el-table-column>
                  </el-table>
                </div>
								<div v-if="respJsonVariable!=='' || respBody.length>0">
									<el-row class="divider-row">
											<el-divider class="divider-vertical" direction="vertical"></el-divider>
											<span class="divider-span">返回参数</span>
											<el-tag class="tag-style" type="info" size="small" v-if="interfaceData.bodyResponseType === 1">Raw</el-tag>
											<el-tag class="tag-style" type="info" size="small" v-else>From-data</el-tag>
									</el-row>
									<div v-if="interfaceData.bodyResponseType === 1" class="body-content">
											<el-row>
												<span class="span-content">内容类型</span>
												<el-select size="small" style="width:100px" v-model="bodyContentType" placeholder="请选择">
													<el-option
														v-for="item in options"
														:key="item.value"
														:label="item.type"
														:value="item.value">
													</el-option>
												</el-select>
												<el-button type="primary" size="mini"
														v-show="interfaceData.bodyResponseType === 1"
														style="margin-left:20px"
														@click="formatData()">整理格式
												</el-button>
											</el-row>
											<div style="border:1px solid rgb(234, 234, 234) ">
													<el-container>
															<editor
																			v-contextmenu:contextmenu
																			style="font-size: 15px"
																			v-model="respJsonVariable"
																			@init="editorInit"
																			lang="json"
																			theme="chrome"
																			width="100%"
																			height="100px"
																			:options="{showPrintMargin:false,   //去除编辑器里的竖线
																			}"
															>
															</editor>
													</el-container>
											</div>
									</div>
									<div v-else>
										<el-table
												highlight-current-row
												:data="respBody"
												border
												@current-change="handleCurrentChange"
												style="width: 100%">
												<el-table-column
													property="name"
													label="参数名"
													header-align="center">
												</el-table-column>
												<el-table-column
													property="type"
													label="参数类型"
													header-align="center">
												</el-table-column>
												<el-table-column
													property="val"
													label="参数值"
													header-align="center">
												</el-table-column>
												<el-table-column
													property="desc"
													label="描述"
													header-align="center">
												</el-table-column>
										</el-table>
									</div>
								</div>
              </div>
              <InterfaceTest v-if="activeTab === 'test'" :originData="interfaceData" :path="interfaceData.urlPath" :protocals="protocols" :methods="methodOptions"></InterfaceTest>
              <UseCase v-if="activeTab === 'case'"></UseCase>
              <MockAPI v-if="activeTab === 'api'"></MockAPI>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="编辑接口" :visible.sync="dialogVisible" :before-close="handleClose" width="60%">
            <el-form :model="interfaceData" label-width="80px" label-position='top'>
                <el-row>
                  <el-col :span="6">
                      <el-form-item label="开发状态" prop="status" class="change-label-calss">
                        <el-select class="select-status" size="small" v-model="interfaceData.status" filterable placeholder="请选择">
                            <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.status"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                      <el-form-item label="标签" class="change-label-calss">
                            <el-select
                                size="small"
                                class="input-new-tag"
                                v-model="tags"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择或输入标签">
                                <el-option
                                v-for="item in tagOptions"
                                :key="item.value"
                                :label="item.tag"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                      <el-form-item label="URL Path" prop="urlPath" class="change-label-calss">
                        <el-select size="small" v-model="interfaceData.protocol" placeholder="请选择" style="width:12.5%">
                            <el-option
                                v-for="item in protocolOptions"
                                :key="item.value"
                                :label="item.protocol"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select size="small" v-model="interfaceData.method" placeholder="请选择" style="width:12.5%">
                            <el-option
                                v-for="item in methodOptions"
                                :key="item.value"
                                :label="item.method"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-tooltip class="item" effect="dark" content="接口路径，建议将环境信息写到项目环境中" placement="top-start">
                            <el-input v-model="interfaceData.urlPath" size="small" placeholder="接口路径" style="width:74%">
                            </el-input>
                        </el-tooltip>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                      <el-form-item label="分组和接口名称" prop="interfaceGroupId"  class="change-label-calss">
                        <el-cascader size="small" :options="menuList" v-model="interfaceGroup" :show-all-levels="false"
                        :props="defaultProps" style="width:25%">
                        </el-cascader>
                        <el-tooltip class="item" effect="dark" content="接口名称" placement="top-start">
                            <el-input v-model="interfaceData.interfaceName" size="small" placeholder="接口名称" style="width:74%">
                            </el-input>
                        </el-tooltip>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="divider-row">
                    <el-divider class="divider-dialog" direction="vertical"></el-divider>
                    <span class="divider-span">请求参数</span>
                </el-row>
                <el-row>
                  <el-col :span="24">
                        <TestTabs ref="testTabs" :body="interfaceData.bodyContent" :header="interfaceData.header"
                        :param="interfaceData.params" :bodyFormat="interfaceData.bodyFormat" :authType="interfaceData.authType"></TestTabs>
                  </el-col>
                </el-row>
                <el-row class="divider-row">
                    <el-divider class="divider-style" direction="vertical"></el-divider>
                    <span class="divider-span">响应内容</span>
                </el-row>
                <el-row>
                  <el-col :span="24">
                        <ResponseTabs ref="responseTabs" :bodyResopnse="interfaceData.bodyResponse" :headerResopnse="interfaceData.headerResponse"
                          :bodyResopnseType="interfaceData.bodyResponseType" :authType="interfaceData.authType"></ResponseTabs>
                  </el-col>
                </el-row>
                <el-row class="buttons_row">
                    <el-button type="primary" size="small" @click="updateInterface">确定</el-button>
                    <el-button size="small" @click="cancelButtonClicked">取消</el-button>
                </el-row>
            </el-form>
        </el-dialog>
        <el-dialog title="复制接口" :visible.sync="copyDialog" :before-close="handleClose" width="40%">
            <el-form :model="copyInterfaceData" label-width="80px" label-position='top'>
                <el-row>
                  <el-col :span="23">
                      <el-form-item label="目标分组" prop="group" class="change-label-calss">
                        <el-cascader size="small" :options="menuList" v-model="copyInterfaceGroup" :show-all-levels="false"
                        :props="defaultProps" style="width:100%">
                        </el-cascader>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                      <el-form-item label="接口名称" prop="interfaceName" class="change-label-calss">
                        <el-tooltip class="item" effect="dark" content="接口名称" placement="top-start">
                            <el-input v-model="copyInterfaceData.interfaceName" size="small" placeholder="接口名称" style="width:100%">
                            </el-input>
                        </el-tooltip>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                      <el-form-item label="请求方式" class="change-label-calss">
                            <el-select size="small" v-model="copyInterfaceData.method" placeholder="请选择" style="width:100%">
                                <el-option
                                    v-for="item in methodOptions"
                                    :key="item.value"
                                    :label="item.method"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                      <el-form-item label="接口路径" prop="urlPath" class="change-label-calss">
                        <el-tooltip class="item" effect="dark" content="接口路径，建议将环境信息写到项目环境中" placement="top-start">
                            <el-input v-model="copyInterfaceData.urlPath" size="small" placeholder="接口路径" style="width:100%">
                            </el-input>
                        </el-tooltip>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="buttons_row">
                    <el-button type="primary" size="small" @click="copyInterface">确定</el-button>
                    <el-button size="small" @click="cancelButtonClicked">取消</el-button>
                </el-row>
            </el-form>
            </el-dialog>
            <v-contextmenu ref="contextmenu">
                <v-contextmenu-item @click="handleClick">clear</v-contextmenu-item>
            </v-contextmenu>
    </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import TestTabs from '@/components/interfaceTest/testTabs'
import ResponseTabs from '@/components/interfaceTest/responseTabs'
import UseCase from './useCase'
import MockAPI from './mockApi'
import {TimeUtils} from 'wii-fe-utils'
import InterfaceTest from './interfaceDetail/interfaceTest.vue'
let that;
export default {
    mixins: [VueMixins], // 时间格式转化
    name: 'InterfaceDetail',
    components: {
        editor: require('vue2-ace-editor'),
        TestTabs: TestTabs,
        ResponseTabs: ResponseTabs,
        InterfaceTest,
        UseCase,
        MockAPI
    },
    data() {
        return {
            interfaceData: {},
            copyInterfaceData: {},
            updateTime:'',
            jsonVariable: '',
            respJsonVariable: '',
            currentRow: '',
            activeTab: 'detail',
            interfaceTabs: [{
              label: '接口详情',
              name: 'detail'
            }, {
              label: '接口测试',
              name: 'test'
            }, {
              label: '测试用例',
              name: 'case'
            }, {
              label: 'Mock API',
              name: 'api'
            }],
            protocols: [{
                value: 0,
                protocol: 'HTTP'
            }, {
                value: 1,
                protocol: 'HTTPS'
            }],
            methodOptions: [{
                value: 0,
                method: 'POST'
            }, {
                value: 1,
                method: 'GET'
            }, {
                value: 2,
                method: 'DELETE'
            }, {
                value: 3,
                method: 'PUT'
            }],
						statusOptions: [{
							value: 0,
							status: '开发中'
						}, {
							value: 1,
							status: '已完成'
						}, {
							value: 2,
							status: '已废弃'
						}, {
							value: 3,
							status: '测试中'
						}, {
							value: 4,
							status: '异常'
						}, {
							value: 5,
							status: '维护中'
						}],
            tagOptions: [{
                value: 0,
                tag: '可以添加多个标签'
            }, {
                value: 1,
                tag: '测试'
            }],
            protocolOptions: [{
                value: 0,
                protocol: 'HTTP'
            }, {
                value: 1,
                protocol: 'HTTPS'
            }],
            options: [{
              value: 0,
              type: 'JSON'
            }, {
              value: 1,
              type: 'XML'
            }, {
              value: 2,
              type: 'TEXT'
            }, {
              value: 3,
              type: 'HTML'
            }],
						header:[],
						body:[],
						respHeader:[],
						respBody:[],
						params:[],
						bodyContentType: 0,
            contentType: 0,
            menuList: [],
            dialogVisible: false,
            copyDialog: false,
            groupName: '',
            tags: [],
            interfaceGroup:[],
            copyInterfaceGroup:[],
            defaultProps: {
                children: 'childNodeList',
                label: 'groupName',
                value: 'id'
            },

            // 接口测试数据
        }
    },
    created() {
			let interfaceId = sessionStorage.getItem('interfaceId')
			this.getInterfaceDetail(interfaceId)
			let transactId = localStorage.getItem('transactId')
			this.getGroupById(transactId)
    },
    beforeCreate: function () {
        that = this;
    },
    filters: {
        getProtocol(val) {
            for ( let item in that.protocols){
              let option = that.protocols[item]
              if(option.value === val){
                return option.protocol
              }
            }
        },
        getMethod(val) {
            for ( let item in that.methodOptions){
              let option = that.methodOptions[item]
              if(option.value === val){
                return option.method
              }
            }
        },
        getStatus(val) {
            for ( let item in that.statusOptions){
              let option = that.statusOptions[item]
              if(option.value === val){
                return option.status
              }
            }
        },
        getType2(val) {
          return val === 0 ? 'success' : val === 1 ? 'info' :  val === 2 ? 'danger' : 'warning'
        },
        getType1(val) {
          return val === 0 ? 'warning' : 'success'
        },
        getType3(val) {
          return val === 0 ? 'primary' : val === 1 ? 'warning' :  val === 2 ? 'danger' : 'success'
        },
    },
    methods: {
        editorInit() {
            require('brace/ext/language_tools');
            require('brace/mode/json');
            require('brace/theme/chrome');
            require('brace/snippets/json')
        },
        handleClick() {
            this.jsonVariable = ''
        },
        formatData() {
            // 格式化json字符串
            try {
                this.jsonVariable = JSON.parse(this.jsonVariable);
                this.jsonVariable = JSON.stringify(this.jsonVariable, null, 4);
            } catch (err) {
                this.$message({
                    showClose: true,
                    message: 'json格式错误',
                    type: 'warning',
                });
            }
        },
        handleCurrentChange(val) {
          this.currentRow = val;
        },
        handleClose(done) {
            done()
            return true
        },
        editButton(){
            this.dialogVisible = true
        },
        copyButton(){
            this.copyInterfaceData = this.interfaceData
            this.copyInterfaceData.interfaceName = '副本-'+this.interfaceData.interfaceName
						this.copyInterfaceGroup = this.interfaceGroup
            this.copyDialog = true
        },
        deleteButton(){
            this.$confirm('是否确定删除此接口?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            this.delInterface(this.interfaceData.id)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //取消按钮
        cancelButtonClicked() {
            this.dialogVisible = false
            this.copyDialog = false
        },
        getGroupNameById(id){
            console.log(id)
            Request({
                url: '/interfaceNewController/selectInterfaceGroupById',
                method: 'post',
                params: {
                    id: id
                }
            }).then((res) => {
                if(res.respCode === '0000'){
                    this.groupName = res.interfaceGroupSelectDto.groupName
                }else {
                    this.$message.error("获取接口分组名称失败！")
                    console.log(err)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getInterfaceDetail(id){
          Request({
                url: '/interfaceNewController/selectInterfaceById',
                method: 'post',
                params: {
                    id: id
                }
            }).then((res) => {
                if(res.respCode === '0000'){
                    this.interfaceData = res.interfaceSelectDto
										console.log('interfaceData',this.interfaceData)
										this.updateTime = TimeUtils.timestampToTime(res.interfaceSelectDto.updateTime, 'yyyy-MM-dd hh:mm:ss')
										this.getGroupNameById(res.interfaceSelectDto.interfaceGroupId)
										this.interfaceGroup = this.interfaceData.interfaceGroupId
										console.log('interfaceGroup',this.interfaceGroup)
									  if(res.interfaceSelectDto.params === '[]' || res.interfaceSelectDto.params == null){
											this.params=[]
											console.log('params1',this.params)
										}else {
											this.params.push(...JSON.parse(res.interfaceSelectDto.params))
											this.params.splice(this.params.length-1,1)
											console.log('header2',this.params)
										}
										if(res.interfaceSelectDto.bodyFormat ===0) {
											if (res.interfaceSelectDto.bodyContent === '[]' || res.interfaceSelectDto.bodyContent == null) {
												this.body = []
												console.log('body1', this.body)
											} else {
												this.body.push(...JSON.parse(res.interfaceSelectDto.bodyContent))
												this.body.splice(this.body.length-1,1)
												console.log('body2', this.body)
											}
										}

										if(res.interfaceSelectDto.bodyResponseType ===0) {
											if(res.interfaceSelectDto.bodyResponse === '[]' || res.interfaceSelectDto.bodyResponse == null){
												this.respBody=[]
												console.log('respBody1',this.respBody)
											}else {
												this.respBody.push(...JSON.parse(res.interfaceSelectDto.bodyResponse))
												this.respBody.splice(this.respBody.length-1,1)
												console.log('respBody2',this.respBody)
											}
										}
										if (res.interfaceSelectDto.headerResponse === '[]' || res.interfaceSelectDto.headerResponse == null) {
											this.respHeader = []
											console.log('respHeader1', this.respHeader)
										} else {
											this.respHeader.push(...JSON.parse(res.interfaceSelectDto.headerResponse))
											this.respHeader.splice(this.respHeader.length-1,1)
											console.log('respHeader2', this.respHeader)
										}
										if(res.interfaceSelectDto.tags === '[]' || res.interfaceSelectDto.tags == null) {
											this.tags = []
											console.log('tags1',this.tags)
										}else {
											this.tags.push(...JSON.parse(res.interfaceSelectDto.tags))
											console.log('tags2',this.tags)
										}
										console.log('tag',this.tags)
                    if(res.interfaceSelectDto.bodyFormat ===1){
                      this.jsonVariable = res.interfaceSelectDto.bodyContent
											console.log('jsonVariable',this.jsonVariable)
                    }
                    if(res.interfaceSelectDto.bodyResponseType ===1){
                      this.respJsonVariable = res.interfaceSelectDto.bodyResponse
											console.log('respJsonVariable',this.respJsonVariable)
                    }

                    this.$message.success("查询成功！")
                }else {
                    this.$message.error("查询失败！")
                    console.log(res.respMsg)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        updateInterface() {
            this.interfaceData.transactId = localStorage.getItem('transactId')
            this.interfaceData.tags = JSON.stringify(this.tags)
						if(typeof this.interfaceGroup ==="number"){
							this.interfaceData.interfaceGroupId =this.interfaceGroup;
						}else {
							let length = this.interfaceGroup.length
							this.interfaceData.interfaceGroupId = this.interfaceGroup[length-1]
						}
            this.interfaceData.bodyFormat = Number(this.$refs.testTabs.bodyType)
            if(this.interfaceData.bodyFormat === 0){
                this.interfaceData.bodyContent = JSON.stringify(this.$refs.testTabs.bodys)
            }else {
                this.interfaceData.bodyContent = this.$refs.testTabs.jsonVariable
            }
            this.interfaceData.header = JSON.stringify(this.$refs.testTabs.headers)
            this.interfaceData.params = JSON.stringify(this.$refs.testTabs.params)
            this.interfaceData.headerResopnse = JSON.stringify(this.$refs.responseTabs.respheaders)
            this.interfaceData.bodyResopnseType = Number(this.$refs.responseTabs.respType)
            if(this.interfaceData.bodyResopnseType === 0){
                this.interfaceData.bodyResopnse = JSON.stringify(this.$refs.responseTabs.results)
            }else {
                this.interfaceData.bodyResopnse = this.$refs.responseTabs.respJsonVariable
            }
            this.interfaceData.authType = this.$refs.testTabs.selectedAuthType
            this.interfaceData.updateUser = sessionStorage.getItem("username")
          Request({
                  url: '/interfaceNewController/updateSingleInterface',
                  method: 'post',
                  params: this.interfaceData
              }).then((res) => {
                  this.$message.success('更新成功')
									this.dialogVisible = false
                  this.getInterfaceDetail(this.interfaceData.id)
              }, (err) => {
                  this.$message.error(res.respMsg)
									this.dialogVisible = false
                  console.log(err)
              }).catch((err) => {
                  console.log(err)
              })
        },
        copyInterface() {
          this.interfaceData.transactId = localStorage.getItem('transactId')
					if(typeof this.copyInterfaceGroup ==="number"){
						this.copyInterfaceData.interfaceGroupId =this.interfaceGroup;
					}else {
						let length = this.copyInterfaceGroup.length
						this.copyInterfaceData.interfaceGroupId = this.copyInterfaceGroup[length-1]
					}
          Request({
                  url: '/interfaceNewController/addNewInterface',
                  method: 'post',
                  params: this.copyInterfaceData
              }).then((res) => {
                  this.$message.success('复制成功')
                  this.$confirm('是否进入此接口详情界面?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                  }).then(() => {
                    this.$router.back(); //返回上一界面
                  })
              }, (err) => {
                  this.$message.error(res.respMsg)
                  console.log(err)
              }).catch((err) => {
                  console.log(err)
              })
        },
        delInterface(id){
          Request({
                  url: '/interfaceNewController/deleteInterface',
                  method: 'post',
                  params: {
                      id :id
                  }
              }).then((res) => {
              		if(res.respCode === '0000'){
										this.$message.success('删除成功')
										this.$router.back(); //返回上一界面
									}else {
										this.$message.error('删除失败')
										console.log(res.respMsg)
									}
              }).catch((err) => {
                  console.log(err)
              })
        },
				getGroupById(id){
					console.log(id)
					Request({
						url: '/interfaceNewController/selectAllInterfaceGroup',
						method: 'post',
						params: {
							transactId: id
						}
					}).then((res) => {
						if(res.respCode === '0000'){
							this.menuList = []
							var treeData = res.interfaceGroupDtoList
							for (var i = 0; i < treeData.length; i++) {
								if (treeData[i].level === 0) {
									this.menuList.push(treeData[i])
								}
							}
							this.$message.success("查询成功！")
						}else {
							this.$message.error("获取接口分组失败！")
							console.log(res.respMsg)
						}
					}).catch((err) => {
						console.log(err)
					})
				},
    }
}
</script>
<style lang="less" scoped>
.project {
    padding: 10px;

}
.tabs-card {
    min-height: calc(100vh - 90px);
}
.method-tag {
  margin: 0 20px;
}
.url-style{
    font-size: 18px;
    margin: 10px 0;
}
.name-style {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
.remark-style {
    font-size: 13px;
}
.divider-style {
    margin-top:5px;
    height: 2px;
}
.divider-row {
    background-color:#eef0f0;
    width:100%;
    margin-bottom: 10px;
    margin-top: 20px;
    padding: 0 !important;
    font-size: 18px;
    font-weight: bold;
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
}
.divider-vertical {
    width: 3px;
    margin: 0 10px 0 0;
    background-color: #409EFF;
    height: 40px;
}
.tag-style {
  background-color: black;
  color: white;
  margin-left: 5px;
}
.body-content {
  border: 1px solid #E7E7E7;
}
.span-content {
  margin: 0 10px;
  font-size: 15px;
}
.buttons_row {
    text-align: center;
    margin-bottom: -15px;
    margin-top: 20px;
}
.change-label-calss /deep/ .el-form-item__label{
    padding: 0;
    margin-bottom: 0;
    line-height: 30px;
    font-weight: bold;
}
.input-new-tag {
    width: 99%;
}
.select-status {
    width: 99%;
}
.divider-dialog {
    width: 3px;
    margin: 0;
    background-color: #409EFF;
    height: 30px;
}
.divider-span {
    font-size: 15px;
    margin-left: 10px;
}
</style>
