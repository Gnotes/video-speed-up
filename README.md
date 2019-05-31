# video-speed-up

## 几个重要的概念

- Manifest
    > 项目清单文件 **manifest.json**，包含了 `版本、权限、页面...` 等配置信息，[详细信息](https://developer.chrome.com/extensions/manifest)
- Background Script
    > 后台执行脚本，所有扩展页面中 **生命周期最长** 的，从启动扩展到关闭扩展整个过程。  
    因此常放置 `全局` 的 **逻辑处理**，及 `全局` 的 **事件监听处理**
- Content scripts
    > 网页交互脚本，主要功能是能够在当前网页上下文(context)中，操作 **DOM**，并且可以与扩展通信
- Options Page
    > 扩展选项页面，用于用户 **自定义选项**，**扩展详情** 等
- Chrome APIs
    > 扩展可使用的底层API，用于操作浏览器行为

## 启动项目

- 编译项目

    ```bash
    npm install

    npm run build
    ```

- 引用项目

> 在 `chrome://extensions/` 中，打开 `开发者模式`，点击 `加载已解压的扩展程序`，选择编译之后的目录 `lib` 即可.

## 参考文档

- [中文简介](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
- [官方文档](https://developer.chrome.com/extensions)
- [Chrome 扩展及应用开发（首发版）](http://www.ituring.com.cn/book/1421)