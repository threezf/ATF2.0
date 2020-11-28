
<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    import MiniProgrameCode from '@/components/common/miniProgrameCode'
    import DownloadData from './downData'
    import SingleTableColumn from './singleTableColumn'

    export default {
        components: {
            MiniProgrameCode ,
            SingleTableColumn,
            DownloadData
        },
        name: 'TableComp', 
        render:function(createElement ){
            let _this = this
            //作用域插槽的动态生成 <slot :name='thead['slot']' :keys='values'></slot>
            let getSlot = function(thead,scope){
                if(!thead['type']) 
                    return []
                if(thead['type']==='slot'){
                    return [
                        _this.$scopedSlots[thead['slot']]({
                            row: scope.row,
                            index: scope.$index
                        })
                    ]
                }
                if(thead['type']==='operationSlot' || thead['type']==='self'){
                    return [
                        _this.$scopedSlots[thead['type']]({
                            row: scope.row,
                            index: scope.$index
                        })
                    ]
                }
                return []
            }
            //单独一列的生成 <el-table-column :porps='values' :keys='values'>{{getSlot(params)}</el-table-column>
            let getsingleColumn = function(thead,index){
                return createElement(
                    'el-table-column',{
                        key: index,
                        props:{
                            label: thead.label,
                            type: thead.tableType,
                            width: thead.width,
                            fixed: thead.position,
                            sortable: thead.sortable,
                            prop: thead.prop,
                            headerAlign:"center",
                            align:"center"
                        },
                        scopedSlots: {
                            default: function(scope) {
                                return createElement('div', [
                                    createElement('single-table-column',{
                                        props:{
                                            rowdata:scope,
                                            thead:thead
                                        }
                                    },getSlot(thead,scope))
                                ])
                            }
                        }
                    }
                )
            }
            //一列的生成 如果有children则再次调用该函数，生成多级表头
            let getColumn = function(thead,index){
                if( thead.children && thead.children.length > 0 ){
                    return createElement(
                        'el-table-column',{
                            key: 'child'+index+'-Parent',
                            props:{
                                label: thead.label,
                                headerAlign:"center",
                                align:"center"
                            },
                        },
                        thead.children.map((cthead,cindex)=>{
                            if(cthead.children && thead.children.length > 0){
                                return getColumn(cthead , index + '-P' + '-child' + cindex)
                            }
                            return getsingleColumn(cthead , 'child' + index + '-P' + '-child' + cindex)
                        })
                    )
                }
                return getsingleColumn(thead,'child' + index)
            }
            return createElement(
                'div' , {
                    class: 'table-comp',
                },
                [
                    createElement(
                        'div', {
                            class: 'button-row',
                            style: {display: this.tableData.data.length > 0 && !this.loading? 'flex': 'none'}
                        },
                        [
                            this.needMiniCode&&createElement(
                                'mini-programe-code' , {
                                    class: 'table-comp',
                                    props:{
                                        'table-data': this.autoPagination ? this.autoTableData.data : this.tableData.data
                                    }
                                }
                            ),
                            this.needDownloadData && createElement(
                                'download-data', {
                                    class: 'table-comp',
                                    props: {
                                        'content': this.downloadStr,
                                        'fileName': this.fileName
                                    }
                                }
                            ),
                        ]
                    ),
                    createElement(
                        'el-table' , {
                            class: 'table',
                            ref: 'table',
                            props:{
                                'highlight-current-row': this.singleChoose,
                                spanMethod: this.spanMethod,
                                border: true,
                                data: this.autoPagination ? this.autoTableData.data : this.tableData.data,
                                'row-key': row=> {
                                    if(row.action_time) return row.id + row.action_time
                                    return row.id
                                },
                                'expand-row-keys': [...this.expandRowKeys],
                            },
                            directives: [
                                {
                                name: 'loading',
                                value: this.loading,
                                }
                            ],
                            on: {
                                'sort-change': this.sortChange,
                                'current-change': this.chooseSingle
                            },
                        },
                        this.tableHeader.map((item,index) => {return getColumn(item,index)})
                    ),
                    (this.needPagination || this.autoPagination)&&createElement(
                    'el-pagination' , {
                        class: 'pagination',
                        props:{
                            'current-page': this.pageId,
                            'page-size': this.pageSize,
                            'page-sizes': this.pageSizes,
                            disabled: this.loading,
                            total: this.pageTotal,
                            background: true,
                            layout: "prev, sizes, total, pager, next"
                        },
                        on: {
                            'size-change': this.handleSizeChange,
                            'current-change': this.pageChange
                        },
                    }),
                ]
            )
        },
        mixins: [VueMixins],
        props: {
            tableHeader: {
                type: Array,
                default: function () {
                    return []
                }
            },
            tableData: {
                type: Object,
                default: function () {
                    return {
                        data: [],
                        pageTotal: 0
                    }
                }
            },
            loading: {
                type: Boolean,
                default: false
            },
            pagesize: {
                type: Number,
                default: 20
            },
            needPagination: {
                type: Boolean,
                default: true
            },
            needMiniCode: {
                type: Boolean,
                default: false
            },
            needDownloadData: {
                type: Boolean,
                defult: false
            },
            spanMethod: {
                type: Function
            },
            // 一次输入多条数据，自行分页
            autoPagination: {
                type: Boolean,
                default: false
            },
            expandRowKeys:{
                type: Array,
                default: function () {
                    return []
                }
            },
            singleChoose: {
                type: Boolean,
                default: false
            },
            downloadRows: {
                type: Array,
                default: function() {
                    return []
                }
            },
            needAllData: {
                type: Boolean,
                default: false
            },
            fileName: {
                type: String,
                default: ''
            }
        },
        filters: {},
        data() {
            return {
                pageTotal: 0,
                pageId: 1,
                pageSize: 20,
                sortConfig: {
                    col: undefined,
                    type: undefined // 1、正排 2、倒排
                },
                downloadStr: '暂无数据'
            }
        },
        watch: {
            tableHeader: {
                handler() {
                    this.sortConfig = {
                        col: undefined,
                        type: undefined
                    }
                    this.$refs.table.clearSort()
                }
            },
            tableHeader(newVal) {
                this.downloadStr = ''
                newVal.forEach((item, index) => {
                    if(index < this.downloadRows.length) {
                        this.downloadStr += ',' + item.label
                    }else {
                        return
                    }
                })
                if(this.needDownloadData) {
                    this.downloadStr += '\n'
                    this.tableData.data.forEach(item => {
                        let str = ''
                        this.downloadRows.forEach(prop => {
                            str += ',\t' + item[prop]
                        })
                        this.downloadStr += str + '\n'
                    })
                }
            },
            tableData: {
                handler(newVal) {
                    if(this.autoPagination){
                        this.pageId = 1
                        return
                    }
                    this.pageTotal =  newVal.pageTotal
                    
                },
                immediate: true
            },
            pagesize: {
                handler(newVal) {
                    this.pageSize = this.pagesize
                },
                immediate: true
            }
        },
        computed: {
            pageSizes() {
                return [10, 20, 50, 100]
            },
            autoTableData(){
                if(!this.autoPagination){
                    return null
                }
                let data = JSON.parse(JSON.stringify(this.tableData.data))
                if(this.sortConfig.col && this.sortConfig.type){
                    let col = this.sortConfig.col
                    data = data.sort((x,y) => {
                        if(this.sortConfig.type === 1){
                           return (x[col] > y[col] ? 1 : -1)
                        }
                        return (y[col] > x[col] ? 1 : -1)
                    })
                }
                if(this.pageTotal !== data.length){
                    this.pageTotal = data.length
                }
                console.log(data)
                console.log(this.pageSize * (this.pageId - 1))
                console.log(this.pageSize * this.pageId)
                return {
                    data: data.slice(this.pageSize * (this.pageId - 1) , this.pageSize * this.pageId ),
                    pageTotal: data.length 
                }
            }
        },
        created() {
            for(let i in this.tableHeader) {
                let item = this.tableHeader[i]
                if(item.sortable && item.sortDefault) {
                    this.sortConfig.col = item.prop
                    this.sortConfig.type = item.sortDefault
                }
            }
        },
        mounted() {},
        methods: {
            sortChange(e) {
                this.sortConfig.col = e.prop
                if (e.order === null) {
                    this.sortConfig.type = undefined
                    this.sortConfig.col = undefined
                } else {
                    this.sortConfig.type = e.order === "descending" ? 2 : 1
                }
                if(this.autoPagination){
                    return
                }
                this.reloadTable()
            },
            handleSizeChange(e) {
                this.pageSize = e
                if (this.pageSize * this.pageId >= this.pageTotal) {
                    this.pageId = Math.floor((this.pageTotal / this.pageSize))
                    if(this.autoPagination){
                        this.pageId = 1
                    }
                }
                if (this.loading) {
                    return false
                }
                if(this.autoPagination){
                    return
                }
                this.triggerPageParams()
            },
            pageChange(e) {
                if (this.loading) {
                    return false
                }
                this.pageId = e
                this.triggerPageParams()
            },
            triggerPageParams() {
                let pageId = this.pageId - 1
                let nowParams = {
                    page_size: this.pageSize,
                    page_id: pageId < 0 ? 0 : pageId
                }
                if(!this.needPagination) {
                    nowParams = {}
                }
                if (this.sortConfig.col) {
                    nowParams.sort_col = this.sortConfig.col
                    if (this.sortConfig.type) {
                        nowParams.sort_type = this.sortConfig.type
                    }
                }
                this.$emit('load', nowParams)
            },
            reloadTable() {
                this.pageId = 1
                this.triggerPageParams()
            },
            // 单选
            chooseSingle(val) {
                this.$emit('singlechoosehandler', val)
            }
        }
    };
</script>
<style lang="less" scoped>
    .table-comp {

        .tag-item {
            margin-right: 3px;
            margin-bottom: 3px;
        }

        .image-list-wrap {
            display: flex;
            flex-wrap: wrap;
            max-height: 300px;

            .image-item {
                cursor: pointer;
                margin: 0 5px;
            }
        }

        .pagination {
            margin: 15px auto;
            text-align: center;
        }

        .text-max-line{
            word-wrap: break-word; 
            overflow: hidden; 
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
        }
        .button-row {
            display: flex;
            * {
                margin-right: 10px;
            }
        }
    }
</style>