<template>
  <div class="project">
    <SideBarCreate
      v-ref="(c) => setChildrenRef('sidebar', c)"
      :menuList="menuList"
      @getTableDataByIndex="getTableDataByIndex"
      @getAllTableData="getAllTableData"
      @getGroupById="getGroupById"
    ></SideBarCreate>
    <!-- <SideBarCreate ></SideBarCreate> -->
    <div class="main-page">
      <el-row class="rightPage-topRow">
        <el-col :span="2">
          <el-button
            class="new-interface"
            @click="newInterface"
            type="primary"
            size="small"
          >
            <i class="el-icon-plus"></i>新建接口
          </el-button>
        </el-col>
        <el-col :span="14">
          <el-button
            class="new-interface"
            @click="importButton"
            type="primary"
            size="small"
          >
            批量导入
          </el-button>
        </el-col>
        <el-col :span="8">
          <span class="enviroment-span">项目环境</span>
          <el-select
            @change="selectChanged"
            v-model="value"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in originEnviormentList"
              :key="item.id"
              :label="item.environmentName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- <InterfacesTable></InterfacesTable> -->
      <InterfacesTable
        :tableData="tableData"
        :tableType="tableType"
        @updateGroupButton="updateGroupButton"
        @getAllTableData="getAllTableData"
      ></InterfacesTable>
      <el-dialog
        :title="getTitle"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="60%"
      >
        <el-form
          :model="form"
          ref="form"
          label-width="80px"
          label-position="top"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="开发状态"
                prop="status"
                class="change-label-calss"
              >
                <el-select
                  class="select-status"
                  size="small"
                  v-model="form.status"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.status"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="标签" class="change-label-calss">
                <el-select
                  size="small"
                  class="input-new-tag"
                  v-model="tags"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择或输入标签"
                >
                  <el-option
                    v-for="item in tagOptions"
                    :key="item.value"
                    :label="item.tag"
                    :value="item.tag"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="URL Path"
                prop="urlPath"
                class="change-label-calss"
              >
                <el-select
                  size="small"
                  v-model="form.protocol"
                  placeholder="请选择"
                  style="width: 12.5%"
                >
                  <el-option
                    v-for="item in protocolOptions"
                    :key="item.value"
                    :label="item.protocol"
                    :value="item.value"
                    >测试
                  </el-option>
                </el-select>
                <el-select
                  size="small"
                  v-model="form.method"
                  placeholder="请选择"
                  style="width: 12.5%"
                >
                  <el-option
                    v-for="item in methodOptions"
                    :key="item.value"
                    :label="item.method"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="接口路径，建议将环境信息写到项目环境中"
                  placement="top-start"
                >
                  <el-input
                    v-model="form.urlPath"
                    size="small"
                    placeholder="接口路径"
                    style="width: 74%"
                  >
                  </el-input>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="分组和接口名称"
                prop="interfaceGroupId"
                class="change-label-calss"
              >
                <el-cascader
                  size="small"
                  :options="menuList"
                  v-model="interfaceGroup"
                  :show-all-levels="false"
                  :props="defaultProps"
                  style="width: 25%"
                >
                </el-cascader>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="接口名称"
                  placement="top-start"
                >
                  <el-input
                    v-model="form.interfaceName"
                    size="small"
                    placeholder="接口名称"
                    style="width: 74%"
                  >
                  </el-input>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="divider-row">
            <el-divider class="divider-style" direction="vertical"></el-divider>
            <span class="divider-span">请求参数</span>
          </el-row>
          <el-row>
            <el-col :span="24">
              <TestTabs
                ref="testTabs"
                :body="form.bodyContent"
                :header="form.header"
                :param="form.params"
                :bodyFormat="form.bodyFormat"
                :authType="form.authType"
              ></TestTabs>
            </el-col>
          </el-row>
          <el-row class="divider-row">
            <el-divider class="divider-style" direction="vertical"></el-divider>
            <span class="divider-span">响应内容</span>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ResponseTabs
                ref="responseTabs"
                :bodyResopnse="form.bodyResopnse"
                :headerResopnse="form.headerResopnse"
                :bodyResopnseType="form.bodyResopnseType"
                :authType="form.authType"
              ></ResponseTabs>
            </el-col>
          </el-row>
          <el-row class="buttons_row">
            <el-button
              type="primary"
              size="small"
              @click="submitForm('form')"
              >{{ buttonName }}</el-button
            >
            <el-button size="small" @click="cancelButtonClicked"
              >取消</el-button
            >
          </el-row>
        </el-form>
      </el-dialog>
			<el-dialog width="24%" title="新建接口" :visible.sync="interfaceDialog" :before-close="handleClose">
				<el-form ref="ruleForm" label-width="40px" :model="ruleForm" :rules="rules" status-icon>
					<el-form-item label="名称" prop="nameMedium">
						<el-input size="small" placeholder="必输项" v-model.lazy="ruleForm.nameMedium">
						</el-input>
					</el-form-item>
					<el-form-item label="描述" prop="descShort">
						<el-input style="width:90%" size="small" cols="5" rows="5" type="textarea" v-model="ruleForm.descShort">
						</el-input>
					</el-form-item>
					<hr color="#F5F5F5" />
					<el-form-item>
						<div class="dialogBottom">
							<el-button id="buttonName" type="primary" size="small" @click="addInterfaceNew()">添加
							</el-button>
							<el-button type="danger" size="small" plain @click="cancelButtonClicked">取消
							</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-dialog>
			<!--导入对话框-->
			<el-dialog width="27%" title="导入" :before-close="handleClose" :visible.sync="dialogImportVisible">
				<el-form :action="importURL" enctype="multipart/form-data" method="post" id="uploadForm">
					<el-upload ref="upload" :action="importURL" :limit="1" :auto-upload="false" :file-list="fileList" :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handleExceed" :on-change="handleOnChange">
						<el-button size="small" class="btnSelectFile" type="success" slot="trigger" plain>上传文件
						</el-button>
						<el-input style="margin-left:10px;width: 75%" size="small" class="formInput" placeholder="请选择导入的文件" :disabled="true" v-model="fileName"></el-input>
					</el-upload>
					<hr color="#F5F5F5" />
					<el-form-item>
						<el-col class="buttonDownload" :span="12">
							<el-button type="primary" icon="el-icon-download" size="small" @click="downloadTemplate">模板下载</el-button>
						</el-col>
						<el-col class="buttonGroup" :span="12">
							<el-button type="primary" size="small" @click="importTemplate">导入
							</el-button>
							<el-button size="small" @click="cancelButtonClicked">取消 </el-button>
						</el-col>
					</el-form-item>
				</el-form>
			</el-dialog>
    </div>
  </div>
