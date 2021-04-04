<template>
<div>
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    border
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      property="id"
      label="编号"
      width="80">
    </el-table-column>
    <el-table-column
      label="状态"
      width="80">
      <template slot-scope="scope">
        <el-tag size="small"
                :type="tableData[scope.$index]['status'] === '已完成' ?
                'success' : tableData[scope.$index]['status'] === '开发中' ? 
                'primary' : 'danger'">
            {{tableData[scope.$index]['status']}}
        </el-tag>
    </template>
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
      property="urlPath"
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
  </div>
</template>

<script>
  export default {

    props:{
        // tableData: {
          //     type: Array,
          //     default: []
          // },
    },
    data() {
      return {
        tableData: [{
          id: '接口1',
          status: '已完成',
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          name: '用户登录',
          method: 'POST',          
          urlPath: '/user/login_json.php',                  
        }, {
          id: '接口2',
          status: '开发中',
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          name: '用户登录',
          method: 'GET',          
          urlPath: '/user/login_json.php', 
        }, {
          id: '接口3',
          status: '已完成',
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          name: '用户登录',
          method: 'PUT',          
          urlPath: '/user/login_json.php', 
        }, {
          id: '接口4',
          status: '已废弃',
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          name: '用户登录',
          method: 'DELETE',          
          urlPath: '/user/login_json.php', 
        }],
        currentRow: null,
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