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
### 3. 新建物品（装备）管理组件
  基本和分类管理差不多，但是多了一个图片上传的实现，可以在element中直接找，将url修改成服务器地址，在服务器中添加一个新的接口用于处理上传文件，使用multer插件。上传成功后记得返回一个图片url给前端页面。
### 4. 新建英雄列表
  差不多，但是多了很多字段，没有什么难点。
### 5. 新建文章列表
  还是差不多，但是添加文章需要用到富文本编辑器。
  富文本编辑器使用了vue2-editor，并将富文本中的图片做了上传处理（默认是将图片以base64的格式合并在response中，导致请求数据体量太大，不利于性能），把上传后返回的url放进文本中。    
  值得注意的是，vue2-editor的许多使用说明（包括官网）都介绍上传处理的关键字是<code>@imageAdded</code>，而实际上最新版已经改成了<code>@image-added</code>，在npm上更新了，所以要用还是去npm看。
### 6. 新建广告位列表
  没有难点，那前面的改一改就行了。不过，发现很多组件都用到了上传图片的样式，所以都提出来放到公共样式里去了。
### 7. 管理员列表
  需要在服务端对密码做散列处理。使用bcrypt插件，注意是安装在服务端，并且该插件依赖于node-gyp、python。  
  新建管理员的功能其实就是注册，所以账号（用户名）其实是不能重复的，暂时先不管了。
### 8. 登录验证页面/login
  后台将post的数据与数据库进行匹配，如验证失败将以400+的status返回一个message，前端利用axios的拦截器对请求异常进行代理，如果status不正常则利用element的弹框功能直接将错误信息message弹出来。   
  验证成功后，后台将返回一个token给前端，前端凭此token保持登录状态。后台生成token的插件是jsonwebtoken
### 9. 登录状态验证
  前端在请求头中添加Authorization:`Bearer ${token}`字段，后台在接受请求时，使用中间件从请求头找到此字段，取出token后用jsonwebtoken进行验证，得到tokenfy之前的数据，因为一开始生成token时用的数据是用户_id，所以验证出来的数据也存在一个id，拿到id之后去数据库找一下有没有这个用户（user），把user添加到请求体中，等待后续处理函数调用。  

  在后台把登录验证作为中间件插入上级路径中，在前端则使用路由限制（Gard）对除了登录页的其他路由做一个简单的验证。

### admin客户端基本结束


# 用户客户端 —— client子项目
  由于涉及工具类，所以使用scss，需要安装sass和sass-loader，sass-loader可能有相关依赖(node-sass,fibers)，看提示信息操作即可。   
  webpack似乎能自动添加浏览器兼容前缀？暂时没有过多研究，但是这个自动生成的项目打包后确实会自带浏览器前缀。
## 基本样式设置
### 1. 样式重置
  浏览器对元素的实现有一些差异，比如盒模型等，不解决将会对页面在不同浏览器的显示产生差异。
### 2. 网站基本颜色、字体定义
  使用scss定义基本的颜色、字体类。
### 3. 通用flex定义
### 4. 常用Margin，Padding定义
  类似bootstrap

## 写页面
### 1.首页 




# 服务端 —— server子项目
  > cnmp i express@next mongoose cors  
#### 路由模块  
  > routes/admin  
  > index.js中使用  
  > 使用插件http-assert来向前端抛出错误信息。
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

#### serve/upload 管理上传文件
  *想办法处理一下修改上传资源后，旧资源的留存问题

#### 加密插件
bcrypt、全局安装node-gyp、python。

#### 