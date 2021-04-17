<template>
    <div class="result">
        <el-tabs class="tabs" v-model="currentTab" type="border-card">
            <el-tab-pane class="tab-panel" v-for="(tab, index) in tabs" :key="tab.name + index" :label="tab.label" :name="tab.name">
                <div v-if="currentTab === 'result'" class="tab-result">
                    <div class="result-body">
                        <p>点击发送按钮获取测试报告</p>
                        <p><el-button type="primary" size="small">发送</el-button></p>
                    </div>
                </div>
                <div v-else class="tab-history">
                    <el-button type="danger" size="small">清空历史记录</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'TestResult',
    data() {
        return {
            tabs: [{
                label: '返回结果',
                name: 'result'
            }, {
                label: '测试历史',
                name: 'history'
            }],
            currentTab: 'result'
        }
    },

}
</script>

<style lang="less" scoped>
    .result {
        margin-top: 10px;
        .tabs {
            .tab-result {
                min-height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
                .result-body {
                    p {
                        text-align: center;
                        color: gray;
                        font-size: 13px;
                    }
                }
            }
            .tab-history {
                min-height: 200px;
            }
        }
    }
</style>