<template>
	<page style="padding-top: 0">
		<div class="page-inner" >
		<el-row>
			<el-col :span="8">
				<el-card shadow="never" style="background-color: rgba(243, 241, 238, 1)">
					<h2 style="margin-left: 4%; font-weight: bold">手机端</h2>
					<div style="margin-left: 4%;margin-top: 5px">
						<el-select v-model="phone" placeholder="请选择手机类型" style="width: 45%">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-button type="primary">选择手机</el-button>
						<el-button type="primary">刷新</el-button>
					</div>
					<div style="margin:10px 4% 10px 4%;">
						<el-card shadow="never" style="height:500px;"></el-card>
					</div>
				</el-card>
			</el-col>
			<el-col :span="8" class="slot2">
				<el-card shadow="never" style="height: 300px">
					<h2 style="margin-left: 4%; font-weight: bold">获取元素</h2>
					<el-tabs type="card" style="margin-top: 5px">
						<el-tab-pane label="Native">Native</el-tab-pane>
						<el-tab-pane label="dom">dom</el-tab-pane>
					</el-tabs>
				</el-card >
				<el-row style="height: 15px;background-color:rgba(228, 228, 228, 1) "></el-row>
				<el-card shadow="never" style="height:332px">
					<h2 style="margin-left: 4%; font-weight: bold">元素管理</h2>
					<el-table stripe :data="elementList" border class='table' style="margin: 5px 15px 0 15px;width:90%">
						<el-table-column type="selection" width="40px"/>
						<el-table-column label="元素" property="element" >
						</el-table-column>
						<el-table-column label="属性" property="arguments" />
						<el-table-column label="属性值" property='arguValue' />
						<el-table-column label="操作" width="120px">
							<template slot-scope="scope">
								<el-button size="mini"  type="info">编辑</el-button>
								<el-button size="mini">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-footer class="dialog-footer" style="margin-top: 5px">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
						</el-pagination>
					</el-footer>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="never" style="height:647px">
					<h2 style="margin-left: 4%; font-weight: bold">基础脚本</h2>
					<div>
						<el-row >
							<el-button size="mini" type="primary" icon="el-icon-plus" @click="addItemShow = true" >
								添加多项
							</el-button>
<!--						@click="deleteTemplateInfo"-->
							<el-button icon="el-icon-delete" size="mini" type="primary">
								删除
							</el-button>
<!--							@click="eleUp"-->
							<el-button icon="el-icon-arrow-up" size="mini" type="primary" >
								上移
							</el-button>
<!--							@click="eleDown"-->
							<el-button icon="el-icon-arrow-down" size="mini" type="primary" >
								下移
							</el-button>
<!--							@click="saveInfo"-->
							<el-button icon="el-icon-document" size="mini" type="primary" >
								保存
							</el-button>
<!--							@click="giveParam"-->
							<el-button icon="el-icon-printer" size="mini" type="primary">
								参数化
							</el-button>
						</el-row>
