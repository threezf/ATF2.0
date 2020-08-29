<template>
<div class="page-inner">
  <el-container>
    <el-main>
      <el-row>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addLine">添加
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteLine">删除
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="editLine">修改
        </el-button>
      </el-row>
      <el-card>
        <div class="titleRow">
          <span class="titleSpan">测试系统产品线</span>
          <div class="titleDiv">
            <span>展示条目：</span>
            <el-select v-model="itemNumber">
              <el-option v-for="(item,index) in itemNumberList" :key="index" :value="item" :label="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <el-table :data="tableData" border stripe highlight-current-row>
          <el-table-column width="55" type="selection">
          </el-table-column>
          <el-table-column min-width="49%" label="测试系统产品线id">
          </el-table-column>
          <el-table-column min-width="49%" label="测试系统产品线名称">
          </el-table-column>
        </el-table>
        <div class="paginationDiv">
          <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="pageSizes" :total="total" layout="total,sizes,prev,pager,next,jumper">
          </el-pagination>
        </div>
      </el-card>
    </el-main>
    <el-dialog width="30%" :visible.sync="dialogVisible" :title="titles[titleIndex]">
      <el-form :model='productLineForm' label-width="140px">
        <el-form-item label="测试系统产品线id">
          <el-input v-model="productLineForm.id">
          </el-input>
        </el-form-item>
        <el-form-item label="测试系统产品线名称">
          <el-input v-model="productLineForm.name">
          </el-input>
        </el-form-item>
        <el-row class="dialogButtonRow">
          <el-button type="primary" size="small" @click="dialogSure">{{titleIndex==0?'添加':'修改'}}
          </el-button>
          <el-button type="danger" size="small" @click="dialogCancel" plain>取消
          </el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </el-container>
</div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
export default {
  components: {
    ElSlPanel
  },
  mixins: [VueMixins], // 时间格式转化
  name: 'productLine',
  data() {
    return {
      titles: ['添加测试系统产品线', '修改测试系统产品线'], // 对话框标题
      titleIndex: 0, // 选择的对话框
      dialogVisible: false, // 对话框是否可见
      productLineForm: {
        id: '',
        name: ''
      },
      itemNumber: 10, // 展示条目数目
      itemNumberList: [10, 20, 30, 50, 100],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50],
      total: 100
    }
  },
  created() {

  },
  methods: {
    // 添加产品线
    addLine() {
      this.titleIndex = 0
      this.dialogVisible = true
    },
    // 删除产品线
    deleteLine() {

    },
    // 修改产品线
    editLine() {
      this.titleIndex = 1
      this.dialogVisible = true

    },
    // 对话框确定按钮
    dialogSure() {
      if (this.titleIndex == 0) {

      } else {

      }
      this.dialogVisible = false
    },
    // 对话框取消
    dialogCancel() {
      this.dialogVisible = false
    },
    handleCurrentChange(val) {

    },
    handleSizeChange(val) {

    }
  },
}
</script>

<style lang="less" scoped>
.dialogButtonRow {
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
  margin-bottom: -20px;
  display: flex;
  justify-content: flex-end;
}

.titleRow {
  border-bottom: 1px solid #eff2f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;

  .titleSpan {
    color: #817b81;
    font-size: 18px;
  }

  .titleDiv {
    margin-right: 0px;
    display: inline-block;
    color: #81a7ce;

    .el-select {
      width: 150px;
    }
  }
}

.paginationDiv {
  display: flex;
  justify-content: center;
  padding-top: 15px;
}
</style>
