## 基于uniapp+uview搭建的一套开箱即用的项目基本框架，可直接用于开发
### 更新说明
#### 2023.02.14 首页自定义骨架屏（css方式）
#### 2023.02.13 app版本升级，包括热更新、强制更新、非强制更新，手动检查更新
#### 2023.02.12 可配置登录方式，通过config.js或后端拿数据配置登录方式
#### 2023.02.11 app首次进入增加引导页
#### 2023.02.08 （1）完成项目基本框架搭建，对uni.request的二次封装（请求拦截、响应拦截、token鉴权）；（2）其他平台携带token，跳转首页判断；（3）小程序页面分包搭建；

### 项目截图
<img src="static/images/%E5%BC%95%E5%AF%BC%E9%A1%B5.png" alt="输入图片说明" style="zoom:50%;" /><img src="static/images/%E7%99%BB%E5%BD%95%E9%A1%B5.png" alt="输入图片说明" style="zoom:50%;" /><img src="static/images/%E6%89%8B%E6%9C%BA%E7%99%BB%E5%BD%95.png" alt="输入图片说明" style="zoom:50%;" /><img src="static/images/%E9%A6%96%E9%A1%B5%E9%AA%A8%E6%9E%B6%E5%B1%8F.png" alt="输入图片说明" style="zoom: 50%;" /><img src="static/images/app%E7%89%88%E6%9C%AC%E5%8D%87%E7%BA%A7.png" alt="输入图片说明" style="zoom:50%;" /><img src="static/images/app%E7%89%88%E6%9C%AC%E4%B8%8B%E8%BD%BD.png" alt="输入图片说明" style="zoom:50%;" />

### 工程目录
```XML
|- XXX项目                  
    |- components      // 组件存放目录
      |- common        // 可复用组件
      
    |- apis            // 环境变量配置
      |- api           // 存放请求接口
      |- index.js      // 所有js文件后做的一统一暴露
    
    |- http            // http请求封装
      |- config.js     // url基本配置
      |- request.js    // 对uni.request的二次封装
      
    |- nativeplugins   // 存放本地原生插件
    
    |- pages           // 存放整个 uni-app 项目的所有的页面
        |- login
        |- home
        
    |- static          // 存放静态资源
            |- icon    // iconfont字体图标
        |- images      // 图片资源
    
    |- utils           // 工具存放目录
        |- global.js   // 全局常量、方法封装模块
        |- rem.js      // rem适配方法封装
        |- request.js  // 公共请求工具
        |- app-update-check.js  // app升级相关方法
        |- util.js     // 各类工具函数封装
        
    |- styles          // 存放css文件
        |- base64-pic-store.scss 
        
    |- subpages        // 存放小程序分包页面
        |- unpackage   // 存放uni-app 项目打包输出的文件，存有各个平台的打包文件
    |- utils           // 工具类函数封装
    |- APP.vue         // 根页面
    |- main.js         // 入口文件
    |- manifest.json   // 应用的配置文件，用于指定应用的名称、图标、权限等
    |- pages.json      // 对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar等
    |- uni.scss        // 预置了一些常用样式变量，方便整体控制应用的风格，比如按钮颜色、边框风格
```
