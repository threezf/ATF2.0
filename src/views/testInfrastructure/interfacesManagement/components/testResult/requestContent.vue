<template>
    <div class="request-content">
        <div class="row">
            <label class="label">内容类型</label>
            <el-select v-model="typeSelect" size="mini">
                <el-option 
                    v-for="(type, index) in typeOptions"
                    :key="index"
                    :value="type.value"
                    :label="type.label">
                </el-option>
            </el-select>
            <el-button type="text" size="mini" icon="el-icon-document-copy">
                复制
            </el-button>
            <el-button type="text" size="mini" icon="el-icon-download">
                下载
            </el-button>
        </div>
         <editor
            style="font-size: 15px"
            v-model="jsonVariable"
            @init="editorInit"
            :lang="typeSelect"
            theme="chrome"
            width="100%"
            height="200px"
            :options="{}"
        >
        </editor>
    </div>
</template>

<script>
export default {
    name: 'RequestContent',
    components: {
        editor: require('vue2-ace-editor'),
    },
    props: {
        params: {
            type: [Object, String, Array],
        }
    },
    data() {
        return {
            typeSelect: 'json',
            typeOptions: [{
                label: 'JSON',
                value: 'json'
            }, {
                label: 'XML',
                value: 'xml'
            }, {
                label: 'HTML',
                value: 'html'
            }, {
                label: 'TEXT',
                value: 'text'
            }],
            jsonVariable: JSON.stringify({name: 'demo'}),
        }
    },
    watch: {
        params: {
            handler(newVal) {
                console.log(newVal)
                this.jsonVariable = typeof newVal === 'string'? JSON.stringify(JSON.parse(newVal), null, 4): JSON.stringify(newVal, null, 4)
            },
            immediate: true
        },
    },
    methods: {
        editorInit() {
            require('brace/theme/chrome')
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')
            require('brace/mode/json')
            require('brace/mode/xml')
            require('brace/snippets/json')
            require('brace/snippets/html')
            require('brace/snippets/xml')
        },
    }
}
</script>

<style lang="less" scoped>
    .request-content {
        .row {
            margin: 3px 0px;
            height: 40px;
            border: 1px solid #eee;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: gray;
            padding: 0 10px;
            margin-bottom: 10px;
            .label {
                margin-right: 10px;
                margin-top: 8px;
            }
        }
    }
</style>