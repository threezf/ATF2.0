<template>
  <div class="elementDiv">
    <div class="leftCard">
      <div class="title">元素库</div> 
      <el-card>
        <el-input size="small"  placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-row>
          <el-button type="primary" size="small" @click="addUI">添加UI</el-button>
          <el-button type="primary" size="small" @click="removeUI">删除UI</el-button>
          <el-button type="primary" size="small" @click="addElement">添加元素</el-button>
          <el-button type="primary" size="small" @click="removeElement">删除元素</el-button>
        </el-row>
        <el-tree
          :data="getList"
          :props="defaultProps"
          @node-click="handleNodeClick"
          @node-expand="handleNodeExpand"
          :filter-node-method="filterNode"
          ref="tree"
        ></el-tree>
      </el-card>
    </div>
    <div class="rightCard">
      <div class="title">{{rightTitle}}</div>
      <el-card>
        <div class="tipDiv" v-if="contentFlag">
          <p>请选择UI或者元素</p>
        </div>
        <div v-else>
          <div class="parentDiv" v-if="parentNode">
            <el-form label-width="150px">
              <el-row>
                <el-form-item label="UI名称：">
                  <el-input size="small"  v-model="uiName"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="关联对象库对象：">
                  <el-col :span="12">
                    <el-input size="small"  v-model="relateIdentifyObjectId" disabled></el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-button
                      type="primary"
                      size="small"
                      icon="el-icon-link"
                      @click="linkObjectUI"
                    	>关联对象
										</el-button>
                    <el-button
                      type="primary"
                      size="small"
                      icon="el-icon-delete"
                      @click="removeLink"
                    >解除关联</el-button>
                    <el-button
                      type="primary"
                      size="small"
                      icon="el-icon-folder"
                      @click="modifySingleUI"
                    >保存</el-button>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
          <div v-else class="attributes">
            <el-form class="baseForm" label-width="140px">
              <el-row>
                <el-form-item label="元素名称">
                  <el-input size="small"  v-model="element.elementName"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select placeholder="--选择构件类型--" v-model="element.classType">
                    <el-option
                      v-for="(item,index) in omClassRespDTOList"
                      :key="index"
                      :value="String(item.id)"
                      :label="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="对象库中的父对象">
                  <el-input size="small"  v-model="element.relateParentIdentifyObjectId" disabled></el-input>
                </el-form-item>
                <div class="buttons1">
                  <el-button type="primary" size="small" @click="setParentObj">设置父对象</el-button>
                  <el-button type="primary" size="small" @click="removeParentLink">解除关联</el-button>
                </div>
              </el-row>
              <el-row>
                <el-form-item label="对象库中的关联对象">
                  <el-input size="small"  v-model="element.relateIdentifyObjectId" disabled></el-input>
                </el-form-item>
                <div class="buttons">
                  <el-button type="primary" size="small" @click="setLinkObj">设置关联对象</el-button>
                  <el-button type="primary" size="small" @click="removeObjLink">解除关联</el-button>
                </div>
              </el-row>
            </el-form>
            <div class="attributeInfo">
              <div class="title">属性</div>
              <div class="mainAttributeDiv">
                <el-row>
                  <span>主属性</span>
                  <span>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-minus"
                      @click="deleteButton(1)"
                      plain
                    ></el-button>
                    <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-plus"
                      @click="addButton(1)"
                      plain
                    ></el-button>
                  </span>
                </el-row>
                <el-table
                  width="100%"
                  :data="element.mainProperties"
                  stripe
                  border
                  highlight-current-row>
                  <el-table-column width="35px">
                    <template slot-scope="scope">
                      <el-radio v-model="mainFlag" :label="scope.$index" @change="handleMainChange"></el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性名" min-width="40%">
                    <template slot-scope="scope">
                      <el-input size="small"  v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性值" min-width="40%">
                    <template slot-scope="scope">
                      <el-input size="small"  v-model="scope.row.value"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="attachAttributeDiv">
                <el-row>
                  <span>附加属性</span>
                  <span>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-minus"
                      @click="deleteButton(2)"
                      plain
                    ></el-button>
                    <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-plus"
                      @click="addButton(2)"
                      plain
                    ></el-button>
                  </span>
                </el-row>
                <el-table
                  :data="element.additionalProperties"
                  width="100%"
                  stripe
                  border
                  highlight-current-row>
                  <el-table-column width="35px">
                    <template slot-scope="scope">
                      <el-radio
                        v-model="additionalFlag"
                        :label="scope.$index"
                        @change="handleAdditionChange"
                      ></el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性名" min-width="40%">
                    <template slot-scope="scope">
                      <el-input size="small"  v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性值" min-width="40%">
                    <template slot-scope="scope">
                      <el-input size="small"  v-model="scope.row.value"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="auxiliaryAttributeDiv">
                <el-row>
                  <span>辅助属性</span>
                  <span>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-minus"
                      @click="deleteButton(3)"
                      plain
                    ></el-button>
                    <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-plus"
                      @click="addButton(3)"
                      plain
                    ></el-button>
                  </span>
                </el-row>
                <el-table
                  :data="element.assistantProperties"
                  width="100%"
                  stripe
                  border
                  highlight-current-row >
                  <el-table-column width="35px">
                    <template slot-scope="scope">
                      <el-radio
                        v-model="assistantFlag"
                        :label="scope.$index"
                        @change="handleAssistanceChange"
                      ></el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性名" min-width="40%">
                    <template slot-scope="scope">
                      <el-input size="small"  v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性值" min-width="40%">
                    <template slot-scope="scope">
                      <el-input size="small"  v-model="scope.row.value"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="relativeAttributeDiv">
                <el-row>
                  <span>关联属性</span>
                  <span>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-minus"
                      @click="deleteButton(4)"
                      plain
                    ></el-button>
                    <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-plus"
                      @click="addButton(4)"
                      plain
                    ></el-button>
                  </span>
                </el-row>
                <el-table
                  :data="element.relateProperties"
                  width="100%"
                  stripe
                  border
                  highlight-current-row>
                  <el-table-column width="35px">
                    <template slot-scope="scope">
                      <el-radio
                        v-model="relateFlag"
                        :label="scope.$index"
                        @change="handleLinkChange"
                      ></el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性名" min-width="40%">
                    <template slot-scope="scope">
                      <el-input size="small"  v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性值" min-width="40%">
                    <template slot-scope="scope">
                      <el-input size="small"  v-model="scope.row.value"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-row class="saveRow">
                <el-button type="primary" size="small" @click="saveObject">保存</el-button>
              </el-row>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog
      width="500px"
      :title="dialogTitles[dialogIndex]"
      :visible.sync="dialogVisible"
      @before-close="handleBeforeClose">
      <el-form class="dialogFormStyle" label-width="100px">
        <el-form-item v-if="dialogIndex === 0" label="UI名称">
          <el-input size="small"  placeholder="请输入UI名称" v-model="dialogUIName"></el-input>
        </el-form-item>
        <el-form-item v-else label="元素名称">
          <el-input size="small"  placeholder="请输入元素名称" v-model="dialogElementName"></el-input>
        </el-form-item>
        <span>若要添加多个，请以英文逗号“,”隔开。</span>
        <el-row type="flex" justify="center">
          <el-button type="primary" size="small" @click="dialogSure">添加</el-button>
          <el-button type="warning" size="small" plain @click="dialogCancel">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog class="objDialog" width="600px" title="对象库UI" :visible.sync="objectDialogVisibleUI">
      <div class="objectDiv">
        <el-tree :data="objects" :props="objectProps" @node-click="nodeClickObjUI"></el-tree>
      </div>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small" @click="objectDialogVisibleUI=false">确认</el-button>
        <el-button type="warning" size="small" plain @click="objectDialogVisibleUI=false">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog class="objDialog" width="600px" title="对象库" :visible.sync="objectDialogVisible">
      <div class="objectDiv">
        <el-tree :data="objects" :props="objectProps" @node-click="nodeClickObj"></el-tree>
      </div>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small" @click="objectSure">确认</el-button>
        <el-button type="warning" size="small" plain @click="objectCancel">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog class="objDialog" width="600px" title="对象库" :visible.sync="objectDialogVisibleEle">
      <div class="objectDiv">
        <el-tree :data="objects" :props="objectProps" @node-click="nodeClickObjEle"></el-tree>
      </div>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small" @click="objectSureEle">确认</el-button>
        <el-button type="warning" size="small" plain @click="objectCancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Request from "../../../libs/request";
