<template>
	<div class="page-inner">
		<el-container>
			<el-main>
							<el-form ref="firstForm" class="fistForm" label-width="100%">
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item label="被测系统的开发架构" label-width="50%">
								<el-input size="small" v-model="automated" :disabled="true"
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

				<el-form  :model="secondForm" label-width="100%">
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
								<el-select v-model="secondForm.defaultMethod" class="selectWidth" placeholder="-选择默认方法-"
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
										:value="item.id">
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
								@click="dialogVisibleB=!dialogVisibleB"
								type="primary">
								添加
							</el-button>
							<!--							<el-button-->
							<!--								size="small"-->
							<!--								@click=""-->
							<!--								type="primary">-->
							<!--								删除-->
							<!--							</el-button>-->
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
								@click="storeClass"
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
					:direction="direction">
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
											v-for="item in visibilityListM"
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
								<el-form-item label="参数列表" prop="arguments" label-width="23%"></el-form-item>
								<el-table
									stripe
									border
									:data="thirdForm.arguments"
									style="margin-left:30px"
									class='table'>
									<!--									<el-table-column-->
									<!--										label=""-->
									<!--										property="check"-->
									<!--									/>-->
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
										rows="10"
										show-word-limit>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="2" :offset="10">
								<el-button
									@click="storeMethod"
									icon="el-icon-setting"
									size="small"
									type="primary">
									保存
								</el-button>
							</el-col>
						</el-row>
					</el-form>

				</el-drawer>
				<el-dialog
					title="添加控件"
					:visible.sync="dialogVisibleA"
					width="30%">
					<el-form ref="addClassForm" :model="addClassForm" label-width="30%">
						<el-form-item label="英文名称" prop="name">
							<el-input v-model="addClassForm.name"></el-input>
						</el-form-item>
						<el-form-item label="中文名称" prop="chsName">
							<el-input v-model="addClassForm.chsName"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary"  @click="addClass">添加</el-button>
							<el-button @click="dialogVisibleA=!dialogVisibleA">取消</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
				<el-dialog
					title="添加方法"
					:visible.sync="dialogVisibleB"
					width="30%">
					<el-form :model="addMethodForm" label-width="30%">
						<el-form-item label="名称" prop="name">
							<el-input v-model="addMethodForm.name"></el-input>
						</el-form-item>
						<el-form-item label="方法描述" prop="descShort">
							<el-input v-model="addMethodForm.descShort"></el-input>
						</el-form-item>
						<el-form-item label="有无参数" prop="isparameter">
							<el-select
								v-model="
												addMethodForm.isparameter
											"
								size="small"
							>
								<el-option value="1">有</el-option>
								<el-option value="0">无</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="等待时间" prop="waittime">
							<el-input v-model="addMethodForm.waittime"></el-input>
						</el-form-item>
						<el-form-item label="超过时间" prop="timeout">
							<el-input v-model="addMethodForm.timeout"></el-input>
						</el-form-item>
						<el-form-item label="目标代码" prop="objectcode">
							<el-input type="textarea" maxlength="1000" rows="10" v-model="addMethodForm.objectcode"></el-input>
						</el-form-item>
						<el-row></el-row>
						<el-row></el-row>
						<el-form-item>
							<el-button type="primary"  @click="addMethod">添加</el-button>
							<el-button @click="dialogVisibleD=!dialogVisibleD">取消</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	import {SessionStorage} from "wii-fe-utils";

	export default {
		mixins: [VueMixins], // 混入
		name: "automatedComponentMaintenance",
		data() {
			return {
				addMethodForm: {
					name: '',
					descShort: '',
					overrideFlag: '',
					// classId: that.classId,
					isparameter: '',
					waittime: '',
					timeout: '',
					targetCodeContent: '',
				},
				secondForm: {
					chsName: '',
					defaultMethod: '请选择默认方法',
					descShort: '',
					name: '',
					overideFlag: '',
					visibilityFlag: '',
					method: '',
					runtimeArgs: [],
					selfRecognitionPros:[] ,//[{name: '', value: ''}]
					supportedRecognitionPros: [],
					assistRecognitionPros: [],
					arcId: '',
					id: '',
					modifierId: sessionStorage.getItem('userId'),
				},
				thirdForm: {
					arcId: '',
					argsCount: '',
					arguments: [{name:"YorN",type:"",parameterizeColumn:"{{element}}",desc:""}],
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
				addClassForm:{
					name:'',
					chsName:''
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
					value: 1,
					label: '自身方法'
				}, {
					value: 4,
					label: '禁用'
				}],
				visibilityList: [{
					value: '1',
					label: '公共'
				}, {
					value: '0',
					label: '私有'
				}],
				visibilityListM: [{
					value: 1,
					label: '公共'
				}, {
					value: 0,
					label: '私有'
				}],
				automated: '',
				arcId:'',
				inheriteArcName:'',
				defaultMethod: '',
				methodValue: '',
				overideValue: '',
				overideValueM: '',
				visibilityValue: '',
				visibilityValueM: '',
				dialogVisibleD: false,
				dialogVisibleA:false,
				classId: '',
				classId0:'',
				textarea: '',
				drawer: false,
				addFlag:true,
				direction: 'rtl',
				componentData: [],
				classList: [],
				methodList: [],
				parentList:[],
				checkedData:{},
				modelFlag: 1,
				classValue: '',
				dialogVisible: false,
				dialogVisibleB: false,
				flag: 1,
			}
		},
		created(){
			this.inheriteArcName=this.$route.query.inheriteArcName
			this.arcId=this.$route.query.arcId
			this.getClass()
		},

		methods: {
			//实际添加方法函数
			addMethod(){
				Request({
					url: '/arcMethod/addSingleArcOmMethod',
					method: 'post',
					params:{
						arcId: this.arcId,
						classId: this.classId0,
						creatorId:sessionStorage.getItem("userId"),
						mtype:1,
						...this.addMethodForm
					}
				}).then((res) => {
					this.dialogVisibleB=!this.dialogVisibleB
					this.$alert('添加方法成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getMethod(this.classId0)
				}, (err) => {
					this.$alert('添加方法失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('添加方法失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
			//实际添加控件函数
			addClass(){
				Request({
					url: '/arcClass/addSingleArcOmClass',
					method: 'post',
					params:{
						descShort: '',
						defaultMethod: '',
						arcId: this.arcId,
						supportedRecognitionPros: '',
						runtimeArgs: '',
						selfRecognitionPros: '',
						assistRecognitionPros: '',
						overideFlag: '',
						visibilityFlag: '',
						...this.addClassForm
					}
				}).then((res) => {
					this.dialogVisibleA=!this.dialogVisibleA
					this.$alert('添加控件成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getClass()
					// Request({
					// 	url: '/arcClass/queryArcVisibleOmClasses',
					// 	method: 'post',
					// 	params: {
					// 		id: this.arcId
					// 	}
					// }).then((res) => {
					// 	_this.classList = res.arcClassRespDTOList
					// 	_this.classValue = _this.classList[0].name
					// }, (err) => {
					// 		console.log("失败")
					// 	}).catch((err) => {
					// 	  console.log("失败")
					// })
				}, (err) => {
					this.$alert('添加控件失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('添加控件失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
			//删除控件form
			deleteForm(){
				this.$alert('请问确定删除该控件吗？', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						this.deleteClass()
					}
				});
			},
			//删除控件函数
			deleteClass(){
				Request({
					url: '/arcClass/deleteSingleArcOmClass',
					method: 'post',
					params:{
						id:this.secondForm.id
					}
				}).then((res) => {
					this.$alert('删除控件成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getClass()
				}, (err) => {
					this.$alert('删除控件失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('删除控件失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},

			handleClose1(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {
					});
			},

			//得到控件
			getClass(){
				var _this = this
				Request({
					url: '/arcClass/queryArcVisibleOmClasses',
					method: 'post',
					params: {
						id: this.arcId
					}
				}).then((res) => {
					_this.classList = res.arcClassRespDTOList
					_this.classValue = _this.classList[0].name
					_this.classId0=_this.classList[0].id
					_this.secondForm = _this.classList[0]
					_this.secondForm.runtimeArgs=JSON.parse(_this.classList[0].runtimeArgs)
					_this.secondForm.selfRecognitionPros=JSON.parse(_this.classList[0].selfRecognitionPros)
					_this.secondForm.supportedRecognitionPros=JSON.parse(_this.classList[0].supportedRecognitionPros)
					_this.secondForm.assistRecognitionPros=JSON.parse(_this.classList[0].assistRecognitionPros)
					_this.setOverrideFlag(_this.classList[0].overideFlag)
					_this.setVisibility(_this.classList[0].visibilityFlag)
					_this.getMethod(_this.classList[0].id)

				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//得到方法
			getMethod(id){
				var _this=this
				Request({
					url: '/arcClass/queryArcVisibleOmMethods',
					method: 'post',
					params: {id: id}
				}).then((res) => {
					_this.methodList = res.arcMethodRespDTOList
					_this.methodValue = _this.methodList[0].name
					_this.classId= _this.methodList[0].id
					_this.thirdForm = _this.methodList[0]
					_this.textarea = _this.methodList[0].targetCodeContent
					if(_this.methodList[0].arguments[1]!='o'){
						_this.thirdForm.arguments = JSON.parse(_this.methodList[0].arguments)
					}else{
						_this.thirdForm.arguments =[]
					}
					_this.setOverrideFlagM(_this.methodList[0].overrideFlag)
					_this.setVisibilityM(_this.methodList[0].visibilityFlag)
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//选择控件
			classSelect(e) {
				this.classValue = e.name
				this.classId0=e.id
				this.secondForm=e
				this.secondForm.runtimeArgs=JSON.parse(e.runtimeArgs)
				this.secondForm.selfRecognitionPros=JSON.parse(e.selfRecognitionPros)
				this.secondForm.supportedRecognitionPros=JSON.parse(e.supportedRecognitionPros)
				this.secondForm.assistRecognitionPros=JSON.parse(e.assistRecognitionPros)
				this.setOverrideFlag(e.overideFlag)
				this.setVisibility(e.visibilityFlag)
				this.getMethod(e.id)
			},
			//选择方法
			methodSelect(e) {
				this.thirdForm = e
				this.methodValue = e.name
				this.textarea = e.targetCodeContent
				if(_this.methodList[0].arguments[1]!='o'){
					_this.thirdForm.arguments = JSON.parse(e.arguments)
				}else{
					_this.thirdForm.arguments =[]
				}
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
				if (overrideFlag == 1) {
					this.overideValueM = '自身控件'
				} else if (overrideFlag == 4) {
					this.overideValueM = '禁用'
				}
			},
			//获得方法继承可见性
			setVisibilityM(visibilityFlag) {
				if (visibilityFlag == 1) {
					this.visibilityValueM = '公共'
				} else if (visibilityFlag == 0) {
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
					this.$alert('保存控件信息成功', '成功', {
						confirmButtonText: '确定',
					});
				}, (err) => {
					this.$alert('保存控件信息失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('保存控件信息失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
			//保存方法信息
			storeMethod() {
				for(let key  in this.thirdForm){
					if(this.thirdForm[key]&&key!='arguments'){
						this.thirdForm[key]=this.thirdForm[key].toString()
					}
				}
				if(this.thirdForm.arguments[0]!='[') {
					this.thirdForm.arguments=JSON.stringify(this.thirdForm.arguments)
				}
				Request({
					url: '/arcMethod/modifySingleArcOmMethod',
					method: 'post',
					params: {
						author: "",
						...this.thirdForm,
					}
				}).then((res) => {
					this.drawer = !this.drawer
					this.$alert('保存方法成功', '成功', {
						confirmButtonText: '确定',
					});
				}, (err) => {
					this.$alert('保存方法失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('保存方法失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
		},

	}
</script>

<style>
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
		width: 100%
	}

	.space {
		height: 50px
	}

	.drawer .el-row {
		margin: 10px 0;
	}

	.el-drawer.rtl {
		overflow: scroll;
	}


</style>
