<template>
    <nav class="menu menu-vertical" :class="{ 'menu-collapse': isCollapse, 'menu-expand':!isCollapse}" >
        <div class="header">
            <i class="fa fa-bars" aria-hidden="true" @click="collapse"></i>
        </div>

        <div class="side-outer" id="side-outer">
            <div v-if="showByCategory">
                <div class="category" v-for="(values, key) in categoryMap" :key="key">
                    <div class="title">
                        <i class="fa fa-inbox" aria-hidden="true"></i>
                        <span>{{key}}</span>
                    </div>

                    <div v-if="values.length != 0" class="content">
                        <div class="item" v-for="v in values" :key="v.id"><a @click="goTop('#project-' + v.id)" data-scroll>{{v.keyword}}</a>
                        </div>

                    </div>
                </div>
            </div>
            <div v-else>
                <div class="category">
                    <div v-if="projects.length != 0" class="content ">
                        <div class="item extra-space" v-for="p in projects" :key="p.id"><a :href="'#project-' + p.id" data-scroll>{{p.keyword}}</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import eventHub from "../../config/event/EventHub"
export default {
    props:{
            categoryMap: {
                type:  Object,
                default: {}
            },
            showByCategory: {
                type: Boolean,
                default: true
            },
            isCollapse: {
                type: Boolean,
                default: false
            },
            projects: {
                type: Array,
                default: []
            },
        },
    computed: function() {
        var vm = this;
        eventHub.$on('collapseClick', function(isCollapse){
            if(!isCollapse) {
                vm.collapse();
            }
        });
    },
    data() {
        return {
            isCollapse: false
        }
    },
    methods: {
        collapse: function () {
            let vm = this;
            let content = document.getElementById("side-outer");
            if (!vm.isCollapse && content) {
                vm.isCollapse = !vm.isCollapse;
                setTimeout(function () {
                    content.style.display = "none";
                }, 350);

            } else {
                vm.isCollapse = !vm.isCollapse;
                //console.log(222);
                content.style.display = "block";
            }

            vm.$emit('collapse_click', vm.isCollapse);

        },
        goTop(id){
            document.querySelector(id).scrollIntoView(true);
        }
    }


}
</script>

<style lang="less" scoped>
    @import "../../styles/help/sidebar.less";
</style>