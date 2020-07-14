<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-row class="btnRows">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addScene">添加用例</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-delete"
            @click="deleteTestcaseFromScene"
          >移除用例</el-button>
          <span
            class="highFunction"
            v-if="!isHighExpand"
            @click="isHighExpand =! isHighExpand"
          >{{showFun}}</span>
          <span v-if="isHighExpand" class="buttons">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-date"
              plain
              @click="executionTimePlanning"
            >执行时间规划</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-setting"
              plain
              @click="triggerSetting"
            >触发器设置</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-refresh"
              plain
              @click="executionProcessControl"
            >执行过程控制</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-data-analysis"
              plain
              @click="dataResourcePoolConfiguration"
            >数据资源池配置</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-mobile-phone"
              plain
              @click="mobileTerminalConfiguration"
            >移动端配置</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-s-tools"
              plain
              style="display:none"
              @click="expandDebug"
            >调试</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-finished"
              @click="sceneTestcaseSortSave"
              plain
            >保存顺序</el-button>
          </span>
          <span
            class="highFunction"
            v-if="isHighExpand"
            @click="isHighExpand =! isHighExpand"
          >{{foldHigh}}</span>
        </el-row>
        <el-form v-if="debugVisible" label-width="130px">
          <el-row class="debugRow" :gutter="20">
            <el-col :span="5">
              <el-form-item label="请输入调试轮次：">
                <el-input type="number" placeholder="调试轮次" v-model="debugRound"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="请选择执行范围：">
                <el-select v-model="selectedDebugRange">
                  <el-option
                    v-for="(item,index) in debugRange"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="foldCol" :span="2">
              <el-button
                type="success"
                size="small"
                icon="el-icon-s-fold"
                plain
                @click="foldDebug"
              >收起</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-card class="mainCard">
          <div class="useCaseTitle">T+0</div>
          <el-checkbox
            class="checkAllBox"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-checkbox-group
            id="sortableGroup"
            v-model="checkedSceneTestCases"
            @change="handleCheckedSceneTestCases">
            <el-row 
              class="checkboxs" 
              v-for="(item) in sceneTestCases" 
              :key="item.id">
              <i class="el-icon-sort iconI"></i>
              <el-checkbox :label="item" :value="item" border>{{item.casecode}}</el-checkbox>
            </el-row>
          </el-checkbox-group>
          <el-drawer
            class="drawer"
            size="fit-content"
            :title="drawTitles[selectedDrawIndex]"
            :visible.sync="drawerVisible"
            :modal="true"
            :direction="direction"
            :modal-append-to-body="true"
            :before-close="handleBeforeClose">
            <!--执行时间控制-->
            <el-form v-if="selectedDrawIndex == 0" :model="timeForm" label-width="110px">
              <el-form-item label="执行时间">
                <el-date-picker v-model="timeForm.time" type="datetime" placeholder="选择执行时间"></el-date-picker>
              </el-form-item>
              <el-form-item label-width="156px" label="执行时间标识T+">
                <el-input class="timeInput" v-model="timeForm.timeIdentification" clearable></el-input>
              </el-form-item>
              <el-form-item class="buttonRow">
                <el-button type="primary" size="small" @click="saveExecutionTimePlanning">保存</el-button>
              </el-form-item>
            </el-form>
            <!-- 触发器设置 -->
            <div v-if="selectedDrawIndex == 1">
              <el-form class="drawForm">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-plus" size="small" @click="addTrigger">新增</el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="small"
                    @click="triggerDelete"
                  >删除</el-button>
                  <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="small"
                    plain
                    @click="editTrigger"
                  >修改</el-button>
                </el-form-item>
              </el-form>
              <el-table
                class="tableTrigger"
                :data="trigerDtoList"
                @selection-change="handleSelectionChange"
                highlight-current-row
                border
                stripe>
                <el-table-column type="selection" width="50px" label="选择"></el-table-column>
                <el-table-column width="200px" prop="name" label="触发器名称"></el-table-column>
                <el-table-column min-width="800px" prop="desc" label="描述"></el-table-column>
                <el-table-column width="130px" label="状态">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.state">
                      <el-option
                        v-for="item in triggerStates"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="triggerButtonRow">
                <el-button type="primary" size="small" @click="saveTrigger">保存</el-button>
              </el-row>
            </div>
            <!-- 执行过程控制 -->
            <el-form class="executionProcess" v-if="selectedDrawIndex == 2" label-width="140px">
              <h3>执行策略选择：</h3>
              <p>用例级</p>
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-form-item label="执行状态策略">
                    <el-select v-model="exeStrategy1Status">
                      <el-option
                        v-for="(item,index) in executionStrategy"
                        :key="index"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <p>流程节点级</p>
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item label="起始节点策略">
                    <el-select v-model="exeStrategy2Start">
                      <el-option
                        v-for="(item,index) in startStrategy"
                        :key="index"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label-width="170px" label="执行顺序策略">
                    <el-select v-model="exeStrategy2Order">
                      <el-option
                        v-for="(item,index) in orderStrategy"
                        :key="index"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                  <el-form-item label-width="130px" label="执行状态策略">
                    <el-select v-model="exeStrategy2Status">
                      <el-option
                        v-for="(item,index) in executionStrategy"
                        :key="index"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <p>组合用例级</p>
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-form-item label="起始用例策略">
                    <el-select v-model="exeStrategy3Start">
                      <el-option
                        v-for="(item,index) in startStrategy"
                        :key="index"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label-width="170px" label="执行顺序策略">
                    <el-select v-model="exeStrategy3Order">
                      <el-option
                        v-for="(item,index) in orderStrategy"
                        :key="index"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label-width="130px" label="执行状态策略">
                    <el-select v-model="exeStrategy3Status">
                      <el-option
                        v-for="(item,index) in executionStrategy"
                        :key="index"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <p>错误处理模式</p>
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item label="出错操作">
                    <el-select v-model="exeStrategyErr">
                      <el-option
                        v-for="(item,index) in errorOperations"
                        :key="index.id"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="triggerButtonRow">
                <el-button type="primary" size="small" @click="saveExecutionProcess">保存</el-button>
              </el-row>
            </el-form>
            <!-- 数据资源池控制 -->
            <div v-if="selectedDrawIndex == 3">
              <el-form class="drawForm">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-plus" size="small" @click="addDataPool(0)">新增</el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="small"
                    @click="deleteDataPool"
                  >删除</el-button>
                  <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="small"
                    plain
                    @click="addDataPool(1)"
                  >修改</el-button>
                </el-form-item>
              </el-form>
              <el-table 
                class="tableTrigger" 
                :data="dataPoolList"
                @selection-change="handleDataPoolSelectionChange"
                highlight-current-row 
                border 
                stripe>
                <el-table-column 
                  min-width="15.56%" 
                  label="选择"
                  type="selection">
                </el-table-column>
                <el-table-column 
                  prop="dataName"
                  min-width="30.65%" 
                  label="数据名称">
                </el-table-column>
                <el-table-column 
                  prop="dataValue"
                  min-width="26.08%" 
                  label="数据值">
                </el-table-column>
                <el-table-column 
                  prop="dataDesc"
                  min-width="30.71%" 
                  label="数据描述">
                </el-table-column>
              </el-table>
            </div>
            <!-- 移动端配置 -->
            <el-form
              class="mobileConfiguration"
              v-if="selectedDrawIndex == 4"
              label-width="120px"
              :model="mobileForm">
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-form-item label="设备类型">
                    <el-input v-model="mobileForm.deviceType"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="设备名称">
                    <el-input v-model="mobileForm.deviceName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="自动化类型">
                    <el-input v-model="mobileForm.autoType"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-form-item label="应用包名">
                    <el-input v-model="mobileForm.packageName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="启动appActivity">
                    <el-input v-model="mobileForm.appActivy"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="是否重置">
                    <el-select v-model="mobileForm.isReset">
                      <el-option :value="true" label="是"></el-option>
                      <el-option :value="false" label="否"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="21">
                  <el-form-item label="接口路径">
                    <el-input v-model="mobileForm.interfacePath"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item class="buttonRow">
                <el-button type="primary" size="small" @click="initMobile">保存</el-button>
              </el-form-item>
            </el-form>
          </el-drawer>
        </el-card>
        <el-dialog 
          class="addDialog" width="34%" title="添加用例" :visible.sync="addDialogVisible">
          <p class="addTitle">用例展示形式为：用例编号 | 被测系统 | 功能点 | 关联脚本名称</p>
          <el-form :model="addForm" label-width="70px">
            <el-form-item label="添加用例">
              <el-select
                v-model="addForm.caseIds"
                :default-first-option="true"
                @change="changeSelect"
                filterable
                clearable
                multiple
              >
                <el-option
                  v-for="(item, index) in testcaseViewRespDTOList"
                  :key="index"
                  :label="item.casecode+' | '+ item.autName + ' | ' + item.transName + ' | ' + item.scriptTemplateName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="addButtons">
              <el-button type="primary" size="small" @click="addSure">添加</el-button>
              <el-button type="warning" size="small" @click="addCancel" plain>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog 
          width="32%" 
          :title="dataPoolFlag===0? '新增数据池': '修改数据池'" 
          :visible.sync="dataPoolVisible">
          <el-form 
            class="dataPoolFormStyle" 
            :model="dataPoolForm" 
            label-width="130px">
            <el-form-item 
              label="数据池名称">
              <el-select 
                v-model="dataPoolForm.dataPoolName">
                <el-option 
                  value="场景数据池" 
                  label="场景数据池">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item 
              label="数据池对象id">
              <el-select 
                v-model="dataPoolForm.objectId">
                <el-option 
                  label="2" 
                  value="2">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item 
              label="数据名称">
              <el-input 
                v-model="dataPoolForm.dataName">
              </el-input>
            </el-form-item>
            <el-form-item 
              label="数据值">
              <el-input 
                v-model="dataPoolForm.dataValue">
              </el-input>
            </el-form-item>
            <el-form-item 
              label="数据描述">
              <el-input 
                class="textarea" 
                type="textarea" 
                rows="5" 
                v-model="dataPoolForm.dataDesc">
              </el-input>
            </el-form-item>
            <el-form-item 
              class="buttonRow">
              <el-button 
                type="primary" 
                size="small" 
                @click="addDataPoolSure"
                >{{dataPoolFlag===0? '添加': '修改'}}
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                plain 
                @click="addDataPoolCancel"
                >取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog></el-dialog>
        <el-dialog 
          class="triggerDialog"
          width="40%" 
          :title="triggerFlag === 1 ? '新增触发器': '修改触发器'" 
          :visible.sync="triggerVisible">
          <el-form 
            :model="triggerForm" 
            ref="triggerForm" 
            class="triggerStyle" 
            label-width="100px">
            <el-form-item 
              label="触发器名称：">
              <el-input 
                placeholder="请输入触发器名称"
                v-model="triggerForm.name" 
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item 
              label="触发器描述：">
              <el-input 
                type="textarea" 
                rows="4" 
                placeholder="请输入描述"
                v-model="triggerForm.desc">
              </el-input>
            </el-form-item>
            <el-form-item 
              class="checkGroup" 
              label="执行时机：">
              <el-checkbox-group 
                v-model="triggerForm.occasions">
                <el-checkbox
                  v-for="(item,index) in opportunityList"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                  >{{item.label}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item 
              class="executionCondition" 
              label="执行条件：">
              <el-radio-group 
                @change="changeCheckBoxGroup" 
                v-model="triggerForm.conditionRelate">
                <el-radio
                  v-for="(item,index) in conditions"
                  :key="index"
                  :label="item.value"
                  :value="index"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-table
              class="triggerTable"
              :data="triggerForm.conditions"
              border
              stripe
              highlight-currentrow>
              <el-table-column 
                label="条件名称" 
                min-width="25.4%">
                <template 
                  slot-scope="scope">
                  <el-select 
                    v-model="scope.row.objectName">
                    <el-option
                      v-for="(item,index) in conditionNames"
                      :key="index"
                      :value="item.label"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column 
                label="匹配方式" 
                min-width="15.7%">
                <template 
                  slot-scope="scope">
                  <el-select 
                    v-model="triggerForm.conditions[scope.$index].matchType">
                    <el-option 
                      value="1" 
                      label="等于">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column 
                label="匹配值" 
                min-width="47.1%">
                <template 
                  slot-scope="scope">
                  <el-input 
                    v-model="scope.row.value"
                    placeholder="请输入匹配值">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column 
                min-width="11.8%">
                <template 
                  slot="header">
                  <el-button 
                    type="primary" 
                    size="mini" 
                    @click="triggerAddRow"
                    >增加
                  </el-button>
                </template>
                <template 
                  slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    plain
                    @click="deleteTriggerTableRow(scope.$index)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-form-item 
              label="执行动作：">
              <el-button 
                type="primary" 
                size="mini" 
                icon="el-icon-plus" 
                plain 
                @click="addAction">
              </el-button>
            </el-form-item>
            <ul>
              <li 
                v-for="(item,index) in triggerForm.actions" 
                :key="index" 
                :value="item">
                <el-form
                  label-width="80px">
                  <el-form-item 
                    label="选择操作">
                    <el-select 
                      v-model="triggerForm.actions[index].actionName">
                      <el-option 
                        value="1" 
                        label="执行脚本">
                      </el-option>
                      <el-option 
                        value="2" 
                        label="groovy类型">
                      </el-option>
                    </el-select>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      plain
                      @click="deleteRowFromExecutionAction(index)">
                    </el-button>
                  </el-form-item>
                  <el-form-item 
                    label="脚本类型">
                    <el-select 
                      v-model="triggerForm.actions[index].actionType">
                      <el-option 
                        label="groovy" 
                        value="2">
                      </el-option>
                      <el-option 
                        label="2" 
                        value="1">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item 
                    label="脚本内容">
                    <el-input
                      class="textarea"
                      type="textarea"
                      rows="4"
                      v-model="triggerForm.actions[index].scriptContent">
                    </el-input>
                  </el-form-item>
                </el-form>
              </li>
            </ul>
            <el-form-item 
              class="buttonRow">
              <el-button 
                type="primary" 
                size="small" 
                @click="triggerSure"
                >确定
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                plain
                @click="triggerCancel"
                >取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";1
import qs from "qs";
import Sortable from "sortablejs";
export default {
  name: "ScenceSetting",
  mixins: [VueMixins],
  data() {
    return {
      isHighExpand: false, //控制着高级功能
      foldHigh: "<< 收起高级功能", //收起高级功能
      sceneId: "",
      caseLibId: '1278', 
      sceneEntity: {}, // scene实体
      addDialogVisible: false, //添加对话框是否可视
      addForm: {
        caseIds: [],
        creatorId: "",
        id: ""
      }, //添加时的表单对象
      testcaseViewRespDTOList: [], //场景数据
      isIndeterminate: true, // 设置 indeterminate 状态，只负责样式控制
      checkAll: false, // 是否全选
      checkedSceneTestCases: [], //选中的场景
      sceneTestCases: [], //
      length: 0, //场景数目长度
      removeForm: {
        caseIds: [],
        id: ""
      }, //用例移除所需要的表单
      drawerVisible: false,
      direction: "btt",
      drawTitles: [
        "执行时间规划",
        "触发器设置",
        "执行过程控制",
        "数据资源池配置",
        "配置移动端设备信息"
      ],
      selectedDrawIndex: 0,
      timeForm: {
        time: "",
        timeIdentification: ""
      },
      triggerForm: {
        actions: [], // 执行动作
        conditionRelate: "", // 执行条件
        conditions: [], // 执行条件详情
        desc: "", // 触发器描述
        name: "", // 触发器名称
        occasions: [], // 执行时机
        sceneId: this.sceneId
      },
      triggerRow: {
        conditionName: "",
        matchMethod: "",
        patternValue: ""
      }, // 触发器表格单行数据
      conditionNames: [
        { label: "用例编号", value: 1 },
        { label: "测试系统名称", value: 2 },
        { label: "功能点名称", value: 3 }
      ],
      trigerDtoList: [], // 触发器查询数组
      stateDtos: [], //触发器保存按钮存储数组
      state: "", //
      triggerStates: [
        {id: 1, label: '启用'},
        {id: 0, label: '禁用'}
      ], // 触发器状态
      opportunityList: [
        { label: "场景执行前", value: '1' },
        { label: "场景执行后", value: '2' },
        { label: "用例执行前", value: '3' },
        { label: "用例执行后", value: '4' },
        { label: "元素对象方法执行前", value: '5' },
        { label: "元素对象方法执行后", value: '6' }
      ], // 执行时机选项
      triggerVisible: false, // 触发器显示
      triggerId: '', // 要修改的触发器id
      triggerFlag: 1,
      conditions: [
        { label: "满足以下所有条件", value: 1 },
        { label: "满足以下任一条件", value: 2 },
        { label: "无条件限制", value: 3 }
      ], // 执行条件
      selectedOperation: "", // 选择的操作
      selectedTriggerList: [], //选择的触发器行
      controlForm: {},
      dataConfigureForm: {},
      dataPoolForm: {
        dataPoolName: "场景数据池",
        objectId: "2",
        dataName: "",
        dataValue: "",
        dataDesc: ""
      }, // 数据池表单
      /**
       * 数据池列表
       */
      dataPoolList: [],
      dataPoolFlag: 0, // 数据池标识
      dataPoolVisible: false,
      dataPoolRowId: '', // 选中的数据池id
      mobileForm: {
        deviceType: "", //设备类型
        deviceName: "", //设备名称
        autoType: "", // 自动化类型
        packageName: "", //应用包名
        appActivy: "", //启动AppActivity
        isReset: true, //是否重置
        interfacePath: "" //接口路径
      }, // 配置移动端设备信息
      exeStrategy1Status: "", // 用例执行策略
      exeStrategy2Start: "", // 起始节点策略
      exeStrategy2Order: "", //流程级执行顺序策略
      exeStrategy2Status: "", // 执行状态策略
      exeStrategy3Start: "", // 起始用例策略
      exeStrategy3Order: "", // 组合级执行顺序策略
      exeStrategy3Status: "", // 组合级执行状态策略
      exeStrategyErr: "", // 出错操作
      executionStrategy: [
        {id: 1, label: "全部重新执行"},
        {id: 2, label: "跳过执行成功的用例"}
      ], // 执行策略数据
      startStrategy: [
        {id: 1, label: "从第一个执行节点开始"}, 
        {id: 2, label: "从第一个失败的执行节点开始"}
      ], // 起始策略
      orderStrategy: [
        {id: 1, label: "顺序无关执行"}, 
        {id: 2, label: "强制顺序执行"}
      ], //执行顺序策略
      errorOperations: [
        {id: 1, label: "出错后终止"}, 
        {id: 2, label: "出错后继续执行"}, 
        {id: 3, label: "出错后由用户选择"}
      ],
      debugVisible: false, //调试是否可见
      debugRound: "", //调试轮次
      debugRange: ["全部执行", "执行选中的用例"], //执行范围
      selectedDebugRange: "",
      caseIdList: [], // 场景顺序
      showFun: '展开高级功能 >>',
      hideFun: ''
    };
  },
  created() {
    // 获取上个界面传递的sceneId
    this.sceneId = this.$route.query.id;
    this.caseLibId = this.$route.query.caseLibId
    this.selectScene();
    this.getMobileInfo();
    this.pagedBatchQueryTestCase();
    this.pagedBatchQueryDataPool()
  },
  mounted() {
    this.sort();
  },
  methods: {
    // 执行排序操作_
    sort() {
      let _this = this;
      const el = document.getElementById("sortableGroup");
      new Sortable.create(el, {
        animation: 150, // 动画时长
        sort: true, // 是否启用拖拽排序
        delay: 0,
        preventOnFilter: false,
        onEnd(evt) {
          console.log(evt);
          console.log("原先的地址", evt.oldIndex);
          console.log("新的地址", evt.newIndex);
          const movedRow = _this.sceneTestCases.splice(evt.oldIndex, 1)[0];
          _this.sceneTestCases.splice(evt.newIndex, 0, movedRow);
          console.log("地址修改完", _this.sceneTestCases);
        }
      });
    },
    // 获取场景
    selectScene() {
      Request({
        url: "/sceneController/selectScene",
        method: "POST",
        params: {
          id: this.sceneId
        }
      })
        .then(res => {
          this.sceneTestCases = res.selectSceneDto.caseDtos;
          this.length = res.selectSceneDto.caseDtos.length;
          this.addForm.caseIds = [];
          this.removeForm.caseIds = [];
          this.sceneEntity = res.selectSceneDto.sceneEntity
          this.exeStrategy1Status = this.sceneEntity.exeStrategy1Status 
          this.exeStrategy2Order = this.sceneEntity.exeStrategy2Order  
          this.exeStrategy2Start = this.sceneEntity.exeStrategy2Start
          this.exeStrategy2Status = this.sceneEntity.exeStrategy2Status
          this.exeStrategy3Order = this.sceneEntity.exeStrategy3Order
          this.exeStrategy3Start = this.sceneEntity.exeStrategy3Start
          this.exeStrategy3Status = this.sceneEntity.exeStrategy3Status
          this.exeStrategyErr = this.sceneEntity.exeStrategyErr
        })
        .catch(error => {
          this.$message.error("场景数据获取失败");
        });
    },
    // 获取全部测试用例
    pagedBatchQueryTestCase() {
      Request({
        url: "/testcase/pagedBatchQueryTestCase",
        method: "POST",
        params: {
          caseLibId: this.caseLibId,
          currentPage: 1,
          orderColumns: "id",
          orderType: "asc",
          pageSize: 3000
        }
      })
        .then(res => {
          console.log("res", res);
          this.testcaseViewRespDTOList = res.testcaseViewRespDTOList;
        })
        .catch(error => {
          this.$message.error("场景列表获取失败");
        });
    },
    // 获取移动端内容
    getMobileInfo() {
      Request({
        url: "/mobileController/queryMobile",
        method: "POST",
        params: {
          sceneId: this.sceneId
        }
      })
        .then(res => {
          console.log("数据获取成功", res);
          let mobileProperties = res.mobileProperties;
          if (mobileProperties) {
            this.mobileForm.appActivy = mobileProperties.appActivity;
            this.mobileForm.packageName = mobileProperties.appPackage;
            this.mobileForm.autoType = mobileProperties.automationName;
            this.mobileForm.deviceName = mobileProperties.deviceName;
            this.mobileForm.isReset == mobileProperties.noReset;
            this.mobileForm.deviceType = mobileProperties.platformName;
            this.sceneId = mobileProperties.sceneId;
            this.mobileForm.interfacePath = mobileProperties.url;
          }else {
            this.mobileForm.appActivy = "";
            this.mobileForm.packageName = "";
            this.mobileForm.autoType = "";
            this.mobileForm.deviceName = "";
            this.mobileForm.isReset == false;
            this.mobileForm.deviceType = "";
            this.sceneId = -1;
            this.mobileForm.interfacePath = "";
          }
        })
        .catch(error => {
          console.log("该被测系统无移动端内容");
        });
    },
    // 将选择的用例添加到场景
    insertTestcaseToScene() {
      this.addForm.id = this.sceneId;
      this.addForm.creatorId = "3";
      Request({
        url: "/sceneController/insertTestcaseToScene",
        method: "POST",
        params: this.addForm
      })
        .then(res => {
          this.$message.success(res.respMsg);
          this.selectScene();
        })
        .catch(error => {
          this.$message.error("添加失败");
        });
    },
    changeSelect() {
      console.log(this.addForm.caseIds);
    },
    // 添加场景事件
    addScene() {
      this.addDialogVisible = true;
      this.removeForm.caseIds = [];
    },
    // 确认添加
    addSure() {
      this.insertTestcaseToScene();
      this.addDialogVisible = false;
    },
    // 取消添加
    addCancel() {
      this.addDialogVisible = false;
    },
    // 删除场景事件
    deleteTestcaseFromScene() {
      if (this.removeForm.caseIds.length === 0) {
        this.$message.warning("请选择要删除的用例");
      } else {
        this.removeForm.id = this.sceneId;
        Request({
          url: "/sceneController/deleteTestcaseFromScene",
          method: "POST",
          params: this.removeForm
        })
          .then(res => {
            this.$message.success("删除成功");
            this.isIndeterminate = false;
            this.checkAll = false;
            this.selectScene();
          })
          .catch(error => {
            this.$message.error("删除失败");
          });
      }
    },
    /**
     * 时间规划
     */
    // 执行时间规划
    executionTimePlanning() {
      this.selectedDrawIndex = 0;
      this.drawerVisible = true;
    },
    // 保存执行时间规划数据
    saveExecutionTimePlanning() {
      Request({
        url: '/sceneController/sceneTestcaseSetting',
        method: 'POST',
        params: {
          sceneId: this.sceneId,
          caseIds: [],
          executeTime: this.timeForm.time,
          executeDateFlag: this.timeForm.timeIdentification,
          combineGroupName: '',
          orderNum: 1,
          runTotalNumber: 2,
          modifierId: 3
        }
      }).then(res => {
        if(res.respCode === '0000'){
						this.$message.success(res.respMsg);
					} else {
						this.$message.error(res.respMsg)
					}
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },
    /**
     * 触发器
     */
    // 触发器设置
    triggerSetting() {
      this.queryTrigerForScene();
      this.selectedDrawIndex = 1;
      this.drawerVisible = true;
    },
    // 执行过程控制
    executionProcessControl() {
      this.selectedDrawIndex = 2;
      this.drawerVisible = true;
    },
    // 数据资源池配置
    dataResourcePoolConfiguration() {
      this.selectedDrawIndex = 3;
      this.drawerVisible = true;
    },
    // 移动端配置
    mobileTerminalConfiguration() {
      this.selectedDrawIndex = 4;
      this.drawerVisible = true;
      this.getMobileInfo()
    },
    // 设置全选
    handleCheckAllChange(val) {
      this.removeForm.caseIds = [];
      console.log("handleCheckAllChange", val);
      this.checkedSceneTestCases = val ? this.sceneTestCases : [];
      if (this.checkedSceneTestCases == this.sceneTestCases) {
        this.sceneTestCases.forEach(item => {
          this.removeForm.caseIds.push(item.id);
        });
      }
      this.isIndeterminate = false;
      console.log(this.removeForm);
    },
    // 场景用例变换时使用
    handleCheckedSceneTestCases(val) {
      this.removeForm.caseIds = [];
      let length = val.length;
      this.checkAll = length === this.sceneTestCases.length;
      this.isIndeterminate = length > 0 && length < this.sceneTestCases.length;
      val.forEach(item => {
        this.removeForm.caseIds.push(item.id);
      });
      console.log(this.removeForm);
    },
    // elDrawer的关闭事件
    handleBeforeClose(done) {
      this.$confirm(
        "是否关闭" + this.drawTitles[this.selectedDrawIndex],
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 展开debug行
    expandDebug() {
      this.debugVisible = true;
      Request({
        url: "",
        method: "POST",
        params: qs.stringify({
          debuground: "",
          sceneId: type,
          exeScope: "",
          selectState: []
        })
      })
        .then(res => {
          console.log("debug成功");
        })
        .catch(error => {
          console.log("debug失败");
        });
    },
    // 收起debug行
    foldDebug() {
      this.debugVisible = false;
    },
    // 触发器新增行
    triggerAddRow() {
      let obj = {
        objectName: "",
        matchType: "",
        value: ""
      }; //
      this.triggerForm.conditions.push(obj);
    },
    // 删除触发器行
    deleteTriggerTableRow(index) {
      this.triggerForm.conditions.splice(index, 1);
    },
    // 新增执行动作
    addAction() {
      console.log('addAction新建对象')
      let obj = {
        actionName: "",
        actionType: "",
        scriptContent: ""
      };
      this.triggerForm.actions.push(obj);
    },
    // 从列表中删除某行
    deleteRowFromExecutionAction(index) {
      this.triggerForm.actions.splice(index, 1);
    },
    /**
     * 触发器
     */
    // 新增触发器
    addTrigger() {
      this.triggerVisible = true;
      this.triggerFlag = 1
      this.triggerForm.actions = []
      this.triggerForm.conditionRelate = ""
      this.triggerForm.conditions = []
      this.triggerForm.desc = ""
      this.triggerForm.name = ""
      this.triggerForm.occasions = []
    },
    // 修改触发器
    editTrigger() {
      if (this.selectedTriggerList.length === 0) {
        this.$message.error("请选择要修改项");
      } else {
        this.triggerFlag = 2
        this.triggerVisible = true;
        this.queryTriger()
      }
    },
    // 查询单个触发器
    queryTriger() {
      Request({
        url: '/trigerController/queryTriger',
        method: 'POST',
        params: {
          id: this.triggerId
        }
      }).then(res => {
        this.triggerForm.actions = res.actions
        this.triggerForm.conditionRelate = res.trigerEntity.exeConditionRelate
        this.triggerForm.conditions = res.conditions? res.conditions: []
        this.triggerForm.desc = res.trigerEntity.trigerDesc
        this.triggerForm.name = res.trigerEntity.trigerName
        this.triggerForm.occasions = res.occasions
        console.log('修改', this.triggerForm, res)
      }).catch(err => {
        console.log('失败')
      })
    },
    changeCheckBoxGroup() {
      console.log("changeVaue", this.triggerForm.conditionRelate);
    },
    // 触发器确定事件
    triggerSure() {
      console.log("请求对象", this.triggerForm);
      if(this.triggerFlag === 1) {
        Request({
          url: "/trigerController/insertTriger",
          method: "POST",
          params: {
            actions: JSON.stringify(this.triggerForm.actions),
            conditionRelate: this.triggerForm.conditionRelate,
            conditions: JSON.stringify(this.triggerForm.conditions),
            desc: this.triggerForm.desc,
            name: this.triggerForm.name,
            occasions: JSON.stringify(this.triggerForm.occasions),
            sceneId: this.sceneId
          }
        }).then(res => {
          this.$message.success("添加成功");
          this.queryTrigerForScene();
        }).catch(error => {
          this.$message.error("场景数据添加失败");
        });
      }else {
        let params = {
          actions:  JSON.stringify(this.triggerForm.actions),
          conditionRelate: this.triggerForm.conditionRelate,
          conditions: JSON.stringify(this.triggerForm.conditions),
          desc: this.triggerForm.desc,
          id: this.triggerId, 
          modifyType: 2,
          name: this.triggerForm.name,
          occasions: JSON.stringify(this.triggerForm.occasions)
        }
        Request({
          url: "/trigerController/updataTriger",
          method: "POST",
          params
        }).then(res => {
          this.$message.success("修改成功");
          this.queryTrigerForScene();
        }).catch(error => {
          this.$message.error("场景数据添加失败");
        });
        console.log('修改', params)
      }
      this.triggerVisible = false;
    },
    // 删除触发器
    triggerDelete() {
      if (this.selectedTriggerList.length == 0) {
        this.$message.warning("请选择要删除的列");
      } else {
        this.$confirm("此操作将会删除当前选中数据", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deleteTriger();
          })
          .catch(() => {
            this.triggerCancel();
          });
      }
    },
    // 确认删除
    deleteTriger() {
      Request({
        url: "/trigerController/deleteTriger",
        method: "POST",
        params: {
          id: this.selectedTriggerList[0].id
        }
      })
        .then(res => {
          this.$message.success("删除成功");
          this.queryTrigerForScene();
        })
        .catch(err => {
          this.$message.error("删除失败");
        });
    },
    // 触发器取消事件
    triggerCancel() {
      this.triggerVisible = false;
    },
    // 触发器存储
    saveTrigger() {
      Request({
        url: '/trigerController/updateTrigerState',
        method: 'POST',
        params: {
          stateDtos: this.trigerDtoList // 此处stateDtos保存内容？
        }
      }).then(res => {
        if(!res.respCode === '0000') {
          this.$message.error('保存失败')
        }
          this.$message.success('保存成功')
      }).catch(err => {
        this.$message.error('保存失败')     
      })
    },
    // 查询场景下的触发器
    queryTrigerForScene() {
      Request({
        url: "/trigerController/queryTrigerForScene",
        method: "POST",
        params: {
          sceneId: this.sceneId
        }
      })
        .then(res => {
          console.log("查询成功", res);
          this.trigerDtoList = res.trigerDtoList;
        })
        .catch(error => {
          this.$message.error("触发器获取失败");
        });
    },
    // 处理触发器情况下的选择
    handleSelectionChange(val) {
      this.selectedTriggerList = val;
      this.triggerId = val[0].id
      console.log("修改", val, this.triggerId);
    },
    /**
     * 数据资源池
     */
    // 新增修改数据池
    addDataPool(i) {
      this.dataPoolFlag = i
      if(i ===0) {
        this.dataPoolVisible = true;
      }else if(i === 1 && this.dataPoolRowId === "") {
        this.$message.warning('请选择要修改的行')
      }else {
        this.dataPoolVisible = true;
        this.setDataPool()
      }
    },
    // 设置数据池数据
    setDataPool() {
      const row = this.dataPoolList.find(item => item.id === this.dataPoolRowId)
      console.log('setDataPool', row, this.dataPoolList)
      this.dataPoolForm.dataName = row.dataName
      this.dataPoolForm.dataValue = row.dataValue
      this.dataPoolForm.dataDesc = row.dataDesc
      this.dataPoolForm.dataPoolName = row.poolName
      this.dataPoolForm.objectId = row.poolObjId
    },
    // 删除数据池
    deleteDataPool() {
      if(this.dataPoolRowId === '') {
        this.$message.warning('请选择要删除的行')
      }else {
        Request({
        url: '/dataPool/deleteSingleDataPool',
        method: 'POST',
        params: {
          id: this.dataPoolRowId
        }
      }).then(res => {
        this.$message.success('删除成功')
        this.pagedBatchQueryDataPool()
      }).catch(err => {
        this.$message.error('删除失败')
      })
      }
    },
    // 新增数据池确定
    addDataPoolSure() {
      let url = ''
      let params = {}
      let successInfo = ''
      let errorInfo = ''
      if(this.dataPoolFlag === 0) {
        url = '/dataPool/addSingleDataPool'
        params = {
          poolName: this.dataPoolForm.dataPoolName,
          poolObjId: this.dataPoolForm.objectId,
          dataName: this.dataPoolForm.dataName,
          dataValue: this.dataPoolForm.dataValue,
          dataDesc: this.dataPoolForm.dataDesc
        }
        successInfo = '添加成功'
        errorInfo = '添加失败'
      }else {
        url = '/dataPool/modifySingleDataPool'
        params = {
          poolName: this.dataPoolForm.dataPoolName,
          poolObjId: this.dataPoolForm.objectId,
          dataName: this.dataPoolForm.dataName,
          dataValue: this.dataPoolForm.dataValue,
          dataDesc: this.dataPoolForm.dataDesc,
          id: this.dataPoolRowId
        }
        successInfo = '修改成功'
        errorInfo = '修改失败'
      }
      Request({
        url,
        method: 'POST',
        params
      }).then(res => {
        this.$message.success(successInfo)
        this.dataPoolVisible = false;
        this.pagedBatchQueryDataPool()
        this.dataPoolForm.dataName = ""
        this.dataPoolForm.dataValue = ""
        this.dataPoolForm.dataDesc = ""
      }).catch(err => {
        this.$message.error(errorInfo)
      })
    },
    // 新增数据池取消
    addDataPoolCancel() {
      this.dataPoolVisible = false;
    },
    // 数据资源池控制
    handleDataPoolSelectionChange(row) {
      if(row.length > 0) {
        this.dataPoolRowId = row[row.length -1].id
      }else {
        this.dataPoolRowId = '' 
      }
      console.log('handleDataPoolSelectionChange', row, this.dataPoolRowId)
    },
    // 移动端配置
    initMobile() {
      let params = {
        'appActivity': this.mobileForm.appActivy,
        'appPackage': this.mobileForm.packageName,
        'automationName': this.mobileForm.autoType,
        'deviceName': this.mobileForm.deviceName,
        'noReset':
          this.mobileForm.isReset,
        'platformName': this.mobileForm.deviceType,
        'sceneId': Number(this.sceneId),
        'url': this.mobileForm.interfacePath
      };
      console.log("参数", params);
      Request({
        url: "/mobileController/initMobile",
        method: "POST",
        params
      })
        .then(res => {
          this.$message.success("添加成功");
        })
        .catch(err => {
          this.$message.error("添加失败");
        });
    },
    /**
     * 执行过程
     */
    // 获取执行过程
    pagedBatchQueryDataPool() {
      console.log(this.errorOperation);
      Request({
        url: "/dataPool/pagedBatchQueryDataPool",
        method: "POST",
        params: {
          pageSize: 10000,
          currentPage: 1,
          orderType: 'asc',
          orderColumns: 'id',
          poolName: '场景数据池',
          poolObjId: 2
        }
      }).then(res => {
        this.dataPoolList = res.list
        console.log('pagedBatchQueryDataPool', this.dataPoolList)
      }).catch(err => {
        this.$message.error('无数据资源池配置')
      });
    },
    // 保存执行过程
    saveExecutionProcess() {
      let params = {
          exeStrategy1Status: this.exeStrategy1Status,
          exeStrategy2Order: this.exeStrategy2Order,
          exeStrategy2Start: this.exeStrategy2Start,
          exeStrategy2Status: this.exeStrategy2Status,
          exeStrategy3Order: this.exeStrategy3Order,
          exeStrategy3Start: this.exeStrategy3Start,
          exeStrategy3Status: this.exeStrategy3Status,
          exeStrategyErr: this.exeStrategyErr,
          id: this.sceneId
        }
      Request({
        url: "/sceneController/sceneStrategySetting",
        method: "POST",
        params
      }).then(res => {
        this.$message.success('保存成功')
      }).catch(err => {
        this.$message.error('保存失败')
      });
    },
    /**
     * 调试
     */
    scenedubug() {
      Request({
        url: "/executeController/scenedubug",
        method: "POST",
        params: {
          debuground: this.debugRound,
          sceneId: this.sceneId,
          exeScope: '',
          selectState: []
        }
      }).then(res => {
        this.$message.success("保存成功");
      }).catch(err => {
        this.$message.error("保存成功");
      });
    },
    // 保存顺序
    sceneTestcaseSortSave() {
      this.caseIdList = [];
      this.sceneTestCases.forEach(item => {
        this.caseIdList.push(item.id);
      });
      console.log("地址", this.caseIdList, this.sceneId);
      Request({
        url: "/sceneController/sceneTestcaseSortSave",
        method: "POST",
        params: {
          sceneId: this.sceneId,
          caseIdList: this.caseIdList
        }
      })
        .then(res => {
          this.$message.success("保存成功");
          this.selectScene()
        })
        .catch(err => {
          this.$message.error("保存成功");
        });
    }
  }
};
</script>

<style lang="less" scoped>
  .btnRows {
    .highFunction {
      font-size: 13px;
      margin-left: 10px;
      cursor: pointer;
      color: gray;
      display: block;
      width: 100px;
    }
    .highFunction:hover {
      color: #409eff;
    }
    .buttons {
      margin-left: 10px;
    }
  }
  .addDialog {
    .addTitle {
      margin: -10px auto 30px auto;
      font-size: 17px;
      color: #9090b5;
      text-align: center;
    }
    .el-select {
      width: 90%;
    }
    .addButtons {
      display: flex;
      justify-content: flex-end;
      margin-bottom: -15px;
    }
  }
  .debugRow {
    height: 60px;
    .el-col {
      height: 40px;
    }
    .foldCol {
      display: flex;
      align-items: center;
    }
  }
  .mainCard {
    .useCaseTitle {
      margin-left: 40px;
      width: 155px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 22px;
      color: #7979a4;
      border: 1px solid rgb(221, 213, 213);
    }
    .checkAllBox {
      margin-top: 15px;
    }
    .checkboxs {
      margin: -10px auto;
      background-color: #fafafa;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      position: relative;
      height: 60px;
      .iconI {
        display: block;
        position: absolute;
        width: 26px;
        height: 26px;
        top: 14px;
        color: black;
        background: white;
      }
      .el-checkbox {
        margin-left: 40px;
        width: 230px;
        font-size: 16px;
      }
    }
  }
  .drawer {
    .buttonRow {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      padding-right: 20px;
    }
    width: calc(100% - 239px);
    margin-left: 239px;
    .timeInput {
      width: 175px;
    }
    .drawForm {
      padding-left: 20px;
    }
    .tableTrigger {
      width: 98%;
      margin: 0px auto;
    }
    p,
    h3 {
      color: #72767b;
      margin-left: 30px;
      line-height: 30px;
      font-weight: bold;
    }
    p {
      margin-left: 40px;
    }
    .el-row {
      height: 50px;
    }
    .executionProcess {
      .el-select {
        width: 200px;
      }
      .el-col-4,
      .el-col-5 {
        height: 40px;
      }
      .el-form-item {
        margin: 0px;
      }
    }
    .mobileConfiguration {
      .el-input {
        width: 100%;
      }
      .el-col-7 {
        height: 40px;
      }
      .el-form-item {
        margin-bottom: 0px;
      }
      .el-row {
        height: 60px;
      }
    }
  }
  .dataPoolFormStyle {
    .el-select,
    .el-input {
      width: 90%;
    }
    .textarea {
      width: 90%;
    }
    .buttonRow {
      display: flex;
      justify-content: flex-end;
      margin-bottom: -10px;
      margin-right: 20px;
    }
  }
  .triggerDialog {
    .el-dialog {
      height: 700px !important;
      overflow: scroll;
      .triggerStyle {
        .checkGroup {
          margin-top: -10px;
        }
        .executionCondition {
          margin-top: -25px;
        }
        ul {
          margin: 0px;
          padding: 0px;
          margin-left: 30px;
          margin-right: 20px;
        }
        li {
          width: 100%;
          height: 225px;
          border: 1px dashed gray;
          border-bottom: none;
          padding-top: 10px;
          overflow: hidden;
          .el-form {
            .el-form-item {
              margin-bottom: 5px;
            }
            .el-form-item__content {
              margin-left: 0px !important;
            }
            .el-select {
              height: 24px;
              width: 150px;
            }
            .el-input__inner {
              height: 24px !important;
              line-height: 24px !important;
            }
            .el-form-item__label {
              line-height: 30px;
            }
            .el-button {
              float: right;
              margin-right: 10px;
            }
            .textarea {
              width: 98%;
            }
          }
        }
        li:last-child {
          border-bottom: 1px dashed gray;
        }
        .buttonRow {
          display: flex;
          margin-bottom: -15px;
          justify-content: flex-end;
        }
      }
    }
  }
  .triggerButtonRow {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    .el-button {
      margin-top: 10px;
      height: 30px !important;
    }
  }
</style>