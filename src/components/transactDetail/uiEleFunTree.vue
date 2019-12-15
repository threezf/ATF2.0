/**
 * transId 功能点Id; autId是测试系统Id，两者用于查询 UI 元素 以及方法
 * title 是弹窗标题默认 选择操作箱
 * showFlag 用于与父组件交互 控制弹窗显示隐藏
 * multiselection 是否支持多选 即树结构前是否有checkbox
 * 点击确认触发事件  throwInfo  向父组件传选择元素及方法的lsit
 */
<template>
    <el-dialog :title=title :visible.sync="sonShowFlag" width	="50%">
        <el-row>
            <el-col :span="5">
                <span>
                    Ui与元素
                </span>
            </el-col>
        </el-row>
        <el-tree 
            :data="data" 
            :props="defaultProps" 
            @node-click="handleNodeClick">
        </el-tree>
        <el-row>
            <el-col :span="5">
                <span>
                    公共函数集
                </span>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="throwInfo">确 定</el-button>
        </div>
    </el-dialog>
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
        showFlag:{
            type: Boolean,
            default: false
        },
        multiselection:{
            type: Boolean,
            default: false
        },
    },
  data() {
    return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        sonShowFlag :this.showFlag
    }
  },
    watch: {
        sonShowFlag(newName, oldName) { 
          if(newName == false){
              console.log('close UI and ele')
            this.$emit("closeDialog",123)
          }  
        },
        showFlag(newName, oldName){
            this.sonShowFlag = this.showFlag
        }
  },
  computed: {
  },
  methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      closeDialog(){
          this.$emit("closeDialog",123)
      },
      throwInfo(){
          this.$emit("closeDialog")
      }
      
  },
  created() {},
  mounted() {
      console.log(this.showFlag)
  }
};
</script>
<style lang="less" scoped>
</style>