### wv-form配置说明
基础配置如下
```json
[{
    type: 'select',
    label: '类型',###
    key: 'rec_id',
    value: 0,
    valueType: 'Number',
    required: true,
    placeholder: '选择类型',
    options: []
}, ...]
```

### wv-form配置说明
| 名称 | 意义 | 类型 | 默认值 | 是否必填 |
| - | :- | :-: | :-: | - |
| label | 筛选框名字 | String |  | 是 |
| key | 传递的key | String |  | 是 |
| type | 筛选类型，目前支持`input/number/select/timePicker/exp/cityPicker` | String |  | 是 |
| value | 初始值 | String/Number/Object |  | 是 |
| valueType | 值类型，目前支持`Number`，及传出value为数字 | String |  | 否 |
| required | 是否必填 | Boolean |  | 否 |
| options | `type=select`时传入，选项的种类 | Array |  | 否 |
| tips | 选项备注提示 | String |  | 否 |
| placeholder | - | String |  | 否 |
| showPassword | 是否显示为密码框 | Boolean | false | 否
| clearable | 是否可以删除输入内容 | Boolean | false| 否
| disabled | 是否禁用 | Boolean | false | 否
| multiple | 是否支持多选 | Boolean | false | 否
| filterable  | 是否启用搜索 | Boolean | false | 否
| collapseTags  | 多选时是否折叠tags	 | Boolean | false | 否
| border  | 单选或多选是否需要border	 | Boolean | false | 否
| button  | 单选或多选是否显示为按钮	 | Boolean | false | 否
| ref  | 控件的ref属性	 | String | "" | 否
| dateType  | 日期选择器的类型，目前支持`date/week/month/year/dates`	 | String | "date" | 是
| daterangeType  | 范围日期选择器的类型，目前支持`daterange/monthrange`	 | String | "date" | 是
| pickerOptions  | 日期选择快捷操作	 | Object | 根据需要自行配置 | 否
| colors  | 评分分级颜色	 | Array | 根据需要自行配置 | 否