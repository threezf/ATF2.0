import InterfacepIndex from '@/views/testInfrastructure/interfacesManagement/index'
import InterfaceManagement from '@/views/testInfrastructure/interfacesManagement/interfaceManage'

import ConfigureSystemData from '@/views/testInfrastructure/subFunction/configureSystemData';
import AutomatedComponentMaintenance from '@/views/testInfrastructure/subFunction/automatedComponentMaintenance';
import InterfacesManagement from '@/views/testInfrastructure/subFunction/interfacesManagement'

export default {
    path: '/interface',
    name: 'Interface',
    component: InterfacepIndex,
    redirect: '/interface/interfaceManagement',
    meta: {
        name: '帮助',
        another: 'atf/interface',
        icon:'el-icon-s-help'
    },
    children: [{
        path: 'interfaceManagement',
        name: 'InterfaceManagement',
        component: InterfaceManagement,
        meta: {
            name: '接口管理',
            another: 'atf/interface',
            icon: 'el-icon-menu'
            },
        }, 
        {
            path: 'interfaceTest',
            name: 'InterfaceTest',
            component: ConfigureSystemData,
            meta: {
                name: "接口测试",
                another: 'atf/interface',
                icon: 'el-icon-stopwatch',
            },
        },
        {
            path: 'testCases',
            name: 'TestCases',
            component: AutomatedComponentMaintenance,
            meta: {
                name: "测试用例",
                another: 'atf/interface',
                icon: 'el-icon-document',
            },
        },
        {
            path: 'testEnvironment',
            name: 'TestEnvironment',
            component: InterfacesManagement,
            meta: {
                name: "测试环境",
                another: 'atf/interface',
                icon: 'el-icon-star-off',
            },
        },
    ]
}