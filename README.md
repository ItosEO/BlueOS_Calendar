# 手表示例模版

## 文件结构

```
├── sign                # 存储 rpk 包签名模块(须自行生成);
│   ├── certificate.pem # 证书文件
│   └── private.pem     # 私钥文件
└── src
│   ├── assets          # 公用的资源(images/styles/字体...)
│   │   ├──images       # 存储 png/jpg/svg 等公共图片资源
│   │   └──styles       # 存放 less/css/sass 等公共样式资源
│   ├── pages           # 统一存放项目页面级代码
│   ├── app.ux          # 应用程序代码的入口文件
│   ├── manifest.json   # 配置蓝河应用基本信息
│   └── components      # 存放蓝河应用组件
└── package.json        # 定义项目需要的各种模块及配置信息
```

### 模版说明

- `Demo` 页面：示例页面；
- `DemoDetail`页面：详情页面；

## 如何使用

-  **内置样式处理方案**；「蓝河应用」支持 `sass` 的预编译；这里采取 [dart sass](https://sass-lang.com/documentation) 方案，并内置了部分变量，以及常用混合方法，使得可以轻松开启样式编写、复用、修改等；
-  **添加新增页面命令脚本**；如果需要新建页面，只需运行：`yarn gen YourPageName` ，当然，也可以根据需要，自行定定制模板：*/command/gen/template.ux*；
-  **集成 [Prettier](https://prettier.io/)**；在检测代码中潜在问题的同时，统一团队代码规范、风格（`js`，`less`，`scss`等），从而促使写出高质量代码，以提升工作效率(尤其针对团队开发)；

## 内置命令

|  命令 | 描述  | 备注 |
|---|---|---|
| `yarn gen `  | 新增「蓝河应用」页面 | 助你高效生成页面，模版可自定义，推荐 ✓|
| `yarn prettier`  | 一键美化代码(js/css/less/ux)  | 实在是团队开发好帮手，推荐 ✓ |
