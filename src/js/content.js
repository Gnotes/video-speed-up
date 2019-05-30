function vsc_update_play_rate(value) {
    // shadow dom(close) 获取不到
    const videos = document.querySelectorAll('video');
    videos.forEach((v) => {
        v.playbackRate = value;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.onMessage.addListener((message, callback) => {
        if (message.type == "CHANGE_PLAY_RATE") {
            vsc_update_play_rate(message.value);
        }
    });
});
