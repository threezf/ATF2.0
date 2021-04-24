<template>
	<div class="class-checkXML">
		<el-row>
			<span>HTTP Status Code： 校验</span>
		</el-row>
		<el-row>
			<el-select size="small" v-model="selectedCodeType">
				<el-option v-for="(item,index) in respCodeList" :key="index" :value="item.id" :label="item.value">
				</el-option>
			</el-select>
			<el-input v-if="selectedCodeType ===5" size="small" v-model="customCode"></el-input>
		</el-row>
		<el-row>
			<span>返回结果校验规则</span>
		</el-row>
		<CheckRulesTable :table-type="1"></CheckRulesTable>
	</div>
</template>

<script>
import {RespCodeOptions} from '@/config/testInfrastructure/checkResult/checkResultConf'
import CheckRulesTable from '../checkResult/checkRulesTable'
export default {
	name: "checkXML",
	components:{
		RespCodeOptions,
		CheckRulesTable
	},
	data() {
		return {
			selectedCodeType: 0,
			customCode: '',
			respCodeList: RespCodeOptions,
		}
	}
}
</script>

<style lang="less" scoped>
.class-checkXML{
	padding: 10px;
	color: grey;
	.el-select{
		width: 200px;
	}
	.el-input{
		width: 200px;
	}
}
</style>
