/**
 * 快速开始页面路由
 * 路由规则
 */
import quicklyStart from '@/views/quicklyStart/index'
import quicklyTransact from '@/views/quicklyStart/quicklyTransact'
import quicklyElement from '@/views/quicklyStart/quicklyElement'
import quicklyTemplate from '@/views/quicklyStart/quicklyTemplate'

export default {
    path: '/quicklyStart',
    name: 'QuicklyStart',
    component: quicklyStart,
    redirect: '/quicklyStart/quicklyTransact',
    meta: {
        name: '快速开始'
    },
    children: [
        {
            path: 'quicklyTransact',
            name: 'QuicklyTransact',
            component: quicklyTransact,
            meta: {
                name: '添加功能点',
                parents: 'QuicklyStart'
            }
        },
        {
            path: 'quicklyElement',
            name: 'QuicklyElement',
            component: quicklyElement,
            meta: {
                name: '维护元素库',
                parents: 'QuicklyStart'
            }
        },
        {
            path: 'quicklyTemplate',
            name: 'QuicklyTemplate',
            component: quicklyTemplate,
            meta: {
                name: '配置用例',
                parents: 'QuicklyStart'
            }
        }
    ]
}
