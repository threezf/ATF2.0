<template>
  <div class="page-base-inner">
    <el-container>
      <el-row class="buttonsRow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addFunctionButton"
          :disabled="disableFunc"
          >添加</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-folder-add"
          size="small"
          @click="importFunctionButton"
          :disabled="disableFunc"
          >批量导入
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-document-copy"
          size="small"
          @click="copyFunction"
          :disabled="disableFunc"
          >复制功能点
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-edit-outline"
          size="small"
          @click="updateFunctionButton"
          :disabled="disableFunc"
          >修改
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-link"
          @click="linkSwagger"
          v-show="!$route.query.hasOwnProperty('isInterface') || isInterface"
          :disabled="disableFunc"
          >绑定swagger
        </el-button>
      </el-row>
    </el-container>
    <el-main class="el-main-base-inner">
      <el-row>
        <el-col :span="6">
          <span class="ownedSystem">所属被测系统：</span>
          <el-select
            size="small"
            class="selectName"
            v-model="ownedSystem"
            placeholder="所属被测系统"
            @change="changeAutId"
            :disabled="disableFunc"
          >
            <el-option
              v-for="(item, key) in autRespDTOList"
              :key="key"
              :value="item.nameMedium"
              :label="item.nameMedium"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table
        class="tableStyle"
        ref="singleTable"
        style="width: fit-content; margin-top: 15px"
        :data="tableData"
        :default-sort="{ prop: 'modifiedTime', order: 'descending' }"
        stripe
        highlight-current-row
        border>
        <el-table-column label="选择" min-width="3%" align="center">
          <template slot-scope="scope">
            <el-radio
              v-model="selectedRowIndex"
              :label="scope.$index"
              @change="selectRow(scope.$index, scope.row)"
              :disabled="disableFunc"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column label="行号" width="50px" align="center" type="index">
        </el-table-column>
        <el-table-column prop="" label="编码" min-width="15%" align="center">
          <template slot-scope="scope">
            <a class="codeTo" @click.prevent="toTransact(scope.row)" :disabled="disableFunc">{{
              scope.row.code
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="nameMedium"
          label="名称"
          min-width="15%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="transType"
          label="类型"
          width="80px"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="descShort"
          label="描述"
          min-width="15%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200px"
          align="center"
          :formatter="transTime"
          sortable
        ></el-table-column>
        <el-table-column
          prop="modifiedTime"
          label="修改时间"
          width="200px"
          align="center"
          :formatter="transTime"
          sortable
        ></el-table-column>
      </el-table>
      <!--底部换页-->

        <el-footer class="footSelect">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20, 50]"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalCount"
            layout="total, sizes, prev ,pager ,next, jumper"
          ></el-pagination>
        </el-footer>


      <!--新增和修改对话框-->
      <el-dialog
        width="24%"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :before-close="handleBeforeClose"
      >
        <el-form
          ref="ruleForm"
          label-width="40px"
          :model="ruleForm"
          :rules="rules"
          status-icon
        >
          <el-form-item label="名称" prop="nameMedium">
            <el-input size="small" placeholder="必输项" v-model.lazy="ruleForm.nameMedium">
            </el-input>
          </el-form-item>
          <el-form-item label="类型" prop="functionType" v-if="isAdded">
            <el-select size="small" class="addSelect" v-model="ruleForm.functionType" v-if="$route.query.hasOwnProperty('isInterface')">
              <el-option value="UI" selected="true" v-if="!isInterface">
              </el-option>
              <el-option value="接口" v-else> </el-option>
            </el-select>
            <el-select size="small" class="addSelect" v-model="ruleForm.functionType" v-else>
              <el-option value="UI" selected="true" >
              </el-option>
              <el-option value="接口"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input size="small" placeholder="为空时自动生成" v-model="ruleForm.code">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="descShort">
            <el-input
              style="width:90%"
              size="small"
              cols="5"
              rows="5"
              type="textarea"
              v-model="ruleForm.descShort"
            >
            </el-input>
          </el-form-item>
          <hr color="#F5F5F5" />
          <el-form-item>
            <div class="dialogBottom">
              <el-button
                id="buttonName"
                type="primary"
                size="small"
                @click="submitForm('ruleForm')"
                >{{ dialogOperateButton }}
              </el-button>
              <el-button type="danger" size="small" plain @click="cancelButton"
                >取消
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--导入对话框-->
      <el-dialog
        width="27%"
        :title="dialogTitle"
        :before-close="handleBeforeClose"
        :visible.sync="dialogImportVisible"
      >
        <el-form
          :action="importURL"
          enctype="multipart/form-data"
          method="post"
          id="uploadForm"
        >
          <el-upload
            ref="upload"
            :action="importURL"
            :limit="1"
            :auto-upload="false"
            :file-list="fileList"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="handleOnChange"
          >
            <el-button size="small" class="btnSelectFile" type="success" slot="trigger" plain
              >上传文件
            </el-button>
            <el-input
              size="small"
              class="formInput"
              placeholder="请选择导入的文件"
              :disabled="true"
              v-model="fileName"
            ></el-input>
          </el-upload>
          <hr color="#F5F5F5" />
          <el-form-item>
            <el-col class="buttonDownload" :span="12">
              <el-button
                type="primary"
                icon="el-icon-download"
                size="small"
                @click="downloadTemplate"
                >模板下载</el-button
              >
            </el-col>
            <el-col class="buttonGroup" :span="12">
              <el-button type="primary" size="small" @click="importTemplate"
                >导入
              </el-button>
              <el-button size="small" @click="cancelButton">取消 </el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--添加成功对话框-->
      <el-dialog
        width="25%"
        title="提示"
        :visible.sync="successDialogVisible"
        :before-close="handleBeforeClose"
      >
        <el-form>
          <el-form-item label-width="20px">
            <h4 class="transactSuccessTitle">操作成功</h4>
          </el-form-item>
          <hr width="100%" color="#F5F5F5" />
          <el-form-item class="formFoot transactDialogButtonRow">
            <el-button type="primary" size="small" @click="cancelButtonClicked"
              >确定
            </el-button>
            <el-button type="success" size="small" @click="toDetail"
              >进入功能点
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="绑定swagger" width="21%" :visible.sync="swaggerVisible">
        <el-form>
          <el-form-item label-width="50px" label="URL: ">
            <el-input
              style="width: 300px"
              placeholder="请输入绑定swagger的url"
              v-model="swaggerUrl"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-row
            style="
              display: flex;
              justify-content: flex-end;
              padding-right: 16px;
              margin-bottom: -5px;
            ">
            <el-button type="primary" size="small" @click="insertSwaggerAPI"
              >确定
            </el-button>
            <el-button type="warning" size="small" @click="cancelSwagger" plain
              >取消
            </el-button>
          </el-row>
        </el-form>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
export default {
  components: {
    ElSlPanel,
  },
  mixins: [VueMixins], // 时间格式转化
  name: "transact",
  data() {
    let checkNameMedium = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("nameMedium 不能为空"));
      } else {
        return callback();
      }
    };
    return {
      //初始渲染需要的数据
      autId: "", //被测系统管理界面传递过来的值
      autRespDTOList: [], //所有测试系统列表
      creatorId: '', // 用户ID
      ownedSystem: "", //被测系统
      //换页相关信息
      currentPage: 1,
      totalCount: 30,
      pageSize: 10,
      //表格相关
      tableData: [], //表格数据
      selectedRowIndex: "", //Radio选中
      //对话框相关
      dialogModelFlag: 0,
      dialogVisible: false,
      dialogImportVisible: false,
      dialogFailVisible: false,
      successDialogVisible: false,
      creatorName: "",
      //表单数据
      ruleForm: {
        nameMedium: "",
        functionType: this.isInterface ? "接口" : "UI",
        code: "",
        descShort: "",
      }, //表单信息数据
      rules: {
        nameMedium: [
          {
            validator: checkNameMedium,
            trigger: "blur",
          },
        ],
      }, //表单验证数据
      //文件上传
      fileList: [],
      fileName: "",
      rowInfo: {}, //行信息
      updateId: "", //修改/复制功能点时传递的id
      isAdded: true, //点击修改时隐藏，添加时显示
      //复制功能的数据
      elementRepositoryId: "",
      objectRepositoryId: "",
      addId: "",
      addRow: {},
      isInterface: false,
      swaggerVisible: false,
      swaggerUrl: "", // swagger绑定用的url
      transInfo: {},
      disableFunc: false
    };
  },
  watch: {
    '$route'(newVal, oldVal) {
       this.isInterface = newVal.query.isInterface;
    }
  },
  created() {
    this.autId = this.$route.query.id;
    this.ownedSystem = this.$route.query.nameMedium;
    this.creatorId = JSON.parse(sessionStorage.getItem("toTransact")).creatorId
    this.creatorName = JSON.parse(sessionStorage.getItem("toTransact")).creatorName
    this.getAllFunction();
    this.getAllSystem();
    this.transInfo = JSON.parse(sessionStorage.getItem('toTransact'))
    const user = sessionStorage.getItem('userId')
    console.log('测试数据', this.transInfo, user, this.transInfo.creatorId)
    this.disableFunc = (user != this.transInfo.creatorId)

  },
  activated() {
    this.autId = this.$route.query.id;
    this.ownedSystem = this.$route.query.nameMedium;
    this.isInterface = this.$route.query.isInterface;
    this.isInterface
      ? (this.ruleForm.functionType = "接口")
      : (this.functionType = "UI");
    this.getAllFunction();
    this.getAllSystem();
    console.log('is interface', this.isInterface, this.$route.query)
    this.transInfo = JSON.parse(sessionStorage.getItem('toTransact'))
    const user = sessionStorage.getItem('userId')
    this.disableFunc = (user != this.transInfo.creatorId)
  },
  computed: {
    changedParams() {
      console.log('测试数据', this.$route.query.hasOwnProperty('isInterface'))
      let obj = {
        autId: this.autId,
        currentPage: this.currentPage,
        orderColumns: "modified_time",
        orderType: "desc",
        pageSize: this.pageSize,
        transType: this.$route.query.hasOwnProperty('isInterface')?
                   this.isInterface ? 2 : 1
                   : ""
      };
      return obj;
    },
    dialogTitle() {
      let titleArray = [
        "添加功能点",
        "导入",
        "修改功能点",
        "操作失败",
        "该系统无UI功能点,请添加",
        "该系统无接口,请添加",
      ];
      return titleArray[this.dialogModelFlag];
    },
    dialogOperateButton() {
      let buttonArray = ["新增", "确定", "修改", "确定", "新增", "新增"];
      return buttonArray[this.dialogModelFlag];
    },
    importURL() {
      return "http://10.101.167.184:8080/atfcloud2.0a/transactController/batchImportTransact"; // 上传的URL
    },
  },
  methods: {
    /**
     *  swagger相关
     */
    // 打开swagger对话框
    linkSwagger() {
      this.swaggerVisible = true;
    },
    // 绑定swagger
    insertSwaggerAPI() {
      if (this.swaggerUrl != "") {
        Request({
          url: "/swaggerController/insertSwaggerAPI",
          method: "POST",
          params: {
            url: this.swaggerUrl,
            systemId: this.autId,
            creatorId: 3,
          },
        })
          .then((res) => {
            console.log(res);
            this.$message.success("绑定成功");
            this.swaggerVisible = false;
          })
          .catch((error) => {
            console.log(error);
            this.$message.error("请求swagger接口失败");
          });
      } else {
        this.$message.warning("请输入url");
      }
    },
    // 取消swagger绑定
    cancelSwagger() {
      this.swaggerVisible = false;
    },
    /**
     * 顶部按钮方法
     **/
    addFunctionButton() {
    	if(this.creatorId==sessionStorage.getItem("userId")) {
				let _this = this;
				_this.isAdded = true;
				_this.dialogModelFlag = 0;
				_this.dialogVisible = true;
				_this.ruleForm.nameMedium = "";
				_this.ruleForm.functionType = !this.isInterface ? "UI" : "接口";
				_this.ruleForm.code = "";
				_this.ruleForm.descShort = "";
			}else{
				this.$alert("该被测项目由"+this.creatorName+"创建，你没有权限添加功能点")
			}
    },
    importFunctionButton() {
			if(this.creatorId==sessionStorage.getItem("userId")) {
      let _this = this;
      _this.dialogModelFlag = 1;
      _this.dialogImportVisible = true;
			}else{
				this.$alert("该被测项目由"+this.creatorName+"创建，你没有权限导入功能点")
			}
    },
    updateFunctionButton() {
			if(this.creatorId==sessionStorage.getItem("userId")) {
      let _this = this;
      if (_this.selectedRowIndex === "") {
        _this.$message.error("请先选中一个功能点");
      } else {
        _this.dialogModelFlag = 2;
        _this.dialogVisible = true;
        _this.isAdded = false;
        const { nameMedium, code, descShort } = _this.rowInfo;
        this.ruleForm = {
          nameMedium,
          code,
          descShort,
        };
      }
			}else{
				this.$alert("该被测项目由"+this.creatorName+"创建，你没有权限修改功能点")
			}
    },
    copyFunction() {
      let _this = this;
      if (_this.selectedRowIndex === "") {
        _this.failedOperation();
      } else {
        if (_this.rowInfo.transType === "接口") {
          Request({
            url: "/transactController/copySingleInterfaceTransact",
            method: "POST",
            params: {
              autId: _this.autId,
              creatorId: "3",
              transId: _this.updateId,
              userId: sessionStorage.getItem('userId')
            },
          })
            .then((res) => {
              this.$message.success('复制成功')
              if (res.respCode) {
                _this.$message.success(res.respMsg);
                _this.getAllFunction();
                _this.selectedRowIndex = "";
              } else {
                console.log("复制失败");
              }
            })
            .catch((err) => {
              console.log("复制失败", err);
            });
        } else if (_this.rowInfo.transType === "UI") {
          console.log("复制UI功能点", _this.rowInfo.transType);
          Request({
            url: "/transactController/copySingleUITransact",
            method: "POST",
            params: {
              autId: _this.autId,
              elementRepositoryId: _this.elementRepositoryId,
              objectRepositoryId: _this.objectRepositoryId,
              transId: _this.updateId,
							userId:sessionStorage.getItem("userId"),
							creatorId:sessionStorage.getItem("userId")
            },
          })
            .then((res) => {
              console.log("复制Ui成功", res);
              if (res.respCode) {
                _this.$message.success(res.respMsg);
                _this.getAllFunction();
                _this.selectedRowIndex = "";
              } else {
                console.log("复制失败");
              }
            })
            .catch((err) => {
              console.log("复制UI失败", err);
            });
        }
      }
    },
    //操作失败对话框
    failedOperation() {
      let _this = this;
      _this.$message.error("请选择功能点");
    },
    /**
     * 更换选择id
     */
    changeAutId(index) {
      // console.log('选择内容',this.ownedSystem,index);
      for (let i = 0; i < this.autRespDTOList.length; i++) {
        if (this.autRespDTOList[i].nameMedium === index) {
          this.autId = this.autRespDTOList[i].id;
          break;
        }
      }
      // console.log('autId',this.autId)
      this.getAllFunction();
    },
    /**
     * 表格方法
     */
    selectRow(index, row) {
      let _this = this;
      _this.rowInfo = row;
      _this.selectedRowIndex = index;
      _this.updateId = row.id;
      _this.elementRepositoryId = _this.rowInfo.elementRepositoryId;
      _this.objectRepositoryId = _this.rowInfo.objectRepositoryId;
      console.log(
        "选中的行" + _this.rowInfo.transType,
        _this.elementRepositoryId,
        _this.objectRepositoryId,
        row
      );
    },
    /**
     * 表单相关操作
     */
    // 共用属性
    cancelButton() {
      let _this = this;
      _this.dialogImportVisible = false;
      _this.dialogVisible = false;
      _this.dialogFailVisible = false;
    },
    handleOnChange(file) {
      this.$message.success(`选择文件成功`);
      this.fileName = file.name;
    },
    handleBeforeClose(done) {
      // console.log('debug:调用handleBeforeClose' +done);
      done();
      return true;
    },
    //导入文件相关
    downloadTemplate() {
      window.location.href =
        this.address4 + "atfcloud2.0a/transactController/downloadTemplate";
    },
    handleRemove(file, fileList) {
      // console.log('file:',file,fileList)
      this.fileName = "删除" + file.name;
    },
    handlePreview(file) {
      // console.log('file:' + file);
      this.fileName = "点击" + file.name;
    },
    handleExceed(file, fileList) {
      this.$message.warning(`只允许上传1个文件`);
    },
    /*
     * 底部分页
     */
    handleSizeChange(val) {
      // console.log(`pagination每页${val}条`);
      this.pageSize = val;
      this.getAllFunction();
    },
    handleCurrentChange(val) {
      // console.log(`pagination当前页${val}`);
      this.currentPage = val;
      this.getAllFunction();
    },
    /**
     * 获取全部的List
     */
    getAllSystem() {
      Request({
        url: "/aut/queryListAut",
        method: "POST",
        params: {
        	companyId:JSON.parse(sessionStorage.getItem("toTransact")).companyId
				},
      })
        .then((res) => {
          // console.log('获取成功',res);
          this.autRespDTOList = res.autRespDTOList;
          // console.log('本地',this.autRespDTOList)
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 进入功能点
    toDetail() {
      console.log("addRow", this.addRow);
      this.toTransact(this.addRow);
    },
    // 编码跳转
    toTransact(row) {
      console.log("toTransact", row);
      if (row.transType === "UI") {
        this.$router.push({
          name: "TransactDetail",
          query: {
            data: row,
						creatorId:this.creatorId,
						creatorName:this.creatorName,
            steps: 0
          },
        });
      } else {
        this.$router.push({
          name: "InterfacesManagement",
          query: {
            data: row,
						creatorId:this.creatorId,
						creatorName:this.creatorName,
            steps: 0
          },
        });
      }
    },
    /*
     * 获取指定option的功能点
     */
    getAllFunction() {
      let _this = this;
      Request({
        url: "/transactController/pagedBatchQueryTransact",
        method: "post",
        params: this.changedParams,
      })
        .then(
          (res) => {
            console.log("获取res", res, this.isInterface);
            if (res.list.length === 0) {
              this.isInterface
                ? (this.dialogModelFlag = 5)
                : (this.dialogModelFlag = 4);
              this.dialogVisible = true;
              this.tableData = [];
            } else {
              for (let i = 0; i < res.list.length; i++) {
                if (res.list[i].transType == 1) {
                  res.list[i].transType = "UI";
                } else {
                  res.list[i].transType = "接口";
                }
              }
              this.tableData = res.list;
              this.totalCount = res.totalCount;
              if (_this.addId) {
                _this.addRow = res.list.find((item) => item.id === _this.addId);
              }
              console.log("tableData", this.tableData);
            }
          },
          (err) => {
            console.log("pagination查询出错" + err);
          }
        )
        .catch((err) => {
          console.log("pagination查询出错" + err);
        });
    },
    submitForm(formName) {
      let _this = this;
      let status = _this.ruleForm.nameMedium === "";
      this.$message
        .info(`nameMedium: ${_this.ruleForm.nameMedium}functionType: ${_this.ruleForm.functionType}
      code: ${_this.ruleForm.code}
      descShort: ${_this.ruleForm.descShort}`);
      if (status) {
        this.$message.warning("*为必填项");
      } else {
        if (_this.ruleForm.functionType === "UI") {
          _this.ruleForm.code =
            _this.ruleForm.code !== ""
              ? _this.ruleForm.code
              : "功能点" + Date.now();
        } else {
          _this.ruleForm.code =
            _this.ruleForm.code !== ""
              ? _this.ruleForm.code
              : "接口" + Date.now();
        }
        console.log("submitForm", this.ruleForm);
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            if (document.getElementById("buttonName").innerText == "新增") {
              if (_this.ruleForm.functionType === "UI") {
                Request({
                  url: "/transactController/addSingleTransact",
                  method: "POST",
                  params: {
                    autId: _this.autId,
                    code: _this.ruleForm.code,
                    descShort: _this.ruleForm.descShort,
                    nameMedium: _this.ruleForm.nameMedium,
                    transType: _this.isInterface ? 2 : 1,
                    creatorId: sessionStorage.getItem("userId"),
                    userId: sessionStorage.getItem('userId')
                  },
                })
                  .then((res) => {
                    this.$message.success('添加成功')
                    _this.dialogVisible = false;
                    _this.successDialogVisible = true;
                    _this.getAllFunction();
                    _this.addId = res.transId;
                  })
                  .catch((err) => {
                    console.log("添加失败", err);
                    if (err.respCode == "10011000") {
                      _this.$message.error(err.respMsg);
                    }
                  });
              } else {
                Request({
                  url: "/interface/addSingleInterface",
                  method: "POST",
                  params: {
                    creatorId: sessionStorage.getItem('userId'),
                    description: _this.ruleForm.descShort,
                    interfaceCode: _this.ruleForm.code,
                    name: _this.ruleForm.nameMedium,
                    systemId: _this.autId,
                    userId: sessionStorage.getItem('userId')
                  },
                })
                  .then((res) => {
                    this.$message(res.respMsg)
                    _this.dialogVisible = false;
                    _this.getAllFunction();
                  })
                  .catch((err) => {
                    console.log("接口添加失败", err);
                    if (err.respCode == "10011000") {
                      _this.$message.error(err.respMsg);
                    }
                  });
              }
            } else if (
              document.getElementById("buttonName").innerText == "修改"
            ) {
              Request({
                url: "/transactController/modifySingleTransact",
                method: "POST",
                params: {
                  code: _this.ruleForm.code,
                  descShort: _this.ruleForm.descShort,
                  id: _this.updateId,
                  nameMedium: _this.ruleForm.nameMedium,
                  userId: sessionStorage.getItem("userId"),
                  creatorId: sessionStorage.getItem("userId")
                },
              })
                .then((res) => {
                  this.$message.success('修改成功')
                  _this.dialogVisible = false;
                  _this.getAllFunction();
                })
                .catch((err) => {
                  console.log("添加失败", err);
                  this.$message.warning(err.respMsg);
                  
                });
            }
          } else {
            console.log("验证失败");
          }
        });
      }
    },
    //操作成功对话框
    cancelButtonClicked() {
      this.dialogVisible = false;
      this.successDialogVisible = false;
    },
    // 导入模板
    importTemplate() {
      console.log("importTemplate", this.autId);
      let formData = new FormData(document.getElementById("uploadForm"));
      formData.append("autId", this.autId);
      formData.append("creatorId", this.creatorId);
      Request({
        url: "/transactController/batchImportTransact",
        method: "POST",
        params: {
					creatorId:sessionStorage.getItem("userId"),
        	...formData
				},
      })
        .then((res) => {
          this.$message.success(res.respMsg);
          this.dialogImportVisible = false;
          this.getAllFunction();
          this.fileList = [];
          this.fileName = "";
        })
        .catch((res) => {
          this.$message.error("上传失败");
        });
    },
  },
};
</script>

