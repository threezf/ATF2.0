<template>
    <div class="project">
            <SideBarCreate></SideBarCreate>
            <div class="main-page">
                <el-row>
                  <el-col :span="18">
                      <el-button class="new-interface"  type="primary" size="small">
                        <i class="el-icon-plus"></i>新建接口
                    </el-button>
                  </el-col>
                  <el-col :span="6">
                      <span class="enviroment-span">项目环境</span>
                    <el-select v-model="value" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
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
            options: [{
                value: '选项1',
                label: '管理测试环境'
                }, {
                value: '选项2',
                label: '无'
                }, {
                value: '选项3',
                label: '演示环境'
                }],
                value: ''
        }
    },
    computed: {
        
    },
    methods: {
        // newInterface(){
        //         this.$message('创建接口');
        //     }
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
.new-interface{
    margin: 0 0 0 20px;
}
.enviroment-span{
    margin-right: 20px;
    font-size: 15px;
}
</style>