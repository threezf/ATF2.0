<template>
	<el-row>
		<span>Authorization Type</span>
		<el-select size="small" v-model="selectedAuthType">
			<el-option v-for="(item,index) in authorizationList" :key="index" :value="item.id" :label="item.value">
			</el-option>
		</el-select>
	</el-row>
</template>

<script>
export default {
	name: "authTab",
	props:{
		selectedAuthType:{
			type:Number,
			default: 1
		}
	},
	data(){
		return{
			authorizationList: [{
				id: 1,
				value: 'inherit auth from parent'
			},
				{
					id: 2,
					value: 'No Auth'
				},
				{
					id: 3,
					value: 'Bearer Token'
				},
				{
					id: 4,
					value: 'Basic Auth'
				},
				{
					id: 5,
					value: 'Digest Auth'
				},
				{
					id: 6,
					value: 'OAuth 1.0'
				},
				{
					id: 7,
					value: 'OAuth 2.0'
				},
				{
					id: 8,
					value: 'Hawk Authentication'
				},
				{
					id: 9,
					value: 'AWS Signature'
				},
				{
					id: 10,
					value: 'NTLM Authentication[Beta]'
				},
			],
		}
	}
}
</script>

<style scoped>

</style>
