// ==UserScript==
// @name         Auto Alien
// @namespace    Auto Alien
// @version      2.6
// @match        https://www.awmine.com/awhelper*
// @match        https://awmine.com/awhelper*
// @match        https://auto-alien.com*
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

    // Timeout Function
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

    function waitForElement(selector, textContains=false, timeout=20000) {
        const resEle = () => document.body.querySelector(selector);
        return new Promise((resolve,reject) => {
            if (textContains) {
                if (resEle().textContent.includes(textContains)){
                    return resolve(resEle())
                }
            }else if (resEle()) {
                return resolve(resEle());
            }

            const _observer = new MutationObserver(mutations => {
                if (textContains) {
                    if (resEle().textContent.includes(textContains)){
                        resolve(resEle());
                        _observer.disconnect();
                    }
                }else if (resEle()) {
                    resolve(resEle());
                    _observer.disconnect();
                }
            });
            if (timeout >= 0) {
                setTimeout(_ => {
                    _observer.disconnect();
                    resolve();
                },timeout);
            }
            _observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    // Create Node & Show Mine Delay
    let node = document.createElement("div");
    node.style.color = 'white';
    node.style.backgroundColor= 'rgba(0, 0, 0, 0.5)';
    node.style.left = "1rem";
    node.style.position = 'fixed';
    node.style.zIndex = 999;
    node.textContent = newTime();
    node.addEventListener('click',() => {
        if(node.style.left == '') {
            node.style.left = '1rem';
            node.style.right = '';
        }else{
            node.style.right = '1rem';
            node.style.left = '';
        }
    });
    document.querySelector("body > *").append(node);

    // Start Config
    const beforeLoginText = "ล็อกอินเอเลี่ยนเวิลด์";
    const loginSelecotor = "#LoginIdBlock > button";
    const statusSelector = "#StatusMining";
    const delayOfStatus = {'รอการนับถอยหลัง':40*60000,'กำลังดำเนินการขุด':12*60*1000,'เตรียมการขุด':2*60*1000}
    // End Config
    setTimeout(function(){
        if(!!document.querySelector(loginSelecotor)?.textContent.includes(beforeLoginText)){
            location.reload(true);
            console.log("Reloading ...")
        }
    },20000);
    // Start Login
    let _ele = await waitForElement(loginSelecotor);
    if(_ele){
        _ele.click();
        document.querySelector("#CPUStop").value = 95;
    }
    do{
        await delay(500);
    }while(!wax);
    do{
        await delay(500);
    }while(!wax.userAccount?.includes('.wam'))
    let account = wax.userAccount;
    if(!account){
        await delay(10000);
        account = wax.userAccount;
    }
    console.log('Account :', account);

    // Get Delay
    const justDelay = async () => {
        try {
            let minedelay = await getMineDelay(account);
            if(minedelay > 0) {
                node.textContent = newTime(new Date().getTime() + minedelay);
                node.style.color = 'lawngreen';
            }
            if(minedelay == 0){
                await delay(10000);
                node.style.color = 'lightyellow';
            }
            await delay(minedelay);
            node.style.color = 'yellow';
        }catch(e) {
            console.log(e);
            node.style.color = 'red';
        }
    }
    if(_ele){
        // MutationObserver
        const targetNode = document.querySelector(statusSelector);
        var oldStatus = undefined;
        const config = { attributes: true, childList: true, subtree: true };
        const callback = async function(mutationsList, observer) {
            mutationsList.forEach(function(mutation) {
                if(mutation.type == "childList"){
                    stopReloadTimeout();
                    document.querySelector("#StatusMining")?.scrollIntoView();
                    if(parseFloat(document.querySelector("#Land_Commission")?.textContent) > 2) document.querySelector("#Land_Commission").scrollIntoView();
                    let str = document.querySelector(statusSelector).textContent;
                    for (status in delayOfStatus){
                        if (str == status){
                            createReloadTimeout1(delayOfStatus[status]);
                        }
                    }
                    createReloadTimeout(40*60000);
                }
            });
            await justDelay();
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }else{
        while(true){
            await justDelay();
            await delay(5000);
        }
    }

    window.addEventListener("message", (event) => {
        if(event.origin !== "https://all-access.wax.io") return;
        if(event.data == 'justReload') {
            console.log('postMessage',event.data);
            window.location.reload();
        }
    }, false);
})();
