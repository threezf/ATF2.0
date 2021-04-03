<template>
    <div>
        <h2>用户权限</h2>
        <p>ATF权限设计采用基于角色的访问控制，针对不同的角色访问资源进行权限控制，避免因权限控制确实或操作不当引发风险问题。系统在原有基础上加一个系统管理的分页，分页中包含企业管理、角色管理、菜单管理以及用户管理页面，如图1所示。</p>
        <figure>
            <img src="@/assets/images/infrastructure/16.png" alt="">
            <figcaption>图1 系统管理菜单</figcaption>
        </figure>
        <p>其中企业管理管理着ATF系统中所有的注册企业，在此页面可以新增企业、编辑企业、查看企业详情等；角色管理管理着ATF系统中所设定的角色，以及各个角色相应的权限授予；菜单管理展示ATF系统中的所有的菜单及其相应的权限路由，供用户查看系统中的页面权限列表；用户管理管理着系统中所有的用户。</p>
        <p>系统角色划分主要分为超级系统管理员、系统管理员、项目经理、功能测试人员、技术支持人员。各个角色之间的关系见图2。</p>
        <figure>
            <img width="80%" src="@/assets/images/infrastructure/17.png" alt="">
            <figcaption>图2 角色之间关系图</figcaption>
        </figure>
        <p>其中，超级管理员是系统固定的一个角色，有超级权限，拥有着权限管理的操作，他拥有着不同企业管理员的查看和添加的审批权限，并管理角色和菜单的增删改查的权限，并为不同企业提供固定的自动化构件库。</p>
        <p>系统管理员是面向企业的一个角色，除了基础的系统页面的增删改查基础上，还拥有着权限管理的操作，他拥有所在企业系统用户的查看权限，并控制着项目经理角色的审批权限，可为不同角色赋予相应的菜单权限，同时也拥有着全部项目的增删改查的权限。</p>
        <p>项目经理管理着一个项目组，其角色对应用户的添加/修改要经过系统管理员的审批，其管理着一个项目组，该角色拥有自己项目组中用户的查看权限，以及用户的添加和修改的审批工作，但本身没有增加删除修改组中用户信息的权限，同时他也拥有自己所在项目组的所有项目的数据的增删改查的权限。</p>
        <p>功能测试人员在一个项目组中，只拥有本身信息的添加、查看和修改权限，其添加要经过所在项目中的项目经理的审批，该角色拥有自己所在项目组中的所有项目的数据的查看权限，但只拥有自己所负责项目的添加、修改和删除的权限。</p>
        <p>技术支持人员是面向系统底层的技术人员，其角色对应用户的添加和修改要经过系统管理员的审批，其只拥有自动化构件页面的增删改查的管理权限。</p>
    </div>
</template>
<script>
    
    export default {
        name: 'User',
        data() {
            return {
            }
        }   
    }
</script>

<style lang="less" scoped>
    h2 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: .3em;
        font-size: 1.5em;
        border-bottom: 1px solid #eaecef;
    }
    h3 {
        font-size: 1.25em;
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
    }
    p {
        text-indent: 2em;
        margin-bottom: 0rem;
    }
    figure {
        text-align: center;
        width: 100%;
        figcaption {
            margin-bottom: 10px;
        }
    }
    dt, dd {
        text-indent: 2em;
        p {
            text-indent: 4em;
        }
    }
    pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border-radius: 3px;
    }
    code {
        padding: 0;
        padding-top: .2em;
        padding-bottom: .2em;
        margin: 0;
        font-size: 85%;
        background-color: rgba(27,31,35,.05);
        border-radius: 3px;
    }
    ul li {
        text-indent: 4em;
    }
    ul li::before {
        content: '- '
    }
    .list {
        text-indent: 3em;
    }
</style>