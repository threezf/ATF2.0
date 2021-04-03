<template>
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