<template>
    <div class="project">
            <SideBarCreate></SideBarCreate>
            <InterfacesTable></InterfacesTable>
    </div>
</template>
<script>
import SideBarCreate from '@/components/interfaceTest/sidebarCreate'
import InterfacesTable from '@/components/interfaceTest/interfacesTable'

export default {
    name: '接口管理',
    components: {
        SideBarCreate: SideBarCreate,
        InterfacesTable: InterfacesTable
    },
    data () {
        return {
           msg: ''
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    mounted() {
        
    }
  }
</script>
<style lang="less" scoped>
.project {
        height: 100%;
        display: flex;
    }
</style>