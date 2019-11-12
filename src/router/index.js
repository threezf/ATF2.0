import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
import Index from '@/views/index'

import Test from './test.js'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                name: '登录',
                hide: true, //在目录结构上隐藏，不在菜单栏外显
            },
        }, {
            path: '/index',
            name: 'Index',
            component: Index,
            meta: {
                name: '首页'
            },
        }, {
            path: '/',
            redirect: '/index',
            name: 'default',
            meta: {
                name: '首页'
            }
        },
        Test
    ]
})