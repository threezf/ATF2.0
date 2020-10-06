<template>
	<div class="page-inner">
		<el-container>
			<el-main>
				<el-row>
					<el-button
						type="primary"
						size="small"
						icon="el-icon-plus"
						@click="show(0)"
					>新增
					</el-button>
				</el-row>
				<el-row class="searchRow">
					<el-col :span="3">
						<el-select v-model="selectValue" placeholder="请选择">
							<el-option
								v-for="item in selectOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="4" style="margin-left: 10px">
						<el-input placeholder="请输入搜索内容" v-model="searchRole" clearable>
							<el-button slot="append" icon="el-icon-search" @click="getProjects(1)"></el-button>
						</el-input>
					</el-col>
				</el-row>
				<el-table
					class="table"
					border
					stripe
					:data="projectList"
					highlight-current-row>
					<el-table-column
						type="selection">
					</el-table-column>
					<el-table-column
						property="projectName"
						label="项目名称">
					</el-table-column>
					<el-table-column
						property="descShort"
						label="项目介绍">
					</el-table-column>
					<el-table-column
						property="companyName"
						label="公司">
					</el-table-column>
<!--					<el-table-column-->
<!--						 align="center"-->
<!--						 label="状态"-->
<!--						 min-width="50%">            -->
<!--						<template slot-scope="scope">              -->
<!--							<el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>-->
<!--							<el-tag v-else type="warning"> 锁定  </el-tag>            -->
<!--						</template>          -->
<!--					</el-table-column>-->
					<el-table-column
						label="起始时间"
						property="startTime"

					/>
					<el-table-column
						label="截止时间"
						property=endTime'

					/>
					<el-table-column
						label="操作" width="250px">
						<template slot-scope="scope">
							<el-button
								size="small"
								@click="show(2,scope.row)"
							>查看
							</el-button>
							<el-button
								type="info"
								size="small"
								@click="show(1,scope.row)"
							>编辑
							</el-button>
							<el-button
								type="primary"
								size="small"
								@click="toPage(scope.row)"
							>管理
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
			<el-footer>
				<el-pagination
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
					:current-page="currentPage"
					:page-size="pageSize"
					:page-sizes="pageSizes"
					:total="total"
					layout="total, sizes, prev, pager, next, jumper">
				</el-pagination>
			</el-footer>
			<el-dialog
				:title="modelName"
				:visible.sync="dialogVisible"
				width="43%">
				<el-form ref="form" prop="form" :model="form" label-width="100px">
					<el-form-item label="项目名称" prop="projectName" >
						<el-input v-model="form.projectName" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item label="项目介绍" prop="descShort">
						<el-input v-model="form.descShort" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item label="使用时间" prop="descShort" required>
						<el-date-picker
							v-model="value"
							:disabled='disabled'
							type="datetimerange"
							:picker-options="pickerOptions"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="公司" prop="companyName">
						<el-input
							v-model="form.companyName"
							:disabled='disabled2'
						>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button v-if="flag==0" type="primary" @click="addProject()">添加</el-button>
						<el-button v-else-if="flag==1" type="primary" @click="editProject()">编辑</el-button>
						<el-button @click="dialogVisible=!dialogVisible">取消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</el-container>
	</div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'

	export default {
		mixins: [VueMixins], // 混入
		name: 'ProjectManagement',
		data() {
			return {
				form: {
					// 项目名称
					projectName: '',
					// 项目介绍
					descShort: '',
					// 所处公司名称
					companyName: '',
					// 状态
					status: '',
					//起始时间
					startTime:'',
					//截止时间
					endTime:'',
					// 创建时间
					createTime: '',
					// 创建者id
					creatorId: '',
					// 修改时间
					modifiedTime: '',
					// 修改者id
					modifierId: ''
				},
				selectOptions:[
					{
						label:'项目名称',
						value:'projectName'
					}
				],
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value: '',
				selectValue: 'projectName', // 搜索选项
				dialogVisible: false,
				modelFlag: 0,
				flag: 0,
				disabled: false,
				disabled2: false,
				companyList: '',
				userList: [],
				projectList: [],
				searchRole: '',
				total: 0,
				currentPage: 1,
				pageSize: 10,
				pageSizes: [5, 10, 20, 50]
			}
		},
		computed: {
			//根据modelFlag 展示弹窗的名字
			modelName() {
				var obj = {
					0: '添加项目',
					1: '编辑项目信息',
					2: '查看项目信息',
				}
				return obj[this.modelFlag]
			},
		},
		created() {
			this.getUsers()
			this.getCompany()
			this.getProjects(0)
		},
		methods: {
			handleCurrentChange(val) {
				this.pageSize = val
				this.getProjects(0)
			},
			handleSizeChange(val) {
				this.currentPage = val
				this.getProjects(0)
			},
			toPage(row){
				this.$router.push({
					path: "projectMemberManagement",
					query: {
						projectId:row.id,
						showOrNot:true
					}
				}); //界面跳转
			},
			//展示添加，查看，编辑页面
			show(flag, row) {
				if (flag == 0) {
					this.modelFlag = 0
					this.flag = 0
					this.disabled = false
					this.disabled2=true
					this.form = {
						// 项目名称
						projectName: '',
						// 项目介绍
						descShort: '',
						// 所处公司名称
						companyName: sessionStorage.getItem("companyName"),
						// 状态
						status: '',
						//起始时间
						startTime:'',
						//截止时间
						endTime:'',
						// 创建时间
						createTime: '',
						// 创建者id
						creatorId: sessionStorage.getItem("userId"),
						// 修改时间
						modifiedTime: '',
						// 修改者id
						modifierId:sessionStorage.getItem("userId")
					}
				} else if (flag == 1) {
					this.modelFlag = 1
					this.flag = 1
					this.form = row
					this.value=[row.startTime,row.endTime]

					this.disabled = false
					this.disabled2 = true
				} else {
					this.modelFlag = 2
					this.flag = 3
					this.form = row
					this.value=[row.startTime,row.endTime]
					this.disabled = true
					this.disabled2 = true
				}
				this.dialogVisible = !this.dialogVisible
			},
			//添加项目组
			addProject() {
				this.form.createTime = new Date().valueOf()
				this.form.modifiedTime = this.form.createTime
				this.form.status = 1
				this.form.startTime=Date.parse(this.value[0])
				this.form.endTime=Date.parse(this.value[1])
				Request({
					url: '/projectController/insert',
					method: 'post',
					params: this.form
				}).then((res) => {
					this.dialogVisible = false
					this.$alert('添加项目组成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getProjects(0)
					// this.getUsers()
				}, (err) => {
					this.dialogVisible = false
					this.$alert('添加项目组失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('添加项目组失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
			//修改项目组
			editProject(){
				this.form.modifiedTime=new Date().valueOf()
				this.form.modifierId = sessionStorage.getItem("userId")
				this.form.startTime=Date.parse(this.value[0])
				this.form.endTime=Date.parse(this.value[1])
				Request({
					url: '/projectController/updateByPrimaryKey',
					method: 'post',
					params: this.form
				}).then((res) => {
					this.dialogVisible = false
					this.$alert('编辑项目组成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getProjects(0)
					// this.getUsers()
				},(err) => {
					this.dialogVisible = false
					this.$alert('编辑项目组失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('编辑项目组失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
			//得到项目组
			getProjects(flag) {
				var _this = this;
				var obj=''
				if(flag=1){
					if(this.searchRole){
						obj=this.searchRole
					}
				}
				Request({
					url: "/projectController/pagedBatchQuery",
					method: "post",
					params: {
						pageSize: _this.pageSize,
						currentPage: _this.currentPage,
						orderColumns: "modified_time",
						orderType: "DESC",
						userId: sessionStorage.getItem("userId"),
						projectName:obj
					}
				})
					.then(
						res => {
							_this.projectList = res.list;
							this.total = res.totalCount
						},
						err => {
							console.log(err);
						}
					)
					.catch(err => {
						console.log(err);
					});
			},
			//得到公司
			getCompany() {
				var _this = this;
				Request({
					url: "/companyController/selectAll",
					method: "post",
					params: {}
				})
					.then(
						res => {
							_this.companyList = res.list;
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
					url: "/userController/selectAllUsername",
					method: "post",
					params: {}
				})
					.then(
						res => {
							_this.userList = res.list;
						},
						err => {
							console.log(err);
						}
					)
					.catch(err => {
						console.log(err);
					});
			},
		},
	}
</script>

<style scoped lang="less">
	.searchRow {
		.el-input {
			width: 300px;
		}
	}
	.selectWidth{
		width:100%
	}
</style>
