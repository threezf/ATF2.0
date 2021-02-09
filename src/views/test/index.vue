/**
测试页面，作为二级路由主页面
 */
<template >
    <div @keyup.right="handleArrowRight">
        <el-carousel ref="carousel" @keyup.enter="handleArrowLeft" @change="handleChange" :autoplay="false">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            handleChange(val) {
                console.log(val)
            },
            handleArrowLeft(event) {
                console.log(event)
                if(event.keyCode === 37) {
                    console.log('arrow left')
                    this.$refs.carousel.prev()
                }
                if(event.keyCode === 39) {
                    console.log('arrow right')
                    this.$refs.carousel.next()
                }
            },
        },
        computed: {
            
        },
        mounted() {
            window.addEventListener('keyup',this.handleArrowLeft)
        },
        destroyed() {
            window.removeEventListener('keyup', this.handleArrowLeft)
        }
    }
</script>

<style lang="less" scoped>
    .page-outer {
        padding: 100px;
    }
    .el-carousel {
        margin: 100px auto;
        width: 800px;
    }
    .el-carousel__item {
        width: 800px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        text-align: center;
        margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>