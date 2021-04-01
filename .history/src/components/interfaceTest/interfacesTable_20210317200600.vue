<template>
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      property="code"
      label="编号"
      width="80">
    </el-table-column>
    <el-table-column
      property="name"
      label="接口名称"
      width="120">
    </el-table-column>
    <el-table-column
      label="协议/方法"
      width="120">
      <template slot-scope="scope">
        <el-tag size="small"
                :type="tableData[scope.$index]['method'] === 'POST' ?
                'success' : tableData[scope.$index]['choice'] === 'GET' ?
                    'primary' :  tableData[scope.$index]['choice'] === 'PUT' ? 'warning' : 'danger'">
            {{tableData[scope.$index]['method']}}
        </el-tag>
    </template>
    </el-table-column>
    <el-table-column
      property="url"
      label="URL">
    </el-table-column>
    <el-table-column
      property="date"
      label="更新时间">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          code: '接口1',
          date: '2021-03-09 20:18:36',
          name: '用户登录',
          method: 'POST',          
          url: '/user/login_json.php',                  
        }, {
          code: '接口2',
          date: '2021-03-09 20:18:36',
          name: '用户登录',
          method: 'GET',          
          url: '/user/login_json.php', 
        }, {
          code: '接口3',
          date: '2021-03-09 20:18:36',
          name: '用户登录',
          method: 'PUT',          
          url: '/user/login_json.php', 
        }, {
          code: '接口4',
          date: '2021-03-09 20:18:36',
          name: '用户登录',
          method: 'DELETE',          
          url: '/user/login_json.php', 
        }],
        currentRow: null
      }
    },

    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>