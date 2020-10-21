/**
 * transId 功能点Id; autId是测试系统Id，两者用于查询 UI 元素 以及方法
 * title 是弹窗标题默认 选择操作箱
 * showFlag 用于与父组件交互 控制弹窗显示隐藏
 * multiselection 是否支持多选 即树结构前是否有checkbox
 * 点击确认触发事件  throwInfo  向父组件传选择元素及方法的lsit
 */
<template>
    <div>
        <div>
            <el-row>
                <el-col :span="5">
                    <span>
                        Ui与元素
                    </span>
                </el-col>
            </el-row>
            <el-tree 
                default-expand-all
                :show-checkbox='multiselection'
                :data="UITree" 
                :props="defaultProps" 
                check-on-click-node	
                @check-change="eleCheckChange">
            </el-tree>
        </div>
        <div>
            <el-row>
                <el-col :span="5">
                    <span>
                        公共函数集
                    </span>
                </el-col>
            </el-row>
            <el-tree 
                :show-checkbox='multiselection'
                :data="funTree"  
                check-on-click-node
                :props="defaultProps" 
                @check-change="funCheckChange">
            </el-tree>
        </div>
        <el-row>
            <el-col :span="5" :offset='7'>
                <el-button size="small" type="primary" @click="throwInfo">确 定</el-button>
            </el-col>
            <el-col :span="5" >
                <el-button size="small" @click="closeDialog">取 消</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Request from '@/libs/request.js'
export default {
    props:{
        transId:{ 
            type: String,
            default: '1708'
        },
        autId:{ 
            type: String,
            default: '1574'
        },
        title:{
            type: String,
            default: '选择操作项'
        },
        multiselection:{
            type: Boolean,
            default: false
        },
        addItemFlag:{
            type: Number,
            default: 1
        }
    },
  data() {
    return {
        UITree: [],
        funTree: [],
        eleSelected: [],
        funSelected: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        sonShowFlag :this.showFlag
    }
  },
  watch: {
      addItemFlag(){
        this.getFunTree()
      }
  },
  computed: {
  },
  methods: {
      eleCheckChange(data,status){
        if('children' in data){
            return
        }
        if(!status){
            this.eleSelected = this.eleSelected.filter(v=>(
                v.id !== data.id
            ))
            return
        }
        this.eleSelected.push({
            "id": data.id ,
            "name": data.label ,
            "uiname": data.uiName ,
            "elementName": data.label ,
            "elementWidget": data.classType,
            "methodName": "",
            "arguments": data.mainProperties,
        })
        console.log('eleCheckChangedata');
        console.log(data);
        console.log(status);
      },
      funCheckChange(data,status){
        if('children' in data){
            return
        }
        if(!status){
            this.funSelected = this.funSelected.filter(v=>(
                v.id !== data.id
            ))
            return
        }
        console.log(data)
        this.funSelected.push({
            "id": data.id ,
            "name": data.label ,
            classId: data.classId,
            label: data.label,
            arguments: data.arguments,
        })
        console.log('funSelectedChangedata');
        console.log(data);
        console.log(status);
      },
      closeDialog(){
          this.$emit("closeDialog",123)
      },
      throwInfo(){
          this.$emit("closeDialog")
          console.log(this.eleSelected)
          this.$emit("throwTreeInfo",{
              elementTree: this.eleSelected,
              functionTree: this.funSelected
            })
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
                            uiName: res.uis[i].uiName,
                            label: res.uis[i].elements[j].elementName,
                            classType: res.uis[i].elements[j].classType,
                            mainProperties:res.uis[i].elements[j]. mainProperties
                        }
                        node.children.push(child)
                    }
                    tree.push(node)
                }
                _this.UITree = tree
                console.log('_this.UITree',_this.UITree)
            },(err) => {
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
      },
      getFunTree(){
          const _this = this
            Request({
                url: this.addItemFlag==3? '/aut/selectCheckFunctionSet' : '/aut/selectFunctionSet',
                method: 'post',
                params:{'id':this.autId}
            }).then((res) => {
                let tree =[]
                for (let i = 0 ;i < res.omMethodRespDTOList.length;i++){
                    let node = {
                        id: res.omMethodRespDTOList[i].id,
                        label: res.omMethodRespDTOList[i].name,
                        classId: res.omMethodRespDTOList[i].classId,
                        label: res.omMethodRespDTOList[i].name,
                        arguments: JSON.parse(res.omMethodRespDTOList[i].arguments),
                    }
                    tree.push(node)
                }
                _this.funTree = tree
                console.log('_this.funTree',_this.funTree)
            },(err) => {
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
      },
  },
  created() {},
  mounted() {
      this.getEleTree()
      this.getFunTree()
      console.log(this.showFlag)
  }
};
</script>
<style lang="less" scoped>
</style>