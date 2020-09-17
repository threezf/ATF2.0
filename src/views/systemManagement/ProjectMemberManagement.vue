<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-row>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
						v-show="!showOrNot"
						@click="show2(0)"
            >新增项目成员
          </el-button>
					<el-button
						type="primary"
						size="small"
						icon="el-icon-plus"
						v-show="showOrNot"
						@click="show2(1)"
					>新增项目经理
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
							<el-button slot="append" icon="el-icon-search" @click="getMembers(1)"></el-button>
						</el-input>
					</el-col>
				</el-row>
        <el-table
          class="table"
          border
          stripe
					:data="memberList"
          highlight-current-row >
          <el-table-column
            label=""
            type="selection">
          </el-table-column>
          <el-table-column
            property="userEntity.username"
            label="项目成员账号">
          </el-table-column>
					<el-table-column
						property="userEntity.reallyname"
						label="成员姓名">
					</el-table-column>
					<el-table-column
						property="roleString"
						label="成员角色">
					</el-table-column>
					<el-table-column
						property="userEntity.email"
						label="电子邮箱">
					</el-table-column>
          <el-table-column
						property="userEntity.companyName"
            label="所处公司">
          </el-table-column>
					<el-table-column
						property="userEntity.telephone"
						label="电话号">
					</el-table-column>
					<el-table-column
						label="操作" width="200px">
						<template slot-scope="scope">
