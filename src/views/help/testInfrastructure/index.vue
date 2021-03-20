<template>
    <div class="project">
        <mavon-editor class="markdown"
          :value='msg'
          :subfield = "false"    
          :defaultOpen = "prop.defaultOpen"
          :toolbarsFlag = "prop.toolbarsFlag"
          :editable="prop.editable"
          :scrollStyle="prop.scrollStyle"
      ></mavon-editor>
    </div>
</template>

<script>
export default {
    name: 'TestInfrastructure',
    props: {
        url: {
            type: String,
            default: ''
        }
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
                this.$axios.get('/static/docs/infrastructure.md').then((response) => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .project {
        padding: 15px;
        height: 100%;
        overflow-y: scroll;
    }
</style>
