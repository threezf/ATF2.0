<template>
	<div class="page-inner">
		<el-container>
			<el-main>
				<el-form ref="firstForm" class="fistForm" :model="firstForm" :rules="rules" label-width="100%">
					<el-row>
						<el-col :span="4" :offset="3">
							<el-input size="small" id="componentInput" v-model="automated" :disabled="true"
									  placeholder="选择的开发架构"></el-input>
						</el-col>
						<el-col :span="3" :offset="1">
							<el-button
								@click='componentFormButton'
								icon="el-icon-setting"
								size="small"
								type="primary">
								选择开发架构
							</el-button>
						</el-col>
						<el-col :span="6" :offset="2">
							<el-form-item label="控件名称" label-width="30%">
								<el-select v-model="classValue" placeholder="请选择控件" size="small">
									<el-option
										v-for="item in classList"
										:key="item.id"
										:label="item.name"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
<!--				<el-row class="classType">控件类型</el-row>-->
				<el-divider></el-divider>
				<el-form ref="secondForm" :model="secondForm" :rules="rules" label-width="100%">
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item   label="英文名称" prop="codeLong" label-width="30%" >
								<el-input   v-model="secondForm.codeLong" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="2">
							<el-form-item   label="中文名称" prop="codeLong" label-width="30%" >
								<el-input   v-model="secondForm.codeLong" size="small"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item   label="描述" prop="codeLong" label-width="30%" >
								<el-input   v-model="secondForm.codeLong" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="2">
							<el-form-item   label="默认方法" prop="codeLong" label-width="30%" >
								<el-input   v-model="secondForm.codeLong" size="small"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item   label="继承标志" prop="codeLong" label-width="30%" >
								<el-input   v-model="secondForm.codeLong" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :offset="2">
							<el-form-item   label="继承可见性" prop="codeLong" label-width="30%" >
								<el-input   v-model="secondForm.codeLong" size="small"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :offset="2">
							<el-form-item   label="展示方法信息" prop="codeLong" label-width="30%" >
								<el-input   v-model="secondForm.codeLong" size="small"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="18" >
							<el-form-item   label="运行时参数" prop="codeLong" label-width="24.5%" >
								<el-table
									stripe
									class='table'>
									<el-table-column
										label=""
										property="codeLong"
										width="180"/>
									<el-table-column
										label="属性名"
										property="codeLong"
										width="220"/>
									<el-table-column
										label="属性值"
										property="codeLong"
										width="220"/>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="18" >
							<el-form-item   label="支持的识别属性" prop="codeLong" label-width="24.5%" >
								<el-table
									stripe
									class='table'>
									<el-table-column
										label=""
										property="codeLong"
										width="180"/>
									<el-table-column
										label="属性名"
										property="codeLong"
										width="220"/>
									<el-table-column
										label="属性值"
										property="codeLong"
										width="220"/>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="18" >
							<el-form-item   label="自识别属性" prop="codeLong" label-width="24.5%" >
								<el-table
									stripe
									class='table'>
									<el-table-column
										label=""
										property="codeLong"
										width="180"/>
									<el-table-column
										label="属性名"
										property="codeLong"
										width="220"/>
									<el-table-column
										label="属性值"
										property="codeLong"
										width="220"/>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="18" >
							<el-form-item   label="辅助识别属性" prop="codeLong" label-width="24.5%" >
								<el-table
									stripe
									class='table'>
									<el-table-column
										label=""
										property="codeLong"
										width="180"/>
									<el-table-column
										label="属性名"
										property="codeLong"
										width="220"/>
									<el-table-column
										label="属性值"
										property="codeLong"
										width="220"/>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-dialog
					title="选择自动化架构"
					:visible.sync="dialogVisible"
					:before-close="handleClose"
					width="30%">
					<el-form ref="ComponentForm" :model="componentForm" :rules="rules" label-width="35%">
						<div class="custom-tree-container">
							<div class="block">
								<el-tree
									:data="componentData"
									show-checkbox
									node-key="id"
									accordion
									:expand-on-click-node="false"
									ref="tree"
									:props="defaultProps"
									:lazy="true"
									:load="loadTreeNode"
									@check-change="handleCheckChange">
									<span class="custom-tree-node" slot-scope="{ node, data }">
										<span>{{ node.label }}</span>
										<span>
											<el-button
												type="text"
												size="mini"
												@click="() => append(data)">
												Append
											</el-button>
											<el-button
												type="text"
												size="mini"
												@click="() => remove(node, data)">
												Delete
											</el-button>
										</span>
									</span>
								</el-tree>
							</div>
						</div>
						<el-form-item>
							<el-row>
								<el-col :span="1" :offset="15">
									<el-button type="primary" size="small" @click="submitComponentForm('componentForm')">确定</el-button>
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
				</el-dialog>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'

	export default {
		mixins: [VueMixins], // 混入
		data() {
			return {
				secondForm:{
					codeLong:'',
				},
				automated: '',
				componentData: [],
				classList:[],
				classValue:'',
				dialogVisible:false,
		        defaultProps:{
					children: "childNodeList",
					label: "name"
				},
				automated:"",
				flag:1,
			}
		},
		methods: {
			//添加节点
			append(data) {
				const newChild = {id: id++, label: 'testtest', children: []};
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},
			//删除节点
			remove(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},
			//展示自动化架构form
			componentFormButton(){
				this.dialogVisible=true
			},
			//提交自动化架构form
			submitComponentForm(formName){
				this.dialogVisible=false
			},
			//选择自动化架构
			handleCheckChange (data, checked, indeterminate) {
				/* 主要通过checked进行判断 */
				if (checked) {
					let arr = [data.id];
					this.$refs.tree.setCheckedKeys(arr)
				}
                this.automated=data.name
				document.getElementById("componentInput").style.color="black"
				Request({
					url: '/arcClass/queryArcVisibleOmClasses',
					method: 'post',
					params: {
						id: data.id
					}
				}).then((res) => {
					this.classList=res.arcClassRespDTOList
					this.classValue=this.classList[0]
				}, (err) => {
					console.log(err)
				}).catch((err) => {
					console.log(err)
				})
			},
			//加载树数据
			loadTreeNode(node,resolve){
				let self = this;
				console.log(node);
				if(node.level == 0) {
					Request({
						url: '/abstractArchitecture/queryArchitectureList',
						method: 'post',
					}).then((res) => {
						var componentChildData = res.architectureRespDTOList
						for (var i = 0; i < componentChildData.length; i++) {
							if (!componentChildData[i].parentArcId) {
								this.componentData.push(componentChildData[i])
								componentChildData.splice(i, 1)
								i--
							}
						}
						for (var i = 0; i < this.componentData.length; i++) {
							this.componentData[i].childNodeList = []
							for (var j = 0; j < componentChildData.length; j++) {
								if (componentChildData[j].parentArcId == this.componentData[i].id) {
									// componentChildData[j].childNodeList = null
									this.componentData[i].childNodeList.push(componentChildData[j])
								}
							}
						}
						resolve(this.componentData)
					}, (err) => {
						console.log(err)
					}).catch((err) => {
						console.log(err)
					})
				}else{
					this.flag=1
					for(var i = 0; i < this.componentData.length; i++){
						if(this.componentData[i].id==node.data.id){
								resolve(this.componentData[i].childNodeList)
							    this.flag=2
						}
						if(this.flag==1){
							resolve([])
						}
					}
				}
			},
		},

	}
</script>

<style scoped>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	.custom-tree-container{
		margin-bottom: 50px;
	}
	.classType{
		padding:5px 100px;
		/*color：#606266;*/
	}
	.fistForm{
		margin-bottom: 0;
	}
</style>
