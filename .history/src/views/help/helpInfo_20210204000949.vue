<template>
  <div class="page-outer">
    <sidebar @collapse_click="collapseClick" :categoryMap="categoryMap" :showByCategory="showByCategory"
              :projects="projects" id="sidebar"></sidebar>
    <div class="project-container" id="project-container">
        <project v-for="project in projects" :project="project"  :config="config" :key="project.id">
        </project>
    </div>
  </div>
</template>
<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import project from '@/components/help/project'
import sidebar from '@/components/help/sidebar'
import { getJsonDataApi } from '../../libs/account';
export default {
    name: ' Help',
    mixins: [VueMixins], // 混入
    components: {
        project,        
        sidebar
    },
    data() {
        return {
            projects: [],
            categoryMap: new Map(),
            showByCategory: false,
            config: {},
        }
 
    },
   async created() {
        try {
           this.projects = await getJsonDataApi().then();
            this.getdata()
        }catch (err) {
            console.log(err)
            alert('请求出错')
    }
        
    },
    methods: {    
        getdata(){
            const config= {
                        "category": true,
                        "expandText": "具体信息",
                        "collapseText": "收起",
                        "defaultCategory": "---------------------------",
                    };
            this.config = config;
            let categoryObjMap = new Map();
            this.categoryMap = {};
            this.showByCategory = config.category;
            //console.log(document.body.clientWidth);
            if (this.showByCategory) {
                let arrList;
                let projectMap = new Map();
                for (let pro of this.projects) {
                    console.log(pro)
                    projectMap.set(pro.id, pro);
                    if (pro.category == null || pro.category.trim() == "") {
                        pro.category = config.defaultCategory;
                    }

                    if (categoryObjMap.has(pro.category)) {
                        arrList = categoryObjMap.get(pro.category);
                        arrList.push({
                            id: pro.id,
                            name: pro.keyword
                        });

                    } else {
                        arrList = [];
                        arrList.push({
                            id: pro.id,
                            name: pro.keyword
                        });
                        categoryObjMap.set(pro.category, arrList);

                    }
                }


                for (let key of categoryObjMap.keys()) {
                    this.categoryMap[key] = categoryObjMap.get(key);
                }

                this.projects = [];

                for (let cate of categoryObjMap.keys()) {
                    let pros = categoryObjMap.get(cate);
                    for (let pro of pros) {
                        this.projects.push(projectMap.get(pro.id));
                    }
                }
            }
        },
        collapseClick: function (isCollapse) {
            var container = document.querySelector("#project-container");
            var footer = document.querySelector("#footer");
            if (isCollapse) {
                container.style.marginLeft = "50px";
                footer.style.marginLeft = "50px";
            } else {
                container.style.marginLeft = "260px";
                footer.style.marginLeft = "260px";
            }


            //console.log(this.$refs);
        }


    }
}
</script>

<style lang="less" scoped>
.page-outer {
        display: flex;
        .project-container {
            flex: 1;
        }
    }
</style>>