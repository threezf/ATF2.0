<template>
	<el-table
		:data="tableData"
		row-key="id"
		border
		default-expand-all
		:tree-props="{children: 'children', hasChildren: 'hasChildren'}">
		<el-table-column property="paramName" label="参数名" minWidth="200">
			<template slot-scope="scope">
				<el-input style="width: 100px" v-model="scope.row.paramName" size="mini" placeholder="参数名">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column v-if="tableType===0" property="type" label="类型" header-align="center" minWidth="100">
			<template slot-scope="scope">
				<el-select v-model="scope.row.type" size="mini">
					<el-option v-for="(item,index) in paramTypeList" :key="index" :value="item.id" :label="item.value">
					</el-option>
				</el-select>
			</template>
		</el-table-column>
		<el-table-column v-else property="type" label="类型" header-align="center" minWidth="100">
			<template slot-scope="scope">
				<el-select v-model="scope.row.type" size="mini">
					<el-option v-for="(item,index) in paramTypeXML" :key="index" :value="item.id" :label="item.value">
					</el-option>
				</el-select>
			</template>
		</el-table-column>
		<el-table-column property="checkContentType" label="内容校验"  header-align="center" minWidth="150">
			<template slot-scope="scope">
				<el-select  v-if="scope.row.type ===2||scope.row.type ===6" v-model="scope.row.checkContentType" size="mini">
					<el-option v-for="(item,index) in checkContentListShort" :key="index" :value="item.id" :label="item.value">
					</el-option>
				</el-select>
				<el-select  v-else v-model="scope.row.checkContentType" size="mini">
					<el-option v-for="(item,index) in checkContentList" :key="index" :value="item.id" :label="item.value">
					</el-option>
				</el-select>
			</template>
		</el-table-column>
		<el-table-column property="expectResult" label="预期结果" minWidth="200">
			<template slot-scope="scope">
				<el-input v-model="scope.row.expectResult" size="mini" placeholder="预期结果">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column label="操作" header-align="center" width="200" align="center">
			<template slot-scope="scope">
				<el-button type="text" size="mini" @click.native="addChildRow(scope.row)">添加子字段
				</el-button>
				<el-button type="text" size="mini" @click.native="delTableRow(scope.row)">删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import {ParamTypeOptions,CheckContentOptions,CheckContentOptionsShort} from '@/config/testInfrastructure/checkResult/checkResultConf'
export default {
	name: "checkRulesTable",
	props:{
		tableType: {
			type: Number,
			default:0
		}
	},
	data() {
		return {
			tableData: [],
			paramTypeList:ParamTypeOptions,
			paramTypeXML:[
				{
					id:0,
					value:'object'
				}
			],
			checkContentList:CheckContentOptions,
			checkContentListShort:CheckContentOptionsShort,
			newId:0,
		}
	},
	methods:{
		addChildRow(row){
			if (row.parentId ===0){
				this.tableData.forEach((item)=>{
					if (item.id ===row.id){
						this.newId =this.newId+1
						item.children.push({id:this.newId,parentId: row.id,paramName: '', type: 0, checkContentType: 0, expectResult: '',children:[]})
					}
				})
			}else {
				this.addGrandRow(this.tableData,row)
			}
		},
		addGrandRow(arr,row){
			arr.forEach((item) =>{
				if (item.id === row.parentId){
					item.children.forEach((i)=>{
						if (i.id ===row.id){
							this.newId =this.newId+1
							i.children.push({id:this.newId,parentId: row.id,paramName: '', type: 0,
								checkContentType: 0, expectResult: '',children:[]})
						}
					})
					}else{
						this.addGrandRow(item.children,row)
				}
			})
		},
		addTableRow(){
			if(this.tableData.length ===0){
				this.newId=0
				this.tableData.push({id:0,parentId: 0,paramName: '', type: 0, checkContentType: 0, expectResult: '',children:[]});
			}else {
				this.newId =this.newId+1
				this.tableData.push({id:this.newId,parentId: 0,paramName: '', type: 0, checkContentType: 0, expectResult: '',children:[]});
			}
		},
		delTableRow(row){
			console.log(row)
			if (row.parentId ===0){
				console.log(this.tableData)
				let data= this.tableData.filter(function (x){
					return x.id !== row.id
				})
				this.tableData =data
				console.log('data',data)
			}else {
				this.tableData = this.delChildRow(this.tableData,row)
			}
		},
		delChildRow(arr,row){
			arr.forEach((item) =>{
				if(item.id ===row.parentId){
					console.log('test1')
					item.children = item.children.filter(function (x) {
						return x.id !== row.id
					})
				}else {
					console.log('test2')
					item.children = this.delChildRow(item.children,row)
					console.log(item.children)
				}
			})
			return arr
		}
	},
	created() {
		if (this.tableData.length===0){
			this.newId=0
			this.tableData = Array();
		}
	},
	computed: {
		monitorParams() {
			return this.tableData;
		},
	},
	watch: {
		monitorParams: {
			handler: function () {
				console.log('tableData change')
				if (this.tableData.length === 0) {
					this.addTableRow()
				}
				if (this.tableData[this.tableData.length - 1]['paramName'] || this.tableData[this.tableData.length - 1]['expectResult']) {
					this.addTableRow()
				}
			},
			deep: true
		},
	}
}
</script>

<style scoped>

</style>
