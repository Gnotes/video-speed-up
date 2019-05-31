import '../less/reset.css';
import '../less/popup.less';

document.addEventListener('DOMContentLoaded', () => {
    const menusEle = document.querySelector('.menus');
    const optionsEle = document.querySelector('.speed-rate-options');
    const liEles = optionsEle ? optionsEle.querySelectorAll('li') : [];
    const NOTIFICATION_OPTIONS_ID = "NOTIFICATION_OPTIONS_ID";
    const PLAYBACK_RATE_STROAGE_KEY = "PLAYBACK_RATE_STROAGE_KEY";
    const updateClass = (value) => {
        liEles.forEach((li) => {
            li.className = li.innerText === value ? "active" : '';
        });
    }

    const init = () => {
        chrome.storage.sync.get([PLAYBACK_RATE_STROAGE_KEY], function (storage) {
            if (storage[PLAYBACK_RATE_STROAGE_KEY]) {
                updateClass(storage[PLAYBACK_RATE_STROAGE_KEY]);
            }
        });
    }

    init();

    const showNotification = (value, success) => {
        chrome.notifications.getPermissionLevel((level) => {
            if (level === 'granted') {
                const options = {
                    type: 'basic',
                    iconUrl: '../images/v_128px.png',
                    title: 'Warm tips',
                    message: success ? `Successfully modified playback rate to ${value}x.` : 'Failed to modify the playback rate, try it again.',
                };
                chrome.notifications.clear(NOTIFICATION_OPTIONS_ID);
                chrome.notifications.create(NOTIFICATION_OPTIONS_ID, options);
            }
        });
    }

    menusEle.addEventListener('click', () => {
        chrome.tabs.create({
            url: chrome.extension.getURL('views/options.html'),
            active: true,
        });
    });

    optionsEle.addEventListener('click', (e) => {
        const value = e.target.innerText;
        updateClass(value);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            /**
             * https://developer.chrome.com/extensions/runtime#method-sendMessage
             * 
             * 对于第三个参数 responseCallback 回调函数做下说明：
             * The JSON response object sent by the handler of the message. 
             * If an error occurs while connecting to the extension, // 当通信链接出现问题时
             * the callback will be called with no arguments and runtime.lastError will be set to the error message // 这个回调会被执行，并且一个 runtime.lastError 就会被触发
             * 
             * 一通测试下来
             * 如果定义了 callback ：那么在接受到消息后，就必须响应该回调(sendResponse)，否则就会触发 runtime.lastError
             * 没有定义 callback ：没有触发 runtime.lastError（如果出错，应该还是会被触发吧，不做论证了.）
             */
            chrome.tabs.sendMessage(tabs[0].id, { type: "CHANGE_PLAY_RATE", value: parseFloat(value) }, (response = {}) => {
                const { status, success } = response;
                if (status) {
                    success && chrome.storage.sync.set({ [PLAYBACK_RATE_STROAGE_KEY]: value });
                    showNotification(value, success);
                }
            });
        });
    });
});
