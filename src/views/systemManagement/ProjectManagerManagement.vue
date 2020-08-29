<template>
	<div class="page-inner">
		<el-container>
			<el-main>
				<el-row>
					<el-button
							type="primary"
							size="small"
							icon="el-icon-plus"
							@click="doAdd('ruleForm')">
						新增
					</el-button>
				</el-row>
				<el-row>
					<el-select
						v-model="searchItem"
						@change="handleSelectChange">
						<el-option
							label="项目经理名称"
							key="managerName"
							value="managerName">
						</el-option>
						<el-option
							label="项目组名称"
							key="depName"
							value="depName">
						</el-option>
					</el-select>
					<el-input
						class="searchInput"
						:placeholder="inputTips"
						v-model="searchData"
						clearable>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="doSearch">
						</el-button>
					</el-input>
				</el-row>
				<el-table
					class="table"
					border
					highlight-current-row
					stripe
					:data="tableData">
					<el-table-column
						label="序号"
						type="index"
						width="50px">
					</el-table-column>
					<el-table-column
						prop="managerName"
						label="名称"
						min-width="10%">
					</el-table-column>
					<el-table-column
						label="邮箱"
						prop="email"
						min-width="15%">
					</el-table-column>
					<el-table-column
						label="项目组"
						prop="depName"
						min-width="15%">
					</el-table-column>
					<el-table-column
						label="手机号"
						prop="telephone"
						min-width="15%">
					</el-table-column>
					<el-table-column
						label="企业名称"
						prop="companyName"
						min-width="15%">
					</el-table-column>
					<el-table-column
						align="center"
						label="状态"
						min-width="5%">
						<template
							slot-scope="scope">
							<el-tag v-if="scope.row.status == 1" type="success">
								正常
							</el-tag>
							<el-tag v-else type="warning">
								锁定
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						min-width="10%"
						align="center">
						<template
							slot-scope="scope">
							<el-button
								type="danger"
								size="mini"
								icon="el-icon-view"
								@click="doSee(scope.row)"
								>查看
							</el-button>
							<el-button
								type="info"
								size="mini"
								icon="el-icon-edit"
								@click="updateRow(scope.row)"
								>修改
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
			<el-footer>
				<el-pagination
					@current-change="handleCurrentChange"
					@size-change="handlePageChange"
					:current-page="currentPage"
					:page-size="pageSize"
					:page-sizes="pageSizes"
					:total="total"
					layout="total, sizes, prev, pager, next, jumper">
				</el-pagination>
			</el-footer>
		</el-container>
		<el-dialog
			:visible.sync="dialogVisible"
			:title="titles[titleIndex]"
			width="30%">
			<el-form
				label-width="100px"
				:model="ruleForm"
				:rules="rules"
				class="demo-ruleForm"
				ref="ruleForm">
				<el-form-item 
					label="经理账户"
					prop="managerName">
					<el-input
						class="itemStyle" 
						v-model="ruleForm.managerName"
						:disabled="isDisable"
						clearable>
					</el-input>
				</el-form-item>
				<el-form-item 
					label="密码"
					prop="password">
					<el-input
						class="itemStyle" 
						type="password"
						v-model="ruleForm.password"
						:disabled="isDisable"
						clearable>
					</el-input>
				</el-form-item>
				<el-form-item 
					label="邮箱"
					prop="email">
					<el-input
						class="itemStyle" 
						v-model="ruleForm.email"
						:disabled="isDisable"
						clearable>
					</el-input>
				</el-form-item>
				<el-form-item 
					label="联系方式"
					prop="telephone">
					<el-input
						class="itemStyle" 
						v-model="ruleForm.telephone"
						:disabled="isDisable"
						clearable>
					</el-input>
				</el-form-item>
				<el-form-item 
					label="项目组名称"
					prop="depName">
					<el-select
						class="itemStyle" 
						:disabled="isDisable"
						v-model="ruleForm.depName">
						<el-option
							v-for="(item, index) in depNames"
							:label="item.dept"
							:value="item.dept"
							:key="index">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item 
					label="企业名称">
					<el-input
						class="itemStyle" 
						disabled
						v-model="ruleForm.companyName">
					</el-input>
				</el-form-item>
			</el-form>
			<el-row class="buttonsRow">
				<el-button
					v-if="titleIndex == 0"
					type="primary"
					size="small"
					icon="el-icon-plus"
					@click="submit('ruleForm')"
					>新增
				</el-button>
				<el-button
					v-else-if="titleIndex == 2"
					type="primary"
					size="small"
					icon="el-icon-edit"
					@click="doUpdate"
					>修改
				</el-button>
				<el-button
					type="warning"
					size="small"
					icon="el-icon-close"
					@click="cancel"
					plain
					>取消
				</el-button>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	export default {
		mixins: [VueMixins],
		name: 'ProjectManagerManagement',
		data() {
			return {
				searchData: '',
				searchItem: 'managerName',
				inputTips: '请输入经理名称',
				tableData: [],
				pageSize: 5,
				pageSizes: [5, 10, 20, 50],
				currentPage: 1,
				total: 100,
				ruleForm: {
					managerName: '', // 项目经理账户
					password: '', // 密码
					email: '', //邮箱
					telephone: '', // 联系方式
					depName: '', // 项目组名称（选）
					companyName: '', // 企业名称（接口）
					status: '1', // 状态 1
					createTime: '', // 创建时间
					creatorId: '', //创建者
					modifiedTime: '', // 修改时间
					modifierId: '', //修改者Id
				},
				depNames: [], // 项目组
				dialogVisible: false,
				rules: {
					managerName: [
						{required: true, message: '请填写账户', trigger: 'blur'}
					],
					password: [
						{required: true, message: '请填写密码', trigger: 'blur'}
					],
					email: [
						{required: true, message: '请输入邮箱', trigger: 'blur'}
					],
					telephone: [
						{required: true, message: '请输入手机号', trigger: 'blur'}
					],
					depName: [
						{required: true, message: '请选择项目组名称', trigger: 'blur'}
					]
				},
				titles: ['添加项目经理', '查看详情', '修改项目经理'],
				titleIndex: 0,
				isDisable: false
			}
		},
		created() {
			this.getCompanyName()
			this.getDepNames()
			this.doSearch()
		},
		methods: {
			handleCurrentChange(val) {
				this.pagedBatchQuery(this.pageSize, val)
			},
			handlePageChange(val) {
				this.pagedBatchQuery(val, this.currentPage)
			},
			// 获取项目组名称
			getDepNames() {
				Request({
					url: '/departmentController/selectByCompanyName',
					method: 'POST',
					params: {
						adminId: sessionStorage.getItem('userId')
					}
				}).then(res => {
					this.depNames = res.list
				}).catch(error => {
					console.log(error)
				})
			},
			// 获取企业名称
			getCompanyName() {
				Request({
					url: '/userController/selectByPrimaryKey',
					method: 'POST',
					params: {
						id: Number(sessionStorage.getItem('userId'))
					}
				}).then(res => {
					this.ruleForm.companyName = res.companyName
				}).catch(error => {
					console.log(error)
				})
			},
			// 添加相关
			doAdd(formName) {
				this.isDisable = false
				this.dialogVisible = true
				this.titleIndex = 0
				this.$refs[formName] && this.$refs[formName].resetFields()
			},
			submit(form) {
				this.$refs[form].validate((valid) => {
					if(valid) {
						this.ruleForm.creatorId = sessionStorage.getItem('userId')
						this.ruleForm.createTime = Date.now()
						Request({
							url: '/proManagerController/insert',
							method: 'POST',
							params: this.ruleForm
						}).then(res => {
							this.$message.success('新增成功')
							this.dialogVisible = false
							this.doSearch()
						}).catch(error => {
							console.log(error)
						})
					}else {
						return false
					}
				})
			},
			cancel() {
				this.dialogVisible = false
			},
			/**
			 * 查询相关
			 */
			// 选择不同的查询条件
			handleSelectChange(val) {
				this.searchData = ""
				this.searchItem = val
				switch(val) {
					case 'managerName':
						this.inputTips = '请输入经理名称'
						break
					case 'depName':
						this.inputTips = '请输入项目组名称'
						break
					default:
						break
				}
			},
			// 执行查询
			doSearch() {
				this.pagedBatchQuery(this.pageSize, this.currentPage)
			},
			// 查看相关
			doSee(row) {
				this.isDisable = true
				this.dialogVisible = true
				this.titleIndex = 1
				this.getRowData(row.id)
			},

			// 修改相关
			updateRow(row) {
				this.dialogVisible = true
				this.titleIndex = 2
				this.isDisable = false
				this.getRowData(row.id)
			},
			// 渲染单行数据
			getRowData(id) {
				Request({
					url: '/proManagerController/selectByPrimaryKey',
					method: 'POST',
					params: {
						id
					}
				}).then(res => {
					this.ruleForm = res
				}).catch(error => {
					console.log(error)
				})
			},
			// 修改数据
			doUpdate() {
				this.ruleForm.modifierId = sessionStorage.getItem('userId')
				this.ruleForm.modifiedTime = Date.now()
				Request({
					url: '/proManagerController/updateByPrimaryKey',
					method: 'POST',
					params: this.ruleForm
				}).then(res => {
					if(res.respCode === '0000') {
						this.$message.success('修改成功')
						this.doSearch()
						this.dialogVisible = false
					}
				}).catch(error => {
					console.log(error)
				})
			},
			// pagination切换
			pagedBatchQuery(pageSize, currentPage) {
				const params = {
					pageSize,
					currentPage,
					orderType: 'ASC',
					orderColumns: 'id',
					adminId: Number(sessionStorage.getItem('userId')),
					managerName: this.searchItem === 'managerName'? this.searchData: this.ruleForm.managerName,
					depName: this.searchItem === 'depName'? this.searchData: this.ruleForm.depName
				}
				Request({
					url: '/proManagerController/pagedBatchQuery',
					method: 'POST',
					params,
				}).then(res => {
					this.total = res.totalCount
					this.tableData = res.list
				}).catch(error => {
					console.log(error)
				})
			}
		},
		

	}
</script>

<style scoped>
	.searchInput {
		width: 300px;
		margin-left: 15px;
	}
	.itemStyle {
		max-width: 400px;
	}
	.buttonsRow {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		padding-right: 37px;
	}
</style>>
