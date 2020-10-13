<!--
  用例调试界面
  整合了
    1. 测试资源管理
    2. 测试计划及执行
-->
<template>
  <div class="page-inner">
    <div class="scriprConfigStyle">
      <script-data></script-data>
    </div>
    <div class="runStyle">
      <run-script
        :aut-id="autId"
        :case-id="caseId"
        :script-id="scriptId"> 
      </run-script>
    </div>
  </div>  
</template>

<script>
  import ScriptData from '@/components/testInfrastructure/useCaseDebug/scriptData'
  import RunScript from '@/components/testInfrastructure/useCaseDebug/runScript'
  export default {
    name: 'UseCaseDebug',
    data() {
      return {
        autId: '', // 被测系统id
        caseId: '', //用例id
        scriptId: '', // 脚本id
      }
    },
    components: {
      ScriptData,
      RunScript
    },
    created() {
      console.log('进入用例调试界面')
      const query = this.$route.query
      this.autId = query.autId
      this.caseId = query.caseId
      this.scriptId = query.scriptId
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .scriprConfigStyle {
    height: 410px;
  }
  .runStyle {
    height: calc(100% - 500px);
  }
</style>