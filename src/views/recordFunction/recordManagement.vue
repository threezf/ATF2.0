<template>
  <div class="page-base-inner">
    <el-container>
      <el-header>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
		  		@click="addButton"
          >添加
        </el-button>

        <el-button 
          type="primary" 
          icon="el-icon-edit" 
          size="small"
          @click="updateButton" 
          >修改
        </el-button>

        <el-button 
          type="primary"
          icon="el-icon-s-tools" 
          size="small"
					@click="manageFunc"
          >管理功能点
        </el-button>

        <el-button
          type="primary" 
          icon="el-icon-download" 
          size="small"
					@click="downloadTools"
          >录制工具下载
        </el-button>
      </el-header>
      <el-main class="el-main-base-inner">
        <el-row>
          <el-col :span="3">
            <span
							class="spanRow"
							>测试系统
						</span>
          </el-col>
          <el-col :span="21">
						<el-input
							class="searchInfoStyle"
							placeholder="请输入测试系统编号"
							v-model="selectInfo">
							<el-button
								slot="append"
								icon="el-icon-search"
								@click="getAllSystem">
							</el-button>
						</el-input>
          </el-col>
			 </el-row>
        <el-table
          :default-sort="{prop:'createTime',order:'descending'}"
          :data="tableData"
          ref="singleTable"
					class="table"
          stripe
					border
          highlight-current-row>
          <!--highlight-current-row:当前选中行保持高亮-->
          <el-table-column
						label="选择"
						min-width="4%">
            <template slot-scope="scope">
              <el-radio
								class="radio"
								v-model="radio"
								:label="scope.$index"
								@change="selectRadio(scope.row,scope.$index)">&nbsp;
							</el-radio>
            </template>
          </el-table-column>
          <el-table-column
						prop="id"
						label="序号"
						min-width="6%"
						sortable>
					</el-table-column>
          <el-table-column
						label="测试系统编号"
						min-width="17%">
						<template
							slot-scope="scope">
							<a class="numberA"
								@click.prevent="toTransact(scope.row.id)"
								>{{scope.row.code}}
							</a>
						</template>
					</el-table-column>
          <el-table-column
						prop="nameMedium"
						label="测试系统名称"
						min-width="15%">
					</el-table-column>
          <el-table-column
						prop="inheriteArcName"
						label="开发架构"
						min-width="15%">
					</el-table-column>
          <el-table-column
						prop="descShort"
						label="测试系统描述"
						min-width="13%">
					</el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="15%"
            sortable
						:formatter="transTime">
					</el-table-column>
          <el-table-column
            prop="modifiedTime"
            label="修改时间"
            min-width="15%"
            :formatter="transTime"
						sortable>
					</el-table-column>
        </el-table>
				<div class="footSelect">
					<el-col :span="10" :offset="4">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="pageSizes"
							:page-size="pageSize"
							layout="total,sizes,prev,pager,next,jumper"
							:total="totalCount">
						</el-pagination>
					</el-col>
				</div>
      </el-main>
			<el-dialog :close-on-click-modal="false" 
				width="30%"
				:title="title[titleIndex]"
				:visible.sync="dialogVisible">
				<el-form
					ref="dialogForm"
					label-width="100px"
					:model="dialogForm">
					<el-form-item
						label="测试系统编号">
						<el-input
							v-model="dialogForm.code">
						</el-input>
					</el-form-item>
					<el-form-item
						label="测试系统名称">
						<el-input
							v-model="dialogForm.nameMedium">
						</el-input>
					</el-form-item>
					<el-form-item
						label="开发架构">
						<el-select
							v-model="dialogForm.inheriteArcId">
							<el-option
								v-for="(item) in inheriteArcs"
								:key="item.id"
								:label="item.value"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						label="描述">
						<el-input
							class="textarea"
							type="textarea"
							v-model="dialogForm.descShort">
						</el-input>
					</el-form-item>
					<div class="dialogButtonDiv">
						<el-button
							type="warning"
							size="small"
							@click="cancel"
							plain
							>取消
						</el-button>
						<el-button
							v-if="titleIndex === 0"
							type="primary"
							size="small"
							@click="addSure"
							>添加
						</el-button>
						<el-button
							v-else
							type="primary"
							size="small"
							@click="editSure"
							>修改
						</el-button>
					</div>
				</el-form>
			</el-dialog>
    </el-container>
  </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
