<template>
	<div class="test-data">
		<el-row>
			<el-col :span="3">
				<el-button
					class="add-data"
					@click="addDataRow"
					type="primary"
					size="small"
				>
					<i class="el-icon-plus"></i>添加数据集
				</el-button>
			</el-col>
			<el-col :span="3">
				<el-button
					class="add-data"
					@click="addVariable"
					type="primary"
					size="small"
				>
					<i class="el-icon-plus"></i>添加变量
				</el-button>
			</el-col>
			<el-col :span="18">
				<el-button
					class="add-data"
					@click="saveData"
					type="primary"
					size="small"
					v-if="copyShow"
				>保存
				</el-button>
			</el-col>
		</el-row>
		<div @contextmenu.prevent>
			<el-table height="520px" border stripe highlight-current-row :data="tableData" :cell-class-name='cellClassName' @cell-dblclick='tdedit' @cell-click='tdchoose'>
				<el-table-column prop="dataRowName" label="数据集名称">
					<template slot-scope="scope">
						<el-row style="display: flex">
							<div v-if="scope.row.index === rowIndex && scope.column.index === columnIndex && dbeditFlag" style="width: 100%">
								<el-input class='editArea' type="textarea" @blur='loseblur(scope.row,scope.column)' :autosize="{ minRows: 1, maxRows: 3}" v-model="scope.row.dataRowName">
								</el-input>
							</div>
							<div v-else style="width: 100%">{{ scope.row.dataRowName }}</div>
							<el-dropdown trigger="click" @command="handleCommand">
								<i class="el-icon-more"></i>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{id:0,data:scope.row}">复制</el-dropdown-item>
									<el-dropdown-item :command="{id:1,data:scope.$index}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column v-for="(item,index) in tableHeader" :key="index" :label="item[0]" width="200">
					<template slot-scope="scope">
						<div v-if='scope.row.index === rowIndex && scope.column.index === columnIndex && dbeditFlag'>
							<el-input class='editArea' type="textarea" :ref='"_"+scope.row.index+"_"+scope.column.index' @blur='loseblur(scope.row,scope.column)':autosize="{ minRows: 1, maxRows: 3}" v-model="scope.row[item[0]]">
							</el-input>
						</div>
						<div v-else>{{ scope.row[item[0]] }}</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="添加变量" :visible.sync="dialogVisible" :before-close="handleClose" width="40%">
			<el-form label-width="80px" label-position='top'>
				<el-form-item label="变量名称" class="change-label-class">
					<el-row class="info">多个变量之间使用换行分割，只需要填写${key}内的key即可。</el-row>
					<el-input
						type="textarea"
						:rows="4"
						v-model="variableData"
					></el-input>
				</el-form-item>
				<el-form-item>
					<div class="dialogBottom">
						<el-button id="buttonName" type="primary" size="small" @click="submitData">确定
						</el-button>
						<el-button type="danger" size="small" plain @click="cancelButtonClicked">取消
						</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import Request from "@/libs/request.js";
export default {
	name: "index",
	data() {
		return {
			variableData:'',
			dialogVisible: false,
			varData:[],
			tableHeader: [
				["${userName}"],
				["${password}"],
				["${login_status}"],
				["${logout_status}"],
			],
			menuVisible: false,
			tableData: [
				{
					dataRowName:"数据集1",
					"${userName}":"zhx",
					"${password}":"111111",
					"${login_status}":0,
					"${logout_status}":0,
				},
				{
					dataRowName:"数据集2",
					"${userName}":"zhx",
					"${password}":"",
					"${login_status}":0,
					"${logout_status}":1,
				},
			],
			rowdata: {},
			columndata: undefined,
			rowColumn: '',
			rowIndex: -1, //选中的行
			columnIndex: -1, //选中的列
			dbeditFlag: false,//双击可编辑标志
			copyShow: false
		}
	},
	methods: {
		handleCommand(command) {
			if (command.id === 0){
				const copyName = '副本-'+command.data.dataRowName
				const data = {...command.data}
				data.dataRowName = copyName
				console.log(data)
				this.tableData.push(data)
			}else {
				console.log(command.data)
				this.tableData.splice(command.data, 1);
			}
			this.copyShow = true
		},
		// 给row 和 column 添加数据
		cellClassName({
										row,
										column,
										rowIndex,
										columnIndex
									}) {
			row.index = rowIndex
			column.index = columnIndex
			if (rowIndex === this.rowIndex && columnIndex === this.columnIndex) {
				return 'choosed'
			}
		},
		tdedit(row, column, cell, event) {
			console.log("dbclick")
			this.dbeditFlag = true
			const _this = this
			console.log(row.index + '_' + column.index)
			let rowColumn = "_" + row.index + '_' + column.index
			// 当输入框渲染出时，获得焦点
			setTimeout(function () {
				_this.$refs[rowColumn][0].focus()
			}, 1)

		},
		loseblur() {
			this.dbeditFlag = false
		},
		//单击选中单元格
		tdchoose(row, column, cell, event) {
			console.log(row)
			console.log(column)
			console.log(cell)
			console.log(event)
			this.rowIndex = row.index
			this.columnIndex = column.index
		},
		handleClose(done){
			done()
			return true
		},
		addDataRow(){
			let data = {
				dataRowName:'新数据集'
			}
			this.tableHeader.forEach(item => {
				data[item[0]] = ""
			})
			console.log(data)
			this.tableData.push(data)
			this.copyShow = true
		},
		cancelButtonClicked(){
			this.dialogVisible = false
		},
		addVariable(){
			this.dialogVisible = true
		},
		submitData(){
			this.varData = []
			let arr = this.variableData.split("\n")
			arr.forEach(item => {
				item = '${' + item + '}'
				this.varData.push(item)
			})
			console.log("data:",this.varData)
			Request({
				url: '/scriptTemplate/scriptParameterized',
				method: 'POST',
				params: {

				}
			}).then(res => {
				if(res.respCode === '0000') {
					this.$message.success("添加成功")
				}
			}).catch(error => {
				console.log("添加失败", error)
			})
		},
		saveData(){

		}
	}
}
</script>

<style scoped>
.test-data {
	padding: 10px;
}
.add-data {
	margin: 0 0 0 20px;
}
.info {
	font-size: 15px;
	color: #999999;
}
.dialogBottom{
	display: flex;
	justify-content: center;
}
.change-label-class /deep/ .el-form-item__label {
	padding: 0;
	margin-bottom: 0;
	line-height: 30px;
	font-weight: bold;
}
</style>
