<template>
    <div class='page-base-inner' style='background-color: whitesmoke'>
		<el-container>
			<el-main>
				<div class='topDiv'>
					<el-form>
						<el-form-item label='控件名称' label-width='200px'>
							<el-select>
								<el-option value='selectOption1'></el-option>
								<el-option value='selectOption2'></el-option>
								<el-option value='selectOption3'></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
				<div class='mainDiv'>
					<el-row class='topRowStyle'>控件类型</el-row>
					<hr width='100%' color='#F5F5F5'/>
					<el-form>
						<el-row class='rowStyle'>
							<el-col :span='10' :offset='0'>
								<el-form-item label='英文名称' label-width='200px'>
								<el-input class='formMain'></el-input>
							</el-form-item>
							</el-col>
							<el-col :span='10' :offset='2'>
								<el-form-item label='中文名称' label-width='200px'>
									<el-input class='formMain'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='10' :offset='0'>
								<el-form-item label='描述' label-width='200px'>
									<el-input class='formMain'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span='10' :offset='2'>
								<el-form-item label='默认方法' label-width='200px'>
									<el-select class='formMain'>
										<el-option value='-选择默认方法-'></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='10' :offset='0'>
								<el-form-item label='继承标志' label-width='200px'>
									<el-select class='formMain'>
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
									<el-select class='formMain'>
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
									<el-select class='presentMethodInfo'>
										<el-option
											v-for='(item,index) in extendsFlag'
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
        		extendsFlag: ['-请选择-','自身控件','禁用','重定义'],
        		extendVisible: ['-请选择-','公有','私有'],
				paramsData: [],
				identifyData: [],
				selfIdentifyData: [],
				auxiliaryIdentifyData: []

			}
		},
		created() {
		},
		computed: {},
		methods: {},
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
		margin: 15px 0px;
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
