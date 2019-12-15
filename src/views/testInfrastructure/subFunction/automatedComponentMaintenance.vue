<template>
    <div class='page-base-inner' style='background-color: whitesmoke'>
		<el-container>
			<el-main>
				<div class='topDiv'>
					<el-form>
						<el-form-item label='控件名称' label-width='200px'>
							<el-select v-model='selectedControlsName' @change='changeControlName'>
								<el-option
									v-for='(item,index) in controlsName'
									:key='index'
									:value='item.name'
								></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
				<div class='mainDiv'>
					<el-row class='topRowStyle'>控件类型</el-row>
					<hr width='100%' color='#F5F5F5'/>
					<el-form>
						<!--参数上面部分-->
						<el-row class='rowStyle'>
							<el-col :span='10' :offset='0'>
								<el-form-item label='英文名称' label-width='200px'>
								<el-input class='formMain' v-model='englishName'></el-input>
							</el-form-item>
							</el-col>
							<el-col :span='10' :offset='2'>
								<el-form-item label='中文名称' label-width='200px'>
									<el-input class='formMain' v-model='chineseName'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='10' :offset='0'>
								<el-form-item label='描述' label-width='200px'>
									<el-input class='formMain' v-model='description'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span='10' :offset='2'>
								<el-form-item label='默认方法' label-width='200px'>
									<el-select class='formMain' v-model='selectDefaultMethod'>
										<el-option
											v-for='(item,index) in defaultMethods'
											:value='item'
											:key='index'
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='10' :offset='0'>
								<el-form-item label='继承标志' label-width='200px'>
									<el-select class='formMain' v-model='selectedExtendsFlag'>
										<el-option
											v-for='(item,index) in extendsFlag'
											:value='item'
											:key='index'
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span='10' :offset='2'>
								<el-form-item label='继承可见性' label-width='200px'>
									<el-select class='formMain' v-model='selectedExtendsVisible'>
										<el-option
											v-for='(item,index) in extendVisible'
											:value='item'
											:key='index'
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='7' :offset='0' style='height: 40px'>
								<el-form-item label='展示方法信息' label-width='200px'>
									<el-select class='presentMethodInfo' v-model='selectedDisplayMethodInformation'>
										<el-option
											v-for='(item,index) in displayMethodInformation'
											:value='item'
											:key='index'
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-button
								type='primary'
								size='small'
							>确定</el-button>
							<el-button
								type='danger'
								size='small'
								plain
							>取消</el-button>
						</el-row>

						<el-row style='margin-top: 20px'>
							<el-col :span='10' :offset='0'>
								<el-row style='height: 30px; margin: 10px auto 15px auto'>
									<label class='rowLabel'>运行时参数</label>
									<el-button
										type='primary'
										size='mini'
										icon='el-icon-plus'
										plain
									></el-button>
									<el-button
										type='primary'
										size='mini'
										plain
										icon='el-icon-minus'
									></el-button>
								</el-row>
								<div class='smallTableStyle'>
									<el-table
										class='tableStyle'
										ref="singleTable"
										stripe
										border
										highlight-current-row
										:data='paramsData'>
										<el-table-column
											label=''
											width='50px'
										></el-table-column>
										<el-table-column
											prop=''
											label='属性名'
											width='230px'
										></el-table-column>
										<el-table-column
											prop=''
											label='属性值'
											width='230px'
										></el-table-column>
									</el-table>
								</div>
							</el-col>
							<el-col :span='10' :offset="2">
								<el-row style='height: 30px; margin: 10px auto 15px auto'>
									<label class='rowLabel'>运行时参数</label>
									<el-button
										type='primary'
										size='mini'
										icon='el-icon-plus'
										plain
									></el-button>
									<el-button
										type='primary'
										size='mini'
										plain
										icon='el-icon-minus'
									></el-button>
								</el-row>
								<div class='smallTableStyle'>
									<el-table
										class='tableStyle'
										ref="singleTable"
										stripe
										border
										highlight-current-row
										:data='paramsData'>
										<el-table-column
											label=''
											width='50px'
										></el-table-column>
										<el-table-column
											prop=''
											label='属性名'
											width='230px'
										></el-table-column>
										<el-table-column
											prop=''
											label='属性值'
											width='230px'
										></el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>

						<el-row>
							<el-col :offset='0' :span='10'>
								<el-row style='height: 30px; margin: 10px auto 15px auto'>
									<label class='rowLabel'>运行时参数</label>
									<el-button
										type='primary'
										size='mini'
										icon='el-icon-plus'
										plain
									></el-button>
									<el-button
										type='primary'
										size='mini'
										plain
										icon='el-icon-minus'
									></el-button>
								</el-row>
								<div class='smallTableStyle'>
									<el-table
										class='tableStyle'
										ref="singleTable"
										stripe
										border
										highlight-current-row
										:data='paramsData'>
										<el-table-column
											label=''
											width='50px'
										></el-table-column>
										<el-table-column
											prop=''
											label='属性名'
											width='230px'
										></el-table-column>
										<el-table-column
											prop=''
											label='属性值'
											width='230px'
										></el-table-column>
									</el-table>
								</div>
							</el-col>
							<el-col :span='10' :offset='2'>
								<el-row style='height: 30px; margin: 10px auto 15px auto'>
									<label class='rowLabel'>运行时参数</label>
									<el-button
										type='primary'
										size='mini'
										icon='el-icon-plus'
										plain
									></el-button>
									<el-button
										type='primary'
										size='mini'
										plain
										icon='el-icon-minus'
									></el-button>
								</el-row>
								<div class='smallTableStyle'>
									<el-table
										class='tableStyle'
										ref="singleTable"
										stripe
										border
										highlight-current-row
										:data='paramsData'>
										<el-table-column
											label=''
											width='50px'
										></el-table-column>
										<el-table-column
											prop=''
											label='属性名'
											width='230px'
										></el-table-column>
										<el-table-column
											prop=''
											label='属性值'
											width='230px'
										></el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span='20' :offset='0'></el-col>
							<el-col>
								<el-button
									type='primary'
									size='small'
									class='saveButton'
								>保存</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
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
        name: "automatedComponentMaintenance",
		data() {
        	return {
        		extendsFlag: ['-请选择-','自身控件','禁用','重定义'],//继承标志
				selectedExtendsFlag: '-请选择-',
        		extendVisible: ['-请选择-','公有','私有'],//继承可见性
				selectedExtendsVisible: '-请选择-',
				displayMethodInformation: [],//展示方法信息
				selectedDisplayMethodInformation: '',
				paramsData: [],
				identifyData: [],
				selfIdentifyData: [],
				auxiliaryIdentifyData: [],
				autId: '',//被测系统管理传值
				controlsName: [],//空间名称
				selectedControlsName: '',
				defaultMethods: ['-选择默认方法-'],//默认方法
				selectDefaultMethod: '',
				englishName: '',//
				chineseName: '',//
				description: '',//
				id: '',//查询所需id
			}
		},
		created() {
			this.autId = this.$route.query.id;
			this.queryAutVisibleOmClasses(0);

			// this.selectedControlsName = this.controlsName[0].name;
		},
		computed: {},
		methods: {
			//更换基础控件时调用的方法
			changeControlName(){
				let _this = this;
				let index = -1;
				for (let i = 0; i<_this.controlsName.length; i++){
					if (_this.controlsName[i].name === _this.selectedControlsName)  {
						index = i;
						break;
					}
				}
				_this.queryAutVisibleOmClasses(index);
			},
			queryAutVisibleOmClasses(index) {
				let _this = this;
				Request({
					url: '//aut/queryAutVisibleOmClasses',
					method: 'POST',
					params: {
						id: _this.autId
					}
				}).then(res => {
					console.log('数据获取成功',res);
					_this.controlsName = res.omClassRespDTOList;
					console.log('存储数据',_this.controlsName);
					_this.selectedControlsName = _this.controlsName[index].name;
					_this.englishName = _this.selectedControlsName;
					_this.chineseName = _this.controlsName[index].chsName;
					_this.description = _this.controlsName[index].descShort;
					_this.id = _this.controlsName[index].id;
					_this.setFormById(_this.id);
				}).catch(err => {
					console.log('数据获取失败',err)
				});
			},
			setFormById(value) {
				let _this = this;
				Request({
					url: '/arcClass/queryArcVisibleOmMethods',
					method: 'POST',
					params: {
						id: value
					}
				}).then(res => {
					if (res.respCode ==='0000') {
						console.log('数据查询成功',res);
						if (res.arcMethodRespDTOList.length === 0){
							_this.$message.warning('数据不存在');
						}else {
							_this.defaultMethods = [];
							_this.displayMethodInformation = [];
							for (let i = 0; i< res.arcMethodRespDTOList.length; i++){
								_this.defaultMethods.push(res.arcMethodRespDTOList[i].name);
								_this.displayMethodInformation.push(res.arcMethodRespDTOList[i].name);
								_this.selectedDisplayMethodInformation = _this.displayMethodInformation[0];
								console.log('添加数据',res.arcMethodRespDTOList[i].name);

							}
						}
						_this.selectDefaultMethod = _this.defaultMethods[0];
					}

				}).catch(err => {
					console.log('数据查询失败',err)
				});
			}
		},
	}
</script>

<style scoped>
	.rowLabel{
		font-size: 14px;
		margin: 0px 340px auto 114px;
	}
	.smallTableStyle {
		width: fit-content;
		margin-top: -10px
	}
	.saveButton{
		float: right;
		margin-right: 170px;
		margin-top: 10px;
	}
	.tableStyle{
		width: fit-content;
		margin-left: 120px;
		border-top: 1px solid #f5f5f5;
		margin-top: -10px;
	}
	.topDiv{
		width: 100%;
		height: 60px;
		margin: -10px 0px 15px auto;
		background-color: white;
		padding: 10px;
	}
	.mainDiv {
		height: 1000px;
		background-color: white;

	}
	.topRowStyle {
		padding-top: 10px;
		margin-left: 15px;
		font-size: 16px;
		height: 40px;
	}
	.rowStyle {
		margin-top: 15px;
	}
	.formMain {
		width: 400px;
	}
	.presentMethodInfo {
		width: 250px;
	}
</style>
