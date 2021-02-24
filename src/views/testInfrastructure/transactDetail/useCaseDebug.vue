<!--
 * @Author: your name
 * @Date: 2020-10-21 10:20:29
 * @LastEditTime: 2020-10-21 10:39:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\views\testInfrastructure\transactDetail\useCaseDebug.vue
-->
<!--
  用例调试界面
  整合了
    1. 测试资源管理
    2. 测试计划及执行
-->
<template>
<div class="page-inner">
    <div class="scriprConfigStyle">
        <!-- <script-data></script-data> -->
        <set-datable></set-datable>
    </div>
    <i class=""></i>
    <div class="runStyle">
        <run-script :aut-id="Number(autId)" :case-id="Number(caseId)" :script-id="Number(scriptId)">
        </run-script>
    </div>
</div>
</template>

<script>
  import ScriptData from '@/components/testInfrastructure/useCaseDebug/scriptData'
  import SetDatable from '@/components/testInfrastructure/useCaseDebug/setDatable'
  import RunScript from '@/components/testInfrastructure/useCaseDebug/runScript'
  import Request from '@/libs/request'
  export default {
    name: 'UseCaseDebug',
    data() {
      return {
        autId: '', // 被测系统id
        caseId: '', //用例id
        scriptId: '', // 脚本id
        caselibId: '',
        testPlanId: ''
      }
    },
    components: {
      ScriptData,
      RunScript,
      SetDatable
    },
    created() {
      console.log('进入用例调试界面')
      const query = this.$route.query
      this.autId = query.autId
      this.caseId = query.caseId
      this.scriptId = query.scriptId
      sessionStorage.setItem('scriptId', this.scriptId)
      this.queryScriptDebugTestPlan(this.caseId)
    },
    methods: {
      queryScriptDebugTestPlan(caseId) {
        Request({
          url: '/testPlanController/queryScriptDebugTestPlan',
          method: 'POST',
          params: {
            caseId,
            scriptId: this.scriptId
          }
        }).then(res => {
          if(res.respCode === '0000') {
            this.caselibId = res.testPlanEntity.caseLibId
            this.testPlanId = res.testPlanEntity.id
            sessionStorage.setItem("caselibId", res.testPlanEntity.caseLibId)
          }
        }).catch(error => {
          console.log('run查询测试计划失败', error)
          this.$message.warning('该测试计划尚未发起执行')
        })
      }

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
