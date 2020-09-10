<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-row>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="show(0)">新增</el-button>
          <el-button type="primary" size="small" icon="el-icon-setting">分配权限</el-button>
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
            <el-button slot="append" icon="el-icon-search" @click="getRoles(1)"></el-button>
          </el-input>
					</el-col>
        </el-row>
        <el-table class="table" border stripe highlight-current-row :data="roleList">
          <el-table-column
            label
            type="selection">
          </el-table-column>
          <el-table-column
						property="roleName"
            label="角色名称">
          </el-table-column>
          <el-table-column
						property="remark"
            label="角色标识">
          </el-table-column>
          <el-table-column
						property="descShort"
            label="角色描述">
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
						label="创建时间"
						property="createTime"
						:formatter="transTime"
						/>
					<el-table-column
						label="修改时间"
						property='modifiedTime'
						:formatter="transTime"
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
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </el-footer>
			<el-dialog
				:title="modelName"
				:visible.sync="dialogVisible"
				width="30%">
				<el-form ref="form"  prop="form"  :model="form" label-width="80px">
					<el-form-item   label="角色姓名" prop="roleName" required >
						<el-input  v-model="form.roleName" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item   label="角色标识" prop="remark" required>
						<el-input  v-model="form.remark" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item   label="角色状态" prop="status" required>
						<el-select   v-model="form.status"  placeholder="请选择用户状态" class="selectWidth" :disabled='disabled'>
							<el-option label="正常" value=1></el-option>
							<el-option label="锁定" value=0></el-option>
						</el-select>
					</el-form-item>
					<el-form-item   label="角色描述" prop="descShort" >
						<el-input  v-model="form.descShort" :disabled='disabled'></el-input>
					</el-form-item>
					<el-form-item >
						<el-button  v-if="flag==0"  type="primary" @click="addRole()">添加</el-button>
						<el-button  v-else-if="flag==1"  type="primary" @click="editRole()">编辑</el-button>
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
		name: "RoleManagement",
		mixins: [VueMixins], // 混入
		data() {
			return {
				form:{
					roleName:'',
					remark:'',
					status:'1',
					//角色描述
					descShort:'',
					//创建时间
					createTime:'',
					//创建者id
					creatorId:'',
					//修改时间
					modifiedTime:'',
					//修改者
					modifierId:'',
				},
				selectOptions:[
					{
						label:'角色名',
						value:'roleName'
					},
					{
						label:'标识',
						value:'remark'
					}
				],
				selectValue:'roleName', // 搜索选项
				dialogVisible:false,
				total: 0,
				modelFlag:0,
				flag:0,
				disabled:false,
				userList:[],
				roleList:[],
				searchRole:'',
				currentPage: 1,
				pageSize: 5,
				pageSizes: [5, 10, 20, 50],
			};
		},
		computed:{
			//根据modelFlag 展示弹窗的名字
			modelName(){
				var obj ={
					0: '添加角色',
					1: '编辑角色',
					2: '查看角色',
				}
				return obj[this.modelFlag]
			},
		},
		created(){
			this.getUsers()
			this.getRoles(0)
		},
		methods: {
			// 页码大小变化
			handleSizeChange(val) {
				this.pageSize = val
				this.getRoles(0)
			},
			//当前页码数变化
			handleCurrentChange(val) {
				this.currentPage = val
				this.getRoles(0)
			},
			//得到角色
			getRoles(flag){
				var _this = this;
				var searchRole=''
				let obj ={
					roleName: '',
					remark:''
				}
				if(flag==1){
					obj[this.selectValue] = this.searchRole
				}
				Request({
					url: "/roleController/pagedBatchQueryRole",
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
							_this.roleList = res.list;
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
			//展示添加，查看，编辑页面
			show(flag,row){
				if(flag==0){
					this.modelFlag=0
					this.flag=0
					this.disabled=false
					this.form={
						roleName:'',
						remark:'',
						status:'正常',
						//角色描述
						descShort:'',
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
					this.form.modifierId=sessionStorage.getItem("userId")
					if(this.form.status==1){this.form.status="正常"}
					if(this.form.status==0){this.form.status="锁定"}
					this.disabled=false
				}else{
					this.modelFlag=2
					this.flag=3
					this.form=row
					row.status==1||row.status=="1"?this.form.status="正常":this.form.status="锁定"
					this.disabled=true
				}
				this.dialogVisible=!this.dialogVisible
			},
			//添加角色
			addRole(){
				this.form.createTime=new Date().valueOf()
				this.form.modifierId=null
				this.form.modifiedTime=this.form.createTime
				if(this.form.status=="正常"){this.form.status=1}
				Request({
					url: '/roleController/insert',
					method: 'post',
					params: this.form
				}).then((res) => {
					this.dialogVisible = false
					this.$alert('添加角色成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getRoles()
					// this.getUsers()
				},(err) => {
					this.dialogVisible = false
					this.$alert('添加角色失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('添加角色失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
			editRole(){
				this.form.modifiedTime=new Date().valueOf()
				if(this.form.status=="正常"){this.form.status=1}
				if(this.form.status=="锁定"){this.form.status=0}
				Request({
					url: '/roleController/updateByPrimaryKey',
					method: 'post',
					params: this.form
				}).then((res) => {
					this.dialogVisible = false
					this.$alert('编辑角色成功', '成功', {
						confirmButtonText: '确定',
					});
					this.getRoles()
					// this.getUsers()
				},(err) => {
					this.dialogVisible = false
					this.$alert('编辑角色失败', '失败', {
						confirmButtonText: '确定',
					});
				}).catch((err) => {
					this.$alert('编辑角色失败', '失败', {
						confirmButtonText: '确定',
					});
				})
			},
		},
	};
</script>

<style scoped lang="less">
  .searchRow {
    .el-input {
      width: 300px;
    }
  }
	.selectWidth{
		width:100%;
		height:40px
	}
</style>
