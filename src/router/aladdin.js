/**
 * 小程序开放平台模板
 */
import AladdinIndex from '@/views/aladdin/index'

import WxappTemplateIndex from '@/views/wxapp-open/template/index'
import WxappTemplateDraft from '@/views/wxapp-open/template/draft'
import WxappTemplateList from '@/views/wxapp-open/template/template'

import WxappAppList from '@/views/wxapp-open/wxapp/index'
import WxappAppManage from '@/views/wxapp-open/wxapp/manage'

export default {
    path: '/aladdin',
    name: 'AladdinIndex',
    component: AladdinIndex,
    redirect: '/aladdin/template',
    meta: {
        name: '阿拉丁'
    },
    children: [{
        path: 'template',
        name: 'WxappTemplate',
        component: WxappTemplateIndex,
        redirect: '/aladdin/template/draft',
        meta: {
            name: '阿拉丁',
            parent: 'AladdinIndex',
            icon: 'el-icon-document-copy'
        },
        children: [{
            path: 'draft',
            name: 'WxappTemplateDraft',
            component: WxappTemplateDraft,
            meta: {
                name: '阿拉丁',
                parent: 'AladdinIndex'
            }
        }, {
            path: 'list',
            name: 'WxappTemplateList',
            component: WxappTemplateList,
            meta: {
                name: '阿拉丁',
                parent: 'AladdinIndex'
            }
        }]
    }, {
        path: 'app-list',
        name: 'WxappAppList',
        component: WxappAppList,
        meta: {
            name: '阿拉丁',
            parent: 'AladdinIndex',
            icon: 'el-icon-mobile-phone'
        }
    }, {
        path: 'manage/:appId',
        name: 'WxappAppManage',
        component: WxappAppManage,
        meta: {
            name: '阿拉丁',
            parent: 'AladdinIndex',
            hide: true
        }
    }]
}