<template>
  <div class="class-testCase">
    <el-row>
      <el-button
        class="new-Cases"
        type="primary"
        size="small"
        @click="newCaseButton"
      >
        <i class="el-icon-plus"></i>添加用例
      </el-button>
      <el-button class="new-Cases" type="primary" size="small">
        <i class="el-icon-finished"></i>批量测试
      </el-button>
      <el-button
        type="text"
        class="import-Cases"
        size="small"
        @click="importCase"
      >
        <i class="el-icon-upload"></i>导入
      </el-button>
      <el-button class="new-Cases" type="primary" size="small" :disabled="selectIds.length != 1" @click="addAssert">
        新增断言
      </el-button>
      <el-button class="new-Cases" type="primary" size="small" :disabled="selectIds.length != 1" @click="manageAsset">
        管理断言
      </el-button>
    </el-row>
    <table-comp
      :tableHeader="TableHeader"
      :table-data="tableObj"
      :needPagination="false"
      @selectionChange="handleSelectionChange"
    >
      <template v-slot:resultSlot="scope">
        <el-tag size="small" :type="scope.row.resultFlag | getType">
          {{ scope.row.resultFlag | getStatus }}
        </el-tag>
      </template>
      <template v-slot:reportSlot="scoped">
        <el-button type="text" size="small" @click="getReportButton(scoped.row)"
          >点击查看</el-button
        >
      </template>
      <template v-slot:operationSlot="scoped">
        <el-button type="text" size="small" @click="testCaseButton(scoped.row)"
          >测试</el-button
        >
        <el-button type="text" size="small" @click="editCaseButton(scoped.row)"
          >编辑</el-button
        >
        <el-button type="text" size="small" @click="copyCaseButton(scoped.row)"
          >复制</el-button
        >
        <el-button type="text" size="small" @click="delCaseButton(scoped.row)"
          >删除</el-button
        >
        <el-button type="text" size="small" @click="deleteRules(scoped.row)">
          删除断言
        </el-button>
      </template>
    </table-comp>
    <el-dialog
      top="60px"
      :title="getTitle"
      :visible.sync="caseVisible"
      width="60vw"
      :append-to-body="true"
    >
      <el-form
        :model="caseData"
        ref="caseData"
        label-width="80px"
        label-position="top"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="用例名称"
              prop="interfaceGroupId"
              class="change-label-calss"
            >
              <el-input
                v-model="caseData.projectName"
                size="small"
                placeholder="用例名称"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="URL Path"
            prop="urlPath"
            class="change-label-calss"
          >
            <el-select
              size="small"
              v-model="caseData.urlAgreement"
              placeholder="请选择"
              style="width: 12%"
            >
              <el-option
                v-for="item in protocolOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              size="small"
              v-model="caseData.urlMethod"
              placeholder="请选择"
              style="width: 12%"
            >
              <el-option
                v-for="item in methodOptions"
                :key="item.value"
                :label="item.label"
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
                v-model="caseData.urlPath"
                size="small"
                placeholder="接口路径"
                style="width: 74%"
              >
              </el-input>
            </el-tooltip>
          </el-form-item>
        </el-row>
        <el-row class="divider-row">
          <el-divider class="divider-style" direction="vertical"></el-divider>
          <span class="divider-span">请求参数</span>
        </el-row>
        <el-row>
          <TestTabs
            ref="testTabs"
            :body="caseData.bodyContent"
            :header="caseData.requestHeader"
            :param="caseData.params"
            :bodyFormat="caseData.bodyFormat"
            :authType="caseData.authType"
          ></TestTabs>
        </el-row>
        <el-row class="divider-row">
          <el-divider class="divider-style" direction="vertical"></el-divider>
          <span class="divider-span">断言规则</span>
        </el-row>
        <el-row>
          <!-- <CheckResult ref="checkResult"></CheckResult> -->
          <AssertionRule></AssertionRule>
        </el-row>
        <el-row class="buttons_row">
          <el-button
            type="primary"
            size="small"
            @click="submitForm('caseData')"
            >{{ buttonName }}</el-button
          >
          <el-button size="small" @click="cancelButtonClicked">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      top="60px"
      title="复制用例"
      :visible.sync="copyDialog"
      width="40vw"
      :append-to-body="true"
    >
      <el-form :model="copyCaseData" label-position="top">
        <el-row>
          <el-form-item
            label="环境名称"
            prop="interfaceName"
            class="change-label-calss"
          >
            <el-input
              v-model="copyCaseData.projectName"
              size="small"
              placeholder="环境名称"
              style="width: 100%"
            >
            </el-input>
          </el-form-item>
        </el-row>
        <el-row class="buttons_row">
          <el-button type="primary" size="small" @click="copyCase"
            >确定</el-button
          >
          <el-button size="small" @click="cancelButtonClicked">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="导入" :visible.sync="importDialog" width="30%" append-to-body>
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
    <el-dialog
      :visible.sync="ruleVisible"
      width="40%"
      top="60px"
      title="管理断言">
      <AssertTree @cancel="ruleVisible = false" mode="edit" :caseId="selectRow.id"></AssertTree>
    </el-dialog>
    <el-dialog
      :visible.sync="addRuleVisible"
      width="40%"
      top="60px"
      title="新增断言">
      <AssertTree @cancel="addRuleVisible = false" mode="add" :caseId="selectRow.id"></AssertTree>
    </el-dialog>
  </div>
