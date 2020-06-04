<template>
  <div class="page-inner">
    <el-container>
    <el-main>
      <el-row class="btnRows">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addScene"
          >添加用例
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-delete"
          @click="deleteTestcaseFromScene"
          >移除用例
        </el-button>
        <span
          class="highFunction"
          v-if="!isHighExpand"
          @click="isHighExpand =! isHighExpand">
          >>展开高级功能
        </span>
        <span
          v-if="isHighExpand" 
          class="buttons">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-date"
            plain
            @click="executionTimePlanning"
            >执行时间规划
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-setting"
            plain
            @click="triggerSetting"
            >触发器设置
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-refresh"
            plain
            @click="executionProcessControl"
            >执行过程控制
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-data-analysis"
            plain
            @click="dataResourcePoolConfiguration"
            >数据资源池配置
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-mobile-phone"
            plain
            @click="mobileTerminalConfiguration"
            >移动端配置
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-s-tools"
            plain
            @click="expandDebug"
            >调试
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-finished"
            @click="sceneTestcaseSortSave"
            plain
            >保存顺序
          </el-button>
        </span>
        <span
          class="highFunction"
          v-if="isHighExpand"
          @click="isHighExpand =! isHighExpand">
          {{foldHigh}}
        </span>
      </el-row>
      <el-form
        v-if="debugVisible"
        label-width="130px">
        <el-row
          class="debugRow"
          :gutter="20">
          <el-col
            :span="5">
            <el-form-item
              label="请输入调试轮次：">
              <el-input
                type="number"
                placeholder="调试轮次"
                v-model="debugRound">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="5">
            <el-form-item
              label="请选择执行范围：">
             <el-select
              v-model="selectedDebugRange">
              <el-option
                v-for="(item,index) in debugRange"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col
            class="foldCol"
            :span="2">
            <el-button
              type="success"
              size='small'
              icon="el-icon-s-fold"
              plain
              @click="foldDebug"
              >收起
            </el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-card class="mainCard">
        <div class="useCaseTitle">
         T+0
        </div>
        <el-checkbox
          class="checkAllBox"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选
        </el-checkbox>
        <el-checkbox-group
          id="sortableGroup"
          v-model="checkedSceneTestCases"
          @change="handleCheckedSceneTestCases">
          <el-row 
            class="checkboxs"
            v-for="(item) in sceneTestCases"
            :key="item.id">
            <i class="el-icon-sort iconI"></i>
            <el-checkbox
              :label="item"
              :value="item"
              border>
              {{item.casecode}}
            </el-checkbox>
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
          <el-form
            v-if="selectedDrawIndex == 0"
            :model="timeForm"
            label-width="110px">
            <el-form-item
              label="执行时间">
              <el-date-picker
                v-model="timeForm.time"
                type="datetime"
                placeholder="选择执行时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label-width="156px"
              label="执行时间标识T+">
              <el-input
                class="timeInput"
                v-model="timeForm.timeIdentification"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item
              class="buttonRow">
              <el-button
                type="primary"
                size="small"
                @click="save"
                >保存
              </el-button>
            </el-form-item>
          </el-form>
          <!-- 触发器设置 -->
          <div v-if="selectedDrawIndex == 1">
            <el-form
              class="drawForm">
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="small"
                  @click="addTrigger"
                  >新增
                </el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="triggerDelete"
                  >删除
                </el-button>
                <el-button
                  type="success"
                  icon="el-icon-edit"
                  size="small"
                  plain
                  @click="editTrigger"
                  >修改
                </el-button>
              </el-form-item>
            </el-form>
            <el-table
              class="tableTrigger"
              :data="trigerDtoList"
              @selection-change="handleSelectionChange"
              highlight-current-row
              border
              stripe>
              <el-table-column
                type="selection"
                width="50px"
                label="选择">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="name"
                label="触发器名称">
              </el-table-column>
              <el-table-column
                min-width="800px"
                prop="desc"
                label="描述">
              </el-table-column>
              <el-table-column
                width="130px"
                label="状态">
                <template>
                  <el-select
                    v-model="state">
                    <el-option
                      label="启用"
                      value="1">
                    </el-option>
                    <el-option
                      label="禁用"
                      value="2">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
            <el-row
              class="buttonRow">
              <el-button
                type="primary"
                size="small"
                >保存
              </el-button>
            </el-row>
          </div>
          <!-- 执行过程控制 -->
          <el-form
            class="executionProcess"
            v-if="selectedDrawIndex == 2"
            label-width="140px">
            <h3>
              执行策略选择：
            </h3>
            <p>用例级</p>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item
                  label="执行状态策略">
                  <el-select
                    v-model="useCaseExecution">
                    <el-option
                      v-for="(item,index) in executionStrategy"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <p>流程节点级</p>
            <el-row :gutter="20">
              <el-col :span="4">
                <el-form-item
                  label="起始节点策略">
                  <el-select
                    v-model="startNode">
                    <el-option
                      v-for="(item,index) in startStrategy"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item
                  label-width="170px"
                  label="执行顺序策略">
                  <el-select
                    v-model="executionOrder">
                    <el-option
                      v-for="(item,index) in orderStrategy"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-form-item
                  label-width="130px"
                  label="执行状态策略">
                  <el-select
                    v-model="executionStatus">
                    <el-option
                      v-for="(item,index) in executionStrategy"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <p>组合用例级</p>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item
                  label="起始用例策略">
                  <el-select
                    v-model="startUseCase">
                    <el-option
                      v-for="(item,index) in startStrategy"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label-width="170px"
                  label="执行顺序策略">
                  <el-select
                    v-model="executionOrderCombination">
                    <el-option
                      v-for="(item,index) in orderStrategy"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item
                  label-width="130px"
                  label="执行状态策略">
                  <el-select
                    v-model="executionStatusCombination">
                    <el-option
                      v-for="(item,index) in executionStrategy"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <p>错误处理模式</p>
            <el-row :gutter="20">
              <el-col :span="4">
                <el-form-item
                  label="出错操作">
                  <el-select
                    v-model="errorOperation">
                    <el-option
                      v-for="(item,index) in errorOperations"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              class="buttonRow">
              <el-button
                type="primary"
                size="small"
                @click="saveExecutionProcess"
                >保存
              </el-button>
            </el-row>
          </el-form>
          <!-- 数据资源池控制 -->
          <div v-if="selectedDrawIndex == 3">
            <el-form
              class="drawForm">
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="small"
                  @click="addDataPool"
                  >新增
                </el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="addDataPoolSure"
                  >删除
                </el-button>
                <el-button
                  type="success"
                  icon="el-icon-edit"
                  size="small"
                  plain
                  @click="addDataPoolCancel"
                  >修改
                </el-button>
              </el-form-item>
            </el-form>
            <el-table
              class="tableTrigger"
              highlight-current-row
              border
              stripe>
              <el-table-column
                min-width="15.56%"
                label="选择">
              </el-table-column>
              <el-table-column
                min-width="30.65%"
                label="数据名称">
              </el-table-column>
              <el-table-column
                min-width="26.08%"
                label="数据值">
              </el-table-column>
              <el-table-column
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
            <el-row
              :gutter="20">
              <el-col :span="7">
                <el-form-item
                  label="设备类型">
                  <el-input
                    v-model="mobileForm.deviceType">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  label="设备名称">
                  <el-input
                    v-model="mobileForm.deviceName">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  label="自动化类型">
                  <el-input
                    v-model="mobileForm.autoType">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              :gutter="20">
              <el-col
                :span="7">
                <el-form-item
                  label="应用包名">
                  <el-input
                    v-model="mobileForm.packageName">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="7">
                <el-form-item
                  label="启动appActivity">
                  <el-input
                    v-model="mobileForm.appActivy">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="7">
                <el-form-item
                  label="是否重置">
                  <el-select
                    v-model="mobileForm.isReset">
                    <el-option
                      value="true"
                      label="是">
                    </el-option>
                    <el-option
                      value="false"
                      label="否">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="21">
                <el-form-item
                  label="接口路径">
                  <el-input
                    v-model="mobileForm.interfacePath">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              class="buttonRow">
              <el-button
                type="primary"
                size="small"
                @click="initMobile"
                >保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
      </el-card>
      <el-dialog
        class="addDialog"
        width="34%"
        title="添加用例"
        :visible.sync="addDialogVisible">
        <p class="addTitle">用例展示形式为：用例编号 | 被测系统 | 功能点 | 关联脚本名称</p>
        <el-form
          :model="addForm"
          label-width="70px">
          <el-form-item
            label="添加用例">
            <el-select
              v-model="addForm.caseIds"
              :default-first-option="true"
              @change="changeSelect"
              filterable
              clearable
              multiple>
              <el-option
                v-for="(item, index) in testcaseViewRespDTOList" 
                :key="index"
                :label="item.casecode+' | '+ item.autName + ' | ' + item.transName + ' | ' + item.scriptTemplateName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="addButtons">
            <el-button
              type="primary"
              size="small"
              @click="addSure"
              >添加
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="addCancel"
              plain
              >取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="新增数据池"
        width="32%"
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
              v-model="dataPoolForm.dataName">
            </el-input>
          </el-form-item>
          <el-form-item
            label="数据描述">
            <el-input
              class="textarea"
              type="textarea"
              rows="5"
              v-model="dataPoolForm.dataName">
            </el-input>
          </el-form-item>
          <el-form-item
            class="buttonRow">
            <el-button
              type="primary"
              size="small"
              @click="addDataPoolSure"
              >添加
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
      <el-dialog>
      </el-dialog>
      <el-dialog
        title="新增触发器"
        width="40%"
        :visible.sync="triggerVisible">
        <el-form
          :model="triggerForm"
          ref="triggerForm"
          class="triggerStyle"
          label-width="100px">
          <el-form-item
            label="触发器名称：">
            <el-input
              v-model="triggerForm.name"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item
            label="触发器描述：">
            <el-input
              type="textarea"
              rows="4"
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
                :label="item.value">
                {{item.label}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            class="executionCondition"
            label="执行条件：">
            <el-radio-group
              @change='changeCheckBoxGroup'
              v-model="triggerForm.conditionRelate">
              <el-radio
                v-for="(item,index) in conditions"
                :key="index"
                :label="item.value">
                {{item.label}}
              </el-radio>
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
              <template slot-scope="scope">
                <el-select
                  v-model="triggerForm.conditions[scope.$index].ObjectName">
                  <el-option
                    v-for="(item,index) in conditionNames"
                    :key="index"
                    :value="item.value"
                    :label="item.label">
                  </el-option>
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
                  v-model="triggerForm.conditions[scope.$index].value">
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
                  >删除
                </el-button>
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
              <el-form-item
                label-width="80px"
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
                label-width="80px"
                label="脚本类型">
                <el-select
                  v-model="triggerForm.actions[index].actionType">
                  <el-option
                    label="groovy"
                    value="1">
                  </el-option>
                  <el-option
                    label="2"
                    value="2">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label-width="80px"
                label="脚本内容">
                <el-input
                  class="textarea"
                  type="textarea"
                  rows="4"
                  v-model="triggerForm.actions[index].scriptContent">
                </el-input>
              </el-form-item>
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
  import Request from '@/libs/request.js'
  import VueMixins from "@/libs/vueMixins.js";
  import qs from 'qs';
  import Sortable from 'sortablejs';
  export default {
    name: 'ScenceSetting',
    mixins: [VueMixins],
    data() {
      return {
        isHighExpand: false, //控制着高级功能
        foldHigh: '<<收起高级功能', //收起高级功能
        sceneId: '1156',
        addDialogVisible: false, //添加对话框是否可视
        addForm: {
          caseIds: [],
          creatorId: '',
          id: ''
        }, //添加时的表单对象
        testcaseViewRespDTOList: [],//场景数据
        isIndeterminate: true, // 设置 indeterminate 状态，只负责样式控制
        checkAll: false, // 是否全选
        checkedSceneTestCases: [], //选中的场景
        sceneTestCases: [], //
        length: 0, //场景数目长度
        removeForm: {
          caseIds: [],
          id: ''
        }, //用例移除所需要的表单
        drawerVisible: false,
        direction: 'btt',
        drawTitles: [
          '执行时间规划',
          '触发器设置',
          '执行过程控制',
          '数据资源池配置',
          '配置移动端设备信息'
          ],
        selectedDrawIndex: 0,
        timeForm: {
          time: '',
          timeIdentification: ''
        },
        triggerForm: {
          name: '', // 触发器名称
          desc: '', // 触发器描述
          occasions: [], // 执行时机
          conditionRelate: '', // 执行条件
          conditions: [], // 执行条件详情
          actions: [], // 执行动作
        },
        triggerRow: {
          conditionName: '',
          matchMethod: '',
          patternValue: ''
        }, // 触发器表格单行数据
        conditionNames: [
          {label: '用例编号', value: 1},
          {label: '测试系统名称', value: 2},
          {label: '功能点名称', value: 3}
        ],
        trigerDtoList:[], // 触发器查询数组
        stateDtos: [], //触发器保存按钮存储数组
        state: '', // 
        opportunityList: [
          {label: '场景执行前', value: 1},
          {label: '场景执行后', value: 2},
          {label: '用例执行前', value: 3},
          {label: '用例执行后', value: 4},
          {label: '元素对象方法执行前', value: 5},
          {label: '元素对象方法执行后', value: 6},
        ], // 执行时机选项
        triggerVisible: false,// 触发器显示
        conditions:[
          {label: '满足以下所有条件', value: 1},
          {label: '满足以下任一条件', value: 2},
          {label: '无条件限制', value: 3}], // 执行条件
        selectedOperation: '', // 选择的操作
        selectedTriggerList: [], //选择的触发器行
        controlForm: {},
        dataConfigureForm: {},
         dataPoolForm: {
           dataPoolName: '场景数据池',
           objectId: '2',
           dataName: '',
           dataValue: '',
           dataDescription: ''
         }, // 数据池表单
         dataPoolVisible: false,
        mobileForm: {
          deviceType: '', //设备类型
          deviceName: '', //设备名称
          autoType: '', // 自动化类型
          packageName: '', //应用包名
          appActivy: '', //启动AppActivity
          isReset: '是', //是否重置
          interfacePath: '' //接口路径 
        }, // 配置移动端设备信息
        useCaseExecution: '',// 用例执行策略
        startNode: '', // 起始节点策略
        executionOrder: '', //流程级执行顺序策略
        executionStatus: '', // 执行状态策略
        startUseCase: '', // 起始用例策略
        executionOrderCombination: '', // 组合级执行顺序策略
        executionStatusCombination: '',// 组合级执行状态策略
        errorOperation: '',// 出错操作
        executionStrategy: ['全部重新执行','跳过执行成功的用例'], // 执行策略数据
        startStrategy: ['从第一个执行节点开始','从第一个失败的执行节点开始'], // 起始策略
        orderStrategy: ['顺序无关执行','强制顺序执行'], //执行顺序策略
         errorOperations: ['出错后终止','出错后继续执行','出错后由用户选择'],
         debugVisible: false, //调试是否可见
         debugRound: '',//调试轮次
         debugRange: ['全部执行','执行选中的用例'],//执行范围
         selectedDebugRange: '',
         caseIdList: [], // 场景顺序 
      }
    },
    created() {
      // 获取上个界面传递的sceneId
      //this.sceneId = this.$route.query.id;
      this.selectScene();
      this.getMobileInfo();
      this.pagedBatchQueryTestCase();
    },
    mounted() {
      this.sort()
    },
    methods: {
      // 执行排序操作_
      sort() {
        let _this = this
        const el = document.getElementById('sortableGroup')
        new Sortable.create(el,{
          animation: 150, // 动画时长
          sort: true, // 是否启用拖拽排序
          delay: 0,
          preventOnFilter: false,
          onEnd(evt) {
            console.log(evt)
            console.log('原先的地址',evt.oldIndex)
            console.log('新的地址',evt.newIndex)
            const movedRow = _this.sceneTestCases.splice(evt.oldIndex,1)[0]
            _this.sceneTestCases.splice(evt.newIndex,0,movedRow)
            console.log("地址修改完",_this.sceneTestCases)
          }
        })
      },
      // 获取场景
      selectScene() {
        Request({
          url: '/sceneController/selectScene',
          method: 'POST',
          params: {
            id: this.sceneId
          }
        }).then(res => {
          console.log('场景数据获取',res);
          this.sceneTestCases = res.selectSceneDto.caseDtos
          this.length =  res.selectSceneDto.caseDtos.length
          console.log("sceneTestCases",this.sceneTestCases)
          this.addForm.caseIds = []
          this.removeForm.caseIds = [];
          console.log('清空删除数据')
        }).catch(error => {
          this.$message.error('场景数据获取失败')
        })
      },
      // 获取全部测试用例
      pagedBatchQueryTestCase() {
        Request({
          url: '/testcase/pagedBatchQueryTestCase',
          method: 'POST',
          params: {
            caseLibId: "1273",
            currentPage: 1,
            orderColumns: "id",
            orderType: "asc",
            pageSize: 3000
          }
        }).then(res => {
          console.log('res',res);
          this.testcaseViewRespDTOList = res.testcaseViewRespDTOList
        }).catch(error => {
          this.$message.error('场景列表获取失败')
        })
      },
      // 获取移动端内容
      getMobileInfo() {
        Request({
          url: '/mobileController/queryMobile',
          method: 'POST',
          params: {
            sceneId: this.sceneId
          }
        }).then(res => {
          console.log('数据获取成功',res)
          let mobileProperties = res.mobileProperties
          if(mobileProperties) {
            this.mobileForm.appActivy = mobileProperties.appActivity
            this.mobileForm.packageName = mobileProperties.appPackage
            this.mobileForm.autoType = mobileProperties.automationName
            this.mobileForm.deviceName = mobileProperties.deviceName
            this.mobileForm.isReset == mobileProperties.noReset?'是':'否'
            this.mobileForm.deviceType = mobileProperties.platformName
            this.sceneId = mobileProperties.sceneId
            this.mobileForm.interfacePath = mobileProperties.url
          }
        }).catch(error => {
          //this.$message.error('该被测系统无移动端内容')
          console.log('该被测系统无移动端内容')
        })
      },
      // 将选择的用例添加到场景
      insertTestcaseToScene() {
        this.addForm.id = this.sceneId;
        this.addForm.creatorId = "3";
        Request({
          url: '/sceneController/insertTestcaseToScene',
          method: 'POST',
          params: this.addForm
        }).then(res => {
          console.log('添加成功',res)
          this.$message.success(res.respMsg)
          this.selectScene();
        }).catch(error => {
          this.$message.error('添加失败')
        })
      },
      changeSelect() {
        console.log(this.addForm.caseIds)
      },
      // 添加场景事件
      addScene() {
        this.addDialogVisible = true
        this.removeForm.caseIds = [];
      },
      // 确认添加
      addSure() {
        this.insertTestcaseToScene(); 
        this.addDialogVisible = false
      },
      // 取消添加
      addCancel() {
        this.addDialogVisible = false
      },
      // 删除场景事件
      deleteTestcaseFromScene() {
        if(this.removeForm.caseIds.length === 0) {
          this.$message.warning('请选择要删除的用例')
        }else {
          this.removeForm.id = this.sceneId
          Request({
            url: '/sceneController/deleteTestcaseFromScene',
            method: 'POST',
            params: this.removeForm
          }).then(res => {
            this.$message.success('删除成功')
            this.isIndeterminate = false
            this.checkAll = false
            this.selectScene();
          }).catch(error => {
            this.$message.error('删除失败')
          })
        }
      },
      // 执行时间规划
      executionTimePlanning(){
        this.selectedDrawIndex = 0
        this.drawerVisible = true
      },
      // 保存执行时间规划数据
      save() {

      },
      // 触发器设置
      triggerSetting() {
        this.queryTrigerForScene()
        this.selectedDrawIndex = 1
        this.drawerVisible = true        
      },
      // 执行过程控制
      executionProcessControl() {
        this.selectedDrawIndex = 2
        this.drawerVisible = true
      },
      // 数据资源池配置
      dataResourcePoolConfiguration() {
        this.selectedDrawIndex = 3
        this.drawerVisible = true
      },
      // 移动端配置
      mobileTerminalConfiguration() {
        this.selectedDrawIndex = 4
        this.drawerVisible = true
      },
      // 设置全选
      handleCheckAllChange(val) {
        this.removeForm.caseIds = [];
        console.log('handleCheckAllChange',val)
        this.checkedSceneTestCases = val ? this.sceneTestCases : [];
        if(this.checkedSceneTestCases == this.sceneTestCases) {
          this.sceneTestCases.forEach(item => {
            this.removeForm.caseIds.push(item.id)
          })
        }
        this.isIndeterminate = false
        console.log(this.removeForm)
      },
      // 场景用例变换时使用
      handleCheckedSceneTestCases(val) {
        this.removeForm.caseIds = [];
        let length = val.length;
        this.checkAll = length === this.sceneTestCases.length
        this.isIndeterminate = length > 0 && length < this.sceneTestCases.length
        val.forEach(item => {
          this.removeForm.caseIds.push(item.id)
        });
        console.log(this.removeForm)
      },
      // elDrawer的关闭事件
      handleBeforeClose(done) {
        this.$confirm('是否关闭'+this.drawTitles[this.selectedDrawIndex],'提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type:'warning'
        }).then(() => {
          done()
        }).catch(() => {})
      },
      // 新增数据池
      addDataPool() {
        this.dataPoolVisible = true
      },
      // 新增数据池确定
      addDataPoolSure() {
        this.dataPoolVisible = false
      },
      // 新增数据池取消
      addDataPoolCancel() {
        this.dataPoolVisible = false
      },
      // 展开debug行
      expandDebug() {
        this.debugVisible = true
        Request({
          url: '',
          method: 'POST',
          params: qs.stringify({
            debuground: '',
            sceneId: type,
            exeScope: '',
            selectState: []
          })
        }).then(res => {
          console.log('debug成功')
        }).catch(error => {
          console.log('debug失败')
        })
      },
      // 收起debug行
      foldDebug() {
        this.debugVisible = false
      },
      // 触发器新增行
      triggerAddRow() {
        this.$message.success('触发器新增行');
        let obj =  {
          "ObjectName": '',
          "matchType": '',
          "value": ''
        }; // 
        this.triggerForm.conditions.push(obj)
      },
      // 删除触发器行
      deleteTriggerTableRow(index) {
        this.triggerForm.conditions.splice(index,1);
      },
      // 新增执行动作
      addAction() {
        let obj = {
          "actionName": '',
          "actionType": '',
          "scriptContent": ''
        }
        this.triggerForm.actions.push(obj)
      },
      // 从列表中删除某行
      deleteRowFromExecutionAction(index) {
        this.triggerForm.actions.splice(index,1)
      },
      // 新增触发器
      addTrigger() {
        this.triggerVisible = true
        this.triggerForm.name = '';
        this.triggerForm.desc = '';
      },
      // 修改触发器
      editTrigger() {
        if(this.selectedTriggerList.length === 0) {
          this.$message.error('请选择要修改项')
        }else {
          this.triggerVisible = true
          this.triggerForm.name = this.selectedTriggerList[0].name;
          this.triggerForm.desc = this.selectedTriggerList[0].desc;
        }
      },
      changeCheckBoxGroup(){
        console.log('changeVaue',this.triggerForm.conditionRelate)
      },
      // 触发器确定事件
      triggerSure() {
        this.triggerForm.sceneId = this.sceneId;
        this.triggerForm.actions = JSON.stringify(this.triggerForm.actions)
        this.triggerForm.occasions = JSON.stringify(this.triggerForm.occasions)
        this.triggerForm.conditions = JSON.stringify(this.triggerForm.conditions)
        console.log('请求对象', this.triggerForm)
        Request({
          url: '/trigerController/insertTriger',
          method: 'POST',
          params: this.triggerForm
        }).then(res => {
          this.$message.success('添加成功')
          this.queryTrigerForScene()
        }).catch(error => {
          this.$message.error('场景数据添加失败')
        })
        this.triggerVisible = false
      },
      // 删除触发器
      triggerDelete() {
        if(this.selectedTriggerList.length == 0 ) {
          this.$message.warning('请选择要删除的列')
        }else {
          this.$confirm('此操作将会删除当前选中数据','警告',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.deleteTriger()
          }).catch(()=>{
            this.triggerCancel()
          })
        }
      },
      // 确认删除
      deleteTriger() {
        Request({
          url: '/trigerController/deleteTriger',
          method: 'POST',
          params: {
            id: this.selectedTriggerList[0].id
          }
        }).then(res => {
          this.$message.success('删除成功')
          this.queryTrigerForScene()
        }).catch(err => {
          this.$message.error('删除失败')
        })
      },
      // 触发器取消事件
      triggerCancel() {
        this.triggerVisible = false
      },
      // 查询场景下的触发器
      queryTrigerForScene() {
        Request({
          url: '/trigerController/queryTrigerForScene',
          method: 'POST',
          params: {
            sceneId: this.sceneId
          }
        }).then(res => {
          console.log('查询成功',res)
          this.trigerDtoList = res.trigerDtoList
        }).catch(error => {
          this.$message.error('触发器获取失败')
        })
      },
      // 处理触发器情况下的选择
      handleSelectionChange(val) {
        console.log('修改',val)
        this.selectedTriggerList = val
      },
      // 添加数据资源池
      initMobile() {
        let params = {
            appActivity: this.mobileForm.appActivy,
            appPackage: this.mobileForm.packageName,
            automationName: this.mobileForm.autoType,
            deviceName: this.mobileForm.deviceName,
            noReset: this.mobileForm.isReset == "是"?true:this.mobileForm.isReset,
            platformName: this.mobileForm.deviceType,
            sceneId: this.sceneId,
            url: this.mobileForm.interfacePath
          }
          console.log('参数',params)
        Request({
          url: '/mobileController/initMobile',
          method: 'POST',
          params
        }).then(res => {
          this.$message.success('添加成功')
        }).catch(err => {
          this.$message.error('添加失败')
        })
      },
      // 保存执行过程
      saveExecutionProcess() {
        console.log(this.errorOperation)
        // Request({
        //   url: '/sceneController/sceneStrategySetting',
        //   method: 'POST',
        //   params: {
        //     exeStrategy1Status: 2,
        //     exeStrategy2Order: "2",
        //     exeStrategy2Start: "1",
        //     exeStrategy2Status: 1,
        //     exeStrategy3Order: 1,
        //     exeStrategy3Start: 2,
        //     exeStrategy3Status: "2",
        //     exeStrategyErr: "1",
        //     id: this.sceneId
        //   }
        // })
      },
      // 保存顺序
      sceneTestcaseSortSave() {
        this.caseIdList = []
        this.sceneTestCases.forEach(item => {
          this.caseIdList.push(item.id)
        })
        console.log("地址",this.caseIdList,this.sceneId)
        Request({
          url: '/sceneController/sceneTestcaseSortSave',
          method: 'POST',
          params: {
            sceneId: this.sceneId, 
            caseIdList: this.caseIdList
          }
        }).then(res => {
          this.$message.success('保存成功')

        }).catch(err => {
          this.$message.error('保存成功')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .btnRows {
    .highFunction{
      font-size: 13px;
      margin-left: 10px;
      cursor: pointer;
      color: gray;
      display: block;
      width: 100px;
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
      margin: 30px auto;
      background-color: #fafafa;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      position: relative;
      .iconI {
        display: block;
        position: absolute;
        width: 30px;
        height: 30px;
        top: 14px;
        color: black;
        background: white;
      }
      .el-checkbox {
        margin-left: 40px;
        width: 200px;
        font-size: 18px;
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
    p,h3 {
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
      .el-col-4,.el-col-5 {
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
    .el-select, .el-input {
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
      height: 210px;
      border: 1px dashed gray;
      padding-top: 10px;
      margin-bottom: 0.2px;
      .el-select{
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
      .el-form-item {
        height: 24px;
      }
      .el-button {
        float: right;
        margin-right: 10px;
      }
      .textarea {
        width: 98%;
      }
    }
    .buttonRow {
      display: flex;
      margin-bottom: -15px;
      justify-content: flex-end;
    }
  }
  
</style>