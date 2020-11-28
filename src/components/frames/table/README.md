# Table配置说明  
基础配置如下
```json
[{
    label: '创建时间',
    prop: 'createtime', //item下对应的key
    type: 'time', //默认不填，展示纯文本
    sortable: 'custom', //排序
    width: 160 //宽度
    position: 'right' //是否固定到某侧
}, ...]
```
### table配置说明
| 名称 | 意义 | 类型 | 默认值 | 是否必填 |
| - | :- | :-: | :-: | - |
| label | 表头本质 | String |  | 是 |
| prop | 列表item下对应的key，支持.结构深度查找，如`acct[0].userattr.head_img_url` | String |  | 是 |
| type | 展示类型，目前支持`time/number/link/text/avatar/media/tag/topic/poi` | String |  |  否 |
| sortable | 排序类型，`custom`表示需要排序 | String |  | 否 |
| width | 表头宽度 | Nubmber |  | 否 |
| position | 固定方位 left/right | String |  | 否 |


### type类型说明 - time
`time`类型，表示展示时间，传值为Unix时间戳 

![图片描述](/tfl/pictures/202002/tapd_10156031_1582810882_10.png)


### type类型说明 - number
`number`类型，表示展示数字，需要额外的配置，跟type平级，传值为Number类型 
| 名称 | 意义 | 类型 | 默认值 |
| - | :- | :-: | :-: |
| unit | 单位 | String |  |  
| fixed | 保留小数位 | Number | 0 |
| extMulti | 额外乘的值 | Number | 1 |

![图片描述](/tfl/pictures/202002/tapd_10156031_1582810923_70.png)

### type类型说明 - link
`link`类型，表示跳转链接
```json
{
    label: 'finderuin',
    prop: 'finderuin',
    sortable: 'custom',
    type: 'link',
    href: '/backendTools/PosterInfo',
    target: '_blank',
    query: {
        finder_uin: 'finderuin'
    }
}
```

### type类型说明 - text
`text`类型，表示文本展示，主要用于带有换行符等文本进行的展示

### type类型说明 - avatar
`avatar`类型，表示头像展示，传值头像地址就行

![图片描述](/tfl/pictures/202002/tapd_10156031_1582810938_71.png)


### type类型说明 - media
`media`类型，表示媒体类型，数据结构如下
```json
[{ "height": 400.0, "md5sum": "d6c37c9d47743dceeea4fef982c17199", "media_type": 4, "thumb_url": "xxxx", "video_play_len": 60, "width": 720.0 }]
```

![图片描述](/tfl/pictures/202002/tapd_10156031_1582810987_33.jpg)


### type类型说明 - tag
`tag`类型，表示标签类型，会按标签展示，数据结构如下
```json
[{"tagclass":"体育","tagid":10000005,"tagname":"体操"},{"tagclass":"阅读","tagid":26,"tagname":"体育"},{"tagclass":"阅读","tagid":19,"tagname":"健身运动"}]
```

![图片描述](/tfl/pictures/202002/tapd_10156031_1582811003_40.png)


### type类型说明 - topic
`topic`类型，表示话题类型，会按话题展示，移上去会有tips，数据结构如下
```json
[{ "topic": "PoiCityTopic_CN_Shanghai", "topic_id": "13272614252898682964", "topic_type": 2 }]
```

![图片描述](/tfl/pictures/202002/tapd_10156031_1582811013_44.png)


### type类型说明 - poi
`poi`类型，表示地址类型，地址模式展示，数据结构如下
```json
{ "city": "上海市", "latitude": 31.2847442630, "longitude": 121.4855346680, "poiAddress": "", "poiClassifyId": "", "poiClassifyType": 1, "poiName": "" }
```

![图片描述](/tfl/pictures/202002/tapd_10156031_1582811033_77.png)


### vscodeScript文件夹
 使用 首选项->用户片段 添加tablecomp和tableconfig 快速生成表格及其配置代码