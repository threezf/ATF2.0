<template>
  <div class="page-outer">
    <div class="page-inner">
        <div class='ele-container'>
            <el-row>
                <el-button
                    icon="el-icon-plus"
                    size="small" 
                    type="primary"
                    @click='addTemplateShow'>
                    添加脚本
                </el-button>
                <el-button
                    icon="el-icon-delete"
                    size="small" 
                    type="primary"
                    @click='deleteTemplateShow'>
                    删除脚本
                </el-button>
            </el-row>
             <el-table
                border
                ref="singleTable"
                :data="templateList"
                highlight-current-row
                @row-click='chooseTemplate'
                style="width: 100%">
                <el-table-column
                lable="选择"
                width="35">
                <template  slot-scope="scope">
                    <div class='radioMask'/>
                    <el-radio-group v-model="templateRadio">
                        <el-radio @click.stop='' :label="scope.row.id">.</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column
                property="name"
                label="脚本名称">
                </el-table-column>
                <el-table-column
                property="desc"
                label="描述">
                </el-table-column>
            </el-table>
            <div class = "templatInfo">
                <el-row>
                    <span>
                        脚本数据
                    </span>
                </el-row>
                <hr>
                <div>
                    <el-row>
                        <el-button
                            size="small" 
                            type="primary"
                            icon="el-icon-plus"
                            @click='addItemShow = true'>
                            添加多项
                        </el-button>
                        <el-button
                            icon="el-icon-delete"
                            size="small" 
                            type="primary">
                            删除
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-up"
                            size="small" 
                            type="primary">
                            上移
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-down"
                            size="small" 
                            type="primary">
                            下移
                        </el-button>
                        <el-button
                            icon="el-icon-document"
                            size="small" 
                            type="primary">
                            保存
                        </el-button>
                        <el-button
                            icon="el-icon-printer"
                            size="small" 
                            type="primary">
                            参数化
                        </el-button>
                    </el-row>
                      <el-table
                        border
                        ref="multipleTable"
                        :data="templateInfo"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        row-key="sortid"
                        class="sortable">
                        <el-table-column
                            label="排序"
                            width="55">
                            <template slot-scope="scope">
                                <i :id ='scope.row.date' class="el-icon-sort"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="选择"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="操作项"
                            width="200"
                            prop="name">
                        </el-table-column>
                        <el-table-column
                            prop="methodName"
                            label="方法"
                            width="180">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.methodName" placeholder="请选择">
                                    <el-option
                                    v-for="item in methods[scope.row.elementWidget]"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="arguments"
                            label="参数">
                            <template slot-scope="scope">
                                <div v-if='scope.row.arguShow'>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                名称
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                参数值
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                 {{ item.name }} 
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                 {{ item.value }} 
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-button 
                                        size="mini" 
                                        type="primary"
                                        icon="el-icon-edit" 
                                        @click='scope.row.arguShow = false'>
                                        编辑
                                    </el-button>
                                </div>
                                <div v-else>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                名称
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                参数值
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                 {{ item.name }} 
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <el-input 
                                                @dragenter.stop=""
                                                v-model="item.newvalue" ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <el-button  
                                                @click='item.newvalue = item.value;scope.row.arguShow = true'
                                                size="small">
                                                 取消
                                            </el-button>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-button 
                                                type="primary" 
                                                size="small"  
                                                @click='item.value = item.newvalue;scope.row.arguShow = true'>
                                                确认
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </template>
                        </el-table-column>
                        <div slot="empty">
                            暂无数据,请选择脚本
                        </div>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
    <el-dialog title="新增脚本" :visible.sync="addTemplateDialog" width	="30%">
        <el-form :model="addTemplateForm"  label-width="80px">
            <el-form-item label="脚本名称">
            <el-input v-model="addTemplateForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="脚本描述">
            <el-input v-model="addTemplateForm.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addTemplateDialog = false">取 消</el-button>
            <el-button type="primary" @click="addTemplate">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="删除脚本" :visible.sync="deleteTemplateDialog" width	="30%">
        <span :offset="2">确定要删除该脚本吗？</span>
        <div slot="footer" class="dialog-footer">
            <el-button @click="deleteTemplateDialog = false">取 消</el-button>
            <el-button type="primary" @click="deleteTemplate">确 定</el-button>
        </div>
    </el-dialog>
    <uiEleFunTree 
        @closeDialog = "addItemShow = false"
        :show-flag='addItemShow'
        :multiselection='true'>
    </uiEleFunTree>
  </div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import draggable from 'vuedraggable'
import Sortable from 'sortablejs';
import uiEleFunTree from './uiEleFunTree';

