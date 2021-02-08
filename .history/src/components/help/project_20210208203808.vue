<template>
    <div class="project" :id="'project-' + project.id">
        <div class="inner">

            <div class="project-header">
                <div class="project-title">
                    <span>{{project.keyword}}</span>
                </div>
            </div>

            <div class="project-tag">
                <i class="fa fa-tags" aria-hidden="true"></i>
                <a >作用：{{project.explain}}</a>
            </div>
            <!--<div class="project-desc" v-html="project.desc"></div>-->
            <div class="project-content" :id="'content' + project.id">
                <div class="main" >
                    <span>{{project.operation}}</span>
                    <div class="project-link">
                        <i class="octicon octicon-star" aria-hidden="true">参数：{{project.paramList.param}}</i>
                        <span>参数：{{project.paramList.param}}</span>
                    </div>

                    <div class="project-link">
                        <i class="octicon octicon-repo-forked" aria-hidden="true"></i>
                        <span>类型：{{project.paramList.param}}</span>
                    </div>
                </div>
            </div>
            <div class="no-show">
                <div class="project-content-copy" :id="'content-copy' + project.id">
                    <div class="project-link">
                        <i class="octicon octicon-star" aria-hidden="true">参数：{{project.paramList.param}}</i>
                        <span>参数：{{project.paramList.param}}</span>
                    </div>

                    <div class="project-link">
                        <i class="octicon octicon-repo-forked" aria-hidden="true"></i>
                        <span>类型：{{project.paramList.param}}</span>
                    </div>
                </div>
            </div>
            <div class="project-url">

                <div class="project-link">
                    <i class="fa fa-code custom-fa" aria-hidden="true">{{project.remark}}</i>
                    <span>{{project.remark}}</span>
                </div>
                <a href="javascript:void(0)" @click="expand" class="project-link expand">
                    <i class="fa " :class="{'fa-angle-double-down': showshort, 'fa-angle-double-up': !showshort}"
                       aria-hidden="true"></i>
                    <span>{{showshort ?  config.expandText: config.collapseText}}</span>
                </a>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        props:{
            project: {
                type: Object,
                default: {}
            },
            config: {
                type: Object,
                default: {}
            },
        },
        data: function () {
            return {
                showshort: true
            }
        },
        methods: {

            expand: function () {
                let vm = this;
                if(vm.showshort) {
                    vm.showshort = !vm.showshort;
                } else {
                    setTimeout(function () {
                        vm.showshort = !vm.showshort;
                    }, 500);
                }
                let content = document.querySelector("#content" + vm.project.id);
                if (!vm.hasPreHeight) {
                    vm.preHeight = document.querySelector('#content-copy' + vm.project.id).clientHeight;
                    content.style.height = content.clientHeight + "px";
                    vm.hasPreHeight = true;
                    //console.log(vm.preHeight);
                }

                let heightCopy = content.clientHeight;
                content.style.height = vm.preHeight + "px";
                vm.preHeight = heightCopy;


            }
        }
    }


</script>

<style lang="less" scoped>

@import "../../styles/help/markdown.less";
@import "../../styles/help/project.less";

</style>