<template>
    <div>
        <h2>测试计划及执行配置</h2>
        <p>发起测试之前应该对测试计划和执行进行配置。测试计划代表一次完整的测试过程中所包含的所有测试对象和测试流程。每个测试计划包括测试阶段、测试轮次以及包含在该计划中的测试用例，既可以对某个完整的场景进行测试，也可手动添加若干测试用例。具体操作页面见图36。</p>
        <figure>
            <img src="@/assets/images/project/36.png" alt="">
            <figcaption>图36 测试计划及执行界面</figcaption>
        </figure>
        <p>在执行某个测试计划之前，还需要对该执行范围进行配置，执行范围代表本次执行要对计划中的哪些用例进行测试，如图37所示。</p>
        <figure>
            <img src="@/assets/images/project/37.png" alt="">
            <figcaption>图37 测试计划及执行</figcaption>
        </figure>
        <p>点击添加场景可以将之前配置过的测试场景内所有用例打包添加进测试中，在场景列表中可以查看等待测试执行的用例，如图38所示。</p>
        <figure>
            <img src="@/assets/images/project/38.png" alt="">
            <figcaption>图38 新增场景界面</figcaption>
        </figure>
        <p>确定好执行用例后点击批量执行按钮，用例将按照配置好的执行计划在执行机中进行测试。</p>
        <p>执行完毕后可以通过点击用例旁边的查看按钮查看执行结果记录， 如图39与图40所示。</p>
        <figure>
            <img src="@/assets/images/project/39.png" alt="">
            <figcaption>图39 节点与执行状态</figcaption>
            <img src="@/assets/images/project/40.png" alt="">
            <figcaption>图40 执行状态</figcaption>
        </figure>
        <div>
            <h3>
                <p>用例执行实例的种类分为九种，见下表。</p>
                <el-table :data="tableData" border stripe highlight-current-row style="width: 80%; margin: 10px auto;">
                    <el-table-column label="来源编号" width="50" prop="id"></el-table-column>
                    <el-table-column label="来源" prop="source"></el-table-column>
                    <el-table-column label="是否入库保存" prop="flag"></el-table-column>
                    <el-table-column label="执行类别" prop="type"></el-table-column>
                    <el-table-column label="定位方式" prop="method"></el-table-column>
                </el-table>
                <p>入库的执行实例（场景中的执行实例）的执行记录单通过用例执行实例id+执行轮次+执行次数（可选）区分。不入库的临时执行实例（用例脚本调试、模板脚本调试）需要保存记录单，通过来源渠道+用例id+模板id+数据名称+执行轮次+执行次数（可选）区分。</p>
                <p>每个用例可以上传多个记录单，当用例有上传的记录单并且没有未解决的问题单时，则执行成功；有未解决的问题单，则执行失败；无记录单且没有未解决的问题单算未执行；流程用例只有部分节点执行成功时算未完成。</p>
                <p>点击批量执行查询即可查看执行结果，如图41所示。</p>
                <figure>
                    <img src="@/assets/images/project/41.png" alt="">
                    <figcaption>图41 批次执行查询</figcaption>
                </figure>
                <p>点击批次执行查询的“查看记录单”按钮可以跳转查看本次执行生成的记录单，如图42所示。</p>
                <figure>
                    <img src="@/assets/images/project/42.png" alt="">
                    <figcaption>图42 执行记录单</figcaption>
                </figure>
                <p>点击执行报告可以查看执行场景的执行结果，如图43所示。</p>
                <figure>
                    <img src="@/assets/images/project/43.png" alt="">
                    <figcaption>图43 执行结果</figcaption>
                </figure>
            </h3>
        </div>
        <div>
            <h2>测试结果的统计分析</h2>
            <p>系统提供了对执行结果记录进行统计的功能。</p>
            <p>1. 按执行批次统计：可以统计出同一执行批次内的执行成功数、失败数、跳过数、总数、激活记录单数和未激活记录单数。可以选择其中一项或多项进行统计。</p>
            <p>2. 按执行轮次统计：可以统计出同一执行轮次内的执行成功数、失败数、总数。</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "tesPlan",
    data() {
        return {
            tableData: [{
               id: '1',
               source: '直接加入测试阶段和测试轮次的用例',
               flag: '是',
               type: '正式执行和调试',
               method: '测试阶段+测试轮次+用例id'
           }, {
               id: '2',
               source: '加入场景后再加入执行阶段和测试轮次的用例',
               flag: '是',
               type: '正式执行和调试',
               method: '测试阶段+测试轮次+用例id'
           }, {
               id: '3',
               source: '加入场景的用例',
               flag: '是',
               type: '调试',
               method: '场景id+用例id'
           }, {
               id: '4',
               source: '用例脚本编写阶段，调试时生成的临时实例',
               flag: '否',
               type: '调试执行',
               method: '用例id'
           }, {
               id: '5',
               source: '用例脚本编写阶段，调试时生成的临时实例',
               flag: '否',
               type: '调试执行',
               method: '测试阶段+测试轮次+用例id'
           }, {
               id: '6',
               source: '仅加入测试阶段的用例，作为辅助查询，不能执行或调试',
               flag: '是',
               type: '不可执行',
               method: '测试阶段+用例id'
           }, {
               id: '7',
               source: '仅加入测试阶段场景，作为辅助查询，不能执行或调试',
               flag: '是',
               type: '不可执行',
               method: '测试阶段+场景id+用例id'
           }]
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