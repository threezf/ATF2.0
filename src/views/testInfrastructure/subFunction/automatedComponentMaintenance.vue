<template>
	<div class="page-inner">
		<el-container>
			<el-main>
				<el-form ref="firstForm" class="fistForm" label-width="100%">
					<el-row>
						<el-col :span="8" :offset="2">						
							<el-form-item label="被测系统的开发架构" label-width="50%">
							<el-input size="small" id="componentInput" v-model="automated" :disabled="true"
									  :placeholder="inheriteArcName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="2">
							<el-form-item label="控件名称" label-width="30%">
								<el-select v-model="classValue" filterable placeholder="请选择控件" size="small"
										   @change="classSelect($event)">
									<el-option
										v-for="(item,index) in classList"
										:key="item.id"
										:label="item.name"
										:value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<!--				<el-row class="classType">控件类型</el-row>-->
				<el-divider content-position="center">控件类型</el-divider>

				<el-form ref="secondForm" :model="secondForm" label-width="100%">
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item label="英文名称" prop="name" label-width="30%">
								<el-input v-model="secondForm.name" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="2">
							<el-form-item label="中文名称" prop="chsName" label-width="30%">
								<el-input v-model="secondForm.chsName" size="small"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item label="描述" prop="descShort" label-width="30%">
								<el-input v-model="secondForm.descShort" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="2">
							<el-form-item label="默认方法" prop="defaultMethod" label-width="30%">
								<el-select v-model="defaultMethod" class="selectWidth" placeholder="-选择默认方法-"
										   size="small">
									<el-option
										v-for="item in methodList"
										:key="item.id"
										:label="item.name"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item label="继承标志" prop="overideFlag" label-width="30%">
								<el-select v-model="overideValue" class="selectWidth" placeholder="-请选择-" size="small">
									<el-option
										v-for="item in overrideFlagList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="2">
							<el-form-item label="继承可见性" prop="visibilityFlag" label-width="30%">
								<el-select v-model="visibilityValue" class="selectWidth" placeholder="-请选择-"
										   size="small">
									<el-option
										v-for="item in visibilityList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item label="展示方法信息" prop="method" label-width="30%">
								<el-select class="selectWidth" v-model="methodValue" @change="methodSelect($event)"
										   size="small">
									<el-option
										v-for="item in methodList"
										:key="item.id"
										:label="item.name"
										:value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="3">
							<el-button
								size="small"
								@click="drawer = true"
								type="primary">
								展示
							</el-button>
							<el-button
								size="small"
								@click=''
								type="primary">
								添加
							</el-button>
							<el-button
								size="small"
								@click=''
								type="primary">
								删除
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="18">
							<el-form-item label="运行时参数" prop="runtimeArgs" label-width="24.5%">
								<el-table
									stripe
									border
									:data="secondForm.runtimeArgs"
									class='table'>
									<el-table-column
										label=""
										property="check"
										width="180"/>
									<el-table-column
										label="属性名"
										property="name"/>
									<el-table-column
										label="属性值"
										property="value"/>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="18">
							<el-form-item label="支持的识别属性" prop="supportedRecognitionPros" label-width="24.5%">
								<el-table
									stripe
									border
									:data="secondForm.supportedRecognitionPros"
									class='table'>
									<el-table-column
										label=""
										property="check"
										width="180"/>
									<el-table-column
										label="属性名"
										property="name"/>
									<el-table-column
										label="属性值"
										property="value"/>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="18">
							<el-form-item label="自识别属性" prop="selfRecognitionPros" label-width="24.5%">
								<el-table
									stripe
									border
									:data="secondForm.selfRecognitionPros"
									class='table'>
									<el-table-column
										label=""
										property="check"
										width="180"/>
									<el-table-column
										label="属性名"
										property="name"/>
									<el-table-column
										label="属性值"
										property="value"/>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="18">
							<el-form-item label="辅助识别属性" prop="assistRecognitionPros" label-width="24.5%">
								<el-table
									stripe
									border
									:data="secondForm.assistRecognitionPros"
									class='table'>
									<el-table-column
										label=""
										property="check"
										width="180"/>
									<el-table-column
										label="属性名"
										property="name"/>
									<el-table-column
										label="属性值"
										property="value"/>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="space"></el-row>
					<el-row>
						<el-col :offset="20">
							<el-button
								@click='storeClass'
								icon="el-icon-setting"
								size="small"
								type="primary">
								保存
							</el-button>
						</el-col>
					</el-row>
				</el-form>
				<el-drawer
					title="方法"
					append-to-body
					size="50%"
					class="drawer"
					:visible.sync="drawer"
					:direction="direction"
					:before-close="handleClose1">
							<el-form ref="thirdForm" :model="thirdForm">
								<el-row>
									<el-col :span="9" :offset="1">
										<el-form-item label="名字" prop="name" label-width="50%">
											<el-input v-model="thirdForm.name" size="small"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="9" :offset="1">
										<el-form-item label="描述" prop="chsName" label-width="50%">
											<el-input v-model="thirdForm.descShort" size="small"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="9" :offset="1">
										<el-form-item label="继承关系" prop="overideFlagM" label-width="50%">
											<el-select v-model="overideValueM" class="selectWidthM" placeholder="-请选择-"
													   size="small">
												<el-option
													v-for="item in overrideFlagListM"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="9" :offset="1">
										<el-form-item label="继承可见性" prop="visibilityM" label-width="50%">
											<el-select v-model="visibilityValueM" class="selectWidthM"
													   placeholder="-选择默认方法-"
													   size="small">
												<el-option
													v-for="item in visibilityList"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="9" :offset="1">
										<el-form-item label="标志参数化列" prop="labelArgument" label-width="50%">
											<el-input v-model="thirdForm.labelArgument" size="small"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="20">
										<el-form-item label="参数列表" prop="arguments" label-width="23%">	</el-form-item>
											<el-table
												stripe
												border
												:data="thirdForm.arguments"
												style="margin-left:30px"
												class='table'>
												<el-table-column
													label=""
													property="check"
													/>
												<el-table-column
													label="参数名称"
													property="name"
													/>
												<el-table-column
													label="值类型"
													property="type"
													/>
												<el-table-column
													label="参数化列"
													property="parameterizeColumn"
													/>
												<el-table-column
													label="描述"
													property="desc"
													/>
											</el-table>
									
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="9" :offset="1">
										<el-form-item label="等待时间" prop="waittime" label-width="50%">
											<el-input v-model="thirdForm.waittime" size="small"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="9" :offset="1">
										<el-form-item label="超过时间" prop="timeout" label-width="50%">
											<el-input v-model="thirdForm.timeout" size="small"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="20">
										<el-form-item label="目标代码" prop="targetCodeContent" label-width="23%">
											<el-input
												type="textarea"
												v-model="textarea"
												maxlength="1000"
												rows="5"
												show-word-limit>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :offset="10">
										<el-button
											@click='storeMethod'
											icon="el-icon-setting"
											size="small"
											type="primary">
											保存
										</el-button>
									</el-col>
								</el-row>
							</el-form>
				
				</el-drawer>
				
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	export default {
		mixins: [VueMixins], // 混入
	    name: "automatedCompnentMaintenance",
		data() {
			return {
				secondForm: {
					chsName: '',
					defaultMethod: '',
					descShort: '',
					name: '',
					overideFlag: '',
					visibilityFlag: '',
					method: '',
					runtimeArgs: [{name: '', value: ''}],
					selfRecognitionPros: [{name: '', value: ''}],
					supportedRecognitionPros: [{name: '', value: ''}],
					assistRecognitionPros: [{name: '', value: ''}],
					arcId: '',
					id: '',
					modifierId: sessionStorage.getItem('userId'),
				},
				thirdForm: {
					arcId: '',
					argsCount: '',
					arguments: [],
					classId: '',
					descShort: '',
					id: '',
					inputArgsDesc: '',
					isparameter: '',
					labelArgument: '',
					mtype: '',
					name: '',
					outputArgsDesc: '',
					overrideFlag: '',
					targetCodeContent: '',
					timeout: '',
					visibilityFlag: '',
					waittime: '',
				},
				overrideFlagList: [{
					value: '1',
					label: '自身控件'
				}, {
					value: '4',
					label: '禁用'
				}, {
					value: '5',
					label: '重定义'
				}],
				overrideFlagListM: [{
					value: '1',
					label: '自身方法'
				}, {
					value: '4',
					label: '禁用'
				}],
				visibilityList: [{
					value: '1',
					label: '公共'
				}, {
					value: '0',
					label: '私有'
				}],
				automated: '',
				defaultMethod: '',
				methodValue: '',
				overideValue: '',
				overideValueM: '',
				visibilityValue: '',
				visibilityValueM: '',
				classId: '',
				textarea: '',
				drawer: false,
				direction: 'rtl',
				componentData: [],
				classList: [],
				methodList: [],
				classValue: '',
				dialogVisible: false,
				defaultProps: {
					children: "childNodeList",
					label: "name"
				},
				automated: "",
				flag: 1,
				inheriteArcName:'',
				inheriteArcId:'',
			}
		},
		created(){
	       this.inheriteArcName=sessionStorage.getItem("inheriteArcName")
		   this.inheriteArcId=sessionStorage.getItem("inheriteArcId")	
		   this.getClassAndMethod()
		},
		methods: {
			
			handleClose1(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {
					});
			},
			
			//展示基本信息
			 getClassAndMethod() {				
					var _this = this
					Request({
						url: '/arcClass/queryArcVisibleOmClasses',
						method: 'post',
						params: {
							id: this.inheriteArcId
						}
					}).then((res) => {
						_this.classList = res.arcClassRespDTOList
						_this.classValue = _this.classList[0].name
						Request({
							url: '/arcClass/queryArcVisibleOmMethods',
							method: 'post',
							params: {id: _this.classList[0].id}
						}).then((res) => {
							_this.methodList = res.arcMethodRespDTOList
							_this.secondForm = _this.classList[0]
							_this.methodValue = _this.methodList[0].name
							_this.classId = _this.methodList[0].id
							_this.setOverrideFlag(_this.classList[0].overideFlag)
							_this.setVisibility(_this.classList[0].visibilityFlag)
							_this.thirdForm = _this.methodList[0]
							_this.textarea = _this.methodList[0].targetCodeContent
							_this.thirdForm.arguments = JSON.parse(_this.methodList[0].arguments)
							_this.setOverrideFlagM(_this.methodList[0].overrideFlag)
							_this.setVisibilityM(_this.methodList[0].visibilityFlag)
						}, (err) => {
							console.log(err)
						}).catch((err) => {
							console.log(err)
						})

					}, (err) => {
						console.log(err)
					}).catch((err) => {
						console.log(err)
					})
				
			},		
		
			//选择控件
			classSelect(e) {
			    this.classValue = e.name
				var _this = this
				Request({
					url: '/arcClass/queryArcVisibleOmMethods',
					method: 'post',
					params: {id: this.inheriteArcId}
				}).then((res) => {
					_this.methodList = res.arcMethodRespDTOList
				    _this.secondForm = e
					_this.methodValue = _this.methodList[0].name
					_this.classId = _this.methodList[0].id
					_this.setOverrideFlag(e.overideFlag)
					_this.setVisibility(e.visibilityFlag)
					_this.thirdForm = _this.methodList[0]
					_this.textarea = _this.methodList[0].targetCodeContent
					_this.thirdForm.arguments = JSON.parse(_this.methodList[0].arguments)
					_this.setOverrideFlagM(_this.methodList[0].overrideFlag)
					_this.setVisibilityM(_this.methodList[0].visibilityFlag)
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//选择方法
			methodSelect(e) {
				this.thirdForm = e
				this.methodValue = e.name
				this.textarea = e.targetCodeContent
				this.thirdForm.arguments = JSON.parse(e.arguments)
				this.setOverrideFlagM(e.overrideFlag)
				this.setVisibilityM(e.visibilityFlag)
			},
			//获得控件继承标志
			setOverrideFlag(overrideFlag) {
				if (overrideFlag == '1') {
					this.overideValue = '自身控件'
				} else if (overrideFlag == '4') {
					this.overideValue = '禁用'
				} else if (overrideFlag == '5') {
					this.overideValue = '重定义'
				}
			},
			//获得控件继承可见性
			setVisibility(visibilityFlag) {
				if (visibilityFlag == '1') {
					this.visibilityValue = '公共'
				} else if (visibilityFlag == '0') {
					this.visibilityValue = '私有'
				}
			},
			//获得方法继承标志
			setOverrideFlagM(overrideFlag) {
				if (overrideFlag == '1') {
					this.overideValueM = '自身控件'
				} else if (overrideFlag == '4') {
					this.overideValueM = '禁用'
				}
			},
			//获得方法继承可见性
			setVisibilityM(visibilityFlag) {
				if (visibilityFlag == '1') {
					this.visibilityValueM = '公共'
				} else if (visibilityFlag == '0') {
					this.visibilityValueM = '私有'
				}
			},
			
			//保存控件信息
			storeClass() {
				Request({
					url: '/arcClass/modifySingleArcOmClass',
					method: 'post',
					params: this.secondForm
				}).then((res) => {

				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//保存方法信息
			storeMethod() {
				Request({
					url: '/arcMethod/modifySingleArcOmMethod',
					method: 'post',
					params: {
						author: "",
						...this.thirdForm
					}
				}).then((res) => {

				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
		},

	}
</script>

<style scoped>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.custom-tree-container {
		margin-bottom: 50px;
	}

	.classType {
		padding: 5px 100px;
		/*color：#606266;*/
	}

	.fistForm {
		margin-bottom: 0;
	}

	.el-form-item {
		margin-bottom: 0;
	}

	.selectWidth {
		width: 100%
	}

	.selectWidthM {
       width:100%
	}

	.space {
		height: 50px
	}

	.drawer .el-row {
		margin: 10px 0;
	}
	.scrollbar {
		height: 1000px;
	}
	.el-drawer{
    overflow: scroll;
    }

</style>
