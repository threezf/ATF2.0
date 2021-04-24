<template>
	<div class="class-checkMatch">
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
		<el-input
			type="textarea"
			:autosize="{ minRows: 4}"
			placeholder="请输入匹配表达式"
			v-model="matchText">
		</el-input>
	</div>
</template>

<script>
import {RespCodeOptions} from '@/config/testInfrastructure/checkResult/checkResultConf'
import CheckRulesTable from "./checkRulesTable";
export default {
	name: "checkMatch",
	components:{
		RespCodeOptions,
		CheckRulesTable
	},
	data() {
		return {
			selectedCodeType: 0,
			customCode: '',
			respCodeList: RespCodeOptions,
			matchText:''
		}
	}
}
</script>

<style lang="less" scoped>
.class-checkMatch{
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
