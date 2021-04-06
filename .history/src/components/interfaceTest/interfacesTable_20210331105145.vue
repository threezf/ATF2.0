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
      <template slot-scope="scoped">
        <el-tag size="small"  :type="tableData[scoped.$index]['status'] | getType">
            {{tableData[scoped.$index]['status'] | getStatus}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      property="interfaceName"
      label="接口名称"
      width="120">
    </el-table-column>
    <el-table-column
      label="协议/方法"
      width="120">
      <template slot-scope="scope">
        <el-tag size="small"  :type="tableData[scope.$index]['method'] | getType">
            {{tableData[scope.$index]['method'] | getMethod}}
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
          status: 0,
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          interfaceName: '用户登录',
          method: 0,          
          urlPath: '/user/login_json.php',                  
        }, {
          id: '接口2',
          status: 1,
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          interfaceName: '用户登录',
          method: 1,          
          urlPath: '/user/login_json.php', 
        }, {
          id: '接口3',
          status: 0,
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          interfaceName: '用户登录',
          method: 2,          
          urlPath: '/user/login_json.php', 
        }, {
          id: '接口4',
          status: 2,
          createTime: '2021-03-09 20:18:36',
          updateTime: '2021-03-23 18:18:36',
          interfaceName: '用户登录',
          method: 3,          
          urlPath: '/user/login_json.php', 
        }],
        currentRow: null,
        statusOptions: [{
            value: 0,
            status: '开发中'
        }, {
            value: 1,
            status: '已完成'
        }, {
            value: 2,
            status: '已废弃'
        }],
        methodOptions: [{
                value: 0,
                method: 'POST'
            }, {
                value: 1,
                method: 'GET'
            }, {
                value: 2,
                method: 'DELETE'
            }, {
                value: 3,
                method: 'PUT'
            }],
          }
    },
    filters: {
        getStatus(val) {
            for (item in this.statusOptions){
              if(item.value == val){
                return item.status
              }
            }
        },
        getMethod(val) {
            for (item in this.methodOptions){
              if(item.value == val){
                return item.method
              }
            }
        },
        getType(val) {
          return val === 0 ? 'success' : val === 1 ? 'primary' :  val === 2 ? 'warning' : 'danger'
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