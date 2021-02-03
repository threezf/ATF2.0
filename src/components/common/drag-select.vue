/**
测试页面，作为二级路由主页面
 */
<template>
    <div class="page-outer" @click.self="isShow=false">
        <div class="el-select" @click="clickSelect">
            <div class="el-input el-input--suffix is-focus">
                <input type="text" readonly="readonly" autocomplete="off" placeholder="请选择" class="el-input__inner" v-model="selectedListKey">
                <span class="el-input__suffix">
                    <span class="el-input__suffix-inner">
                        <i class="el-select__caret el-input__icon el-icon-arrow-up is-reverse"></i>
                    </span>
                </span>
            </div>
        </div>
        <div v-show="isShow" class="el-select-dropdown el-popper" style="min-width: 220px; transform-origin: center top; z-index: 2007; position: absolute; top: 40px; left: 0px;" x-placement="bottom-start">
            <div class="el-scrollbar" style="">
                <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -15px; margin-right: -15px;">
                    <vue-drag-select v-model="selectedList" value-key="name" :item-margin="[0, 10, 10, 0]" ref="dragSelect" class="el-scrollbar__view el-select-dropdown__list content-wrap"><!---->
                        <template v-for="(item, index) in dataList" >
                            <drag-select-option :key="index" :value="item" :item-index="index" class="el-select-dropdown__item item" :class="{'is-select': makeStyle(item)}"> 
                                <div class="item-self">
                                    <span>{{item.casecode+' | '+ item.autName + ' | ' + item.transName + ' | ' + item.scriptTemplateName}}</span>
                                </div>
                            </drag-select-option>
                        </template>
                    </vue-drag-select>
                </div>

                <div class="el-scrollbar__bar is-horizontal">
                    <div class="el-scrollbar__thumb" style="transform: translateX(0%);">
                    </div>
                </div>

                <div class="el-scrollbar__bar is-vertical">
                    <div class="el-scrollbar__thumb" style="transform: translateY(0%);">
                    </div>
                </div>
            </div><!---->
            <div x-arrow="" class="popper__arrow" style="left: 35px;">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            originData: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                selectedList: [],
                isShow: false,
                dataList: []
            }
        },
        watch: {
            originData: {
                handler(newVal) {
                    this.dataList = newVal
                },
                immediate: true
            },
            selectedIds: {
                handler(newVal) {
                    console.log(newVal)
                    this.$emit('change', newVal)
                },
                immediate: true
            }
        },
        methods: {
            clickSelect() {
                console.log('select')
                this.isShow = !this.isShow
            },
            makeStyle(item) {
                console.log('make', item)
                return this.selectedList.findIndex(select => select.id == item.id) > -1
            },
            clearSelected() {
                this.selectedList = []
            }
        },
        computed: {
            selectedListKey() {
                if(this.selectedList.length === 0) {
                    return []
                }
                return this.selectedList.map(item => {
                    return item.casecode+' | '+ item.autName + ' | ' + item.transName + ' | ' + item.scriptTemplateName
                })
            },
            selectedIds() {
                if(this.selectedList.length === 0) {
                    return []
                }
                return this.selectedList.map(item => {
                    return item.id
                })
            }
        },
        mounted() {
            let inner = document.querySelector('.select-wrapper')
            inner.style.minHeight = ""
            inner.style.cssText = ""
            console.log(inner.style)
        },
    }
</script>

<style lang="less" scoped>
    .page-outer {
        padding: 0px;
        position: relative;
    }
    .el-select {
        width: 240px;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
        background-color: #f5f7fa;
    }
    .el-select-dropdown__item {
        font-size: 14px;
        padding: 0 20px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .el-scrollbar__wrap {
        overflow: scroll;
        height: 100%;
    }
    .item {
        width: 80% !important; 
        height: 30px !important; 
        margin: 0px 5px 10px -10px !important; 
        top: 0px !important; 
        left: 0px !important;
    }
    .is-select {
        background-color: #eee;
    }
</style>