export default {
    components: {
        draggable,
        uiEleFunTree
    },
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
            methods:{},//用于存放查询出的控件方法 { 控件名1：{信息}[，控件名2：{信息}]}
            addTemplateForm:{
                name:'',
                description:'',
                transId:this.transId
            },
            templateRadio:"",//选择的template
            addTemplateDialog:false,
            deleteTemplateDialog:false,
            templateList: [
            ],
            templateInfo:  [],
            currentRow: null,
            multipleSelection:'',
            addItemShow:false,
        }
    },
    watch: {},
    computed: {},
    methods: {
        //行拖拽
        rowDrop() {
        const tbody = document.querySelector('.sortable tbody')
        const _this = this
        Sortable.create(tbody, {
            animation: 180,// 0.18s 动画时间
            delay: 0,// 按住、松开0毫秒后触发效果
            onEnd({ newIndex, oldIndex }) {
            const currRow = _this.templateInfo.splice(oldIndex, 1)[0]
            _this.templateInfo.splice(newIndex, 0, currRow)
            _this.templateInfo.push(_this.templateInfo.pop())
            }
        })
        },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('multipleSelection',this.multipleSelection)
      },
      //各个模态框的展示
      addTemplateShow(){
          this.addTemplateDialog = true
      },
      deleteTemplateShow(){
          if( !this.templateRadio ){
              this.$message('请选择要删除的脚本')
              return
          }
        this.deleteTemplateDialog = true
      },
      // 添加template
      addTemplate(){
        Request({
            url: '/scriptTemplate/insert',
            method: 'post',
            params: this.addTemplateForm
        }).then((res) => {
            this.$message(res.respMsg)
            this.addTemplateDialog = false
            this.getTemplates()
        },(err) => {
            this.$message(res.respMsg)
        })
      },
      //删除脚本
      deleteTemplate(){
        console.log(''+this.templateRadio)
        Request({
            url: '/scriptTemplate/delete',
            method: 'post',
            params: {id: this.templateRadio}
        }).then((res) => {
            this.deleteTemplateDialog = false
            this.$message(res.respMsg)
            this.getTemplates()
        },(err) => {
            this.$message(err)
        })
      },
      // 获取脚本
      getTemplates(){
          console.log("getTemplates")
        Request({
            url: '/scriptTemplate/queryTemplateByTransId',
            method: 'post',
            params: {id: this.transId}
        }).then((res) => {
            this.templateList = []
            console.log('getTemplates',res)
            let list = res.scriptTemplateList
            for(let i = 0;i<list.length;i++){
                this.templateList.push({
                    name:list[i].name,
                    desc:list[i].description,
                    id:list[i].id,
                })
            }
        },(err) => {
            this.$message(res.respMsg)
        }).catch((err) => {
            this.$message("网络开小差啦！")
        })
      },
      // 获取脚本详情，用于表格展示
      getTemplateInfo(){
        Request({
            url: '/scriptTemplate/queryScriptInfo',
            method: 'post',
            params: {
                scriptId:this.templateRadio,
                autId: this.autId
            }
        }).then((res) => {
            this.templateInfo = []
            if (res.respCode !== '0000') {
                let message = `返回码:【${res.respCode}】 || 返回信息:${res.respMsg} }`
                this.$message(message)
                return
            }
            let list = res.data
            for(let i = 0;i<list.length;i++){
                this.getMethods(list[i].elementWidget)
                for(let j = 0 ; j< list[i].arguments.length; j++){
                list[i].arguments[j].index = i
                list[i].arguments[j].newvalue = list[i].arguments[j].value
                }
                // let argunmen
                // for(let i = 0 ; i < list[i].arguments.length ; i++){

                // }
                console.log('list[i].arguments',list[i].arguments)
                this.templateInfo.push({
                    sortid:i,
                    name: 'UI:'+list[i].uiname+" 元素:"+list[i].elementName,
                    elementWidget: list[i].elementWidget,
                    methodName: list[i].methodName,
                    arguments: list[i].arguments,
                    arguShow: true,// 参数一列的展示方式 ( arguShow ? 展示 : 可编辑 )
                })
            }
        },(err) => {
            this.$message(err)
        })
      },
      // 获取控件方法
    getMethods(classname){
        if(this.methods[classname]){
            //如果存在 则返回
            return
        }
        Request({
            url: '/aut/selectMethod',
            method: 'post',
            params: {id: this.autId,classname:classname}
        }).then((res) => {
            if (res.respCode !== '0000') {
                let message = `返回码:【${res.respCode}】 || 返回信息:${res.respMsg} }`
                this.$message(message)
                return
            }
            console.log('getMethods',res)
            let list = res.omMethodRespDTOList
            this.$set(this.methods, classname, list)
        },(err) => {
            this.$message(err)
        })
      },
      //选择脚本
      chooseTemplate(row, column, event){
          this.templateRadio = row.id
          this.getTemplateInfo()
      }
    },
    created() {},
    mounted() {
        this.getTemplates()
        this.rowDrop()
        document.body.ondrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
};
</script>
<style lang="less" scoped>
.templatInfo{
    margin:10px 0px;
    border-radius: 5px;
}
.radioMask{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 9;
}
.el-radio__label{
    margin-left: -40px;
}
</style>