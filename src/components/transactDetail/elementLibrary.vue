<template>
  <div class="page-outer">
    <div class="page-inner">
        <div class='ele-container'>
            <div class="ele-left">
                
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>元素列表</span>
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
            </el-card>
            </div>
            <div class="ele-right">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{infoCardName}}</span>
                    </div>
                    <div class='content'>
                        <el-row>
                            <el-col :offset="2" :span="5">
                                <span v-if='infoCardType === true'>
                                    元素名称 ：
                                </span>
                                <span  v-else-if='infoCardType === false'>
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
                                <el-select filterable v-model="classType" placeholder="请选择" >
                                    <el-option
                                    v-for="item in classselectOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
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
                            :data="mainProperties"
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
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="value"
                                label="属性值"
                                width="">
                            </el-table-column>
                        </el-table>
                        <el-row >
                            <el-col :span="3" :offset='14'>
                                <el-button  
                                    size="small">
                                        取消
                                </el-button>
                            </el-col>
                            <el-col :span="5">
                                <el-button 
                                    type="primary" 
                                    size="small" >
                                    保存
                                </el-button>
                            </el-col>
                        </el-row>
                    </div> 
                </el-card>
            </div>
        </div>
    </div>
    <el-dialog title="添加UI" :visible.sync="addUIDialogFlag" width='30%'>
        <el-form :model="addUIform"  label-width="80px">
             <el-form-item label="UI名称">
                <el-input v-model="addUIform.name"></el-input>
            </el-form-item>
             <el-form-item label="UI描述">
                <el-input v-model="addUIform.desc"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addUIDialogFlag = false">取 消</el-button>
            <el-button type="primary" @click=" addUI">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="添加元素" :visible.sync="addEleDialogFlag" width='30%'>
        <el-form :model="addEleform"  label-width="80px">
             <el-form-item label="元素名称">
                <el-input v-model="addEleform.elementName"></el-input>
            </el-form-item>
            <el-form-item label="控件类型">
                <el-select v-model="addEleform.classType" placeholder="请选择类型">
                    <el-option
                        v-for="item in classselectOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="主属性">
                <el-input v-model="addEleform.name"></el-input>
            </el-form-item>
             <el-form-item label="主属性值">
                <el-input v-model="addEleform.value"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addEleDialogFlag = false">取 消</el-button>
            <el-button type="primary" @click=" addEle">确 定</el-button>
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
    props:{
        transId:{ 
            type: String,
            default: '1708'
        },
        autId:{ 
            type: String,
            default: '1574'
        }
    },
  data() {
    return {
        infoCardName:'',//信息详情的卡片名称
        infoCardType:undefined,//信息详情的卡片种类： undifinde是未选择初始状态  true?"ele":"UI"
        classselectOptions:[],
        selectOptions:[],
        classType:'',//当前选中的元素的控件id
        selectedUI:'',//当前选中的UI 
        selectedEle:[],//当前选中的元素
        repositoryId:'1588',//元素库Id
        mainProperties:'',
        autoSelectValue:'',
        filterText: '',
        input:'',
        treeData: [],
        addUIDialogFlag: false,
        addEleDialogFlag:false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData3: [{
          date: '2016-05-03',
          name: 'xpath',
          desc: "//id='key'"
        },],
        addUIform: {
          name: '',
          desc: ''
        },
        addEleform: {
          elementName: '',
          classType: '',
          name:'',
          value:''
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
        this.infoCardName = data.label
        this.classType = data.classType
        this.mainProperties = data.mainProperties;
        ('classType' in data) ?(this.infoCardType = true) : (this.infoCardType = false)
        this.input = data.label
        this.tableData3 = []
        this.tableData3.push({
          date: '2016-05-03',
          name: data.label,
          desc: "//id="+data.id
        })
        console.log( node);
        if('classType' in data){
            this.selectedEle.push(this.selectedUI,data.id)
            this.selectedUI = ''
        }
        else{
            this.selectedUI = data.id
            this.selectedEle = []
        }

        console.log(indeterminate);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getEleTree(){
          const _this = this
            Request({
                url: '/elementRepository/queryAllElementsForATransact',
                method: 'post',
                params:{'transactId':this.transId}
            }).then((res) => {
                let tree =[]
                for (let i = 0 ;i < res.uis.length;i++){
                    let node = {
                        id: res.uis[i].uiId,
                        label: res.uis[i].uiName,
                        children: []
                    }
                    if(!res.uis[i].elements){
                        tree.push(node)
                        break
                    }
                    for(let j = 0;j < res.uis[i].elements.length;j++){
                        let child={
                            id: res.uis[i].elements[j].elementId,
                            label: res.uis[i].elements[j].elementName,
                            classType: res.uis[i].elements[j].classType,
                            mainProperties:res.uis[i].elements[j]. mainProperties
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
      //获取该测试系统下 所有的控件类型
      getClass(){
            Request({
                url: '/aut/queryAutVisibleOmClasses',
                method: 'post',
                params:{'id':this.autId}
            }).then((res) => {
                if(res.respCode=='0000'){
                    this.classselectOptions = res.omClassRespDTOList
                }
                else{
                    this.$message( res.respMsg )
                }
            },(err) => {
                console.log(err)
            })
      },
      // 以下为点击按钮时，清空弹框 并再次展示弹窗
      addUIShow(){
          this.addUIDialogFlag = true
      },
      deleteUIShow(){
          if(this.selectedUI === ''){
              this.$message('请选择UI，再进行删除')
              return
          }
        Request({
            url: '/elementRepository/deleteSingleUI',
            method: 'post',
            params:{"uiId":this.selectedUI,"repositoryId":this.repositoryId}
        }).then((res) => {
            if(res.respCode=='0000'){
                this.getEleTree()
                this.$message('删除成功：'+ res.respMsg )
            }
            else{
                this.$message( '删除失败：'+ res.respMsg )
            }
        },(err) => {
            console.log(err)
        })
      },
      addEleShow(){
          if(this.selectedUI === ''){
              this.$message('请选择UI，再进行添加')
              return
          }
          this.addEleDialogFlag = true
          
      },
      deleteEleShow(){
          if(this.selectedEle.length === 0){
              this.$message('请选择元素，再进行删除')
              return
          }
        Request({
            url: '/elementRepository/deleteSingleElement',
            method: 'post',
            params:{"repositoryId":this.repositoryId,"elementId":this.selectedEle[1],"uiId":this.selectedEle[0]}
        }).then((res) => {
            if(res.respCode=='0000'){
                this.getEleTree()
                this.$message('删除成功：'+ res.respMsg )
            }
            else{
                this.$message( '删除失败：'+ res.respMsg )
            }
        },(err) => {
            console.log(err)
        })
      },
      branchAddEleShow(){
          
      },
      addUI(){
        this.addUIDialogFlag = false
        Request({
            url: '/elementRepository/batchAddUI',
            method: 'post',
            params:{
                "repositoryId":this.repositoryId,
                "uis":[
                    {"uiName":this.addUIform.name} //支持数组传参单界面未设计 且desc不用传参
                ]
            }
        }).then((res) => {
            if(res.respCode=='0000'){
                this.getEleTree()
                this.$message('添加成功'+ res.respMsg )
            }
            else{
                this.$message( '添加失败'+ rres.respMsg )
            }
        },(err) => {
            console.log(err)
        })
      },
      addEle(){
        this.addEleDialogFlag = false
        Request({
            url: '/elementRepository/addSingleElement',
            method: 'post',
            params:{
                "repositoryId":this.repositoryId,
                "uiId":this.selectedUI,
                "element":{
                    "elementName":this.addEleform.elementName,
                    "classType":this.addEleform.classType,
                    "relateIdentifyObjectId":"",
                    "relateParentIdentifyObjectId":"",
                    "mainProperties":[
                        {"name":this.addEleform.name,
                        "value":this.addEleform.value,
                        "method":"",
                        "isRelative":null,
                        "toolName":""}
                    ]
                }
            }
        }).then((res) => {
            if(res.respCode=='0000'){
                this.getEleTree()
                this.$message('添加成功：'+ res.respMsg )
            }
            else{
                this.$message( '添加失败：'+ rres.respMsg )
            }
        },(err) => {
            console.log(err)
        })
      },
  },
  created() {},
  mounted() {
      this.getEleTree()
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
    margin-right:10px;
}
.ele-right{
    width:60%;
    padding:10px;
}
.keywords{
    margin-bottom: 10px
}
.content{
    padding: 0px 5px;
    min-height: 450px;
}
.page-inner{
    padding-top: 0px;
}
.el-select{
    width:100%
}
</style>