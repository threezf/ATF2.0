<template>
    <el-row>
      <el-col :span="12">
          <SideBar></SideBar>
      </el-col>
      <el-col :span="12">
          <TestTabs ref="apiFunc">></TestTabs>
      </el-col>
    </el-row>
</template>
<script>
import  SideBar  from "@/components/interfaceTest/sidebarCreate";
import  TestTabs  from "@/components/interfaceTest/testTabs";

export default {
    name: 'CGI',
    components: {
            SideBar: SideBar,
            TestTabs: TestTabs
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