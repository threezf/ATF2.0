<template>
  <div class="page-base-inner">
    <el-container>
      <el-main>
        <el-row class="buttonRowTop">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addButton">添加</el-button>
          <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteButton">删除</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="updateButton">修改</el-button>
        </el-row>
        <el-row :span="2" class="rowTitle">当前测试系统：{{currentSystem}}</el-row>
        <el-table
          ref="singleTable"
          class="tableStyle"
          highlight-current-row
          stripe
          border
          :data="tableData"
        >
          <el-table-column label="选择" width="60px">
            <template slot-scope="scope">
              <el-radio
                class="el-radio"
                v-model="radioSelect"
                :label="scope.$index"
                @change="handleRadioSelectChange(scope.$index,scope.row)"
              >&emsp;
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column label="名称" min-width="28.5%" prop="dataName"></el-table-column>
          <el-table-column label="值" min-width="28.5%" prop="dataValue"></el-table-column>
          <el-table-column label="描述" min-width="40%" prop="dataDesc"></el-table-column>
        </el-table>
        <!--数据对话框-->
        <el-dialog
          width="22%"
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          :before-close="handleBeforeClose">
          <el-form>
            <el-form-item label="名称" label-width="70px">
              <el-input size="small" class="inputStyle" placeholder="请输入名称" v-model="ruleForm.dataName"></el-input>
            </el-form-item>
            <el-form-item label="值" label-width="70px">
              <el-input size="small" class="inputStyle" placeholder="请输入值" v-model="ruleForm.dataValue"></el-input>
            </el-form-item>
            <el-form-item label="描述" label-width="70px">
              <el-input size="small" type="textarea" class="textareaStyle" cols="27" rows="5" v-model="ruleForm.dataDesc"></el-input>
            </el-form-item>
            <hr width="100%" color="#F5F5F5" />
            <div class="buttonRow">
              <el-button type="primary" size="small" @click="submitForm('ruleForm')">{{buttonName}}</el-button>
              <el-button type="danger" size="small" plain @click="cancelClick">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-main>
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
  name: "autData",
  data() {
    return {
      //表格
      tableData: [],
      //表单
      ruleForm: {
        dataDesc: "",
        dataName: "",
        dataValue: ""
      },
      dialogVisible: false,
      dialogModelFlag: 0,
      radioSelect: "", //选择按钮
      currentSystem: "", //当前系统
      aytId: "", //当前系统编号
      row: {}, //行数据
      id: "" //修改时需要填写
    };
  },
  computed: {
    //对话框标题
    dialogTitle() {
      let _this = this;
      let obj = ["添加系统数据", "修改系统数据"];
      return obj[_this.dialogModelFlag];
    },
    /**
     * 底部按钮相关处理事件
     */
    //底部按钮选项
    buttonName() {
      let _this = this;
      let obj = ["添加", "修改"];
      return obj[_this.dialogModelFlag];
    }
  },
  created() {
    this.currentSystem = this.$route.query.code;
    this.autId = this.$route.query.id;
    // this.$message.success('当前系统：' + this.currentSystem+'编号'+this.autId);
    this.queryAllDatas();
  },
  methods: {
    //顶排按钮
    addButton() {
      let _this = this;
      _this.dialogModelFlag = 0;
      _this.dialogVisible = true;
       _this.ruleForm.dataName = ""
      _this.ruleForm.dataValue = ""
      _this.ruleForm.dataDesc = ""
    },
    deleteButton() {
      let _this = this;
      console.log("标记");
      if (_this.radioSelect === "") {
        _this.$message.error("请选择一条数据");
      } else {
        // _this.$message.success('已选择数据');
        Request({
          url: "/dataPool/deleteSingleDataPool",
          method: "POST",
          params: {
            id: _this.id
          }
        })
          .then(res => {
            console.log("删除成功", res);
            _this.$message.success("删除成功");
            _this.radioSelect = ""
            _this.queryAllDatas();
          })
          .catch(err => {
            console.log("删除失败", err);
          });
      }
    },
    updateButton() {
      let _this = this;
      if (_this.radioSelect === "") {
        _this.$message.warning("请选择一条数据");
      } else {
        const { dataDesc, dataName, dataValue } = _this.row;
        _this.ruleForm = {
          dataDesc,
          dataName,
          dataValue
        };
        _this.dialogModelFlag = 1;
        _this.dialogVisible = true;
      }
    },
    //处理对话框
    handleBeforeClose(done) {
      done();
      return true;
    },
    //更换radio
    handleRadioSelectChange(index, row) {
      let _this = this;
      console.log("更换数据", index, row);
      _this.radioSelect = index;
      _this.row = row;
      _this.id = this.row.id;
      console.log("id", _this.id);
    },
    //表单提交
    submitForm(FormName) {
      let _this = this;
      // this.$message.success(`点击确认按钮`);
      if (_this.dialogModelFlag == 0) {
        Request({
          url: "/dataPool/addSingleDataPool",
          method: "POST",
          params: {
            dataDesc: this.ruleForm.dataDesc,
            dataName: this.ruleForm.dataName,
            dataValue: this.ruleForm.dataValue,
            poolName: "被测系统数据池",
            poolObjId: this.autId
          }
        })
          .then(res => {
            console.log("添加成功", res);
            _this.$message.success("添加成功");
            _this.dialogVisible = false;
            _this.queryAllDatas();
          })
          .catch(err => {
            console.log("添加失败", err);
          });
      } else {
        Request({
          url: "/dataPool/modifySingleDataPool",
          method: "POST",
          params: {
            dataDesc: this.ruleForm.dataDesc,
            dataName: this.ruleForm.dataName,
            dataValue: this.ruleForm.dataValue,
            poolName: "被测系统数据池",
            id: this.id
          }
        })
          .then(res => {
            console.log("修改成功", res);
            _this.$message.success("修改成功");
            _this.dialogVisible = false;
            _this.radioSelect = ""
            _this.queryAllDatas();
          })
          .catch(err => {
            console.log("修改失败", err);
          });
      }
    },
    // 重置输入框
    resetInput() {
      this.ruleForm.dataName = ""
      this.ruleForm.dataValue = ""
      this.ruleForm.dataDesc = ""
    },
    //取消按钮
    cancelClick() {
      let _this = this;
      _this.dialogVisible = false;
    },
    //查询所有的测试数据
    queryAllDatas() {
      Request({
        url: "/dataPool/pagedBatchQueryDataPool",
        method: "POST",
        params: {
          currentPage: 1,
          dataName: "",
          orderColumns: "",
          orderType: "",
          pageSize: 10,
          poolName: "被测系统数据池",
          poolObjId: this.autId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            if (res.list.length !== 0) {
              this.tableData = res.list? res.list: [];
            } else {
              this.$message.warning("未添加数据");
            }
          } else {
            this.tableData = []
          }
        })
        .catch(err => {
          this.$message.warning("未添加数据");
          this.tableData = []
        });
    }
  }
};
</script>

<style scoped>
  /*表单样式*/
  .inputStyle {
    width: 270px;
  }
  /*表格相关样式*/
  .tableStyle {
    margin-left: 10px;
    margin-top: 15px;
    width: inherit;
  }
  .rowTitle {
    margin: 0px auto 15px 15px;
    font-size: 17px;
    color: gray;
  }
  .buttonRow {
    display: flex;
    justify-content: center;
    margin-bottom: -10px;
  }
  .textareaStyle {
    width: 280px;
    border-radius: 4px;
    padding: 10px;
  }
</style>