<style scoped>
/** 顶部按钮组 */
.buttonsRow {
  margin: 0px auto 0px 20px;
  width: 100%;
}

/* 下拉框 */
.selectName {
  width: 250px;
}

.tableStyle {
  width: 100% !important;
}

.formFoot {
  display: flex;
  justify-content: flex-end;
  margin: 20px auto -15px 13%;
}

.spanTextColor {
  color: red;
  font-size: 25px;
  margin-top: 10px;
}

.spanRow {
  margin-left: 10px;
}

.headerRow {
  margin: 0px auto -8px 0px;
  clear: both;
}

.ownedSystem {
  height: fit-content;
  color: gray;
  font-size: 16px;
  margin-right: 10px;
}

.row {
  border-color: lightgray;
  border-width: 1px;
  border-bottom-style: solid;
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
}

.footSelect {
  text-align: center;
  overflow: hidden;
  margin: 20px auto 10px auto;
}

.addSelect {
  width: 100%;
}

.dialogBottom,
.dialogImportBottom,
.dialogFailBottom {
  display: flex;
  justify-content: center;
  margin-bottom: -35px;
}

.formInput {
  width: 300px;
  
}

.buttonDownload,
.buttonGroup {
  margin: 15px 0px -35px 0px;
  display: flex;
}

.buttonGroup {
  justify-content: flex-end;
}

.uploadFile {
  display: none;
}

.dialogImportBottom {
  overflow: hidden;
  width: 97%;
  margin-bottom: -30px;
  margin-left: 10px;
}

.failContent {
  height: fit-content;
  font-size: 16px;
  margin: -10px auto;
  font-weight: bold;
}

.dialogFailBottom {
  height: fit-content;
  margin-bottom: -40px;
}

.btnSelectFile {
  margin: -10px -5px 10px 0px;
}

.transactSuccessTitle {
  margin-top: -20px;
  margin-bottom: -10px;
}

.transactDialogButtonRow {
  margin-top: -5px;
  margin-bottom: -20px;
}

.codeTo {
  color: #409eff;
  cursor: pointer;
}
</style>
