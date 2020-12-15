<template>
  <div>
    <el-card class="leftCard">
      <p class="title">元素列表</p>
      <div class="body">
        <el-row>
          <el-input size="small" class="searchInput" placeholder="请输入关键字" v-model="filterText" clearable>
            <el-button size="small" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-row>
        <el-row class="buttonRow">
          <el-button type="primary" size="small" @click="addUI">添加UI</el-button>
          <el-button type="warning" size="small" @click="delUI">删除UI</el-button>
          <el-button type="primary" size="small" @click="addElement">添加元素</el-button>
          <el-button type="warning" size="small" @click="delElement">删除元素</el-button>
          <el-button type="primary" size="small" @click="addBatch">批量添加</el-button>
        </el-row>
        <el-tree
          ref="tree"
          accordion
          @node-click="handleNodeClick"
          @node-expand="handleNodeExpand"
          :data="getUIs"
          :props="defaultProps"
          :filter-node-method="filterNode"
        ></el-tree>
      </div>
    </el-card>

    <el-card class="rightCard">
      <p class="title">{{rightTitle}}</p>
      <div class="body">
        <p class="mask" v-show="maskFlag">请选择UI或元素</p>
        <div v-show="!maskFlag">
          <div v-show="isUI">
            <el-form class="uiForm" label-width="150px">
              <el-form-item label="UI名称">
                <el-input  size="small" class="uiNameInput" v-model="uiFrom.uiName"></el-input>
              </el-form-item>
              <el-form-item label="关联对象库中对象">
                <el-input  size="small" v-model="uiFrom.relateIdentifyObjectId" disabled></el-input>
                <el-button type="primary" size="small" @click="uiLinkLib">关联对象</el-button>
                <el-button type="warning" size="small">解除关联</el-button>
                <el-button type="success" size="small" @click="modifySingleUI">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="!isUI">
            <el-form class="eleForm" label-width="140px" :inline="true">
              <el-form-item label="元素名称">
                <el-input  size="small" v-model="element.elementName" placeholder="元素名称"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-select  size="small" v-model="element.classType" placeholder="类型">
                  <el-option
                    v-for="item in omClassRespDTOList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-row>
                <el-form-item label="对象库中父对象" class="linkRow">
                  <el-input
                    size="small"
                    v-model="elementForm.relateIdentifyObjectId"
                    placeholder="对象库中的父对象"
                    disabled
                  ></el-input>
                  <el-button type="primary" size="small" @click="uiLinkLib">设置父对象</el-button>
                  <el-button type="warning" size="small">解除关联</el-button>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="对象库中关联对象" class="linkRow">
                  <el-input
                    size="small"
                    v-model="elementForm.relateParentIdentifyObjectId"
                    placeholder="对象库中关联对象"
                    disabled
                  ></el-input>
                  <el-button type="primary" size="small" @click="uiLinkLib">设置关联对象</el-button>
                  <el-button type="warning" size="small">解除关联</el-button>
                </el-form-item>
              </el-row>
            </el-form>
            <div class="attrList">
              <h4 class="title">属性</h4>
              <hr />
              <div class="attrTable">
                <el-row>
                  <span>主属性</span>
                  <div>
                    <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-plus"
                      title="添加"
                      @click="addAttrTable(1)"
                      plain
                    ></el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      title="删除"
                      plain
                      @click="deleteAttrTable(1)"
                    ></el-button>
                    
                  </div>
                </el-row>
                <el-table
                  stripe
                  border
                  highlight-current-row
                  :data="element.mainProperties"
                  @selection-change="handleSelectionChange($event,1)"
                >
                  <el-table-column type="selection" width="55px"></el-table-column>
                  <el-table-column min-width="40%" label="属性名">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="40%" label="属性值">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.value"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="attrTable">
                <el-row>
                  <span>附加属性</span>
                  <div>
                     <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-plus"
                      title="添加"
                      @click="addAttrTable(2)"
                      plain
                    ></el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      title="删除"
                      @click="deleteAttrTable(2)"
                      plain
                    ></el-button>
                  </div>
                </el-row>
                <el-table
                  stripe
                  border
                  highlight-current-row
                  :data="element.additionalProperties"
                  @selection-change="handleSelectionChange($event,2)"
                >
                  <el-table-column type="selection" width="55px"></el-table-column>
                  <el-table-column min-width="40%" label="属性名">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="40%" label="属性值">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.value"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="attrTable">
                <el-row>
                  <span>辅助属性</span>
                  <div>
                    <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-plus"
                      title="添加"
                      @click="addAttrTable(3)"
                      plain
                    ></el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      title="删除"
                      @click="deleteAttrTable(3)"
                      plain
                    ></el-button>
                  </div>
                </el-row>
                <el-table
                  stripe
                  border
                  highlight-current-row
                  :data="element.assistantProperties"
                  @selection-change="handleSelectionChange($event,3)"
                >
                  <el-table-column type="selection" width="55px"></el-table-column>
                  <el-table-column min-width="40%" label="属性名">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="40%" label="属性值">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.value"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="attrTable">
                <el-row>
                  <span>关联属性</span>
                  <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-plus"
                      title="添加"
                      @click="addAttrTable(4)"
                      plain
                    ></el-button>
                  <div>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      title="删除"
                      @click="deleteAttrTable(4)"
                      plain
                    ></el-button>
                  </div>
                </el-row>
                <el-table
                  stripe
                  border
                  highlight-current-row
                  :data="element.relateProperties"
                  @selection-change="handleSelectionChange($event,4)"
                >
                  <el-table-column type="selection" width="55px"></el-table-column>
                  <el-table-column min-width="40%" label="属性名">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="40%" label="属性值">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.value"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-row class="bottomButton">
                <el-button type="primary" size="small" @click="modifySingleElement">保存</el-button>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="添加UI" width="25%" class="uiDialog" :visible.sync="addUIVisible">
      <el-form label-width="100px">
        <el-form-item label="UI名称">
          <el-input size="small" placeholder="请输入UI名称" v-model="dialogUiName"></el-input>
          <p>若要添加多个，请以英文逗号“,”隔开。</p>
        </el-form-item>
      </el-form>
      <el-row class="bottomRowButton">
        <el-button type="primary" size="small" @click="batchAddUI">添加</el-button>
        <el-button type="warning" size="small" plain @click="cancelDialog">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="添加元素" width="25%" class="elementDialog" :visible.sync="addElementVisible">
      <el-form label-width="100px">
        <el-form-item label="元素名称">
          <el-input size="small" placeholder="请输入元素名称" v-model="elementName"></el-input>
        </el-form-item>
        <el-form-item label="控件类型">
          <el-select placeholder="请选择控件类型" v-model="classType">
            <el-option
              v-for="item in omClassRespDTOList"
              :key="item.id"
              :value="item.name"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主属性名">
          <el-input size="small" placeholder="请输入主属性名" v-model="mainPropertyName"></el-input>
        </el-form-item>
        <el-form-item label="主属性值">
          <el-input size="small" placeholder="请输入主属性值" v-model="mainPropertyValue"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="bottomRowButton">
        <el-button type="primary" size="small" @click="addSingleElement">添加</el-button>
        <el-button type="warning" size="small" plain @click="cancelDialog">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="批量添加" width="25%" class="batchDialog" :visible.sync="addBatchVisible">
      <el-form :action="uploadUrl" method="post" enctype="multipart/www-form-data" id="elForm">
        <el-row>
          <el-upload 
            class="uploadForm"
            :action="uploadUrl"
            :auto-upload="false"
            :limit="1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="handleChange">
            <el-button type="primary" size="small" slot="trigger">选取文件</el-button>
            <el-input placeholder="请选择文件" v-model="fileName" disabled></el-input>
          </el-upload>
        </el-row>
        <div slot="tip" class="el-upload__tip">上传修改的模板文件，只允许同时上传一个</div>
        <el-row class="row">
          <el-button
            type="success"
            size="small"
            icon="el-icon-download"
            @click="dowmloadTemplate"
          >模板下载</el-button>
          <div class="bottomRowButton">
            <el-button type="primary" size="small" @click="submitForm">添加</el-button>
            <el-button type="warning" size="small" plain @click="cancelDialog">取消</el-button>
          </div>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="对象库" width="30%" class="objectLibDialog" :visible.sync="UIObjectVisible">
      <div class="body"></div>
      <el-row>
        <el-button type="primary" size="small" @click="uilLinkSure">确定</el-button>
        <el-button type="warning" size="small" plain @click="cancelDialog">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog class="ruleRecordDialog" title="录制规则录入" width="25%" :visible.sync="recordRuleVisible">
      <el-form label-width="100px">
        <el-form-item label="规则名称">
          <el-input size="small" class="inputRule" v-model="ruleName" placeholder="请输入规则名称"></el-input>
        </el-form-item>
        <el-form-item label="规则描述">
          <el-input size="small" class="inputRule" v-model="ruleDesc" placeholder="请输入规则描述"></el-input>
        </el-form-item>
      </el-form>
      <hr>
      <el-row class="ruleButton">
        <el-button type="primary" size="small" @click="ruleSure">确定</el-button>
        <el-button type="warning" size="small" plain @click="cancelDialog">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Request from "../../libs/request";
