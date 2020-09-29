<template>
</template>
<script>
//   import { SessionStorage } from "wii-fe-utils";

export default {
    name: 'UI',
    activated(){
        let testSys = sessionStorage.getItem("testSysNameStorage")
        console.log('进入UI测试', this.$route.query)
        this.msg = sessionStorage.getItem('testSysNameStorage')
        console.log('测试', testSys, '进行了ui')
        if(this.msg){
            this.$router.push({
                name:'Transact',
                query: {
                    isInterface: false,
                    id: JSON.parse(sessionStorage.getItem('toTransact')).id,
                    nameMedium: JSON.parse(sessionStorage.getItem('toTransact')).nameMedium,
                }
            })
            return
        }
        this.$router.push({
            name:'TestedSystemManagement',
            query:{
                dialog: true
            }
        })
        
    },
}
</script>