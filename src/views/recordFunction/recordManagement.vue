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
				<el-button
				    @click="toFuncPoint"
					type='primary'
					icon='el-icon-s-tools'>
					管理功能点
				</el-button>
				<el-button
					type='primary'
					icon='el-icon-download'>
					录制工具下载
				</el-button>
			</el-header>
			<el-main class="el-main-base-inner">
				<el-row>
					<div class="row">
						<el-row>
							<span class="spanRow">测试系统</span>
						</el-row>
					</div>

					<el-row>
						<el-col :span="3" :offset="1">
							<el-input
								placeholder="请输入系统编号"
								style="margin:0px 0px 0px -20px"
								v-model="selectInfo"></el-input>
						</el-col>
						<el-col :span="1" :offset="1">
							<el-button
								size="small"
								@click="getAllSystem(1)"
								style="margin: 4px 0px 0px -40px;">搜索</el-button>
						</el-col>
					</el-row>
				</el-row>
				<el-table
					:default-sort="{prop:'createTime',order:'descending'}"
					ref="singleTable"
					:data="tableData"
					stripe
					highlight-current-row
					@current-change="handleCurrentChange1"
					style="width:100%; margin-top: 10px"><!--highlight-current-row:当前选中行保持高亮-->
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
						width="180">
					</el-table-column>
					<el-table-column
						sortable
						prop="modifiedTime"
						label="修改时间"
						width="180"
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
        name: "recordManagement",
		data() {
			return {
				currentPage: 1,
				pageSize: 10,
				totalCount: 50,
				tableData: [],
				radio: "",	// 单选框默认
				selectInfo: "", //搜索输入内容
				dialogModelFlag: 0,
				dialogVisible: false,
				selectSystem: {}
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
			handleBeforeClose(done){
				if (this.dialogModelFlag == 1){
					done();
					return true;
				}
				done();
				return true;
			},
			//选择表格
			handleCurrentChange1(val) {
			    this.selectSystem = val;
				
			},
			//管理功能点按钮
			toFuncPoint(){
				console.log(this.selectSystem)
				   sessionStorage.setItem("autId", this.selectSystem.id);
                   sessionStorage.setItem("autName",this.selectSystem.nameMedium); 
                   this.$router.push({ path: "recordTransact" });
				
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
