<template>
	<el-form :inline="true" class="demo-form-inline" style="margin-top: 10px; display: flex; align-items: center;">
		<el-radio-group v-model="bodyType">
			<el-radio label= '0' >form-data</el-radio>
			<el-radio label= '1' >raw</el-radio>
		</el-radio-group>
		<el-button type="primary" size="mini"
							 v-show="bodyType === '1'"
							 style="margin-left:20px"
							 @click="formatData()">格式化

		</el-button>
		<el-button size="mini" type="text" style="margin-top: -10px" @click="downloadTemplate">下载模板</el-button>
	</el-form>
	<hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);"/>

	<div v-if="bodyType === '1'">
		<div class="request-content">
			<div class="row">
				<label class="label">内容类型</label>
				<el-select v-model="typeSelect" size="mini">
					<el-option
						v-for="(type, index) in typeOptions"
						:key="index"
						:value="type.value"
						:label="type.label">
					</el-option>
				</el-select>
				<el-button type="text" size="mini" icon="el-icon-document-copy">
					复制
				</el-button>
				<el-button type="text" size="mini" icon="el-icon-download">
					下载
				</el-button>
			</div>
			<editor
				v-contextmenu:contextmenu
				style="font-size: 15px"
				v-model="jsonVariable"
				@init="editorInit"
				:lang="typeSelect"
				theme="chrome"
				width="100%"
				height="200px"
				:options="{showPrintMargin:false,   //去除编辑器里的竖线
                                }"
			>
			</editor>
		</div>
	</div>
	<el-button type="primary" size="small" @click="importTemplate">导入
	</el-button>
	<el-table :data="bodys"
						size="mini"
						stripe :show-header="true"
						border
						style="background-color: rgb(250, 250, 250)"
						v-if="bodyType === '0'"
						:row-style="{'background-color': 'rgb(250, 250, 250)'}">
		<el-table-column label="KEY" header-align="center" minWidth="100">
			<template slot-scope="scope">
				<el-input v-model="scope.row.name" size="mini">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column label="TYPE" header-align="center" width="100">
			<template slot-scope="scope">
				<el-select v-model="scope.row.type" size="mini">
					<el-option v-for="item in paramTypes" :key="item" :value="item">
					</el-option>
				</el-select>
			</template>
		</el-table-column>
		<el-table-column label="VALUE" header-align="center" minWidth="200">
			<template slot-scope="scope">
				<div v-if="scope.row.type === 'file'">
					<el-row>
						<el-col :span="18">
							<el-input v-model="scope.row.val" size="mini" :disabled="true">
							</el-input>
						</el-col>
						<el-col :span="5" style="padding-left:10px;">
							<el-upload
								class="upload-demo"
								:action="uploadUrl"
								:show-file-list='false'
								:auto-upload="false"
								:limit="1"
								accept=".xlsx"
								:before-upload="beforeUpload"
								:file-list="fileList"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:on-exceed="handleExceed"
								:on-change="handleOnChange"
								:on-success="fileChange">
								<el-button size="mini" type="primary"
													 @click="tempNum(scope.$index)">点击上传
								</el-button>
							</el-upload>
						</el-col>
					</el-row>
				</div>
				<div v-else>
					<el-input v-model="scope.row.val"
										:id="'data_input' + scope.$index "
										type="textarea"
										rows=1
										@focus="showLine('data_input', scope.$index)"
										@input="changeLine()"
										@blur="resetLine()"
										size="mini"
										resize="none">
					</el-input>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="DESCRIPTION" header-align="center" minWidth="80">
			<template slot-scope="scope">
				<el-input v-model="scope.row.desc" size="mini">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column property="value" label="操作" header-align="center" width="80" align="center">
			<template slot-scope="scope">
				<el-button type="danger" icon="el-icon-delete" size="mini"
									 @click.native="delTableRow(scope.$index)">
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	<v-contextmenu ref="contextmenu">
		<v-contextmenu-item @click="handleClick">clear</v-contextmenu-item>
	</v-contextmenu>
</template>

