<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-row>
          <el-button 
            type="primary"
            size="small"
            icon="el-icon-plus"
            >新增
          </el-button>
        </el-row>
        <el-row class="searchRow">
          <el-input 
            placeholder="输入搜索条件"
            clearable >
            <el-button 
              slot="append" 
              icon="el-icon-search">
            </el-button>
          </el-input>
        </el-row>
        <el-table
          class="table"
          border 
          stripe 
          highlight-current-row >
          <el-table-column 
            width="50px"
            label="" 
            type="selection">
          </el-table-column>
          <el-table-column
            width="100px"
            label="序号">
          </el-table-column>
          <el-table-column
            min-width="25%"
            label="企业名称">
          </el-table-column>
          <el-table-column
            min-width="25%"
            label="描述">
          </el-table-column>
          <el-table-column
            min-width="25%"
            label="状态">
          </el-table-column>
          <el-table-column
            min-width="25%"
            label="操作">
            <template slot-scope="scope">
              <el-button 
                type="primary"
                size="small"
                icon="el-icon-edit"
                >编辑
              </el-button>
              <el-button 
                type="primary"
                size="small"
                icon="el-icon-delete"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination 
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange" 
          :current-page="currentPage" 
          :page-size="pageSize" 
          :page-sizes="pageSizes"
          :total="total" 
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'EnterpriseManagement',
    data() {
      return {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 20, 50]
      }
    },
    methods: {
      handleCurrentChange(val) {

      },
      handleSizeChange(val) {

      }
    },
  }
</script>

<style scoped lang="less">
  .searchRow {
    .el-input {
      width: 300px;
    }
  }
</style>