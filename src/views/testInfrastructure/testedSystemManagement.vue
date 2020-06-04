/**
 * 被测系统管理
 */
<template>
	<div class="page-base-inner">
		<el-container>
			<el-row class='rowMargin'>
				<el-button
					type="primary"
					icon='el-icon-plus'
					size="small"
					@click="addButton">
					添加
				</el-button>
				<el-button
					type='primary'
					icon='el-icon-edit'
					size="small"
					@click="updateButton">
					修改
				</el-button>
				<span
					id='advancedFunctions'
					type='primary'
					class="highFunction"
					v-if="!highIsActive"
					@click='showHighFunction'>
					>> 展示高级功能
				</span>
				<span class='high' v-if="highIsActive">
					<el-button
						type='primary'
						icon='el-icon-s-tools'
						size="small"
						plain>
						管理功能点
					</el-button>
					<el-button
						type='primary'
						icon='el-icon-edit-outline'
						size="small"
						plain>
						配置系统数据
					</el-button>
					<el-button
						type='primary'
						icon='el-icon-s-tools'
						size="small"
						plain>
						自动化构件维护
					</el-button>
					<el-button
						type='primary'
						icon='el-icon-s-management'
						size="small"
						plain>
						执行代码管理
					</el-button>
					<el-button
						type='primary'
						icon='el-icon-setting'
						size="small"
						plain>
						移动端设备配置
					</el-button>
				</span>
				<span
					id="el-panelHidden"
					class="highFunction"
					type='primary'
					v-if="highIsActive"
					icon='el-icon-d-arrow-left'
					@click='showHighFunction'>
					隐藏高级功能
				</span>
			</el-row>
			<el-main class="el-main-base-inner">
				<el-row>
					<el-col
						:span="8">
						<el-input
							placeholder="请输入系统编号"
							v-model="selectInfo"
							clearable
							@clear="searchSystemClear"
							@keyup.enter.native="getAllSystem(1)">
							<el-button
								size="small"
								slot="append"
								icon="el-icon-search"
								@click="getAllSystem(1)">
							</el-button>
						</el-input>
					</el-col>
				</el-row>
				<el-table
					class='tableStyle'
					ref="singleTable"
					border
					stripe
					highlight-current-row
					:default-sort="{prop:'modifiedTime',order:'descending'}"
					:data="tableData"><!--highlight-current-row:当前选中行保持高亮	type='index'显示当前行号-->
					<el-table-column
						label="选择"
						min-width="5%">
						<template slot-scope="scope">
							<el-radio
								class="radio"
								v-model="radio"
								:label='scope.$index'
								@change='handleRadioChange(scope.$index,scope.row)'>&nbsp;
							</el-radio><!--调用时使用的是scope.row和scope.$index-->
						</template>
					</el-table-column>
					<el-table-column
						sortable
						type='index'
						label="序号"
						width="50px"
						align='center'>
					</el-table-column>
					<el-table-column
						prop="code"
						label="测试系统编号"
						min-width="20%"
						align="center">
						<template slot-scope="scope">
							<a 
								@click='toTransact(scope.$index,scope.row)' 
								class='link' 
								target=_self>{{scope.row.code}}
							</a>
						</template>
					</el-table-column>
					<el-table-column
						prop="nameMedium"
						label="测试系统名称"
						min-width="15%">
					</el-table-column>
					<el-table-column
						prop="inheriteArcName"
						label="开发架构"
						min-width="15%">
					</el-table-column>
					<el-table-column
						prop="descShort"
						label="测试系统描述"
						min-width="20%">
					</el-table-column>
					<el-table-column
						sortable
						prop="createTime"
						label="创建时间"
						:formatter="transTime"
						min-width="15%">
					</el-table-column>
					<el-table-column
						sortable
						prop="modifiedTime"
						label="修改时间"
						min-width="15%"
						:formatter="transTime">
					</el-table-column>
				</el-table>
				<el-pagination
					class="pagination"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[5,10,20,50]"
					:page-size="pageSize"
					:total="totalCount"
					layout="total,sizes,prev,pager,next,jumper">
				</el-pagination>
				<el-dialog
					:title="dialogTitle"
					:visible.sync="dialogVisible"
					:before-close="handleBeforeClose"
					width="30%">
					<el-form 
						:rules='rules' 
						:model='form' 
						ref='form'
						label-width="80px" 
						status-icon>
						<el-form-item 
							label="系统编号" 
							prop='code'>
							<el-input
								placeholder="请输入测试系统编号"
								v-model.lazy="form.code">
							</el-input>
						</el-form-item>
						<el-form-item 
							label="系统名称">
							<el-input
								placeholder="为空时自动生成"
								v-model.lazy="form.nameMedium"
							></el-input>
						</el-form-item>
						<el-form-item 
							label="开发架构" >
							<el-select
								class="addSelect"
								placeholder="--选择开发架构--"
								v-model='selectedAbstractArchitectureName'
								@change='setInheriteArcId'>
								<el-option
									v-for=' (value,key) in abstractArchitectureInfo'
									:value='value'
									:key='key'
								>{{value}}</el-option>
							</el-select>
						</el-form-item>
						<el-form-item 
							label="描述" 
							prop='descShort'>
							<el-input 
								type="textarea"
								rows="8"
								v-model.trim="form.descShort">
							</el-input>
						</el-form-item>
						<el-form-item
							class="buttons_row">
							<el-button 
								id='clickButton' 
								type="primary" 
								size="small" 
								@click='submitForm("form")'>
								{{dialogOperateButton}}
							</el-button>
							<el-button 
								size="small" 
								@click='cancelButtonClicked'>
								取消
							</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
				<!--操作成功对话框-->
				<el-dialog
					width='25%'
					title='添加成功'
					:visible.sync='successDialogVisible'
					:before-close='handleBeforeClose'>
					<el-form>
						<el-form-item 
							label-width='30px'>
							<h3>操作成功</h3>
						</el-form-item>
						<hr width='100%' color='#F5F5F5'/>
						<el-form-item 
							class='formFoot'>
							<el-button
								type='primary'
								size='small'
								@click='cancelButtonClicked'
								>确定
							</el-button>
							<el-button
								type='primary'
								size='small'
								@click="manageFunction"
								>管理功能点
							</el-button>
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
			//新建用户时添加的数据,表单相关数据
			form: {
				code: "",
				nameMedium: "",
				inheriteArcId: 9,
				descShort:'',
			},
			id: '',//修改测试系统信息时使用的id
			abstractArchitectureInfo: {},
			selectedAbstractArchitectureName: '截图',
			rules: {
				code: [
					{required: true, message: "系统编号是必填项", trigger: 'blur'}
				]
			},
			successDialogVisible: false,
			//被测系统信息
			autId: -1,
			index: 0,
			row: {},
			sendCode: '',
			manageId: '',// 跳转管理功能点需要的编号,
			manageCode: '' // 跳转管理功能点需要的code
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
		},
		dialogOperateButton() {
			let arr = ['添加','修改'];
			return arr[this.dialogModelFlag];
		}
	},
	created() {
		this.getAllSystem();
		this.getAbstractArchitectureList();
	},
	methods: {
		//点击展示和隐藏高级功能
		showHighFunction: function () {
			this.highIsActive = !this.highIsActive;
		},
		//添加按钮
		addButton(){
			this.form.code = '';
			this.form.nameMedium = "";
			this.form.inheriteArcId = 9;
			this.form.descShort = '';
			this.dialogModelFlag = 0;
			this.dialogVisible = true;
		},
		//修改按钮
		updateButton(){
			let _this = this;
			if (_this.radio === false) {
				this.$message.warning('请选择一条数据！！')
			}else {
				console.log('修改',_this.index,_this.row)
				_this.dialogModelFlag = 1;
				const {
					code,
					nameMedium,
					inheriteArcId,
					descShort
				} = _this.row;//注意此处是_this.row，调用的是操作过的row
				this.form = {
					code,
					nameMedium,
					inheriteArcId,
					descShort
				};
				_this.selectedAbstractArchitectureName = _this.abstractArchitectureInfo[this.form.inheriteArcId];
				console.log(inheriteArcId)
				_this.dialogVisible = true;
			}
		},
		//管理功能点
		manageFunction(){
			if (this.radio === false) {
				this.$message.warning('请选择一条数据！！')
			}else {
				// sessionStorage.setItem('value','this.currentPage');
				this.$router.push({path: 'transact',query:{id:this.id}});
			}
		},
		//配置系统数据
		configureData() {
			if (this.radio === false) {
				this.$message.warning('请选择一条数据！！')
			}else {
				this.sendCode = this.row.code;
				this.$router.push({path: 'autData',query:{id:this.id,code: this.sendCode}});
			}
		},
		//自动化构件管理
		automatedComponentMaintenance() {
			if (this.radio === false) {
				this.$message.warning('请选择一条数据！！')
			}else {
				this.$router.push({path: 'component',query:{id:this.id}});
			}
		},
		//执行代码管理
		codeManagement() {
			if (this.radio === false) {
				this.$message.warning('请选择一条数据！！')
			}else {
				console.log('执行代码管理',this.id);
				this.$router.push({path: 'execCode',query:{id:this.id}});
			}
		},
		cancelButtonClicked(){
			this.dialogVisible = false;
			this.successDialogVisible = false;
		},
		/**
			* 表格事件处理
			* handleRadioChange：监听Radio变化处理事件
			* toTransact：选择系统编号跳转

			*/
		handleRadioChange(index,row){
			console.log('Radio改变' , index,row);
			this.index = index;
			this.row = row;
			this.id = row.id;

		},
		toTransact(index,row) {
			// sessionStorage.setItem('case')
			let _this = this;
			_this.id = row.id;
			console.log('id',_this.id);
			this.$router.push({path:'transact',query:{id:_this.id,code: row.code}});//界面跳转
			console.log('code',row.code)
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
		//切换开发框架更换id
		setInheriteArcId() {
			let _this = this;
			console.log('信息',_this.abstractArchitectureInfo)
			Object.keys(_this.abstractArchitectureInfo).forEach(key=>{
				if (_this.abstractArchitectureInfo[key] === _this.selectedAbstractArchitectureName) {
					_this.form.inheriteArcId = key;
					console.log('迭代',_this.form.inheriteArcId,_this.abstractArchitectureInfo[_this.form.inheriteArcId]);
				}else {
					console.log('我啥也不知道',key,_this.abstractArchitectureInfo[key]);
				}
			});
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
				// console.log(this.tableData);
			},(err)=>{
				console.log(err);
			}
			).catch((err) =>{
				console.log(err);
			})
		},
		// input清空重新查询
		searchSystemClear() {
			this.getAllSystem();
		},
		//查询存在的开发架构
		getAbstractArchitectureList() {
			let _this = this;
			Request({
				url: '/abstractArchitecture/queryArchitectureList',
				method: 'POST',
				params: {}
			}).then(res => {
				let needData = res.architectureRespDTOList;
				for(let i = 0; i < needData.length;i++){
					let id = needData[i].id;
					let name1 = needData[i].name;
					_this.abstractArchitectureInfo[id] = name1;
				}
				console.log('全局信息',res.architectureRespDTOList)
			}).catch(err => {
				console.log('查询开发架构失败',err);
			})
		},
		// 表单提交
		submitForm(formName){
			let _this = this;
			let status = _this.form.code === '';
			if (status){
				this.$message.warning('*为必选项')
			}else{
				_this.$refs[formName].validate((valid) => {
					if (valid){
						if(document.getElementById('clickButton').innerText == '添加'){
							Request({
								url: '/aut/addSingleAut',
								method: 'POST',
								params:_this.form
							}).then(res=>{
								if(res.respCode == '0000'){
									_this.autId = res.autId;
									console.log('获取新加成功的autId',_this.autId);
									this.dialogVisible = false;
									_this.successDialogVisible = true;
									_this.manageId = res.autId;
									_this.manageCode = _this.form.code
								}
								console.log('添加成功',res);
								_this.getAllSystem();
							}).catch(err=>{
								if (err.respCode === '"10011111"') {
									this.$message.warning('系统名称已经存在');
								}
								console.log('添加失败',err)
							});
						}else {
							console.log(document.getElementById('clickButton').innerText,_this.id);
							console.log(_this.form.code,_this.form.descShort,_this.id,_this.form.inheriteArcId,_this.form.nameMedium)
							Request({
								url: '/aut/modifySingleAut',
								method: 'POST',
								params: {
									code: _this.form.code,
									descShort: _this.form.descShort,
									id: _this.id,
									inheriteArcId: _this.form.inheriteArcId,
									nameMedium: _this.form.nameMedium
								}
							}).then(res => {
								console.log('修改成功',res);
								this.$message.success('修改成功');
								_this.dialogVisible = false;
								_this.getAllSystem();
							}).catch(err =>
							{
								console.log('修改失败',err);
							});
						}
					}else {
						this.$message.warning('信息格式有误');
						return false;
					}
				});
			}
		},
		// 管理功能点
		manageFunction() {
			console.log('code:'+this.manageCode,'id:'+this.manageId)
			this.$router.push({path:'transact',query:{id:this.manageId,code: this.manageCode}});//界面跳转
		}
	}
}
</script>

<style scoped>
	.spanTextColor{
		color: red;
		font-size: 25px;
		margin-top: 10px;
	}
	.high{
		margin-left: 10px;
	}
	.footSelect,.formFoot{
		display: flex;
		justify-content: flex-end;
		text-align: center;
		overflow: hidden;
		margin-top: 10px;
		margin-bottom: -10px;
	}
	.formFoot{
		margin-bottom: -10px;
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
		width: 100%;
		margin: 10px auto;
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
	.rowMargin{
		margin: 0px auto 0px 20px;
	}
	/**添加对话框选择样式 */
	.addSelect {
		width: 100%;
	}
	/**添加取消按钮样式 */
	.buttons_row {
		display: flex;
		justify-content: flex-end;
		margin-top: -10px;
		margin-bottom: -15px;
	}
	/**底部分页*/
	.pagination {
		margin: 20px auto;
		text-align: center;
	}
</style>
