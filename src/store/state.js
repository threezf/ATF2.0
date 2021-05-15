export default {
  flag: true, // 新老用户标识
  loginInfo: {}, // 登录信息，包含一些
  totalScore: 0, // 保存当前用户使用积分
  urlList: [], // 存储当前角色所具有的权限列表
  browserLink: [
    'http://140.143.16.21:9090/atf-data/browser_windows/chrome_87_install.zip',
    'http://140.143.16.21:9090/atf-data/browser_windows/Firefox-install.zip',
    'http://140.143.16.21:9090/atf-data/browser_mac/chrome_87_install.zip',
    'http://140.143.16.21:9090/atf-data/browser_mac/Firefox-install.zip',
    'http://140.143.16.21:9090/atf-data/atf-runner.zip'
  ],
	assertionCheckType: 0,
	assertionRootType: 0,
	assertionBody: '[{"id":0,"parentId":0,"paramName":"respMsg","type":0,"checkContentType":1,"expectResult":"success","children":[]}]',
	customCode:'',
	selectedArrayType:0,
	assertionType:1,
  checkResHeader:  [{"name":"Content-Type","val":"application/json","desc":null}]
}
