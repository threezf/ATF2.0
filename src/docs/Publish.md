## ATF前端代码打包发布流程
#### 1. 本地代码提交
常用指令：
```shell
  git add .
  git commit -m ""
  git push
  git checkout [主分支]
  git merge
```
#### 2. 登陆远程服务器
本地打开终端(window系统可以使用 git bash)，输入 `ssh @root@140.143.16.21`登陆远程服务器
```shell
  地址：140.143.16.21
  密码：Bupt2020
```
#### 3.进入指定目录
- cd ..
- cd home/atf/gitlab/frontend_code/
#### 4. 执行指令自动发布
```
  sh genfe.sh
```