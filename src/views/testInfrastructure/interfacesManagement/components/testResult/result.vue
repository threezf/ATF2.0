<template>
    <div class="result">
        <div class="tab-result" v-if="!tested">
            <div class="result-body">
                <p>点击发送按钮获取测试报告</p>
                <p><el-button type="primary" size="small" @click="sendTest">发送</el-button></p>
            </div>
        </div>
        <div v-else>
            <div class="base-info">
                <span class="status">{{status}}</span>
                <div></div>
                <span class="size">Size：{{size}}B</span>
                <span class="time">Time：{{time}}</span>
            </div>
            <RequestContent></RequestContent>
        </div>
    </div>
</template>

<script>
import RequestContent from './requestContent'
export default {
    name: 'Result',
    components: {
        RequestContent
    },
    props: {
        tested: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            size: 0,
            time: '0.00ms',
            status: 500
        }
    },
    methods: {
        sendTest() {
            this.$emit('test', true)
        }
    }
}
</script>

<style lang="less" scoped>
    .result {
        min-height: 200px;
        .tab-result {
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
        .base-info {
            margin-top: -15px;
            padding: 5px 15px;
            border-radius: 3px;
            color: white;
            background: #d7453d;
            display: flex;
            align-items: center;
            div {
                flex: 1;
            }
        }
    }
</style>