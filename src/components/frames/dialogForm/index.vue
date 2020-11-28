<template>
    <div class="dialog-form">
        <el-form class="dialog-form-dialog" :model="modelForm" ref="modelForm">
            <template v-for="(item, index) in conf">
                <el-form-item class="dialog-form-item" v-if="item.type !== 'divider'" v-show="item.type != 'hidden'" :required="item.required" :key="item.key" :label="item.label" label-width="100px" :prop="item.prop" :rules="item.rules">
                    <div :style="{width: item.width? item.width + 'px': ''}">
                        <template v-if="item.type === 'hidden'">
                            <el-input type="hidden" v-model="item.value" :placeholder="item.placeholder"></el-input>
                        </template>
                        <template v-if="item.type === 'input'"> 
                            <el-input style="width: 70%" v-model="item.value" :disabled="item.disabled" :placeholder="item.placeholder" :clearable="item.clearable" :show-password="item.showPassword" @keyup.enter.native="onSubmit" @input="checkIsDisabled(item,true)" @change="checkIsDisabled(item)">
                            </el-input>
                            <el-button v-if="item.showButton" style="margin-left: 10px;" icon="el-icon-edit" type="primary" size="small" title="编辑" @click="doEdit" circle></el-button>
                        </template>
                        <template v-if="item.type === 'number'">
                            <el-input type="number" v-model="item.value" :placeholder="item.placeholder" @keyup.enter.native="onSubmit" @input="checkIsDisabled(item,true)" @change="checkIsDisabled(item)">
                                <!-- 里面可以插入前置或者后置图标 -->
                            </el-input>
                        </template>
                        <template v-if="item.type === 'select'">
                            <el-select style="width: 70%" v-model="item.value" :placeholder="item.placeholder" :multiple="item.multiple" :disabled="item.disabled" :filterable="item.filterable" :collapse-tags="item.collapseTags" @change="checkIsDisabled(item)">
                                <el-option v-for="(optItem) in item.options" :key="optItem.value" :label="optItem.label" :value="item.plainText? optItem.label: optItem.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="item.type === 'radio'">
                            <el-radio-group style="width: 70%" v-model="item.value" v-if="item.button" @change="checkIsDisabled(item)">
                                <el-radio-button v-for="(radioItem) in item.options" :key="item.key + radioItem.label" :label="radioItem.label" :border="item.border" :disabled="item.disabled">
                                    {{radioItem.value}}
                                </el-radio-button>
                            </el-radio-group>
                            <el-radio-group style="width: 70%" v-model="item.value" v-else @change="checkIsDisabled(item)">
                                <el-radio v-for="(radioItem) in item.options" :key="item.key + radioItem.label" :label="radioItem.label" :border="item.border" :disabled="item.disabled">
                                    {{radioItem.value}}
                                </el-radio>
                            </el-radio-group>
                        </template>
                        <template v-if="item.type === 'checkbox'">
                            <el-checkbox-group  v-model="item.value" v-if="item.button" @change="checkIsDisabled(item)"> 
                                <el-checkbox-button v-for="(checkboxItem) in item.options" :key="checkboxItem.label" :label="checkboxItem.value" :border="item.border" :disabled="item.disabled">
                                    {{checkboxItem.label}}
                                </el-checkbox-button>
                            </el-checkbox-group>
                            <el-checkbox-group style="width: 70%" v-model="item.value" v-else @change="checkIsDisabled(item)">
                                <el-checkbox v-for="(checkboxItem) in item.options" :key="checkboxItem.label" :label="checkboxItem.value" :border="item.border" :disabled="item.disabled">
                                    {{checkboxItem.label}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </template>
                        <template v-if="item.type === 'cascader'">
                            <el-cascader style="width: 70%" v-model="item.value" :placeholder="item.placeholder" :disabled="item.disabled" :options="item.options" :props="item.props" :clearable="item.clearable" :collapse-tags="item.collapseTags" :ref="item.ref" @change="checkIsDisabled(item)"></el-cascader>
                        </template>
                        <template v-if="item.type === 'datePicker'">
                            <el-date-picker style="width: 70%" v-model="item.value" :type="item.dateType" :placeholder="item.placerholder" :picker-options="item.pickerOptions">
                            </el-date-picker>
                        </template>
                        <template v-if="item.typr === 'daterange'">
                            <el-date-picker style="width: 70%"  v-model="item.value" :type="daterangeType" align="right" unlink-panels range-separator="至" :start-placeholder="item.startPlaceholder" :end-placeholder="item.endPlaceholder" :picker-options="item.pickerOptions" @change="checkIsDisabled(item)"></el-date-picker>
                        </template>
                        <template v-if="item.type === 'timePicker'">
                             <el-time-picker style="width: 70%" is-range format="HH:mm" v-model="item.value" range-separator="至" :start-placeholder="item.startPlaceholder" :end-placeholder="item.endPlaceholder" :placeholder="item.placeholder" @change="checkIsDisabled(item)">
                            </el-time-picker>
                        </template>
                        <template v-if="item.type === 'datetimerange'">
                            <el-date-picker style="width: 70%" v-model="item.value" type="datetimerange" :format="item.format || 'yyyy-MM-dd HH:mm'" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="checkIsDisabled(item)"></el-date-picker>
                        </template>
                        <template v-if="item.type === 'datetime'">
                            <el-date-picker style="width: 70%" v-model="item.value" type="datetime" :placeholder="item.placeholder"  :value-format="item.valueFormat" @change="checkIsDisabled(item)"></el-date-picker>
                        </template>
                        <template v-if="item.type === 'rate'">
                            <el-rate v-model="item.value" :colors="colors"></el-rate>
                        </template>
                        <template v-else-if="item.type === 'exp'">
                            <exp-input v-model="item.value" :placeholder="item.placeholder" @change="checkIsDisabled(item)"></exp-input>
                        </template>
                        <tips v-if="item.tips">{{item.tips}}</tips>
                    </div>
                </el-form-item>
                <slot :name="item.key"></slot>
                <div v-if="item.type !== 'divider'" :key="index"></div>
            </template>
            <el-form-item class="operation-button">
                <slot name="cancel"></slot>
                <el-button type="primary" :loading="loading" :disabled="disabled" @click="onSubmit">{{formBtnText}}</el-button>
                <slot name="append"></slot>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import Tips from '@/components/common/tips'
import ExpInput from '@/components/common/expInput'
export default {
    name: 'WvForm',
    mixins: [VueMixins],
    components: {
        Tips,
        ExpInput
    },
    props: {
        conf: {
            type: Array,
            default: function() {
                return []
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        formBtnText: {
            type: String,
            default: '提交'
        }
    },
    data() {
        return {
            submitData: [],
            disabled: false,
            submitResult: {},
            modelForm: {}
        }
    },
    computed: {
    },
    watch: {
        conf: {
            handler(newVal, oldVal) {
                this.submitData = newVal
            },
            immediate: true // 使数据立马更新
        },
        submitData: {
            handler(newVal, oldVal) {
                this.checkIsDisabled()
                this.getSubmitResult()
            },
            immediate: true
        }
    },
    methods: {
        checkIsDisabled(item, flag) {
            let disabledNum = 0
            for(let i in this.submitData) {
                if(this.submitData[i].required && (this.submitData[i].value === '' || this.submitData[i].value === undefined || (Array.isArray(this.submitData[i].value) && this.submitData[i].value.length === 0))) {
                    disabledNum ++
                    this.disabled = true
                }
            }
            console.log('checked', disabledNum)
            if(disabledNum === 0) {
                this.disabled = false
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
        doEdit() {
            // 这里处理事件
            console.log('doEdit')
            this.$emit('doEdit')
        },
        // 提交事件
        onSubmit() {
            if(this.disabled) {
                return false
            }
            this.getSubmitResult() 
            this.$emit('submit', Object.assign({}, this.submitResult))
        },
        getSubmitResult() {
            let submitReault = {}
            for(let i in this.submitData) {
                if(this.submitData[i].value !== undefined && this.submitData[i].value !== "") {
                    if(String(this.submitData[i].type).toLowerCase() === 'number') {
                        submitReault[this.submitData[i].key] = Number(this.submitData[i].value)
                    }else {
                        submitReault[this.submitData[i].key] = this.submitData[i].value
                    }
                }
            }
            this.submitResult = submitReault
        },
    },
    created() {},
    mounted() {}
}
</script>

<style lang="less" scoped>
    .dialog-form {
        .dialog-form-item {
            margin-bottom: 20px;
        }
        .operation-button {
            display: flex;
            justify-content: flex-end;
            margin-bottom: -10px;
        }
    }
</style>