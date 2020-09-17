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
<!--					<el-button-->
<!--						type="primary"-->
<!--						size="small"-->
<!--						icon="el-icon-close"-->
<!--						@click="close()"-->
<!--					>禁用企业-->
<!--					</el-button>-->
<!--					<el-button-->
<!--						type="primary"-->
<!--						size="small"-->
<!--						icon="el-icon-check"-->
<!--						@click="open()"-->
<!--					>启用企业-->
<!--					</el-button>-->
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
							<el-button slot="append" icon="el-icon-search" @click="getEnterprise(1)"></el-button>
						</el-input>
					</el-col>
				</el-row>
        <el-table
          class="table"
          border
          stripe
					:data="enterpriseList"
          highlight-current-row >
					<el-table-column label="" width="35px">
						<template slot-scope="scope">
							<el-radio
								class="radio"
								v-model="radio"
								:label="scope.row.id"
								@change="handleRadioChange(scope.$index,scope.row)">
							</el-radio>
							<!--调用时使用的是scope.row和scope.$index-->
						</template>
					</el-table-column>
          <el-table-column
            property="companyName"
            label="企业名称">
          </el-table-column>
<!--					<el-table-column-->
<!--						 align="center"-->
<!--						 label="状态"-->
<!--						 min-width="50%">             -->
<!--						<template slot-scope="scope">              -->
<!--							<el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>-->
<!--							<el-tag v-else type="warning"> 锁定  </el-tag>            -->
<!--						</template>          -->
<!--					</el-table-column>-->
					<el-table-column
						label="企业描述"
						property="descShort"

					/>
					<el-table-column
						label="创建时间"
						property="createTime"

					/>
					<el-table-column
						label="修改时间"
						property='modifiedTime'

					/>
					<el-table-column
						label="操作" width="200px">
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
				width="30%">
				<el-form ref="form" prop="form" :model="form" :rules="rules" label-width="120px">
					<el-form-item label="公司名称" prop="dept" >
						<el-input v-model="form.companyName" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item label="公司介绍" prop="descShort" >
						<el-input v-model="form.descShort" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item label="管理员名称" prop="username" v-show="flag==0" >
						<el-input v-model="form.username" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item label="管理员真实姓名" prop="reallyname" v-show="flag==0" >
						<el-input v-model="form.reallyname" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item   label="密码" prop="password" v-show="flag==0" required>
						<el-input :disabled='disabled'  type="password" v-model="form.password" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item   label="确认密码" prop="checkPassword" v-show="flag==0" required>
						<el-input :disabled='disabled'  type="password" v-model="form.checkPassword" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button v-if="flag==0" type="primary" @click="addEnterprise()">添加</el-button>
						<el-button v-else-if="flag==1" type="primary" @click="editEnterprise()">编辑</el-button>
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
		name: 'EnterpriseManagement',
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.form.checkPassword !== '') {
						this.$refs.form.validateField('checkPassword');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				form: {
					// 公司介绍
					descShort: '',
					// 公司名称
					companyName: '',
					// 状态
					status: '',
					// 创建时间
					createTime: '',
					// 创建者id
					creatorId: '',
					// 修改时间
					modifiedTime: '',
					// 修改者id
					modifierId: '',
					//密码
					password:'',
					checkPassword:'',
					//管理员名称
					username:'',
					//真实姓名
					reallyname:''
				},
				rules:{
					password: [
						{ validator: validatePass,  message: '请输入密码', trigger: 'blur' }
					],
					checkPassword: [
						{ validator: validatePass2, message: '请再次输入密码', trigger: 'blur' }
					],
				},
				selectOptions:[
					{
						label:'公司名称',
						value:'companyName'
					}
				],
				selectValue: 'companyName', // 搜索选项
				radio: false, // 单选框默认
				dialogVisible: false,
				modelFlag: 0,
				flag: 0,
				selectId:'',
				selectCompany:'',
				disabled: false,
				disabled2: false,
				companyList: '',
				userList: [],
				enterpriseList: [],
				searchRole: '',
				total: 0,
				currentPage: 1,
				pageSize: 5,
				pageSizes: [5, 10, 20, 50]
			}
		},
		computed: {
			//根据modelFlag 展示弹窗的名字
			modelName() {
				var obj = {
					0: '添加公司',
					1: '编辑公司信息',
					2: '查看公司信息',
				}
				return obj[this.modelFlag]
			},
		},
		created() {
			this.getUsers()
			this.getEnterprise(0)
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
			//展示添加，查看，编辑页面
			show(flag, row) {
				if (flag == 0) {
					this.modelFlag = 0
					this.flag = 0
					this.disabled = false
					this.disabled2=true
					this.form = {
						// 项目组名称
						dept: '',
						// 项目组介绍
						descShort: '',
						// 所处公司名称
						companyName: '',
						// 状态
						status: '',
						// 创建时间
						createTime: '',
						// 创建者id
						creatorId: sessionStorage.getItem("userId"),
						// 修改时间
						modifiedTime: '',
						// 修改者id
						modifierId: sessionStorage.getItem("userId"),
						//密码
						password:'',
						checkPassword:'',
						//管理员名称
						username:'',
						//真实姓名
						reallyname:''
					}
				} else if (flag == 1) {
					this.modelFlag = 1
					this.flag = 1
					this.form = row
					this.form.modifierId = sessionStorage.getItem("userId")
					// if (this.form.status == 1) {
					// 	this.form.status = "正常"
					// }
					// if (this.form.status == 0) {
					// 	this.form.status = "锁定"
					// }
					this.disabled = false
					this.disabled2 = true
				} else {
					this.modelFlag = 2
					this.flag = 3
					this.form = row
					// row.status == 1 || row.status == "1" ? this.form.status = "正常" : this.form.status = "锁定"
					this.disabled = true
					this.disabled2 = true
				}
				this.dialogVisible = !this.dialogVisible
			},
			//添加公司
			addEnterprise() {
				this.form.createTime = new Date().valueOf()
				this.form.modifierId = null
				this.form.modifiedTime = this.form.createTime
				this.form.status = 1
				var _this=this
				if(this.form.password==this.form.checkPassword) {
					Request({
						url: '/companyController/insert',
						method: 'post',
						params: _this.form
					}).then((res) => {
						var userId=res.userId
						Request({
							url: '/roleController/insertAllDefaultRole',
							method: 'post',
							params: {
								companyName: _this.form.companyName,
								userId: userId
							}
						}).then((res) => {
							var userId=res.userId
							Request({
								url: '/userRoleController/insert',
								method: 'post',
								params: {
									companyName: _this.form.companyName,
									userId: userId,
									roleList: ["系统管理员"]
								}
							}).then((res) => {
								_this.dialogVisible = false
								_this.$alert('添加公司成功', '成功', {
									confirmButtonText: '确定',
								});
								_this.getEnterprise(0)
							}, (err) => {
								_this.dialogVisible = false
								_this.$alert('添加公司失败', '失败', {
									confirmButtonText: '确定',
								});
							}).catch((err) => {
								_this.$alert('添加公司失败', '失败', {
									confirmButtonText: '确定',
								});
							})
						}, (err) => {
							_this.dialogVisible = false
							_this.$alert('添加公司失败', '失败', {
								confirmButtonText: '确定',
							});
						}).catch((err) => {
							_this.$alert('添加公司失败', '失败', {
								confirmButtonText: '确定',
							});
						})
						// this.getUsers()
					}, (err) => {
						_this.dialogVisible = false
						_this.$alert('添加公司失败', '失败', {
							confirmButtonText: '确定',
						});
					}).catch((err) => {
						_this.$alert('添加公司失败', '失败', {
							confirmButtonText: '确定',
						});
					})
				}else(this.$alert("两次密码输入不一致，请重新填写"))
			},
			//修改企业
			editEnterprise(){
				this.form.modifiedTime=new Date().valueOf()
				this.form.status = 1
				this.form.createTime = new Date().valueOf()
				this.form.creatorId= sessionStorage.getItem("userId")
				Request({
					url: '/companyController/updateByPrimaryKey',
					method: 'post',
					params: this.form
				}).then((res) => {
					this.dialogVisible = false
					this.$alert('编辑公司成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getEnterprise(0)
					// this.getUsers()
				},(err) => {
					this.dialogVisible = false
					this.$alert('编辑公司失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('编辑公司失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
			//得到企业
			getEnterprise(flag) {
				var _this = this;
				var obj=''
				if(flag=1){
					if(this.searchRole){
						obj=this.searchRole
					}
				}
				Request({
					url: "/companyController/pagedBatchQuery",
					method: "post",
					params: {
						pageSize: _this.pageSize,
						currentPage: _this.currentPage,
						orderColumns: "modified_time",
						orderType: "DESC",
						companyName:obj
					}
				})
					.then(
						res => {
							_this.enterpriseList = res.list;
							this.total = res.totalCount
						},
						err => {
							console.log(err);
							_this.$alert("查询结果为空")
						}
					)
					.catch(err => {
						console.log(err);
						_this.$alert("查询结果为空")
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
			//选择表格
			handleRadioChange(index,row){
				this.selectId=row.id
				this.selectCompany=row.companyName
			},
			close(){
				var _this=this
				if (_this.radio === false) {
					_this.$message.warning("请选择一条数据！！");
				} else {
					Request({
						url: '/companyController/disableCompanyStatus',
						method: 'post',
						params: {id:_this.selectId}
					}).then((res) => {
						Request({
							url: '/adminController/disableAdminStatus',
							method: 'post',
							params: {companyName:_this.selectCompany}
						}).then((res) => {
							Request({
								url: '/disableDepartmentStatusByCompany',
								method: 'post',
								params: {companyName:_this.selectCompany}
							}).then((res) => {
								this.$alert('禁用公司成功', '成功', {
									confirmButtonText: '确定',
								});
							},(err) => {
								this.dialogVisible = false
								this.$alert('禁用公司失败', '失败', {
									confirmButtonText: '确定',
								});
							}).catch((err) => {
								this.$alert('禁用公司失败', '失败', {
									confirmButtonText: '确定',
								});
							})
						},(err) => {
							this.$alert('禁用公司失败', '失败', {
								confirmButtonText: '确定',
							});
						}).catch((err) => {
							this.$alert('禁用公司失败', '失败', {
								confirmButtonText: '确定',
							});
						})

					},(err) => {
						this.$alert('禁用公司失败', '失败', {
							confirmButtonText: '确定',
						});
					}).catch((err) => {
						this.$alert('禁用公司失败', '失败', {
							confirmButtonText: '确定',
						});
					})
				}
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
</style>
