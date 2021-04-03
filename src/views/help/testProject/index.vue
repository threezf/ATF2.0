<template>
    <div class="project">
        <el-card>
            <div class="component">
                <!-- <ManageProject></ManageProject>
                <ManageCase></ManageCase>
                <ManageSource></ManageSource>
                <TestPlan></TestPlan> -->
                <Anchor :originData="originData" class="anchor"></Anchor>
            </div>
        </el-card>
    </div>
</template>

<script>
import Anchor from '@/components/help/anchor.vue'
import ManageProject from './manageProject.vue'
import ManageCase from './manageCase.vue'
import ManageSource from './manageSource.vue'
import TestPlan from './testPlan.vue'
export default {
    name: 'TestProject',
    components: {
        ManageProject,
        ManageCase,
        ManageSource,
        TestPlan,
        Anchor
    },
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
           msg: '',
           originData: [{
               name: '测试项目的建立与管理', 
               style: {}, 
               component: ManageProject
            }, {
                name: '测试用例管理', 
                style: {}, 
                component: ManageCase
            }, {
                name: '测试资源管理', 
                style: {}, 
                component: ManageSource
            }, {
                name: '测试计划与执行', 
                style: {}, 
                component: TestPlan
            }]
           
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
                this.$axios.get('/static/docs/project.md').then((response) => {
                    console.log(response.data)
                    this.msg = response.data
                })
        }
    },
    mounted() {
        // this.readFile()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .project {
        padding: 15px;
        height: 100%;
        overflow-y: scroll;
    }
    .main-title {
        padding-bottom: .3em;
        font-size: 2em;
        border-bottom: 1px solid #eaecef;
    }
    .anchor {
        height: calc(100% - 89px);
    }
    .component {
    }
</style>


