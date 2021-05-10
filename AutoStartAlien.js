// ==UserScript==
// @name         Auto Alien
// @namespace    Auto Alien
// @version      1.3
// @match        https://auto-alien.com/*
// @updateURL    https://raw.githubusercontent.com/idhuna/imbaUserscript/master/AutoStartAlien.js
// @downloadURL  https://raw.githubusercontent.com/idhuna/imbaUserscript/master/AutoStartAlien.js
// @grant        none
// ==/UserScript==

(async function() {
    // Window intercept
    console.log('Script Start Auto Alien ...')
    var winOpen = window.open;
    const tuud = () => {
        var tuud = new Audio('https://www.soundjay.com/button/button-6.wav');
        tuud.play();
    }
    window.open = function() {
        var win = winOpen.apply(this, arguments);
        tuud();
        return win;
    };

    // Auto Alien
    setTimeout(_ => {
        document.querySelector("#acc-name > a").click();
    },2000);
    let parentNode = [...document.querySelectorAll('span.text-white')].find(e => e.textContent.includes("Status mining")) || document.querySelector('span.text-white');
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
    var myTimeout1;
    var tuud1 = new Audio('https://www.soundjay.com/button/button-4.wav');
    function createReloadTimeout(millis) {
        myTimeout = setTimeout(_ => {
            setTimeout(_ => {location.reload(true)},2000);
        },millis);
    }
    function createReloadTimeout1(millis) {
        myTimeout1 = setTimeout(_ => {
            tuud1.play();
            console.log(millis);
            setTimeout(_ => {location.reload(true)},2000);
        },millis);
    }
    function stopReloadTimeout() {
        clearTimeout(myTimeout);
        clearTimeout(myTimeout1);
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
                if(document.querySelector("#show-status").textContent == "Check out Recaptcha. "){
                    createReloadTimeout1(3*60000);
                }
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
