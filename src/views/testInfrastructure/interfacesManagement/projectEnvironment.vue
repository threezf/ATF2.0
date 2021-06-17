<template>
  <div class="class-environment">
    <el-row class="text-title">
      <i class="el-icon-star-on"></i>项目环境
    </el-row>
    <el-row class="text-content">
      项目环境可以帮助您快速切换测试的 API 地址前缀、环境变量等信息
    </el-row>
    <el-row>
      <el-button
        class="new-Cases"
        type="primary"
        size="middle"
        @click="newEnvironmentButton"
      >
        <i class="el-icon-plus"></i>新建项目环境
      </el-button>
      <el-button type="text" class="import-Cases" @click="importButton">
        <i class="el-icon-upload"></i>导入
      </el-button>
    </el-row>
    <el-divider class="divider-style"></el-divider>
    <table-comp
      :tableHeader="TableHeader"
      :table-data="tableObj"
      :needPagination="false"
    >
      <template v-slot:operationSlot="scoped">
        <el-button type="text" size="small" @click="editEnvironment(scoped.row)"
          >编辑</el-button
        >
        <el-button
          type="text"
          size="small"
          @click="copyEnvironmentButton(scoped.row)"
          >复制</el-button
        >
        <el-button
          type="text"
          size="small"
          @click="delEnvironmentButton(scoped.row, scoped.index)"
          >删除</el-button
        >
      </template>
    </table-comp>
    <el-dialog
      :title="getTitle"
      top="60px"
      :visible.sync="environmentVisible"
      width="50vw"
      :append-to-body="true"
    >
      <el-form
        :model="newEnvironmentData"
        ref="newEnvironmentData"
        label-width="80px"
        label-position="top"
        :before-close="handleClose"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="环境名称"
              prop="environmentName"
              class="change-label-calss"
            >
              <el-input
                v-model="newEnvironmentData.environmentName"
                size="small"
                placeholder="请输入环境名称"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="环境备注"
              prop="remarks"
              class="change-label-calss"
            >
              <el-input
                v-model="newEnvironmentData.remarks"
                size="small"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="Host" prop="host" class="change-label-calss">
              <span
                >选择当前环境时，会自动给没有Host的API加上统一的Host前缀，如果API地址中已有Host信息，则不会再添加环境的Host前缀。</span
              >
              <el-input
                v-model="newEnvironmentData.host"
                size="small"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="divider-row">
          <el-divider class="divider-style" direction="vertical"></el-divider>
          <span class="divider-span">请求参数</span>
        </el-row>
        <el-row>
          <TestTabs
            ref="testTabs"
            :body="newEnvironmentData.bodyContent"
            :header="newEnvironmentData.requestHeader"
            :param="newEnvironmentData.params"
            :bodyFormat="newEnvironmentData.bodyFormat"
            :authType="newEnvironmentData.authType"
          ></TestTabs>
        </el-row>
        <el-row class="buttons_row">
          <el-button
            type="primary"
            size="small"
            @click="submitForm('newEnvironmentData')"
            >{{ buttonName }}</el-button
          >
          <el-button size="small" @click="cancelButtonClicked">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="复制环境"
      :visible.sync="copyDialog"
      width="40vw"
      :append-to-body="true"
    >
      <el-form :model="copyEnvironmentData" label-position="top">
        <el-row>
          <el-form-item
            label="环境名称"
            prop="interfaceName"
            class="change-label-calss"
          >
            <el-input
              v-model="copyEnvironmentData.environmentName"
              size="small"
              placeholder="环境名称"
              style="width: 100%"
            >
            </el-input>
          </el-form-item>
        </el-row>
        <el-row class="buttons_row">
          <el-button type="primary" size="small" @click="copyEnvironment"
            >确定</el-button
          >
          <el-button size="small" @click="cancelButtonClicked">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="导入" :visible.sync="importDialog" width="30%">
      <!-- ElementUI上传 -->
      <el-upload
        class="upload-demo in-file"
        :action="importURL"
        :show-file-list="true"
        :auto-upload="false"
        :limit="1"
        accept=".xlsx"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-change="handleOnChange"
        :on-success="fileChange"
      >
        <el-button size="small" type="primary">选择文件</el-button>
        <i slot="tip" class="el-upload__tip text"
          >&nbsp;&nbsp;只能选择一个xlsx文件</i
        >
      </el-upload>
      <el-divider></el-divider>
      <div class="in-file">
        <el-button size="small" type="success" @click="downloadTemplate"
          >模板下载</el-button
        >
      </div>
      <el-divider></el-divider>
      <div class="in-file">
        <el-button size="small" type="primary" @click="importTemplate"
          >导入</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="importDialog = !importDialog"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EnvironmentConf } from "@/config/testInfrastructure/projectEnvironment/projectEnvironmentConf";
