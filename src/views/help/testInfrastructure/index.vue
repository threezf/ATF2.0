<template>
    <div class="project">
        <el-card>
            <h1 class="main-title">测试基础设施</h1>
            <div class="component">
                <div>
                    <h2>自动化构件维护</h2>
                    <div>
                        <h3>自动化构件管理</h3>
                        <p>进入ATF界面后，点击“系统管理”目录，可看到 “自动化构件管理”选项卡。</p>
                        <p>自动化构件维护的功能是创建、维护自动化测试过程中被测系统所需要的控件类型，方法及其他属性，提前设置好这些属性，可在测试中根据这些设置自动地进行测试，无需人工操作。自动化构件管理模块被“自动化构件维护”利用，可创建多个抽象框架，该框架下可创建控件和方法，当某个具体测试系统继承抽象框架时，测试系统无需创建控件和方法，自动继承抽象框架的控件和方法。如果不需要继承的按钮和方法，也可删除，添加专属自己的按钮和方法。这样的模式好处是抽象框架可被多个被测系统复用，节省了时间。</p> 
                        <p>首先需要点击“自动化构件管理”选项卡进入该模块界面（图1）。最左界面为“开发构架”，即抽象框架的汇总，可进行添加和修改多个树形结构的目录。其中添加的抽象框架可继承自其它框架，即父类的框架类型和方法同时被创建的子类继承（图2）。</p>
                        <figure>
                            <img src="@/assets/images/infrastructure/1.png" alt="">
                            <figcaption>图1 自动化构件管理-开发构架</figcaption>
                            <img src="@/assets/images/infrastructure/2.png" alt="">
                            <figcaption>图2 添加抽象框架</figcaption>
                        </figure>
                        <p>点击抽象框架进入中间的界面（图3），可进行该框架的控件类型和方法的创建。若该框架为父类，则控件类型的继承标志为“自身控件”；若为子类，则子类的控件和父类同名且标志为“继承自父类”；若不同名则为“自身控件”。有控件则还需要设置该控件对应的方法（图4），如输入框对应的方法为“set”,按钮对应的方法为“click”。方法同控件类型，都可继承自父类。“添加方法”界面中可对方法进行创建，设置方法名称，对方法进行描述说明，设置是否有参数，等待时间、超时时间和该方法的执行代码。方法创建后，可进行控件和方法的绑定。</p>
                        <figure>
                            <img src="@/assets/images/infrastructure/3.png" alt="">
                            <figcaption>图3 控件类型</figcaption>
                            <img src="@/assets/images/infrastructure/4.png" alt="">
                            <figcaption>图4 控件类型</figcaption>
                        </figure>
                        <p>点击控件类型可进入控件类型的详细属性界面（图5），可为该控件补充或修改、查看相应的属性。当控件类型继承自父类，则控件类型不可修改，只能到父类对应的控件类型进行修改。若控件为自身控件，则可修改。“默认方法”下拉框可选择创建好的方法，指定该方法作为元素关联该控件时的初始方法。“继承标志”下拉框有三个可选项：自定义、禁用、重定义。继承可见性有两个选项：公共、私有。若选择私有，则其子类不可继承该控件。</p>
                        <p>其中“运行时参数”“支持识别属性”“自识别属性”“辅助识别属性”，四个参数的作用分别是，第一个参数是自动化测试运行时所需要的参数，后三个参数是使执行机在一个页面里定位某个控件时所需要的参数。</p>
                        <figure>
                            <img src="@/assets/images/infrastructure/5.png" alt="">
                            <figcaption>图5 控件类型属性</figcaption>
                        </figure>
                    </div>
                    <div>
                        <h3>自动化构件维护</h3>
                        <p>在自动化构件管理中创建完控件和方法，那就可以在具体被测系统中使用这些控件和方法。</p>
                        <p>回到首页，点击“被测基础设施”，点击“创建”，创建测试系统，填写“测试系统编号”、“测试系统名称”、“开发框架”、“描述”（图6），其中开发框架可选择来自“自动化管理模块”所创建的抽象框架，此时该被测试系统对应的控件和方法可继承被选开发框架的控件和方法。</p>
                        <figure>
                            <img src="@/assets/images/infrastructure/6.png" alt="">
                            <figcaption>图6 添加测试系统</figcaption>
                        </figure>
                        <p>在被测基础设施页面中选中被测系统，点击“展开高级功能”，点击“自动化构件维护”选项卡进入该测试系统的自动化构件管理界面。测试系统的控件不仅可以继承自父类控件，也可以创建自己的控件，方法类似。继承的控件类型不可进行修改，相应的输入框和下拉框变灰为不可编辑，而自控件可进行编辑和更改。</p>
                    </div>
                </div>
                <div>
                    <h2>元素库</h2>
                    <div>
                        <h3>元素库设计思想</h3>
                        <p>所有的 UI（用户界面）操作的自动化，都需要选择界面元素。选择界面元素就是:先让程序能找到你要操作的界面元素。先找到元素，才能操作元素。</p>
                        <p>一般，根据web元素的特征去选择元素。通常可以使用浏览器的开发者工具栏帮助查看、选择web元素。</p>
                        <figure>
                            <img src="@/assets/images/infrastructure/7.png" alt="">
                            <figcaption>图7 利用浏览器查看百度首页的元素</figcaption>
                        </figure>
                        <dl>
                            <dt>(1)根据元素的id属性选择元素</dt>
                            <dd>
                                <p>在图中，input元素，存在一个属性叫id，id类似于元素的编号，用来在html中标记该元素。根据规范，如果元素有id ，则此id是元素在当前页面的唯一标志。所以如果元素有id，根据id选择元素是最简单高效的方式。</p>
                            </dd>
                            <dt>(2)根据name名称、class属性、tag名、xpath选择元素</dt>
                            <dd>
                                <p>在没有元素id的情况下，我们可以根据元素的其他属性如：name、class、tag、xpath等。</p>
                                <p>因此，在web自动化测试过程中，构建元素库维护页面元素，用于自动定位。</p>
                                <p>元素库由多个UI（LogicalElementEntity）构成。每个UI拥有自己的名称（name）、关联对象（relateIdentifyObjectId）和元素列表（List&lt;LogicalElementEntity&gt;）。</p>
                                <p>每个元素（LogicalElementEntity）包括元素详细信息（IdentifyAutoElementEntity）、关联对象（relateIdentifyObjectId）和关联元素列表（relateElementList）。</p>
                                <p>每个元素的详细信息包括编号（id）、名称（name）、类型（classtype）、属性集（locatePropertyCollection）和对象库中关联的父对象编号（parentElementId）。</p>
                                <p>属性集由主属性集（main_properties）、副属性集（addtional_properties）和辅助属性集（assistant_properties）构成。</p>
                                <p>属性（LocateProperty）由名称（name）、值（value）和匹配方法（matchMethod）构成。由上到下，元素-属性集-属性就是一个元素的基本架构。通过配置web系统中的元素，构成完整的元素库。</p>
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <h3>元素库配置方法</h3>
                        <p>在Web网站自动化测试系统中，每个被测系统下的功能点都会拥有一个自己的元素库。整个元素库的配置方法如下：</p>
                        <p>(1)添加UI,输入UI名称和UI描述；</p>
                        <figure>
                            <img src="@/assets/images/infrastructure/8.png" alt="">
                            <figcaption>图8 利用浏览器查看百度首页的元素</figcaption>
                        </figure>
                        <p>(2)选择相应的UI，添加元素，为元素选择控件类型，将元素与自动化构件相关联，为元素选择主定位属性如id、name、text、xpath等，并写入对应的主定位属性值；</p>
                        <figure>
                            <img src="@/assets/images/infrastructure/9.png" alt="">
                            <figcaption>图9 添加元素</figcaption>
                            <img src="@/assets/images/infrastructure/10.png" alt="">
                            <figcaption>图10 调整元素信息</figcaption>
                        </figure>
                    </div>
                </div>
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
                <div>
                    <h2>基础脚本</h2>
                    <div>
                        <h3>基础脚本的参数化原理</h3>
                        <p>ATF支持数据驱动脚本的功能，即测试数据不放在测试脚本中，而是由数据中心统一管理，实现测试脚本和测试数据分离，方便脚本的维护。数据驱动是通过参数化实现的，即测试脚本中的参数不是固定值，而是与数据中心的数据表格作关联，从数据表格中配置具体数据，这个与数据表格作关联的过程称为测试脚本的参数化。ATF支持批量自动参数化操作。</p>
                        <p>脚本管理功能实现tcdl（用例描述语言）脚本语句的生成、解析、批量处理（参数化）、根据数据生成用例脚本、生成目标代码等功能，是ATF工具中脚本管理的核心。</p>
                        <p>语句样例：</p>
                        <pre>   对象操作Ui(“uiname”).WebEdit(“eleName”).Set(datatable(“elemenname”));</pre>
                        <p>即需要支持连续函数调用，调用一个构造函数返回一个对象，再继续调用返回对象的函数。</p>
                        <p>直接函数调用：<code>funName(“abcd”);</code></p>
                        <p>工具类的静态函数调用：<code>Reporter.Log(“dfs”);</code></p>
                        <p>函数的参数可以为零个，可以为多个，多个参数以逗号分隔。每个参数为一个表达式。</p>
                        <p>表达式支持以下类型及其组合：</p>
                        <p>原子值：字符串常量（双引号包含），小数，整数，布尔值（true/false）；</p>
                        <p>变量名：用于引用变量的值；</p>
                        <p>工具类的属性（类似于java中类的静态编写）：格式如 类名.属性；</p>
                        <p>四则运算：<code>+ - * /</code>；</p>
                        <p>字符串拼接：<code>&</code>；</p>
                        <p>函数调用：<code>1+add(2,4)</code>；</p>
                        <p>改变优先级：<code>()</code>；</p>
                        <p>逻辑运算符： <code>and or</code>；</p>
                        <p>序列：用<code>[]</code>包含，参见json格式或python数组的设计，代表数组或链表的数据结构；</p>
                        <p>字典：格式为<code>{“key”: “value”, “key2”, “value2”}</code>。代表键值对集合。</p>
                        <p>变量类型处理：变量为若类型，即不需要指定类型，编译器自行猜测变量类型</p>
                        <p>获取数据相关函数，数据中心的数据分为几种，不同数据池中的数据生命周期和作用域不同：</p>
                        <p>（1）数据表格中的数据<code>Data.TableColumn(“列名”)；</code></p>
                        <p>（2）流程用例数据池，流程用例的各节点可以共享，<code>Data.Flow(“数据名”)</code></p>
                        <code>Data.CaseNode(“节点名”, “数据名”)</code> 指定流程节点中的流程数据；
                        <p>（3）场景中的配置数据<code>Data.Scene(“数据名”)</code>，只读，只能配置，运行时不可修改场景中的共享数据<code>Data.SceneGlobal(“数据名”)</code>，运行时可读写组合用例中的数据；</p>
                        <p>（4）环境数据：<code>Data.Env(“数据名”)</code>,内置变量名，值不可修改，获取操作系统名称等；</p>
                        <p>（5）数据生成器：随机数值，随机字母，当前日期；</p>
                        <p>（6）内置函数列表：字符串处理，日期处理，流式函数调用。</p>
                        <p>Tcdl的语言有两种，一种是调用元素库中的对象操作方法，一种是调用公共的工具方法。</p>
                        <p>对应对象操作方法调用，支持自动参数化功能。操作方法的参数在“自动化控件管理”的抽象架构中进行了定义：某操作方法有哪些参数，哪些参数需要参数化，参数化后的列名是什么。</p>
                        <p>自动参数化的处理步骤为：</p>
                        <p>（1）先获取抽象架构中方法参数的配置；</p>
                        <p>（2）如果某参数设置了要进行参数化，则将此参数值改为<code>Data.TableColumn(“列名”)</code>的形式，表示从数据中心的数据配置表格中的“列名”列获取值。列名由参数化配置指定，并且支持变量替换，替换变量的格式为<code>${变量名}</code>，内置的替换变量名有element：元素名称；</p>
                        <p>（3）如果该参数未配置参数化，则保留原值。</p>
                        <p>例如：<code>ui(“主页”).WebEdit(“登录名”).Set(“dsf”)</code>，</p>
                        <p>表示ui（主页）的WebEdit控件（登录名）采用Set方法且写死填入值"dsf"</p>
                    </div>
                    <div>
                        <h3>目标代码的生成</h3>
                        <p>目标代码生成之前需要先生成用例脚本。</p>
                        <p>用例脚本生成过程：</p>
                        <p>先分析模板脚本中的代码，然后依次处理各语句，语句类型为对象方法调用。</p>
                        <p>获取方法的参数：</p>
                        <p>（1）方法无参数的情况，如果未设置<code>@display</code>，则直接输出原语句；如果设置了<code>@display</code>，则根据<code>DataTable</code>中的值进行判断：<code>DataTable</code>中值不为空，则输出原语句，为空则不输出。</p>
                        <p>（2）方法有参数时，依次分析各参数表达式：</p>
                        <p>参数表达式中依次分析各原子值，原子值类型为</p>
                        <p>1）	常量值，直接输出；</p>
                        <p>2）	固定值获取：流程变量，场景变量，内部变量时，直接输出；</p>
                        <p>3）	参数化数据表格中的值：<code>Data.Table(“列名”)</code>，则从数据表格中获取参数值，获取后根据不同情况进行处理；</p>
                        <p>参数值的处理：</p>
                        <p>留空：则不输出此语句，但是要输出步骤编排中的步骤；</p>
                        <p>空值（nil）：参数值取空字符串<code>“”</code>；</p>
                        <p>Null，程序中的<code>null</code>值；</p>
                        <p><code>{expr=}</code>表达式，检查是否符合规范，符合的直接输出，不符的报错；</p>
                        <p>常量值：默认为常量字符串；</p>
                        <p>编排步骤的处理：</p>
                        <p>以---分隔的表示在步骤前插入还是在步骤后插入，可以编写任意的tcdl语句，但是表达式中的参数不能再写参数化到数据表格。</p>
                        <p>目标语言生成具体执行时才即时生成。</p>
                        <p>对象方法调用：</p>
                        <p>固定值不可修改，实际上是取固定配置。可配置时生成配置的，参数处理，运算符直接输出，函数类型：数据池除了运行时变量（流程数据，用例内变量）其他的为可确定的值，换成具体值。数据类型支持序列和字典目标代码参数替换：。替换参数形式为：<code>{{paramsName}}</code>，则替换成传入的参数值。</p>
                        <p>参数值为常量值的，直接替换，字符串加<code>“”</code>，数值直接输出，序列和字典根据不同语言替换成对应语言的。</p>
                        <p>参数值为表达式的，将表达式中确定的量改为固定值，不固定的量（目前只有用例内部产生的变量）改为语言对应的，注意数据类型识别。</p>
                    </div>
                </div>
                <div>
                    <h2>执行机管理</h2>
                    <p>进入ATF首页，点击“系统管理”，点击“执行机管理”，便可在页面上查看目前所有正在启用中的执行机信息。</p>
                    <figure>
                        <img src="@/assets/images/infrastructure/13.png" alt="">
                        <figcaption>图13 执行机管理页面</figcaption>
                    </figure>
                    <p>在执行机管理页面中选中一台执行机，点击“日志查看”，便可实时查看执行机运行时的日志。</p>
                    <figure>
                        <img src="@/assets/images/infrastructure/14.png" alt="">
                        <figcaption>图14 执行机日志查看</figcaption>
                    </figure>
                    <p>在执行机管理页面中，点击“执行机安装包下载”即可下载zip格式的执行机压缩包，将压缩包解压以后，按照文件夹内执行机说明的指示即可使用执行机。</p>
                    <figure>
                        <img src="@/assets/images/infrastructure/15.png" alt="">
                        <figcaption>图15 执行机安装包内文件</figcaption>
                    </figure>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'TestInfrastructure',
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
           msg: '',
           paramsName: '${{参数名}}'
        }
    },
    computed: {
        prop () {
            let data = {
                subfield: false,// 单双栏模式
                defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
                editable: false,
                toolbarsFlag: false,
                scrollStyle: true
            }
            return data
        }
    },
    methods: {
        readFile() {
                this.$axios.get('/static/docs/infrastructure.md').then((response) => {
                    // console.log(response.data)
                    this.msg = response.data
                })
        }
    },
    mounted() {
        // this.readFile()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .project {
        padding: 15px;
        height: 100%;
        overflow-y: scroll;
    }
    .main-title {
        padding-bottom: .3em;
        font-size: 2em;
        border-bottom: 1px solid #eaecef;
    }
    .component {
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
    }
</style>
