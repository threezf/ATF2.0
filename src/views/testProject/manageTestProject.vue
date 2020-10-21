<template>
	<div class="page-inner">
		<el-container>
			<el-main>
				<el-row>
					<el-col :span="10">
						<el-button
							@click='addButton'
							type="primary"
							size="small"
							icon="el-icon-plus">
							添加
						</el-button>
						<el-button
							@click='toProject'
							type="primary"
							size="small"
							icon="el-icon-back">
							返回
						</el-button>
					</el-col>
				</el-row>
				<el-row style="height:15px"></el-row>
				<el-table
					stripe
					:data="relatedUserList"
					border
					class='table'>
					<el-table-column label="" width="34px" align="center">
						<template slot-scope="scope">
							<el-radio
								v-model="radio"
								:label="scope.row.id"
								@change="handleRadioChange(scope.row)">
							</el-radio>
							<!--调用时使用的是scope.row和scope.$index-->
						</template>
					</el-table-column>
					<el-table-column
						label="用户名"
						property="username">
					</el-table-column>
					<el-table-column
						label="真实姓名"
						property="reallyname"/>
					<el-table-column
						label="电话号"
						property='telephone'/>
					<el-table-column
						label="邮箱"
						property="email"/>
					<el-table-column
						label="修改时间"
						width="160px"
						property='modifiedTime'
						:formatter="transTime"/>
					<el-table-column label="状态" width="80px" align="center" >
						<template slot-scope="scope">
							<el-tag
								v-if="scope.row.status === 1"
								type="primary"
							>正常
							</el-tag>
							<el-tag
								v-else
								type="warning"
							>锁定
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="info"
								@click="deleteRelatedUser(scope.$index, scope.row)">删除</el-button>
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
					title="添加项目关联用户"
					:visible.sync="dialogVisible"
					width="35%">
					<el-row  type="flex" justify="center">
							添加关联用户：
					  <el-select
						v-model="addId"
						style="margin-left: 20px;"
						multiple
						collapse-tags
						placeholder="请选择">
						<el-option
							v-for="item in userList"
							:key="item.id"
							:label="item.reallyname"
							:value="item.id">
						</el-option>
					  </el-select>
					</el-row>
					<el-row type="flex" justify="center" style="margin-top:20px">
						<el-button  type="primary" @click="submitForm">确定</el-button>
						<el-button  type="primary" @click="dialogVisible=!dialogVisible">取消</el-button>
					</el-row>
				</el-dialog>
				</el-main>
		</el-container>
	</div>
</template>
<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	import testCaseManagement from "./testCaseManagement";
	export default {
		mixins: [VueMixins], // 混入
		name:"manageTestProject",
		data() {
			return {
				userList: [],
				addId:[],
				tt: 0, //总条数
				pageSize: 10, //页面大小
				currentPage: 1, //当前页
				totalPage: 1, //总页数
				listnum: 5, //页面大小
				row:{},
				radio:false,
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
		created(){
			this.getUsers()
		},
		mounted() {
		},
		methods: {
			handleRadioChange(val){
				this.row=val
			},
			// 页码大小变化
			handleSizeChange(val) {
				this.pageSize = val
				this.getUsers()
			},
			//当前页码数变化
			handleCurrentChange(val) {
				this.currentPage = val
				this.getUsers()
			},
			// 提交表单进行验证
			submitForm() {
				Request({
					url: '/testProjectController/addProjectUser',
					method: 'post',
					params: {
						projectId:this.$route.query.projectId,
						companyId:JSON.parse(localStorage.getItem("loginInfo")).companyId,
						currentUserId:sessionStorage.getItem("userId"),
						relatedIds:this.addId
					}
				}).then((res) => {
					this.dialogVisible = false
					this.getUsers()
					this.$alert("添加成功")
				}, (err) => {
					this.$alert("添加失败")
				}).catch((err) => {
					this.$alert("添加失败")
				})
			},
			//删除关联用户
			deleteRelatedUser(index,row){
				Request({
					url: '/testProjectController/deleteProjectUser',
					method: 'post',
					params: {
						projectId:this.$route.query.projectId,
						currentUserId:sessionStorage.getItem("userId"),
						relatedId:row.id
					}
				}).then((res) => {
					this.$alert("删除成功")
					this.getUsers()
				}, (err) => {
					this.$alert("删除失败")
				}).catch((err) => {
					this.$alert("删除失败")
				})
			},
			//添加关联用户表单
			addButton() {
				Request({
					url: '/userController/selectAllUsername',
					method: 'post',
					params: {
						companyId:JSON.parse(localStorage.getItem("loginInfo")).companyId
					}
				}).then((res) => {
					var list=res.list
					for(var i=0;i<list.length;i++){
						for(var j=0;j<this.relatedUserList.length;j++){
							if(list[i].id==this.relatedUserList[j].id){
								list.splice(i,1)
							}
						}
					}
					if(list.length==0){
						this.$alert("公司用户已全部关联")
					}else{
						this.userList=list
						this.dialogVisible=!this.dialogVisible
					}
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
      //返回测试项目页面
			toProject(){
				this.$router.push({
					path: "testProject",
					query: {
					}
				});
			},
			//分页查询关联用户
			getUsers() {
				Request({
					url: '/testProjectController/pagedBatchRelatedUser',
					method: 'post',
					params: {
						userId:sessionStorage.getItem("userId"),
						projectId:this.$route.query.projectId,
						pageSize:this.pageSize,
						currentPage:this.currentPage,
						orderType:"asc",
						orderColumns: "id"
					}
				}).then((res) => {
					this.relatedUserList=res.userEntityList,
						this.totalCount=res.totalCount
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>
