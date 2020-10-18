<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-row>
          <el-button 
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="doAddRule"
            >新增
          </el-button>
          <el-button 
            type="primary"
            size="small"
            icon="el-icon-setting"
            @click="doAssignPermissions"
            >分配权限
          </el-button>
        </el-row>
        <el-row class="searchRow">
          <el-form
            class="selectStyle">
            <el-form-item
              label=""
              label-width="10px">
              <el-input 
                v-model="searchInfo"
                placeholder="请输入角色名称 (支持模糊查询)"
                clearable >
                <el-button 
                  slot="append" 
                  icon="el-icon-search"
                  @click="searchByItem">
                </el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table
          :data="tableData"
          class="table"
          border
          stripe
          highlight-current-row
          @select="handleSelectChange">
          <el-table-column
            width="50px"
            label
            type="selection">
          </el-table-column>
          <el-table-column
            type="index"
            width="70px"
            label="序号">
          </el-table-column>
          <el-table-column
            min-width="25%"
            prop="roleName"
            label="角色名称">
          </el-table-column>
          <el-table-column
            min-width="25%"
            prop="remark"
            label="角色标识">
          </el-table-column>
          <el-table-column
            min-width="30%"
            prop="descShort"
            label="备注">
          </el-table-column>
          <el-table-column 
            min-width="20%" 
            align="center"
            label="操作">
            <template
              slot-scope="scope">
              <el-button
                v-if="scope.row.defaultRole != 1"
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="doUpdateRule(scope.row)"
                >编辑
              </el-button>
              <el-button
                type="info"
                size="small"
                icon="el-icon-view"
                plain
                @click="viewRow(scope.row)"
                >查看
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
    <el-dialog
      width="24%"
      :title="dialogTitles[titleIndex]"
      :visible.sync="dialogVisible">
      <el-form
        ref="ruleForm"
        label-width="100px"
        :model="ruleForm"
        :rules="rules">
        <el-form-item
          label="角色姓名"
          prop="roleName">
          <el-input 
            v-model="ruleForm.roleName"
            class="inputStyle" 
            placeholder="请输入角色姓名"
            :disabled="inputDisabled"
            clearable/>
        </el-form-item>
        <el-form-item
          label="角色标识"
          prop="remark">
          <el-input 
            v-model="ruleForm.remark"
            class="inputStyle" 
            placeholder="请输入角色标识"
            :disabled="inputDisabled"
            clearable/>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="descShort">
          <el-input 
            v-model="ruleForm.descShort"
            class="inputStyle" 
            type="textarea"
            placeholder="请输入角色描述"
            :disabled="inputDisabled"
            clearable/>
        </el-form-item>
      </el-form>
      <el-row
        class="dialogRowStyle">
        <el-button
          v-if="titleIndex == 0"
          type="primary"
          size="small"
          @click="addSure"
          >添加
        </el-button>
        <el-button
          v-else-if="titleIndex === 1"
          type="primary"
          size="small"
          @click="updateSure"
          >修改
        </el-button>
        <el-button
          type="warning"
          size="small"
          plain
          @click="cancel"
          >{{titleIndex === 2? '关闭': '取消'}}
        </el-button>
      </el-row>
    </el-dialog>
    <el-dialog
      title="分配权限"
      width="30%"
      :visible.sync="roleDialogVisible">
      <el-tree
        ref="menuTree"
        node-key="id"
        :props="defaultProps"
        :data="menuDtoList"
        :default-checked-keys="selectedRoles"
        show-checkbox
        @check-change="handleCheckChange">
      </el-tree>
      <el-row class="roleMenusRow">
        <el-button
          size="small"
          type="primary"
          @click="assignPermissions"
          >确认分配
        </el-button>
        <el-button
          size="small"
          type="warning"
          plain
          @click="roleDialogVisible = false"
          >取消分配
        </el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import Request from '@/libs/request.js'
  import VueMixins from '@/libs/vueMixins.js'
  import moment, { now } from 'moment';
  export default {
    name: 'RoleManagement',
    mixins: [VueMixins],
    data() {
      return {
        userId: sessionStorage.getItem('userId'),
        total: 100,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 20, 50],
        dialogTitles: ['添加角色', '修改角色', '查看角色'],
        titleIndex: 0,
        inputDisabled: false, // 文本框是否可编辑
        tableData: [],
        dialogVisible: false,
        ruleForm: {
          userId: sessionStorage.getItem("userId"), //当前用户id
          roleName: '', //角色姓名
          remark: '', //角色标识
          status: '1', //角色状态
          rolePriority: '3', // 角色优先级
          descShort: '', // 角色描述
          createTime: '', // 创建时间
          creatorId: sessionStorage.getItem('userId'), //创建者id
          modifiedTime: '', // 修改时间
          modifierId: null, // 修改者id
        },
        roleName: '',
        remark: '',
        searchInfo: '', // 查询条件
        selectParams: 'roleName', // 查询条件
        selectRows: [],
        loginInfo: {},
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', blur: 'trigger' }
          ],
          remark: [
            { required: true, message: '请输入角色标识', blur: 'trigger' }
          ],
          descShort: [
            { required: true, message: '请输入角色描述', blur: 'trigger' }
          ],
        },
        rowId: '', // 修改行数据时使用的id
        menuDtoList: [], //全部的角色权限
        roleId: '',
        roleDialogVisible: false,
        defaultProps: {
          label: 'name',
          children: 'childNodeList'
        },
        selectedRoles: []
      }
    },
    watch: {
      searchInfo(newVal) {
        if(this.selectParams == "roleName") {
          this.roleName = newVal
          this.remark = ""
        }else if(this.selectParams == "remark") {
          this.roleName = ""
          this.remark = newVal
        }else {
          this.roleName = ""
          this.remark = ""
        }
      }
    },
    created() {
      this.loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
      this.queryAllMenu()
      this.pagedBatchQuery(this.pageSize, this.currentPage)
    },
    methods: {
      // 获取全部角色信息
      pagedBatchQuery(pageSize, currentPage) {
        Request({
          url: '/roleController/pagedBatchQuery',
          method: 'POST',
          params: {
            pageSize,
            currentPage,
            orderType: 'asc',
            orderColumns: 'id',
            userId: Number(sessionStorage.getItem('userId')),
            companyId: this.loginInfo.companyId,
            roleName: this.roleName,
            remark: this.remark,
          }
        }).then(res => {
          if(res.respCode === "0000") {
            this.tableData = res.list
            console.log('table', res)
            this.total = res.totalCount
          }else {
            this.tableData = []
          }
        }).catch(error => {
          this.tableData = []
        })
      },
      // 添加角色
      doAddRule() {
        this.dialogVisible = true
        this.titleIndex = 0
        this.inputDisabled = false
        this.ruleForm.roleName = ""
        this.ruleForm.remark = ""
        this.ruleForm.descShort = ""
      },
      // 确认添加
      addSure() {
        this.$refs['ruleForm'].validate(valid => {
          if(valid) {
            this.ruleForm.createTime = Date.now()
            this.ruleForm.creatorId = sessionStorage.getItem('userId')
            this.ruleForm.companyId = this.loginInfo.companyId,
            this.ruleForm.rolePriority = 3
            Request({
              url: '/roleController/insert',
              method: 'POST',
              params: this.ruleForm
            }).then(res => {
              if(res.respCode === "0000") {
                this.$message.success('添加成功')
                this.dialogVisible = false
                this.pagedBatchQuery(this.pageSize, this.currentPage)
              }else {
                this.$message.warning('添加失败')
              }
            }).catch(error => {
              console.log(error, '添加失败')
            })
          }else {
            return this.$message.warning('角色已存在')
          }
        })
      },
      // 修改角色
      doUpdateRule(row) {
        this.dialogVisible = true
        this.titleIndex = 1
        this.rowId = row.id
        const {
          roleName,
          remark,
          descShort
        } = row
        this.ruleForm = {
          roleName,
          remark,
          descShort
        }
        this.inputDisabled = false
        console.log('row', row)
        this.ruleForm.rolePriority = row.rolePriority

      },
      // 查看单行
      viewRow(row) {
        this.dialogVisible = true
        this.titleIndex = 2
        const {
          roleName,
          remark,
          descShort
        } = row
        this.ruleForm = {
          roleName,
          remark,
          descShort
        }
        this.inputDisabled = true
      },
      // 确认修改
      updateSure() {
        console.log(this.loginInfo.companyName)
        this.$refs['ruleForm'].validate(valid => {
          if(valid) {
            this.ruleForm.modifiedTime = Date.now()
            this.ruleForm.modifierId = sessionStorage.getItem('userId')
            let params = Object.assign({}, this.ruleForm)
            params.userId = sessionStorage.getItem("userId")
            params.defaultRole = 2
            params.companyId = this.loginInfo.companyId
            params.id = this.rowId
            Request({
              url: '/roleController/updateByPrimaryKey',
              method: 'POST',
              params: params
            }).then(res => {
              if(res.respCode === "0000") {
                this.$message.success(res.respMsg)
                this.dialogVisible = false
                this.pagedBatchQuery(this.pageSize, this.currentPage)
              }else {
                this.$message.warning(res.respMsg)
              }
            }).catch(error => {
              this.$message.error('该角色不可自行创建')
            })
          }else {
            return
          }
        })
      },
      // 修改select
      handleSelectChange(val) {
        this.selectParams = val
        this.selectRows = val
        this.searchInfo = ""
      },
      searchByItem() {
        this.pagedBatchQuery(this.pageSize, this.currentPage)
      },
      // 对话框取消
      cancel() {
        this.dialogVisible = false
      },
      // 分配权限
      doAssignPermissions() {
        console.log("handleSelectChange", this.selectParams.length)
        if(this.selectRows.length == 0) {
          this.$message.warning('请选择要分配权限的角色')
        }else if(this.selectRows.length > 1) {
          this.$message.warning('只允许为单个角色分配')
        }else {
          this.roleDialogVisible = true
          this.roleId = this.selectRows[0].id
          this.queryAllPermission()
        }
      },
      handleCurrentChange(val) {
        this.pagedBatchQuery(this.pageSize, val)
        this.currentPage = val
      },
      handleSizeChange(val) {
        this.pagedBatchQuery(val, this.currentPage)
        this.pageSize = val
      },
       // 获取全部角色权限
      queryAllMenu() {
        let _this = this
        Request({
          url: '/menuController/queryAllMenu',
          method: 'post',
          params: {
            userId: this.userId
          }
        }).then(res => {
          if(res.respCode === '0000') {
            _this.menuDtoList = res.menuDtoList.filter(item => {
              return item.level == 0
            })
          }
        }).catch(error => {
          console.log('error', error)
        })
      },
      // 获取当前角色权限
      queryAllPermission() {
        Request({
          url: '/roleController/queryAllPermission',
          method: 'post',
          params: {
            roleId: this.roleId
          }
        }).then(res => {
          console.log('获取角色权限', res)
          if(res.respCode === '0000') {
            this.selectedRoles = res.menuIds
            console.log(this.selectedRoles)
          }
        }).catch(error => {
          console.log('获取失败', error)
        })
      },
      // 为角色分配权限
      assignPermissions() {
        const checkedKeys = this.$refs.menuTree.getCheckedKeys()
        const halfCheckedKeys = this.$refs.menuTree.getHalfCheckedKeys()
        const menuIds = [...checkedKeys, ...halfCheckedKeys]
        console.log(
          {
            roleId: this.roleId,
            menuIds,
            companyId: this.loginInfo.companyId
          }
        )
        Request({
          url: '/roleController/assignPermissions',
          method: 'post',
          params: {
            roleId: this.roleId,
            menuIds,
            companyId: this.loginInfo.companyId
          }
        }).then(res => {
          if(res.respCode === '0000') {
            this.$message.success('权限分配成功')
            this.roleDialogVisible = false
          }
        }).catch(error => {
          console.log('分配失败', error)
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log('handleCheckChange', data, checked)
      },
    },
  }
</script>

<style scoped lang="less">
  .searchRow {
    margin-bottom: 0px !important;
    .el-input {
      width: 300px;
    }
  }
  .inputStyle {
    width: 93%;
  }
  .dialogRowStyle {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding-right: 30px;
  }
  .selectStyle {
    width: 200px;
  }
  .roleMenusRow {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
  }
</style>
