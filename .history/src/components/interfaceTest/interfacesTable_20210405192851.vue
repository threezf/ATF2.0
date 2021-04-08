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
    <el-table-column property="interfaceName"  label="接口名称"  width="120">
        <template slot-scope="scope">
            <a @click="toInterfaceDetail(scope.$index,scope.row)" class="link" target="_self">{{scope.row.interfaceName}}</a>
        </template>
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
                      @click.native="deleteButton(scope.row)">删除
          </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import Request from "@/libs/request.js";
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
      //删除留言帖按钮
      deleteButton(row) {
          let id = row.id
          this.$confirm('是否确定删除此接口?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            this.delInterface(id)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      delInterface(id){
        Request({
                url: '/interfaceNewController/deleteInterfaceGroup',
                method: 'post',
                params: {
                    id :id
                }
            }).then((res) => {
                this.$message.success('删除成功')
                this.getParentChildrenRef('sidebar').getAllTableData()
            }, (err) => {
                this.$message.error(res.respMsg)
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
      },
      toInterfaceDetail(index, row){
        console.log("id", row.id);
        sessionStorage.setItem("interfaceName", row.interfaceName) //把接口名称存入缓存中
        sessionStorage.setItem("interfaceId", row.id) //把接口编号存入缓存中
        this.$router.push({
            path: "interfaceDetail",
            query: {
                interfaceData: row
            }
        }); //界面跳转
      }
    }
  }
</script>
<style scoped>
/*链接样式*/
.link {
    color: #3e61aa;
    text-decoration: none;
    cursor: pointer;
}
.link:hover {
    color: blue;
}
</style>