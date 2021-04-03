<template>
    <div>
        <h2>测试项目的建立与管理</h2>
        <p>ATF 自动化测试项目中将测试流程分解为一个个的测试项目。每个测试项目都包含多个测试用例、测试脚本等数据。测试工作也是从某个测试项目开始的。</p>
        <p>测试项目管理系统包含的功能有添加测试项目、修改测试项目、管理功能点、对测试项目的批量查询和模糊查询，其界面如图1所示：</p>
        <figure>
            <img width="80%" src="@/assets/images/project/1.png" alt="">
            <figcaption>图1 自动化构件管理-开发构架</figcaption>
        </figure>
        <p>点击页面上方的添加按钮，就可以建立一个新的测试项目。如图2所示，需要在测试项目名称输入框填写该项目的语义化名称，项目名称要能体现进行该项目的目的或者目标。测试项目编号一般用一串数字来表示，比如与日期相关的编号，或者与系统相关联的编号。描述用来详细的描述该项目，包括项目的发起人，要测试的系统、功能点，以及该项目的执行时间等，项目时间一般用来声明该项目的开始与结束时间。</p>
        <figure>
            <img src="@/assets/images/project/2.png" alt="">
            <figcaption>图2 新建测试项目</figcaption>
        </figure>
        <p>已存在的测试项目也可以进行修改操作。为了方便查找测试项目，ATF测试项目提供了按条件检索相应的测试项目的功能。我们可以根据测试项目名称查找符合要求的项目。在输入框中输入要查找的关键字，可以是项目名称或者项目编号，系统就会筛选出符合条件的测试项目。如图3所示，本系统中使用的是模糊查询的方法，也就是只要包含了关键字的测试项目，都可以被查找出来。</p>
        <figure>
            <img src="@/assets/images/project/3.png" alt="">
            <figcaption>图3 测试项目查询 </figcaption>
        </figure>
    </div>
</template>

<script>
export default {
    name: "ManageProject",
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