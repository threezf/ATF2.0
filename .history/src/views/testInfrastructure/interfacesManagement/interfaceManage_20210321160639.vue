<template>
    <div class="project">
        <el-col :span="6">
            <SideBarCreate></SideBarCreate>
        </el-col>
        <el-col :span="18">
            <InterfacesTable></InterfacesTable>
        </el-col>
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
<style lang="scss" scoped>
.project {
        height: 100%;
    }
</style>