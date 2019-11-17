/**
 * 测试页面路由
 */
import TestIndex from '@/views/test/index'
import TestSubPage from '@/views/test/test-sub-page'

export default {
    path: '/test',
    name: 'TestIndex',
    component: TestIndex,
    redirect: '/test/test-sub-page',
    meta: {
        name: '测试页面'
    },
    children: [
        {
            path: 'test-sub-page',
            name: 'TestSubPage',
            component: TestSubPage,
            meta: {
                name: '模板管理',
                parents: 'TestIndex',
                icon: 'el-icon-document-copy'
            },
            children: [
                {
                    path: 'test-sub-page',
                    name: 'TestSubPage',
                    component: TestSubPage,
                    meta: {
                        name: '模板管理',
                        parents: 'TestIndex',
                        icon: 'el-icon-document-copy'
                    }
                },
                {
                    path: 'test-sub-page',
                    name: 'TestSubPage',
                    component: TestSubPage,
                    meta: {
                        name: '模板管理1',
                        parents: 'TestIndex',
                        icon: 'el-icon-document-copy'
                    }
                }
            ]
        },
        {
            path: 'test-sub-page',
            name: 'TestSubPage',
            component: TestSubPage,
            meta: {
                name: '模板管理1',
                parents: 'TestIndex',
                icon: 'el-icon-document-copy'
            }
        }
    ]
}