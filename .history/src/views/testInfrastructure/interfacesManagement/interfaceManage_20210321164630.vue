<template>
    <div class="project">
            <SideBarCreate></SideBarCreate>
            <div class="main-page">
                <el-row>
                  <el-col :span="18">
                      <el-button class="newInterface-button"  @click="newInterface" type="primary" size="small">
                        <i class="el-icon-plus"></i>新建接口
                    </el-button>
                  </el-col>
                </el-row>
            </div>
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