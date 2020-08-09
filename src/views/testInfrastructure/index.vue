/*
 *	测试基础设施界面，作为二级路由的主界面
 **/
<template>
  <div class="page-outer">
    <side-bar v-if='pathShow' path-name="TestInfrastructure" :first-path-name='projectName'></side-bar>
    <div class="right-content">
        <progress-bar></progress-bar>
        <div >
            <router-view />
        </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/side-bar";
    import progressBar from '@/components/progressBar'
export default {
  name: "index",
  components: {
    SideBar,
    progressBar
  },
  data() {
    return {
      pathShow: false,
      projectName: undefined,
    };
  },
  methods: {},
  watch:{
      '$route': {
          handler (to, from) {
              if(to.name === 'TestedSystemManagement'){
                  this.pathShow = false
              }
              else{
                  this.pathShow = true
                  this.projectName = undefined
              }
                  console.log('999999999999999999')
                  
                  console.log(sessionStorage.getItem("testSysNameStorage"))
                  this.projectName = sessionStorage.getItem("testSysNameStorage")
          },
          immediate: true
      }
  }
};
</script>

<style lang="less" scoped>
.page-outer {
  display: flex;
  .right-content {
    flex: 1;
  }
}
</style>
