<template>
	<div class="page-base-inner">
		<el-container>
			<el-header>
				<el-button
					type='primary'
					icon="el-icon-plus"
					size="small"
					@click='addFunctionButton'
				>添加</el-button>
				<el-button
					type="primary"
					icon="el-icon-folder-add"
					size="small"
					@click='importFunctionButton'
				>批量导入</el-button>
				<el-button
					type="primary"
					icon="el-icon-document-copy"
					size="small"
					@click='failedOperation'
				>复制功能点</el-button>
				<el-button
					type="primary"
					icon="el-icon-edit-outline"
					size="small"
					@click='updateFunctionButton'
				>修改</el-button>
			</el-header>
			<el-main class="el-main-base-inner">
				<div class="row">
					<span class="spanRow">功能点</span>
				</div>
				<el-row>
					<el-col class='systemCol'>
						<span class='ownedSystem'>所属被测系统</span>
					</el-col>
					<el-col span='4'>
						<el-select v-model='ownedSystem' placeholder='所属被测系统'>
							<el-option value='被测系统1'></el-option>
							<el-option value='被测系统2'></el-option>
							<el-option value='get'></el-option>
						</el-select>
					</el-col>
				</el-row>
				<!--表格-->
				<el-table
					ref='singleTable'
					style="width:fit-content; margin-top: 15px"
					:data='tableData'
					:default-sort="{prop:'modifiedTime',order:'descending'}"
					stripe
					highlight-current-row
					border>
					<el-table-column
						label=''
						width='50px'
						align='center'
					></el-table-column>
					<el-table-column
						label='行号'
						width='80px'
						align='center'
						type='index'>
					</el-table-column>
					<el-table-column
						prop='code'
						label='编码'
						width='240px'
						align='center'
					></el-table-column>
					<el-table-column
						prop='nameMedium'
						label='名称'
						width='240px'
						align='center'
					></el-table-column>
					<el-table-column
						prop='transType'
						label='类型'
						width='100px'
						align='center'
					></el-table-column>
					<el-table-column
						prop='descShort'
						label='描述'
						width='200px'
						align='center'
					></el-table-column>
					<el-table-column
						prop='createTime'
						label='创建时间'
						width='200px'
						align='center'
						:formatter='transTime'
						sortable
					></el-table-column>
					<el-table-column
						prop='modifiedTime'
						label='修改时间'
						width='200px'
						align='center'
						:formatter='transTime'
						sortable
					></el-table-column>
				</el-table>
				<!--底部换页-->
				<div>
					<el-col class='footSelect'>
						<el-pagination
							@size-change='handleSizeChange'
							@current-change='handleCurrentChange'
							:page-sizes='[5,10,20,50]'
							:current-page='currentPage'
							:page-size='pageSize'
							:total='totalCount'
							layout='total, sizes, prev ,pager ,next, jumper'
						></el-pagination>
					</el-col>
				</div>

				<!--新增和修改对话框-->
				<el-dialog
					width="27%"
					:title='dialogTitle'
					:visible.sync='dialogVisible'
					:before-close='handleBeforeClose'>
					<el-form>
						<el-form-item class='formItem' label='名称' label-width='110px'>
							<el-input class='formInput' placeholder='必输项' v-model='functionName'></el-input>
						</el-form-item>
						<el-form-item class='formItem' label='类型' label-width='110px'>
							<el-select class='formInput' v-model='functionType'>
								<el-option value='UI' selected='true'></el-option>
								<el-option value='接口'></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class='formItem' label='编码' label-width='110px'>
							<el-input class='formInput' placeholder='为空时自动生成' v-model='functionCode'></el-input>
						</el-form-item>
						<el-form-item class='formItem' label='描述' label-width='110px'>
							<textarea class=formInput cols='5' rows='5' v-model='functionDesc'></textarea>
						</el-form-item>
						<hr color='#F5F5F5'/>
						<el-form-item>
							<div class='dialogBottom'>
								<el-button type="primary" size="small">新增</el-button>
								<el-button size="small" @click='cancelButton'>取消</el-button>
							</div>
						</el-form-item>
					</el-form>
				</el-dialog>
				<!--导入对话框-->
				<el-dialog
					width='27%'
					:title='dialogTitle'
					:before-close='handleBeforeClose'
					:visible.sync='dialogImportVisible'>
					<el-form>
						<el-upload
							ref='upload'
							:limit='1'
							:auto-upload='false'
							:file-list='fileList'
							:on-preview='handlePreview'
							:on-remove='handleRemove'
							:on-exceed='handleExceed'
							:on-change='handleOnChange'>
							<el-button
								class='btnSelectFile'
								type='success'
								size='small'
								slot='trigger'
								plain>选择文件</el-button>
							<el-input class='formInput' placeholder='请选择导入的文件' disabled='true' v-model='fileName'></el-input>
						</el-upload>
						<hr color='#F5F5F5'/>
						<el-form-item>
							<div class='dialogImportBottom'>
								<el-button
									type='primary'
									icon='el-icon-download'
									size='small'
									style='margin-right: 225px'
									@click='downloadTemplate'>模板下载</el-button>
								<el-button type="primary" size="small">导入</el-button>
								<el-button size="small" @click='cancelButton'>取消</el-button>
							</div>
						</el-form-item>
					</el-form>
				</el-dialog>
				<!--操作失败-->
				<el-dialog
					width='26%'
					:title='dialogTitle'
					:visible.sync='dialogFailVisible'
					:before-close='handleBeforeClose'>
					<el-form>
						<el-form-item label-width="10px">
							<h3>请选择一个功能点</h3>
						</el-form-item>
					</el-form>
					<hr width='100%' color='#F5F5F5'/>
					<div class='dialogBottom'>
						<el-button
							type='success'
							size='small'
						>确定</el-button>
					</div>
				</el-dialog>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
		components: {ElSlPanel},
		mixins: [VueMixins], // 时间格式转化
        name: "transact",
		data() {
        	return {
        		ownedSystem: '所属被测系统',
				currentPage: 1,
				totalCount: 30,
				pageSize: 5,
				tableData: [],	//表格数据
				//对话框相关
				dialogModelFlag: 0,
				dialogVisible: false,
				dialogImportVisible: false,
				dialogFailVisible: false,
				//表单数据
				functionName: '',
				functionType: 'UI',
				functionCode: '',
        		functionDesc: '',
				//文件上传
				fileList:{},
				fileName:'',
			}
		},
		created() {
        	console.log('pagination执行Created方法')
        	this.getAllFunction();
		},
		mounted() {
		},
		computed: {
			changedParams() {
        		let obj = {
					autId: 1550,
					currentPage: this.currentPage,
					orderColumns: 'modified_time',
					orderType: 'desc',
					pageSize: this.pageSize
				}
				return obj;
			},
			dialogTitle() {
				let titleArray = ['添加功能点','导入','修改功能点','操作失败'];
				return titleArray[this.dialogModelFlag];
			}
		},
		methods: {
			addFunctionButton() {
				let _this = this;
				_this.dialogModelFlag = 0;
				_this.dialogVisible = true;
			},
			importFunctionButton() {
				let _this = this;
				_this.dialogModelFlag = 1;
				_this.dialogImportVisible = true;
			},
			updateFunctionButton() {
				let _this = this;
				_this.dialogModelFlag = 2;
				_this.dialogVisible = true;
			},
			failedOperation() {
				let _this = this;
				_this.dialogModelFlag = 3;
				_this.dialogFailVisible = true;
			},
			/*
			 * 表单相关操作
			 */
			// 共用属性
			cancelButton() {
				let _this = this;
				_this.dialogImportVisible = false;
			},
			handleOnChange(file,fileList) {
				this.$message.success(`选择文件成功`);
				this.fileName = file.name;
			},
			handleBeforeClose(done) {
				console.log('debug:调用handleBeforeClose' +done);
				done();
				return true;
			},
			//导入文件相关
			downloadTemplate() {
				window.location.href  = this.address4+'atfcloud2.0a/transactController/downloadTemplate';
			},
			handleRemove(file,fileList) {
				console.log('file:',file,fileList)
				this.fileName = '删除' + file.name;
			},
			handlePreview(file) {
				console.log('file:' + file);
				this.fileName = '点击' + file.name;
			},
			handleExceed(file, fileList) {
				this.$message.warning(`只允许上传1个文件`);
			},
			/*
			 * 底部分页
			 */
        	handleSizeChange(val) {
        		console.log(`pagination每页${val}条`);
        		this.pageSize = val;
        		this.getAllFunction();
			},
        	handleCurrentChange(val) {
        		console.log(`pagination当前页${val}`);
        		this.currentPage = val;
        		this.getAllFunction();
			},
			/*
			 * 获取指定option的功能点
			 */
			getAllFunction() {
				Request({
					url: '/transactController/pagedBatchQueryTransact',
					method: 'post',
					params: this.changedParams
				}).then((res)=>{
					for (let i =0; i < res.list.length; i++){
						if (res.list[i].transType == 1){
							res.list[i].transType = 'UI';
						}else {
							res.list[i].transType = '接口';
						}
					}
					this.tableData = res.list;
					this.totalCount = res.totalCount;
				},(err)=>{
					console.log('pagination查询出错' + err)
				}).catch((err)=>{
					console.log('pagination查询出错'+ err)
				});
			}
		}
	}
</script>

<style scoped>
	.spanRow{
		margin-left: 10px;
	}
	.ownedSystem{
		height: fit-content;
		color: gray;
		font-size: 15px;
	}
	.systemCol{
		width: fit-content;
		height: fit-content;
		margin: 9px 30px 9px 45px;
	}
	.row{
		border-color: lightgray;
		border-width: 1px;
		border-bottom-style: solid;
		width: 100%;
		height: 35px;
		margin-bottom: 10px;
	}
	.footSelect{
		text-align: center;
		overflow: hidden;
		margin: 30px auto 10px auto;
	}
	.formInput{
		width: 250px;
		margin-left: 20px;
	}
	.formItem{
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.dialogBottom,.dialogImportBottom{
		width: fit-content;
		float: right;
		margin-right: 10px;
		margin-top: 15px;
		margin-bottom: -20px;
	}
	.dialogImportBottom{
		overflow: hidden;
		width: 97%;
		margin-bottom: -30px;
		margin-left: 10px;
	}
	.btnSelectFile{
		margin: 5px -5px 20px 10px;
	}
</style>
