<template>
<div class="my-progress-bar">
  <el-steps simple :active="bigActive" finish-status="success" style="margin-top: 20px">
    <el-step :title="path.name" v-for='(path , index) in path' @click.native='goToPage(path.pathName)' :key="'bigStep1' + index"></el-step>
  </el-steps>
  <el-steps :active="smallActive" finish-status="success" style="margin-top: 20px">
    <el-step :title="smallPath.name" v-for='(smallPath , index) in smallPath' @click.native='goToPage(smallPath.pathName)' :key="'smallStep1' + index"></el-step>
  </el-steps>
</div>
</template>

<script>
import {
  Path
} from "./conf/conf.js";
export default {
  name: "progressBarInterface",
  data() {
    return {
      path: Path,
      smallPath: Path[0].item,
      bigActive: 0,
      smallActive: 1,
      hideFlag: true,
      flag: true,
      progressList: [],
      progressListTimely: [],
    };
  },
  watch: {
    bigActive() {
      this.smallPath = Path[this.bigActive].item;
    },
    $route: {
      handler(to, from) {
        for (let i = 0; i < this.path.length; i++) {
          for (let j = 0; j < this.path[i].item.length; j++) {
            if (this.path[i].item[j].pathName === to.name) {
              this.bigActive = i;
              this.smallActive = j;
              break;
            }
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    goToPage(name) {
      console.log('to.name', name)
      if (name === "InterfacesManagement") {
        return this.$message.warning('请选择功能点')
      } else {
        if (name === 'Transact') {
          return this.$router.push({
            name: 'Transact',
            query: {
              isInterface: true,
              id: JSON.parse(sessionStorage.getItem('toTransact')).id
            }
          })
        }
      }
      this.$router.push({
        name: name
      })
    },
  }
};
</script>

<style>

</style>>
