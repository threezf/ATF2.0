<template>
    <el-row>
      <el-col  :span="12">
          <InterfaceTable></InterfaceTable>
      </el-col>
      <el-col :span="12">
          <TestTabs ref="apiFunc">></TestTabs>
      </el-col>
    </el-row>
</template>
<script>
import  InterfaceTable  from "@/components/interfaceTest/interfaceTable";
import  TestTabs  from "@/components/interfaceTest/testTabs";

export default {
    name: 'CGI',
    components: {
            InterfaceTable: InterfaceTable,
            TestTabs: TestTabs
        },
    data(){
        return {
            pathName:'/testInfrastructure/TestedSystemManagementRouter/testedSystemManagement',
            firstPathName: '测试系统',
            isInterface: true
        }
    },
    // activated(){
    //     let testSys = SessionStorage.get("testSysNameStorage")
    //     console.log('进入接口测试', this.$route.query)
    //     if(testSys){
    //         this.$router.push({
    //             name:'Transact',
    //             query: {
    //                 isInterface: true,
    //                 id: JSON.parse(sessionStorage.getItem('toTransact')).id,
    //                 nameMedium: JSON.parse(sessionStorage.getItem('toTransact')).nameMedium,
    //             }
    //         })
    //         return
    //     }
    //     this.$router.push({
    //         name:'TestedSystemManagement',
    //         query:{
    //             dialog: true
    //         }
    //     })
    // }
    mounted(){
            setTimeout(() => {
                this.$refs.apiFunc.initApiMsgData();
            }, 0)
    }
}
</script>
<style lang="less" scoped>

</style>