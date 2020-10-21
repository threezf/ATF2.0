<template>
  <div>
    <el-row class="debugTitleRow">
      <span>配置脚本数据</span>
    </el-row>
    <el-row class="funcButtonRow">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        >添加多项
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-delete"
        >删除
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-arrow-up"
        >上移
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-arrow-down"
        >下移
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-document"
        >保存
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-printer"
        >参数化
      </el-button>
    </el-row>
    <el-table
      class="table"
      :data="tableData"
      stripe
      border
      highlight-current-row>
      <el-table-column
        width="50px"
        label="排序">
      </el-table-column>
      <el-table-column
        width="50px"
        type="selection">
      </el-table-column>
      <el-table-column
        min-width="15%"
        label="操作项">
      </el-table-column>
      <el-table-column
        min-width="15%"
        label="方法">
      </el-table-column>
      <el-table-column
        min-width="70%"
        label="参数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'ScriptData',
    data() {
      return {
        tableData: []
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style>

</style>