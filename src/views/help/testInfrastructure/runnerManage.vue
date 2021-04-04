<template>
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