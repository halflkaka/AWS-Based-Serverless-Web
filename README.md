# Second-hand-furniture-trading-website

## 10/15
实现了基本的登录和注册。
克隆下来后要装一些包，在nodeJS里用mongodb要npm install mongoose一下。  
###用法
- 本地启动mongodb, 用mongod命令
- 本地的mongodb创建一个数据库，命名为demo
- 在demo数据库里建一个collection, db.createCollection("users")
- 启动项目，几个路由是
	- localhost:3000/ or /index
	- /users	显示现在所有的用户
	- /users/login	登录界面，在数据库里查到用户，然后比较密码
	- /users/register	注册界面，注册完后把用户加到数据库里，直接跳到主页
### TODO
- Facebook登录
- 用户密码要加密
- ......

