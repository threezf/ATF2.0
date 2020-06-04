<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-row
          class="titleRow">
          <span>添加场景用例</span>
          <el-button
            type="primary"
            size="small"
            @click="addScene"
            >确认添加
          </el-button>
        </el-row>
        <el-row>
          <el-button
            type="primary"
            size="small"
            v-if="conditionFlag"
            @click="conditionFlag = false"
            >显示筛选
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-button
            type="primary"
            size="small"
            v-else
            @click="conditionFlag = true"
            >收起筛选
            <i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
        </el-row>
        <el-row
          class="conditionRow"
          v-if="!conditionFlag">
            <el-radio-group
              v-model="selectedCondition">
              <el-radio :label="1">满足所有条件</el-radio>
              <el-radio :label="2">满足任一条件</el-radio>
            </el-radio-group>
            <el-button
              class="queryButton"
              type="primary"
              size="small"
              @click="query"
              >查询
            </el-button>
        </el-row>
        <el-form
          class="itemFormRow"
          :model="itemForm"
          v-if="!conditionFlag"
          label-width="80px">
          <div
            class="conditionDiv">
            <el-col
              v-for="(item,index) in conditionList"
              :key="index"
              :span='8'>
              <el-form-item
                label-width="70px"
                label="筛选项目">
                  <el-select
                    placeholder="请选择"
                    v-model="itemForm.taskName">
                    <el-input
                      v-model="itemSearch">
                    </el-input>
                    <el-option
                    v-for="(item,index) in itemList"
                    :key="index"
                    :value="item.id"
                    :label="item.value">
                  </el-option>
                </el-select>
                <el-select
                  placeholder="Nothing Selected"
                  v-model="itemForm.selectedValue">
                </el-select>
              </el-form-item>
              <el-form-item
                label-width="30px"
                label="值">
                <el-select
                  placeholder="Nothing Selected"
                  v-model="itemForm.value">
                </el-select>
              </el-form-item>
            </el-col>
          </div>
        </el-form>
        <el-row>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            class="plusButton"
            @click="addCondition">
          </el-button>
        </el-row>
        <el-table
          :data="tableData"
          ref="multipleTable"
          tooltip-effect="dark"
          stripe
          border
          high-light-currentrow>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="用例编号"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="被测系统"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="功能点"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="用例组成类型"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="状态"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="关联脚本名称"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="脚本编辑者"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="执行者"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="评审者"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="执行方式"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="测试任务"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="优先级"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="用例类型"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="用例性质"
            min-width="7%">
          </el-table-column>
          <el-table-column
            label="测试点"
            min-width="7%">
          </el-table-column>
        </el-table>
        <el-row 
          class="paginationRow">
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :total="total"
            layout="total,sizes,prev,pager,next,jumper">
          </el-pagination>
        </el-row>
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
    mixins: [VueMixins], // 时间格式转化
    name: 'InsertSceneCase',
    data() {
      return {
        conditionFlag: true, //  筛选条件
        selectedCondition: 1, // 选择的条件
        itemForm: {
          taskName: '', // 任务下拉框
          selectedValue: '', // 选择值
          value: '', // 值
        },
        itemSearch: '', // 选择条件
        itemList: [
          {id: '0', value: '用例编号'},
          {id: '1', value: '被测系统'},
          {id: '2', value: '功能点'},
          {id: '3', value: '用例组成类型'},
          {id: '4', value: '状态'},
          {id: '5', value: '关联脚本名称'},
          {id: '6', value: '脚本编辑者'},
          {id: '7', value: '执行者'},
          {id: '8', value: '评审者'},
          {id: '9', value: '执行方式'},
          {id: '10', value: '测试任务'},
          {id: '11', value: '优先级'},
          {id: '12', value: '用例类型'},
          {id: '13', value: '用例性质'},
          {id: '14', value: '测试点'},
        ], // 选择内容列表
        tableData: [], // 表格数据
        conditionList: [{}], // 控制着个数
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5,10,20,50],
        total: 50
      }
    },
    created() {
      
    },
    methods: {
      // 确认添加事件
      addScene() {

      },
      // 点击查询按钮
      query() {

      },
      // 添加条件
      addCondition() {
        this.conditionList.push({})
      },
      // 改变当前页码
      handleCurrentChange(val) {

      },
      // 改变总页码
      handleSizeChange(val) {

      }
    },

  }
</script>

<style lang="less" scoped>
  .titleRow {
    color: #868886;
    font-size: 20px;
    border-bottom: 1px solid #eff2f7;
    .el-button {
      margin-left: 20px;
    }
  }
  .conditionRow {
    padding: 0px;
    .el-row {
      padding: 0px;
    }
    .queryButton {
      margin-left: 10px;
    }
  }
  .itemFormRow {
    .el-select,.el-popper {
      width: 140px !important;
    }
  }
  .plusButton {
    margin-left: 10px;
  }
  .conditionDiv {
    margin-top: 10px;
    .el-col {
      margin-bottom: 0px;
      .el-form-item {
        display: inline-block;
      }
    }
  }
  .paginationRow {
    display: flex;
    justify-content: center;
  }
</style>