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