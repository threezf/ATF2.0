import $ from 'jquery'

var DefaultConfig = {
    line: {
        title: {
            text: '',
            x: 'center',
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        series: [{
            data: [],
            type: 'line'
        }]
    },
    bar: {
        title: {
            text: '',
            x: 'center',
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        series: [{
            data: [],
            type: 'bar'
        }]
    },
    pie: {
        title: {
            text: '',
            x: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: []
        },
        series: [
            {
                // name: '访问来源',
                type: 'pie',
                data: []
            }
        ]
    }
}

/**
 * @description 转化数据为echarts标准数据，在此时合并默认配置
 * @param {*} data 
 * @param {*} type 
 * @param {*} name 
 * @param {*} otherOptions 
 */
var TransDataToOptions = function(data, type = 'line', name, otherOptions = {}) {
    console.log(data, type, name)
    let options = $.extend(true, {}, DefaultConfig[type])

    options.title.text = name

    if(type === 'line' || type === 'bar') {
        let nameList = []
        let valueList = []
        for(let i in data) {
            nameList.push(data[i].name)
            valueList.push(data[i].value)
        }
        options.xAxis.data = nameList
        options.series[0].data = valueList
    }else if(type === 'pie') {
        let nameList = []
        for(let i in data) {
            nameList.push(data[i].name)
        }
        options.legend.data = nameList
        options.series[0].name = name
        options.series[0].data = data
    }

    return $.extend(true, {}, options, otherOptions)
}

export {
    DefaultConfig, 
    TransDataToOptions
}