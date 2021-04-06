import InterfaceIndex from '@/views/testInfrastructure/interfacesManagement/index'
import InterfaceManagement from '@/views/testInfrastructure/interfacesManagement/interfaceManage'

import ConfigureSystemData from '@/views/testInfrastructure/subFunction/configureSystemData';
import AutomatedComponentMaintenance from '@/views/testInfrastructure/subFunction/automatedComponentMaintenance';
import InterfacesManagement from '@/views/testInfrastructure/subFunction/interfacesManagement'

export default {
    path: '/interface',
    name: 'Interface',
    component: InterfaceIndex,
    redirect: '/interface/interfaceManagement',
    meta: {
        name: '帮助',
        another: 'atf/interface',
        icon:'el-icon-s-help'
    },
    children: [
    ]
}