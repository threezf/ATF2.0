<template>
    <div class="chart-body">
        <div class='chart-container' v-show='!isTable'>
            <div class="line-chart"  :class="{needMathData: 'need-flex'}" :style="{width: width, height: height}" :id="id"></div>
        </div>
        <div class="table-container" v-if='isTable' :style="{width: width, height: height}" :id="id">
            <h3 class='title'>{{tableName}}</h3>
            <table-comp :need-pagination="false" :table-header="tableConf" :table-data="{data:tableData,pageTotal:0}">
            </table-comp>
        </div>
        <div class='button-container' v-if='needTrans'>
            <el-tooltip content="转化饼图" placement="left" effect="light">
                <el-button class="el-icon-pie-chart" @click='transPie'></el-button>
            </el-tooltip>
            <el-tooltip content="转化柱状图" placement="left" effect="light">
                <el-button class="el-icon-s-data" @click='transBar'></el-button>
            </el-tooltip>
            <el-tooltip content="转化折线图" placement="left" effect="light">
                <el-button class="el-icon-data-line" @click='transLine'></el-button>
            </el-tooltip>
            <el-tooltip content="转化表格" placement="left" effect="light">
                <el-button class="el-icon-date" @click='transTable'></el-button>
            </el-tooltip>
        </div>
        <div class="data-content" v-if="needMathData">
            <el-card>
                <div slot="header" v-if="options.title && options.title.text">
                    {{options.title.text}}
                </div>
                <el-form label-width="80px">
                    <div v-for="(item, index) in mathList" :key="index">
                        <div class="title">{{item.title}}</div>
                        <el-form-item class="form-item" label="总量">{{item.total}}</el-form-item>
                        <el-form-item class="form-item" label="均值">{{item.average}}</el-form-item>
                    </div>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'Chart',
        props: {
            type: {
                type: String,
                default: 'line'
            },
            options: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            width: {
                type: [Number, String],
                default: '100%' 
            },
            height: {
                type: [Number, String]
            },
            needMathData: {
                type: Boolean,
                default: false
            },
            needClick:{
                type: Boolean,
                default: false
            },
            needTrans:{
                type: Boolean,
                default: false
            },
            isSVG: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                id: 'charts'+this.randomString(8),
                myChart: null,
                mathList: [],
                isTable: false,
                tableConf: [],
                tableData: [],
                tableName: '',
                nowType: undefined,
            }
        },
        watch: {
            options(newVal, oldVal) {
                this.render()
            },
            width(newVal, oldVal) {
                this.myChart.resize()
            }
        },
        computed: {},
        methods: {
            render() {
                // console.log(this.options)
                if(this.nowType === 'line'){
                    this.transLine()
                }
                if(this.nowType === 'bar'){
                    this.transBar()
                }
                if(this.nowType === 'pie'){
                    this.transPie()
                }
                this.myChart.setOption(this.options,true)
                if(this.needMathData) {
                    this.caculateMath()
                }
            },
            transTable(){
                this.isTable = true
                let options = JSON.parse(JSON.stringify(this.options))
                this.tableConf = options.xAxis.data.map((item , index) => ({
                    label: item,
                    prop: 'val' + index,
                }))
                this.tableName = options.title.text
                let obj ={}
                options.series[0].data.forEach((item , index) => {
                    console.log(item)
                    obj['val' + index] = item
                })
                this.tableData = [obj]
            },
            transBar(){
                this.isTable = false
                let options = JSON.parse(JSON.stringify(this.options))
                options.series.forEach(item => {
                    if(item.name !== 'total'){
                        item.type = 'bar'
                    }
                })
                setTimeout(_=>{
                    this.myChart.setOption(options,true)
                },0)
                this.nowType = 'bar'
            },
            transLine(){
                this.isTable = false
                let options = JSON.parse(JSON.stringify(this.options))
                options.series.forEach(item => {
                    item.type = 'line'
                })
                setTimeout(_=>{
                    this.myChart.setOption(options,true)
                },0)
                this.nowType = 'line'
            },
            transPie(){
                this.isTable = false
                let options = JSON.parse(JSON.stringify(this.options))
                let xAxis = options.xAxis.data
                let data = options.series[0].data
                let pieData = []
                xAxis.forEach((item,index) => {
                    pieData.push({
                        name: item,
                        value: data[index]
                    })
                })
                let option = {
                    title:  options.title,
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: '40',
                        top: '40',
                        data: xAxis
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: pieData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                setTimeout(_=>{
                    this.myChart.setOption(option,true)
                },0)
                this.nowType = 'pie'
            },
            randomString(len) {
                len = len || 32;
                var $chars = 'abcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                var maxPos = $chars.length;
                var pwd = '';
                for (var i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            },
            caculateMath() {
                this.mathList = []
                let mathList = []

                let BigNumberTrans = (number) => {
                    if(number >= 10000) {
                        number = (number/10000).toFixed(1) + 'w'
                        return number
                    }else{
                        if(this.options.id.indexOf('ratio') !== -1) {
                            return (number*100).toFixed(2) + '%'
                        }else{
                            return number.toFixed(2)
                        }
                    }
                }

                for(let i in this.options.series) {
                    if( this.options.series[i].symbol !== 'none'){
                        if( this.options.series[i].analysisData){
                            mathList.push({
                                title: this.options.series[i].name,
                                average: BigNumberTrans(this.options.series[i].analysisData.average),
                                total: BigNumberTrans(this.options.series[i].analysisData.total)
                            })
                        }
                        else{
                            let total = this.options.series[i].data.reduce((total, item) => total + item)
                            let average = (total/this.options.series[i].data.length)
                            mathList.push({
                                title: this.options.series[i].name,
                                average: BigNumberTrans(average),
                                total: BigNumberTrans(total)
                            })
                        }
                    }
                }

                this.mathList = mathList
            }
        },
        created() {},
        mounted() {
            var myChart
            if(this.isSVG) {
                myChart = echarts.init(document.getElementById(this.id), 'wonderland', {renderer: 'svg'})
            }else {
                myChart = echarts.init(document.getElementById(this.id))
            }
            this.myChart = myChart
            this.myChart.on('legendselectchanged', (params) => {
                this.$emit('legendselected',params)
            })
            if(this.needClick){
                this.myChart.on('click', 'series', ()=> {
                    this.$emit('click')
                });
            }
            this.render()
        },
        beforeDestroy () {
            this.myChart.clear()
        },

    };
</script>
<style lang="less" scoped>
@import '~@/styles/variable.less';
.chart-body{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    .chart-container{
        // width: 100%;
        flex: 1;
        height: 100%;
        border: 1px solid #ddd;
        padding: 15px;
        .line-chart {
            // width: calc(100%);
            height: 100%;
            display: flex;
            &.need-flex{
                flex: 1;
            }
        }
    }
    .table-container{
        padding-top:20px;
        width: calc(100% - 40px);
        .table-comp{
            width: calc(100% - 20px);
        }
        .title{
            text-align: center;
            margin: 6px auto;
        }
    }
    .button-container{
        width: 20px;
        .el-button{
            margin-left: -20px!important;
            margin-bottom: 5px;
        }
    }
    .data-content{
        flex-shrink: 0;
        display: flex;
        min-width: 320px;
        .form-item{
            margin-bottom: 0;
        }
    }
}
    
</style>