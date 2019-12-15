<template>
	<div class="page-base-inner">
		<el-container>
			<el-header class='headerRow'>
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
					@click='copyFunction'
				>复制功能点</el-button>
				<el-button
					type="primary"
					icon="el-icon-edit-outline"
					size="small"
					@click='updateFunctionButton'
				>修改</el-button>
				<br/>
			</el-header>
			<el-main class="el-main-base-inner">
				<div class="row">
					<span class="spanRow">功能点</span>
				</div>
				<el-row>
					<el-col class='systemCol'>
						<span class='ownedSystem'>所属被测系统</span>
					</el-col>
					<el-col :span='4'>
						<el-select
							v-model='ownedSystem'
							placeholder='所属被测系统'
							@change='changeAutId'>
							<el-option
								v-for='(item,key) in autRespDTOList'
								:key='key'
								:value='item.nameMedium'
							>{{item.nameMedium}}</el-option>
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
						label='选择'
						width='50px'
						align='center'>
						<template slot-scope='scope'>
							<el-radio
								v-model='selectedRowIndex'
								:label='scope.$index'
								@change='selectRow(scope.$index,scope.row)'
							>&nbsp;</el-radio>
						</template>
					</el-table-column>
					<el-table-column
						label='行号'
						width='80px'
						align='center'
						type='index'>
					</el-table-column>
					<el-table-column
						prop='code'
						label='编码'
						width='370px'
						align='center'
					></el-table-column>
					<el-table-column
						prop='nameMedium'
						label='名称'
						width='370px'
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
					<el-form :model='ruleForm' ref='ruleForm' :rules='rules' status-icon>
						<el-form-item class='formItem' label='名称' label-width='110px' prop='nameMedium'>
							<el-input class='formInput' placeholder='必输项' v-model.lazy='ruleForm.nameMedium'></el-input>
							<span class='spanTextColor'>*</span>
						</el-form-item>
						<el-form-item class='formItem' label='类型' label-width='110px' prop='functionType' v-if='isAdded'>
							<el-select class='formInput' v-model='ruleForm.functionType'>
								<el-option value='UI' selected='true'></el-option>
								<el-option value='接口'></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class='formItem' label='编码' label-width='110px' prop='code'>
							<el-input class='formInput' placeholder='为空时自动生成' v-model='ruleForm.code'></el-input>
						</el-form-item>
						<el-form-item class='formItem' label='描述' label-width='110px' prop='descShort'>
							<textarea class=formInput cols='5' rows='5' v-model='ruleForm.descShort'></textarea>
						</el-form-item>
						<hr color='#F5F5F5'/>
						<el-form-item>
							<div class='dialogBottom'>
								<el-button id='buttonName' type="primary" size="small" @click='submitForm("ruleForm")'>{{dialogOperateButton}}</el-button>
								<el-button type='danger' size="small" plain @click='cancelButton'>取消</el-button>
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
					width='27%'
					:title='dialogTitle'
					:visible.sync='dialogFailVisible'
					:before-close='handleBeforeClose'>
					<el-form>
						<el-form>
							<el-form-item label-width="10px">
								<p class='failContent'>请选择一个功能点</p>
							</el-form-item>
						</el-form>
						<hr width='100%' color='#F5F5F5'/>
						<el-form-item>
							<div class='dialogFailBottom'>
								<el-button
									type='success'
									size='small'
									@click='cancelButton'
								>确定</el-button>
							</div>

						</el-form-item>
					</el-form>
				</el-dialog>
				<!--添加成功对话框-->
				<el-dialog
					width='25%'
					title='添加成功'
					:visible.sync = 'successDialogVisible'
					:before-close='handleBeforeClose'>
					<el-form>
						<el-form-item label-width='50px'>
							<h3>操作成功</h3>
						</el-form-item>
						<hr width='100%' color='#F5F5F5'/>
						<el-form-item label-width='200px' class='formFoot'>
							<el-button
								type='primary'
								size='small'
								@click='cancelButtonClicked'
							>确定</el-button>
							<el-button
								type='primary'
								size='small'
							>进入功能点</el-button>
						</el-form-item>
					</el-form>
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
			let checkNameMedium = (rule,value,callback)=>{
				if (value === ''){
					return callback(new Error('nameMedium 不能为空'));
				}else {
					return callback();
				}
			};
        	return {
				//初始渲染需要的数据
				autId: '',//被测系统管理界面传递过来的值
				autRespDTOList:[],//所有测试系统列表
        		ownedSystem: '',//被测系统
				//换页相关信息
				currentPage: 1,
				totalCount: 30,
				pageSize: 10,
				//表格相关
				tableData: [],	//表格数据
				selectedRowIndex: "", //Radio选中
				//对话框相关
				dialogModelFlag: 0,
				dialogVisible: false,
				dialogImportVisible: false,
				dialogFailVisible: false,
				successDialogVisible: false,
				//表单数据
				ruleForm: {
					nameMedium: '',
					functionType: 'UI',
					code: '',
					descShort: '',
				},//表单信息数据
				rules: {
					nameMedium: [{validator: checkNameMedium, trigger: 'blur'}]
				},//表单验证数据
				//文件上传
				fileList:{},
				fileName:'',
				rowInfo: {},//行信息
				updateId: '',//修改/复制功能点时传递的id
				isAdded: true,//点击修改时隐藏，添加时显示
				//复制功能的数据
				elementRepositoryId: "",
				objectRepositoryId: "",
			}
		},
		created() {
        	this.autId = this.$route.query.id;
        	this.ownedSystem = this.$route.query.code;
			this.$message.success('pagination执行Created方法:' + this.autId);
        	this.getAllFunction();
        	this.getAllSystem();
		},
		mounted() {
		},
		computed: {
			changedParams() {
        		let obj = {
					autId: this.autId,
					currentPage: this.currentPage,
					orderColumns: 'modified_time',
					orderType: 'desc',
					pageSize: this.pageSize
				}
				return obj;
			},
			dialogTitle() {
				let titleArray = ['添加功能点','导入','修改功能点','操作失败','该系统无功能点,请添加功能点'];
				return titleArray[this.dialogModelFlag];
			},
			dialogOperateButton() {
				let buttonArray = ['新增','确定','修改','确定','新增'];
				return buttonArray[this.dialogModelFlag];
			}
		},
		methods: {
			/**
			 * 顶部按钮方法
			 **/
			addFunctionButton() {
				let _this = this;
				_this.isAdded = true;
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
				if(_this.selectedRowIndex === ''){
					_this.$message.error('请先选中一个功能点');
				}else {
					_this.dialogModelFlag = 2;
					_this.dialogVisible = true;
					_this.isAdded = false;
					const {
						nameMedium,
						code,
						descShort
					} = _this.rowInfo;
					this.ruleForm = {
						nameMedium,
						code,
						descShort
					};
				}
			},
			copyFunction(){
				let _this = this;
				if (_this.selectedRowIndex === ''){
					_this.failedOperation();
				} else{
					if (_this.rowInfo.transType === '接口') {
						console.log('复制功能点',_this.rowInfo.transType);
						Request({
							url: '/transactController/copySingleInterfaceTransact',
							method: 'POST',
							params: {
								autId: _this.autId,
								creatorId: "3",
								transId: _this.updateId
							}
						}).then(res => {
							console.log('复制成功',res);
							if (res.respCode) {
								_this.$message.success(res.respMsg)
								_this.getAllFunction();
								_this.selectedRowIndex = '';
							}else {
								console.log('复制失败');

							}
						}).catch(err => {
							console.log('复制失败',err)
						});
					}else if (_this.rowInfo.transType === 'UI') {
						console.log('复制UI功能点',_this.rowInfo.transType);
						Request({
							url: '/transactController/copySingleUITransact',
							method: 'POST',
							params: {
								autId: _this.autId,
								creatorId: "3",
								elementRepositoryId: _this.elementRepositoryId,
								objectRepositoryId: _this.objectRepositoryId,
								transId: _this.updateId
							}
						}).then(res => {
							console.log('复制Ui成功',res);
							if (res.respCode) {
								_this.$message.success(res.respMsg)
								_this.getAllFunction();
								_this.selectedRowIndex = '';
							}else {
								console.log('复制失败');
							}

						}).catch(err => {
							console.log('复制UI失败',err)
						})
					}
				}
			},
			//操作失败对话框
			failedOperation() {
				let _this = this;
				_this.dialogModelFlag = 3;
				_this.dialogFailVisible = true;
			},
			/**
			 * 更换选择id
			 */
			changeAutId(index) {
				// console.log('选择内容',this.ownedSystem,index);
				for(let i = 0; i < this.autRespDTOList.length;i++){
					if (this.autRespDTOList[i].nameMedium === index){
						this.autId = this.autRespDTOList[i].id;
						break;
					}
				}
				// console.log('autId',this.autId)
				this.getAllFunction();
			},
			/**
			 * 表格方法
			 */
			selectRow(index,row){
				let _this = this;
				_this.rowInfo = row;
				_this.selectedRowIndex = index;
				_this.updateId = row.id;
				_this.elementRepositoryId = _this.rowInfo.elementRepositoryId;
				_this.objectRepositoryId = _this.rowInfo.objectRepositoryId;
				console.log('选中的行'+_this.rowInfo.transType,_this.elementRepositoryId,_this.objectRepositoryId);
			},
			/**
			 * 表单相关操作
			 */
			// 共用属性
			cancelButton() {
				let _this = this;
				_this.dialogImportVisible = false;
				_this.dialogVisible = false;
				_this.dialogFailVisible = false;
			},
			handleOnChange(file) {
				this.$message.success(`选择文件成功`);
				this.fileName = file.name;
			},
			handleBeforeClose(done) {
				// console.log('debug:调用handleBeforeClose' +done);
				done();
				return true;
			},
			//导入文件相关
			downloadTemplate() {
				window.location.href  = this.address4+'atfcloud2.0a/transactController/downloadTemplate';
			},
			handleRemove(file,fileList) {
				// console.log('file:',file,fileList)
				this.fileName = '删除' + file.name;
			},
			handlePreview(file) {
				// console.log('file:' + file);
				this.fileName = '点击' + file.name;
			},
			handleExceed(file, fileList) {
				this.$message.warning(`只允许上传1个文件`);
			},
			/*
			 * 底部分页
			 */
        	handleSizeChange(val) {
        		// console.log(`pagination每页${val}条`);
        		this.pageSize = val;
        		this.getAllFunction();
			},
        	handleCurrentChange(val) {
        		// console.log(`pagination当前页${val}`);
        		this.currentPage = val;
        		this.getAllFunction();
			},
			/**
			 * 获取全部的List
			 */
			getAllSystem(){
				Request({
					url: '/aut/queryListAut',
					method: 'POST',
					params: {}
				}).then(res => {
					// console.log('获取成功',res);
					this.autRespDTOList = res.autRespDTOList;
					// console.log('本地',this.autRespDTOList)
				}).catch(err => {
					console.log('获取失败',err);
				})
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
					// console.log('获取res',res);
					if (res.list.length === 0){
						this.dialogModelFlag = 4;
						this.dialogVisible = true;
						this.tableData = [];
					} else {
						for (let i =0; i < res.list.length; i++){
							if (res.list[i].transType == 1){
								res.list[i].transType = 'UI';
							}else {
								res.list[i].transType = '接口';
							}
						}
						this.tableData = res.list;
						this.totalCount = res.totalCount;
					}

				},(err)=>{
					console.log('pagination查询出错' + err)
				}).catch((err)=>{
					console.log('pagination查询出错'+ err)
				});
			},
			submitForm(formName){
				let _this = this;
				let status = (_this.ruleForm.nameMedium === '');
				this.$message.info(`nameMedium: ${_this.ruleForm.nameMedium}
									functionType: ${_this.ruleForm.functionType}
									code: ${_this.ruleForm.code}
									descShort: ${_this.ruleForm.descShort}`);
				if (status) {
					this.$message.warning('*为必填项');
				}else {
					_this.$refs[formName].validate((valid) => {
						if (valid) {
							if (document.getElementById('buttonName').innerText =='新增') {
								if (_this.ruleForm.functionType === 'UI'){
									Request({
										url: '/transactController/addSingleTransact',
										method: 'POST',
										params: {
											autId: _this.autId,
											code: _this.ruleForm.code,
											descShort: _this.ruleForm.descShort,
											nameMedium: _this.ruleForm.nameMedium
										}
									}).then(res => {
										console.log('添加成功',res);
										_this.dialogVisible = false;
										_this.successDialogVisible = true;
										_this.getAllFunction();
									}).catch(err => {
										console.log('添加失败',err);
										if (err.respCode == '10011000') {
											_this.$message.error(err.respMsg);
										}
									});
								} else {
									Request({
										url: '/interface/addSingleInterface',
										method: 'POST',
										params: {
											creatorId: "3",
											description: _this.ruleForm.descShort,
											interfaceCode: _this.ruleForm.code,
											name: _this.ruleForm.nameMedium,
											systemId: _this.autId
										}
									}).then(res => {
										console.log('接口添加成功',res);
										_this.dialogVisible = false;
										_this.getAllFunction();
									}).catch(err => {
										console.log('接口添加失败',err);
										if (err.respCode == '10011000') {
											_this.$message.error(err.respMsg);
										}
									});
								}
							}else if (document.getElementById('buttonName').innerText == '修改') {
								Request({
									url: '/transactController/modifySingleTransact',
									method: 'POST',
									params: {
										code: _this.ruleForm.code,
										descShort: _this.ruleForm.descShort,
										id: _this.updateId,
										nameMedium: _this.ruleForm.nameMedium
									}
								}).then(res => {
									console.log('修改成功',res);
									_this.dialogVisible = false;
									_this.getAllFunction();
								}).catch(err => {
									console.log('添加失败',err);
									if (err.respCode ==='10011000') {
										this.$message.warning(err.respMsg)
									}
								});
							}
						}else {
							console.log('验证失败')
						}

					});
				}
			},
			//操作成功对话框
			cancelButtonClicked(){
				this.dialogVisible = false;
				this.successDialogVisible = false;
			},
		}
	}
</script>

<style scoped>
	.formFoot{
		text-align: center;
		overflow: hidden;
		margin: 20px auto -15px 13%;

	}

	.spanTextColor{
		color: red;
		font-size: 25px;
		margin-top: 10px;
	}
	.spanRow{
		margin-left: 10px;
	}
	.headerRow{
		margin: 0px auto -8px 0px;
		clear: both;
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
	.dialogBottom,.dialogImportBottom,.dialogFailBottom{
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
	.failContent{
		height: fit-content;
		font-size: 16px;
		margin: -10px auto;
		font-weight: bold;
	}
	.dialogFailBottom{
		height: fit-content;
		margin-bottom: -40px;
	}
	.btnSelectFile{
		margin: 5px -5px 20px 10px;
	}
</style>
