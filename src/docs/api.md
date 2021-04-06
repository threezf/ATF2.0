## 快速开始API
- baseURL: '',// 公共请求地址
- creatorId: 108
### 登陆
#### 1. /atfcloud2.0a/userController/getSessionId
<b>获取验证码</b>
```
```

#### 2. /atfcloud2.0a/userController/login
<b>登陆（表单格式数据）</b>
```
  {
    username: 用户名
    password: 密码
    authCode: 验证码
    sessionId: 上一个接口获取
  }
```

### 添加功能点
#### 3. /transactController/addSingleUITransactWithoutAut
<b>添加UI功能点</b>
```
  {
    nameMedium: "" // 功能点名称,
    descShort: "" // 描述,
    code: "" // 编码,
    creatorId: 108
  }
```

#### 4. /transactController/fastStartPagedBatchQueryTransact
<b>查看全部功能点</b>
```
  {
    creatorId,
    currentPage: 1,
    orderColumns: "modified_time",
    orderType: "desc",
    pageSize: 9999
  }
```

### 维护元素库

#### 5. /aut/queryAutVisibleOmClasses
<b>获取该测试系统下 所有的控件类型</b>
```
  {
    id: 接口2返回,
    companyId: 登陆接口,
    autId: 接口2返回
  }
```

#### 6. /elementRepository/queryAllElementsForATransact
<b>获取元素UI树</b>
```
  {
    transactId: 接口4返回
  }
```

#### 7. /elementRepository/batchAddUI
<b>添加UI</b>
```js
  {
    repositoryId: 接口6,
    uis: [{
            uiName
        }, //支持数组传参单界面未设计 且desc不用传参
    ],
    userId
  }
```

#### 8. /elementRepository/deleteSingleUI
<b>删除UI</b>
```js
  {
    uiId: 接口6返回,
    repositoryId: 接口6返回,
    userId
  }
```
#### 9. /elementRepository/modifySingleUI
<b>修改UI</b>
```js
  {
    relateIdentifyObjectId: "",
    repositoryId: 接口6,
    uiId: 接口6,
    uiName: 新的UI名,
    userId
  }
```

#### 10. /elementRepository/addSingleElement
<b>添加元素</b>
```
  {
    elementName: 元素名,
    classType: 元素类型,
    relateIdentifyObjectId: "",
    relateParentIdentifyObjectId: "",
    mainProperties: [{
        name: 主属性,
        value: 主属性值,
        method: "",
        isRelative: null,
        toolName: "",
    }, ]
  }
```

#### 11. /elementRepository/deleteSingleElement
<b>删除元素</b>
```
  {
    repositoryId: 接口6,
    elementId: 接口6,
    uiId: 接口6,
    userId
  }
```

#### 12. /elementRepository/modifySingleElement
<b>修改元素</b>
```js
  // 大部分含义参考接口10
  {
      elementId: 接口6,
      elementName,
      classType,
      relateIdentifyObjectId: "",
      relateParentIdentifyObjectId: "",
      mainProperties: [{
          name,
          value,
          method: "",
          isRelative: null,
          toolName: "",
      }, ],
      additionalProperties: [],
      assistantProperties: [],
      relateProperties: [],
  }
```

### 配置用例
#### 13. /testcase/getTestcaseId
<b>获取用例id</b>
```js
  {
    scriptId: '',
    autId: ''
  }
```

