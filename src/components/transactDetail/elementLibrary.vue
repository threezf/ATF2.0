<template>
  <div class="page-outer">
    <div class="page-inner">
        <div class='ele-container'>
            <div class="ele-left">
                <div>
                    <el-row>
                        <span>
                            元素列表
                        </span>
                    </el-row>
                </div>
                <div class='content'>
                    <el-row>
                        <el-button
                            size="mini" 
                            type="primary"
                            @click="addUIShow">
                            添加UI
                        </el-button>
                        <el-button
                            size="mini" 
                            type="primary"
                            @click="deleteUIShow">
                            删除UI
                        </el-button>
                        <el-button
                            size="mini" 
                            type="primary"
                            @click="addEleShow">
                            添加元素
                        </el-button>
                        <el-button
                            size="mini" 
                            type="primary"
                            @click="deleteEleShow">
                            删除元素
                        </el-button>
                        <el-button
                            size="mini" 
                            type="primary"
                            @click="branchAddEleShow">
                            批量添加
                        </el-button>
                    </el-row>
                    <el-input
                        class="keywords"
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                    </el-input>
                    <el-tree
                        class="filter-tree"
                        :data="treeData"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        @node-click="handleNodeClick"
                        ref="tree2">
                    </el-tree>
                </div>
            </div>
            <div class="ele-right">
                <div>
                    <el-row>
                        <span>
                            {{infoCardName}}
                        </span>
                    </el-row>
                </div>
                <div class='content'>
                    <el-row>
                        <el-col :offset="2" :span="5">
                            <span v-if='infoCardType === true'>
                                元素名称 ：
                            </span>
                            <span v-else-if='infoCardType === false'>
                                UI名称 ：
                            </span>
                            <span v-else>
                                请选择UI或元素
                            </span>

                        </el-col>
                        <el-col :span="5" class='rightLable' v-if='infoCardType !== undefined'>
                            <el-input 
                                v-model="input" 
                                placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="4" class='rightLable'  v-if='infoCardType'>
                            <span>
                                类型 ：
                            </span>
                        </el-col>
                        <el-col :span="5"  v-if='infoCardType'>
                            <el-select filterable v-model="tranSelectValue" placeholder="请选择" >
                                <el-option
                                v-for="item in classselectOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    
                    <el-row  v-if='infoCardType'>
                        <el-col :span="4" :offset="2">
                            <span>
                                属性
                            </span>
                        </el-col>
                    </el-row>
                     <el-table
                        v-if='infoCardType'
                        border
                        ref="multipleTable"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="主属性"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="desc"
                        label="属性值"
                        width="120">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
    <el-dialog title="添加UI" :visible.sync="addUIDialogFlag">
        <el-form :model="form">
            <el-row>
                <el-col :span='5'>
                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addUIDialogFlag = false">取 消</el-button>
            <el-button type="primary" @click="addUIDialogFlag = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
export default {
  components: {},
  mixins: [VueMixins],
  data() {
    return {
        infoCardName:'',//信息详情的卡片名称
        infoCardType:undefined,//信息详情的卡片种类： undifinde是未选择初始状态  true?"ele":"UI"
        classselectOptions:[],
        selectOptions:[],
        tranSelectValue:'',
        autoSelectValue:'',
        filterText: '',
        input:'',
        treeData: [],
        addUIDialogFlag: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData3: [{
          date: '2016-05-03',
          name: 'xpath',
          desc: "//id='key'"
        },],
        form: {
          name: '',
          region: ''
        },
    }
  },
    watch: {
        filterText(val) {
        this.$refs.tree2.filter(val);
        }
    },
  computed: {},
  methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data, node, indeterminate) {
        console.log(data);
        console.log(data.id);
        console.log(data.label);
        this.infoCardName = data.label
        node.isLeaf ? (this.infoCardType = true) : (this.infoCardType = false)
        this.input = data.label
        this.tableData3 = []
        this.tableData3.push({
          date: '2016-05-03',
          name: data.label,
          desc: "//id="+data.id
        })
        console.log( node);
        console.log(indeterminate);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getEleTree(tranId){
          const _this = this
            Request({
                url: '/elementRepository/queryAllElementsForATransact',
                method: 'post',
                params:{'transactId':tranId}
            }).then((res) => {
                let tree =[]
                this.tranSelectValue = ''
                for (let i = 0 ;i < res.uis.length;i++){
                    let node = {
                        id: res.uis[i].uiId,
                        label: res.uis[i].uiName,
                        children: []
                    }
                    for(let j = 0;j < res.uis[i].elements.length;j++){
                        let child={
                            id: res.uis[i].elements[j].elementId,
                            label: res.uis[i].elements[j].elementName
                        }
                        node.children.push(child)
                    }
                    tree.push(node)
                }
                _this.treeData = tree
                console.log('_this.treeData',_this.treeData)
            },(err) => {
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
      },
      getClass(autId){
            Request({
                url: '/aut/queryAutVisibleOmClasses',
                method: 'post',
                params:{'id':autId}
            }).then((res) => {
                let tree =[]
                this.tranSelectValue = ''
                for (let i = 0 ;i < res.uis.length;i++){
                    let node = {
                    id: res.uis[i].uiId,
                    label: res.uis[i].uiName,
                    children: []
                    }
                    for(let j = 0;j < res.uis[i].elements.length;j++){
                        let child={
                            id: res.uis[i].elements[j].elementId,
                            label: res.uis[i].elements[j].elementName
                        }
                        node.children.push(child)
                    }
                    tree.children.push(node)
                }
                _this.treeData = tree
                console.log(this.treeData,'this.treeData')
            },(err) => {
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
      },
      // 以下为点击按钮时，清空弹框 并再次展示弹窗
      addUIShow(){
          this.addUIDialogFlag = true
      },
      deleteUIShow(){
          
      },
      addEleShow(){
          
      },
      deleteEleShow(){
          
      },
      branchAddEleShow(){
          
      }
  },
  created() {},
  mounted() {
      this.getEleTree('1707')
      this.getClass()
  }
};
</script>
<style lang="less" scoped>
.ele-container{
    display:flex
}
.ele-left{
    width:40%;
    padding:10px;
    background: #f4f5f7;
    margin-right:10px;
}
.ele-right{
    width:60%;
    padding:10px;
    background: #f4f5f7;
}
.keywords{
    margin-bottom: 10px
}
.content{
    border: 1px solid #c0c4cc;  
    padding: 0px 5px;
    min-height: 450px;
}
</style>