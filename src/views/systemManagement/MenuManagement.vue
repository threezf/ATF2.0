<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-row class="searchRow">
          <el-input size="small" placeholder="输入搜索条件" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button style="margin-left: 20px" type="primary" size="small" icon="el-icon-plus">新增</el-button>
        </el-row>
        <el-table class="table" border stripe highlight-current-row>
          <el-table-column 
            width="50px" 
            label 
            type="selection">
          </el-table-column>
          <el-table-column 
            min-width="14.28%" 
            label="名称">
          </el-table-column>
          <el-table-column 
            min-width="14.28%" 
            label="上级菜单">
          </el-table-column>
          <el-table-column 
            min-width="14.28%" 
            label="图标">
          </el-table-column>
          <el-table-column 
            min-width="14.28%" 
            label="类型">
          </el-table-column>
          <el-table-column 
            min-width="14.28%" 
            label="菜单URL">
          </el-table-column>
          <el-table-column 
            min-width="14.28%" 
            label="授权标识">
          </el-table-column>
          <el-table-column 
            min-width="14.28%" label="操作">
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
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "EnterpriseMnagement",
  data() {
    return {
      total: 100,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50],
    };
  },
  methods: {
    handleCurrentChange(val) {},
    handleSizeChange(val) {},
  },
};
</script>

<style scoped lang="less">
.searchRow {
  .el-input {
    width: 200px;
  }
}
</style>


<script>
  export default {
    name: "MenuManagement",
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
  };
</script>

<style scoped lang="less">
  .searchRow {
    .el-input {
      width: 200px;
    }
  }
</style>
