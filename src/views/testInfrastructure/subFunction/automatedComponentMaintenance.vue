<template>
	<page>
				<el-form ref="firstForm" class="fistForm" label-width="100%">
					<el-row>
						<el-col :span="10" :offset="1">
							<el-form-item label="被测系统的开发架构" label-width="34%">
								<el-input style="width:78%" size="small" v-model="automated" :disabled="true"
													:placeholder="inheriteArcName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="1">
							<el-form-item label="控件名称" label-width="30%">
								<el-select style="width:100%" v-model="classValue" filterable placeholder="请选择控件" size="small"
													 @change="classSelect($event)">
									<el-option
										v-for="(item) in classList"
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
										:value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8" >
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
							<el-button
								size="small"
								@click="deleteMethod"
								type="danger">
								删除
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="19">
							<el-form-item label="运行时参数" prop="runtimeArgs" label-width="22.5%">
									<el-table
										stripe
										border
										:data="secondForm.runtimeArgs"
										class='table tableEdit'>
										<el-table-column
											label="属性名">
											<template slot-scope="scope" @change="handleEditR1(scope.$index, scope.row)">
												<el-input size="small" v-model="scope.row.name" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column
											label="属性值">
											<template slot-scope="scope" @change="handleEditR2(scope.$index, scope.row)">
												<el-input size="small" v-model="scope.row.value" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column
											width="100">
											<template slot-scope="scope">
												<el-button
													size="small"
													@click="deleteArg(scope.$index)"
													type="danger">
													删除
												</el-button>
											</template>
										</el-table-column>
									</el-table>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-button
								size="small"
								@click="addArg"
								style="margin-left: 20px;margin-top:0">
								添加
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="19">
							<el-form-item label="支持的识别属性" prop="supportedRecognitionPros" label-width="22.5%">
									<el-table
										stripe
										border
										:data="secondForm.supportedRecognitionPros"
										class='table tableEdit'>
										<el-table-column
											label="属性名">
											<template slot-scope="scope" @change="handleEditS1(scope.$index, scope.row)">
												<el-input size="small" v-model="scope.row.name" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column
											label="属性值">
											<template slot-scope="scope" @change="handleEditS2(scope.$index, scope.row)">
												<el-input size="small" v-model="scope.row.value" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column
											width="100">
											<template slot-scope="scope">
												<el-button
													size="small"
													@click="deleteArgS(scope.$index)"
													type="danger">
													删除
												</el-button>
											</template>
										</el-table-column>
									</el-table>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-button
								size="small"
								@click="addArgS"
								style="margin-left: 20px;margin-top:0">
								添加
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="19">
							<el-form-item label="自识别属性" prop="selfRecognitionPros" label-width="22.5%">
									<el-table
										stripe
										border
										:data="secondForm.selfRecognitionPros"
										class='table tableEdit'>
										<el-table-column
											label="属性名">
											<template slot-scope="scope" @change="handleEditE1(scope.$index, scope.row)">
												<el-input size="small" v-model="scope.row.name" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column
											label="属性值">
											<template slot-scope="scope" @change="handleEditE2(scope.$index, scope.row)">
												<el-input size="small" v-model="scope.row.value" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column
											width="100">
											<template slot-scope="scope">
												<el-button
													size="small"
													@click="deleteArgE(scope.$index)"
													type="danger">
													删除
												</el-button>
											</template>
										</el-table-column>
									</el-table>

							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-button
								size="small"
								@click="addArgE"
								style="margin-left: 20px;margin-top:0">
								添加
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="19">
							<el-form-item label="辅助识别属性" prop="assistRecognitionPros" label-width="22.5%">
									<el-table
										stripe
										border
										:data="secondForm.assistRecognitionPros"
										class='table tableEdit'>
										<el-table-column
											label="属性名">
											<template slot-scope="scope" @change="handleEditA1(scope.$index, scope.row)">
												<el-input size="small" v-model="scope.row.name" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column
											label="属性值">
											<template slot-scope="scope" @change="handleEditA2(scope.$index, scope.row)">
												<el-input size="small" v-model="scope.row.value" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column
											width="100">
											<template slot-scope="scope">
												<el-button
													size="small"
													@click="deleteArgA(scope.$index)"
													type="danger">
													删除
												</el-button>
											</template>
										</el-table-column>
									</el-table>

							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-button
								size="small"
								@click="addArgA"
								style="margin-left: 20px;margin-top:0">
								添加
							</el-button>
						</el-col>
					</el-row>
					<el-row type="flex" justify="center">
							<el-button
								@click="storeClass"
								icon="el-icon-setting"
								size="small"
								type="primary">
								保存
							</el-button>
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
							<el-form-item label="参数列表" prop="arguments" label-width="23%">
							<el-col :span="2" :offset="18">
								<el-button
									size="small"
									@click="addArgP"
									style="margin-left: 100px;margin-top:5px">
									添加参数
								</el-button>
							</el-col>
								</el-form-item>
								<el-table
									stripe
									border
									:data="thirdForm.arguments"
									style="margin-left:70px"
									class='table tableEdit'>
									<el-table-column
										label="参数名称">
										<template slot-scope="scope" @change="handleEditP1(scope.$index, scope.row)">
											<el-input size="small" v-model="scope.row.name" placeholder="请输入内容" ></el-input>
										</template>
									</el-table-column>
									<el-table-column
										label="值类型">
										<template slot-scope="scope" @change="handleEditP2(scope.$index, scope.row)">
											<el-input size="small" v-model="scope.row.type" placeholder="请输入内容" ></el-input>
										</template>
									</el-table-column>
									<el-table-column
										label="参数化列">
										<template slot-scope="scope" @change="handleEditP3(scope.$index, scope.row)">
											<el-input size="small" v-model="scope.row.parameterizeColumn" placeholder="请输入内容" ></el-input>
										</template>
									</el-table-column>
									<el-table-column
										label="描述">
										<template slot-scope="scope" @change="handleEditP4(scope.$index, scope.row)">
											<el-input size="small" v-model="scope.row.desc" placeholder="请输入内容" ></el-input>
										</template>
									</el-table-column>
									<el-table-column
										width="80">
										<template slot-scope="scope">
											<el-button
												size="small"
												@click="deleteArgP(scope.$index)"
												type="danger">
												删除
											</el-button>
										</template>
									</el-table-column>
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
								</el-form-item>
								<el-form-item>
									<el-input
										style="margin-left:70px"
										type="textarea"
										v-model="textarea"
										maxlength="1000"
										rows="10"
										show-word-limit>
									</el-input>
								</el-form-item>

							</el-col>
						</el-row>
						<el-row type="flex" justify="center">
								<el-button
									@click="storeMethod"
									icon="el-icon-setting"
									size="small"
									type="primary">
									保存
								</el-button>
						</el-row>
					</el-form>

				</el-drawer>
				<el-dialog :close-on-click-modal="false" 
					title="添加控件"
					:visible.sync="dialogVisibleA"
					width="30%">
					<el-form ref="addClassForm" :model="addClassForm" label-width="30%">
						<el-form-item label="英文名称" prop="name">
							<el-input size="small" v-model="addClassForm.name"></el-input>
						</el-form-item>
						<el-form-item label="中文名称" prop="chsName">
							<el-input size="small" v-model="addClassForm.chsName"></el-input>
						</el-form-item>
						<el-row class="el-button-margin" type="flex" justify="center">
							<el-button size="small" type="primary"  @click="addClass">添加</el-button>
							<el-button size="small" @click="dialogVisibleA=!dialogVisibleA">取消</el-button>
						</el-row>
					</el-form>
				</el-dialog>
				<el-dialog :close-on-click-modal="false" 
					title="添加方法"
					:visible.sync="dialogVisibleB"
					width="30%">
					<el-form :model="addMethodForm" label-width="30%">
						<el-form-item label="名称" prop="name">
							<el-input size="small" v-model="addMethodForm.name"></el-input>
						</el-form-item>
						<el-form-item label="方法描述" prop="descShort">
							<el-input size="small" v-model="addMethodForm.descShort"></el-input>
						</el-form-item>
						<el-form-item label="有无参数" prop="isparameter">
							<el-select
								style="width:100%"
								v-model="
												addMethodForm.isparameter
											"
								size="small"
							>
								<el-option
									v-for="item in parameterList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="等待时间" prop="waittime">
							<el-input size="small" v-model="addMethodForm.waittime"></el-input>
						</el-form-item>
						<el-form-item label="超过时间" prop="timeout">
							<el-input size="small" v-model="addMethodForm.timeout"></el-input>
						</el-form-item>
						<el-form-item label="目标代码" prop="targetCodeContent">
							<el-input style="width:90%" size="small" type="textarea" maxlength="1000" rows="10" v-model="addMethodForm.targetCodeContent"></el-input>
						</el-form-item>
						<el-row></el-row>
						<el-row class="el-button-margin" type="flex" justify="center">
							<el-button size="small" type="primary"  @click="addMethod">添加</el-button>
							<el-button size="small" @click="dialogVisibleD=!dialogVisibleD">取消</el-button>
						</el-row>
					</el-form>
				</el-dialog>
	</page>
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
				addForm: {
					code: '',
					name: '',
					parentArcId: '',
					descShort: '',
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
				parameterList:[{
					value:0,
					label:"无"
				},{
					value:1,
					label:"有"
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
				defaultProps: {
					children: "childNodeList",
					label: "name"
				},
				flag: 1,
			}
		},
		created(){
			this.inheriteArcName=this.$route.query.inheriteArcName
			this.arcId=this.$route.query.arcId
			this.getClass()
		},
		computed:{
			modelName(){
				var obj ={
					1: '添加自动化架构',
					2: '修改自动化架构'
				}
				return obj[this.modelFlag]
			},
			//用于展示弹窗按钮的文字
			buttonName(){
				var obj ={
					1: '添加',
					2: '修改'
				}
				return obj[this.modelFlag]
			}
		},
		methods: {
			//修改或填写新增运行时参数
			handleEditR1(index, row){
				this.secondForm.runtimeArgs[index-1].name=row.name
			},
			handleEditR2(index, row){
				this.secondForm.runtimeArgs[index-1].value=row.value
			},
			//添加运行时参数
			addArg(){
				if(this.secondForm.runtimeArgs){
					this.secondForm.runtimeArgs.push({name: '', value: ''})
				}else{
					this.secondForm.runtimeArgs=[]
					this.secondForm.runtimeArgs.push({name: '', value: ''})
				}

			},
			//删除运行时参数
			deleteArg(index){
				this.secondForm.runtimeArgs.splice(index,1)
			},
			//修改或填写新增支持的识别属性
			handleEditS1(index, row){
				this.secondForm.supportedRecognitionPros[index-1].name=row.name
			},
			handleEditS2(index, row){
				this.secondForm.supportedRecognitionPros[index-1].value=row.value
			},
			//添加支持的识别属性
			addArgS(){
				if(this.secondForm.supportedRecognitionPros){
					this.secondForm.supportedRecognitionPros.push({name: '', value: ''})
				}else{
					this.secondForm.supportedRecognitionPros=[]
					this.secondForm.supportedRecognitionPros.push({name: '', value: ''})
				}

			},
			//删除支持的识别属性
			deleteArgS(index){
				this.secondForm.supportedRecognitionPros.splice(index,1)
			},
			//修改或填写新增自识别属性
			handleEditE1(index, row){
				this.secondForm.selfRecognitionPros[index-1].name=row.name
			},
			handleEditE2(index, row){
				this.secondForm.selfRecognitionPros[index-1].value=row.value
			},
			//添加自识别属性
			addArgE(){
				if(this.secondForm.selfRecognitionPros){
					this.secondForm.selfRecognitionPros.push({name: '', value: ''})
				}else{
					this.secondForm.selfRecognitionPros=[]
					this.secondForm.selfRecognitionPros.push({name: '', value: ''})
				}

			},
			//删除自识别属性
			deleteArgE(index){
				this.secondForm.selfRecognitionPros.splice(index,1)
			},
			//修改或填写新增辅助识别属性
			handleEditA1(index, row){
				this.secondForm.assistRecognitionPros[index-1].name=row.name
			},
			handleEditA2(index, row){
				this.secondForm.assistRecognitionPros[index-1].value=row.value
			},
			//添加辅助识别属性
			addArgA(){
				if(this.secondForm.assistRecognitionPros){
					this.secondForm.assistRecognitionPros.push({name: '', value: ''})
				}else{
					this.secondForm.assistRecognitionPros=[]
					this.secondForm.assistRecognitionPros.push({name: '', value: ''})
				}

			},
			//删除辅助识别属性
			deleteArgA(index){
				this.secondForm.assistRecognitionPros.splice(index,1)
			},
			//修改或填写新增方法中参数
			handleEditP1(index, row){
				this.thirdForm.arguments[index-1].name=row.name
			},
			handleEditP2(index, row){
				this.thirdForm.arguments[index-1].type=row.type
			},
			handleEditP3(index, row){
				this.thirdForm.arguments[index-1].parameterizeColumn=row.parameterizeColumn
			},
			handleEditP4(index, row){
				this.thirdForm.arguments[index-1].desc=row.desc
			},
			//添加方法中参数
			addArgP(){
				if(this.thirdForm.arguments){
					this.thirdForm.arguments.push({name: '', value: ''})
				}else{
					this.thirdForm.arguments=[]
					this.thirdForm.arguments.push({name: '', value: ''})
				}

			},
			//删除方法中参数
			deleteArgP(index){
				this.thirdForm.arguments.splice(index,1)
			},
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
                        ...this.addMethodForm,
                        companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
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
			//实际删除方法函数
			deleteMethod(){
				Request({
					url: '/arcMethod/deleteSingleArcOmMethod',
					method: 'post',
					params: {
                        methodId: this.classId,
                        userId: sessionStorage.getItem('userId')
					}
				}).then((res) => {
					this.$alert('删除控件成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getMethod(this.classId0)
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
                        ...this.addClassForm,
                        companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId,
                        creatorId: sessionStorage.getItem('userId')
					}
				}).then((res) => {
					this.dialogVisibleA=!this.dialogVisibleA
					this.$alert('添加控件成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getClass()
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
                        id:this.secondForm.id,
						userId: sessionStorage.getItem('userId'),
						classId:this.secondForm.id,
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
                        arcId: this.arcId,
                        companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
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
					_this.secondForm.defaultMethod="请选择默认方法"
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
					params: {id: id,  userId: sessionStorage.getItem('userId'),
					    companyId:JSON.parse(localStorage.getItem('loginInfo')).companyId,
						classId:id
					}
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
				console.log(e)
				if(!this.secondForm.runtimeArgs||this.secondForm.runtimeArgs=="[]"){
					this.secondForm.runtimeArgs=[]
				}
				if(!this.secondForm.selfRecognitionPros||this.secondForm.selfRecognitionPros=="[]"){
					this.secondForm.selfRecognitionPros=[]
				}
				if(!this.secondForm.supportedRecognitionPros||this.secondForm.supportedRecognitionPros=="[]"){
					this.secondForm.supportedRecognitionPros=[]
				}
				if(!this.secondForm.assistRecognitionPros||this.secondForm.assistRecognitionPros=="[]"){
					this.secondForm.assistRecognitionPros=[]
				}
				this.setOverrideFlag(e.overideFlag)
				this.setVisibility(e.visibilityFlag)
				this.getMethod(e.id)
			},
			//选择方法
			methodSelect(e) {
				this.thirdForm = e
				this.methodValue = e.name
				this.textarea = e.targetCodeContent
				this.classId=e.id
				console.log(e)
				if(this.methodList[0].arguments[1]!='o'&&typeof this.methodList[0].arguments=='string'){
					this.thirdForm.arguments = JSON.parse(e.arguments)
				}else if(this.methodList[0].arguments[1]=='o'||this.methodList[0].arguments=="[]"){
					this.thirdForm.arguments =[]
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
				var submitForm={}
				for(let item in this.secondForm){
					if(this.secondForm[item]){
						if(item=="runtimeArgs"|| item=="selfRecognitionPros"||item== "supportedRecognitionPros"||item== "assistRecognitionPros"){
							submitForm[item]=JSON.stringify(this.secondForm[item])
						}else{
							submitForm[item]=this.secondForm[item].toString()
						}
					}else{
						submitForm[item]=''
					}
                }
                submitForm.userId = sessionStorage.getItem('userId')
                submitForm.creatorId = sessionStorage.getItem('userId')
                submitForm.companyId = JSON.parse(localStorage.getItem('loginInfo')).companyId
				Request({
					url: '/arcClass/modifySingleArcOmClass',
					method: 'post',
					params: submitForm
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
				var submitForm={}
				for(let key  in this.thirdForm){
					if(this.thirdForm[key]&&key!='arguments'){
						submitForm[key]=this.thirdForm[key].toString()
					}
				}
				if(this.thirdForm.arguments[0]!='[') {
					submitForm.arguments=JSON.stringify(this.thirdForm.arguments)
				}
				Request({
					url: '/arcMethod/modifySingleArcOmMethod',
					method: 'post',
					params: {
						author: "",
                        ...submitForm,
                        userId: sessionStorage.getItem('userId'),
                        creatorId: sessionStorage.getItem('userId'),
                        companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
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
		width: 100%
	}

	.space {
		height: 50px
	}

	.drawer .el-row {
		margin: 10px 0;
	}



</style>
<style>
	.tableEdit .el-input__inner{
		border: 0
	}
	.el-drawer.rtl {
		overflow: scroll;
	}

</style>
