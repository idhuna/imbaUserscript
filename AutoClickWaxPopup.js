// ==UserScript==
// @name         Auto Click WaxPopup
// @namespace    Auto Click WaxPopup
// @version      1
// @match        https://all-access.wax.io/cloud-wallet/signing/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
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
    let intervalTime = 200;
    setInterval(_ => {
        if(document.querySelector("div.react-ripples > button")?.disabled == false){
            document.querySelector("div.react-ripples > button").click();
            intervalTime = 5000;
        }
    },intervalTime)
    setTimeout(_ => {
        document.querySelector("#root > div > section > div.page-inner-container > div > button").click();
    },90*1000);
})();