<!--							<el-button-->
<!--								size="small"-->
<!--								@click="show(2,scope.row)"-->
<!--							>查看-->
<!--							</el-button>-->
							<el-button
								type="info"
								size="small"
								@click="show(1,scope.row)"
							>编辑
							</el-button>
							<el-button
								type="danger"
								size="small"
								@click="deleteMember(scope.row)"
							>删除
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
				:visible.sync="dialogVisibleA"
				width="30%">
				<el-form  label-width="100px" :model="addForm">
					<el-form-item   label="所属企业" prop="companyName"  >
						<el-input  v-model="addForm.companyName" disabled></el-input>
					</el-form-item>
					<el-form-item   label="用户列表"   >
						<el-select
							style="width:100%"
							v-model="addForm.userId"
							placeholder="请选择要添加的成员"
						>
							<el-option
								v-for="item in addForm.compUserList"
								:key="item.reallyname"
								:label="
																item.reallyname
															"
								:value="item.id"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item >
						<el-button   type="primary" v-if="modelFlag==0" @click="addMember()">添加</el-button>
						<el-button   type="primary" v-else @click="addManager()">添加</el-button>
						<el-button  @click="dialogVisibleA=!dialogVisibleA">取消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<el-dialog
				title="编辑成员角色"
				:visible.sync="dialogVisible"
				width="30%">
				<el-row style="margin-left: 15%">
					角色列表
					<el-select
						v-model="role"
						multiple
						style="margin-left: 20px;"
						placeholder="请选择">
						<el-option
							v-for="item in roleList"
							:key="item.roleName"
							:label="item.roleName"
							:value="item.roleName">
						</el-option>
					</el-select>
				</el-row>
				<el-row style="margin-left: 30%;margin-top: 20px">
						<el-button   type="primary" @click="editMember()">编辑</el-button>
						<el-button  @click="dialogVisible=!dialogVisible">取消</el-button>
				</el-row>
			</el-dialog>
    </el-container>
  </div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
  export default {
    name: 'ProjectMemberManagement',
		mixins: [VueMixins], // 混入
    data() {
      return {
				addForm:{
					compUserList:[],
					companyName:sessionStorage.getItem("companyName"),
					userId:'',
					projectId:this.$route.query.projectId?this.$route.query.projectId:1,
					companyId:sessionStorage.getItem("companyId"),
					createTime:'',
					// 创建者id
					creatorId:'',
					// 修改时间
					modifiedTime:'',
					// 修改者id
					modifierId:''
				},
				selectOptions:[
					{
						label:'项目成员账号',
						value:'username'
					},
					{
						label:'项目成员姓名',
						value:'reallyname'
					}
				],
				selectValue:'username', // 搜索选项
				dialogVisible:false,
				dialogVisibleA:false,
				modelFlag:0,
				flag:0,
				disabled:false,
				showOrNot:this.$route.query.showOrNot?this.$route.query.showOrNot:false,
				roleList:[],
				memberList:[],
				searchRole:'',
				row:{},
				role:'',
        total: 0,
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 20, 50]
      }
    },
		created(){
    	this.getUsers()
			this.getRole()
			this.getMembers(0)
		},
		computed:{
			//根据modelFlag 展示弹窗的名字
			modelName(){
				var obj ={
					0: '添加项目成员',
					1: '添加项目经理',
				}
				return obj[this.modelFlag]
			},
		},
    methods: {
      handleCurrentChange(val) {
				this.currentPage = val
				this.getMembers(0)
      },
      handleSizeChange(val) {
				this.pageSize = val
				this.getMembers(0)
      },
			//得到用户
			getUsers() {
				var _this = this;
				Request({
					url: "/userController/selectAllLimitedUsers",
					method: "post",
					params: {
						userId:sessionStorage.getItem("userId"),
						companyName:sessionStorage.getItem("companyName"),
						companyId:sessionStorage.getItem("companyId"),
						projectId:this.$route.query.projectId?this.$route.query.projectId:1,
					}
				})
					.then(
						res => {
							_this.addForm.compUserList = res.list;
						},
						err => {
							console.log(err);
						}
					)
					.catch(err => {
						console.log(err);
					});
			},
			//得到角色
			getRole() {
				var _this = this;
				Request({
					url: "/roleController/selectLimitedRoles",
					method: "post",
					params:{
						userId:sessionStorage.getItem("userId"),
						companyId:sessionStorage.getItem("companyId")
					}
				})
					.then(
						res => {
							_this.roleList = res.list;
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
					this.flag=1
					this.role=row.roleList
				  this.row=row
				  console.log(this.row)
					this.disabled=false
				this.dialogVisible=!this.dialogVisible
			},
			show2(flag){
      	if(flag==0){
      		this.modelflag=0
				}else{
      		this.modelFlag=1
				}
				this.dialogVisibleA=!this.dialogVisibleA
			},
			//得到项目成员
			getMembers(flag){
				var _this = this;
				var searchRole=''
				let obj ={
					username: '',
					reallyname:'',
				}
				if(flag==1){
					obj[this.selectValue] = this.searchRole
				}
				Request({
					url: "/userController/pagedBatchQueryProjectUser",
					method: "post",
					params: {
						pageSize: _this.pageSize,
						currentPage:_this.currentPage,
						orderColumns: "modified_time",
						orderType: "DESC",
						userId:sessionStorage.getItem("userId"),
						 ...obj
					}
				})
					.then(
						res => {
							_this.memberList=res.userList
							for(var i=0;i<res.userList.length;i++){
								_this.memberList[i].roleString=res.userList[i].roleList.join("，")
							}
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
			//删除项目成员
			deleteMember(row){
				Request({
					url: "/projectUserController/deleteByCondition",
					method: "post",
					params:{
						projectId:this.$route.query.projectId?this.$route.query.projectId:1,
						companyId:sessionStorage.getItem("companyId"),
						userId:row.userEntity.id
					}
				})
					.then(
						res => {
							this.$alert('删除项目成员成功', '成功', {
								confirmButtonText: '确定',
							});
							this.getMembers(0)
						},
						err => {
							this.$alert('删除项目成员失败', '失败', {
								confirmButtonText: '确定',
							});
						}
					)
					.catch(err => {
						this.$alert('删除项目成员失败', '失败', {
							confirmButtonText: '确定',
						});
					});
			},
			//添加项目成员
			addMember(){
          this.addForm.createTime=new Date().valueOf()
				  this.addForm.creatorId=sessionStorage.getItem("userId")
					Request({
						url: '/projectUserController/insert',
						method: 'post',
						params: {
              ...this.addForm
						}
					}).then((res) => {
						this.dialogVisibleA = false
						this.$alert('添加项目成员成功', '成功', {
							confirmButtonText: '确定',
						});
						this.getMembers()
						// this.getUsers()
					},(err) => {
						this.dialogVisible = false
						this.$alert('添加项目成员失败', '失败', {
							confirmButtonText: '确定',
						});
					}).catch((err) => {
						this.$alert('添加项目成员失败', '失败', {
							confirmButtonText: '确定',
						});
					})
			},
			//添加项目经理
			addManager(){
				this.addForm.createTime=new Date().valueOf()
				this.addForm.creatorId=sessionStorage.getItem("userId")
				Request({
					url: '/projectUserController/insert',
					method: 'post',
					params: {
						...this.addForm
					}
				}).then((res) => {
					this.dialogVisibleA = false
					this.$alert('添加项目经理成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getMembers()
					// this.getUsers()
				},(err) => {
					this.dialogVisible = false
					this.$alert('添加项目经理失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('添加项目经理失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
			//编辑管理员
			editMember(){
				Request({
					url: '/userRoleController/updateUserRole',
					method: 'post',
					params: {
						userId:this.row.userEntity.id,
						roleList:this.role,
						companyName:sessionStorage.getItem("companyName"),
				  	flag:true,
					 createTime:this.row.userEntity.createTime,
				 	 creatorId:this.row.userEntity.createId,
					 modifiedTime:new Date().valueOf(),
					 modifierId:sessionStorage.getItem("userId")
					}
				}).then((res) => {
					this.dialogVisible = false
					this.$alert('编辑项目成员成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getMembers()
					// this.getUsers()
				},(err) => {
					this.dialogVisible = false
					this.$alert('编辑项目成员失败', '失败', {
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
