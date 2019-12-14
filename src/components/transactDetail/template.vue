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
                            icon="el-icon-plus">
                            添加多项
                        </el-button>
                        <el-button
                            icon="el-icon-delete"
                            size="small" 
                            type="primary">
                            删除删除
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
                        ref="multipleTable"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            label="操作"
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
                        label="元素名"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="控件类型"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="方法"
                        show-overflow-tooltip>
                        </el-table-column>
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
            addTemplateForm:{
                name:'',
                description:'',
                transId:this.transId
            },
            templateRadio:"",//选择的template
            addTemplateDialog:false,
            templateList: [
            ],
            tableData3: [{
                date: '2016-05-03',
                name: '搜索输入框',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '搜索按钮',
                address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            currentRow: null
        }
    },
    watch: {},
    computed: {},
    methods: {
      handleCurrentChange(val) {
          console.log(val)
        this.currentRow = val;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //各个模态框的展示
      addTemplateShow(){
          this.addTemplateDialog = true
      },
      deleteTemplateShow(){
        console.log('222')
      },
      // 添加template
      addTemplate(){
        Request({
            url: '/scriptTemplate/insert',
            method: 'post',
            params: this.addTemplateForm
        }).then((res) => {
            this.$message(res.respMsg)
        },(err) => {
            this.$message(res.respMsg)
        }).catch((err) => {
            this.$message("网络开小差啦！")
        })
        console.log(this.addTemplateForm)
        this.addTemplateDialog = false
      },
      // 获取脚本
      getTemplates(){
          console.log("getTemplates")
        Request({
            url: '/scriptTemplate/queryTemplateByTransId',
            method: 'post',
            params: {id: this.transId}
        }).then((res) => {
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
      // 获取脚本
      getTemplateInfo(){
          console.log("getTemplateInfo")
        Request({
            url: '/scriptTemplate/queryScriptInfo',
            method: 'post',
            params: {
                scriptId:this.templateRadio,
                autId: this.autId
            }
        }).then((res) => {
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
      //选择脚本
      chooseTemplate(row, column, event){
          this.templateRadio = row.id
          console.log('this is ')
          console.log(row)
          console.log(column)
          console.log(event)    
          try{
              event.stopPropagation();//非IE浏览器
          }
          catch(event){
              window.event.cancelBubble = true;//IE浏览器
          }   
      },
      showTemplateInfo(){
          console.log('this.templateRadio',this.templateRadio)
        //   this.getTemplateInfo()
      }
    },
    created() {},
    mounted() {
        this.getTemplates()
        console.log()
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