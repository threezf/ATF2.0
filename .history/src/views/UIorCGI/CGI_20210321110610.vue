<template>
</template>
<script>

export default {
    name: 'CGI',
    activated(){
        let testSys = SessionStorage.get("testSysNameStorage")
        console.log('进入接口测试', this.$route.query)
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