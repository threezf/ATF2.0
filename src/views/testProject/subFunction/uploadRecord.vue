<template>
	<div class="page-inner">
		<el-container>
			<el-main>
				<el-row>
					<el-button
						size="small"
						@click='uploadDialog'
						type="primary"
						icon="el-icon-plus">
						导入
					</el-button>
					<el-button
						size="small"
						@click='back'
						type="primary"
						icon="el-icon-plus">
						返回
					</el-button>
				</el-row>
				<el-table
					stripe
					border
					:data="tableData"
					class='table'>
					<el-table-column
						label="caseLibId"
						property="caseLibId"/>
					<el-table-column
						label="上传者"
						property="uploadUserName"/>
					<el-table-column
						label="总条数"
						property="totalNum"/>
					<el-table-column
						label="导入状态"
						property="importStatus"/>
					<el-table-column
						label="成功条数"
						property="successNum"/>
					<el-table-column
						label="失败条数"
						property="failNum"/>
					<el-table-column
						label="返回信息"
						property="errMsg"/>
					<el-table-column
						label="上传时间"
						property="createTime"/>
					<el-table-column
						label="完成时间"
						property="finishTime"/>
					<el-table-column
						label="错误信息">
						<template slot-scope="scope">
							<p v-show="scope.row.importStatus=='全部成功'"> 无</p>
							<el-button
								size="mini"
								type="danger"
								v-show="scope.row.importStatus!='全部成功'"
								@click="downloadError(scope.row.batchImportNo)">下载
							</el-button>
						</template>
					</el-table-column>
					<el-table-column label="导入文件" >
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="danger"
								@click="downloadFile(scope.row.batchImportNo)">下载
							</el-button>
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
					title="导入"
					:visible.sync="dialogVisibleI"
					width="30%">
					<!-- ElementUI上传 -->
					<el-upload
						class="upload-demo in-file"
						action=""
						:on-success="changeFile"
						:on-remove="handleRemove"
						:file-list="fileList">
						<el-button size="small" type="primary">选择文件</el-button>
						<i slot="tip" class="el-upload__tip text">只能选择xlsx文件</i>
					</el-upload>
					<el-divider></el-divider>
					<div>
						上传方式：
						<el-radio v-model="radio" label="1">简单版</el-radio>
						<el-button size="small" type="success" @click="downloadTemplate(0)">模板下载</el-button>
					</div>
					<div>
						<el-radio v-model="radio" label="2" class="radio">标准版</el-radio>
						<el-button size="small" type="success" @click="downloadTemplate(1)">模板下载</el-button>
					</div>
					<el-divider></el-divider>
					<div class="in-file">
						<el-button size="small" type="primary" @click="uploadTemp">导入</el-button>
						<el-button size="small" type="primary" @click="dialogVisibleI = !dialogVisibleI ">取消</el-button>
					</div>
				</el-dialog>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'

	export default {
		mixins: [VueMixins], // 混入
		data() {
			return {
				tableData: [],
				allUploadUser:[],
				fileList:[],
				idList: [],
				currentPage:1,
				pageSize:5,
				totalPage:'',
				totalCount:'',
				radio: "1",
				dialogVisibleI:false,
				fileListM:[]
			}
		},
		created(){
			this.getAllUploadUser()
			this.getCaseList()
		},
		methods:{
			getAllUploadUser(){
				Request({
					url: '/testcase/batchImport/queryAllUploadUser',
					method: 'post',
				}).then((res) => {
					this.allUploadUser=res.userNames
				},(err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			getCaseList(){
				Request({
					url: '/testcase/batchImport/queryBatchImportStatus',
					method: 'post',
					params:{
						pageNum: this.currentPage,
						pageSize: this.pageSize,
						orderColumn: 'create_time',
						orderType:'desc',
						uploadUserReallyName: '',
						importStatus: '',
						createTimeLower:'' ,
						createTimeUpper: '' ,
						caseLibId: sessionStorage.getItem("caselibId"),
					}
				}).then((res) => {
					this.totalCount = res.totalCount;
					this.tableData = res.rows;
					this.totalPage =res.totalPage;
				},(err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			back(){
				this.$router.push({path:'testCase'})
			},
			uploadDialog(){
				this.dialogVisibleI = true
			},
			changeFile(response,file) {
				this.fileListM.push(file);
				console.log(this.fileListM)
			},
			handleRemove(file, fileList) {
				var index=0
				for(var i=0;i<fileList.length;i++){
					if(file.name==fileList[i].name){
						index=i
						break
					}
				}
				this.fileListM.splice(index, 1);
			},
			handlePreview(file) {
				console.log(file);
			},

            downloadError(ID) {
          	 var url = "http://10.101.167.184:8080/atfcloud2.0a/testcase/batchImport/file/errorFile/";
			       window.location.href = url+ID;

           },
			 downloadFile (ID) {
          	 var url = "http://10.101.167.184:8080/atfcloud2.0a/testcase/batchImport/file/uploadFile/";
			         window.location.href = url+ID;
           },
			//实际导入函数

			uploadTemp() {
				let file = this.fileListM[0];
				let param = new FormData();
				var caseLibId = sessionStorage.getItem("caselibId");
				param.append("file", file.raw);
				param.append("caseLibId", caseLibId);
				param.append("uploadUserId", 3);
				if(file.name.charAt(1)=="t"){
					param.append("templateType", 1);
				}else{
					param.append("templateType", 0);
				}
				var _this = this;
				Request({
					url: "/testcase/batchImportTestcase",
					method: "post",
					params: param
				})
					.then(res => {
						if (res.respCode == "0000") {
							this.dialogVisibleI = false;
							this.$alert("导入成功", "导入情况", {
								confirmButtonText: "确定",
								callback: action => {
									this.$message({
										type: "info",
										message: `action: ${action}`
									});
								}
							});
							this.getCaseList()
						} else {

							this.dialogVisibleI = false;
							this.$alert("导入失败", "导入情况", {
								confirmButtonText: "确定",
								callback: action => {
									this.$message({
										type: "info",
										message: `action: ${action}`
									});
								}
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.getCaseList()
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.getCaseList()
			},
		    //下载模板
		    downloadTemplate(val) {
		    	if (val == 0) {
		    		let url =
		    			"http://10.101.167.184:8080/atfcloud2.0a/testcase/batchImport/file/template/simple";
		    		window.location.href = url;
		    	} else {
		    		let url =
		    			"http://10.101.167.184:8080/atfcloud2.0a/testcase/getStandardExcelTemporary";
		    		window.location.href = url;
		    	}
		    }
		}
	}
</script>
