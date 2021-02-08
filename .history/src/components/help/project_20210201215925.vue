<template>
    <div class="project" :id="'project-' + project.id">
        <div class="inner">

            <div class="project-header">
                <div class="project-title">
                    <span>{{project.name}}</span>
                </div>
            </div>

            <div class="project-tag">
                <i class="fa fa-tags" aria-hidden="true"></i>
                <a href="#" v-for="tag in project.tags" :key="tag">{{tag}}</a>
            </div>
            <!--<div class="project-desc" v-html="project.desc"></div>-->
            <div class="project-content" :id="'content' + project.id">

                <div class="main" v-if="showshort" v-html="project.shortIntro">
                </div>
                <div class="main" v-else v-html="project.content">
                </div>

            </div>
            <div class="no-show">
                <div class="project-content-copy" :id="'content-copy' + project.id">
                    <div class="main" v-html="project.content"></div>
                </div>
            </div>

            <div class="project-url">

                <a :href="project.home " v-if="project.hasHome" target="_blank" class="project-link">
                    <i class="fa fa-home custom-fa" aria-hidden="true"></i>
                    <span>{{config.homeText}}</span>
                </a>

                <a :href="project.code" target="_blank" v-if="project.hasCode" class="project-link">
                    <i class="fa fa-code custom-fa" aria-hidden="true"></i>
                    <span>{{config.codeText}}</span>
                </a>

                <a class="github-button" v-if="project.github.star" :href="'https://github.com/' + project.github.repo "
                   data-icon="octicon-star"
                   :data-count-href="'/'+ project.github.repo + '/stargazers'"
                   :data-count-api="'/repos/'+ project.github.repo +'#stargazers_count'"
                   data-count-aria-label="# stargazers on GitHub"
                   :aria-label="'Star' + project.github.repo+  'on GitHub'"
                   style="display: none">Star</a>


                <a class="github-button" v-if="project.github.fork" :href="'https://github.com/' + project.github.repo"
                   data-icon="octicon-repo-forked"
                   :data-count-href="'/' + project.github.repo + '/network'"
                   :data-count-api="'/repos/' + project.github.repo + '#forks_count'"
                   data-count-aria-label="# forks on GitHub"
                   :aria-label="'Fork'+ project.github.repo +'on GitHub'"
                   style="display: none">Fork</a>

                <a href="javascript:void(0)" @click="expand" v-if="project.hasShortIntro" class="project-link expand">
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
        props: ["project", "showshort", "config"],
        data: function () {
            return {
                isExpand: false
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

<style lang="less">

@import "@/styles/help/markdown.less";
@import "@/styles/help/project.less";

</style>