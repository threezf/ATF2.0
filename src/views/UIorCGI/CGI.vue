<template>
    
</template>
<script>
  import { SessionStorage } from "wii-fe-utils";

export default {
    name: 'CGI',
    mounted(){
        let testSys = SessionStorage.get("testSysNameStorage")
        if(testSys){
            this.$router.push({
                name:'Transact',
                query: {
                    isInterface: true,
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
    }
}
</script>