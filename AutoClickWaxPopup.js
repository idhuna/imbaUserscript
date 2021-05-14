// ==UserScript==
// @name         Auto Click WaxPopup
// @namespace    Auto Click WaxPopup
// @version      1.5
// @match        https://all-access.wax.io/cloud-wallet/signing/*
// @match        https://all-access.wax.io/cloud-wallet/login/*
// @updateURL    https://raw.githubusercontent.com/idhuna/imbaUserscript/master/AutoClickWaxPopup.js
// @downloadURL  https://raw.githubusercontent.com/idhuna/imbaUserscript/master/AutoClickWaxPopup.js
// @grant        none
// ==/UserScript==

(async function() {
    console.log('Script Auto Click Popup...')
    // Create Counter elemnet
    let node = document.createElement("span");
    node.style.color = 'red';
    node.style.marginLeft = "1rem";
    node.textContent = 0;
    let count = 0;
    let isFound = false;
    // Counter
    var oneSecInterval = setInterval(_ => {
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
        if(document.querySelector("#cf-error-details > header > h1 > span:nth-child(2)")?.textContent == 1020){
            console.log('Error');
            window.open("https://all-access.wax.io/cloud-wallet/login/","_error");
            setTimeout(_ => window.close(),2000);
        }
    },5000);
    // postMessage to opener
    let originDomain = "https://auto-alien.com";
    window.addEventListener("message", (event) => {
        console.log('data',event.data);
        if(event.data == 'justReload'){
            console.log(event.origin);
            if(event.origin !== "https://www.google.com") return;
            console.log("Try again found reloading...");
            setTimeout(_ => window.opener.postMessage(event.data,originDomain),2000);
            setTimeout(_ => window.close(),10000);
            node.textContent = "Reloading";
            clearInterval(oneSecInterval);
        }
    }, false);
    // Reload after 84 Sec
    setTimeout(_ => {
        document.querySelector("#root > div > section > div.page-inner-container > div > button").click();
    },84*1000);
})();
