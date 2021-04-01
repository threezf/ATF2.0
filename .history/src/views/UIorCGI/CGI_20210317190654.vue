<template>
    <el-row>
      <el-col :span="12">
          <sideBar :pathName="pathName"
          :firstPathName="firstPathName" :isisInterface="isisInterface"></sideBar>
      </el-col>
      <el-col :span="12">
          <TestTabs ref="apiFunc">></TestTabs>
      </el-col>
    </el-row>
</template>
<script>
import  sideBar  from "@/components/side-bar.vue";
import  TestTabs  from "@/components/interfaceTest/testTabs";

export default {
    name: 'CGI',
    components: {
            sideBar: sideBar,
            TestTabs: TestTabs
        },
    data(){
        return {
            pathName:'/testInfrastructure/TestedSystemManagementRouter/testedSystemManagement',
            firstPathName: '测试系统',
            isisInterface: true
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