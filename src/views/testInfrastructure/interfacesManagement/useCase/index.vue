<template>
	<div class="class-testCase">
		<el-row>
			<el-button class="new-Cases" type="primary" size="middle" @click="newCaseButton">
				<i class="el-icon-plus"></i>添加用例
			</el-button>
			<el-button type="text" class="import-Cases" @click="importCase">
				<i class="el-icon-upload"></i>导入
			</el-button>
		</el-row>
		<table-comp
			:tableHeader = "TableHeader"
			:table-data="tableObj"
			:needPagination="false">
			<template v-slot:resultSlot="scope">
				<el-button :disabled="scope.row.resultFlag===0" type="text" size="small" @click="scanResult(scope.row)">{{scope.row.resultFlag | getResult}}</el-button>
			</template>
			<template v-slot:operationSlot="scoped">
				<el-button type="text" size="small" @click="testCaseButton(scoped.row)">测试</el-button>
				<el-button type="text" size="small" @click="editCaseButton(scoped.row)">编辑</el-button>
				<el-button type="text" size="small" @click="copyCaseButton(scoped.row)">复制</el-button>
				<el-button type="text" size="small" @click="delCaseButton(scoped.row)">删除</el-button>
			</template>
		</table-comp>
		<el-dialog :title="getTitle" :visible.sync="caseVisible" width="60vw" :append-to-body="true">
			<el-form :model="caseData" ref="caseData" label-width="80px" label-position='top'>
				<el-row>
					<el-col :span="24">
						<el-form-item label="用例名称" prop="interfaceGroupId"  class="change-label-calss">
							<el-input v-model="caseData.name" size="small" placeholder="用例名称" style="width:100%">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
						<el-form-item label="URL Path" prop="urlPath" class="change-label-calss">
							<el-select size="small" v-model="caseData.protocol" placeholder="请选择" style="width:12%">
								<el-option
									v-for="item in protocolOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-select size="small" v-model="caseData.method" placeholder="请选择" style="width:12%">
								<el-option
									v-for="item in methodOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-tooltip class="item" effect="dark" content="接口路径，建议将环境信息写到项目环境中" placement="top-start">
								<el-input v-model="caseData.urlPath" size="small" placeholder="接口路径" style="width:74%">
								</el-input>
							</el-tooltip>
						</el-form-item>
				</el-row>
				<el-row class="divider-row">
					<el-divider class="divider-style" direction="vertical"></el-divider>
					<span class="divider-span">请求参数</span>
				</el-row>
				<el-row>
					<TestTabs ref="testTabs" :body="caseData.bodyContent" :header="caseData.header"
										:param="caseData.params" :bodyFormat="caseData.bodyFormat" :authType="caseData.authType"></TestTabs>
				</el-row>
				<el-row class="divider-row">
					<el-divider class="divider-style" direction="vertical"></el-divider>
					<span class="divider-span">断言规则</span>
				</el-row>
				<el-row>
					<CheckResult ref="checkResult" :origin-data="caseData.originData"></CheckResult>
				</el-row>
				<el-row class="buttons_row">
					<el-button type="primary" size="small" @click="submitForm('caseData')">{{buttonName}}</el-button>
					<el-button size="small" @click="cancelButtonClicked">取消</el-button>
				</el-row>
			</el-form>
		</el-dialog>
		<el-dialog title="复制用例" :visible.sync="copyDialog"  width="40vw" :append-to-body="true">
			<el-form :model="copyCaseData" label-position='top'>
				<el-row>
					<el-form-item label="环境名称" prop="interfaceName" class="change-label-calss">
						<el-input v-model="copyCaseData.name" size="small" placeholder="环境名称" style="width:100%">
						</el-input>
					</el-form-item>
				</el-row>
				<el-row class="buttons_row">
					<el-button type="primary" size="small" @click="copyCase">确定</el-button>
					<el-button size="small" @click="cancelButtonClicked">取消</el-button>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {CaseConf} from '@/config/testInfrastructure/testCases/testCaseConf'
