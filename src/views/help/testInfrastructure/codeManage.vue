<template>
    <div>
        <h2>执行代码管理</h2>
        <p>在ATF自动化测试框架中，执行代码管理分为执行前代码管理和执行后代码管理。在测试框架中，对网站的测试操作是通过执行脚本程序的方式来进行的，同时在自动化测试的工作流程中，最重要的一步就是测试脚本代码执行的操作。如果我们观察一段脚本程序，并将其简单划分为几个部分的话，可以发现一个程序大致分为以下三部分：</p>
        <p>第一部分为程序的准备阶段，所做的工作大致为导入一些必要的类库，进行文件操作，执行时间的记录，初始化脚本等操作。</p>
        <p>第二部分是程序的核心部分，也是整个框架的工作的核心部分。中间部分的代码就是脚本中对网页进行操作，进行测试的一部分。这一部分的代码一般是由基础脚本这一模块自动生成的。</p>
        <p>第三部分是程序的末尾部分，主要功能是做一些脚本程序执行完毕后的一些收尾工作。</p>
        <figure>
            <img src="@/assets/images/infrastructure/11.png" alt="">
            <figcaption>图11 一般程序的三段结构</figcaption>
        </figure>
        <p>由以上对一般程序的大致分析可以发现，脚本的中间部分由测试框架自动生成。因此，不同网页的测试脚本不同，而测试脚本之间的区别也就在于第二部分的测试脚本内容，而第一部分和第三部分在相同项目的一轮测试中内容一般是相同的。本着复用的思想，这些相同的代码如导入类库、设置执行环境执行条件等部分代码可以在每个测试项目的执行代码管理中由测试人员进行设置并在其中保存，并在不同的测试脚本中使用。第一部分的准备阶段代码对应执行前代码，第三部分的末尾部分代码则对应执行后代码。在实际执行过程中，框架将预先保存的、内容相同的公共代码与实际测试中需要的、自动生成的测试代码组装起来，组成一个完整的、可执行的脚本程序。</p>
        <p>ATF自动化测试框架支持多种脚本语言，在本节中，我们以Groovy脚本为例来解释执行代码管理的功能。Groovy运行在Java虚拟机（JVM）上，可以作为Java平台的脚本语言。ATF自动化测试框架目前运行在Java平台上，而Groovy由于其运行在Java虚拟机上的特性可以很好的与Java代码结合，也可以直接使用Java语言编写的库。</p>
        <p>下图为实际测试系统中该模块截图</p>
        <figure>
            <img src="@/assets/images/infrastructure/12.png" alt="">
            <figcaption>图12 执行代码管理模块</figcaption>
        </figure>
        <p>以下是一段实际测试使用中的执行前代码：</p>
        <pre>
import control.core.ScriptExecuteTools;
import control.impl.web.selenium.Dialog_SeleniumImpl;
import control.impl.web.selenium.ScriptExecuteToolsInit;
import control.impl.web.selenium.WebButton_SeleniumImpl;
import control.impl.web.selenium.WebEdit_SeleniumImpl;
import org.openqa.selenium.WebDriver;
import java.util.Date;
import static constants.enumdefs.CaseRunFailCause.*;
import static constants.enumdefs.CaseRunStatus.*;
import run.batch.robot.*;

def helloWithoutParam(WebDriver driver,
File reporterFile,
File elementLibFile,
File objectLibFile){
    ScriptExecuteToolsInit.init(reporterFile, driver);
    ScriptExecuteTools.objectRepository.LoadFromFile(elementLibFile, objectLibFile);
    Date startTime = new Date();
ScriptExecuteTools.Reporter.SetStartTime(startTime);
        </pre>
        <p>以下对部分语句进行介绍：</p>
        <pre>
import org.openqa.selenium.WebDriver;</pre>
        <p>这一语句作用是导入Selenium 2.0的WebDriver API。WebDriver API集成在Selenium 2.0中，提供了更简单简洁的API接口。它不依赖于任何特定的测试框架，因此它可以在单元测试项目中使用。</p>
        <pre>
import java.util.Date;
Date startTime = new Date();
ScriptExecuteTools.Reporter.SetStartTime(startTime); </pre>
        <p>这部分代码显然是对时间进行操作。ATF测试框架执行脚本之后可以自动生成执行记录单。执行记录单中时间信息是一个测试流程中非常重要的信息，在执行之前应在公共代码中对时间进行初始化。</p>
        <pre>
def helloWithoutParam(WebDriver driver,
File reporterFile,
File elementLibFile,
File objectLibFile){
ScriptExecuteTools.objectRepository.LoadFromFile(elementLibFile, objectLibFile);
        </pre>
        <p>这一部分代码定义了一个Groovy函数，参数是WebDriver类型的driver，文件类型的报告文件、元素库文件、对象库文件。之后将元素库、对象库在代码中导入。</p>
        <p>以下是一段实际测试使用中的执行后代码：</p>
        <pre>
Date endTime = new Date();
    long processTime = (endTime.getTime()-startTime.getTime())/1000;
    ScriptExecuteTools.Reporter.SetEndTime(endTime);
    ScriptExecuteTools.Reporter.SetProcessTime(processTime);
    ScriptExecuteTools.Reporter.SetExeStatus(Passed);</pre>
        <p>可以看到，这一部分代码在测试脚本部分执行完成后进行测试结束时间和测试持续时间的记录，并将记录单状态设置为测试通过。</p>
        <p>整个执行前代码与执行后代码将测试框架生成的脚本包裹在中间，形成了一个完整执行的程序。程序的功能由测试框架中的脚本配置所决定。这些公共代码进行了复用，避免了测试人员在测试过程中重复编写代码。当然，ATF自动化测试框架支持多种脚本语言，本节仅以Groovy语言作为示例，这一部分的代码可以根据实际需求进行内容或者语言类型的修改。</p>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
    h2 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: .3em;
        font-size: 1.5em;
        border-bottom: 1px solid #eaecef;
    }
    h3 {
        font-size: 1.25em;
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
    }
    p {
        text-indent: 2em;
        margin-bottom: 0rem;
    }
    figure {
        text-align: center;
        width: 100%;
        figcaption {
            margin-bottom: 10px;
        }
    }
    dt, dd {
        text-indent: 2em;
        p {
            text-indent: 4em;
        }
    }
    pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border-radius: 3px;
    }
    code {
        padding: 0;
        padding-top: .2em;
        padding-bottom: .2em;
        margin: 0;
        font-size: 85%;
        background-color: rgba(27,31,35,.05);
        border-radius: 3px;
    }
</style>