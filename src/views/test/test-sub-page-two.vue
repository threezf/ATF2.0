<template>
    <div @contextmenu.prevent>
        <el-table
        :data="tableData"
        @contextmenu.prevent="rightMenu"
        @row-contextmenu="rightMenu"
        style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            <el-table-column
                v-for="(item,index) in tableHead"
                :key="index"
                :label="item[0] + item[1]"
                 width="180">
                  <template slot-scope="scope">
                    {{ scope.row['data_'+item[1]] }}
                </template>
            </el-table-column>
        </el-table>
        <div v-show="menuVisible">
            <ul id="menu" class="menu">
                <li class="menu__item">新增</li>
                <li class="menu__item">重命名</li>
                <li class="menu__item">删除</li>
            </ul>
        </div>
	</div>
</template>

<script>
	import VueMixins from '@/libs/vueMixins.js'
    export default {
        name: "test-sub-page12",
        mixins: [VueMixins],
        data() {
            return {
            menuVisible:false,
            tableData: [
                {
                    "caseCode": "注册并登陆",
                    "data_{输入会员账号}": "{expr=Date. getTimestamp ()}",
                    "data_{输入会员密码}": "123456",
                    "data_{点击提交}": "y",
                    "testPoint": "1",
                    "checkPoint": "检查是否可以抓取到登录成功后页面上的退出按钮。",
                    "data_{点击注册账号}": "y",
                    "data_{输入真实姓名}": "{expr=Number. randomWithFixedLength (1000)}",
                    "data_{点击登录按钮}": "y",
                    "expectResult": "注册账号成功。",
                    "data_{密码确认}": "123456",
                    "caseCompositeType": 1,
                    "data_{输入Email}": "123456@163.com",
                    "data_{输入身份证号}": "130132195705158764",
                    "data_{获取网址}": "{expr=Data.Aut(URL)}",
                    "testStep": "获取网址->点击登录->点击注册账号->输入会员账号->输入会员密码->密码确认->输入真实姓名->输入Email->输入手机号码->输入身份证号->点击提交",
                    "id": 23033,
                    "data_{输入手机号码}": "18501300373",
                    "data_{退出检查}": "@before\nUI(\"页面\").webbutton(\"退出检查\").checkEqualText(\"退出\");\n@value\nn\n",
                    "testDesign": "测试电子商务网站的账号注册和登录"
                }, {
                    "caseCode": "注册并登陆检查点出错",
                    "data_{输入会员账号}": "{expr=Date. getTimestamp ()}",
                    "data_{输入会员密码}": "123456",
                    "data_{点击提交}": "y",
                    "testPoint": "1",
                    "checkPoint": "检查是否可以抓取到登录成功后页面上的退出按钮。",
                    "data_{点击注册账号}": "y",
                    "data_{输入真实姓名}": "{expr=Number. randomWithFixedLength (1000)}",
                    "data_{点击登录按钮}": "y",
                    "expectResult": "注册成功。",
                    "data_{密码确认}": "123456",
                    "caseCompositeType": 1,
                    "data_{输入Email}": "123456@163.com",
                    "data_{输入身份证号}": "130132195705158764",
                    "data_{获取网址}": "{expr=Data.Aut(URL)}",
                    "testStep": "获取网址->点击登录->点击注册账号->输入会员账号->输入会员密码->密码确认->输入真实姓名->输入Email->输入手机号码->输入身份证号->点击提交",
                    "id": 23171,
                    "data_{输入手机号码}": "185013",
                    "data_{退出检查}": "@before\nUI(\"页面\").webbutton(\"退出检查\").checkEqualText(\"退出\");\n@value\nn",
                    "testDesign": "测试电子商务网站的账号注册和登录"
                }, {
                    "caseCode": "注册并登陆",
                    "data_{输入会员账号}": "{expr=Date. getTimestamp ()}",
                    "data_{输入会员密码}": "123456",
                    "data_{点击提交}": "y",
                    "testPoint": "1",
                    "checkPoint": null,
                    "data_{点击注册账号}": "y",
                    "data_{输入真实姓名}": "{expr=Number. randomWithFixedLength (1000)}",
                    "data_{点击登录按钮}": "y",
                    "expectResult": "注册会员账号成功。",
                    "data_{密码确认}": "123456",
                    "caseCompositeType": 3,
                    "data_{输入Email}": "123456@163.com",
                    "data_{输入身份证号}": "130132195705158764",
                    "data_{获取网址}": "{expr=Data.Aut(URL)}",
                    "testStep": "获取网址->点击登录->点击注册账号->输入会员账号->输入会员密码->密码确认->输入真实姓名->输入Email->输入手机号码->输入身份证号->点击提交",
                    "id": 2942,
                    "data_{输入手机号码}": "18501300373",
                    "data_{退出检查}": "",
                    "testDesign": "测试电子商务网站的账号注册和登录。"
                }, {
                    "caseCode": "注册并登陆",
                    "data_{输入会员账号}": "@value\n{expr=Date. getTimestamp ()}\n@after\nUI(\"页面\").webedit(\"输入会员账号\").getValue(\"account01\");",
                    "data_{输入会员密码}": "@value\n123456\n@after\nUI(\"页面\").webedit(\"输入会员密码\").getValue(\"password01\");",
                    "data_{点击提交}": "y",
                    "testPoint": "1",
                    "checkPoint": "检查退出按钮是否存在",
                    "data_{点击注册账号}": "y",
                    "data_{输入真实姓名}": "{expr=Number. randomWithFixedLength (1000)}",
                    "data_{点击登录按钮}": "y",
                    "expectResult": "注册并成功登录网站。",
                    "data_{密码确认}": "123456",
                    "caseCompositeType": 3,
                    "data_{输入Email}": "123456@163.com",
                    "data_{输入身份证号}": "130132195705158764",
                    "data_{获取网址}": "{expr=Data.Aut(URL)}",
                    "testStep": "获取网址->点击登录->点击注册账号->输入会员账号->输入会员密码->密码确认->输入真实姓名->输入Email->输入手机号码->输入身份证号->点击提交",
                    "id": 2946,
                    "data_{输入手机号码}": "18501300373",
                    "data_{退出检查}": "@before\nUI(\"页面\").webbutton(\"退出检查\").checkEqualText(\"退出\");\n@value\nn",
                    "testDesign": "测试电子商务网站的账号注册和登录"
                }, {
                    "caseCode": "注册并登陆",
                    "data_{输入会员账号}": "@value\n{expr=Date. getTimestamp ()}\n@after\nUI(\"页面\").webedit(\"输入会员账号\").getValue(\"account02\");",
                    "data_{输入会员密码}": "@value\n123456\n@after\nUI(\"页面\").webedit(\"输入会员密码\").getValue(\"password02\");",
                    "data_{点击提交}": "y",
                    "testPoint": "1",
                    "checkPoint": "检查退出按钮是否存在",
                    "data_{点击注册账号}": "y",
                    "data_{输入真实姓名}": "{expr=Number. randomWithFixedLength (1000)}",
                    "data_{点击登录按钮}": "y",
                    "expectResult": "注册并成功登录网站。",
                    "data_{密码确认}": "123456",
                    "caseCompositeType": 3,
                    "data_{输入Email}": "123456@163.com",
                    "data_{输入身份证号}": "130132195705158764",
                    "data_{获取网址}": "{expr=Data.Aut(URL)}",
                    "testStep": "获取网址->点击登录->点击注册账号->输入会员账号->输入会员密码->密码确认->输入真实姓名->输入Email->输入手机号码->输入身份证号->点击提交",
                    "id": 2961,
                    "data_{输入手机号码}": "18501300373",
                    "data_{退出检查}": "@before\nUI(\"页面\").webbutton(\"退出检查\").checkEqualText(\"退出\");\n@value\nn",
                    "testDesign": "测试电子商务网站的账号注册和登录"
                }
            ],
            tableHead: [
                ["[公共函数集]", "{获取网址}"],
                ["[按钮控件]", "{点击登录按钮}"],
                ["[按钮控件]", "{点击注册账号}"],
                ["[输入框]", "{输入会员账号}"],
                ["[输入框]", "{输入会员密码}"],
                ["[输入框]", "{密码确认}"],
                ["[输入框]", "{输入真实姓名}"],
                ["[输入框]", "{输入Email}"],
                ["[输入框]", "{输入手机号码}"],
                ["[输入框]", "{输入身份证号}"],
                ["[按钮控件]", "{点击提交}"],
                ["[按钮控件]", "{退出检查}"]
            ],
        }
      },
      methods:{
        rightMenu(	row, column, event){
            console.log( row )
            console.log( column )
            console.log( event )
            this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
            var menu = document.querySelector('#menu');
            this.styleMenu(menu)
            return false
        },
        styleMenu(menu) {
            menu.style.left = event.clientX + 1 + 'px';
            menu.style.top = event.clientY - 10 + 'px';
            document.addEventListener('click', this.foo);
            // if (event.clientX > 1800) {
            //     menu.style.left = event.clientX - 100 + 'px';
            // } else {
            //     menu.style.left = event.clientX + 1 + 'px';
            // }
            // document.addEventListener('click', this.foo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
            // if (event.clientY > 700) {
            //     menu.style.top = event.clientY - 30 + 'px';
            // } else {
            //     menu.style.top = event.clientY - 10 + 'px';
            // }
        },
        foo() {
            // 取消鼠标监听事件 菜单栏
            this.menuVisible = false;
            document.removeEventListener('click', this.foo); // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
        },
      }
    }
</script>

<style scoped>
.menu__item {
	display: block;
	line-height: 20px;
	text-align: center;
	margin:10px;
	cursor: default;
}
.menu__item:hover{
	color: #FF0000;
}

.menu {
 	height: auto;
 	width: auto;
 	position: fixed;
 	font-size: 14px;
 	text-align: left;
 	border-radius: 10px;
 	border: 1px solid #c1c1c1;
 	background-color: #ffffff;
}

li:hover {
  background-color: #E0E0E2;
  color: white;
}
</style>
