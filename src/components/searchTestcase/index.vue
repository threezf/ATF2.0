<template>
	<div>
		<div>
			<el-button
				size="small"
				@click='addSearchCondition'
				type="primary"
				icon="el-icon-plus">
				添加筛选条件
			</el-button>
			<el-button
				size="small"
				v-if="conditionFlag"
				@click='searchAll'
				type="primary"
				icon="el-icon-search">
				搜索
			</el-button>
			<el-button
				size="small"
				v-if="conditionFlag"
				@click='noSearch'
				type="primary"
				icon="el-icon-refresh-left">
				取消筛选
			</el-button>
			<div class='searchRow' v-for='(condition,index) in conditionList' :key="searchTestcase">
				<el-select v-model="condition.propertyName" @change='itemChange(condition)' placeholder="请选择筛选项目">
					<el-option
						v-for="item in propertyNameOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="condition.compareType" placeholder="筛选操作" @change='valueChange(condition)'>
					<el-option
						v-for="item in compareTypeOptions[condition.propertyName]"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-input v-if='valueType(condition)' v-model="condition.propertyValueList[0]" placeholder="比较值"
									@change='valueChange(condition)'></el-input>
				<el-select v-else-if='getConf(condition).multiple' v-model="condition.propertyValueList" placeholder="比较值"
									 :multiple='true' @change='valueChange()'>
					<el-option
						v-for="item in getConf(condition).itemList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select v-else v-model="condition.propertyValueList[0]" placeholder="比较值" @change='valueChange(condition)'>
					<el-option
						v-for="item in getConf(condition).itemList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-button
					size="small"
					@click='deleteSearchCondition(searchTestcase)'
					type="primary"
					icon="el-icon-delete">
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	import {PropertyNameOptions, CompareTypeOptions} from './conf.js'

	export default {
		components: {},
		mixins: [VueMixins],
		data() {
			return {
				propertyNameOptions: PropertyNameOptions,
				compareTypeOptions: CompareTypeOptions,
				searchTestcase: '',
				conditionList: [],
				conditionFlag:false
			}
		},

		watch: {},
		mounted() {
			//得到被测系统数据
			Request({
				url: "/aut/queryListAut",
				method: "get",
				params: {}
			}).then(resp => {
				let options = []
				resp.autRespDTOList.forEach(item => {
					options.push({
						value: item.id,
						label: item.nameMedium,
					})
				})
				this.compareTypeOptions.autId.forEach(item => {
					item.itemList = options
				})
			})
			//得到测试任务数据
			Request({
				url: "/missionController/pagedBatchQueryTestMission",
				method: "post",
				params: {
					currentPage: 1,
					pageSize: 10000,
					orderColumns: "modified_time",
					orderType: "desc",
					nameMedium: "",
					descMedium: "",
					codeLong: ""
				}
			})
				.then(
					res => {
						let options = []
						res.list.forEach(item => {
							options.push({
								value: item.id,
								label: item.nameMedium,
							})
						})
						this.compareTypeOptions.missionId.forEach(item => {
							item.itemList = options
						})
					})
			//得到用例性质数据
			this.compareTypeOptions.caseProperty.forEach(item => {
				item.itemList = [{
					value: "1",
					label: "正常值"
				},
					{
						value: "2",
						label: "错误值"
					},
					{
						value: "3",
						label: "边界值"
					},
					{
						value: "4",
						label: "要素级"
					},
					{
						value: "5",
						label: "流程级"
					}]
			})
			//得到测试用例类型数据
			this.compareTypeOptions.caseType.forEach(item => {
				item.itemList = [
					{
						value: "1",
						label: "联机"
					},
					{
						value: "2",
						label: "批量"
					},
					{
						value: "3",
						label: "接口"
					}
				]
			})
			//得到优先级数据
			this.compareTypeOptions.priority.forEach(item => {
				item.itemList = [
					{
						value: "1",
						label: "1级"
					},
					{
						value: "2",
						label: "2级"
					},
					{
						value: "3",
						label: "3级"
					},
					{
						value: "4",
						label: "4级"
					},
					{
						value: "5",
						label: "5级"
					},
					{
						value: "6",
						label: "6级"
					},
					{
						value: "7",
						label: "级"
					},
					{
						value: "8",
						label: "8级"
					},
					{
						value: "9",
						label: "9级"
					}
				]
			})
			//得到用户数据
			Request({
				url: "/userController/selectAllUsername",
				method: "post",
				params: {}
			}).then(resp => {
				let options = []
				resp.list.forEach(item => {
					options.push({
						value: item.id,
						label: item.username,
					})
				})
				this.compareTypeOptions.author.forEach(item => {
					item.itemList = options
				})
				this.compareTypeOptions.reviewer.forEach(item => {
					item.itemList = options
				})
			})
			//得到脚本管理方式数据
			this.compareTypeOptions.scriptModeFlag.forEach(item => {
				item.itemList = [
					{
						value: "1",
						label: "模板"
					}
				]
			})
			//得到执行方式数据
			this.compareTypeOptions.executeMethod.forEach(item => {
				item.itemList = [
					{
						value: "1",
						label: "手工"
					},
					{
						value: "2",
						label: "自动化"
					},
					{
						value: "3",
						label: "配合"
					}
				]
			})
		},
		computed: {
			compareType() {
				return caseCompositeType.filter()
			}
		},
		methods: {
			//筛选用例
			searchAll(){
				var _this=this
				var filterType=1
				var conditionListM=[]
				this.conditionList.forEach(item=>{
					conditionListM.push(item)
				})
				// conditionListM=this.conditionList
				// //  conditionList[0]={propertyName: "caseCompositeType",compareType:"=",propertyValueList:['1']}
				conditionListM.push({propertyName: "caseLibId",compareType:"=",propertyValueList:[sessionStorage.getItem("caselibId")]})
				// console.log(this.conditionList)
				Request({
					url: "/testcase/pagedQueryTestCaseByCondition",
					method: "post",
					params: {
						filterType:filterType,
						conditionList: conditionListM,
						currentPage: 1,
						pageSize: 5,
						orderType:"asc",
						orderColumn: 'id',
						caseLibId: sessionStorage.getItem('caselibId')
					}
				})
					.then(
						res => {
							this.$emit('getComponentData', res.testcaseViewRespDTOList)
							this.$emit('getTotalCount', res.totalCount)
							// _this.testCaseList = res.testcaseViewRespDTOList;
							// _this.currentPage=1;
							// _this.tt = res.totalCount;
							// _this.totalPage = res.totalPage;
							// _this.pageSize = _this.pageSize;
							// console.log(_this.conditionList)

						},
						err => {
							this.$alert('搜索用例失败', '失败', {
								confirmButtonText: '确定',
							});
						}
					)
					.catch(err => {
						this.$alert('搜索用例失败', '失败', {
							confirmButtonText: '确定',
						});
					});
			},
      //取消筛选
			noSearch(){
				var filterType=1
				Request({
					url: "/testcase/pagedQueryTestCaseByCondition",
					method: "post",
					params: {
						filterType:filterType,
						conditionList: [{propertyName: "caseLibId",compareType:"=",propertyValueList:[sessionStorage.getItem("caselibId")]}],
						currentPage: 1,
						pageSize: 5,
						orderType:"asc",
						orderColumn: 'id',
						caseLibId: sessionStorage.getItem('caselibId')
					}
				})
					.then(
						res => {
							this.$emit('getComponentData', res.testcaseViewRespDTOList)
							this.$emit('getTotalCount', res.totalCount)
							// _this.testCaseList = res.testcaseViewRespDTOList;
							// _this.currentPage=1;
							// _this.tt = res.totalCount;
							// _this.totalPage = res.totalPage;
							// _this.pageSize = _this.pageSize;
							// console.log(_this.conditionList)

						},
						err => {
							this.$alert('搜索用例失败', '失败', {
								confirmButtonText: '确定',
							});
						}
					)
					.catch(err => {
						this.$alert('搜索用例失败', '失败', {
							confirmButtonText: '确定',
						});
					});
			},
			valueType(condition) {

				console.log('模态框李经理1', condition.propertyName)
				console.log('模态框李经理1.5', this.getConf(condition))
				console.log('模态框李经理2', this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v => (v.value == condition.compareType)).length !== 0 && this.compareTypeOptions[condition.propertyName].filter(v => (v.value == condition.compareType))[0].itemType)
				return !(this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v => (v.value == condition.compareType)).length != 0 && this.compareTypeOptions[condition.propertyName].filter(v => (v.value == condition.compareType))[0].itemType)
			},
			addSearchCondition() {
				this.conditionFlag=true
				this.conditionList.push({
					propertyName: '请选择',
					compareType: '',
					propertyValueList: [undefined]
				})
			},
			deleteSearchCondition(index) {
				if (this.conditionList.length === 0) {
					this.$message('只剩最后一个筛选条件')
					return
				}
				this.conditionList.splice(this.searchTestcase, 1)
				if (this.conditionList.length === 0) {
					this.conditionFlag=false
				}
				this.valueChange()
			},
			getConf(condition) {
				return this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v => (v.value == condition.compareType)).length !== 0 && this.compareTypeOptions[condition.propertyName].filter(v => (v.value == condition.compareType))[0]
			},
			itemChange(condition) {
				condition.compareType = undefined;
				condition.propertyValueList = [undefined];
			},
			valueChange(item) {
				if (item) {
					if (!(item.compareType && item.propertyName && item.propertyValueList.length > 0 && item.propertyValueList[0])) {
						return
					}
				}

			},
		},
		created() {

		},
	};
</script>
<style lang="less" scoped>
	.el-input {
		width: 200px !important;
	}

	.searchRow {
		margin-top: 10px;
	}
</style>
