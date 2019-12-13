/**
 * transId 功能点Id; autId是测试系统Id，两者用于查询 UI 元素 以及方法
 * title 是弹窗标题默认 选择操作箱
 * showFlag 用于与父组件交互 控制弹窗显示隐藏
 * multiselection 是否支持多选 即树结构前是否有checkbox
 * 点击确认触发事件  throwInfo  向父组件传选择元素及方法的lsit
 */
<template>
    <el-dialog :title=title :visible.sync="showFlag" width	="50%">
        <span :offset="2">确定要删除该脚本吗？</span>
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
    }
  },
  watch: {},
  computed: {},
  methods: {
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