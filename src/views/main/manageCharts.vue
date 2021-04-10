<template>
    <div class="chart-body">
        <div class="chart-item" v-for="(chart, index) in chartOptions" :key="'index' + index">
            <Charts  :options="chart" :height="'400px'" :width="'100%'"></Charts>
        </div>
    </div>
</template>

<script>
    import Charts from '@/components/common/charts/base.vue'
    export default {
        name: 'ManageCharts',
        components: {
            Charts
        },
        props: {
            userType: {
                type: Number,
                default: 0
            },
            originData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                chartType: [{
                    label: '增量统计',
                    key: 'add'
                }, {
                    label: '总量统计',
                    key: 'all'
                }],
                indexObj: {
                    autCount: 0,
                    testProjectCount: 1,
                    uiTestCaseCount: 2,
                    apiTestCaseCount: 3
                }
            }
        },
        computed: {
            sumData() {
                let arr = []
                let obj = {
                    autCount: 0,
                    testProjectCount: 0,
                    uiTestCaseCount: 0,
                    apiTestCaseCount: 0,
                    time: ''
                }
                this.originData.forEach((item) => {
                    for(let key in obj) {
                        if(key === 'time') {
                            obj[key] = item[key]
                        }else {
                            obj[key] = obj[key] + item[key]
                        }
                    }
                    arr.push(JSON.parse(JSON.stringify(obj)))
                })
                return arr
            },
            chartOptions() {
                let obj = {}
                this.chartType.forEach((item, index) => {
                    let options = {
                        title: {
                            text: item.label
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                        },
                        legend: {
                            data: ['系统数', '项目数', 'UI用例数', '接口用例数']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            // boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            name: '系统数',
                            type: 'line',
                            smooth: true,
                            data: []
                        },
                        {
                            name: '项目数',
                            type: 'line',
                            smooth: true,
                            data: []
                        },
                        {
                            name: 'UI用例数',
                            type: 'line',
                            smooth: true,
                            data: []
                        },
                        {
                            name: '接口用例数',
                            type: 'line',
                            smooth: true,
                            data: []
                        }]
                    }
                    let baseData = {
                        autCount: 0,
                        testProjectCount: 0,
                        uiTestCaseCount: 0,
                        apiTestCaseCount: 0
                    }
                    let originList = []
                    if(index === 0) {
                        originList = this.originData
                    }else {
                        originList = this.sumData
                    }
                    originList.forEach((item, itemIndex) => {
                        options.xAxis.data.push(item.time)
                        for(let key in this.indexObj) {
                                options.series[this.indexObj[key]].data.push(item[key])
                        }
                    })
                    obj[item.key] = options
                })
                return obj
            }
        },
    }
</script>

<style scoped lang="less">
    .chart-body {
        padding: 10px;
        width: calc(100%);
        display: flex;
        justify-content: space-between;
        .chart-item {
            flex: 1;
        }
    }
</style>