#### 14. /scriptTemplate/saveScriptTemplate
<b>保存脚本</b>
```
  {
    scriptId: 脚本id,
    content: this.generateScriptString(),
    userId: '',
    transId: 上个页面可以传递,  
  }
```
参数化示例js代码
```
  //遍历数据 生成保存脚本内容传参
  generateScriptString() {
      let sendDataArray = [];
      console.log("111", this.templateInfo);
      for (let i = 0; i < this.templateInfo.length; i++) {
          let template = this.templateInfo[i];
          console.log("111___" + i, template.uiname);
          let UI = template.uiname.replace(/^\"+|\"+$/g, '"');
          let element = template.elementName.replace(/^\"+|\"+$/g, '"');
          let classType = template.elementWidget;
          let method = template.methodName;
          let parguments = template.arguments;
          if (!UI && !method) {
              console.log("_UI__" + UI);
              console.log("method" + method);
              continue;
          }
          let paramValues = [];
          let type = 1; // record the type  --  1: normal  2: canshuhua biaozhu
          for (var paramRow of parguments) {
              var paramName = paramRow.name;
              if (paramName.includes("参数化标注")) {
                  type = 2;
              }
              var paramTr = paramRow.value;
              if (paramTr !== "") {
                  paramValues.push(`${paramTr}`);
              } else {
                  // paramValues.push(`"${paramTr.innerHTML}"`);
                  paramValues.push(`""`);
              }
          }
          if (paramValues.length === 0) {
              paramValues = ['""'];
          }
          let parameterString = paramValues.toString();
          console.log("parameterString" + parameterString);
          let string = "";
          if (type === 1) {
              if (UI == "" && classType == "" && element == "") {
                  string = `${method}(${parameterString});\n`;
                  // string = `${method}();\n`;
              } else {
                  string = `UI("${UI}").${classType}("${element}").${method}(${parameterString});\n`;
                  // string = `UI("${UI}").${classType}("${element}").${method}();\n`;
              }
          } else {
              if (UI == "" && classType == "" && element == "") {
                  string = `${method}();#${parameterString}\n`;
              } else {
                  string = `UI("${UI}").${classType}("${element}").${method}();#${parameterString}\n`;
                  // string = `UI("${UI}").${classType}("${element}").${method}();#${parameterString}\n`;
              }
          }
          sendDataArray.push(string);
      }
      console.log("sendDataArray" + sendDataArray);
      return sendDataArray.join("");
  },
```

#### 15. /scriptTemplate/scriptParameterized
<b>参数化</b>
```js
  {
    autId: 见前面介绍,
    scriptId: 脚本id,
    content: 参数化内容,
    userId,
  }
```

#### 16. /sceneController/insertTestcaseToScene
<b>添加用例到场景</b>
```
  {
    id: "",
    creatorId,
    caseIds: [id]
  }
```

#### 17. /scriptTemplate/insert
<b>插入</b>

#### 18. /testcase/addTestcase
<b>插入测试用例</b>
```js
  {
    actionList: [],
    autId: _this.autId,
    author: sessionStorage.getItem("userId") || "3",
    automaton: "",
    caseCompositeType: "1",
    caseLibId: "253",
    casecode: "casecode" + Date.now(),
    caseproperty: "1",
    casetype: "1",
    categoryTeam: "",
    checkpoint: "",
    datarequest: "",
    executeMethod: "2",
    executor: "3",
    expectresult: "1",
    functionModule: "",
    modifyChannel: "",
    modifyChannelNo: "",
    note: _this.addTemplateForm.description,
    prerequisites: "",
    priority: "1",
    reviewer: "3",
    scriptMode: "1",
    scriptModeFlag: res.scriptId,
    submissionId: "49",
    tags: "",
    testdesign: 1,
    testpoint: _this.addTemplateForm.name,
    teststep: "1",
    transId: _this.transId,
    useStatus: "1",
    version: "",
  }
```

#### 19. /sceneController/deleteTestcaseFromScene
<b>删除场景中的用例</b>
```js
  {
    id: _this.sceneId,
    caseIds: [id]
  } 
```

#### 20. /scriptTemplate/delete
<b>删除脚本</b>
```js
  {
    id: this.templateRadio,
    userId: sessionStorage.getItem("userId"),
    transId: this.transId,
    scriptId: this.templateRadio
  }
```

#### 21 ./scriptTemplate/queryTemplateByTransId
<B>获取脚本</B>
```js
  {
    id: this.transId,
  }
```

#### 22. /scriptTemplate/queryScriptInfo
<b>获取脚本详情</b>
```js
  {
    scriptId: this.templateRadio,
    autId: this.autId,
  }
```

### 执行用例

### 查看结果