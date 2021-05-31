<template>
    <div class="list">
        <div 
            v-for="(item, index) in list" 
            :key="index"
            :class="{ active: item.id === activeId, content: true,}" 
            @click="handleClick(item)">
            <div class="flex">
                <span>{{item.label}}</span>
                <div style="flex: 1"></div>
                <el-button type="text" size="mini" @click="deleteInterfaceAssert(item.label)">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Request from "@/libs/request.js";
export default {
    name: 'RuleList',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        caseId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            activeId: 0,
            ruleName: ''
        }
    },
    watch: {
        list: {
            handler(newVal) {
                if(newVal && newVal.length > 0) {
                    this.ruleName = newVal[0].label
                    this.$emit('choose', newVal[0].label)
                }
            }
        }
    },
    methods: {
        handleClick(item) {
            this.activeId = item.id
            this.ruleName = item.label
            this.$emit('choose', item.label)
        },
        deleteInterfaceAssert(label) {
            Request({
                url: '/interfaceNewController/deleteInterfaceAssert',
                method: 'post',
                params: {
                    caseId: this.caseId,
                    caseType: '1',
                    ruleName: label
                }
            }).then(res => {
                console.log('管理断言', res)
                if(res.respCode === '0000') {
                    this.$message.success('删除成功')
                    this.$emit('delete', label)
                }
            })
        }
    }
}
</script>

<style scoped>
    .active {
        background: #eee;
    }
    .content {
        padding: 5px 10px;
        border-radius: 3px;
    }
    .flex {
        display: flex;
    }

</style>