<script>
import Request from '@/libs/request.js'
export default {
	name: "bodyTab",
	components: {
		editor: require('vue2-ace-editor'),
	},
	props:{
		bodys:{
			type:Array,
			default: () => []
		},
		bodyType:{
			type:String,
			default: '0'
		},
		jsonVariable:{
			type:String,
			default:JSON.stringify({name: 'demo'})
		}
	},
	data() {
		return {
			paramTypes: ['string', 'file'],
			fileList: [],
			typeSelect: 'json',
			typeOptions: [{
				label: 'JSON',
				value: 'json'
			}, {
				label: 'XML',
				value: 'xml'
			}, {
				label: 'HTML',
				value: 'html'
			}, {
				label: 'TEXT',
				value: 'text'
			}],
		}
	},
	methods:{
		editorInit() {
			require('brace/theme/chrome')
			require('brace/ext/language_tools') //language extension prerequsite...
			require('brace/mode/html')
			require('brace/mode/json')
			require('brace/mode/xml')
			require('brace/snippets/json')
			require('brace/snippets/html')
			require('brace/snippets/xml')
		},
		formatData() {
			// 格式化json字符串
			try {
				this.jsonVariable = JSON.parse(this.jsonVariable);
				this.jsonVariable = JSON.stringify(this.jsonVariable, null, 4);
			} catch (err) {
				this.$message({
					showClose: true,
					message: 'json格式错误',
					type: 'warning',
				});
			}
		},
		handleClick() {
			this.jsonVariable = ''
		},
		handleRemove(file, fileList) {
			// console.log('file:',file,fileList)
			this.fileName = "删除" + file.name;
			this.fileList.splice(0, 1)
		},
		handlePreview(file) {
			// console.log('file:' + file);
			this.fileName = "点击" + file.name;
		},
		handleExceed(file, fileList) {
			this.$message.warning(`只允许上传1个文件`);
		},
		handleOnChange(file) {
			this.$message.success(`选择文件成功`);
			this.fileName = file.name;
			this.fileList.push(file)
		},
		tempNum(i) {
			this.temp_num = i;
		},
		resetLine() {
			//  重置单元格高度
			this.cell.style.height = '18px';
		},
		showLine(prefix, n) {
			//  获取单元格的滚动条高度，并使单元格为该高度
			this.cell = document.getElementById(prefix + n);
			this.cell.style.height = this.cell.scrollHeight + 'px';
		},
		changeLine() {
			//  当单元格高度和滚动条高度不一致时，改变单元格高度
			if (this.cell.style.height !== this.cell.scrollHeight + 'px') {
				let i = parseInt(this.cell.style.height.substring(0, this.cell.style.height.length - 2));
				if (i - this.cell.scrollHeight === 2) {
					//  为true时，为减少高度操作
					this.cell.style.height = (i - 18) + 'px'
				} else {
					this.cell.style.height = this.cell.scrollHeight + 'px';
				}

			}
		},
		beforeUpload(file) {
			console.log(file)
			var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
			const extension2 = testmsg === 'xlsx'
			if(!extension2) {
				this.$message({
					message: '上传文件只能是xlsx格式!',
					type: 'warning'
				});
			}
			return extension2
		},
		fileChange(response, file) {
			if (response['status'] === 0) {
				this.$confirm('服务器已存在相同名字文件，是否覆盖?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log('本地存储')
					let form = new FormData();
					form.append("file", file.raw);
					form.append("skip", '1');
					this.$axios.post('/interfaceNewController/uploadInterfaceBody', form).then((response) => {
							this.$message({
								showClose: true,
								message: response.data['msg'],
								type: 'success',
							});
							this.bodys[this.temp_num]['value'] = response.data['data'];
						}
					);
				}).catch(() => {

				});
			} else {
				if (response['msg']) {
					this.$message({
						showClose: true,
						message: response['msg'],
						type: 'success',
					});
				}
				this.bodys[this.temp_num]['value'] = response['data'];
			}

		},
		importTemplate() {
			console.log("importTemplate");
			let formData = new FormData();

			formData.append("file", this.fileList[0].raw);
			Request({
				url: "/interfaceNewController/uploadInterfaceBody",
				method: "POST",
				params: formData
			})
				.then((res) => {
					console.log('导入成功')
					this.$message.success(res.respMsg);
				})
				.catch((res) => {
					this.$message.error("上传失败");
				});
		},
		downloadTemplate() {
			window.location.href = "http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/downloadTemplate"
		},
		delTableRow(type, i) {
				this.bodys.splice(i, 1);
		},
		addTableRow(type) {
				this.bodys.push({name: null, val: null, type: 'string', desc: null});
		},
	},
	computed:{
		uploadUrl() {
			return 'http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/uploadInterfaceBody'
		},
		monitorBodys() {
			return this.bodys;
		},
	},
	watch: {
		monitorBodys: {
			handler: function () {
				console.log('bodys change')
				if (this.bodys.length === 0) {
					this.addTableRow()
				}
				if (this.bodys[this.bodys.length - 1]['name'] || this.bodys[this.bodys.length - 1]['val']) {
					this.addTableRow()
				}
			},
			deep: true
		},
		params: {
			handler(newVal) {
				console.log(newVal)
				this.jsonVariable = typeof newVal === 'string'? JSON.stringify(JSON.parse(newVal), null, 4): JSON.stringify(newVal, null, 4)
			},
			immediate: true
		},
	}
}
</script>

<style scoped>

</style>