</template>
<script>
import SideBarCreate from "@/components/interfaceTest/sidebarCreate";
import InterfacesTable from "@/components/interfaceTest/interfacesTable";
import TestTabs from "@/components/interfaceTest/testTabs";
import ResponseTabs from "@/components/interfaceTest/responseTabs";
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import { mapState } from "vuex";

export default {
  mixins: [VueMixins], // 时间格式转化
  name: "InterfacesManagement",
  components: {
    SideBarCreate: SideBarCreate,
    InterfacesTable: InterfacesTable,
    TestTabs: TestTabs,
    ResponseTabs: ResponseTabs,
  },
  data() {
		let checkNameMedium = (rule, value, callback) => {
			if (value === "") {
				return callback(new Error("接口名称不能为空"));
			} else {
				return callback();
			}
		};
    return {
      originEnviormentList: [],
      value: "",
      tableData: [],
      options: [],
      //被测系统编号
      autId: "",
      menuList: [],
      menuId: "", // 获取接口管理传递的id数据
      currentPage: 1,
      totalCount: 30,
      pageSize: 10,
      modelFlag: 1,
      dialogVisible: false,
      statusOptions: [
        {
          value: 0,
          status: "开发中",
        },
        {
          value: 1,
          status: "已完成",
        },
        {
          value: 2,
          status: "已废弃",
        },
        {
          value: 3,
          status: "测试中",
        },
        {
          value: 4,
          status: "异常",
        },
        {
          value: 5,
          status: "维护中",
        },
      ],
      tagOptions: [
        {
          value: 0,
          tag: "可以添加多个标签",
        },
        {
          value: 1,
          tag: "测试",
        },
      ],
      protocolOptions: [
        {
          value: 0,
          protocol: "HTTP",
        },
        {
          value: 1,
          protocol: "HTTPS",
        },
      ],
      methodOptions: [
        {
          value: 0,
          method: "POST",
        },
        {
          value: 1,
          method: "GET",
        },
        {
          value: 2,
          method: "DELETE",
        },
        {
          value: 3,
          method: "PUT",
        },
      ],
      inputVisible: true,
      inputValue: "",
      tags: [],
      interfaceGroup: [],
      form: {
        status: 0,
        tags: "[]",
        protocol: 0,
        method: 0,
        urlPath: "/",
        interfaceGroupId: 0,
        interfaceName: "",
        header: "[]",
        bodyContent: "[]",
        bodyFormat: 0,
        params: "[]",
        authType: 0, // Authorization
        bodyResopnse: "[]",
        headerResopnse: "[]",
        bodyResopnseType: 0,
        transactId: 0,
        rowFormat: 1,
      },
      defaultProps: {
        children: "childNodeList",
        label: "groupName",
        value: "id",
      },
      environmentUrl: "",
      tableType: 1,
			//表单数据
			ruleForm: {
				nameMedium: "",
				functionType: "接口",
				code: "",
				descShort: "",
			}, //表单信息数据
			rules: {
				nameMedium: [{
					validator: checkNameMedium,
					trigger: "blur",
				}, ],
			}, //表单验证数据
			interfaceDialog: false,
			dialogImportVisible: false,
			//文件上传
			fileList: [],
			fileName:"",
    };
  },
  inject: {
    setChildrenRef: {
      default: () => {},
    },
  },
  computed: {
    //根据modelFlag 展示弹窗的名字
    getTitle() {
      var obj = {
        1: "新建接口",
        2: "修改接口",
      };
      return obj[this.modelFlag];
    },
    //用于展示弹窗按钮的文字
    buttonName() {
      var obj = {
        1: "添加",
        2: "确认",
      };
      return obj[this.modelFlag];
    },
    ...mapState("interface", {
      interfaceEvironmentList: "interfaceEvironmentList",
    }),
    importURL() {
        return "http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/batchImportInterfaceTransact"; // 上传的URL
    },
  },
  created() {
    let data;
    if (this.$route.query.data && this.$route.query.data.hasOwnProperty("id")) {
      data = this.$route.query.data;
      console.log(data);
      localStorage.setItem("menuId", this.$route.query.data.id);
      localStorage.setItem("transactAutId", this.$route.query.data.autId);
      this.autId = Number(data.autId);
      this.menuId = data.id;
    } else {
      this.autId = Number(localStorage.getItem("transactAutId"));
      this.menuId = localStorage.getItem("menuId");
    }
    this.getGroupById(this.menuId);
    this.getAllTableData();
    this.getEnvironmentList();
  },
  beforeRouteEnter(to, from, next) {
    // ...
    console.log("进入接口页面", to, from);
    next((vm) => {
      vm.getAllTableData();
    });
  },
  beforeRouteUpdate(to, from, next) {
    // ...
    if (to.name === "Transact") {
      next((vm) => {
        console.log("测试数据离开接口页面", to.query, from);
        vm.$router.push({
          name: "Transact",
          query: {
            ...from.query,
            isInterface: true,
          },
        });
      });
    } else {
      next();
    }
  },
  methods: {
    importButton() {
      this.dialogImportVisible = true;
    },
		//导入文件相关
		downloadTemplate() {
			window.location.href =
				"http://140.143.16.21:9090/atfcloud2.0a/transactController/downloadInterfaceTemplate";
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
		// 导入模板
		importTemplate() {
			console.log("importTemplate", this.menuId);
			let formData = new FormData();
			formData.append("autId", this.autId);
			formData.append("creatorId", sessionStorage.getItem('userId'));
			formData.append("menuId", this.menuId);
			formData.append("file", this.fileList[0].raw);
			Request({
				url: "/interfaceNewController/batchImportInterfaceTransact",
				method: "POST",
				params: formData
			})
				.then((res) => {
					if (res.respCode === "0000") {
						this.$message.success(res.respMsg);
						this.dialogImportVisible = false;
						this.getAllTableData();
						this.fileList = [];
						this.fileName = "";
					}
				})
				.catch((err) => {
					this.$message.error("上传失败");
					this.dialogImportVisible = false;
					console.log(err)
				});
		},
    getEnvironmentList() {
      Request({
        url: "/interfaceNewController/interfaceEnvironmentSelect",
        method: "post",
        params: {
          menuId: this.menuId,
        },
      }).then((res) => {
        console.log("查询成功列表", res);
        this.originEnviormentList = res.list;
        this.options = this.originEnviormentList.map((item) => ({
          label: item.environmentName,
          value: item.id,
        }));
        this.value = this.options[0].value;
        this.$store.commit("interface/updateEvironmentList", {
          value: this.options,
        });
        localStorage.setItem(
          "environmentList",
          JSON.stringify(this.originEnviormentList)
        );
      });
    },
    selectChanged(val) {
      if (val === 1) {
        this.$router.push({
          path: "projectEnvironment",
        }); //界面跳转
      } else if (val === 2) {
        this.environmentUrl = "";
        console.log(val);
      } else {
        console.log(val);
      }
    },
    newInterface() {
      // this.modelFlag = 1;
      // this.dialogVisible = true;
			this.interfaceDialog = true;
    },
    handleClose(done) {
      if (this.modelFlag === 1) {
        done();
        return true;
      }
      this.$refs["form"].resetFields();
      done();
      return true;
    },
    //取消按钮
    cancelButtonClicked() {
      this.dialogVisible = false;
      this.interfaceDialog = false
			this.dialogImportVisible = false;
    },
    //修改分组表单
    updateGroupButton(row) {
      this.modelFlag = 2;
      console.log("row", row);
      if (row.tags !== "[]" && row.tags !== null) {
        this.tags = JSON.parse(row.tags);
      }
      this.interfaceGroup = row.interfaceGroupId;
      const {
        status,
        protocol,
        method,
        urlPath,
        id,
        interfaceName,
        bodyContent,
        bodyFormat,
        authType,
        bodyResponse,
        bodyResponseType,
        header,
        headerResponse,
        params,
      } = row;

      this.form = {
        status,
        protocol,
        method,
        urlPath,
        id,
        interfaceName,
        bodyContent,
        bodyFormat,
        authType,
        bodyResponse,
        bodyResponseType,
        header,
        headerResponse,
        params,
      };
      this.dialogVisible = true;
    },
    // 提交表单进行验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果是修改则调用 updateGroup 方法 否则调用 addGroup
          console.log(this.modelFlag);
          if (this.modelFlag === 2) {
            this.updateInterface();
          } else {
            this.addInterface();
          }
        } else {
          this.$message("信息格式有误，请检查");
          return false;
        }
      });
    },
		addInterfaceNew(){
    	this.ruleForm.code = "接口"+ Date.now();
			Request({
				url: "/interface/addSingleInterface",
				method: "POST",
				params: {
					creatorId: sessionStorage.getItem('userId'),
					description: this.ruleForm.descShort,
					interfaceCode: this.ruleForm.code,
					name: this.ruleForm.nameMedium,
					systemId: this.autId,
					menuId: this.menuId,
					userId: sessionStorage.getItem('userId')
				},
			})
				.then((res) => {
					this.$message(res.respMsg)
					this.interfaceDialog = false;
					this.getAllTableData();
				})
				.catch((err) => {
					console.log("接口添加失败", err);
				});
		},
    getTableDataByIndex(index) {
      Request({
        url: "/interfaceNewController/selectAllInterface",
        method: "post",
        params: {
          interfaceGroupId: index,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          orderColumns: "update_time",
          orderType: "desc",
        },
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.tableData = res.list;
            // this.$message.success("查询成功！")
          } else {
            console.log(err);
          }
        })
        .catch((err) => {
          console.log("查询失败",err);
          if (res.respCode === "10011111"){
						this.$message.info("暂无数据！")
					}
        });
    },
    getAllTableData() {
      console.log(this.menuId);
      Request({
        url: "/interfaceNewController/selectAllInterfaceByMenuId",
        method: "post",
        params: {
          menuId: this.menuId,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          orderColumns: "update_time",
          orderType: "desc",
        },
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.tableData = res.list;
          } else {
						console.log("查询失败",err);
						if (res.respCode === "10011111"){
							this.$message.info("暂无数据！")
						}
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGroupById(id) {
      console.log(id);
      Request({
        url: "/interfaceNewController/selectAllInterfaceGroup",
        method: "post",
        params: {
          menuId: id,
        },
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.menuList = [];
            var treeData = res.interfaceGroupDtoList;
            for (var i = 0; i < treeData.length; i++) {
              if (treeData[i].level === 0) {
                this.menuList.push(treeData[i]);
              }
            }
            // this.$message.success("查询成功！")
          } else {
            console.log(res.respMsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateInterface() {
      this.form.menuId = this.menuId;
      this.form.tags = JSON.stringify(this.tags);
      if (typeof this.interfaceGroup === "number") {
        this.form.interfaceGroupId = this.interfaceGroup;
      } else {
        let length = this.interfaceGroup.length;
        this.form.interfaceGroupId = this.interfaceGroup[length - 1];
      }
      this.form.bodyFormat = Number(this.$refs.testTabs.bodyType);
      if (this.form.bodyFormat === 0) {
        this.form.bodyContent = JSON.stringify(this.$refs.testTabs.bodys);
      } else {
        this.form.bodyContent = this.$refs.testTabs.jsonVariable;
      }
      this.form.header = JSON.stringify(this.$refs.testTabs.headers);
      this.form.params = JSON.stringify(this.$refs.testTabs.params);
      this.form.headerResponse = JSON.stringify(
        this.$refs.responseTabs.respheaders
      );
      this.form.bodyResponseType = Number(this.$refs.responseTabs.respType);
      if (this.form.bodyResponseType === 0) {
        this.form.bodyResponse = JSON.stringify(
          this.$refs.responseTabs.results
        );
      } else {
        this.form.bodyResponse = this.$refs.responseTabs.respJsonVariable;
      }
      this.form.authType = this.$refs.testTabs.selectedAuthType;
      this.form.updateUser = sessionStorage.getItem("username");
      console.log(JSON.stringify(this.form));
      Request({
        url: "/interfaceNewController/updateSingleInterface",
        method: "post",
        params: this.form,
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("更新成功");
            this.dialogVisible = false;
            this.getAllTableData();
          } else {
            this.$message.error("更新失败！");
            this.dialogVisible = false;
            console.log(res.respMsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addInterface() {
      this.form.transactId = 1;
			this.form.menuId = this.menuId;
      this.form.tags = JSON.stringify(this.tags);
      let length = this.interfaceGroup.length;
      this.form.interfaceGroupId = this.interfaceGroup[length - 1];
      this.form.bodyFormat = Number(this.$refs.testTabs.bodyType);
      if (this.form.bodyFormat === 0) {
        this.form.bodyContent = JSON.stringify(this.$refs.testTabs.bodys);
      } else {
        this.form.bodyContent = this.$refs.testTabs.jsonVariable;
      }
      this.form.header = JSON.stringify(this.$refs.testTabs.headers);
      this.form.params = JSON.stringify(this.$refs.testTabs.params);
      this.form.headerResponse = JSON.stringify(
        this.$refs.responseTabs.respheaders
      );
      this.form.bodyResponseType = Number(this.$refs.responseTabs.respType);
      if (this.form.bodyResponseType === 0) {
        this.form.bodyResponse = JSON.stringify(
          this.$refs.responseTabs.results
        );
      } else {
        this.form.bodyResponse = this.$refs.responseTabs.respJsonVariable;
      }
      this.form.authType = this.$refs.testTabs.selectedAuthType;
      this.form.createUser = sessionStorage.getItem("username");
      console.log(this.form);
      Request({
        url: "/interfaceNewController/addNewInterface",
        method: "post",
        params: this.form,
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("新建成功");
            this.dialogVisible = false;
            this.getAllTableData();
          } else {
            this.$message.error("新建失败！");
            this.dialogVisible = false;
            console.log(res.respMsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.project {
  height: 100%;
  display: flex;
}
.main-page {
  flex: 1;
  min-width: calc(100vh - 480px);
}
.new-interface {
  margin: 0 0 0 20px;
}
.enviroment-span {
  margin-right: 20px;
  font-size: 15px;
  color: #b6b6b6;
}
/**添加取消按钮样式 */
.buttons_row {
  text-align: center;
  margin-bottom: -15px;
  margin-top: 20px;
}
.divider-style {
  width: 3px;
  margin: 0;
  background-color: #409eff;
  height: 30px;
}
.divider-span {
  font-size: 15px;
  margin-left: 10px;
}
.divider-row {
  background-color: #eef0f0;
  width: 100%;
  margin-bottom: 10px;
}
.change-label-calss /deep/ .el-form-item__label {
  padding: 0;
  margin-bottom: 0;
  line-height: 30px;
  font-weight: bold;
}
.input-new-tag {
  width: 99%;
}
.select-status {
  width: 99%;
}
.rightPage-topRow {
  padding: 10px 5px;
  line-height: 40px;
}
.in-file {
  text-align: center;
}
.btnSelectFile {
	margin: -10px -5px 10px 0px;
}
.buttonDownload,
.buttonGroup {
	margin: 15px 0px -35px 0px;
	display: flex;
}

.buttonGroup {
	justify-content: flex-end;
}
</style>
