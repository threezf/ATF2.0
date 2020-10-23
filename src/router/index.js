import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
import Rigester from '@/views/login/rigester';
import Index from '@/views/index'
import TestInfrastructure from './testInfrastructure.js'
import SystemManagement from './systemManagement.js'
import TestProject from './testProject.js'
import RecordFunction from './recordFunction'
import QuicklyStart from './quicklyStart'
import UI from '@/views/UIorCGI/ui'
import CGI from '@/views/UIorCGI/CGI'
import Addition from './addition'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
	mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                name: '登录',
                hide: true, //在目录结构上隐藏，不在菜单栏外显
                noRequiresAuth: true,
            },
        },
        {
            path: '/rigester',
            name: 'Rigester',
            component: Rigester,
            meta: {
                name: '注册',
                hide: true,
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
            redirect: '/login',
            name: 'default',
            meta: {
                name: '首页'
            }
        },
        SystemManagement,
		TestInfrastructure,
        {
            path: '/testInfrastructure/ui',
            name: 'UI',
            component: UI,
            meta: {
                name: 'UI测试',
                another: 'atf/ui'
            }
        },
        {
            path: '/testInfrastructure/cgi',
            component: CGI,
            name: 'CGI',
            meta: {
                name: '接口测试',
                another: 'atf/interface'
            }
        },
        TestProject,
        QuicklyStart,
        Addition
    ]
})
