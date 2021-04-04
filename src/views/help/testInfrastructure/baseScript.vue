<template>
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
</template>

<script>
export default {
    data() {
        return {
            paramsName: '${{参数名}}',
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