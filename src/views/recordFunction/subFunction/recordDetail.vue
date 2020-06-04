<template>
  <div class="page-base-inner">
		<el-container>
			<el-main>
				<el-row class="topRow">
					<el-form
						:model="titleForm"
						label-width="80px"
						class="titleFormStyle">
						<el-col :span="12">
							<el-form-item
								label="被测系统">
								<el-select
									v-model="titleForm.selectedSystem"
									@change="handleSelectChange">
									<el-input
										v-model="titleForm.searchSystem">
									</el-input>
									<el-option
										v-for="item in searchedSystem(autRespDTOList)"
										:key="item.id"
										:value="item.id"
										:label="item.nameMedium">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item
								label="功能点">
								<el-select
									v-model="titleForm.selectedFunc">
									<el-input
										v-model="titleForm.funcSearch">
									</el-input>
									<!--<el-option>-->
									<!--</el-option>-->
								</el-select>
							</el-form-item>
						</el-col>
					</el-form>
					<el-button
						type="primary"
						size="small"
						icon="el-icon-upload"
						>录制规则录入
					</el-button>
					<el-button
						type="primary"
						size="small"
						icon="el-icon-download"
						>录制工具下载
					</el-button>
				</el-row>
				<el-tabs
					type="border-card"
					class="mainTab">
					<el-tab-pane
						class="detailTabPane"
						label="详情">
						<el-form
							class="detailForm"
							label-width="60px"
							:model="detailForm">
							<el-form-item
								label="编码">
								<el-input
									v-model="detailForm.code">
								</el-input>
							</el-form-item>
							<el-form-item
								label="名称">
								<el-input
									v-model="detailForm.nameMedium">
								</el-input>
							</el-form-item>
							<el-form-item
								label="描述">
								<el-input
									type="textarea"
									v-model="detailForm.descShort">
								</el-input>
							</el-form-item>
							<div class="buttonDiv">
								<el-button
									type="warning"
									size="small"
									plain
									>取消
								</el-button>
								<el-button
									type="success"
									size="small"
									@click="modifySingleTransact"
									>修改
								</el-button>
							</div>
						</el-form>
						<div class="copyRightDiv">
							Copyright © 1998－2019 BUPT All Rights Reserved
							教育部信息网络工程研究中心 版权所有
						</div>
					</el-tab-pane>
					<el-tab-pane
						label="元素库">
						<element-library ></element-library>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Request from "@/libs/request.js";
	import VueMixins from "@/libs/vueMixins.js";
	import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
	import elementLibrary from '@/components/transactDetail/elementLibrary'
	export default {
		components: { ElSlPanel },
		mixins: [VueMixins], // 混入
    name: "recordDetail",
		data() {
    	return {
				autId: '', //获取数据所需要的autId
				id: '', // 获取数据所需要的id
				titleForm: {
					selectedSystem: '', // 选择的被测系统
					searchSystem: '', // 搜索被测系统
					selectedFunc: '', // 选择的功能点
					funcSearch: '', // 搜索功能点
				}, // 头部表单
				autRespDTOList: [], //被测系统列表
				funcList: [], // 功能点列表
				detailForm: {
					code: '', // 编码
					nameMedium: '', // 名称
					descShort: '' // 描述
				}, // 详情表单
			}
		},
		created() {
    	this.autId = this.$route.query.autId
    	this.queryListAut()
    	this.querySingleTransact(this.autId)
		},
		methods: {
			queryListAut() {
				Request({
					url: '/aut/queryListAut',
					method: 'POST',
					params: {}
				}).then(res => {
					if (res.respCode === '0000') {
						this.autRespDTOList = res.autRespDTOList
						console.log('autRespDTOList'.this.autRespDTOList);
					}
				}).catch(err => {
					this. $message.error('网络连接失败')
				})
			},
			// 通过autId查询id
			queryTransactsByAutId(autId) {
				let _this = this;
				Request({
					url: '/transactController/queryTransactsByAutId',
					method: 'POST',
					params: {
						id: autId
					}
				}).then(res => {
					if (res.respCode === '0000') {
						_this.id = res.transactRespDTOs[0].id
						console.log('handleSelectChange',res,_this.id);
						_this.querySingleTransact(_this.id)
					}else {
						this.$message.warning(res.respMsg)
					}
				}).catch(err => {
					this.$message.error('网络连接失败')
				})
			},
    	//查询详情
			querySingleTransact(getId) {
				Request({
					url: '/transactController/querySingleTransact',
					method: 'POST',
					params: {
						id: getId + ''
					}
				}).then(res => {
					if(res.respCode === '0000') {
						console.log(res);
						this.detailForm.code = res.code
						this.detailForm.nameMedium = res.nameMedium
						this.detailForm.descShort = res.descShort
					}else {
						console.log(res.respMsg);
					}
				}).catch(err => {
					this.$message.error('网络连接失败')
				})
			},
			// 查询到的系统
			searchedSystem(list) {
				let _this = this;
				// 注意此处应该返回filter执行后的结果
				return list.filter(function (item) {
					if (item.nameMedium.includes(_this.titleForm.searchSystem)) {
						return item
					}
				})
			},
			// 更换系统时
			handleSelectChange(val) {
				this.queryTransactsByAutId(val)
			},
			// 修改功能
			modifySingleTransact() {
				console.log(this.id);
				Request({
					url: '/transactController/modifySingleTransact',
					method: 'POST',
					params: {
						code: this.detailForm.code,
						descShort: this.detailForm.descShort,
						id: this.id,
						nameMedium: this.detailForm.nameMedium
					}
				}).then(res => {
					if (res.respCode === '0000') {
						this.$message.success(res.respMsg)
					}else {
						this.$message.warning('功能点编码与该被测系统下的其他功能点重复')
					}
				}).catch(err => {
					this.$message.error('功能点编码与该被测系统下的其他功能点重复')
				})
			}
		},
		components: {
			'element-library': elementLibrary
		}
  }
</script>

<style lang="less" scoped>
	.topRow {
		.titleFormStyle {
			width: 600px;
			height: 40px;
			margin-right: 30px;
		}
		.el-button {
			margin-left: 10px;
		}
	}
	.mainTab {
		margin-top: 5px;
		.detailTabPane {
			width: 800px;
			.detailForm {
				margin-left: 160px;
				width: 460px;
				.buttonDiv {
					text-align: center;
				}
			}
			.copyRightDiv {
				width: 300px;
				color: #797979;
				font-size: 13px;
				line-height: 20px;
				text-align: center;
				margin: 20px auto;
			}
		}
	}
</style>
