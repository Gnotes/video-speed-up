// Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version
// 首次安装、扩展更新、浏览器更新 会执行该监听函数
chrome.runtime.onInstalled.addListener(function () {
    // 本地数据存储，此API需要在清单文件“permissons”属性中声明
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
    });

    // Use the chrome.declarativeContent API to take actions depending on the content of a page, without requiring permission to read the page's content
    // chrome.declarativeContent API 可以直接根据当前页面内容，并匹配配置的规则（rule）进行一些操作 action，需要注册 "declarativeContent" 权限
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});