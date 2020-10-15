<template>
	<div class="page-inner">
		<el-container>
			<el-main>
				<el-row>
					<el-col :span="5">
						<el-input v-model="searchInput" placeholder="请输入项目编号或名称"></el-input>
					</el-col> 
					<el-col :span="8"  :offset='1'>
						<el-button
							@click='getTestProject(1)'
							icon="el-icon-setting"
							size="small"
							type="primary">
							搜索
						</el-button>
						<el-button
							@click='addProjectButton'
							type="primary"
							size="small"
							icon="el-icon-plus">
							添加
						</el-button>
					</el-col>
				</el-row>
				<el-row style="height:15px"></el-row>
					<el-table
						stripe
						:data="testProjectList"
						border
						class='table'>
<!--						<el-table-column-->
<!--							label=""-->
<!--							property="radio"-->
<!--							width="180"/>-->
						<el-table-column
							label="测试项目编号"
							property="codeLong">
						</el-table-column>
						<el-table-column
							label="测试项目名称"
							property="nameMedium"/>np
						<el-table-column
							label="测试项目描述"
							property='descMedium'/>
						<el-table-column
							label="创建时间"
							property="createTime"
							:formatter="transTime"/>
						<el-table-column
							label="修改时间"
							property='modifiedTime'
							:formatter="transTime"/>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button
									size="mini"
									@click="toCase(scope.row.id,scope.row.caseLibId,scope.row.nameMedium)">进入</el-button>
								<el-button
									size="mini"
									type="info"
									@click="updateProjectButton(scope.$index, scope.row)">修改</el-button>
								<!-- <el-button
									size="mini"
									type="danger"
									@click="">删除</el-button>-->
							</template>
						</el-table-column>
					</el-table>
				<div class="block">
					<el-col :span="10" :offset='4'>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[5, 10, 20, 50]"
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
					width="30%">
					<el-form ref="addForm"  :model="addForm" :rules="rules" label-width="30%">
						<el-form-item   label="测试项目编号" prop="codeLong"  >
							<el-input   v-model="addForm.codeLong" placeholder="选填"></el-input>
						</el-form-item>
						<el-form-item   label="测试项目名称" prop="nameMedium" required >
							<el-input   v-model="addForm.nameMedium"></el-input>
						</el-form-item>
						<el-form-item   label="描述" prop="projectDesc" >
							<el-input   v-model="addForm.descMedium" placeholder="选填"></el-input>
						</el-form-item>
						<el-form-item >
							<el-button    type="primary" @click="submitForm('addForm')">{{buttonName}}</el-button>
							<el-button   @click="resetForm()">重置</el-button>
						</el-form-item>
					</el-form>
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
	import testCaseManagement from "./testCaseManagement";
	export default {
		mixins: [VueMixins], // 混入
		data() {
			return {
				testProjectList: [],
				// apiUrl: '',
				tt: 0, //总条数
				pageSize: 10, //页面大小
				currentPage: 1, //当前页
				totalPage: 1, //总页数
				listnum: 5, //页面大小
                codeLongAndName:'codeLongAndName',
				addForm: {
					codeLong:"",
					nameMedium:"",
					descMedium:""
				},
				rules:{
					nameMedium:[
						{ required: true, message: '请输入项目名称', trigger: 'blur' },
						{ min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
					],
				},
				dialogVisible:false,
				selectedId:-1,
				searchInput:"",
				totalCount:0,
				modelFlag:0,
			}
		},
		computed:{
			params() {
				let obj = {
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					codeLongAndName: "",
					orderColumns: "modified_time",
					orderType: "DESC",

				}
				if(this.searchInput !== ''){
                    obj[this.codeLongAndName] = this.searchInput
				}
				return obj
			},
			//根据modelFlag 展示弹窗的名字
			modelName(){
				var obj ={
					1: '添加测试项目',
					2: '修改测试项目信息'
				}
				return obj[this.modelFlag]
			},
			//用于展示弹窗按钮的文字
			buttonName(){
				var obj ={
					1: '添加',
					2: '确认'
				}
				return obj[this.modelFlag]
			}
		},
		created(){
			this.getTestProject();
		},
		mounted() {
		},
		methods: {
			handleClose(done) {
				if (this.modelFlag == 1) {
					done()
					return true
				}
				this.$refs['addForm'].resetFields()
				done()
				return true
			},
			// 提交表单进行验证
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// 如果是修改则调用 updateProject 方法 否则调用 addProject
						console.log(this.modelFlag)
						if (this.modelFlag === 2) {
							this.updateProject()
						} else {
							this.addProject()
						}
					} else {
						this.$message('信息格式有误，请检查')
						return false;
					}
				});
			},
			// 清空form表单
			resetForm() {
				this.$refs.addForm.resetFields();
			},

			//添加测试项目表单
			addProjectButton() {

				this.modelFlag = 1
				this.dialogVisible = true
			},
			//修改测试项目表单
			updateProjectButton(index, row) {
				this.modelFlag = 2
				this.selectedId = row.id
				const {
					codeLong,
					nameMedium,
					descMedium
				} = row

				this.addForm = {
					codeLong,
					nameMedium,
					descMedium
				}
				this.dialogVisible = true
			},
			// 添加测试项目
			addProject() {
        this.addForm.codeLong=this.addForm.codeLong==""?"测试项目"+new Date().valueOf():this.addForm.codeLong
				this.addForm.descMedium = this.addForm.descMedium==""?"空":this.addForm.descMedium
				Request({
					url: '/testProjectController/addSingleTestProject',
					method: 'post',
					params: this.addForm
				}).then((res) => {
					this.dialogVisible = false
					this.insertTestPlan(res.caseLibId)
					this.getTestProject()
				}, (err) => {
					this.dialogVisible = false
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			insertTestPlan(caseLibId){
				Request({
					url: '/testPlanController/insertTestPlan',
					method: 'post',
					params: {
						caseLibId,
						testPhaseId: 3,
						testRoundId: 11,
						creatorId: sessionStorage.getItem("userId"),
						descMedium: this.addForm.descMedium,
						nameMedium: this.addForm.nameMedium,
					}
				})
			},
			// 修改测试项目
			updateProject() {
				Request({
					url: '/testProjectController/modifySingleTestProject',
					method: 'post',
					params: {
						id: this.selectedId,
						...this.addForm
					}
				}).then((res) => {
					this.dialogVisible = false
					this.getTestProject()
				}, (err) => {
					this.$message(res.respMsg)
					this.dialogVisible = false
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//进入测试项目
			toCase(id,caseLibId,name){
				sessionStorage.setItem("caselibId", caseLibId)    //存储测试项目id到sessionstorage
				sessionStorage.setItem("nameMediumStorage", "("+name+")" )   //把项目名称存入缓存中
				sessionStorage.setItem("selectId",id)
				console.log('toCase',id,caseLibId)
				this.$router.push({path:'testCase'})
			},
			// 页码大小变化
			handleSizeChange(val) {
				this.pageSize = val
				this.getTestProject()
			},
			//当前页码数变化
			handleCurrentChange(val) {
				this.currentPage = val
				this.getTestProject()
			},
			//展示所有测试项目
			getTestProject(type) {
				if (type === 1) {
					this.currentPage = 1
				}
				this.params.userId = sessionStorage.getItem("userId")
				Request({
					url: '/testProjectController/pagedBatchQueryTestProject',
					method: 'post',
					params: this.params
				}).then((res) => {
					this.testProjectList = res.list
					this.totalCount = res.totalCount
					console.log(this.testProjectList)
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>
