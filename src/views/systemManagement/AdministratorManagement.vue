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
							<el-button slot="append" icon="el-icon-search" @click="getAds(1)"></el-button>
						</el-input>
					</el-col>
				</el-row>
        <el-table
          class="table"
          border
          stripe
					:data="adList"
          highlight-current-row >
          <el-table-column
            label=""
            type="selection">
          </el-table-column>
          <el-table-column
            property="adminName"
            label="管理员账号">
          </el-table-column>
					<el-table-column
						property="reallyname"
						label="管理员姓名">
					</el-table-column>
					<el-table-column
						property="roleName"
						label="角色">
					</el-table-column>
          <el-table-column
						property="companyName"
            label="所处公司">
          </el-table-column>
					<el-table-column
						 align="center"
						 label="状态"
						 min-width="50%">            
						<template slot-scope="scope">              
							<el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
							<el-tag v-else type="warning"> 锁定  </el-tag>            
						</template>          
					</el-table-column>
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
							<!--              <el-button-->
							<!--                type="primary"-->
							<!--                size="small"-->
							<!--                icon="el-icon-delete"-->
							<!--                >删除-->
							<!--              </el-button>-->
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
				<el-form ref="form"  prop="form"  :model="form" :rules="rules" label-width="100px">
					<el-form-item   label="管理员账号" prop="roleName"  >
						<el-input  v-model="form.adminName" :disabled='disabled2'></el-input>
					</el-form-item>
					<el-form-item   label="管理员姓名" prop="remark" >
						<el-input  v-model="form.reallyname" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item   label="公司" prop="companyName"  >
						<el-select
							class="selectWidth"
							v-model="form.companyName"
							:disabled='disabled2'
						>
							<el-option
								v-for="item in companyList"
								:key="item.companyName"
								:label="
																item.companyName
															"
								:value="item.companyName"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item   label="密码" v-show="flag==0"  prop="password" required>
						<el-input :disabled='disabled'  type="password" v-model="form.password" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item   label="确认密码" v-show="flag==0"  prop="checkPassword" required>
						<el-input :disabled='disabled'  type="password" v-model="form.checkPassword" auto-complete="off"></el-input>
					</el-form-item>