export default {
  components: { ElSlPanel },
  mixins: [VueMixins], // 混入
  name: "recordManagement",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
			pageSizes: [5,10,20,50],
      totalCount: 50,
      tableData: [],
      radio: false, // 单选框默认
			selectedRow: {}, // 选中的行
      selectInfo: "", //搜索输入内容
      dialogModelFlag: 0,
      dialogVisible: false,
			title: ['添加测试系统','修改测试系统'],
			titleIndex: 0,
			dialogForm: {
				nameMedium: '', // 测试系统名称
				code: '', // 测试系统编号
				inheriteArcId: '', // 开发架构
				descShort: '', // 测试系统描述
				id: ''
			},
			inheriteArcs: [
				{id: 9,value: '网站抽象架构'},
				{id: 10,value: '普通web网站抽象架构'},
				{id: 22,value: '截图'},
				{id: 24 ,value: '移动端架构'}
				],
			rowId: '' // 行id
    };
  },
  computed: {
    //查询测试系统的参数对象，因为实现过程中受到搜索条件的影响，因此将此参数放在computed中
    params() {
      let obj = {
        currentPage: this.currentPage,
        orderColumns: "modified_time",
        orderType: "DESC",
        pageSize: this.pageSize
      };
      if (this.selectInfo !== "") {
        obj.codeAndName = this.selectInfo;
      }
      return obj;
    }
  },
  created() {
    this.getAllSystem();
  },
  methods: {
    //添加按钮
    addButton() {
      this.titleIndex = 0;
      this.dialogVisible = true;
			this.resetForm()
    },
    //修改按钮
    updateButton() {
    	if (typeof this.radio === 'number') {
      	this.titleIndex = 1;
      	this.dialogVisible = true;
			}else {
    		this.$message.warning('请选择要操作的数据')
			}
    },
		// 对话框取消按钮
		cancel() {
			this.dialogVisible = false;
		},
		// 确认添加按钮
		addSure() {
			let obj = {
				'code': this.dialogForm.code,
				'nameMedium': this.dialogForm.nameMedium,
				'descShort':this.dialogForm.descShort,
				'inheriteArcId': this.dialogForm.inheriteArcId,
			}
			console.log(obj);
			Request({
				url: '/aut/addSingleAut',
				method: 'POST',
				params: obj
			}).then(res => {
				if (res.respCode === '0000') {
					this.$message.success('添加成功')
					this.dialogVisible = false
					this.getAllSystem();
				}else {
					this.$message.error('添加失败')
				}
			}).catch(err => {
				this.$message.error('网络连接失败')
			})
		},
		// 确认修改按钮
		editSure() {
			let obj = {
				'code': this.dialogForm.code,
				'nameMedium': this.dialogForm.nameMedium,
				'descShort':this.dialogForm.descShort,
				'inheriteArcId': this.dialogForm.inheriteArcId,
				'id': this.rowId
			}
			let _this = this
			console.log('radio',obj);
			Request({
				url: '/aut/modifySingleAut',
				method: 'POST',
				params: obj
			}).then(res => {
				if (res.respCode === "0000") {
					_this.$message.success('修改成功')
					_this.dialogVisible = false
					_this.getAllSystem()
					this.radio = false
				}else {
					_this.$message.error('修改失败')
				}
			}).catch(err => {
				this.$message.error('网络连接失败')
			})
		},
		//管理功能点
		manageFunc() {
    	if(typeof this.radio === 'number') {
    		console.log(this.rowId)
				this.toTransact(this.rowId)
			}else {
    		this.$message.warning('请选择要操作的数据')
			}
		},
		// 跳转到录制功能点管理
		toTransact(id) {
			this.$router.push({
				path: '/recordFunction/RecordManagementRouter/recordTransact',
				query: {
					'autId': id
				}
			})
		},
		// 清空对话框表单
		resetForm() {
			this.dialogForm.code = ''
			this.dialogForm.nameMedium = ''
			this.dialogForm.descShort = ''
			this.dialogForm.inheriteArcId = ''

		},
		// 更改radio的选项
		selectRadio(row,index) {
    	console.log('radio',row,row.id)
			this.selectedRow = row
			// this.radio = true
			console.log('radio' + this.radio);
    	this.dialogForm.code = row.code
			this.dialogForm.nameMedium = row.nameMedium
			this.dialogForm.descShort = row.descShort
			this.dialogForm.inheriteArcId = row.inheriteArcId
			this.rowId = row.id
		},
    handleSizeChange(val) {
      console.log(`每页 ${{ val }}条`);
      this.pageSize = val;
      this.getAllSystem();
    },
    handleCurrentChange(val) {
      console.log(`当前页：${{ val }}`);
      this.currentPage = val;
      this.getAllSystem();
    },
    // 查询被测系统  为点击查询按钮调用 此时将当前页置为一
    getAllSystem(type) {
      if (type === 1) {
        this.currentPage = 1;
      }
			// console.log(this.params);
			Request({
        url: "/aut/pagedBatchQueryAut",
        method: "post",
        params: this.params
      }).then(
					res => {
						this.tableData = res.autRespDTOList;
            this.tableData = this.tableData.reverse();
            this.totalCount = res.totalCount;
            console.log(this.tableData);
          },
          err => {
            console.log(err);
          }
        ).catch(err => {
          console.log(err);
        });
		},
		// 录制工具下载
		downloadTools() {
			window.location = "http://10.101.167.184:8080/atf-data/atf-recorder.zip"
		}
  }
};
</script>

<style scoped>
  .footSelect {
    text-align: center;
    overflow: hidden;
    margin: 30px auto 10px auto;
  }
  span.spanRow {
    margin-left: 10px;
    color: #868886;
  }
  .searchInfoStyle {
		width: 300px;
	}
	.numberA {
		text-decoration: none;
		color: #428bca;
		cursor: pointer;
	}
	.dialogButtonDiv {
		display: flex;
		justify-content: flex-end;
		padding-top: 10px;
		margin: -10px auto;
		border-top: 1px solid #e5e5e5;
	}
</style>
