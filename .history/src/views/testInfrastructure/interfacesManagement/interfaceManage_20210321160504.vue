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
    name: 'TestInfrastructure',
    components: {
        SideBarCreate: SideBarCreate,
    },
    data () {
        return {
           msg: ''
        }
    },
    computed: {
        prop () {
            let data = {
                subfield: false,// 单双栏模式
                defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
                editable: false,
                toolbarsFlag: false,
                scrollStyle: true
            }
            return data
        }
    },
    methods: {
        readFile() {
                this.$axios.get('/static/docs/user.md').then((response) => {
                    console.log(response.data)
                    this.msg = response.data
                })
        }
    },
    mounted() {
        this.readFile()
    }
  }
</script>
<style lang="scss" scoped>
.project {
        height: 100%;
    }
</style>