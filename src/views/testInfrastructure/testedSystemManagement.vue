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
				<el-panel
					id='advancedFunctions'
					type='primary'
					class="highFunction"
					v-if="!highIsActive"
					@click='showHighFunction'>
					>> 展示高级功能
				</el-panel>
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
								class='search'
								@click="getAllSystem(1)"
							>搜索</el-button>
						</el-col>
					</el-row>
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
						width="55">
						<template slot-scope="scope">
							<el-radio
								class="radio"
								v-model="radio"
								:label='scope.$index'
								@change='handleRadioChange(scope.$index,scope.row)'
							>&nbsp;</el-radio><!--调用时使用的是scope.row和scope.$index-->
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
							<a @click='toTransact(scope.$index,scope.row)' class='link' target=_self>{{scope.row.code}}</a>
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
					<el-form :rules='rules' :model='form' ref='form' status-icon>
						<el-form-item label="测试系统编号" label-width="100px" prop='code'>
							<el-input
								style='width: 330px'
								placeholder="请输入系统编号"
								v-model.lazy="form.code"></el-input>
							<span class='spanTextColor'>*</span>
						</el-form-item>
						<el-form-item label="测试系统名称" label-width="100px" prop='nameMedium'>
							<el-input
								style='width: 330px'
								placeholder="为空时自动生成"
								v-model.lazy="form.nameMedium"
							></el-input>
						</el-form-item>
						<el-form-item label="开发架构" label-width="100px" prop='inheriteArcId'>
							<el-select
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
						<el-form-item label="描述" label-width="100px" prop='descShort'>
							<textarea cols="45" rows="10" v-model.trim="form.descShort">
							</textarea>
						</el-form-item>
						<el-form-item>
							<div style="width: fit-content;float: right; margin: -10px 20px -20px auto">
								<el-button id='clickButton' type="primary" size="small" @click='submitForm("form")'>{{dialogOperateButton}}</el-button>
								<el-button size="small" @click='cancelButtonClicked'>取消</el-button>
							</div>
						</el-form-item>
					</el-form>
				</el-dialog>
				<!--操作成功对话框-->
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
							>管理功能点</el-button>
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
			let addCodeRule = (rule,value,callback) =>{
				if (this.form.code === ''){
					return callback(new Error('测试系统编号是必填项'));
				}else {
					callback();
				}
			};
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
					code: [{validator: addCodeRule,trigger: 'blur'}]
				},
				successDialogVisible: false,
				//被测系统信息
				autId: -1,
				index: 0,
				row: {},
				sendCode: '',
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
		mounted(){

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
				console.log('超链接',index,row);
				let _this = this;
				_this.id = row.id;
				console.log('id',_this.id);
				this.$router.push({path:'transact',query:{id:_this.id,code: row.code}});//界面跳转
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
				// for(let[key,value] of _this.abstractArchitectureInfo){
				// 	console.log('键对信息',key,value)
				// }
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
						// let obj = new Object();
						// obj.id = needData[i].id;
						// obj.name = needData[i].name;
						let id = needData[i].id;
						let name1 = needData[i].name;
						_this.abstractArchitectureInfo[id] = name1;
					}
					console.log('全局信息',res.architectureRespDTOList)
				}).catch(err => {
					console.log('查询开发架构失败',err);
				})
			},
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
		text-align: center;
		overflow: hidden;
		margin: 30px auto 10px 9%;
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
	.rowMargin{
		margin: 0px auto 20px 20px;
	}
</style>
