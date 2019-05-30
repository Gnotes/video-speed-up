/**
 * 后台运行程序
 */

// 首次安装、扩展更新、浏览器更新 会执行该监听函数
chrome.runtime.onInstalled.addListener((installedInfo) => {
    // 添加页面过滤条件
    const rules = [{
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                css: ["video"] // 匹配只包含“video”标签的页面
            })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }];

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });

    // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //     console.log('收到来自content-script的消息：');
    //     console.log(request, sender, sendResponse);
    //     sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
    // });
});