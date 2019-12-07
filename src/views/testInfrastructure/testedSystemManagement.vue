<template>
    <div class="page-base-inner">
		<el-container>
			<el-header>
				<el-button
					type="primary"
					icon='el-icon-plus'
					size="small"
					@click="addButton"
				>添加</el-button>
				<el-button
					type='primary'
					icon='el-icon-edit'
					size="small"
					@click="updateButton"
				>修改</el-button>
				<el-panel
					id='advancedFunctions'
					type='primary'
					class="highFunction"
					v-if="!highIsActive"
					@click='showHighFunction'
				> {{'>> 展示高级功能'}}</el-panel>
				<span class='high' v-if="highIsActive">
					<el-button
						type='primary'
						icon='el-icon-s-tools'
						size="small"
						plain
						@click='manageFunction'
					>管理功能点</el-button>
					<el-button
						type='primary'
						icon='el-icon-edit-outline'
						size="small"
						plain
					>配置系统数据</el-button>
					<el-button
						type='primary'
						icon='el-icon-s-tools'
						size="small"
						plain
					>自动化构件维护</el-button>
					<el-button
						type='primary'
						icon='el-icon-s-management'
						size="small"
						plain
					>执行代码管理</el-button>
					<el-button
						type='primary'
						icon='el-icon-setting'
						size="small"
						plain
					>移动端设备配置</el-button>
				</span>
				<el-panel
					id="el-panelHidden"
					class="highFunction"
					type='primary'
					v-if="highIsActive"
					@click='showHighFunction'
				>{{'<< 隐藏高级功能'}}</el-panel>
			</el-header>
			<el-main class="el-main-base-inner">
				<el-row>
					<div class="row">
						<el-row>
							<span class="spanRow">测试系统</span>
						</el-row>
					</div>
					<el-row>
						<el-col span="3" offset="1">
							<el-input
								placeholder="请输入系统编号"
								style="margin:0px 0px 0px -20px"
								v-model="selectInfo"></el-input>
						</el-col>
						<el-col span="1" offset="1">
							<el-button
								size="small"
								class='search'
								@click="getAllSystem(1)"
							>搜索</el-button>
						</el-col>
					</el-row>
				</el-row>
				<el-table
					ref="singleTable"
					class='tableStyle'
					border
					stripe
					highlight-current-row
					:default-sort="{prop:'createTime',order:'descending'}"
					:data="tableData"><!--highlight-current-row:当前选中行保持高亮	type='index'显示当前行号-->
					<el-table-column
						label="选择"
						width="55">
						<template slot-scope="scope">
							<el-radio
								class="radio"
								v-model="radio"
								:label='scope.$index'
								@change='handleRadioChange(scope.$index)'
							>&nbsp;</el-radio>
						</template>
					</el-table-column>
					<el-table-column
						sortable
						type='index'
						label="序号"
						width="80"
						align='center'>
					</el-table-column>
					<el-table-column
						prop="code"
						label="测试系统编号"
						width="209"
						align="center">
						<template slot-scope="scope">
							<a @click='toTransact' class='link' target=_self>{{scope.row.code}}</a>
						</template>
					</el-table-column>
					<el-table-column
						prop="nameMedium"
						label="测试系统名称"
						width="250">
					</el-table-column>
					<el-table-column
						prop="inheriteArcName"
						label="开发架构"
						width="150">
					</el-table-column>
					<el-table-column
						prop="descShort"
						label="测试系统描述"
						width="250">
					</el-table-column>
					<el-table-column
						sortable
						prop="createTime"
						label="创建时间"
						:formatter="transTime"
						width="220">
					</el-table-column>
					<el-table-column
						sortable
						prop="modifiedTime"
						label="修改时间"
						width="220"
						:formatter="transTime">
					</el-table-column>
				</el-table>
				<div>
					<div class="footSelect">
						<el-col :span="10" :offset="4">
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="currentPage"
								:page-sizes="[5,10,20,50]"
								:page-size="pageSize"
								layout="total,sizes,prev,pager,next,jumper"
								:total="totalCount">
							</el-pagination>
						</el-col>
					</div>
				</div>
				<el-dialog
					:title="dialogTitle"
					:visible.sync="dialogVisible"
					:before-close="handleBeforeClose"
					width="26%">
					<el-form>
						<el-form-item label="测试系统编号" label-width="100px">
							<el-input placeholder="请输入系统编号" v-model="systemNumber"></el-input>
						</el-form-item>
						<el-form-item label="测试系统名称" label-width="100px">
							<el-input placeholder="名称" v-model="systemName"></el-input>
						</el-form-item>
						<el-form-item label="开发架构" label-width="100px">
							<el-select v-model="developFramework" placeholder="--选择开发架构--">
								<el-option value="网站抽象架构"></el-option>
								<el-option value="普通web网站抽象架构"></el-option>
								<el-option value="截图"></el-option>
								<el-option value="移动端架构"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="描述" label-width="100px">
							<textarea cols="45" rows="10" v-model.trim="content">

							</textarea>
						</el-form-item>
						<el-form-item>
							<div style="width: fit-content;float: right; margin-right: 20px">
								<el-button type="primary" size="small" @click='sureButtonClicked'>新增</el-button>
								<el-button size="small" @click='cancelButtonClicked'>取消</el-button>
							</div>
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
	import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
		components: {ElSlPanel},
		mixins: [VueMixins], // 混入
        name: "testedSystemManagement",
		data() {
			return {
				//高级按钮显示
				highIsActive:false,//此处需要校正
				//切换页面时
				currentPage: 1,
				pageSize: 10,
				totalCount: 50,
				//表格数据渲染
				tableData: [],
				radio: false,	// 单选框默认
				//搜索相关
				selectInfo: "", //搜索输入内容
				//对话框及相关内容
				dialogModelFlag: 0,
				dialogVisible: false,
				//新建用户时添加的数据
				systemNumber: "",
				systemName: "",
				developFramework: "--选择开发架构--",
				content:'',
			}
		},
		computed:{
			//查询测试系统的参数对象，因为实现过程中受到搜索条件的影响，因此将此参数放在computed中
			params(){
				let obj = {
					currentPage: this.currentPage,
					orderColumns: "modified_time",
					orderType: "DESC",
					pageSize: this.pageSize
				}
				if (this.selectInfo !==""){
					obj.codeAndName = this.selectInfo;
				}
				return obj;
			},
			dialogTitle(){
				let obj = {
					0: '添加测试系统',
					1: '修改测试系统',
					2: '操作失败'
				};
				return obj[this.dialogModelFlag];
			}
		},
		created() {
			this.getAllSystem();
		},
		mounted(){

		},
		methods: {
			//点击展示和隐藏高级功能
			showHighFunction: function () {
				this.highIsActive = !this.highIsActive;
			},
			//添加按钮
			addButton(){
				this.dialogModelFlag = 0;
				this.dialogVisible = true;
			},
			//修改按钮
			updateButton(){
				if (this.radio === false) {
					this.$message.warning('请选择一条数据！！')
				}else {
					this.dialogModelFlag = 1;
					this.dialogVisible = true;
				}
			},
			manageFunction(){
				if (this.radio === false) {
					this.$message.warning('请选择一条数据！！')
				}else {
					// sessionStorage.setItem('value','this.currentPage');
					this.$router.push({path: 'transact',query:{id:'1',name:'小青'}});
				}
			},
			/**
			 * 表格事件处理
			 * handleRadioChange：监听Radio变化处理事件
			 * toTransact：选择系统编号跳转

			 */
			handleRadioChange(value){
				this.$message.success('Radio改变' + (value));
			},
			toTransact(){
				// sessionStorage.setItem('case')
				this.$router.push({path:'transact',query:{id:'1',name:'小青'}});//界面跳转
			},
			//对话框处理事件，非区域隐藏
			handleBeforeClose(done){
				if (this.dialogModelFlag == 1){
					done();
					return true;
				}
				done();
				return true;
			},

			/**
			 * 处理底部换页标记
			 */
			handleSizeChange(val) {
				console.log(`每页 ${{val}}条`);
				this.pageSize = val;
				this.getAllSystem();
			},
			handleCurrentChange(val){
				console.log(`当前页：${{val}}`);
				this.currentPage = val;
				this.getAllSystem();
			},
			// 查询被测系统  为点击查询按钮调用 此时将当前页置为一
			getAllSystem(type){
				if (type == 1){
					this.currentPage = 1;
				}
				Request({
					url:'/aut/pagedBatchQueryAut',
					method: 'post',
					params: this.params
				}).then((res)=>{
					this.tableData = res.autRespDTOList;
					this.tableData = this.tableData.reverse();
					this.totalCount = res.totalCount;
					console.log(this.tableData);
				},(err)=>{
					console.log(err);
				}
				).catch((err) =>{
					console.log(err);
				})
			},
			/**
			 * 对话框事件
			 * sureButtonClicked：点击确定按钮
			 * cancelButtonClicked：点击取消按钮
			 */
			sureButtonClicked(){
				this.$message.info('点击确认按钮')
			},
			cancelButtonClicked(){
				this.dialogVisible = false;
			}
		}
    }
</script>

<style scoped>
	.high{
		margin-left: 10px;
	}
	.footSelect{
		text-align: center;
		overflow: hidden;
		margin: 30px auto 10px 9%;
	}
	span.spanRow{
		margin-left: 10px;
	}
	div.row{
		border-color: lightgray;
		border-width: 1px;
		border-bottom-style: solid;
		width: 100%;
		height: 35px;
		margin-bottom: 10px;
	}
	/*表格相关样式*/
	.tableStyle{
		margin-left: 10px;
		width:fit-content;
		margin-top: 15px
	}
	/*搜索按钮*/
	.search{
		margin: 4px 0px 0px -40px;
	}
	/*高级功能样式*/
	.highFunction{
		font-size: 13px;
		margin-left: 10px;
		cursor: pointer;
		color: gray
	}
	/*链接样式*/
	.link{
		color: #3e61aa;
		text-decoration: none;
		cursor: pointer;
	}
	.link:hover{
		color: blue;
	}
</style>
