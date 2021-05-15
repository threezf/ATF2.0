<template>
<div class="class-checkCode">
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
</div>
</template>

<script>
export default {
	name: "checkCode",
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
		customCode: {
			set(value){
				console.log('customCode changed')
				this.$store.commit('setCustomCode',value)
			},
			get(){
				return this.$store.state.customCode
			}
		},
	},
	data(){
		return {
			respCodeList:[
				{
					id:0,
					value:'200'
				},
				{
					id:1,
					value:'302'
				},
				{
					id:2,
					value:'404'
				},
				{
					id:3,
					value:'500'
				},
				{
					id:4,
					value:'502'
				},
				{
					id:5,
					value:'自定义'
				},
			]
		}
	}
}
</script>

<style lang="less" scoped>
.class-checkCode{
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
