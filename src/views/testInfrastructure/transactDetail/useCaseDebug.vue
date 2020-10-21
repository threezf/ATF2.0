<!--
  用例调试界面
  整合了
    1. 测试资源管理
    2. 测试计划及执行
-->
<template>
  <div class="page-inner">
    <script-data></script-data>
    <run-script></run-script>
  </div>  
</template>

<script>
  import ScriptData from '@/components/testInfrastructure/useCaseDebug/scriptData'
  import RunScript from '@/components/testInfrastructure/useCaseDebug/runScript'
  export default {
    name: 'UseCaseDebug',
    data() {
      return {
        
      }
    },
    components: {
      ScriptData,
      RunScript
    },
    created() {
      console.log('进入用例调试界面')
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .debugTitleRow {
    border-bottom: 1px solid #d3d3d3;
    padding: 10px 5px ;
  }
  .funcButtonRow {
    margin: 10px 5px;
  }
</style>