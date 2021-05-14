// ==UserScript==
// @name         Auto Alien
// @namespace    Auto Alien
// @version      1.6
// @match        https://auto-alien.com/*
// @updateURL    https://raw.githubusercontent.com/idhuna/imbaUserscript/master/AutoStartAlien.js
// @downloadURL  https://raw.githubusercontent.com/idhuna/imbaUserscript/master/AutoStartAlien.js
// @grant        none
// ==/UserScript==

(async function() {
    // Window intercept
    console.log('Script Start Auto Alien ...')
    const delay = ms => new Promise(resolve => setTimeout(_ => resolve(), ms));
    const tuud = (number) => {
        var context = new AudioContext();
        let audio = new Audio('https://www.soundjay.com/button/button-'+JSON.parse(number)+'.wav');
        context.resume().then(() => {
            audio.play();
        });
    }

    var winOpen = window.open;
    window.open = function() {
        var win = winOpen.apply(this, arguments);
        tuud(7);
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
    function createReloadTimeout(millis) {
        myTimeout = setTimeout(_ => {
            setTimeout(_ => {location.reload(true)},2000);
        },millis);
    }
    function createReloadTimeout1(millis) {
        myTimeout1 = setTimeout(_ => {
            tuud(4);
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
    var oldStatus = undefined;
    const config = { attributes: true, childList: true, subtree: true };
    const callback = async function(mutationsList, observer) {
        let mineDelay
        mutationsList.forEach(function(mutation) {
            if(mutation.type == "childList"){
                stopReloadTimeout();
                document.querySelector("#show-status").scrollIntoView(false);
                scrollBy(0,10);
                let str = document.querySelector("#show-status").textContent;
                if(oldStatus == str) location.reload();
                if(str == "Check out Recaptcha. "){
                    createReloadTimeout1(3*60000);
                    return;
                }
                createReloadTimeout(30*60000);
                let re = /\d+/;
                let found = str.match(re) || 0;
                // Create Delay
                if(found == 0) return;
                let nextMineDelay = parseInt(found[0])
                let found2 = str.match(/Next Mine in/);
                if(found2){
                    mineDelay = nextMineDelay;
                }else{
                    mineDelay = nextMineDelay * 1000;
                }
                if(mineDelay > 0){
                    oldStatus = str;
                    node.textContent = newTime(new Date().getTime() + mineDelay);
                    setTimeout(_ => {
                        // console.log('Start new observer');
                        observer.observe(targetNode, config);
                    },mineDelay+2000);
                    observer.disconnect();
                }
            }
        });
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    window.addEventListener("message", (event) => {
        if(event.origin !== "https://all-access.wax.io") return;
        if(event.data == 'justReload') {
            console.log('postMessage',event.data);
            window.location.reload();
        }
    }, false);
})();
