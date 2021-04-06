<template>
<div>
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    height="580px"
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
      width="80"
      align="center">
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
      width="120"
      align="center">
      <template slot-scope="scope">
        <el-tag size="small"  :type="tableData[scope.$index]['method'] | getType">
            {{tableData[scope.$index]['method'] | getMethod}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      width="500"
      property="urlPath"
      label="URL">
    </el-table-column>
    <el-table-column
      property="createTime"
      label="创建时间"
      width="200"
      >
    </el-table-column>
    <el-table-column
      property="updateTime"
      width="200"
      label="最后更新时间"
      :formatter="transTime">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200"
      align="center">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit-outline" size="mini"
                      @click.native="editInterface(scope.row)">编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"
                      @click.native="delInterface(scope.row)">删除
          </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import VueMixins from '@/libs/vueMixins.js'
  let that;
  export default {
    mixins: [VueMixins], 
    props:{
        tableData: {
              type: Array,
              default: function () {
                  return []
              }
          },
    },
    data() {
      return {
        // tableData: [{
        //   id: '接口1',
        //   status: 0,
        //   createTime: '2021-03-09 20:18:36',
        //   updateTime: '2021-03-23 18:18:36',
        //   interfaceName: '用户登录',
        //   method: 0,          
        //   urlPath: '/user/login_json.php',                  
        // }, {
        //   id: '接口2',
        //   status: 1,
        //   createTime: '2021-03-09 20:18:36',
        //   updateTime: '2021-03-23 18:18:36',
        //   interfaceName: '用户登录',
        //   method: 1,          
        //   urlPath: '/user/login_json.php', 
        // }, {
        //   id: '接口3',
        //   status: 0,
        //   createTime: '2021-03-09 20:18:36',
        //   updateTime: '2021-03-23 18:18:36',
        //   interfaceName: '用户登录',
        //   method: 2,          
        //   urlPath: '/user/login_json.php', 
        // }, {
        //   id: '接口4',
        //   status: 2,
        //   createTime: '2021-03-09 20:18:36',
        //   updateTime: '2021-03-23 18:18:36',
        //   interfaceName: '用户登录',
        //   method: 3,          
        //   urlPath: '/user/login_json.php', 
        // }],
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
     beforeCreate: function () {
        that = this;
    },
    filters: {
        getStatus(val) {
            for ( let item in that.statusOptions){
              let option = that.statusOptions[item]
              if(option.value == val){
                return option.status
              }
            }
        },
        getMethod(val) {
            for ( let item in that.methodOptions){
              let option = that.methodOptions[item]
              if(option.value == val){
                return option.method
              }
            }
        },
        getType(val) {
          return val === 0 ? 'success' : val === 1 ? 'primary' :  val === 2 ? 'danger' : 'warning' 
        }
    },

    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      editInterface(val){
        this.$emit('updateGroupButton',val)
      },
      delInterface(val){

      },
    }
  }
</script>
<style scoped>
</style>