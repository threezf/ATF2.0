<template>
    <div class="page-base-inner">
		<el-container>
			<el-header>
				<el-button
					@click="addButton"
					type="primary"
					icon='el-icon-plus'>
					添加
				</el-button>
				<el-button
					@click="updateButton"
					type='primary'
					icon='el-icon-edit'>
					修改
				</el-button>
				<el-panel
					style="margin-left: 10px; cursor: pointer;color: gray"
					id='advancedFunctions'
					type='primary'
					v-if="!highIsActive"
					@click='showHighFunction'>
					>> 展示高级功能
				</el-panel>
				<span class='high' v-if="highIsActive">
					<el-button
						type='primary'
						icon='el-icon-s-tools'
						plain>
						管理功能点
					</el-button>
					<el-button
						type='primary'
						icon='el-icon-edit-outline'
						plain>
						配置系统数据
					</el-button>
					<el-button
						type='primary'
						icon='el-icon-s-tools'
						plain>
						自动化构件维护
					</el-button>
					<el-button
						type='primary'
						icon='el-icon-s-management'
						plain>
						执行代码管理
					</el-button>
					<el-button
						type='primary'
						icon='el-icon-setting'
						plain>
						移动端设备配置
					</el-button>
				</span>
				<el-panel
					id="el-panelHidden"
					style="margin-left: 10px; cursor: pointer;color: gray"
					type='primary'
					v-if="highIsActive"
					@click='showHighFunction'>
					<< 隐藏高级功能
				</el-panel>
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
								@click="getAllSystem(1)"
								style="margin: 4px 0px 0px -40px;">搜索</el-button>
						</el-col>
					</el-row>
				</el-row>
				<el-table
					ref="singleTable"
					style="width:fit-content; margin-top: 10px"
					border
					stripe
					highlight-current-row
					:default-sort="{prop:'createTime',order:'descending'}"
					:data="tableData"><!--highlight-current-row:当前选中行保持高亮-->
					<el-table-column
						label="选择"
						width="55">
						<template slot-scope="scope">
<!--							<el-checkbox v-model="scope.row.checked">-->
<!--								-->
<!--							</el-checkbox>-->
							<el-radio class="radio"  v-model="radio"  :label="scope.$index">&nbsp;</el-radio>
						</template>
					</el-table-column>
					<el-table-column
						sortable
						prop="id"
						label="序号"
						width="80">
					</el-table-column>
					<el-table-column
						prop="code"
						label="测试系统编号"
						width="230">
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
				<div style="width: 1300px; float: left">
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
								<el-button type="primary" size="small">新增</el-button>
								<el-button size="small">取消</el-button>
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
				radio: "",	// 单选框默认
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
			showHighFunction: function () {
				this.highIsActive = !this.highIsActive;
			},
			handleBeforeClose(done){
				if (this.dialogModelFlag == 1){
					done();
					return true;
				}
				done();
				return true;
			},
			//添加按钮
			addButton(){
				this.dialogModelFlag = 0;
				this.dialogVisible = true;
			},
			//修改按钮
			updateButton(){
				this.dialogModelFlag = 1;
				this.dialogVisible = true;
			},
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
		margin: 30px auto 10px auto;
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
</style>
