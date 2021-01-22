<template>
  <div style="background-color: #FFF;padding:20px 20px;height:700px">
    <el-container style="background-color: #FFF" >
      <el-card class="box-card">
        <div slot="header" class="list-header">
          <span>映射规则列表</span>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            class="btn-top-margin"
            circle
            @click="addNewRule"
          ></el-button>
        </div>
        <el-table
          ref="singleTable"
          class="cardTableStyle"
          stripe
          highlight-current-row
          :data="expectation"
          :show-header="showHeader"
          @row-click="handleRowClick"
          @current-change="handleCurrentChange">
          <el-table-column width="160px" prop="expectationName"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click.stop="deleteExpectation(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="content">
        <el-tabs type="card" v-model="selectName" @tab-click="handleRabClick">
          <el-tab-pane label="preview" name="preview"></el-tab-pane>
          <el-tab-pane label="edit" name="edit"></el-tab-pane>
          <el-tab-pane label="run" name="run"></el-tab-pane>
        </el-tabs>
        <el-card :key="count" :class="previewCard? 'mainCardPreview': 'mainCard'">
          <router-view></router-view>
        </el-card>
      </div>
      <el-dialog
        width="36%"
        :title="addTitle"
        :visible.sync="dialogVisible"
        :before-close="handleBeforeClose">
        <el-form>
          <el-form-item label="创建人" label-width="100px">
            <el-input  size="small" class="dialogInput" v-model="creatorName"></el-input>
          </el-form-item>
          <el-form-item label="期望名称" label-width="100px">
            <el-input size="small" class="dialogInput" v-model="expectedName"></el-input>
          </el-form-item>
          <el-form-item label="动作" label-width="100px">
            <el-select style="width:110%" size="small" v-model="selectedAction">
              <el-option v-for="(item,index) in actions" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-row class="descriptionRow">
          <hr class="hrStyleLeft" width="20%" color="#f5f5f5" />
          <label class="labelStyle">注:详细的接口数据可在编辑页面中填写</label>
          <hr class="hrStyleRight" width="20%" color="#f5f5f5" />
        </el-row>
        <el-row>
          <hr width="100%" color="#F5F5F5" style="margin-top:10px" />
        </el-row>
        <el-row class="buttonRow">
          <el-button class="buttonStyle" type="primary" size="small" @click="sureButton">提交</el-button>
          <el-button class="buttonStyle" type="danger" size="small" @click="cancelButton">取消</el-button>
        </el-row>
      </el-dialog>
    </el-container>
    <el-footer>
      <p class="footParagraphTop">Copyright © 1998－2021 BUPT All Rights Reserved</p>
      <p class="footParagraphBottom">教育部信息网络工程研究中心 版权所有</p>
    </el-footer>
  </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
