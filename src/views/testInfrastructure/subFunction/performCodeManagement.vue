<template>
<div class="page-base-inner" style="background-color: whitesmoke">
  <el-container>
    <el-main>
      <el-row class="buttonRow">
        <span class="spanStyle">被测系统名称：{{testedSystemName}}</span>
        <el-button class="buttonPosition" type="primary" size="small" @click="saveButton">保存</el-button>
      </el-row>
      <div class="divContent">
        <el-row class="rowCode">执行前代码：</el-row>
        <textarea class="textareaStyle" onresize v-model.trim="mainCodeBegin"></textarea>
        <el-row class="rowCode">执行后代码：</el-row>
        <textarea class="textareaStyle" onresize v-model.trim="mainCodeEnd"></textarea>
      </div>
    </el-main>
    <el-footer>
      <p class="footParagraph">Copyright © 1998－2019 BUPT All Rights Reserved</p>
      <p class="footParagraph">教育部信息网络工程研究中心 版权所有</p>
    </el-footer>
  </el-container>
</div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
export default {
  components: {
    ElSlPanel
  },
  mixins: [VueMixins], // 混入
  name: "performCodeManagement",
  data() {
    return {
      testedSystemName: "1221212",
      autId: "",
      id: 0,
      mainCodeBegin: "",
      mainCodeEnd: "",
      toolName: ""
    };
  },
  computed: {},
  created() {
    this.autId = this.$route.query.id;
    this.querySingleTool();
  },
  methods: {
    //按钮事件
    saveButton() {
      let _this = this;
      console.log("点击保存按钮");
      Request({
          url: "/tool/updateToolInfo",
          method: "POST",
          params: {
            autId: _this.autId,
            id: _this.id,
            maincodeBegin: _this.mainCodeBegin,
            maincodeEnd: _this.mainCodeEnd,
            toolname: _this.toolName
          }
        })
        .then(res => {
          console.log("保存成功", res);
          this.$message.success("保存成功");
        })
        .catch(err => {
          console.log("保存失败", err);
        });
    },
    querySingleTool() {
      let initBegin = `
        import control.core.ScriptExecuteTools
        import control.impl.web.selenium.dialog.Dialog_SeleniumImpl;
        import control.impl.web.selenium.common.ScriptExecuteToolsInit;
        import control.impl.web.selenium.browser.Browser_SeleniumImpl;
        import control.impl.web.selenium.single.WebButton_SeleniumImpl;
        import control.impl.web.selenium.single.WebImage_SeleniumImpl;
        import control.impl.web.selenium.single.WebLink_SeleniumImpl;
        import control.impl.web.selenium.single.WebImage_SeleniumImpl;
        import control.impl.web.selenium.single.WebCheckBox_SeleniumImpl;
        import control.impl.web.selenium.edit.WebEdit_SeleniumImpl;
        import control.impl.web.selenium.edit.WebArea_SeleniumImpl;
        import control.impl.web.selenium.list.WebList_SeleniumImpl;
        import control.impl.web.selenium.single.WebFile_SeleniumImpl;
        import control.impl.web.selenium.radiogroup.WebRadioGroup_SeleniumImpl;
        import control.impl.web.selenium.single.WebElement_SeleniumImpl;
        import control.impl.web.selenium.checkpoint.CheckPoint_SeleniumImpl;
        import org.openqa.selenium.WebDriver
        import java.util.Date
        import static constants.enumdefs.CaseRunFailCause.*
        import static constants.enumdefs.CaseRunStatus.*
        import run.batch.robot.*;

        def helloWithoutParam(WebDriver driver, Map<String, String> reporterMap,File elementLibFile,File objectLibFile){
        try{
            ScriptExecuteToolsInit.init(driver, reporterMap);
            ScriptExecuteTools.objectRepository.LoadFromFile(elementLibFile, objectLibFile);
            Date startTime = new Date();
            ScriptExecuteTools.Reporter.setStartTime(startTime);
        HashMap resultMap = new HashMap();
      `
      let initEnd = `
          Date endTime = new Date();
          long processTime = (endTime.getTime()-startTime.getTime())/1000;
          ScriptExecuteTools.Reporter.setEndTime(endTime);
          ScriptExecuteTools.Reporter.setProcessTime(processTime);
          ScriptExecuteTools.Reporter.setExeStatus(Passed);
          return resultMap;
        }catch(MissingPropertyException e){
        throw new GroovyRuntimeException("没找到对应属性，检查执行代码或控件是否错漏:"+e.getMessage());
        }catch(MissingMethodException e1){
        throw new GroovyRuntimeException("没找到对应方法，检查控件或执行代码是否错漏:"+e1.getMessage());
        }
      }`
      let _this = this;
      Request({
          url: "/tool/querySingleTool",
          method: "POST",
          params: {
            id: this.autId
          }
        })
        .then(res => {
          if (res.respCode == "0000") {
            _this.id = res.id;
            _this.mainCodeBegin = res.maincodeBegin ? res.maincodeBegin : initBegin;
            _this.mainCodeEnd = res.maincodeEnd ? res.maincodeEnd : initEnd;
            _this.toolName = res.toolname;

          } else {
            console.log("未知错误");
          }
        })
        .catch(err => {
          console.log("获取失败", err);
        });
    }
  }
};
</script>

<style scoped>
.buttonRow {
  margin: 0px auto 15px 0px;
  font-size: 18px;
  color: gray;
  height: 32px;
}

.spanStyle {
  margin-top: 6px;
}

.buttonPosition {
  margin-left: 100px;
}

.rowCode {
  font-weight: bold;
  color: darkgray;
  margin-left: 5px;
}

.textareaStyle {
  border: 1px solid gray;
  border-radius: 8px;
  radius: 8px;
  width: 100%;
  height: 337px;
  margin: 10px;
  display: block;
  padding: 6px 12px;
  font-size: 15px;
}

.footParagraph {
  width: 100%;
  text-align: center;
  font-family: "Times New Roman";
  font-size: 14px;
}

.divContent {
  width: 100%;
  height: fit-content;
}
</style>
