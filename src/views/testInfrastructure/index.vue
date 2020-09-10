/*
 *	测试基础设施界面，作为二级路由的主界面
 **/
<template>
  <div class="page-outer">
    <side-bar v-if='pathShow' path-name="TestInfrastructure" :first-path-name='projectName'></side-bar>
    <div class="right-content">
      <div v-show="$store.state.flag">
        <progress-bar v-show="!isInterface"></progress-bar>
        <progress-bar-interface v-show="isInterface"></progress-bar-interface>
      </div>
      <div >
          <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/side-bar";
import progressBar from '@/components/progressBar'
import progressBarInterface from '@/components/progressBarInterface'
export default {
  name: "index",
  components: {
    SideBar,
    progressBar,
    progressBarInterface
  },
  data() {
    return {
      pathShow: false,
      projectName: undefined,
      isInterface: false,
    };
  },
  methods: {},
  created() {
    const flag = localStorage.getItem("userType")
    this.$store.commit("changeFlag", flag == 'true')
  },
  watch:{
<<<<<<< HEAD
    '$route': {
        handler (to, from) {
            if(to.query.isInterface) {
              this.isInterface = to.query.isInterface
            }
            if(to.name === 'TestedSystemManagement'){
                this.pathShow = false
            }
            else{
                this.pathShow = true
                this.projectName = undefined
            }
                console.log('999999999999999999', from, to)
                
                console.log(sessionStorage.getItem("testSysNameStorage"))
                this.projectName = sessionStorage.getItem("testSysNameStorage")
        },
        immediate: true
    }
=======
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
>>>>>>> fsd
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