export default {
  name: "MockApI",
  components: { ElSlPanel },
  mixins: [VueMixins], // 混入
  data() {
    return {
      selectName: "preview", //el-tabs被选中的名称
      expectation: [], //完整列表数据
      showHeader: false, //通过设置:show-header为false，隐藏表头
      option: "预览",
      previewCard: true, //是否选择previewCard
      dialogVisible: false,
      addTitle: "添加新规则",
      creatorName: "", //创建人
      expectedName: "", //期望名称
      actions: ["response", "forward"], //动作
      selectedAction: "response", //选择的动作
      id: "37",
      previewPath: "/mockApi/preview/",
      editPath: "/mockApi/edit/",
      runPath: "/mockApi/run/",
      count: 0,
      currentRow: null,
      creatorId: "",
      companyId: ""
    };
  },
  computed: {},
  created() {
    this.creatorId = sessionStorage.getItem('userId')
    this.companyId = JSON.parse(localStorage.getItem('loginInfo')).companyId
    console.log('transactmock',sessionStorage.getItem('userId'), this.companyId)
    this.loadExpectation();
  },
  mounted() {},
  //当动态路由切换时，vue为了节省内存，不会对已经注册的路由对象再次注册
  beforeRouterUpdate(to, from, next) {
    next();
  },
  methods: {
    //处理tabs点击事件
    handleRabClick(tab, event) {
      let _this = this;
      console.log(tab.name);
      if (tab.name === "preview") {
        this.$router.push({
          path: _this.previewPath + _this.id,
          query: { id: _this.id }
        });
      } else if (tab.name === "edit") {
        this.$router.push({
          path: _this.editPath + _this.id,
          query: { id: _this.id }
        });
      } else {
        this.$router.push({
          path: _this.runPath + _this.id,
          query: { id: _this.id }
        });
      }
    },
    //加载时传递数据
    loadExpectation() {
      let _this = this;
      Request({
        url: "/mockServer/getAllExpectation",
        method: "POST",
        params: {
            companyId: this.companyId
        }
      })
        .then(res => {
          console.log("获取映射规则列表成功", res);
          _this.expectation = res.expectationEntityList;
          _this.id = _this.expectation[0].id;
          _this.$router.push({
            path: _this.previewPath + _this.id,
            query: { id: _this.id }
          });
        })
        .catch(err => {
          console.log("获取映射规则列表失败", err);
        });
    },
    //获取全部的映射规则列表
    getAllExpectation() {
      Request({
        url: "/mockServer/getAllExpectation",
        method: "POST",
        params: {
            companyId: this.companyId
        }
      })
        .then(res => {
          console.log("获取映射规则列表成功", res);
          this.expectation = res.expectationEntityList;
        })
        .catch(err => {
          console.log("获取映射规则列表失败", err);
        });
    },
    //删除对应的列
    deleteExpectation(index) {
      let _this = this;
      _this
        .$confirm("此操作将永远删除该条数据，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          console.log("id", _this.expectation[index].id);
          let qs = require("qs");
          Request({
            url: "/mockServer/deleteExpectation",
            method: "POST",
            params: {
              expectationId: Number(_this.expectation[index].id),
              userId: Number(sessionStorage.getItem('userId'))
            }
          })
            .then(res => {
              console.log("删除成功", res);
              this.$message({
                type: "success",
                message: "删除成功"
              });
              _this.getAllExpectation();
            })
            .catch(err => {
              console.log("删除失败", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    //改变导航按钮切换页面
    changeRadioButton(option, getId) {
      let _this = this;
      // _this.$message.success('点击'+option)
      if (_this.option === "预览") {
        console.log("id改变", getId);
        _this.previewCard = true;
        _this.$router.push({
          path: this.previewPath + this.id,
          query: { id: this.id }
        });
      } else if (_this.option === "编辑") {
        _this.previewCard = false;
        _this.$router.push({
          path: this.editPath + this.id,
          query: { id: this.id }
        });
      } else {
        _this.previewCard = false;
        _this.$router.push({
          path: this.runPath + this.id,
          query: { id: this.id }
        });
      }
    },
    handleBeforeClose(done) {
      done();
      return true;
    },
    //点击添加按钮
    addNewRule() {
      let _this = this;
      _this.dialogVisible = true;
    },
    //对话框取消按钮
    cancelButton() {
      this.dialogVisible = false;
    },
    //对话框确定按钮
    sureButton() {
      let _this = this;
      Request({
        url: "/mockServer/addBaseInfo",
        method: "POST",
        params: {
          creator: _this.creatorName,
          expectationName: _this.expectedName,
          type: _this.selectedAction,
          creatorId: this.creatorId,
          companyId: this.companyId
        }
      })
        .then(res => {
          console.log("添加成功", res);
          _this.getAllExpectation();
          _this.$message({
            type: "success",
            message: "添加成功"
          });
          _this.dialogVisible = false;
        })
        .catch(err => {
          console.log("添加失败", err);
        });
    },
    handleRowClick(row, column, event) {
      this.count++;
      this.id = row.id;
      this.changeRadioButton(this.option, this.id);
    },
    // 改变当前行
    handleCurrentChange(val) {
      this.currentRow = val;
      this.selectName = "preview"
    }
  }
};
</script>

<style scoped>
.el-container {
  min-height: calc(100vh - 70px)
}
.el-footer {
  height: 50px;
}
.box-card {
  width: 270px;
  margin-top: 0px;
  margin-left: 10px;
  height: fit-content;
  box-sizing: border-box;
}
.list-header {
  display: flex;
  font-size: 18px;
  font-weight: bold;
  justify-content: space-between;
}
/* 每一行内容 */
.cardTableStyle {
  margin: auto 5px;
  cursor: pointer;
}
/* content相关内容 */
.content {
  width: 80%;
  height: 100%;
  float: left;
  margin-left: 20px;
}
.mainCardPreview {
  margin-top: -16px;
  width: 100%;
  height: 100%;
}
.mainCard {
  width: 100%;
  height: fit-content;
}
.footParagraphTop,
.footParagraphBottom {
  width: 100%;
  text-align: center;
  font-family: "Times New Roman";
  font-size: 14px;
}
.footParagraphTop {
  margin-top: 15px;
}
.buttonGroupStyle {
  margin-bottom: -9px;
  margin-top: 10px;
  margin-left: 3px;
}
.dialogInput {
  width: 100%;
}
.hrStyleLeft {
  float: left;
  margin-top: 6px;
  margin-right: 5px;
}
.hrStyleRight {
  float: right;
  margin-top: 6px;
  margin-right: 5px;
}
.labelStyle {
  float: left;
  font-family: "黑体";
  font-size: 12px;
  margin-left: 15px;
}
.descriptionRow {
  display: flex;
  justify-content: center;
}
.buttonRow {
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom: -12px;
}
.buttonStyle {
  float: right;
  margin-right: 5px;
}
</style>
