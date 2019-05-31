function vsc_update_play_rate(value, callback) {
    // shadow dom(close) 获取不到
    const videos = document.querySelectorAll('video');
    if (videos.length === 0) return callback(false);
    videos.forEach((v) => {
        v.playbackRate = value;
    });
    callback(true);
}

document.addEventListener('DOMContentLoaded', () => {
    // TMD 拷贝的示例就俩参数，在详细文档中有三个参数
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type == "CHANGE_PLAY_RATE") {
            return vsc_update_play_rate(message.value, (success) => {
                sendResponse({ status: true, success: success })
            });
        }
        sendResponse({ status: true })
    });
});
