<template>
    <div>
        <h2>测试资源管理</h2>
        <div>
            <h3>测试资源管理简介</h3>
            <p>如图16所示，编写完测试用例，并且已经准备好测试数据和测试脚本，就可以对测试脚本进行了参数化之后，参数化后就拥有了进行测试的基本资源。这时，为了在测试前将各个资源结合起来，就需要在测试资源管理系统中统一管理这些资源。</p>
            <p>测试资源管理中，首先根据条件筛选出所需要的多个项目，然后在给出的项目中选择特定的系统、功能点以及脚本，查看对应的资源列表。</p>
            <p>下图是测试资源的筛选项。可以根据用例的属性、所属的系统等各个条件筛选出相应的项目。</p>
            <figure>
                <img src="@/assets/images/project/16.png" alt="">
                <figcaption>图16 测试资源查询</figcaption>
            </figure>
            <p>选择相应的测试项目之后，就可以查看其中的测试资源列表。资源列表中，有以下几个方面：查看脚本、用例编号、所属测试点、测试意图、测试步骤、预期结果。如图17所示：</p>
            <figure>
                <img src="@/assets/images/project/17.png" alt="">
                <figcaption>图17 测试资源管理</figcaption>
            </figure>
        </div>
        <div>
            <h3>测试资源编辑</h3>
            <p>项目的测试资源管理列表实现了类似于Excel的功能，可以实现批量的复制、剪切、粘贴功能，可以方便用户进行数据的编辑工作。同时，ATF项目也提供了对脚本内容进行编辑的功能。通过点击可编辑的单元格，实现对单元格内脚本内容的编辑。</p>
            <p>在编辑界面中，可以直接编辑脚本的内容，也可以为测试脚本添加前置操作与后置操作。编辑内容的界面如图18所示：</p>
            <figure>
                <img src="@/assets/images/project/18.png" alt="">
                <figcaption>图18 编辑数据项（去除语句）</figcaption>
            </figure>
            <p>编辑的数据有四种类型可以选择：文本、空文本、去除语句和表达式。下面逐一介绍四种类型。</p>
            <ul>
                <li>文本类型：可以在输入框中输入常见的字符串文本。</li>
                <li>空文本和去除语句：可以使用系统固定的文本填充到数据表格中。</li>
                <li>选择表达式：可以在表达式中插入数据或者函数。插入数据如图19所示：</li>
            </ul>
            <figure>
                <img src="@/assets/images/project/19.png" alt="">
                <figcaption>图19 编辑数据项（表达式）</figcaption>
            </figure>
            <p>如图20所示，数据取自数据池中，有如下几种类型：用例内部变量、流程用例数据、组合用例数据、场景数据、全局数据、环境数据等。点击确定后，就会自动补充在表达式文本框中。下图是插入了一条用例内部变量之后的文本。</p>
            <figure>
                <img src="@/assets/images/project/20.png" alt="">
                <figcaption>图20 插入用例内部变量</figcaption>
            </figure>
            <p>如图21所示，也可以向表达式中插入函数，选择了相应的函数名称，并填写各个参数之后，系统也会向表达式输入框中自动填充相应的内容：</p>
            <figure>
                <img src="@/assets/images/project/21.png" alt="">
                <figcaption>图21 自动填充表达式内容</figcaption>
            </figure>
            <p>还可以通过添加操作项的方式，向表达式中添加前置操作与后置操作。首先，点击编辑框中的“添加多项”按钮，会弹出如下操作框。操作框的上侧是由UI和UI所包含的元素组成的树结构，下侧是在系统配置中所配置的函数集合。如图22所示：</p>
            <figure>
                <img src="@/assets/images/project/22.png" alt="">
                <figcaption>图22 选择操作项与方法</figcaption>
            </figure>
            <p>如图23所示，选择了要添加的操作项后就会在操作项列表中新增一条记录。我们可以对这条记录进行修改、删除以及拖动排序等等。</p>
            <figure>
                <img src="@/assets/images/project/23.png" alt="">
                <figcaption>图23 前置操作</figcaption>
            </figure>
            <p>完成前置操作、后置操作的配置后，点击确定按钮，系统就会向数据表格中回填相应的内容，如图24所示：</p>
            <figure>
                <img src="@/assets/images/project/24.png" alt="">
                <figcaption>图24 数据回填</figcaption>
            </figure>
        </div>
        <div>
            <h2>测试场景的配置</h2>
            <p>完成基本的测试资源配置之后，就可以为测试项目添加测试场景，还可以为测试场景添加一些配置。</p>
            <p>首先在场景管理页面，选择一个场景进行配置，如图25所示。</p>
            <figure>
                <img src="@/assets/images/project/25.png" alt="">
                <figcaption>图25 选择场景配置</figcaption>
            </figure>
            <p>场景配置的界面如图26所示：</p>
            <figure>
                <img src="@/assets/images/project/26.png" alt="">
                <figcaption>图26 选择场景配置</figcaption>
            </figure>
            <p>在场景配置界面中，可以进行以下功能：添加用例、移除用例、设置定时执行、管理定时任务、触发器设置、执行过程控制数据资源池配置以及保存顺序等。</p>
            <div>
                <h3>配置测试用例</h3>
                <p>如图27所示，可以根据当前测试的需求为场景添加测试用例。点击页面上方的“用例添加”按钮，打开用例选择界面，在该界面选择要添加的测试用例，便可向当前场景中添加测试用例。</p>
                <figure>
                    <img src="@/assets/images/project/27.png" alt="">
                    <figcaption>图27 添加场景用例</figcaption>
                </figure>
                <p>如图28所示，也可以移除场景中已经存在的用例。</p>
                <figure>
                    <img src="@/assets/images/project/28.png" alt="">
                    <figcaption>图28 移除用例</figcaption>
                </figure>
            </div>
            <div>
                <h3>设置定时执行</h3>
                <p>如图29所示，在场景中，可以设置该场景的定时执行。设置了定时执行后，可以指定特定的时间条件下执行测试任务。</p>
                <figure>
                    <img src="@/assets/images/project/29.png" alt="">
                    <figcaption>图29 设置定时执行</figcaption>
                </figure>
            </div>
            <div>
                <h3>管理定时任务</h3>
                <p>ATF支持对定时任务进行管理，可以更新、取消以及立刻发起对定时任务的执行，如图30所示。</p>
                <figure>
                    <img src="@/assets/images/project/30.png" alt="">
                    <figcaption>图30 管理定时任务</figcaption>
                </figure>
            </div>
            <div>
                <h3>触发器设置</h3>
                <p>在测试场景中，可以通过设置该场景的触发器，指定某些测试用例在符合触发条件时自动执行。</p>
                <p>场景中配备了触发器管理系统，可以进行触发器的新增、删除和修改，具体如图31所示。</p>
                <figure>
                    <img src="@/assets/images/project/31.png" alt="">
                    <figcaption>图31 触发器设置</figcaption>
                </figure>
                <p>点击“新增”按钮，弹出新增触发器的界面。在编辑页面中，需要填写如下几个方面的数据：触发器名称、描述、执行时机、执行条件、执行动作等，如图32所示。</p>
                <figure>
                    <img src="@/assets/images/project/32.png" alt="">
                    <figcaption>图32 新增触发器</figcaption>
                </figure>
                <p>触发器名称：表示该触发器在管理系统中的名字。</p>
                <p>触发器描述：填写该触发器的详细描述，包括用途、场景、大致的执行条件等内容。</p>
                <p>执行时机用来配置触发器在何时被执行。可选项包括如下几种：</p>
                <p class="list">1. 场景执行前：在所在的场景执行之前执行。</p>
                <p class="list">2. 场景执行后：在所在的场景执行之后执行。</p>
                <p class="list">3. 用例执行前：在指定的用例执行之前执行。</p>
                <p class="list">4. 用例执行后：在指定的用例执行之后执行。</p>
                <p class="list">5. 元素对象方法执行前：在元素对象方法执行之前执行。</p>
                <p class="list">6. 元素对象方法执行后：在元素对象方法执行之后执行。</p>
                <p>执行条件可以实现配置触发器在特定条件下触发执行。有三种条件组合：满足所有条件、满足任一条件和无条件限制。</p>
                <p>执行动作用来配置触发器执行时所执行的具体的脚本指令。可以指定不止一个动作。</p>
            </div>
            <div>
                <h3>执行过程控制</h3>
                <p>如图33所示，测试场景中，可以通过设置该场景执行过程中的策略，来决定在执行过程中的行为。</p>
                <figure>
                    <img src="@/assets/images/project/33.png" alt="">
                    <figcaption>图33 执行过程控制</figcaption>
                </figure>
                <p>执行策略有如下几个级别：用例级、流程节点级、组合用例级、错误处理模式级。</p>
                <ul>
                    <li>用例级别：可以设置执行状态策略。</li>
                    <li>流程节点级别和组合用例级别：可以设置起始节点策略、执行顺序策略和执行状态策略。</li>
                    <li>错误处理模式：可以设置出错后如何处理。</li>
                </ul>
            </div>
            <div>
                <h3>数据资源池配置</h3>
                <p>测试场景中，可以进行数据资源池配置。如图34所示：</p>
                <figure>
                    <img src="@/assets/images/project/34.png" alt="">
                    <figcaption>图34 执行过程控制</figcaption>
                </figure>
                <p>如图35所示，点击新增按钮，可以新增一条数据。</p>
                <figure>
                    <img src="@/assets/images/project/35.png" alt="">
                    <figcaption>图35 新增数据池</figcaption>
                </figure>
                <p>完成了以上各个项目的设置，就基本完成了测试场景的配置。接下来可以针对该场景执行测试的后续步骤了。</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "ManageSource",
    data() {
        return {

        }
    }
}
</script>

<style scoped lang="less">
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
    ul li {
        text-indent: 4em;
    }
    ul li::before {
        content: '- '
    }
    .list {
        text-indent: 3em;
    }
</style>