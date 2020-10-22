<!--
  封装了
-->
<template>
<div>
    <el-row class="debugTitleRow">
        <span>配置脚本数据</span>
    </el-row>
    <el-row class="funcButtonRow">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddMultiplyDialog">添加多项
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteTableRow">删除
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-arrow-up" @click="rowsUp">上移
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-arrow-down" @click="rowsDown">下移
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-document" @click="saveConfigTable">保存
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-printer" @click="doParameterize">参数化
        </el-button>
    </el-row>
    <el-table id="dragableTable" class="table" style="margin: 10px 5px " max-height="350" row-key="id" :data="tableData" stripe border highlight-current-row @select="handleTableRowSelection">
        <el-table-column width="50px" align="center" label="排序">
            <template slot-scope="scope">
                <i class="el-icon-sort" :key="'i' + scope.row.index"></i>
            </template>
        </el-table-column>
        <el-table-column width="50px" type="selection">
        </el-table-column>
        <el-table-column align="center" min-width="20%" prop="name" label="操作项">
        </el-table-column>
        <el-table-column align="center" min-width="20%" label="方法">
            <template slot-scope="scope">
                <el-select @change="handleRowSelectChange(scope.row, $event)" v-model="scope.row.methodName">
                    <el-option v-for="item in scope.row.myMethods" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column min-width="60%" label="参数">
            <template slot-scope="scope">
                <div class="paramsCell" v-for="(item, index) in scope.row.arguments" :key="'div' + index">
                    <div class="topContent">
                        <div class="leftSide">
                            <p>名称</p>
                            <p>{{item.name}}</p>
                        </div>
                        <div class="rightSide">
                            <p>参数值</p>
                            <p>
                                <el-input class="cellInput" v-if="item.isEditing" v-model="item.value" size="mini">
                                </el-input>
                                <span v-else class="cellSpan">
                                    {{item.flag? item.value? item.value: '请配置参数': ''}}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div v-if="item.flag">
                        <p v-if="!item.isEditing">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="doEdit(item)">编辑
                            </el-button>
                        </p>
                        <p v-else>
                            <el-button size="mini" type="primary" plain @click="cellEditCancel(item)">取消
                            </el-button>
                            <el-button size="mini" type="primary" @click="cellEditSure(item)">确认
                            </el-button>
                        </p>
                    </div>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog class="addMultiple" title="添加多项" width="30%" :visible.sync="treeDialogVisible">
        <script-tree :transact-id="Number(transactId)" :aut-id="Number(autId)" @dialogCancel="addCancel" @dialogSure="addSure" @selectMethod="doClickSelectMethod">
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
        selectedTableRows: [], // 表格复选的行
        scriptList: [], // 脚本数据
        methodsList: [], // 获取的脚本方法
        objectMethod: {}, // 对象方法
        treeDialogVisible: false, // 添加多项对话框展示样式
        transactId: localStorage.getItem("transactId")
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
            this.tableData = []
            const scripts = res.data
            scripts.forEach((item, index) => {
              this.selectMethod(item, item.elementWidget, index)
            })
            console.log('treeData，获取的表格数据', this.tableData, '1')

          }
        }).catch(error => {
          this.$message.warning(error)
          this.tableData = []
        })
      },
      // 查询方法
      selectMethod(item, classname, index) {
        Request({
          url: '/aut/selectMethod',
          method: 'POST',
          params: {
            classname,
            id: this.autId
          }
        }).then(res => {
          if(res.respCode === "0000") {
            item.myMethods = res.omMethodRespDTOList
            item.arguments = item.arguments.map(argItem => {
              return {
                ...argItem,
                isEditing: false,
                flag: true,
                index
              }
            })
            this.$set(this.objectMethod, classname, res.omMethodRespDTOList)
            this.tableData.push({
                name: `UI:${item.uiname} 元素:${item.elementName}`,
                uiname: item.uiname,
                elementName: item.elementName,
                myMethods: item.myMethods,
                elementWidget: item.elementWidget,
                arguments: item.arguments,
                methodName: item.methodName,
                id: 'id' + index
              })
          }
        }).catch(error => {
          console.log('method 获取失败', error)
        })
      },
      // 点击查询方法
      doClickSelectMethod(item, classname) {
        Request({
          url: '/aut/selectMethod',
          method: 'POST',
          params: {
            classname,
            id: this.autId
          }
        }).then(res => {
          if(res.respCode === "0000") {
            console.log('select', res)
            this.$set(this.objectMethod, classname, res.omMethodRespDTOList)
          }else {
            console.log('方法查询失败')
          }
        }).catch(error => {
          console.log('方法查询失败')
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
        console.log('tree 数据传输', data)
        // this.tableData = data
        data.forEach((item, index) => {
          if(item.flag == 1) {
            item.myMethods = this.objectMethod[item.methodName]
            console.log("tree", item)
            if(item.myMethods.length > 0) {
              const dataArguments = JSON.parse(item.myMethods[0].arguments.substring(1, item.myMethods[0].arguments.length - 1))
              dataArguments.flag = true
              dataArguments.isEditing = false
              item.arguments.push(dataArguments)
            }else {
              item.arguments.push({
                isEditing: false,
                flag: true
              })
            }
            item.methodName = item.myMethods[0].name
          }else {
            item.myMethods.push({
              id: 'func' + index,
              name: item.methodName
            })
            if(item.argStr === '[]') {
              item.arguments.push({
                isEditing: false,
                flag: false
              })
            }else {
              let dataArguments = JSON.parse(item.argStr.substring(1, item.argStr.length - 1))
              dataArguments.isEditing = false
              dataArguments.flag = true
              item.arguments.push(dataArguments)
            }
          }
        })
        this.tableData.push(...data)
        this.tableData = this.tableData.map((item, index) => {
          return {
            ...item,
            index: index,
            id: 'myId' + index
          }
        })
        this.treeDialogVisible = false
      },

      // 删除按钮
      deleteTableRow() {
        if(this.selectedTableRows.length === 0) {
          this.$message.warning('请选择要删除的行')
        }else {
          const indexs = this.selectedTableRows.map(item => item.index)
          indexs.sort((a, b) => b - a)
          console.log('tree', indexs)
          indexs.forEach(index => {
            this.tableData.splice(index, 1)
          })
          this.$message.success('移除成功')
        }
      },

      // 上移
      rowsUp() {
        /**
         * 实现思路：
         *  遍历表格数据，从前往后依次匹配选中的数据项
         *  找到定位后，将定位到的数据项往前移动一位
         *  从前往后遍历的原因：防止污染前面数据的下标导致移动出错
         */
        if(this.selectedTableRows.length == 0) {
          this.$message.warning('请选择要操作的行')
        }else {
          let flag = false
          for(let i = 0; i < this.tableData.length; i ++ ) {
            if(this.selectedTableRows.some(item => item.index === this.tableData[i].index)) {
              if(flag) {
                let temp = this.tableData.splice(i, 1)[0]
                this.tableData.splice(i - 1, 0, temp)
              }
            }else {
              flag = true
            }
          }
        }
      },

      // 下移
      rowsDown() {
        /**
         * 实现思路：
         *  遍历表格数据，从后往前依次匹配选中的数据项
         *  找到定位后，将定位到的数据项往后移动一位
         *  从后往前遍历的原因：防止污染前面数据的下标导致移动出错
         * 定义 flag 防止数组溢出
         */
        if(this.selectedTableRows.length == 0) {
          this.$message.warning('请选择要操作的行')
        }else {
          let flag = false
          for(let i = this.tableData.length - 1; i > -1 ; i --) {
            if(this.selectedTableRows.some(item => item.index === this.tableData[i].index)) {
              if(flag) {
                // 每次移动将当前item移除
                let temp = this.tableData.splice(i, 1)[0]
                this.tableData.splice(i + 1, 0, temp)
              }
            }else {
              flag = true
            }
          }
        }
      },
      // 保存表格配置
      saveConfigTable() {
        // content: "UI("页面").webedit("搜索框").set(Data.TableColumn("{搜索框}"));↵UI("页面").webbutton("百度一下按钮").click(Data.TableColumn("{百度一下按钮}"));↵wait("");↵"
        console.log('saveTable', this.tableData)
        let content = ""
        this.tableData.forEach(item => {
         if(item.flag !== 2) {
            let contentItem = `UI("${item.uiname}").${item.elementWidget}("${item.elementName}").${item.methodName}(${item.arguments[0].value});`
            content = content + contentItem
          }else {
            let contentItem = `${item.methodName}("${item.arguments[0].value}");`
            content = content + contentItem
          }
        })
        Request({
          url: '/scriptTemplate/saveScriptTemplate',
          method: 'POST',
          params: {
            scriptId: this.scriptId,
            content: content,
            transId: localStorage.getItem('transactId'),
            userId: sessionStorage.getItem("userId")
          }
        }).then(res => {
          if(res.respCode === "0000") {
            this.$message.success("保存成功")
            this.queryScriptInfo()
          }
        }).catch(error => {
          console.log("保存失败", error)
        })
      },

      // 执行参数化
      doParameterize() {
        let content = ""
        this.tableData.forEach(item => {
          let contentItem = `UI("${item.uiname}").${item.elementWidget}("${item.elementName}").${item.methodName}(${item.arguments[0].value});`
          content = content + contentItem
        })
        Request({
          url: '/scriptTemplate/scriptParameterized',
          method: 'POST',
          params: {
            autId: this.autId, 
            content: content,
            scriptId: this.scriptId,
            userId: sessionStorage.getItem("userId"),
            transId: localStorage.getItem("transactId")
          }
        }).then(res => {
          if(res.respCode === '0000') {
            this.$message.success("参数化成功")
            this.queryScriptInfo()
          }
        }).catch(error => {
          console.log("参数化失败", error)
        })
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
        let _this = this
        Sortable.create(document.querySelector('#dragableTable tbody'), {
          animation: 300,
          delay: 0,
          sort: true,
          filter: ".el-input__inner",
           preventOnFilter: false, //默认true 是否禁用默认绑定的方法
          onEnd(event) {
            // 拖拽结束事件，实现了表格的拖拽排序
            const dragRow = _this.tableData.splice(event.oldIndex, 1)[0]
            _this.tableData.splice(event.newIndex, 0, dragRow)
            console.log("drag", _this.tableData)
          }
        })
      },
      // 表格行选择事件
      handleTableRowSelection(val, row) {
        console.log('handleTableRowSelection', val, row)
        this.selectedTableRows = val
      },
      // 表格行下拉框选择
      handleRowSelectChange(row, ev) {
        console.log('rowSelect', row, ev)
        const myArguments = row.myMethods.find(item => {
          return item.name == ev
        }).arguments
          console.log('rowSelect', myArguments)
        if(!(myArguments == "[]")) {
          let name = JSON.parse(myArguments.substring(1, myArguments.length - 1)).name
          console.log("rowSelect", name)
          row.arguments[0].name = name
        }
      }
    }
  }
</script>

<style lang="less">
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
            width: 130px;

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
