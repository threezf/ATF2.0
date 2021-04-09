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
                }]
            }
        },
        computed: {
            chartOptions() {
                let obj = {}
                this.chartType.forEach((item, index) => {
                    let options = {
                        title: {
                            text: item.label
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['系统数', '项目数', '测试用例数', 'API数目']
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
                            data: ['2020年9月', '2020年10月', '2020年11月', '2020年12月', '2021年1月', '2021年2月', '2021年3月']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: []
                    }
                    if(index == 0) {
                        options.series = [
                            {
                                name: '系统数',
                                type: 'line',
                                smooth: true,
                                data: [120, 132, 101, 134, 90, 230, 210]
                            },
                            {
                                name: '项目数',
                                type: 'line',
                                smooth: true,
                                data: [220, 182, 191, 234, 290, 330, 310]
                            },
                            {
                                name: '测试用例数',
                                type: 'line',
                                smooth: true,
                                data: [150, 232, 201, 154, 190, 330, 410]
                            },
                            {
                                name: 'API数目',
                                type: 'line',
                                smooth: true,
                                data: [320, 332, 301, 334, 390, 330, 320]
                            }
                        ]
                    }else {
                        options.series = [
                            {
                                name: '系统数',
                                type: 'line',
                                smooth: true,
                                data: [120, 252, 353, 488, 578, 808, 1018]
                            },
                            {
                                name: '项目数',
                                type: 'line',
                                smooth: true,
                                data: [220, 402, 593, 827, 1117, 1447, 1757]
                            },
                            {
                                name: '测试用例数',
                                type: 'line',
                                smooth: true,
                                data: [150, 382, 583, 737, 927, 1157, 1567]
                            },
                            {
                                name: 'API数目',
                                type: 'line',
                                smooth: true,
                                data: [320, 652, 953, 1274, 1664, 1994, 2324]
                            }
                        ]
                    }
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