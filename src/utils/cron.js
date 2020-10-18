// cron表达式解析
const cronToDate = function (str) {
  var toDate = {}
  if (!str) {
    toDate.loopType = '单次循环'
  } else {
    var result = str.split(' ').join('')
    var nArr = str.split(' ')
    var countData = getPlaceholderCount(result)
    if (!countData.count1) { // 没有'?'则是按周循环
      toDate.loopType = '周循环'
      var keys = nArr[5]
      var en2cnMap = {
        1: '周天',
        2: '周一',
        3: '周二',
        4: '周三',
        5: '周四',
        6: '周五',
        7: '周六'
      }
      var cnKeys = keys.split(',').map(function (key, idx) {
        return en2cnMap[key];
      })
      toDate.loopValue = cnKeys.join(',')
    } else if (countData.count1 + countData.count2 === 3) {
      toDate.loopType = '月循环'
      var mot = []
      var mkeys = nArr[3].split(',')
      for (var i = 0; i < mkeys.length; i++) {
        let mo = mkeys[i] + '号'
        mot.push(mo)
      }
      toDate.loopValue = mot.join(',')
    } else {
      toDate.loopType = '天循环'
    }
    toDate.loopTime = nArr[2] + ':' + nArr[1] + ':' + nArr[0]
  }
  return toDate
}
// 统计字符串中包含某个字符的个数
let getPlaceholderCount = function (strSource) {
  var count1 = 0 // ?的个数
  var count2 = 0 // *的个数
  strSource.replace(/\*|\?/g, function (m, i) {
    if (m === '?') {
      count1++
    } else if (m === '*') {
      count2++
    }
  });
  var obj = {}
  obj.count1 = count1
  obj.count2 = count2
  return obj //返回一个对象，根据需要得到想要的值
}

const dateToCron = function (dates) {
  let m = ''
  let s = ''
  let h = ''
  let w = dates.wloopValue || ''
  let mo = dates.mloopValue || ''
  if (dates.effectTime) {
    h = dates.effectTime.getHours()
    m = dates.effectTime.getMinutes()
    s = dates.effectTime.getSeconds()
  }
  let loopType = dates.loopType
  var cron = ''
  if (loopType === 'DAILY') {
    cron = s + ' ' + m + ' ' + h + ' * * ? *'
  } else if (loopType === 'WEEKLY') { // 星期天为1，星期6为7
    cron = s + ' ' + m + ' ' + h + ' * * ' + w.join(',') + ' *'
  } else if (loopType === 'MONTHLY') { // 1-31
    cron = s + ' ' + m + ' ' + h + ' ' + mo.join(',') + ' * ? *'
  }
  return cron
  //  console.log（cron）      19 30 16 * * 2,3 *
}


export {
  cronToDate,
  dateToCron
}