</template>

<script>
import { CaseConf } from "@/config/testInfrastructure/testCases/testCaseConf";
import TestTabs from "@/components/interfaceTest/testTabs";
import CheckResult from "../components/checkResult";
import AssertionRule from "../components/assertionRule";
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import AssertTree from './assertTree.vue';
let that;
export default {
  mixins: [VueMixins], // 时间格式转化
  name: "testCases",
  components: {
    TestTabs,
    CheckResult,
    AssertionRule,
    // Assert,
    AssertTree
  },
  props: {
    protocols: {
      type: Array,
      default: () => [],
    },
    methods: {
      type: Array,
      default: () => [],
    },
    path: {
      type: String,
      default: "",
    },
    originData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ruleVisible: false,
      selectRow: {},
      selectIds: [],
      resultData: [],
      caseId: '',
      addRuleVisible: false,
      // {
      // 	projectName:'情況1：正常登录',
      // 		resultFlag:0,
      // 	timeStamp:'2021-04-19 21:41:42',
      // 	createUser:'zhx'
      // },
      // {
      // 	projectName:'情況2：正常登录',
      // 		resultFlag:1,
      // 	timeStamp:'2021-04-19 21:41:42',
      // 	createUser:'zhx'
      // },
      // {
      // 	projectName:'情況3：正常登录',
      // 		resultFlag:2,
      // 	timeStamp:'2021-04-19 21:41:42',
      // 	createUser:'zhx'
      // },
      TableHeader: CaseConf,
      caseVisible: false,
      copyDialog: false,
      modelFlag: 1,
      caseData: {
        projectName: "",
        urlAgreement: 0,
        urlMethod: 0,
        urlPath: "/",
        requestHeader: "[]",
        bodyContent: "[]",
        bodyFormat: 0,
        params: "[]",
        authType: 0, // Authorization
        assertionType: 0,
        assertionCheckType: 0,
        assertionRootType: 0,
        assertionBody: "",
        customCode: "",
        assertionArrayBody: 0,
        checkResHeader: "",
        rawFormat: null,
      },
      protocolOptions: [],
      methodOptions: [],
      copyCaseData: {},
      resultsOption: [
        {
          value: 0,
          result: "未测试",
        },
        {
          value: 1,
          result: "通过",
        },
        {
          value: 2,
          result: "未通过",
        },
      ],
      importDialog: false,
      fileName: "",
      fileList: [],
    };
  },
  beforeCreate: function () {
    that = this;
  },
  created() {
    this.selectCases(true);
  },
  watch: {
    originData: {
      handler(newVal) {
        this.caseData.urlAgreement = newVal.protocol;
        this.caseData.urlMethod = newVal.method;
        this.selectCases(false);
      },
      immediate: true,
    },
    path: {
      handler(newVal) {
        this.caseData.urlPath = newVal;
      },
      immediate: true,
    },
    protocols: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.protocolOptions = [];
          newVal.forEach((item) => {
            this.protocolOptions.push({
              label: item.protocol,
              value: item.value,
            });
          });
        }
      },
      immediate: true,
    },
    methods: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.caseData.urlMethod = newVal[0].value;
          this.methodOptions = [];
          newVal.forEach((item) => {
            this.methodOptions.push({
              label: item.method,
              value: item.value,
            });
          });
        }
      },
      immediate: true,
    },
  },
  filters: {
    getStatus(val) {
      for (let item in that.resultsOption) {
        let option = that.resultsOption[item];
        if (option.value === val) {
          return option.result;
        }
      }
    },
    getType(val) {
      return val === 0
        ? "success"
        : val === 1
        ? "primary"
        : val === 2
        ? "danger"
        : "warning";
    },
  },
  computed: {
    tableObj() {
      return {
        data: this.resultData,
      };
    },
    //根据modelFlag 展示弹窗的名字
    getTitle() {
      const obj = {
        1: "新建用例",
        2: "修改用例",
      };
      return obj[this.modelFlag];
    },
    //用于展示弹窗按钮的文字
    buttonName() {
      const obj = {
        1: "添加",
        2: "确认",
      };
      return obj[this.modelFlag];
    },
		importURL() {
			return "http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/batchImportInterfaceProject"; // 上传的URL
		},
  },
  methods: {
    addAssert() {
      this.addRuleVisible = true
    },
    manageAsset() {
      this.ruleVisible = true
      Request({
        url: '/interfaceNewController/queryInterfaceAssert',
        method: 'post',
        params: {
          caseId: this.selectRow.id,
          caseType: '1'
        }
      }).then(res => {
      })
    },
    handleSelectionChange(val) {
      if(val.length >= 0) {
        this.selectRow = val[0];
        this.selectIds = val.map(item => item.id);
      }else {
        this.selectIds = []
      }
    },
    //下载模板
    downloadTemplate() {
      let url =
        "http://140.143.16.21:9090/atfcloud2.0a/transactController/downloadInterfaceCaseTemplate";
      window.location.href = url;
    },
    beforeUpload(file) {
      console.log(file);
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
      console.log("importTemplate");
      let formData = new FormData();
			formData.append("interfaceId", sessionStorage.getItem("interfaceId"));
      formData.append("file", this.fileList[0].raw);
      Request({
        url: "/interfaceNewController/batchImportInterfaceProject",
        method: "POST",
        params: formData,
      })
        .then((res) => {
          console.log("导入成功");
          this.$message.success(res.respMsg);
        })
        .catch((res) => {
          this.$message.error("上传失败");
        });
    },
    // 提交表单进行验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果是修改则调用 updateGroup 方法 否则调用 addGroup
          console.log(this.modelFlag);
          if (this.modelFlag === 2) {
            this.updateCase();
          } else {
            this.addCase();
          }
        } else {
          // this.$message('信息格式有误，请检查')
          return false;
        }
      });
    },
    newCaseButton() {
      this.modelFlag = 1;
      this.caseVisible = true;
    },
    importCase() {
      this.importDialog = true;
    },
    scanResult() {},
    testCaseButton(row) {},
    getReportButton() {},
    editCaseButton(row) {
      this.modelFlag = 2;
      console.log("row", row);
      const {
        id,
        projectName,
        urlAgreement,
        urlMethod,
        urlPath,
        requestHeader,
        bodyContent,
        bodyFormat,
        params,
        authType, // Authorization
        assertionType,
        assertionCheckType,
        assertionRootType,
        assertionBody,
        customCode,
        assertionArrayBody,
      } = row;

      this.caseData = {
        id,
        projectName,
        urlAgreement,
        urlMethod,
        urlPath,
        requestHeader,
        bodyContent,
        bodyFormat,
        params,
        authType, // Authorization
        assertionType,
        assertionCheckType,
        assertionRootType,
        assertionBody,
        customCode,
        assertionArrayBody,
      };
      this.$store.commit("setAllParams", this.caseData);
      this.caseVisible = true;
    },
    copyCaseButton(row) {
      this.copyCaseData = row;
      this.copyCaseData.projectName = "副本-" + row.projectName;
      this.copyDialog = true;
    },
    delCaseButton(row) {
      this.$confirm("是否确定删除此测试用例?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(() => {
          this.delCase(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    updateCase() {
      this.caseData.updateUser = sessionStorage.getItem("username");
      this.caseData.bodyFormat = Number(this.$refs.testTabs.bodyType);
      if (this.caseData.bodyFormat === 0) {
        this.caseData.bodyContent = JSON.stringify(this.$refs.testTabs.bodys);
      } else {
        this.caseData.bodyContent = this.$refs.testTabs.jsonVariable;
      }
      this.caseData.requestHeader = JSON.stringify(this.$refs.testTabs.headers);
      this.caseData.params = JSON.stringify(this.$refs.testTabs.params);
      this.caseData.authType = this.$refs.testTabs.selectedAuthType;
      this.caseData.assertionType = this.$store.state.assertionType;
      this.caseData.assertionCheckType = this.$store.state.assertionCheckType;
      this.caseData.assertionRootType = this.$store.state.assertionRootType;
      this.caseData.assertionBody = this.$store.state.assertionBody;
      this.caseData.customCode = this.$store.state.customCode;
      this.caseData.assertionArrayBody = this.$store.state.selectedArrayType;
      this.caseData.checkResHeader = JSON.stringify(
        this.$store.state.checkResHeader
      );

      console.log("入参", this.caseData);
      Request({
        url: "/interfaceNewController/interfaceTestProjectUpdate",
        method: "post",
        params: this.caseData,
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("更新成功！");
            this.caseVisible = false;
            this.selectCases(false);
          } else {
            this.$message.error("更新失败！");
            this.caseVisible = false;
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCase() {
      this.caseData.interfaceId = sessionStorage.getItem("interfaceId");
      this.caseData.createUser = sessionStorage.getItem("username");
      this.caseData.bodyFormat = Number(this.$refs.testTabs.bodyType);
      if (this.caseData.bodyFormat === 0) {
        this.caseData.bodyContent = JSON.stringify(this.$refs.testTabs.bodys);
      } else {
        this.caseData.bodyContent = this.$refs.testTabs.jsonVariable;
      }
      this.caseData.requestHeader = JSON.stringify(this.$refs.testTabs.headers);
      this.caseData.params = JSON.stringify(this.$refs.testTabs.params);
      this.caseData.authType = this.$refs.testTabs.selectedAuthType;
      this.caseData.assertionType = this.$store.state.assertionType;
      this.caseData.assertionCheckType = this.$store.state.assertionCheckType;
      this.caseData.assertionRootType = this.$store.state.assertionRootType;
      this.caseData.assertionBody = this.$store.state.assertionBody;
      this.caseData.customCode = this.$store.state.customCode;
      this.caseData.assertionArrayBody = this.$store.state.selectedArrayType;
      this.caseData.checkResHeader = JSON.stringify(
        this.$store.state.checkResHeader
      );
      console.log("入参", this.caseData);
      Request({
        url: "/interfaceNewController/addSingleInterfaceTestProject",
        method: "post",
        params: this.caseData,
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("新增成功！");
            this.caseVisible = false;
            this.selectCases(false);
          } else {
            this.$message.error("新增失败！");
            this.caseVisible = false;
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    copyCase() {
      Request({
        url: "/interfaceNewController/addSingleInterfaceTestProject",
        method: "post",
        params: this.copyCaseData,
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("复制成功！");
            this.copyDialog = false;
            this.selectCases(false);
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
    selectCases(flag) {
      Request({
        url: "/interfaceNewController/interfaceTestProjectSelect",
        method: "post",
        params: {
          interfaceId: sessionStorage.getItem("interfaceId"),
        },
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.resultData = res.list;
            console.log(res.list);
            if (flag) {
              // this.$message.success("查询成功！")
            }
          } else {
            // this.$message.error("查询失败！")
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delCase(id) {
      Request({
        url: "/interfaceNewController/deleteInterfaceTestProject",
        method: "post",
        params: {
          id: id,
        },
      })
        .then((res) => {
          if (res.respCode === "0000") {
            this.$message.success("删除成功");
            this.selectCases(false);
          } else {
            this.$message.error("删除失败");
            console.log(res.respMsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //取消按钮
    cancelButtonClicked() {
      this.caseVisible = false;
      this.copyDialog = false;
    },
    // 新增断言
    putInterfaceAssert() {
      Request({
        url: '/interfaceNewController/putInterfaceAssert',
        method: 'post',
        params: {
          ruleName: '',
          caseType: '1',
          assertNode: ''
        }
      }).then(res => {
        console.log('管理断言', res)
      })
    },
    deleteRules(row) {
      console.log(row)
      Request({
        url: '/interfaceNewController/deleteAllInterfaceAssert',
        method: 'post',
        params: {
          caseId: row.id,
          caseType: '1',
        }
      }).then(res => {
        if(res.respCode === '0000') {
          this.$message.success('删除成功')
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.class-testCase {
  padding: 10px;
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
.in-file {
  text-align: center;
}
</style>
