<!--
  multipleSelection：是否可以多选
  transId：功能点id
  autId：被测系统id
  dialogCancel: 调用父组件取消方法
  dialogSure：调用父组件确定方法
-->
<template>
  <div>
    <div class="uiElementArea">
      <p>UI与元素</p>
      <el-tree
        :data="uis"
        :props="defaultProps"
        ref="ueTree"
        show-checkbox
        default-expand-all
        check-on-click-node
        highlight-current	
        @check-change="handleUECheckChange">
      </el-tree>
    </div>
    <div class="functionArea">
      <p>公共函数集</p>
      <el-tree
        :data="omMethodRespDTOList"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        check-on-click-node
        highlight-current	
        @check-change="handleMethodsCheckChange">
      </el-tree>
    </div>
    <el-row class="treeBottomRow">
      <el-button
        type="warning"
        size="small"
        plain
        @click="closeTree"
        >取消
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="addTreeDataSure"
        >确认
      </el-button>
    </el-row>
  </div>
</template>

<script>
  import Request from '@/libs/request.js'
  export default {
    name: 'ScriptTree',
    data() {
      return {
        uis: [], // ui数组数据
        omMethodRespDTOList: [], // 功能函数数组
        defaultProps: {
          label: 'label', // 指定节点标签为节点对象的某个属性值
          children: 'children', // 指定子树为节点对象的某个属性值
        }, // 配置选项
        selectedUEs: [], // 选择的UI与元素数据合集
        selectedFuncs: [], // 选择的函数集合集
      }
    },
    props: {
      transactId: {
        type: Number,
        default: 0
      },
      autId: {
        type: Number,
        dafault: 0
      }
    },
    created() {
      this.queryAllElementsForATransact()
      this.selectFunctionSet()
    },
    methods: {
      // 获取全部的UI与元素
      queryAllElementsForATransact() {
        Request({
          url: '/elementRepository/queryAllElementsForATransact',
          method: 'POST',
          params: {
            transactId: this.transactId
          }
        }).then(res => {
          if(res.respCode === '0000') {
            const getUis = res.uis
            getUis.forEach((item, index) => {
              item.elements.forEach(elementItem => {
                elementItem.uiName = item.uiName
              })
              this.uis.push({
                ...item,
                id: 'ui' + item.uiId,
                label: item.uiName,
                children: item.elements
              })
            })
            this.uis.forEach(item => {
              delete item.elements
              item.children.forEach(childrenItem => {
                childrenItem.label = childrenItem.elementName
                childrenItem.id = 'el' + childrenItem.elementId
              })
            })
          }else {
            console.log('ui元素数据加载失败')
          }
        }).catch(error => {
          console.log("ui元素数据加载失败", error)
        })
      },
      // 获取公共函数集
      selectFunctionSet() {
        Request({
          url: '/aut/selectFunctionSet',
          method: 'POST',
          params: {
            id: this.autId
          }
        }).then(res => {
          if(res.respCode === '0000') {
            const getOmMethodRespDTOList = res.omMethodRespDTOList
            getOmMethodRespDTOList.forEach(item => {
              this.omMethodRespDTOList.push({
                ...item,
                label: item.name
              })
            })
          }else {
            console.log("函数库数据加载失败")
          }
        }).catch(error => {
          console.log("函数库数据加载失败", error)
        })
      },
      /* UI与元素 tree 点击事件 */
      handleUECheckChange(data, checked, indeterminate) {
        const curNode = this.$refs.ueTree
        if("children" in data) {
          return console.log('tree这是父组件数据')
        }
        this.selectedUEs = this.selectedUEs.filter(item => item.id != data.id)
        if(checked) {
          this.selectedUEs.push({
            name: `UI:${data.uiName} 元素:${data.elementName}`,
            elementWidget: data.classType,
            methodName: data.classType,
            id: data.id,
            arguments: [],
            methods: []
          })
        }
        // console.log("treeData handleUECheckChange", data, checked, indeterminate)
        console.log("tree", this.selectedUEs)
      },
      /* 方法点击事件 */
      handleMethodsCheckChange(data, checked, indeterminate) {
        console.log("treeData handleMethodsCheckChange", data, checked, indeterminate)
      },
      /** 底部按钮事件 */
      // 关闭对话框
      closeTree() {
        this.$emit("dialogCancel")
      },
      // 将tree数据添加到table进行渲染
      addTreeDataSure() {
        this.$emit("dialogSure", this.selectedUEs)
      }
    }
  }
</script>

<style lang="less" scoped>
  .uiElementArea {
    margin-bottom: 10px;
  }
  .functionArea {
    margin-bottom: 10px;
  }
  .treeBottomRow {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
    margin: -10px 0;
  }
</style>