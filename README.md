# USAGE
/server> npm run serve


# NODE + VUE 移动端web 全栈

跟着B站up[全栈之巅](https://space.bilibili.com/341919508)做的项目。之前已经把web前端后端技能差不多都学了一遍，这次就利用这个项目来从头到尾复习一遍。

## 一、 工具与环境
---
### 几个东西：
> + vscode开发工具  
> 下载，安装各种插件
> + nodejs  
> 官网下载，安装
> + 淘宝镜像  
> npm太慢了，换成国内的cnpm  
> + vue-cli  
> 用cnmp 安装vue-cli，详情见官网
> + 数据库 MongoDB  
> 下载安装  

## 二、 开始
---
### 1. GIT  
上github创建新仓库，创建时可以在初始化内容里勾选"Initialize this repository with a README"，并且添加.gitignore文件，选择类型为node，添加证书，我选了MIT。   

然后新建项目文件夹，进vscode，git init一下。紧接着要用vscode的git去连接远程仓库，但是太复杂了，忘记这里该怎么做，最后还是偷了初始化文件之后重新搞了个空仓库再连接。

### 2. 初始化项目 
+ 使用vue-cli新建两个子项目:   
  > vue create client   
  > vue create admin   

  如果在vscode的powershell不能使用vue命令就直接自己开cmd。

+ 初始化服务器项目
  > cd server   
  > npm init -y   

  安装nodemon、element-ui

# 后台管理 —— admin子项目
### 1. 基础界面
#### 引入element UI  
  > vue add element  
  > Fully...  
  > no  
  > zhcn  
#### 引入router  
  > vue add router  
  > no  
  封装于router.js
#### 引入axios  
  > 使用http.js封装axios，export http  
  > 在main.js中将Vue原型的$http替换成http  

### 2. 新建分类管理组件
  > 1. CategoriesEdit    
  > 集编辑和新建于一体   
  > 2. CategoriesList   
  > 展示分类列表   
### 3. 新建物品管理组件
  基本和分类管理差不多，但是多了一个图片上传的实现，可以在element中直接找，将url修改成服务器地址，在服务器中添加一个新的接口用于处理上传文件，使用multer插件。上传成功后记得返回一个图片url给前端页面。



# 服务端 —— server子项目
  > cnmp i express@next mongoose cors  
#### 路由模块  
  > routes/admin  
  > index.js中使用  
#### 连接数据库模块  
  > plugins/db  
  > index.js中使用  
#### 数据库模型  
  > models/Category  // 分类数据集

#### index.js中注册   
  > app.use(express.json());  
  > app.use(require('cors')());  

#### 接口使用通用模型
  将请求的资源模型设置成URL参数resource，根据resource动态选择具有相同增删改查的数据库模型们
