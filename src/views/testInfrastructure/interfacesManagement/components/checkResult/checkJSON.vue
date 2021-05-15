<template>
	<div class="class-checkJSON">
		<!-- <el-row>
			<span>HTTP Status Code： 校验</span>
		</el-row> -->
		<el-row>
			<!-- <el-select size="small" v-model="selectedCodeType">
				<el-option v-for="(item,index) in respCodeList" :key="index" :value="item.id" :label="item.value">
				</el-option>
			</el-select> -->
			<el-input v-if="selectedCodeType ===5" size="small" v-model="customCode"></el-input>
		</el-row>
		<el-row>
			<span>JSON 根类型：</span>
		</el-row>
		<el-row>
			<el-select size="small" v-model="selectedJSONType">
				<el-option v-for="(item,index) in JSONTypeList" :key="index" :value="item.id" :label="item.value">
				</el-option>
			</el-select>
			<el-select v-if="selectedJSONType ===1" size="small" v-model="selectedArrayType">
				<el-option v-for="(item,index) in ArrayTypeList" :key="index" :value="item.id" :label="item.value">
				</el-option>
			</el-select>
		</el-row>
		<el-row>
			<span>返回结果校验规则</span>
		</el-row>
		<CheckRulesTable :table-type="0" ref="checkRules" ></CheckRulesTable>
	</div>
</template>

<script>
import {RespCodeOptions,JSONTypeOptions,ArrayTypeOptions} from '@/config/testInfrastructure/checkResult/checkResultConf'
import CheckRulesTable from '../checkResult/checkRulesTable'
export default {
	name: "checkJSON",
	components:{
		RespCodeOptions,
		JSONTypeOptions,
		ArrayTypeOptions,
		CheckRulesTable
	},
	// props: {
	// 	selectedCodeType: {
	// 		type: Number,
	// 		default:0
	// 	},
	// 	selectedJSONType: {
	// 		type: Number,
	// 		default:0
	// 	},
	// 	selectedArrayType: {
	// 		type: Number,
	// 		default:0
	// 	},
	// 	customCode: {
	// 		type: String,
	// 		default:''
	// 	},
	// 	assertionBody: {
	// 		type: String,
	// 		default:'[]'
	// 	},
	// },
	data() {
		return {
			respCodeList: RespCodeOptions,
			JSONTypeList:JSONTypeOptions,
			ArrayTypeList:ArrayTypeOptions,
		}
	},
	computed:{
		selectedCodeType: {
			set(value){
				console.log('selectedCodeType changed')
				this.$store.commit('setAssertionCheckType',value)
			},
			get(){
				return this.$store.state.assertionCheckType
			}
		},
		selectedJSONType: {
			set(value){
				console.log('selectedJSONType changed')
				this.$store.commit('setAssertionRootType',value)
			},
			get(){
				return this.$store.state.assertionRootType
			}
		},
		customCode: {
			set(value){
				console.log('customCode changed')
				this.$store.commit('setCustomCode',value)
			},
			get(){
				return this.$store.state.customCode
			}
		},
		selectedArrayType: {
			set(value){
				console.log('selectedArrayType changed')
				this.$store.commit('setSelectedArrayType',value)
			},
			get(){
				return this.$store.state.selectedArrayType
			}
		},
	},
	methods:{
		getSelectedCodeType(){
			console.log(this.selectedCodeType)
		}
	}
}
</script>

<style lang="less" scoped>
.class-checkJSON{
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
