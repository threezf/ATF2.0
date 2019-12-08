<template>
  <div class="page-outer">
    <div class="page-inner">
        <div class='ele-container'>
            <el-row>
                <el-button
                    icon="el-icon-plus"
                    size="small" 
                    type="primary">
                    添加脚本
                </el-button>
                <el-button
                    icon="el-icon-delete"
                    size="small" 
                    type="primary">
                    删除脚本
                </el-button>
            </el-row>
             <el-table
                border
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                type="index"
                width="50">
                </el-table-column>
                <el-table-column
                property="name"
                label="脚本名称">
                </el-table-column>
                <el-table-column
                property="name"
                label="描述">
                </el-table-column>
            </el-table>
            <div class = "templatInfo">
                <el-row>
                    <span>
                        脚本数据
                    </span>
                </el-row>
                <hr>
                <div>
                    <el-row>
                        <el-button
                            size="small" 
                            type="primary"
                            icon="el-icon-plus">
                            添加多项
                        </el-button>
                        <el-button
                            icon="el-icon-delete"
                            size="small" 
                            type="primary">
                            删除删除
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-up"
                            size="small" 
                            type="primary">
                            上移
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-down"
                            size="small" 
                            type="primary">
                            下移
                        </el-button>
                        <el-button
                            icon="el-icon-document"
                            size="small" 
                            type="primary">
                            保存
                        </el-button>
                        <el-button
                            icon="el-icon-printer"
                            size="small" 
                            type="primary">
                            参数化
                        </el-button>
                    </el-row>
                    <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            label="操作"
                            width="55">
                            <template slot-scope="scope">
                                <i :id ='scope.row.date' class="el-icon-sort"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="选择"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                        label="元素名"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="控件类型"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="方法"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
export default {
    components: {},
    mixins: [VueMixins],
    data() {
        return {
            tableData: [
                {
                    name: '用户登录',
                    address: '用户登录'
                }, {
                    name: '测试脚本',
                    address: '测试脚本见描述'
                }
                ],
                 tableData3: [{
                    date: '2016-05-03',
                    name: '搜索输入框',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-02',
                    name: '搜索按钮',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
            currentRow: null
        }
    },
    watch: {},
    computed: {},
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
          console.log(val)
        this.currentRow = val;
      }
    },
    created() {},
    mounted() {
        this.setCurrent(this.tableData[0])
    }
};
</script>
<style lang="less" scoped>
.templatInfo{
    margin:10px 0px;
    border-radius: 5px;
}
</style>