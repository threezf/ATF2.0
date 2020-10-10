<!--
  封装了
-->
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
        @click="showAddMultiplyDialog"
        >添加多项
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-delete"
        @click="deleteTableRow"
        >删除
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-arrow-up"
        @click="rowsUp"
        >上移
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-arrow-down"
        @click="rowsDown"
        >下移
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-document"
        @click="saveConfigTable"
        >保存
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-printer"
        @click="doParameterize"
        >参数化
      </el-button>
    </el-row>
    <el-table
      id="dragableTable"
      class="table"
      style="margin: 10px 5px "
      max-height="350"
      :data="tableData"
      stripe
      border
      highlight-current-row
      @select="handleTableRowSelection">
      <el-table-column
        width="50px"
        align="center"
        label="排序">
        <template slot-scope="scope">
          <i class="el-icon-sort" :key="'i' + scope.row.index"></i>
        </template>
      </el-table-column>
      <el-table-column
        width="50px"
        type="selection">
      </el-table-column>
      <el-table-column
        align="center"
        min-width="20%"
        prop="name"
        label="操作项">
      </el-table-column>
      <el-table-column
        align="center"
        min-width="20%"
        label="方法">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.methodName">
            <el-option
              v-for="item in scope.row.methods"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        min-width="60%"
        label="参数">
        <template slot-scope="scope">
          <div 
            class="paramsCell" 
            v-for="(item, index) in scope.row.arguments"
            :key="'div' + index">
            <div class="topContent">
              <div class="leftSide">
                <p>名称</p>
                <p>{{item.name}}</p>
              </div>
              <div class="rightSide">
                <p>参数值</p>
                <p>
                  <el-input
                    class="cellInput"
                    v-if="item.isEditing"
                    v-model="item.value"
                    size="mini">
                  </el-input>
                  <span
                    v-else
                    class="cellSpan">
                    {{item.value? item.value: '请配置参数'}}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <p v-if="!item.isEditing">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="doEdit(item)"
                  >编辑
                </el-button>
              </p>
              <p
                v-else>
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="cellEditCancel(item)"
                  >取消
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="cellEditSure(item)"
                  >确认
                </el-button>
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      class="addMultiple"
      title="添加多项"
      width="30%"
      :visible.sync="treeDialogVisible">
      <script-tree
        :transact-id="2048"
        :aut-id="Number(autId)"
        @dialogCancel="addCancel"
        @dialogSure="addSure">
      </script-tree>
    </el-dialog>
  </div>
</template>

