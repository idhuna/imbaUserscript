// ==UserScript==
// @name         Auto Alien
// @namespace    Auto Alien
// @version       1
// @match        https://auto-alien.com/*
// @updateURL    https://raw.githubusercontent.com/idhuna/imbaUserscript/master/autoAlien.js
// @downloadURL  https://raw.githubusercontent.com/idhuna/imbaUserscript/master/autoAlien.js
// @grant        none
// ==/UserScript==

(async function() {
    // Window intercept
    console.log('Script Window Open...');
    var winOpen = window.open;
    var snd = new Audio('https://www.soundjay.com/button/button-6.wav');
    window.open = function() {
        var win = winOpen.apply(this, arguments);
        snd.play();
        return win;
    };

    // Auto Alien
    console.log('Script Auto Alien ...')
    setTimeout(_ => {
        document.querySelector("#acc-name > a").click();
    },2000);
    let parentNode = document.querySelector("body > div.container > div:nth-child(2) > div.col-lg-8.mt-3 > span:nth-child(9)");
    let node = document.createElement("span");
    node.style.color = 'yellow';
    node.style.marginLeft = "1rem";
    node.textContent = 0;
    setTimeout(function(){
        if(!!document.querySelector("#acc-name > a")?.textContent.includes('Login')){
            location.reload(true);
            console.log("Reloading ...")
        }
        parentNode.append(node);
    },20000);

    // Timeout
    var myTimeout;
    function createReloadTimeout(millis) {
        myTimeout = myTimeout = setTimeout(_ => {location.reload(true)},millis);
    }
    function stopReloadTimeout() {
        clearTimeout(myTimeout);
    }

    const newTime = (milli = "") => {
        if (milli) {
            return new Date(milli).toLocaleTimeString('th-TH')
        }
        return new Date().toLocaleTimeString('th-TH')
    }

    // MutationObserver
    const targetNode = document.querySelector("#show-status");

    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        mutationsList.forEach(function(mutation) {
            if(mutation.type == "childList"){
                stopReloadTimeout();
                document.querySelector("#show-status").scrollIntoView(false);
                scrollBy(0,10);
                createReloadTimeout(30*60000);
                let re = /\d*/;
                let str = document.querySelector("#show-status").textContent;
                let found = str.match(re);
                if(parseInt(found[0]) > 0){
                    let mineDelay = parseInt(found[0])*1000;
                    node.textContent = newTime(new Date().getTime() + mineDelay);
                }
            }
        });
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
})();
