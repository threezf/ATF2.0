<template>
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    border
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      property="code"
      label="编号"
      width="120">
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
                'success' : tableData[scope.$index]['method'] === 'GET' ? 
                'primary' :  tableData[scope.$index]['method'] === 'PUT' ? 'warning' : 'danger'">
            {{tableData[scope.$index]['method']}}
        </el-tag>
    </template>
    </el-table-column>
    <el-table-column
      property="url"
      label="URL">
    </el-table-column>
    <el-table-column
      property="createTime"
      label="创建时间">
    </el-table-column>
    <el-table-column
      property="updateTime"
      label="最后更新时间">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit-outline" size="mini"
                      @click.native="editInterface(scope.$index)">编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"
                      @click.native="delInterface(scope.$index)">删除
          </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {

    props:{
        getTableData: {
            type: Function,
        },
        getAllTableData: {
            type: Function,
        },
    },
    data() {
      return {
        tableData: [{
          code: '接口1',
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          name: '用户登录',
          method: 'POST',          
          url: '/user/login_json.php',                  
        }, {
          code: '接口2',
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          name: '用户登录',
          method: 'GET',          
          url: '/user/login_json.php', 
        }, {
          code: '接口3',
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          name: '用户登录',
          method: 'PUT',          
          url: '/user/login_json.php', 
        }, {
          code: '接口4',
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
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
      },
      editInterface(val){

      },
      delInterface(val){

      },
    }
  }
</script>