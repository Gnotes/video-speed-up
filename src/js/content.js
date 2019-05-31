function vsc_update_play_rate(value) {
    // shadow dom(close) 获取不到
    const videos = document.querySelectorAll('video');
    videos.forEach((v) => {
        v.playbackRate = value;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // TMD 拷贝的示例就俩参数，在详细文档中有三个参数
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        sendResponse({ success: true })
        if (message.type == "CHANGE_PLAY_RATE") {
            vsc_update_play_rate(message.value);
        }
    });
});
