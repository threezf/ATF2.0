/**
 * 快速开始页面路由
 * 路由规则
 */
import quicklyStart from '@/views/quicklyStart/index'
import quicklyTransact from '@/views/quicklyStart/quicklyTransact'
import quicklyElement from '@/views/quicklyStart/quicklyElement'
import quicklyTemplate from '@/views/quicklyStart/quicklyTemplate'
import quicklyRun from '@/views/quicklyStart/quicklyRun'
import quicklyResult from '@/views/quicklyStart/quicklyResult'
export default {
    path: '/quicklyStart',
    name: 'QuicklyStart',
    component: quicklyStart,
    redirect: '/quicklyStart/quicklyTransact',
    meta: {
        name: '快速开始',
        another: 'atf/quickStart',
			  hide:true
    },
    children: [
        {
            path: 'quicklyTransact',
            name: 'QuicklyTransact',
            component: quicklyTransact,
            meta: {
                name: '添加功能点',
                parent: 'QuicklyStart'
            }
        },
        {
            path: 'quicklyElement',
            name: 'QuicklyElement',
            component: quicklyElement,
            meta: {
                name: '维护元素库',
                parent: 'QuicklyStart'
            }
        },
        {
            path: 'quicklyTemplate',
            name: 'QuicklyTemplate',
            component: quicklyTemplate,
            meta: {
                name: '配置用例',
                parent: 'QuicklyStart'
            }
        },
        {
            path: 'quicklyRun',
            name: 'QuicklyRun',
            component: quicklyRun,
            meta: {
                name: '执行用例',
                parent: 'QuicklyStart'
            }
        },
        {
            path: 'quicklyResult',
            name: 'QuicklyResult',
            component: quicklyResult,
            meta: {
                name: '查看结果',
                parent: 'QuicklyStart'
            }
        }
    ]
}
