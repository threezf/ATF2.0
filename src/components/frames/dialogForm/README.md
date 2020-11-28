### form配置说明
基础配置如下:
```json
    [{
        type: 'input', // 表单项类型
        label: 'name', // label文字
        placeholder: '名称', // 提示文字
        key: 'form_item_name', // 
        value: 'name', // 具体值，双向数据绑定的值
        valueType: '', // 值类型
        required: true,
        prop: '', // 验证名称
        rules: [], // 验证规则
        options: [], // 对于select可能存在的
    }]
```
### 配置说明
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