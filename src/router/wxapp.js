/**
 * 小程序开放平台模板
 */
import WxappIndex from '@/views/wxapp-open/index'

import WxappTemplateIndex from '@/views/wxapp-open/template/index'
import WxappTemplateDraft from '@/views/wxapp-open/template/draft'
import WxappTemplateList from '@/views/wxapp-open/template/template'

import WxappAppList from '@/views/wxapp-open/wxapp/index'
import WxappAppManage from '@/views/wxapp-open/wxapp/manage'

export default {
    path: '/wxapp-open',
    name: 'WxappIndex',
    component: WxappIndex,
    redirect: '/wxapp-open/template',
    meta: {
        name: '小程序'
    },
    children: [{
        path: 'template',
        name: 'WxappTemplate',
        component: WxappTemplateIndex,
        redirect: '/wxapp-open/template/list',
        meta: {
            name: '模板管理',
            parents: 'WxappIndex',
            icon: 'el-icon-document-copy'
        },
        children: [{
            path: 'draft',
            name: 'WxappTemplateDraft',
            component: WxappTemplateDraft,
            meta: {
                name: '草稿箱',
                parents: 'WxappIndex'
            }
        }, {
            path: 'list',
            name: 'WxappTemplateList',
            component: WxappTemplateList,
            meta: {
                name: '模板列表',
                parents: 'WxappIndex'
            }
        }]
    }, {
        path: 'app-list',
        name: 'WxappAppList',
        component: WxappAppList,
        meta: {
            name: '托管小程序列表',
            parents: 'WxappIndex',
            icon: 'el-icon-mobile-phone'
        }
    }, {
        path: 'manage/:appId',
        name: 'WxappAppManage',
        component: WxappAppManage,
        meta: {
            name: '小程序管理',
            parents: 'WxappIndex',
            hide: true
        }
    }]
}