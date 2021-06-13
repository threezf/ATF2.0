import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
import Mobile from '@/views/testProject/mobile'
import Rigester from '@/views/login/rigester';
import NoReceived from '@/views/login/noReviewed'
import Index from '@/views/index'
import TestInfrastructure from './testInfrastructure.js'
import SystemManagement from './systemManagement.js'
import TestProject from './testProject.js'
import RecordFunction from './recordFunction'
import Test from '@/views/test'
import QuicklyStart from './quicklyStart'
// import UI from '@/views/UIorCGI/ui'
import UI from './ui.js'
import CGI from './cgi.js'
import Addition from './addition'
import MockApi from '@/views/testInfrastructure/mockApi';
import Preview from '@/views/testInfrastructure/mockAPIComponents/PreView'
import Edit from '@/views/testInfrastructure/mockAPIComponents/Edit'
import Run from '@/views/testInfrastructure/mockAPIComponents/Run'
import MessageBoard from '@/views/messageBoard/msgboard'
import MsgDetail from '@/views/messageBoard/msgdetail'
import InterfaceDetail from '@/views/testInfrastructure/interfacesManagement/interfaceDetail'


import Help from './help'


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
	// mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            // component: Test,
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
            path: '/noReceived',
            name: 'NoReceived',
            component: NoReceived,
            meta: {
                name: '待审核',
                another: 'atf/interface',
                hide: true
            }
        },
        {
            path: '/',
            redirect: '/login',
            name: 'default',
            meta: {
                name: '首页'
            }
        },

		// TestInfrastructure,
        // {
        //     path: '/testInfrastructure/ui',
        //     name: 'UI',
        //     component: UI,
        //     meta: {
        //         name: 'UI测试',
        //         another: 'atf/ui'
        //     }
        // },
			UI,
			CGI,
        // {
        //     path: '/testInfrastructure/cgi',
        //     component: CGI,
        //     name: 'CGI',
        //     meta: {
        //         name: '接口测试',
        //         another: 'atf/interface'
        //     }
        // },
        // TestProject,
			SystemManagement,
			QuicklyStart,
        Addition,
			{
				path: '/testProject/mobile',
				name: 'Mobile',
				component: Mobile,
				meta: {
					name: '移动端测试',
					another: 'atf/interface',
					hide:true
				},
			},
        {
			path: '/mockApi',
			name: "MockApi",
            component: MockApi,
			meta: {
				name: "Mock API",
				parent: "TestInfrastructure",
        another: 'atf/interface'
			},
			children: [
				{
					path: 'preview/:id',
					name: 'Preview',
					component: Preview,
					meta: {
						parent: 'TestInfrastructure',
						hide: true
					},
				},
				{
					path: 'edit/:id',
					name: 'Edit',
					component: Edit,
					meta: {
						parent: 'TestInfrastructure',
						hide: true
					},
				},
				{
					path: 'run/:id',
					name: 'Run',
					component: Run,
					meta: {
						parent: 'TestInfrastructure',
						hide: true
					},
				},
			]
		},
		{
			path: '/mssageboard',
			name: 'MessageBoard',
			component: MessageBoard,
			meta: {
				name: '留言板',
				another: 'atf/interface'
			},
		},
        Help,
        {
            path: 'msgdetail',
            name: 'MsgDetail',
            component: MsgDetail,
            meta: {
                // parent: 'MessageBoard'
            }
        },

    ]
})
