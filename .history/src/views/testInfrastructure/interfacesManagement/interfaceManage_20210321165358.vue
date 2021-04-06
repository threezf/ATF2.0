<template>
    <div class="project">
            <SideBarCreate></SideBarCreate>
            <div class="main-page">
                <el-row>
                  <el-col :span="18">
                      <el-button  @click="newInterface" type="primary" size="small">
                        <i class="el-icon-plus"></i>新建接口
                    </el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-dropdown>
                        <el-button type="primary" size="small">
                            测试环境<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>演示环境</el-dropdown-item>
                            <el-dropdown-item>无</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
                <InterfacesTable></InterfacesTable>
            </div>
            
    </div>
</template>
<script>
import SideBarCreate from '@/components/interfaceTest/sidebarCreate'
import InterfacesTable from '@/components/interfaceTest/interfacesTable'

export default {
    name: 'InterfacesManagement',
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
        newInterface(){
                this.$message('创建接口');
            }
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
.main-page {
    flex: 1
}
</style>