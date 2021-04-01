<template>
    <el-row>
      <el-col  :span="6">
          <SideBar></SideBar>
      </el-col>
      <el-col  :span="6">
          <SideBarCreate></SideBarCreate>
      </el-col>
      <el-col :span="12">
          <TestTabs ref="apiFunc" style="margin-bottom:20px"></TestTabs>
          <InterfacesTable></InterfacesTable>
          <ResultTabs></ResultTabs>
      </el-col>
    </el-row>
</template>
<script>
import  SideBar  from "@/components/interfaceTest/sideBar";
import  SideBarCreate  from "@/components/interfaceTest/sideBarCreate";
import  InterfacesTable  from "@/components/interfaceTest/interfacesTable";
import  TestTabs  from "@/components/interfaceTest/testTabs";
import  ResultTabs  from "@/components/interfaceTest/resultTabs";

export default {
    name: 'CGI',
    components: {
            InterfacesTable: InterfacesTable,
            TestTabs: TestTabs,
            SideBar: SideBar,
            SideBarCreate: SideBarCreate,
            ResultTabs: ResultTabs
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