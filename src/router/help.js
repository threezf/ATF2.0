import HelpIndex from '@/views/help/index'
import HelpInfo from '@/views/help/helpInfo'
import TestInfrastructure from '@/views/help/testInfrastructure'

import TestProject from '@/views/help/testProject'
import ProjectManagement from '@/views/help/testProject/projectManagement'

export default {
    path: '/help',
    name: 'Help',
    component: HelpIndex,
    redirect: '/help/helpInfo',
    meta: {
        name: '帮助',
        another: 'atf/interface'
    },
    children: [{
        path: 'infrastructure',
        name: 'Infrastructure',
        component: TestInfrastructure,
        meta: {
            name: '基础设施说明',
            another: 'atf/interface'
        }
    }, {
        path: 'project',
        name: 'Project',
        component: TestProject,
        meta: {
            name: '项目测试说明',
            another: 'atf/interface',
            hide: false
        },
        // children: [{
        //     path: 'projectManagement',
        //     name: 'ProjectManagement',
        //     component: ProjectManagement,
        //     meta: {
        //         name: '项目管理',
        //         parent: 'Project'
        //     }
        // }]
    }, {
        path: 'helpinfo',
        name: 'HelpInfo',
        component: HelpInfo,
        meta: {
            name: '公共函数',
            another: 'atf/interface'
        },
    }]
}