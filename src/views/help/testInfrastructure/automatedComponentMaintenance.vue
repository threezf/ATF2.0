<template>
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