import VueMixins from "@/libs/vueMixins.js";
export default {
  mixin: [VueMixins],
  name: "RecordDetailElementLib",
  data() {
    return {
      addUIVisible: false, // 添加UI可视
      addElementVisible: false, // 添加元素可视
      addBatchVisible: false, // 添加元素可视
      filterText: "", // 搜索栏过滤数据
      dialogUiName: "", // 输入的UI名称
      uiId: "", // UI编号
      expandUiId: "", // 展开的uiId
      elementId: "", // 元素编号
      elementName: "", // 元素类型
      classType: "", // 控件类型
      relateIdentifyObjectId: "",
      relateParentIdentifyObjectId: "",
      mainPropertyName: "", //主属性名
      mainPropertyValue: "", // 主属性值
      rightTitle: "名称",
      maskFlag: true,
      isUI: true, // 判断是UI还是元素
      uiFrom: {
        uiName: "", // UI名称
        relateIdentifyObjectId: "" // 关联对象
      },
      elementForm: {
        elementName: "", // 元素名称
        classType: "", // 类型
        relateIdentifyObjectId: "", // 对象库中父对象
        relateParentIdentifyObjectId: "" // 对象库中关联对象
      },
      UIObjectVisible: false,
      recordRuleVisible: false,
      element: {},
      tableType: "", // 选择的表格类型
      tableRow: -1, // 选择的行
      selectRows: [],
      getUIs: [],
      getTransactId: '',
      getRepositoryId: '',
      getAutId: '',
      fileName: '',// 文件名
      ruleName: '', // 规则名称
      ruleDesc: '', // 规则描述
    };
  },
  props: {
    transactId: {
      type: Number,
      default: 0
    },
    omClassRespDTOList: {
      type: Array,
      default: []
    },
    repositoryId: {
      type: Number,
      default: 0
    },
    autId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    defaultProps(data) {
      return {
        children: "elements",
        label: data => {
          if (data.uiName) {
            return data.uiName;
          } else {
            return data.elementName;
          }
        }
      };
    },
    // 地址
    uploadUrl() {
      return "http://10.101.167.184:8080/atfcloud2.0a/elementRepository/batchImportElementAndUi"
    }
  },
  created() {
    this.getTransactId = this.transactId
    this.getRepositoryId = this.repositoryId
    this.getAutId = this.autId
    this.queryAllElementsForATransact(this.getTransactId);
  },
  methods: {
    change(val, autId, repositoryId) {
       this.queryAllElementsForATransact(val)
       this.getTransactId = val
       this.getAutId = autId
       this.getRepositoryId = repositoryId
       console.log('changed', val, autId, repositoryId)
    },
    // 查询全部的元素
    queryAllElementsForATransact(id) {
      console.log("queryAllElementsForATransact", id);
      let _this = this;
      Request({
        url: "/elementRepository/queryAllElementsForATransact",
        method: "POST",
        params: {
          transactId: id
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            _this.getUIs = res.uis;
          } else {
            _this.$message.error(res.respMsg);
            _this.getUIs = []
          }
        })
        .catch(err => {
          _this.$message.error(err.split('；')[err.split('；').length - 1]);
          _this.getUIs = []
        });
    },
    // 节点过滤
    filterNode(val, data) {
      console.log("handleNodeClick", val, data);
      if (!val) return true;
      return data.uiName
        ? data.uiName.indexOf(val) !== -1
        : data.elementName.indexOf(val) !== -1;
    },
    // 添加UI
    addUI() {
      this.addUIVisible = true;
    },
    // 删除UI
    delUI() {
      let _this = this;
      if (_this.uiId === "") {
        _this.$message.warning("请选择一条UI");
      } else {
        Request({
          url: "/elementRepository/deleteSingleUI",
          method: "POST",
          params: {
            repositoryId: _this.getRepositoryId,
            uiId: _this.uiId
          }
        })
          .then(res => {
            if (res.respCode === "0000") {
              _this.$message.success("删除成功");
              _this.queryAllElementsForATransact(this.getTransactId);
              _this.maskFlag = true
            } else {
              _this.$message.error(res.respMsg);
            }
          })
          .catch(err => {
            _this.$message.error(err.respMsg);
          });
      }
    },
    // 添加元素
    addElement() {
      if (this.uiId === "") {
        this.$message.warning("请选择UI");
      } else {
        this.addElementVisible = true;
      }
    },
    // 添加元素确定
    addSingleElement() {
      let uploadParams = {
        repositoryId: this.getRepositoryId,
        uiId: this.uiId,
        element: {
          relateIdentifyObjectId: this.relateIdentifyObjectId,
          relateParentIdentifyObjectId: this.relateParentIdentifyObjectId,
          elementName: this.elementName,
          classType: this.classType,
          mainProperties: [
            {
              isRelative: null,
              method: "",
              name: this.mainPropertyName,
              toolName: "",
              value: this.mainPropertyValue
            }
          ]
        }
      };
      Request({
        url: "/elementRepository/addSingleElement",
        method: "POST",
        params: uploadParams
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.$message.success("添加成功");
            this.addElementVisible = false;
            this.elementId = res.elementId;
            this.queryAllElementsForATransact(this.getTransactId);
          } else {
            this.$message.error(res.respMsg);
          }
        })
        .catch(err => {
          his.$message.error(err.split('；')[err.split('；').length - 1])
        });
    },
    // 删除元素
    delElement() {
      let delParams = {
        elementId: this.elementId,
        repositoryId: this.getRepositoryId,
        uiId: this.uiId
      };
      Request({
        url: "/elementRepository/deleteSingleElement",
        method: "POST",
        params: delParams
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.$message.success("删除成功");
            this.queryAllElementsForATransact(this.getTransactId);
            this.maskFlag = true
          } else {
            this.$message.error(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err.respMsg);
        });
    },
    // 批量添加
    addBatch() {
      this.addBatchVisible = true;
    },
    // 添加UI确定
    batchAddUI() {
      let uiNames = this.dialogUiName.split(",");
      let uis = [];
      uiNames.forEach(item => {
        uis.push({ uiName: item });
      });
      Request({
        url: "/elementRepository/batchAddUI",
        method: "POST",
        params: {
          repositoryId: this.getRepositoryId,
          uis
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.$message.success("添加UI成功" + this.getTransactId);
            this.queryAllElementsForATransact(this.getTransactId);
            this.addUIVisible = false;
          } else {
            this.$message.error(res.respMsg);
          }
        })
        .catch(err => {
          his.$message.error(err.split('；')[err.split('；').length - 1])
        });
    },
    // 模板下载
    dowmloadTemplate() {
      window.location =
        "http://10.101.167.184:8080/atfcloud2.0a/elementRepository/getExcelTemporary/1609";
    },
    // 查询单个UI
    querySingleUI(repositoryId, uiId) {
      Request({
        url: "/elementRepository/querySingleUI",
        method: "POST",
        params: {
          repositoryId,
          uiId
        }
      })
        .then(res => {
          console.log("handleNodeClick", res);
        })
        .catch(err => {
          console.log("获取失败");
        });
    },
    // 查询单个元素
    querySingleElement() {
      Request({
        url: "/elementRepository/querySingleElement",
        method: "POST",
        params: {
          elementId: this.elementId,
          repositoryId: this.getRepositoryId,
          uiId: this.uiId
        }
      })
        .then(res => {
          this.element = res.element;
          this.element.relateProperties = this.element.relateProperties ? this.element.relateProperties
            : [];
        })
        .catch(err => {
          this.$message.error("查询失败");
        });
    },
    // 对话框取消
    cancelDialog() {
      this.addUIVisible = false;
      this.addElementVisible = false;
      this.addBatchVisible = false;
      this.UIObjectVisible = false;
      this.recordRuleVisible = false
    },
    // 点击节点事件
    handleNodeClick(val) {
      console.log("handleNodeClick", val, val.uiId, this.getRepositoryId);
      this.maskFlag = false;
      if (val.uiId) {
        this.querySingleUI(this.getRepositoryId, val.uiId);
        this.uiId = val.uiId;
        this.rightTitle = val.uiName;
        this.uiFrom.uiName = val.uiName;
        this.expandUiId = val.uiId;
        console.log("handleNodeClick 点击UI");
        this.isUI = true;
      } else {
        this.uiId = this.expandUiId;
        this.elementId = val.elementId;
        this.rightTitle = val.elementName;
        this.element.elementName = val.elementName;
        this.element.classType = val.classType;
        this.isUI = false;
        this.querySingleElement();
        console.log("handleNodeClick 点击元素");
      }
    },
    // 节点展开事件
    handleNodeExpand(val) {
      console.log("handleNodeClick", val, val.uiId);
      this.expandUiId = val.uiId;
    },
    // UI关联对象库
    uiLinkLib() {
      this.UIObjectVisible = true;
    },
    // UI对话框确认
    uilLinkSure() {
      this.UIObjectVisible = false;
    },
    // UI保存
    modifySingleUI() {
      let params = {};
      console.log("params", params);
      Request({
        url: "/elementRepository/modifySingleUI",
        method: "POST",
        params: {
          relateIdentifyObjectId: this.uiFrom.relateIdentifyObjectId,
          repositoryId: this.getRepositoryId,
          uiId: this.uiId,
          uiName: this.uiFrom.uiName
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.$message.success("保存成功");
            this.queryAllElementsForATransact(this.getTransactId);
            this.maskFlag = true;
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch(err => {
          this.$message.error("保存失败");
        });
    },
    // 记录规则
    recordrule() {
      console.log('规则录入')
      if (this.uiId === "") {
        this.$message.warning("请选择一条UI");
      } else {
        this.recordRuleVisible = true;
      }
    },
    // 处理选择
    handleSelectionChange(val, index) {
      let tables = [
        this.element.mainProperties,
        this.element.additionalProperties,
        this.element.assistantProperties,
        this.element.relateProperties
      ];
      this.tableType = index;
      val.forEach(item => {
        tables[index - 1].forEach((i, index) => {
          if (i.name === item.name) {
            this.selectRows.push(index);
          }
        });
      });
      console.log("");
    },
    // 删除属性table内容
    deleteAttrTable(type) {
      let tables = [
        this.element.mainProperties,
        this.element.additionalProperties,
        this.element.assistantProperties,
        this.element.relateProperties
      ];
    },
    // 添加内容
    addAttrTable(type) {
      console.log("addAttrTable", type);
      let tables = [
        this.element.mainProperties,
        this.element.additionalProperties,
        this.element.assistantProperties,
        this.element.relateProperties
      ];
      let newRow = {
        isRelative: null,
        method: "",
        name: "",
        toolName: "",
        value: ""
      };
      tables[type - 1].push(newRow);
    },
    // 保存元素
    modifySingleElement() {
      Request({
        url: "/elementRepository/modifySingleElement",
        method: "POST",
        params: {
          element: this.element,
          repositoryId: this.getRepositoryId,
          uiId: this.uiId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.$message.success("保存成功");
            this.queryAllElementsForATransact(this.getTransactId);
            this.maskFlag = true;
          }
        })
        .catch(err => {
          this.$message.error("保存失败");
        });
    },
    // 批量上传
    handlePreview(file) {
      console.log('handlePreview', file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileName = ""
    },
    handleExceed(file, fileList) {
      this.$message.warning('只能同时上传一个文件')
    },
    handleChange(file) {
      this.fileName = file.name
    },
    submitForm() {
      let formData = new FormData(document.getElementById('elForm'))
      formData.append('repositoryId', this.getRepositoryId)
      formData.append('uploadUserId', 3)
      formData.append('autId', this.getAutId)
      Request({
        url: '/elementRepository/batchImportElementAndUi',
        method: 'POST',
        params: formData
      }).then(res => {
        this.$message.success(res.respMsg)
        this.fileName = ""
        this.queryAllElementsForATransact(this.getTransactId)
        this.addBatchVisible = false
      }).catch(err => {
        this.$message.error('批量导入失败')
      })
    },
    // 录制规则跳转
    ruleSure() {
      this.$router.push({path: '/recordFunction/RecordManagementRouter/ruleInput'})
    }
  }
};
</script>

<style lang="less" scoped>
.leftCard {
  float: left;
  width: 33.4%;
  margin-left: 10px;
  min-height: 100%;
  .title {
    font-size: 18px;
    padding-left: 10px;
  }
  .body {
    width: 100%;
    height: 640px;
    border: 1px solid #aaaaaa;
    padding: 10px 5px;
  }
  .searchInput {
    width: 440px;
    margin-left: 10px;
  }
  .buttonRow {
    padding-left: 20px;
  }
}
.rightCard {
  float: left;
  width: calc(66% - 80px);
  margin-left: 36px;
  margin-right: 40px;
  min-height: 500px;
  .title {
    font-size: 18px;
    padding-left: 10px;
  }
  .body {
    width: 100%;
    height: 640px;
    border: 1px solid #aaaaaa;
    overflow: auto;
    .mask {
      width: inherit;
      height: inherit;
      color: #cccccc;
      font-size: 30px;
      text-align: center;
      line-height: 640px;
    }
    .uiForm {
      .el-form-item {
        margin: 20px 0px 10px;
        .el-input {
          width: 300px;
          margin-right: 20px;
        }
      }
    }
    .eleForm {
      .el-form-item {
        margin: 20px 0px -10px;
        .el-input {
          width: 300px;
          margin-right: 20px;
        }
      }
    }
    .attrList {
      margin: 10px 50px;
      .title {
        font-size: 16px;
        margin: 20px 10px 0px;
      }
      .attrTable {
        margin: 0px 30px;
        .el-row {
          display: flex;
          font-size: 15px;
          div {
            width: 92%;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
      .bottomButton {
        display: flex;
        justify-content: center;
      }
    }
  }
}
.uiDialog {
  p {
    color: #797979;
  }
}
.elementDialog {
  .el-select {
    width: 300px !important;
  }
}
.batchDialog {
  .el-row {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 30px;
    margin-top: -20px;
    .el-input {
      width: 270px !important;
      margin-right: 15px;
    }
  }
  .row {
    width: 100%;
    border-top: 1px solid #d3d3d3;
    padding-top: 15px;
    margin-bottom: -25px;
    margin-right: -10px;
    margin-left: 0px;
    padding-left: 5px;
    .bottomRowButton {
      display: flex;
      width: calc(100% - 100px);
      justify-content: flex-end;
    }
  }
}
.uiDialog,
.elementDialog {
  .el-input {
    width: 300px !important;
  }
  .el-input:last-child {
    margin-bottom: 20px;
  }
  .bottomRowButton {
    display: flex;
    justify-content: center;
    border-top: 1px solid #d3d3d3;
    padding-top: 15px;
    margin-bottom: -25px;
  }
}
.objectLibDialog {
  height: 100% !important;
  .body {
    width: inherit;
    height: 350px;
    margin: 20px;
    border: 1px solid #d3d3d3;
  }
  .el-row {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    margin: -15px 0px -25px;
  }
}
.uploadForm {
  margin: 10px;
}
.ruleRecordDialog {
    .inputRule {
      width: 300px !important;
    }
    .ruleButton {
      display: flex;
      justify-content: center;
      margin-bottom: -10px;
      margin-top: 0px;
    }
  }
</style>