import '../less/reset.css';
import '../less/popup.less';

document.addEventListener('DOMContentLoaded', () => {
    const menusEle = document.querySelector('.menus');
    const optionsEle = document.querySelector('.speed-rate-options');
    const liEles = optionsEle ? optionsEle.querySelectorAll('li') : [];
    const updateClass = (value) => {
        liEles.forEach((li) => {
            li.className = li.innerText === value ? "active" : '';
        });
    }

    menusEle.addEventListener('click', () => {
        console.log("menusEle")
    });

    optionsEle.addEventListener('click', (e) => {
        const value = e.target.innerText;
        updateClass(value);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: "CHANGE_PLAY_RATE", value: parseFloat(value) }, (response) => {
                console.log(response);
            });
        });
    });
});
