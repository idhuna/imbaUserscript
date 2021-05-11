// ==UserScript==
// @name         Auto Click WaxPopup
// @namespace    Auto Click WaxPopup
// @version      1.3
// @match        https://all-access.wax.io/cloud-wallet/signing/*
// @match        https://all-access.wax.io/cloud-wallet/login/*
// @updateURL    https://raw.githubusercontent.com/idhuna/imbaUserscript/master/AutoClickWaxPopup.js
// @downloadURL  https://raw.githubusercontent.com/idhuna/imbaUserscript/master/AutoClickWaxPopup.js
// @grant        none
// ==/UserScript==

(async function() {
    console.log('Script Auto Click Popup...')
    let node = document.createElement("span");
    node.style.color = 'red';
    node.style.marginLeft = "1rem";
    node.textContent = 0;
    let count = 0;
    let isFound = false;
    setInterval(_ => {
        if(!isFound && document.querySelector("#root > div > section > div.page-inner-container > div > h1")){
            document.querySelector("#root > div > section > div.page-inner-container > div > h1").append(node);
            isFound = true;
        }
        node.textContent = count;
        count += 1;
    }, 1000)
    // Auto Accept Signing for WAX.io
    let counter = 200;
    const dynamicInterval = () => {
        if(document.querySelector("div.react-ripples > button")?.disabled == false){
            document.querySelector("div.react-ripples > button").click();
            counter = 5000;
        }
        if(document.querySelector("input[type='checkbox']")?.checked == false){
            document.querySelector("input[type='checkbox']").click();
        }
        setTimeout(dynamicInterval, counter);
    }
    setTimeout(dynamicInterval, counter);
    // Check Error 1020
    setTimeout(_ => {
        if(document.querySelector("#cf-error-details > header > h1 > span:nth-child(2)").textContent == 1020){
            console.log('Error');
            window.open("https://all-access.wax.io/cloud-wallet/login/","_error");
            setTimeout(_ => window.close(),2000);
        }
    },5000);
    // Reload after 86 Sec
    setTimeout(_ => {
        document.querySelector("#root > div > section > div.page-inner-container > div > button").click();
    },86*1000);
})();
