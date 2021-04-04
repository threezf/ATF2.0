<template>
    <div class="project">
        <el-card>
            <div class="component">
                <Anchor :originData="originData" class="anchor"></Anchor>
            </div>
        </el-card>
    </div>
</template>

<script>
import Anchor from '@/components/help/anchor.vue'
import AutomatedComponentMaintenance from './automatedComponentMaintenance.vue'
import TemplateLib from './templateLib.vue'
import BaseScript from './baseScript.vue'
import RunnerManage from './automatedComponentMaintenance.vue'
import CodeManage from './codeManage.vue'
export default {
    name: 'TestInfrastructure',
    components: {
        Anchor,
        AutomatedComponentMaintenance,
        TemplateLib,
        CodeManage,
        BaseScript,
        RunnerManage
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
               name: '自动化构件维护', 
               style: {}, 
               component: AutomatedComponentMaintenance
            }, {
                name: '元素库', 
                style: {}, 
                component: TemplateLib
            }, {
                name: '执行代码管理', 
                style: {}, 
                component: CodeManage
            }, {
                name: '基础脚本', 
                style: {}, 
                component: BaseScript
            }, {
                name: '自动化构件维护', 
                style: {}, 
                component: RunnerManage
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
                this.$axios.get('/static/docs/infrastructure.md').then((response) => {
                    // console.log(response.data)
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
    .component {
        h2 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
            padding-bottom: .3em;
            font-size: 1.5em;
            border-bottom: 1px solid #eaecef;
        }
        h3 {
            font-size: 1.25em;
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
        }
        p {
            text-indent: 2em;
            margin-bottom: 0rem;
        }
        figure {
            text-align: center;
            width: 100%;
            figcaption {
                margin-bottom: 10px;
            }
        }
        dt, dd {
            text-indent: 2em;
            p {
                text-indent: 4em;
            }
        }
        pre {
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #f6f8fa;
            border-radius: 3px;
        }
        code {
            padding: 0;
            padding-top: .2em;
            padding-bottom: .2em;
            margin: 0;
            font-size: 85%;
            background-color: rgba(27,31,35,.05);
            border-radius: 3px;
        }
    }
</style>
