import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
import Rigester from '@/views/login/rigester';
import Index from '@/views/index'
import Test from './test.js'
import TestInfrastructure from './testInfrastructure.js'
import SystemManagement from './systemManagement.js'
import TestProject from './testProject.js'
import RecordFunction from './recordFunction'
import QuicklyStart from './quicklyStart'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                name: '登录',
                hide: false, //在目录结构上隐藏，不在菜单栏外显
            },
        },
        {
            path: '/rigester',
            name: 'Rigester',
            component: Rigester,
            meta: {
                name: '注册',
                hide: true
            }
        },
        {
            path: '/index',
            name: 'Index',
            component: Index,
            meta: {
                name: '首页'
            },
        }, 
        {
            path: '/',
            redirect: '/index',
            name: 'default',
            meta: {
                name: '首页'
            }
        },
        SystemManagement,
		TestInfrastructure,
        TestProject,
		RecordFunction,
        Test,
        QuicklyStart
    ]
})