import VueMixins from "@/libs/vueMixins.js";
export default {
  mixin: [VueMixins],
  name: "ElementLib",
  data() {
    return {
      transactId: '',
      autId: '',
      getList: [], // 元素库数据
      filterText: "", // 搜索需要的数据
      getObjects: [], // 获取的对象库数据
      contentFlag: true,
      rightTitle: "名称",
      parentNode: true,
      uiName: "", //UI名称
      uiId: "", // UI的id
      expandUiId: "", // 展开时的UIID
      objectDialogVisibleUI: false, // UI的对话框显示
      dialogTitles: ["添加UI", "添加元素"],
      dialogIndex: 0,
      dialogVisible: false, // 添加数据的对话框
      // 对话框数据
      dialogUIName: "",
      dialogElementName: "",
      repositoryId: "",
      // 控制关联对象的对话框
      objectDialogVisible: false,
      selectObjectId: "", // 选择的Object的Id
      selectObjectName: "", // 选择的Object的Name
      // 右侧界面所需数据
      relateIdentifyObjectId: "", // 相关元素id
      elementId: "", // 删除元素所需要的id
      // 元素配置组件传递的数据
      configObj: {},
			element: null,
			selectedType: "", // 选择的构件类型
			mainFlag: false, // 选择的主属性的内容
      additionalFlag: false, // 选择的附加属性
      assistantFlag: false, // 选择的辅助属性
			relateFlag: false, // 选择的相关属性
			objectDialogVisibleEle: false, // 属性的对象库树
			tempName: "", // 临时姓名
			tempId: "", // 临时Id
			selectedIndex: 1, // 对象库设置，1为父对象，2为关联对象
			selectedLinkId: "", // 关联对象Id
      selectedParentId: "", // 父对象Id
      omClassRespDTOList: '', // 构件类型
    };
  },
  computed: {
    // 元素库props
    defaultProps() {
      return {
        label: data => {
          if (data.uiName) {
            return data.uiName;
          } else {
            return data.elementName;
          }
        },
        children: "elements"
      };
    },
    // 对象库props
    objectProps() {
      return {
        label: data => {
          if (data.parentObjectId === 0 || !data.parentObjectId) {
            return data.objectName;
          } else {
            return false;
          }
        },
        children: ""
      };
    }
  },
  props: {
    objects: Array,
    testCaseId: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.getSingleTestCaseInfo() 
  },
  watch: {
    filterText(val) {
      // filter: 接收的参数会在filter-node-method作为第一个参数
      // val参数就是filterText监督变化的值
      console.log(val);
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 获取单个用例详情数据
    getSingleTestCaseInfo() {
      let _this = this
      Request({
        url: "/testcase/getSingleTestCaseInfo",
        method: "POST",
        params: {
          id: this.testCaseId
        }
      }).then(res => {
        if (res.respCode === "0000") {
          _this.transactId = res.testcaseViewRespDTO.transId
          _this.autId = res.testcaseViewRespDTO.autId
          _this.queryAllElementsForATransact()
          _this.queryAutVisibleOmClasses()
        } else {
          this.$message.warning(res.respMsg);
        }
      })
      .catch(err => {
        this.$message.error("连接失败"); 
      });
    },
    // 查询全部元素与UI
    queryAllElementsForATransact() {
      Request({
        url: "/elementRepository/queryAllElementsForATransact",
        method: "POST",
        params: {
          transactId: this.transactId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.getList = res.uis;
            this.repositoryId = res.elementRepositoryId
            // this.$message.success(res.respMsg);
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    // 添加UI
    addUI() {
      this.dialogVisible = true;
      this.dialogIndex = 0;
    },
    // 删除UI
    removeUI() {
      console.log("del", this.uiId, this.repositoryId);
      if (this.uiId.length === 0) {
        this.$message.warning("请选择UI");
      } else {
        Request({
          url: "/elementRepository/deleteSingleUI",
          method: "POST",
          params: {
            repositoryId: this.repositoryId,
            uiId: this.uiId
          }
        })
          .then(res => {
            if (res.respCode === "0000") {
              this.$message.success(res.respMsg);
              this.queryAllElementsForATransact();
            } else {
              this.$message.warning(res.respMsg);
            }
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }
    },
    // 添加元素
    addElement() {
      if (this.uiId.length === 0) {
        this.$message.warning("请选择UI");
      } else {
        this.dialogVisible = true;
        this.dialogIndex = 1;
      }
    },
    // 删除元素
    removeElement() {
      if (this.uiId.length === 0) {
        this.$message.warning("请选择UI");
      } else {
        Request({
          url: "/elementRepository/deleteSingleElement",
          method: "POST",
          params: {
            elementId: this.elementId,
            repositoryId: this.repositoryId,
            uiId: this.uiId
          }
        })
          .then(res => {
            if (res.respCode === "0000") {
              this.$message.success(res.respMsg);
              this.queryAllElementsForATransact();
            } else {
              this.$message.warning(res.respMsg);
            }
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }
    },
    // 节点过滤事件
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      // 包含返回true 否则返回false
      // return data.label.indexOf(value) !== -1
      if (data.uiName) {
        console.log("true");
        return data.uiName.indexOf(value) !== -1;
      } else {
        return data.elementName.indexOf(value) !== -1;
      }
    },
    // 处理节点点击
    handleNodeClick(el) {
      this.contentFlag = false;
      if (el.hasOwnProperty("uiName")) {
        this.parentNode = true;
        this.rightTitle = el.uiName;
        this.uiName = el.uiName;
        this.relateIdentifyObjectId = el.relateIdentifyObjectId;
        this.uiId = el.uiId;
        this.querySingleUI(this.uiId);
        console.log("handleNodeClick UI", this.uiId);
      } else {
        this.rightTitle = el.elementName;
        this.elementId = el.elementId;
        this.parentNode = false;
        this.configObj = el;
        this.uiId = this.expandUiId;
        this.element = el;
        if(this.element.relateProperties === null) {
          this.element.relateProperties = []
        }
        console.log("handleNodeClick元素", el);
      }
    },
    // 节点展开
    handleNodeExpand(val) {
      console.log("handleNodeExpand", val);
      this.expandUiId = val.uiId;
    },
    // 查询单个UI
    querySingleUI(uiId) {
      Request({
        url: "/elementRepository/querySingleUI",
        method: "POST",
        params: {
          repositoryId: this.repositoryId,
          uiId: uiId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            console.log("查询单个UI", res);
            this.relateIdentifyObjectId = res.relateIdentifyObjectId;
            this.selectObjectId = res.relateIdentifyObjectId;
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err.respMsg);
        });
    },
    // 处理对话框关闭
    handleBeforeClose(done) {
      console.log("handleBeforeClose");
      done();
      return true;
    },
    dialogCancel() {
      this.dialogVisible = false;
      this.dialogElementName = "";
      this.dialogUIName = "";
    },
    dialogSure() {
      let _this = this;
      console.log("sure", this.dialogIndex, this.uiId, this.repositoryId);
      if (this.dialogIndex === 0) {
        let uis = [];
        this.dialogUIName.split(",").forEach(item => {
          uis.push({ uiName: item });
        });
        console.log("sure", uis);
        Request({
          url: "/elementRepository/batchAddUI",
          method: "POST",
          params: {
            repositoryId: _this.repositoryId,
            uis: uis
          }
        })
          .then(res => {
            if (res.respCode === "0000") {
              _this.$message.success(res.respMsg);
              _this.queryAllElementsForATransact();
              _this.dialogUIName = "";
              _this.dialogVisible = false;
            } else {
              _this.$message.warning(res.respMsg);
            }
          })
          .catch(err => {
            _this.$message.error(err.respMsg);
          });
      } else {
        let elements = [];
        this.dialogElementName.split(",").forEach(item => {
          elements.push({ elementName: item });
        });
        Request({
          url: "/elementRepository/batchAddOrModifyElement",
          method: "POST",
          params: {
            elements,
            repositoryId: _this.repositoryId,
            uiId: _this.uiId
          }
        })
          .then(res => {
            if (res.respCode === "0000") {
              _this.$message.success(res.respMsg);
              _this.queryAllElementsForATransact();
              _this.dialogElementName = false;
              _this.dialogVisible = false;
            } else {
              _this.$message.warning(res.respMsg);
            }
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }
    },
    /**
     * UI库
     */
    // 关联对象
    linkObjectUI() {
      this.objectDialogVisibleUI = true
    },
    // 节点点击事件
    nodeClickObjUI(val) {
      console.log("UI节点点击", val)
      this.relateIdentifyObjectId = val.objectId
    },
    // 保存对象库关联
    modifySingleUI() {
      Request({
        url: "/elementRepository/modifySingleUI",
        method: "POST",
        params: {
          relateIdentifyObjectId: this.relateIdentifyObjectId,
          repositoryId: this.repositoryId,
          uiId: this.uiId,
          uiName: this.uiName
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.$message.success(res.respMsg);
            this.queryAllElementsForATransact();
            this.contentFlag = true;
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    // 对象库
    nodeClickObj(val) {
			this.selectObjectId = val.objectId;
			this.element.objectName = val.objectId;
			console.log('设置对象库', val, this.selectObjectId, this.element.objectName);
    },
    // 获取构件类型
    queryAutVisibleOmClasses() {
      Request({
        url: '/aut/queryAutVisibleOmClasses',
        method: 'POST',
        params: {
          autId: this.autId,
          companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
        }
      }).then(res => {
        if(res.respCode === '0000') {
          this.omClassRespDTOList = res.omClassRespDTOList
        }
      }).catch(err => {
        console.log('获取失败')
      })
    },
    // 关联对象
    linkObject() {
      this.objectDialogVisible = true;
    },
    // 解除关联
    removeLink() {
      this.relateIdentifyObjectId = ""
      this.selectObjectId = "";
      this.element.relateIdentifyObjectId = "";
    },
    // 对象库取消
    objectCancel() {
      this.objectDialogVisible = false;
    },
    // 对象库确认
    objectSure() {
      this.objectDialogVisible = false;
      this.relateIdentifyObjectId = this.objectName;
		},
		/**
		 * 元素库
		 */
		// 设置父对象
    setParentObj() {
      this.objectDialogVisibleEle = true;
      this.selectedIndex = 1;
		},
		// 移除父关联
    removeParentLink() {
      this.element.relateParentIdentifyObjectId = "";
      this.element.selectedParentId = "";
		},
		// 设置关联对象
    setLinkObj() {
      this.objectDialogVisibleEle = true;
      this.selectedIndex = 2;
    },
    // 移除对象关联
    removeObjLink() {
      this.element.relateIdentifyObjectId = "";
      this.selectedLinkId = "";
		},
		// 对象库
    nodeClickObjEle(val) {
      console.log(val);
      this.tempName = val.objectName;
      this.tempId = val.objectId;
    },
		// 对象库取消
    objectCancel() {
      this.objectDialogVisibleEle = false;
    },
    // 对象库确认
    objectSureEle() {
      this.objectDialogVisibleEle = false;
      if (this.selectedIndex === 1) {
        this.element.relateParentIdentifyObjectId = this.tempId;
      } else {
        this.element.relateIdentifyObjectId = this.tempId;
      }
    },
    // 删除按钮
    deleteButton(index) {
      switch (index) {
        case 1: {
          if (typeof this.mainFlag !== "number") {
            this.$message.warning("选择要移除的主属性内容");
          } else {
            this.element.mainProperties.splice(this.mainFlag, 1);
          }
         }
        break;
        case 2:
          {
            if (typeof this.additionalFlag !== "number") {
              this.$message.warning("选择要移除的附加属性内容");
            } else {
              this.element.additionalProperties.splice(this.additionalFlag, 1);
            }
          }
          break;
        case 3:
          {
            if (typeof this.assistantFlag !== "number") {
              this.$message.warning("选择要移除的辅助属性内容");
            } else {
              this.element.assistantProperties.splice(this.assistantFlag, 1);
            }
          }
          break;
        case 4:
          {
            if (typeof this.relateFlag !== "number") {
              this.$message.warning("选择要移除的关联属性内容");
            } else {
              this.element.relateProperties.splice(this.relateFlag, 1);
            }
          }
          break;
        default:
          break;
      }
    },
    // 添加按钮
    addButton(index) {
      let obj = {
        name: "",
        value: "",
        method: "",
        isRelative: null,
        toolName: ""
      };
      switch (index) {
        case 1: {
            this.element.mainProperties.push(obj);
          }
          break;
        case 2: {
            this.element.additionalProperties.push(obj);
          }
          break;
        case 3: {
            this.element.assistantProperties.push(obj);
          }
          break;
        case 4: {
            this.element.relateProperties.push(obj);
          }
          break;
        default:
          break;
      }
    },
    //主表格事件处理
    handleMainChange(val) {
      console.log("main", val);
      this.mainFlag = val;
    },
    //附加表格事件处理
    handleAdditionChange(val) {
      console.log("additionalFlag", val);
      this.additionalFlag = val;
    },
    //帮助表格事件处理
    handleAssistanceChange(val) {
      console.log("assistantFlag", val);
      this.assistantFlag = val;
    },
    //关联表格事件处理
    handleLinkChange(val) {
      console.log("relateFlag", val);
      this.relateFlag = val;
    },
    // 保存数据
    saveObject() {
      let _this = this
      Request({
        url: "/elementRepository/modifySingleElement",
        method: "POST",
        params: {
          element: _this.element,
          repositoryId: _this.repositoryId,
          uiId: _this.uiId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.$message.success(res.respMsg);
            _this.contentFlag = true
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.elementDiv {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .leftCard {
    float: left;
    width: 35%;
    min-height: 660px;
    .title {
      color: #868886;
      padding-left: 20px;
      margin-bottom: 10px;
    }
    .el-card {
      height: calc(100% - 40px);
      .el-input {
        width: 90%;
      }
      .el-row {
        margin-top: 10px;
        margin-left: 10px;
        .el-button {
          height: 36px;
        }
      }
      .el-tree {
        margin-top: 20px;
      }
    }
  }
  .rightCard {
    width: 64%;
    height: 700px;
    .title {
      color: #868886;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 18px;
    }
    .el-card {
      height: 660px;
      overflow: auto;
      .tipDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        line-height: 660px;
        font-size: 30px;
        color: #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .parentDiv {
        .el-form-item {
          width: 100%;
          .el-input {
            width: 300px;
          }
        }
      }
    }
  }
}
.dialogFormStyle {
  .el-input {
    width: 310px;
  }
  span {
    color: #797979;
    display: inline-block;
    font-size: 14px;
    margin-left: 100px;
    margin-top: -20px;
  }
  .el-row {
    display: flex;
    justify-content: center;
    border-top: 1px solid #e5e5e5;
    margin-top: 40px;
    padding-top: 10px;
    margin-bottom: -20px;
  }
}
.objDialog {
  .objectDiv {
    border: 1px solid gray;
    width: 98%;
    margin: 0 auto 30px auto;
    min-height: 400px;
  }
  .el-row {
    display: flex;
    justify-content: center;
    padding-right: 10px;
    margin-bottom: -15px;
    margin-top: -10px;
  }
}
.attributes {
  .baseForm {
    .el-row {
      height: 50px;
      margin-bottom: 20px;
      .el-form-item {
        float: left;
        width: 400px;
        color: #818c9c;
        margin-bottom: 0;
      }
      .buttons {
        float: left;
        margin-left: 30px;
        .el-button {
          margin-right: 30px;
        }
      }
      .buttons1 {
        float: left;
        margin-left: 30px;
        .el-button {
          margin-right: 40px;
        }
      }
    }
  }
  .attributeInfo {
    width: 50%;
    margin-left: 10px;
    .title {
      color: #aea4c1;
      padding-bottom: 5px;
      border-bottom: 1px solid #f5f7fa;
    }
    .mainAttributeDiv,
    .attachAttributeDiv,
    .auxiliaryAttributeDiv,
    .relativeAttributeDiv {
      .el-row {
        overflow: hidden;
        span:nth-child(1) {
          float: left;
          color: #9c9f9f;
          font-size: 12px;
          margin-left: 5px;
        }
        span:nth-child(2) {
          float: right;
          .el-button {
            margin-left: 0;
          }
        }
      }
      .el-input__inner {
        border: none !important;
      }
    }
    .saveRow {
      display: flex;
      justify-content: flex-end;
      margin: 10px 5px -10px;
    }
  }
  .objDialog {
    .objectDiv {
      border: 1px solid gray;
      width: 98%;
      margin: 0 auto 30px auto;
      min-height: 400px;
    }
    .el-row {
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
      margin-bottom: -15px;
      margin-top: -10px;
    }
  }
}
</style>
