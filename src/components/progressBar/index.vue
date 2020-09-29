<template>
    <div class='my-progress-bar'>
        <el-steps simple :active="bigActive" finish-status="success" style="margin-top: 20px">
            <el-step :title="path.name" v-for='(path , index) in paths' @click.native='goToPage(path.pathName)' :key="'bigStep' + index"></el-step>
        </el-steps>
        <el-steps :active="smallActive" finish-status="success" style="margin-top: 20px">
            <el-step :title="smallPath.name" v-for='(smallPath , index) in smallPaths' @click.native='goToPage(smallPath.pathName)' :key="'smallStep' + index"></el-step>
        </el-steps>
    </div>
</template>
<script>
import { Path } from './conf/conf'
export default {
    name: 'progressBar',
    props: {
    },
    data: function () {
        return {
            paths: Path,
            smallPaths: Path[0].item, 
            bigActive: 0,
            smallActive: 1,
            flag: false,
            hideFlag:true,
            progressList: [],
            progressListTimely: [],
        }
    },
    created: function() {
    },
    watch: {
        bigActive(){
            this.smallPaths = Path[this.bigActive].item
        },
        '$route': {
            handler (to, from) {
                console.log('==============================================')
                console.log(to)
                console.log('to.meta.parent',to.name)
                console.log('to.meta.parent',to.meta.parent)
                for(let i = 0 ; i < this.paths.length; i++){
                console.log(i)
                console.log(this.paths[i].pathName )
                console.log(to.meta.parent )
                console.log('=======================2222=======================')
                    for(let j = 0 ; j < this.paths[i].item.length; j++){
                        if(this.paths[i].item[j].pathName.split('/')[0] === to.name){
                            this.bigActive = i
                            this.smallActive = j
                            if(to.query.steps == 0) {
                                this.smallActive = 2
                            }else if(to.query.steps == 1) {
                                this.smallActive = 3
                            }
                            console.log('=======================1111=======================')
                            break
                        }
                    }
                }
            },
            immediate: true
        }
    }, 
    computed: {
    },
    methods: {
        goToPage(name){
            console.log('name')
            console.log('路径跳转', name)
            if(name === 'TransactDetail/1') {
                console.log("1")
                return this.$router.push({
                    path: '/testInfrastructure/transactDetail',
                    query: {
                        steps: 0,
                        data: {}
                    }
                })
            }else if(name === 'TransactDetail/2') {
                console.log("2")
                return this.$router.push({
                    path: '/testInfrastructure/transactDetail',
                    query: {
                        steps: 1
                    }
                })
            }
            this.$router.push({
                name: name
            })
        },
    }
}
</script>

<style lang="less">

    .my-progress-bar{
        margin: 0 10px;
        .el-step{
            cursor: pointer;
        }
    }
</style>