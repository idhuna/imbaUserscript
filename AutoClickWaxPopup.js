// ==UserScript==
// @name         Auto Click WaxPopup
// @namespace    Auto Click WaxPopup
// @version      1.01
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

    let counter = 200;
    const dynamicInterval = () => {
        if(document.querySelector("div.react-ripples > button")?.disabled == false){
            document.querySelector("div.react-ripples > button").click();
            counter = 5000;
        }
        setTimeout(dynamicInterval, counter);
    }
    setTimeout(dynamicInterval, counter);
    setTimeout(_ => {
        if(document.querySelector("#cf-error-details > header > h1 > span:nth-child(2)").textContent == 1020){
            window.open("https://all-access.wax.io/cloud-wallet/login/","_error");
            window.close();
        }
    },25000);
    setTimeout(_ => {
        document.querySelector("#root > div > section > div.page-inner-container > div > button").click();
    },90*1000);
})();
