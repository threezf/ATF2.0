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
            lang="json"
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
            jsonVariable: '{}'
        }
    },
    methods: {
        editorInit() {
            require('brace/ext/language_tools');
            require('brace/mode/json');
            require('brace/theme/chrome');
            require('brace/snippets/json')
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