<script>
  // 导入库
  import Sortable from 'sortablejs'
  import Request from '@/libs/request.js'
  // 导入组件
  import ScriptTree from '@/components/common/scriptTree'
  export default {
    name: 'ScriptData',
    data() {
      return {
        scriptId: '', // 脚本Id
        autId: '', // 被测系统Id
        tableData: [], // 表格数据渲染
        tempCellData: '', // 单元格临时数据
        scriptList: [], // 脚本数据
        methodsList: [], // 获取的脚本方法
        objectMethod: {}, // 对象方法
        treeDialogVisible: false, // 添加多项对话框展示样式
      }
    },
    props: {

    },
    components: {
      ScriptTree
    },
    created() {
      const query = this.$route.query
      this.autId = query.autId
      this.scriptId = query.scriptId
      this.queryScriptInfo()
    },
    mounted() {
      this.dragTable()
    },
    methods: {
      // 获取脚本数据
      queryScriptInfo() {
        Request({
          url: '/scriptTemplate/queryScriptInfo',
          method: 'POST',
          params: {
            autId: this.autId,
            scriptId: this.scriptId
          }
        }).then(res => {
          if(res.respCode === "0000") {
            // console.log("treeData 获取脚本数据", res.data)
            const scripts = res.data
            scripts.forEach(item => {
              this.selectMethod(item, item.elementWidget)
            })
            console.log('treeData，获取的表格数据', this.tableData, '1')

          }
        }).catch(error => {
          console.log("脚本数据获取失败", error)
        })
      },
      // 查询方法
      selectMethod(item, classname) {
        Request({
          url: '/aut/selectMethod',
          method: 'POST',
          params: {
            classname,
            id: this.autId
          }
        }).then(res => {
          if(res.respCode === "0000") {
            item.methods = res.omMethodRespDTOList
            item.arguments = item.arguments.map(argItem => {
              return {
                ...argItem,
                isEditing: false
              }
            })
            this.$set(this.objectMethod, classname, res.omMethodRespDTOList)
            this.tableData.push({
                name: `UI:${item.uiname} 元素:${item.elementName}`,
                methods: item.methods,
                elementWidget: item.elementWidget,
                arguments: item.arguments,
                methodName: item.methodName
              })
          }
        }).catch(error => {
          console.log('method 获取失败', error)
        })
      },
      // 设置表格数据
      setTableData(item) {
        const addMethodItem = this.selectMethod(item, item.elementWidget)
      },
      // 获取脚本方法
      selectFunctionSet() {
        Request({
          url: '/aut/selectFunctionSet',
          method: 'POST',
          params: {
            id: this.autId
          }
        }).then(res => {
          if(res.respCode === "0000") {
            
          }else {
            return this.$message.warning('方法获取失败')
          }
        })
      },
      /** 行按钮事件 */
      /**
        添加多项
      */
      // 添加多项按钮触发事件
      showAddMultiplyDialog() {
        this.treeDialogVisible = true
      },
      // 添加多项取消     
      addCancel() {
        this.treeDialogVisible = false
      },
      // 添加多项确认
      addSure(data) {
        // this.tableData = data
        data.forEach(item => {
          item.methods = this.objectMethod[item.methodName]
          const dataArguments = JSON.parse(item.methods[0].arguments.substring(1, item.methods[0].arguments.length - 1))
          console.log('tree', dataArguments)
          dataArguments.isEditing = false
          // dataArguments.forEach(dataArgItem => {
          //   dataArgItem.name = ""
          //   dataArgItem.isEditing = false
          // })
          item.arguments.push(dataArguments)
        })
        this.tableData.push(...data)
        console.log('tree 数据传输', data)
        this.treeDialogVisible = false
      },
      
      // 删除按钮
      deleteTableRow() {

      },

      // 上移
      rowsUp() {

      },

      // 下移
      rowsDown() {

      },

      // 保存表格配置
      saveConfigTable() {

      },

      // 执行参数化
      doParameterize() {

      },
      
      /**
       * 处理表格内部事件
       */
      // 进行单元格数据编辑
      doEdit(item) {
        item.isEditing = true
        this.tempCellData = item.value
      },
      // 取消单元格数据编辑
      cellEditCancel(item) {
        item.isEditing = false
        item.value = this.tempCellData
      },
      // 确定单元格数据编辑
      cellEditSure(item) {
        item.isEditing = false
      },
      // 表格行拖拽
      dragTable() {
        Sortable.create(document.querySelector('#dragableTable tbody'), {
          animation: 300,
          delay: 0,
          sort: true,
          onStart(event) {
            // 开始拖拽事件

          },
          onEnd(event) {
            // 拖拽结束事件

          }
        })
      },
      // 表格行选择事件
      handleTableRowSelection(val) {
        console.log('treeData', val)
      }
    }
  }
</script>

<style lang="less" scopde>
  .debugTitleRow {
    margin-bottom: 5px;
  }
  .funcButtonRow {
    padding: 0px 3px;
  }
  .addMultiple {
    margin-top: -90px;
  }
  .paramsCell {
    width: 100%;
    .topContent {
      display: flex;
      justify-content: flex-start;
      .leftSide {
        width: 100px;
        p:nth-child(1) {
          font-weight: bold;
        }
      }
      .rightSide {
        flex: 1;
        p:first-child {
          font-weight: bold;
        }
        p .el-input {
          max-width: 200px;
        }
        .cellInput {
          margin-bottom: 0px !important;
        }
        .cellSpan {
          display: block;
          line-height: 28px;
        }
      }
    }
  }
</style>