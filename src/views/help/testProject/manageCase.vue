<template>
    <div>
        <h2>测试用例管理</h2>
        <div>
            <h3>添加用例</h3>
            <p>点击功能按钮组的添加按钮，打开添加用例的模态框，可以选择添加单用例和流程用例，配置用例名称、所属被测系统、功能点、基础脚本、用例性质等信息可以完成用例的添加，图4展示的是单用例的添加，图5展示的是流程用例的添加，流程用例配置时可以为流程用例添加多个流程节点。</p>
            <figure>
                <img src="@/assets/images/project/4.png" alt="">
                <figcaption>图4 添加单用例 </figcaption>
                <img src="@/assets/images/project/5.png" alt="">
                <figcaption>图5 添加流程用例 </figcaption>
            </figure>
        </div>
        <div>
            <h3>查看和修改用例详情</h3>
            <p>如图6所示，点击表格指定行的查看按钮，会弹出用例详情模态框，可以查看该用例的详情；如图7所示，点击右侧的“修改”按钮，打开修改模态框，可以修改相应的用例属性，点击“修改”按钮，可对修改操作进行保存。</p>
            <figure>
                <img src="@/assets/images/project/6.png" alt="">
                <figcaption>图6 查看用例详情 </figcaption>
                <img src="@/assets/images/project/7.png" alt="">
                <figcaption>图7 修改用例信息 </figcaption>
            </figure>
        </div>
        <div>
            <h3>导入用例</h3>
            <p>如图8所示，点击“导入”按钮，弹出导入用例模态框，先点击“模板下载”按钮下载用例模板，然后按照模板格式进行编写，编写完成后点击“选择文件”按钮选择本地写好的用例文件，点击“导入”进行上传。</p>
            <figure>
                <img src="@/assets/images/project/8.png" alt="">
                <figcaption>图8 导入模板用例 </figcaption>
            </figure>
        </div>
        <div>
            <h3>导入记录</h3>
            <p>如图9所示，点击“导入记录”按钮，进入导入记录页面，可以查看用例的全部导入记录，可以根据上传者、导入状态、导入时间进行条件筛选。点击上方的“导入”按钮可以进行用例的导入，点击“返回”按钮可以返回上一级页面。</p>
            <figure>
                <img src="@/assets/images/project/9.png" alt="">
                <figcaption>图9 导入记录 </figcaption>
            </figure>
        </div>
        <div>
            <h3>导出用例</h3>
            <p>如图10所示，先在表格中选中想要导出的用例，点击页面上方的“导出”按钮，即可完成用例的导出操作，系统支持单个导出和批量导出。</p>
            <figure>
                <img src="@/assets/images/project/10.png" alt="">
                <figcaption>图10 导出用例 </figcaption>
            </figure>
        </div>
        <div>
            <h3>更改多种用例信息</h3>
            <p>如图11所示，首先在表格中选中需要更改执行方式的用例，然后点击页面上方的“更改多种用例信息”按钮，可以进行被测系统、功能点、基础脚本、用例性质的更改。</p>
            <figure>
                <img src="@/assets/images/project/11.png" alt="">
                <figcaption>图11 更改多种用例信息 </figcaption>
            </figure>
        </div>
        <div>
            <h3>添加流程节点</h3>
            <p>如图12，选中流程用例，可以为流程用例添加流程节点，同流程用例添加时节点的配置。</p>
            <figure>
                <img src="@/assets/images/project/12.png" alt="">
                <figcaption>图12 添加流程节点 </figcaption>
            </figure>
        </div>
        <div>
            <h3>删除流程节点</h3>
            <p>如图13所示，选择指定的流程节点，点击删除功能按钮，即可删除指定的流程节点。</p>
            <figure>
                <img src="@/assets/images/project/13.png" alt="">
                <figcaption>图13 删除流程节点 </figcaption>
            </figure>
        </div>
        <div>
            <h3>筛选用例</h3>
            <p>点击左侧菜单“项目测试” > “测试用例管理”，进入测试用例管理页面，页面如图14所示：</p>
            <figure>
                <img src="@/assets/images/project/14.png" alt="">
                <figcaption>图14 筛选用例 </figcaption>
            </figure>
            <p>如图15所示，点击“显示筛选”按钮，展开筛选条件面板，用户可根据实际情况添加多组筛选条件，可以选择被测系统等筛选条件，根据筛选操作与比较值取值的不同进行用例的筛选过滤。</p>
            <figure>
                <img src="@/assets/images/project/15.png" alt="">
                <figcaption>图15 查询用例 </figcaption>
            </figure>
            <p>查询完成之后点击“取消筛选”按钮即可收起筛选。</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ManageCase",
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