import TestTabs from '@/components/interfaceTest/testTabs'
import CheckResult from '../components/checkResult'
let that
export default {
	name: "testCases",
	components:{
		TestTabs,
		CheckResult
	},
	props: {
		protocols: {
			type: Array,
			default: () => []
		},
		methods: {
			type: Array,
			default: () => []
		},
		path: {
			type: String,
			default: ''
		},
		originData: {
			type: Object,
			default: () => {}
		}
	},
	data(){
		return {
			resultData:[
				{
					name:'情況1：正常登录',
					resultFlag:0,
					time:'2021-04-19 21:41:42',
					createUser:'zhx'
				},
				{
					name:'情況2：正常登录',
					resultFlag:1,
					time:'2021-04-19 21:41:42',
					createUser:'zhx'
				},
				{
					name:'情況3：正常登录',
					resultFlag:2,
					time:'2021-04-19 21:41:42',
					createUser:'zhx'
				},
			],
			TableHeader:CaseConf,
			caseVisible:false,
			copyDialog:false,
			modelFlag:1,
			caseData:{
				name: '',
				protocol:0,
				method:0,
				urlPath:"/",
				header: '[]',
				bodyContent: '[]',
				bodyFormat: 0,
				params: '[]',
				authType: 0, // Authorization
				originData: this.originData,
			},
			protocolOptions: [],
			methodOptions: [],
			copyCaseData:{},
			resultsOption:[
				{
					value:0,
					result:'尚无测试结果'
				},
				{
					value:1,
					result:'通过，查看详情'
				},
				{
					value:2,
					result:'未通过，查看详情'
				},
			]
		}
	},
	beforeCreate: function () {
		that = this;
	},
	watch: {
		originData: {
			handler(newVal) {
				this.caseData.protocol = newVal.protocol
				this.caseData.method = newVal.method
			},
			immediate: true
		},
		path: {
			handler(newVal) {
				this.caseData.urlPath = newVal
			},
			immediate: true
		},
		protocols: {
			handler(newVal) {
				if (newVal.length > 0) {
					this.protocolOptions = []
					newVal.forEach(item => {
						this.protocolOptions.push({
							label: item.protocol,
							value: item.value
						})
					})
				}
			},
			immediate: true
		},
		methods: {
			handler(newVal) {
				if (newVal.length > 0) {
					this.caseData.method = newVal[0].value
					this.methodOptions = []
					newVal.forEach(item => {
						this.methodOptions.push({
							label: item.method,
							value: item.value
						})
					})
				}
			},
			immediate: true
		},
	},
	filters: {
		getResult(val) {
			for (let item in that.resultsOption) {
				let option = that.resultsOption[item]
				if (option.value === val) {
					return option.result
				}
			}
		},
	},
	computed: {
		tableObj() {
			return {
				data: this.resultData
			}
		},
		//根据modelFlag 展示弹窗的名字
		getTitle() {
			const obj = {
				1: '新建接口',
				2: '修改接口'
			}
			return obj[this.modelFlag]
		},
		//用于展示弹窗按钮的文字
		buttonName() {
			const obj = {
				1: '添加',
				2: '确认'
			}
			return obj[this.modelFlag]
		},
	},
	methods:{
		// 提交表单进行验证
		submitForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 如果是修改则调用 updateGroup 方法 否则调用 addGroup
					console.log(this.modelFlag)
					if (this.modelFlag === 2) {
						this.updateCase()
					} else {
						this.addCase()
					}
				} else {
					this.$message('信息格式有误，请检查')
					return false;
				}
			});
		},
		newCaseButton(){
			this.modelFlag = 1
			this.caseVisible = true
		},
		importCase(){

		},
		scanResult(){

		},
		testCaseButton(row){

		},
		editCaseButton(row){

		},
		copyCaseButton(row){
			this.copyCaseData = row
			this.copyCaseData.name = '副本-'+row.name
			this.copyDialog = true
		},
		delCaseButton(row){

		},
		updateCase(){

		},
		addCase(){

		},
		copyCase(){

		},
		//取消按钮
		cancelButtonClicked() {
			this.caseVisible = false
			this.copyDialog = false
		},
	}
}
</script>

<style lang="less" scoped>
.class-testCase{
	padding: 10px;
	.new-Cases{
		margin-right: 10px;
		i{
			margin-right: 5px;
			font-weight: bold;
		}
	}
	.import-Cases{
		font-size: 16px;
		i{
			margin-right: 5px;
		}
	}
}
.divider-row {
	background-color:#eef0f0;
	width:100%;
	margin-bottom: 10px;
	.divider-style {
		width: 3px;
		margin: 0;
		background-color: #409EFF;
		height: 30px;
	}
}
.change-label-calss /deep/ .el-form-item__label{
	padding: 0;
	margin-bottom: 0;
	line-height: 30px;
	font-weight: bold;
}
.buttons_row {
	text-align: center;
	margin-bottom: -15px;
	margin-top: 20px;
}
</style>