import TestTabs from "@/components/interfaceTest/testTabs";
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
export default {
  mixins: [VueMixins], // 时间格式转化
  name: "projectEnvironment",
  components: { TestTabs },
  data() {
    return {
      TableHeader: EnvironmentConf,
      resultData: [],
      // {
      // 	id:'环境1',
      // 		environmentName:'测试环境',
      // 	remarks:'配置测试环境',
      // 	host:'http://140.143.16.21:9090/'
      // },{
      // 	id:'环境2',
      // 		environmentName:'生产环境',
      // 		remarks:'配置生产环境',
      // 		host:'http://140.143.16.21:8080/'
      // }
      environmentVisible: false,
      newEnvironmentData: {
        environmentName: "",
        remarks: "",
        host: "",
        requestHeader: "[]",
        bodyContent: "[]",
        bodyFormat: 0,
        params: "[]",
        authType: 0, // Authorization
      },
      modelFlag: 1,
      copyEnvironmentData: {},
      copyDialog: false,
      importDialog: false,
      fileName: "",
      fileList: [],
    };
  },
  computed: {
    tableObj() {
      return {
        data: this.resultData,
      };
    },
    //根据modelFlag 展示弹窗的名字
    getTitle() {
      var obj = {
        1: "新建环境",
        2: "修改环境",
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
    importURL() {
      return "http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/batchImportInterfaceEnvironment"; // 上传的URL
    },
  },
  created() {
    this.selectEnvironment();
  },
  methods: {
    importButton() {
      this.importDialog = true;
    },
    //下载模板
    downloadTemplate() {
      let downloadUrl =
				"http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/downloadEnvirmentTemplate";
      window.location.href = downloadUrl;
    },
    beforeUpload(file) {
    //   console.log(file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension2 = testmsg === "xlsx";
      if (!extension2) {
        this.$message({
          message: "上传文件只能是xlsx格式!",
          type: "warning",
        });
      }
      return extension2;
    },
    fileChange(response, file) {
      if (response["status"] === 0) {
        this.$confirm("服务器已存在相同名字文件，是否覆盖?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            console.log("本地存储");
            let form = new FormData();
            form.append("file", file.raw);
            form.append("skip", "1");
            this.$axios
              .post("/interfaceNewController/uploadInterfaceBody", form)
              .then((response) => {
                this.$message({
                  showClose: true,
                  message: response.data["msg"],
                  type: "success",
                });
              });
          })
          .catch(() => {});
      } else {
        if (response["msg"]) {
          this.$message({
            showClose: true,
            message: response["msg"],
            type: "success",
          });
        }
      }
    },
    handleRemove(file, fileList) {
      // console.log('file:',file,fileList)
      this.fileName = "删除" + file.name;
      this.fileList.splice(0, 1);
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
      this.fileList.push(file);
    },
    importTemplate() {
      console.log(this.fileList[0].raw);
      let formData = new FormData();
			// formData.append('menuId',localStorage.getItem('menuId'))
			formData.append('autId',localStorage.getItem('autId'))
      formData.append("file", this.fileList[0].raw);
      Request({
        url: "/interfaceNewController/batchImportInterfaceEnvironment",
        method: "POST",
        params: formData,
      })
        .then((res) => {
        	if (res.respCode === "0000"){
						console.log("导入成功");
						this.$message.success(res.respMsg);
						this.importDialog = false;
						this.selectEnvironment();
					}
        })
        .catch((err) => {
          this.$message.error("上传失败");
					this.importDialog = false;
					console.log(err)
        });
    },
    handleClose(done) {
      if (this.modelFlag === 1) {
        done();
        return true;
      }
      this.$refs["newEnvironmentData"].resetFields();
      done();
      return true;
    },
    editEnvironment(row) {
      this.modelFlag = 2;
      this.newEnvironmentData = [];
      console.log("row", row);
      const {
        id,
        environmentName,
        remarks,
        host,
        requestHeader,
        bodyContent,
        bodyFormat,
        params,
        authType, // Authorization
      } = row;

      this.newEnvironmentData = {
        id,
        environmentName,
        remarks,
        host,
        requestHeader,
        bodyContent,
        bodyFormat,
        params,
        authType, // Authorization
      };
      console.log("newEnvironmentData:", this.newEnvironmentData);
      this.environmentVisible = true;
    },
    copyEnvironmentButton(row) {
      this.copyEnvironmentData = {...row};
      this.copyEnvironmentData.environmentName = "副本-" + row.environmentName;
      this.copyDialog = true;
    },
    delEnvironmentButton(row, index) {
      console.log(row, index, this.resultData);
      this.$confirm("是否确定删除此环境?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(() => {
          this.delEnvironment(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    newEnvironmentButton() {
      this.modelFlag = 1;
      this.environmentVisible = true;
    },
    // 提交表单进行验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果是修改则调用 updateGroup 方法 否则调用 addGroup
          console.log(this.modelFlag);
          if (this.modelFlag === 2) {
            this.updateEnvironment();
          } else {
            this.addEnvironment();
          }
        } else {
          this.$message("信息格式有误，请检查");
          return false;
        }
      });
    },
    //取消按钮
    cancelButtonClicked() {
      this.environmentVisible = false;
      this.copyDialog = false;
    },
    selectEnvironment() {
      Request({
        url: "/interfaceNewController/interfaceEnvironmentSelect",
        method: "post",
        params: {
          autId: sessionStorage.getItem("autId"),
        },
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.resultData = [];
            this.resultData = res.list;
            console.log("查询成功！", res.list);
            // this.$message.success("查询成功！")
          } else {
            this.$message.error("查询失败！");
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addEnvironment() {
      this.newEnvironmentData.bodyFormat = Number(this.$refs.testTabs.bodyType);
      if (this.newEnvironmentData.bodyFormat === 0) {
        this.newEnvironmentData.bodyContent = JSON.stringify(
          this.$refs.testTabs.bodys
        );
      } else {
        this.newEnvironmentData.bodyContent = this.$refs.testTabs.jsonVariable;
      }
      this.newEnvironmentData.requestHeader = JSON.stringify(
        this.$refs.testTabs.headers
      );
      this.newEnvironmentData.params = JSON.stringify(
        this.$refs.testTabs.params
      );
      this.newEnvironmentData.authType = this.$refs.testTabs.selectedAuthType;
      this.newEnvironmentData.createUser = sessionStorage.getItem("username");
      // this.newEnvironmentData.menuId = localStorage.getItem("menuId");
      this.newEnvironmentData.autId = sessionStorage.getItem("autId");
      Request({
        url: "/interfaceNewController/addInterfaceEnvironment",
        method: "post",
        params: this.newEnvironmentData,
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("新增成功！");
            this.environmentVisible = false;
            this.selectEnvironment();
          } else {
            this.$message.error("新增失败！");
            this.environmentVisible = false;
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateEnvironment() {
      this.newEnvironmentData.bodyFormat = Number(this.$refs.testTabs.bodyType);
      if (this.newEnvironmentData.bodyFormat === 0) {
        this.newEnvironmentData.bodyContent = JSON.stringify(
          this.$refs.testTabs.bodys
        );
      } else {
        this.newEnvironmentData.bodyContent = this.$refs.testTabs.jsonVariable;
      }
      this.newEnvironmentData.requestHeader = JSON.stringify(
        this.$refs.testTabs.headers
      );
      this.newEnvironmentData.params = JSON.stringify(
        this.$refs.testTabs.params
      );
      this.newEnvironmentData.authType = this.$refs.testTabs.selectedAuthType;
      this.newEnvironmentData.updateUser = sessionStorage.getItem("username");
      Request({
        url: "/interfaceNewController/InterfaceEnvironmentUpdate",
        method: "post",
        params: this.newEnvironmentData,
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("更新成功！");
            this.environmentVisible = false;
            this.selectEnvironment();
          } else {
            this.$message.error("更新失败！");
            this.environmentVisible = false;
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    copyEnvironment() {
      Request({
        url: "/interfaceNewController/addInterfaceEnvironment",
        method: "post",
        params: this.copyEnvironmentData,
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("复制成功！");
            this.copyDialog = false;
            this.selectEnvironment();
          } else {
            this.$message.error("复制失败！");
            this.copyDialog = false;
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delEnvironment(id) {
      Request({
        url: "/interfaceNewController/deleteInterfaceEnvironment",
        method: "post",
        params: {
          id: id,
        },
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("删除成功");
            this.selectEnvironment();
          } else {
            this.$message.error("删除失败");
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
.class-environment {
  padding: 20px;
  .text-title {
    font-size: 20px;
    font-weight: bold;
    i {
      color: #00aff0;
      font-size: 24px;
      margin-right: 10px;
    }
  }
  .new-Cases {
    margin-right: 10px;
    i {
      margin-right: 5px;
      font-weight: bold;
    }
  }
  .import-Cases {
    font-size: 16px;
    i {
      margin-right: 5px;
    }
  }
}
.divider-style {
  margin-top: 5px;
  height: 2px;
}
.change-label-calss /deep/ .el-form-item__label {
  padding: 0;
  margin-bottom: 0;
  line-height: 30px;
  font-weight: bold;
}
.buttons_row {
  text-align: center;
  margin-bottom: -15px;
  margin-top: 20px;
}
.divider-row {
  background-color: #eef0f0;
  width: 100%;
  margin-bottom: 10px;
  .divider-style {
    width: 3px;
    margin: 0;
    background-color: #409eff;
    height: 30px;
  }
}
.in-file {
  text-align: center;
}
</style>