<!--					<el-form-item   label="管理员状态" prop="status" >-->
<!--						<el-select   v-model="form.status"  placeholder="请选择用户状态" class="selectWidth" :disabled='disabled'>-->
<!--							<el-option label="正常" value=1></el-option>-->
<!--							<el-option label="锁定" value=0></el-option>-->
<!--						</el-select>-->
<!--					</el-form-item>-->
					<el-form-item >
						<el-button  v-if="flag==0"  type="primary" @click="addAd()">添加</el-button>
						<el-button  v-else-if="flag==1"  type="primary" @click="editAd()">编辑</el-button>
						<el-button  @click="dialogVisible=!dialogVisible">取消</el-button>
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
    name: 'AdministratorManagement',
		mixins: [VueMixins], // 混入
    data() {
			const validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.form.checkPassword !== '') {
						this.$refs.form.validateField('checkPassword');
					}
					callback();
				}
			};
			const validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
      return {
				form:{
					// 管理员账户
					adminName:'',
					// 管理员密码
					password:'',
					checkPassword:'',
					// 管理员姓名
					reallyname:'',
					roleName: '',
					// 状态 正常：1 锁定：0
					status:'1',
					// 公司姓名
					companyName:'',
					// 创建时间
					createTime:'',
					// 创建者id
					creatorId:'',
					// 修改时间
					modifiedTime:'',
					// 修改者id
					modifierId:''
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
						label:'管理员账号',
						value:'adminName'
					},
					{
						label:'管理员姓名',
						value:'reallyname'
					},
					{
						label:'公司',
						value:'companyName'
					}
				],
				selectValue:'adminName', // 搜索选项
				dialogVisible:false,
				modelFlag:0,
				flag:0,
				disabled:false,
				disabled2:false,
				userList:[],
				companyList:'',
				adList:[],
				searchRole:'',
        total: 0,
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 20, 50]
      }
    },
		created(){
    	this.getUsers()
			this.getCompany()
			this.getAds(0)
		},
		computed:{
			//根据modelFlag 展示弹窗的名字
			modelName(){
				var obj ={
					0: '添加系统管理员',
					1: '编辑系统管理员信息',
					2: '查看系统管理员信息',
				}
				return obj[this.modelFlag]
			},
		},
    methods: {
      handleCurrentChange(val) {
				this.currentPage = val
				this.getAds(0)
      },
      handleSizeChange(val) {
				this.pageSize = val
				this.getAds(0)
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
			//得到公司
			getCompany() {
				var _this = this;
				Request({
					url: "/companyController/selectAll",
					method: "post",
					params:{}
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
			show(flag,row){
				if(flag==0){
					this.modelFlag=0
					this.flag=0
					this.disabled=false
					this.disabled2=false
					this.form={
						// 管理员账户
						adminName:'',
						// 管理员密码
						password:'',
						checkPassword:'',
						// 管理员姓名
						reallyname:'',
						// 状态 正常：1 锁定：0
						status:'1',
						// 角色姓名
						roleName:'',
						// 公司姓名
						companyName:'',
						//创建时间
						createTime:'',
						//创建者id
						creatorId:sessionStorage.getItem("userId"),
						//修改时间
						modifiedTime:'',
						//修改者
						modifierId:sessionStorage.getItem("userId"),
					}
				}else if(flag==1){
					this.modelFlag=1
					this.flag=1
					this.form=row

					// if(this.form.status==1){this.form.status="正常"}
					// if(this.form.status==0){this.form.status="锁定"}
					this.disabled=false
					this.disabled2=true
				}else{
					this.modelFlag=2
					this.flag=2
					this.form=row
					// row.status==1||row.status=="1"?this.form.status="正常":this.form.status="锁定"
					this.disabled=true
					this.disabled2=true
				}
				this.dialogVisible=!this.dialogVisible
			},
			//得到管理员
			getAds(flag){
				var _this = this;
				var searchRole=''
				let obj ={
					adminName: '',
					reallyname:'',
					companyName:''
				}
				if(flag==1){
					obj[this.selectValue] = this.searchRole
				}
				Request({
					url: "/adminController/pagedBatchQuery",
					method: "post",
					params: {
						pageSize: _this.pageSize,
						currentPage:_this.currentPage,
						orderColumns: "modified_time",
						orderType: "DESC",
						 ...obj
					}
				})
					.then(
						res => {
							_this.adList = res.list;
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
			//添加管理员
			addAd(){
      	if(this.form.password==this.form.checkPassword){
					this.form.createTime=new Date().valueOf()
					this.form.modifierId=null
					this.form.modifiedTime=this.form.createTime
					this.form.roleName="系统管理员"
					if(this.form.status=="正常"){this.form.status=1}
					Request({
						url: '/adminController/insert',
						method: 'post',
						params: this.form
					}).then((res) => {
						this.dialogVisible = false
						this.$alert('添加系统管理员成功', '成功', {
							confirmButtonText: '确定',
						});
						this.getAds()
						// this.getUsers()
					},(err) => {
						this.dialogVisible = false
						this.$alert('添加系统管理员失败', '失败', {
							confirmButtonText: '确定',
						});
					}).catch((err) => {
						this.$alert('添加系统管理员失败', '失败', {
							confirmButtonText: '确定',
						});
					})
				}else{
					this.$alert('两次密码输入不一致，请重新输入', '失败', {
						confirmButtonText: '确定',
					});
				}
			},
			//编辑管理员
			editAd(){
				this.form.modifierId=sessionStorage.getItem("userId")
				this.form.modifiedTime=new Date().valueOf()
				this.form.roleName="系统管理员"
				if(this.form.status=="正常"){this.form.status=1}
				if(this.form.status=="锁定"){this.form.status=0}
				Request({
					url: '/adminController/updateByPrimaryKey',
					method: 'post',
					params: this.form
				}).then((res) => {
					this.dialogVisible = false
					this.$alert('编辑系统管理员成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getAds()
					// this.getUsers()
				},(err) => {
					this.dialogVisible = false
					this.$alert('编辑系统管理员失败', '失败', {
						confirmButtonText: '确定',
					});
				})
				// }).catch((err) => {
				// 	this.$alert('编辑系统管理员失败', '失败', {
				// 		confirmButtonText: '确定',
				// 	});
				// })
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