<!--						v-loading="templateLoading"-->
<!--						@selection-change="handleSelectionChange" row-key="name" class="sortable"-->
						<el-table border ref="multipleTable" :data="templateInfo" tooltip-effect="dark" style="width: 100%" height="500" >
							<el-table-column label="排序" >
								<template slot-scope="scope">
									<i :id="scope.row.date" class="el-icon-sort"></i>
								</template>
							</el-table-column>
							<el-table-column label="选择" type="selection" >
							</el-table-column>
							<el-table-column label="操作项"  prop="name">
							</el-table-column>
							<el-table-column label="方法" >
								<template slot-scope="scope">
									<el-select v-model="scope.row.methodName" placeholder="请选择" @change="changeMethod(scope.row)">
										<el-option v-for="item in methods[scope.row.elementWidget]" :key="item.id" :label="item.name" :value="item.name">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="arguments" label="参数">
								<template slot-scope="scope">
									<div v-if="scope.row.arguShow">
										<el-row v-for="item in scope.row.arguments" :key="item.index">
											<el-col :span="5">
												<span> 名称 </span>
											</el-col>
											<el-col :span="10">
												<span> 参数值 </span>
											</el-col>
										</el-row>
										<el-row v-for="item in scope.row.arguments" :key="item.name">
											<el-col :span="5" class="fixedHeight">
                                            <span>
                                                {{ item.name }}
                                            </span>
											</el-col>
											<el-col :span="10">
                                            <span>
                                                {{ item.value }}
                                            </span>
											</el-col>
										</el-row>
										<el-row>
											<el-button size="mini" type="primary" icon="el-icon-edit" @click="scope.row.arguShow = false" :disabled="showFlag">
												编辑
											</el-button>
										</el-row>
									</div>
									<div v-else>
										<el-row v-for="item in scope.row.arguments" :key="item.index">
											<el-col :span="5">
												<span> 名称 </span>
											</el-col>
											<el-col :span="10">
												<span> 参数值 </span>
											</el-col>
										</el-row>
										<el-row v-for="item in scope.row.arguments" :key="item.name">
											<el-col :span="5" class="fixedHeight">
                                            <span>
                                                {{ item.name }}
                                            </span>
											</el-col>
											<el-col :span="10">
												<el-input size="mini" @dragenter.stop.prevent="return false;" @dragover.stop.prevent="return false;" v-model="item.newvalue"></el-input>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="5">
												<el-button @click="
                            scope.row.arguments.forEach((v) => {
                              v.newvalue = v.value;
                            });
                            scope.row.arguShow = true;
                          " size="mini">
													取消
												</el-button>
											</el-col>
											<el-col :span="5">
												<el-button type="primary" size="mini" @click="
                            scope.row.arguments.forEach((v) => {
                              v.value = v.newvalue;
                            });
                            scope.row.arguShow = true;
                          ">
													确认
												</el-button>
											</el-col>
										</el-row>
									</div>
								</template>
							</el-table-column>
							<div slot="empty">暂无数据</div>
						</el-table>
					</div>
				</el-card>
			</el-col>
		</el-row>
		</div>
	</page>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	import testCaseManagement from "./testCaseManagement";
	import templateManage from '@/components/transactDetail/template'
	export default {
		mixins: [VueMixins], // 混入
		components: {
			templateManage
		},
		data() {
			return {
				active: 0,
				phone:'',
				options: [{
					value: '1',
					label: '小米8'
				}, {
					value: '2',
					label: '小米10'
				}],
				templateInfo:[],
				elementList:[],
				tt: 0, //总条数
				pageSize: 10, //页面大小
				currentPage: 1, //当前页
				totalPage: 1, //总页数
				listnum: 5, //页面大小
				totalCount:2,
			}
		},
		computed: {
			params() {
				let obj = {
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					codeLongAndName: "",
					orderColumns: "modified_time",
					orderType: "DESC",
					userId: sessionStorage.getItem("userId")
				}
				if (this.searchInput !== '') {
					obj[this.codeLongAndName] = this.searchInput
				}
				return obj
			},
			//根据modelFlag 展示弹窗的名字
			modelName() {
				var obj = {
					1: '添加测试项目',
					2: '修改测试项目信息'
				}
				return obj[this.modelFlag]
			},
			//用于展示弹窗按钮的文字
			buttonName() {
				var obj = {
					1: '添加',
					2: '确认'
				}
				return obj[this.modelFlag]
			}
		},
		created() {
			this.elementList=[{element:"提交",arguments:"class",arguValue:"button"},{element:"提交",arguments:"resourceId",arguValue:"111"}];
			this.templateInfo=[]
		},
		mounted() {},
		methods: {
			// 页码大小变化
			handleSizeChange(val) {
				this.pageSize = val
			},
			//当前页码数变化
			handleCurrentChange(val) {
				this.currentPage = val
			},
		}
	}
</script>
<style lang="less" scoped>
	.contain {
		margin:10px 20px;
	}
	.whiteButton{
		border: 1px solid #409EFF;
		width:35%;
		color:#409EFF
	}
</style>
<style>
	.slot2{
		margin-top: 10px;
	}
	.slot2 .el-card__body{
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
	.slot2 .el-tabs__nav-scroll{
		padding-left: 20px;
		padding-top: 10px;
		background-color: rgba(228, 228, 228, 1);

	}
	.slot2 .el-tabs--card>.el-tabs__header .el-tabs__item{
		background-color: white;
		margin-left: 5px;
		border-radius: 5px 5px 0 0;
		font-weight: bold;
	}
	.slot2 .el-tabs__content{
		padding:5px 20px
	}
	.slot2 .el-card{
		margin: 0;
	}
	.slot2 .el-button+.el-button{
		margin-left: 0;
	}
</style>
