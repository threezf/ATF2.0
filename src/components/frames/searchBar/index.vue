<template>
    <div class="search-bar">
        <el-form :inline="true" class="search-form-inline" :size="size">
            <slot name="prepend"></slot>
            <template v-for="(item, index) in conf">
                <el-form-item v-if="item.type !== 'divider'" :key="item.key" class="search-form-item" v-show="item.type !== 'hidden'" :required="item.required" :label="item.label">
                    <div :style="{width: item.width ? item.width + 'px' : '', 'margin-right': item.right? item.right + 'px': '0', 'margin-left': item.left? item.left + 'px': '0'}">
                        <template v-if="item.type === 'hidden'">
                            <el-input type="hidden" v-model="item.value" :placeholder="item.placeholder"></el-input>
                        </template>
                        <template v-if="item.type === 'input'">
                            <el-input v-model="item.value" :placeholder="item.placeholder" :clearable="item.clearable" @input="checkIsDisabled(item,true)" @change="checkIsDisabled(item)" @keyup.enter.native="search"></el-input>
                        </template>
                        <template v-if="item.type === 'number'">
                            <el-input v-model="item.value" :placeholder="item.placeholder" @input="checkIsDisabled(item,true)" @change="checkIsDisabled(item)" @keyup.enter.native="search" type="number"></el-input>
                        </template>
                        <template v-else-if="item.type === 'select'">
                            <el-select style="width: 100%" v-model="item.value" :clearable="item.clearable" :multiple="item.multiple" :collapse-tags="item.collapseTags" :placeholder="item.placeholder" :filterable="item.filterable" @change="checkIsDisabled(item)">
                                <el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>
                            </el-select>
                        </template>
                        <template v-else-if="item.type === 'timePicker'">
                            <el-time-picker style="width: 100%" is-range format="HH:mm" v-model="item.value" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                            </el-time-picker>
                        </template>
                        <template v-else-if="item.type === 'daterange'">
                            <el-date-picker style="width: 100%" v-model="item.value" type="daterange" format="yyyy-MM-dd " range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </template>
                        <template v-else-if="item.type === 'datetimerange'">
                            <el-date-picker style="width: 100%" v-model="item.value" type="datetimerange" :format="item.format || 'yyyy-MM-dd HH:mm'" :picker-options="pickerOptions(item.range)" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        </template>
                        <template v-else-if="item.type === 'datetime'">
                            <el-date-picker style="width: 100%" v-model="item.value" type="datetime" :format="item.format != undefined? item.format: 'yyyy-MM-dd HH'" placeholder="选择日期时间"></el-date-picker>
                        </template>
                        <template v-else-if="item.type === 'datePicker'">
                            <el-date-picker style="width: 100%" v-model="item.value" type="date" placeholder="选择日期"></el-date-picker>
                        </template>
                    </div>
                </el-form-item>
                <slot :name="item.key"></slot>
                <div v-if="item.type === 'divider'" :key="index"></div>
            </template>
            <slot name="presearch"></slot>
            <el-form-item>
                <el-button :style="{'margin-top': size === 'mini'? '6px': ''}" :disabled="disabled" :loading="loading" type="primary" :icon="searchBtnIcon" @click="search">{{searchBtnText}}</el-button>
            </el-form-item>
            <slot name="append"></slot>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            conf: {
                type: Array,
                default: function () {
                    return []
                }
            },
            loading: {
                type: Boolean,
                default: false
            },
            searchBtnText: {
                type: String,
                default: '搜索'
            },
            searchBtnIcon: {
                type: String,
                default: 'el-icon-search'
            },
            size: {
                type: String,
                default: 'medium'
            }
        },
        data() {
            return {
                searchData: [],
                submitResult: {},
                disabled: false,
                timeOptionRange: ''
            }
        },
        watch: {
            conf: {
                handler(newVal, oldVal) {
                    this.searchData = newVal
                },
                immediate: true
            },
            searchData: {
                handler(newVal, oldVal) {
                    this.checkIsDisabled()
                    this.getSubmitResult()
                },
                immediate: true
            }
        },
        filters: {
            
        },
        created() {

        },
        mounted() {

        },
        methods: {
            /**搜索 */
            search() {
                if (this.disabled) {
                    return false
                }
                this.getSubmitResult()
                this.$emit('submit', Object.assign({}, this.submitResult))
            },
            /**设置搜索框数据，此数据作为对外输出的唯一数据 */
            getSubmitResult() {
                let submitResult = {}
                for (let i in this.searchData) {
                    if (this.searchData[i].value !== undefined && this.searchData[i].value !== '') {
                        if (this.searchData[i].valueType === 'Number' || this.searchData[i].type === 'number') {
                            submitResult[this.searchData[i].key] = Number(this.searchData[i].value)
                        } else {
                            submitResult[this.searchData[i].key] = this.searchData[i].value
                        }
                    }
                }
                this.submitResult = submitResult
            },
            /**检查是否可以进行搜索，如果有未填写的值，不能进行搜索 , 同时如果需要的话向外传递修改的值*/
            checkIsDisabled(item,flag) {
                let disabledNum = 0
                for (let i in this.searchData) {
                    if (this.searchData[i].required && (this.searchData[i].value === '' || this.searchData[i].value === undefined)) {
                        console.log(this.searchData[i])
                        disabledNum++
                        this.disabled = true
                    }
                }
                if (disabledNum === 0) {
                    this.disabled = false
                }

                if(item && item.trigger === 'searchBar.search') {
                    this.search()
                }
                if(item && item.trigger === 'change' && (!flag)) {
                    this.$emit('attr-change', {
                        name: item.key,
                        value: item.value
                    })
                }

                if(item) {
                    this.$emit('search-change', {
                        name: item.key,
                        value: item.value
                    })
                }
            },
            // 决定选择范围
            pickerOptions(val) {
                if(val === undefined) {
                    return {}    
                }else {
                    return {
                        onPick: time => {
                            if(time.minDate && !time.maxDate) {
                                this.timeOptionRange = time.minDate
                            }
                            if(time.maxDate) {
                                this.timeOptionRange = null
                            }
                        },
                        disabledDate: time =>  {
                            let timeOptionRange = this.timeOptionRange
                            let secondNum = val * 24 * 60 * 60 * 1000
                            if(timeOptionRange) {
                                // if((timeOptionRange.getTime() + secondNum) > (Date.now())) {
                                //     // 超过当前时间则只能向前选择
                                //     return time.getTime() > Date.now() || time.getTime() < timeOptionRange.getTime() - secondNum;
                                // }
                                return time.getTime() > timeOptionRange.getTime() + secondNum || time.getTime() < timeOptionRange.getTime() - secondNum;
                            }
                        }
                    }
                }
            }
        },
    };
</script>
<style lang="less" scoped>
    .search-bar {
        .search-form-item{
            margin-bottom: 10px;
            margin-right: 10px;
        }
    }
</style>